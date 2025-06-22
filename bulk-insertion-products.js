const mongoose = require('mongoose');
const Product = require('./models/Product'); // Adjust path as needed
const Category = require('./models/Category'); // Adjust path as needed
const SubCategory = require('./models/subCat'); // Adjust path as needed
const sampleProducts = require('./sampleProduct'); // Adjust path as needed

// Bulk insert function
const bulkInsertProducts = async () => {
  try {
    console.log('Starting bulk product insertion...');
    
    // Create maps for category and subcategory lookups
    const categories = await Category.find({});
    const subcategories = await SubCategory.find({}).populate('category');
    
    const categoryMap = {};
    const subcategoryMap = {};
    
    // Create category name to ID mapping
    categories.forEach(cat => {
      categoryMap[cat.name.toLowerCase()] = cat._id;
    });
    
    // Create subcategory name to ID mapping
    subcategories.forEach(subcat => {
      subcategoryMap[subcat.name.toLowerCase()] = subcat._id;
    });
    
    console.log('Category mapping created:', Object.keys(categoryMap).length, 'categories');
    console.log('Subcategory mapping created:', Object.keys(subcategoryMap).length, 'subcategories');
    
    // Transform sample products to replace category and subcategory names with IDs
    const transformedProducts = sampleProducts.map(product => {
      const categoryId = categoryMap[product.category.toLowerCase()];
      const subcategoryId = subcategoryMap[product.subcategory.toLowerCase()];
      
      if (!categoryId) {
        console.warn(`Category not found: ${product.category} for product ${product.productNo}`);
        return null;
      }
      
      if (!subcategoryId) {
        console.warn(`Subcategory not found: ${product.subcategory} for product ${product.productNo}`);
        return null;
      }
      
      return {
        ...product,
        category: categoryId,
        subcategory: subcategoryId
      };
    }).filter(product => product !== null); // Remove products with missing categories/subcategories
    
    console.log(`Transformed ${transformedProducts.length} products for insertion`);
    
    // Check for existing products to avoid duplicates
    const existingProductNos = await Product.find({}, 'productNo').lean();
    const existingProductNoSet = new Set(existingProductNos.map(p => p.productNo));
    
    // Filter out existing products
    const newProducts = transformedProducts.filter(product => 
      !existingProductNoSet.has(product.productNo)
    );
    
    console.log(`${newProducts.length} new products to insert (${transformedProducts.length - newProducts.length} duplicates skipped)`);
    
    if (newProducts.length === 0) {
      console.log('No new products to insert.');
      return;
    }
    
    // Perform bulk insertion
    const result = await Product.insertMany(newProducts, { ordered: false });
    
    console.log(`✅ Successfully inserted ${result.length} products`);
    
    // Log summary by category
    const categoryStats = {};
    result.forEach(product => {
      const categoryName = product.category;
      categoryStats[categoryName] = (categoryStats[categoryName] || 0) + 1;
    });
    
    console.log('\n📊 Insertion Summary by Category:');
    Object.entries(categoryStats).forEach(([category, count]) => {
      console.log(`  ${category}: ${count} products`);
    });
    
    return result;
    
  } catch (error) {
    console.error('❌ Error during bulk insertion:', error);
    
    if (error.writeErrors) {
      console.log('\n📋 Detailed errors:');
      error.writeErrors.forEach((err, index) => {
        console.log(`  ${index + 1}. ${err.errmsg}`);
      });
    }
    
    throw error;
  }
};

// Function to clear all products (use with caution!)
const clearAllProducts = async () => {
  try {
    const result = await Product.deleteMany({});
    console.log(`🗑️ Deleted ${result.deletedCount} products`);
    return result;
  } catch (error) {
    console.error('❌ Error clearing products:', error);
    throw error;
  }
};

// Function to get product statistics
const getProductStats = async () => {
  try {
    const totalProducts = await Product.countDocuments();
    const availableProducts = await Product.countDocuments({ isAvailable: true });
    const outOfStockProducts = await Product.countDocuments({ stock: 0 });
    
    // Get category-wise statistics
    const categoryStats = await Product.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'categoryInfo'
        }
      },
      {
        $unwind: '$categoryInfo'
      },
      {
        $group: {
          _id: '$categoryInfo.name',
          count: { $sum: 1 },
          totalStock: { $sum: '$stock' },
          averagePrice: { $avg: '$price.sellingPrice' }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);
    
    console.log('\n📈 Product Statistics:');
    console.log(`  Total Products: ${totalProducts}`);
    console.log(`  Available Products: ${availableProducts}`);
    console.log(`  Out of Stock: ${outOfStockProducts}`);
    
    console.log('\n📊 Category-wise Statistics:');
    categoryStats.forEach(stat => {
      console.log(`  ${stat._id}: ${stat.count} products, ${stat.totalStock} total stock, ₹${stat.averagePrice?.toFixed(2)} avg price`);
    });
    
    return {
      totalProducts,
      availableProducts,
      outOfStockProducts,
      categoryStats
    };
  } catch (error) {
    console.error('❌ Error getting product statistics:', error);
    throw error;
  }
};

// Main execution function
const main = async () => {
  try {
    // Connect to MongoDB if not already connected
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://adityarana206:1l9X6m2Gy23EGVIR@minitos.po76pvc.mongodb.net/');
      console.log('📡 Connected to MongoDB');
    }
    
    // Uncomment the function you want to run:
    
    // 1. Insert sample products
    await bulkInsertProducts();
    
    // 2. Get statistics
    // await getProductStats();
    
    // 3. Clear all products (use with caution!)
    // await clearAllProducts();
    
    console.log('🎉 Operation completed successfully!');
    
  } catch (error) {
    console.error('💥 Operation failed:', error);
  } finally {
    // Close connection if we opened it
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log('📡 Disconnected from MongoDB');
    }
  }
};

// Export functions for use in other files
module.exports = {
  bulkInsertProducts,
  clearAllProducts,
  getProductStats,
  main
};

// Run if this file is executed directly
if (require.main === module) {
  main();
}