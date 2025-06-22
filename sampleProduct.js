const sampleProducts = [
  // FLOUR CATEGORY
  {
    productNo: "FLR001",
    name: "Premium All Purpose Flour",
    brand: "Aashirvaad",
    description: "High-quality refined wheat flour perfect for all your baking and cooking needs",
    images: [
      {
        url: "https://foodunpacked.com/wp-content/uploads/2022/01/AdobeStock_216474104-scaled.jpeg",
        alt: "Premium All Purpose Flour"
      }
    ],
    price: {
      mrp: 120,
      sellingPrice: 105,
      discountPercent: 12.5
    },
    unit: {
      quantity: 1,
      unitType: "kg"
    },
    category: "flour",
    subcategory: "All Purpose Flour",
    stock: 150,
    isAvailable: true,
    tags: ["flour", "baking", "cooking", "wheat"],
    expiryDate: new Date("2025-12-31"),
    warehouseLocation: "A-12",
    deliveryTimeEstimate: "15 mins",
    rating: {
      average: 4.3,
      totalReviews: 87
    }
  },
  {
    productNo: "FLR002",
    name: "Organic Almond Flour",
    brand: "24 Mantra",
    description: "Premium organic almond flour, gluten-free and rich in nutrients",
    images: [
      {
        url: "https://foodunpacked.com/wp-content/uploads/2022/01/AdobeStock_216474104-scaled.jpeg",
        alt: "Organic Almond Flour"
      }
    ],
    price: {
      mrp: 650,
      sellingPrice: 585,
      discountPercent: 10
    },
    unit: {
      quantity: 500,
      unitType: "g"
    },
    category: "flour",
    subcategory: "Almond Flour",
    stock: 45,
    isAvailable: true,
    tags: ["almond", "gluten-free", "organic", "healthy"],
    expiryDate: new Date("2025-10-15"),
    warehouseLocation: "B-05",
    deliveryTimeEstimate: "20 mins",
    rating: {
      average: 4.7,
      totalReviews: 23
    }
  },

  // ATTA CATEGORY
  {
    productNo: "ATT001",
    name: "Fresh Chakki Atta",
    brand: "Pillsbury",
    description: "Freshly ground whole wheat flour from select wheat grains",
    images: [
      {
        url: "https://foodunpacked.com/wp-content/uploads/2022/01/AdobeStock_216474104-scaled.jpeg",
        alt: "Fresh Chakki Atta"
      }
    ],
    price: {
      mrp: 280,
      sellingPrice: 265,
      discountPercent: 5.4
    },
    unit: {
      quantity: 5,
      unitType: "kg"
    },
    category: "atta",
    subcategory: "Whole Wheat Atta",
    stock: 200,
    isAvailable: true,
    tags: ["wheat", "atta", "fresh", "healthy"],
    expiryDate: new Date("2025-11-30"),
    warehouseLocation: "A-08",
    deliveryTimeEstimate: "10 mins",
    rating: {
      average: 4.5,
      totalReviews: 156
    }
  },
  {
    productNo: "ATT002",
    name: "Multigrain Atta",
    brand: "Fortune",
    description: "Nutritious blend of wheat, jowar, bajra, and ragi",
    images: [
      {
        url: "https://foodunpacked.com/wp-content/uploads/2022/01/AdobeStock_216474104-scaled.jpeg",
        alt: "Multigrain Atta"
      }
    ],
    price: {
      mrp: 320,
      sellingPrice: 295,
      discountPercent: 7.8
    },
    unit: {
      quantity: 5,
      unitType: "kg"
    },
    category: "atta",
    subcategory: "Multigrain Atta",
    stock: 85,
    isAvailable: true,
    tags: ["multigrain", "healthy", "nutritious", "fiber"],
    expiryDate: new Date("2026-01-15"),
    warehouseLocation: "A-09",
    deliveryTimeEstimate: "12 mins",
    rating: {
      average: 4.2,
      totalReviews: 94
    }
  },

  // PULSES CATEGORY
  {
    productNo: "PUL001",
    name: "Premium Toor Dal",
    brand: "Tata Sampann",
    description: "High-quality arhar dal, rich in protein and nutrients",
    images: [
      {
        url: "https://foodunpacked.com/wp-content/uploads/2022/01/AdobeStock_216474104-scaled.jpeg",
        alt: "Premium Toor Dal"
      }
    ],
    price: {
      mrp: 180,
      sellingPrice: 165,
      discountPercent: 8.3
    },
    unit: {
      quantity: 1,
      unitType: "kg"
    },
    category: "pulses",
    subcategory: "Arhar Dal",
    stock: 120,
    isAvailable: true,
    tags: ["dal", "pulses", "protein", "healthy"],
    expiryDate: new Date("2026-03-20"),
    warehouseLocation: "C-15",
    deliveryTimeEstimate: "15 mins",
    rating: {
      average: 4.4,
      totalReviews: 203
    }
  },
  {
    productNo: "PUL002",
    name: "Organic Moong Dal",
    brand: "Pro Nature",
    description: "Certified organic green moong dal, easy to digest",
    images: [
      {
        url: "https://foodunpacked.com/wp-content/uploads/2022/01/AdobeStock_216474104-scaled.jpeg",
        alt: "Organic Moong Dal"
      }
    ],
    price: {
      mrp: 220,
      sellingPrice: 195,
      discountPercent: 11.4
    },
    unit: {
      quantity: 1,
      unitType: "kg"
    },
    category: "pulses",
    subcategory: "Moong Dal",
    stock: 95,
    isAvailable: true,
    tags: ["organic", "moong", "dal", "healthy"],
    expiryDate: new Date("2026-02-28"),
    warehouseLocation: "C-12",
    deliveryTimeEstimate: "18 mins",
    rating: {
      average: 4.6,
      totalReviews: 67
    }
  },

  // OILS CATEGORY
  {
    productNo: "OIL001",
    name: "Pure Mustard Oil",
    brand: "Fortune",
    description: "Cold-pressed mustard oil with authentic taste and aroma",
    images: [
      {
        url: "https://foodunpacked.com/wp-content/uploads/2022/01/AdobeStock_216474104-scaled.jpeg",
        alt: "Pure Mustard Oil"
      }
    ],
    price: {
      mrp: 180,
      sellingPrice: 168,
      discountPercent: 6.7
    },
    unit: {
      quantity: 1,
      unitType: "l"
    },
    category: "oils",
    subcategory: "Mustard Oil",
    stock: 75,
    isAvailable: true,
    tags: ["mustard", "oil", "cooking", "pure"],
    expiryDate: new Date("2026-08-15"),
    warehouseLocation: "D-22",
    deliveryTimeEstimate: "12 mins",
    rating: {
      average: 4.3,
      totalReviews: 142
    }
  },
  {
    productNo: "OIL002",
    name: "Extra Virgin Olive Oil",
    brand: "Figaro",
    description: "Premium extra virgin olive oil, perfect for salads and cooking",
    images: [
      {
        url: "https://foodunpacked.com/wp-content/uploads/2022/01/AdobeStock_216474104-scaled.jpeg",
        alt: "Extra Virgin Olive Oil"
      }
    ],
    price: {
      mrp: 450,
      sellingPrice: 399,
      discountPercent: 11.3
    },
    unit: {
      quantity: 500,
      unitType: "ml"
    },
    category: "oils",
    subcategory: "Olive Oil",
    stock: 60,
    isAvailable: true,
    tags: ["olive", "extra virgin", "healthy", "premium"],
    expiryDate: new Date("2026-06-30"),
    warehouseLocation: "D-18",
    deliveryTimeEstimate: "15 mins",
    rating: {
      average: 4.5,
      totalReviews: 89
    }
  },

  // RICE CATEGORY
  {
    productNo: "RIC001",
    name: "Premium Basmati Rice",
    brand: "India Gate",
    description: "Long grain basmati rice with excellent aroma and taste",
    images: [
      {
        url: "https://foodunpacked.com/wp-content/uploads/2022/01/AdobeStock_216474104-scaled.jpeg",
        alt: "Premium Basmati Rice"
      }
    ],
    price: {
      mrp: 350,
      sellingPrice: 315,
      discountPercent: 10
    },
    unit: {
      quantity: 5,
      unitType: "kg"
    },
    category: "rice",
    subcategory: "Basmati Rice",
    stock: 180,
    isAvailable: true,
    tags: ["basmati", "rice", "premium", "aromatic"],
    expiryDate: new Date("2026-12-31"),
    warehouseLocation: "E-10",
    deliveryTimeEstimate: "10 mins",
    rating: {
      average: 4.6,
      totalReviews: 278
    }
  },
  {
    productNo: "RIC002",
    name: "Brown Rice Organic",
    brand: "24 Mantra",
    description: "Organic brown rice, rich in fiber and nutrients",
    images: [
      {
        url: "https://foodunpacked.com/wp-content/uploads/2022/01/AdobeStock_216474104-scaled.jpeg",
        alt: "Brown Rice Organic"
      }
    ],
    price: {
      mrp: 280,
      sellingPrice: 252,
      discountPercent: 10
    },
    unit: {
      quantity: 2,
      unitType: "kg"
    },
    category: "rice",
    subcategory: "Brown Rice",
    stock: 65,
    isAvailable: true,
    tags: ["brown rice", "organic", "healthy", "fiber"],
    expiryDate: new Date("2026-10-15"),
    warehouseLocation: "E-12",
    deliveryTimeEstimate: "18 mins",
    rating: {
      average: 4.2,
      totalReviews: 45
    }
  },

  // GHEE CATEGORY
  {
    productNo: "GHE001",
    name: "Pure A2 Cow Ghee",
    brand: "Patanjali",
    description: "Pure A2 cow ghee made from desi cow milk, rich in nutrients",
    images: [
      {
        url: "https://foodunpacked.com/wp-content/uploads/2022/01/AdobeStock_216474104-scaled.jpeg",
        alt: "Pure A2 Cow Ghee"
      }
    ],
    price: {
      mrp: 650,
      sellingPrice: 585,
      discountPercent: 10
    },
    unit: {
      quantity: 500,
      unitType: "ml"
    },
    category: "ghee",
    subcategory: "A2 Cow Ghee",
    stock: 85,
    isAvailable: true,
    tags: ["A2", "cow ghee", "pure", "traditional"],
    expiryDate: new Date("2026-04-30"),
    warehouseLocation: "F-08",
    deliveryTimeEstimate: "15 mins",
    rating: {
      average: 4.7,
      totalReviews: 134
    }
  },
  {
    productNo: "GHE002",
    name: "Premium Buffalo Ghee",
    brand: "Amul",
    description: "Rich and creamy buffalo ghee with authentic taste",
    images: [
      {
        url: "https://foodunpacked.com/wp-content/uploads/2022/01/AdobeStock_216474104-scaled.jpeg",
        alt: "Premium Buffalo Ghee"
      }
    ],
    price: {
      mrp: 480,
      sellingPrice: 445,
      discountPercent: 7.3
    },
    unit: {
      quantity: 500,
      unitType: "ml"
    },
    category: "ghee",
    subcategory: "Buffalo Ghee",
    stock: 120,
    isAvailable: true,
    tags: ["buffalo ghee", "premium", "creamy", "traditional"],
    expiryDate: new Date("2026-03-15"),
    warehouseLocation: "F-06",
    deliveryTimeEstimate: "12 mins",
    rating: {
      average: 4.4,
      totalReviews: 98
    }
  },

  // DALS CATEGORY
  {
    productNo: "DAL001",
    name: "Yellow Moong Dal",
    brand: "Everest",
    description: "Premium quality yellow moong dal, easy to cook and digest",
    images: [
      {
        url: "https://foodunpacked.com/wp-content/uploads/2022/01/AdobeStock_216474104-scaled.jpeg",
        alt: "Yellow Moong Dal"
      }
    ],
    price: {
      mrp: 160,
      sellingPrice: 148,
      discountPercent: 7.5
    },
    unit: {
      quantity: 1,
      unitType: "kg"
    },
    category: "dals",
    subcategory: "Moong Dal",
    stock: 140,
    isAvailable: true,
    tags: ["moong dal", "yellow", "protein", "healthy"],
    expiryDate: new Date("2026-05-20"),
    warehouseLocation: "G-14",
    deliveryTimeEstimate: "12 mins",
    rating: {
      average: 4.3,
      totalReviews: 167
    }
  },
  {
    productNo: "DAL002",
    name: "Chana Dal Premium",
    brand: "MDH",
    description: "High-quality chana dal, perfect for making dal and snacks",
    images: [
      {
        url: "https://foodunpacked.com/wp-content/uploads/2022/01/AdobeStock_216474104-scaled.jpeg",
        alt: "Chana Dal Premium"
      }
    ],
    price: {
      mrp: 140,
      sellingPrice: 126,
      discountPercent: 10
    },
    unit: {
      quantity: 1,
      unitType: "kg"
    },
    category: "dals",
    subcategory: "Chana Dal",
    stock: 110,
    isAvailable: true,
    tags: ["chana dal", "premium", "protein", "versatile"],
    expiryDate: new Date("2026-07-10"),
    warehouseLocation: "G-16",
    deliveryTimeEstimate: "15 mins",
    rating: {
      average: 4.2,
      totalReviews: 89
    }
  },

  // PERSONAL CARE CATEGORY
  {
    productNo: "PC001",
    name: "Baby Gentle Shampoo",
    brand: "Johnson's",
    description: "Gentle tear-free baby shampoo with natural ingredients",
    images: [
      {
        url: "https://foodunpacked.com/wp-content/uploads/2022/01/AdobeStock_216474104-scaled.jpeg",
        alt: "Baby Gentle Shampoo"
      }
    ],
    price: {
      mrp: 180,
      sellingPrice: 162,
      discountPercent: 10
    },
    unit: {
      quantity: 200,
      unitType: "ml"
    },
    category: "personal care",
    subcategory: "Baby Care",
    stock: 75,
    isAvailable: true,
    tags: ["baby", "shampoo", "gentle", "tear-free"],
    expiryDate: new Date("2027-01-15"),
    warehouseLocation: "H-05",
    deliveryTimeEstimate: "20 mins",
    rating: {
      average: 4.5,
      totalReviews: 123
    }
  },
  {
    productNo: "PC002",
    name: "Herbal Face Wash",
    brand: "Himalaya",
    description: "Natural herbal face wash with neem and turmeric",
    images: [
      {
        url: "https://foodunpacked.com/wp-content/uploads/2022/01/AdobeStock_216474104-scaled.jpeg",
        alt: "Herbal Face Wash"
      }
    ],
    price: {
      mrp: 120,
      sellingPrice: 108,
      discountPercent: 10
    },
    unit: {
      quantity: 150,
      unitType: "ml"
    },
    category: "personal care",
    subcategory: "Face Care",
    stock: 95,
    isAvailable: true,
    tags: ["herbal", "face wash", "neem", "natural"],
    expiryDate: new Date("2026-11-30"),
    warehouseLocation: "H-08",
    deliveryTimeEstimate: "18 mins",
    rating: {
      average: 4.3,
      totalReviews: 87
    }
  },

  // BEVERAGES CATEGORY
  {
    productNo: "BEV001",
    name: "Green Tea Bags",
    brand: "Lipton",
    description: "Premium green tea bags with natural antioxidants",
    images: [
      {
        url: "https://foodunpacked.com/wp-content/uploads/2022/01/AdobeStock_216474104-scaled.jpeg",
        alt: "Green Tea Bags"
      }
    ],
    price: {
      mrp: 250,
      sellingPrice: 225,
      discountPercent: 10
    },
    unit: {
      quantity: 25,
      unitType: "pcs"
    },
    category: "beverages",
    subcategory: "Tea",
    stock: 150,
    isAvailable: true,
    tags: ["green tea", "antioxidants", "healthy", "premium"],
    expiryDate: new Date("2026-08-31"),
    warehouseLocation: "I-12",
    deliveryTimeEstimate: "15 mins",
    rating: {
      average: 4.4,
      totalReviews: 198
    }
  },
  {
    productNo: "BEV002",
    name: "Fresh Orange Juice",
    brand: "Real",
    description: "100% pure orange juice with no added sugar",
    images: [
      {
        url: "https://foodunpacked.com/wp-content/uploads/2022/01/AdobeStock_216474104-scaled.jpeg",
        alt: "Fresh Orange Juice"
      }
    ],
    price: {
      mrp: 80,
      sellingPrice: 72,
      discountPercent: 10
    },
    unit: {
      quantity: 1,
      unitType: "l"
    },
    category: "beverages",
    subcategory: "Juices",
    stock: 60,
    isAvailable: true,
    tags: ["orange juice", "fresh", "no sugar", "vitamin C"],
    expiryDate: new Date("2025-12-15"),
    warehouseLocation: "I-18",
    deliveryTimeEstimate: "10 mins",
    rating: {
      average: 4.1,
      totalReviews: 156
    }
  },

  // PICKS CATEGORY
  {
    productNo: "PCK001",
    name: "Mixed Vegetable Pickle",
    brand: "Priya",
    description: "Traditional mixed vegetable pickle with authentic spices",
    images: [
      {
        url: "https://foodunpacked.com/wp-content/uploads/2022/01/AdobeStock_216474104-scaled.jpeg",
        alt: "Mixed Vegetable Pickle"
      }
    ],
    price: {
      mrp: 85,
      sellingPrice: 76,
      discountPercent: 10.6
    },
    unit: {
      quantity: 300,
      unitType: "g"
    },
    category: "picks",
    subcategory: "Vegetable Pickles",
    stock: 80,
    isAvailable: true,
    tags: ["pickle", "mixed vegetable", "spicy", "traditional"],
    expiryDate: new Date("2026-09-30"),
    warehouseLocation: "J-10",
    deliveryTimeEstimate: "12 mins",
    rating: {
      average: 4.3,
      totalReviews: 145
    }
  },
  {
    productNo: "PCK002",
    name: "Mango Pickle",
    brand: "Mother's Recipe",
    description: "Authentic Andhra-style mango pickle with traditional taste",
    images: [
      {
        url: "https://foodunpacked.com/wp-content/uploads/2022/01/AdobeStock_216474104-scaled.jpeg",
        alt: "Mango Pickle"
      }
    ],
    price: {
      mrp: 95,
      sellingPrice: 85,
      discountPercent: 10.5
    },
    unit: {
      quantity: 300,
      unitType: "g"
    },
    category: "picks",
    subcategory: "Fruit Pickles",
    stock: 65,
    isAvailable: true,
    tags: ["mango pickle", "Andhra style", "spicy", "authentic"],
    expiryDate: new Date("2026-08-15"),
    warehouseLocation: "J-12",
    deliveryTimeEstimate: "15 mins",
    rating: {
      average: 4.6,
      totalReviews: 203
    }
  },

  // Additional products to reach 100+ items
  {
    productNo: "FLR003",
    name: "Wheat Flour Premium",
    brand: "Shakti Bhog",
    description: "Fine quality wheat flour for chapatis and parathas",
    images: [
      {
        url: "https://foodunpacked.com/wp-content/uploads/2022/01/AdobeStock_216474104-scaled.jpeg",
        alt: "Wheat Flour Premium"
      }
    ],
    price: {
      mrp: 200,
      sellingPrice: 185,
      discountPercent: 7.5
    },
    unit: {
      quantity: 2,
      unitType: "kg"
    },
    category: "flour",
    subcategory: "All Purpose Flour",
    stock: 120,
    isAvailable: true,
    tags: ["wheat flour", "premium", "chapati", "soft"],
    expiryDate: new Date("2025-11-20"),
    warehouseLocation: "A-15",
    deliveryTimeEstimate: "12 mins",
    rating: {
      average: 4.2,
      totalReviews: 76
    }
  },
  {
    productNo: "ATT003",
    name: "Organic Whole Wheat Atta",
    brand: "Pro Nature",
    description: "Certified organic whole wheat atta, stone ground",
    images: [
      {
        url: "https://foodunpacked.com/wp-content/uploads/2022/01/AdobeStock_216474104-scaled.jpeg",
        alt: "Organic Whole Wheat Atta"
      }
    ],
    price: {
      mrp: 380,
      sellingPrice: 342,
      discountPercent: 10
    },
    unit: {
      quantity: 5,
      unitType: "kg"
    },
    category: "atta",
    subcategory: "Whole Wheat Atta",
    stock: 55,
    isAvailable: true,
    tags: ["organic", "whole wheat", "stone ground", "healthy"],
    expiryDate: new Date("2026-01-10"),
    warehouseLocation: "A-11",
    deliveryTimeEstimate: "18 mins",
    rating: {
      average: 4.5,
      totalReviews: 42
    }
  },
  {
    productNo: "PUL003",
    name: "Black Urad Dal",
    brand: "Tata Sampann",
    description: "Premium black urad dal, perfect for dal makhani",
    images: [
      {
        url: "https://foodunpacked.com/wp-content/uploads/2022/01/AdobeStock_216474104-scaled.jpeg",
        alt: "Black Urad Dal"
      }
    ],
    price: {
      mrp: 200,
      sellingPrice: 180,
      discountPercent: 10
    },
    unit: {
      quantity: 1,
      unitType: "kg"
    },
    category: "pulses",
    subcategory: "Urad Dal",
    stock: 90,
    isAvailable: true,
    tags: ["urad dal", "black", "premium", "dal makhani"],
    expiryDate: new Date("2026-04-25"),
    warehouseLocation: "C-18",
    deliveryTimeEstimate: "15 mins",
    rating: {
      average: 4.4,
      totalReviews: 112
    }
  },
  {
    productNo: "OIL003",
    name: "Sunflower Oil Refined",
    brand: "Fortune",
    description: "Light and healthy sunflower oil for everyday cooking",
    images: [
      {
        url: "https://foodunpacked.com/wp-content/uploads/2022/01/AdobeStock_216474104-scaled.jpeg",
        alt: "Sunflower Oil Refined"
      }
    ],
    price: {
      mrp: 150,
      sellingPrice: 135,
      discountPercent: 10
    },
    unit: {
      quantity: 1,
      unitType: "kg"
    },
    category: "dals",
    subcategory: "Masoor Dal",
    stock: 130,
    isAvailable: true,
    tags: ["masoor dal", "red", "quick cooking", "protein"],
    expiryDate: new Date("2026-06-10"),
    warehouseLocation: "G-20",
    deliveryTimeEstimate: "12 mins",
    rating: {
      average: 4.1,
      totalReviews: 134
    }
  },
  {
    productNo: "PC003",
    name: "Antiseptic Liquid",
    brand: "Dettol",
    description: "Antiseptic liquid for cuts, wounds and personal hygiene",
    images: [
      {
        url: "https://foodunpacked.com/wp-content/uploads/2022/01/AdobeStock_216474104-scaled.jpeg",
        alt: "Antiseptic Liquid"
      }
    ],
    price: {
      mrp: 85,
      sellingPrice: 76,
      discountPercent: 10.6
    },
    unit: {
      quantity: 125,
      unitType: "ml"
    },
    category: "personal care",
    subcategory: "Healthcare",
    stock: 90,
    isAvailable: true,
    tags: ["antiseptic", "dettol", "healthcare", "hygiene"],
    expiryDate: new Date("2027-03-20"),
    warehouseLocation: "H-12",
    deliveryTimeEstimate: "15 mins",
    rating: {
      average: 4.5,
      totalReviews: 187
    }
  },
  {
    productNo: "BEV003",
    name: "Masala Chai Tea Bags",
    brand: "Tata Tea",
    description: "Aromatic masala chai tea bags with traditional spices",
    images: [
      {
        url: "https://foodunpacked.com/wp-content/uploads/2022/01/AdobeStock_216474104-scaled.jpeg",
        alt: "Masala Chai Tea Bags"
      }
    ],
    price: {
      mrp: 180,
      sellingPrice: 162,
      discountPercent: 10
    },
    unit: {
      quantity: 30,
      unitType: "pcs"
    },
    category: "beverages",
    subcategory: "Tea",
    stock: 120,
    isAvailable: true,
    tags: ["masala chai", "tea bags", "spices", "aromatic"],
    expiryDate: new Date("2026-09-15"),
    warehouseLocation: "I-15",
    deliveryTimeEstimate: "12 mins",
    rating: {
      average: 4.3,
      totalReviews: 156
    }
  },
  {
    productNo: "PCK003",
    name: "Lemon Pickle",
    brand: "Priya",
    description: "Tangy lemon pickle with traditional Andhra spices",
    images: [
      {
        url: "https://foodunpacked.com/wp-content/uploads/2022/01/AdobeStock_216474104-scaled.jpeg",
        alt: "Lemon Pickle"
      }
    ],
    price: {
      mrp: 75,
      sellingPrice: 68,
      discountPercent: 9.3
    },
    unit: {
      quantity: 300,
      unitType: "g"
    },
    category: "picks",
    subcategory: "Fruit Pickles",
    stock: 85,
    isAvailable: true,
    tags: ["lemon pickle", "tangy", "Andhra style", "traditional"],
    expiryDate: new Date("2026-10-30"),
    warehouseLocation: "J-15",
    deliveryTimeEstimate: "15 mins",
    rating: {
      average: 4.4,
      totalReviews: 128
    }
  },
  {
    productNo: "FLR004",
    name: "Besan Gram Flour",
    brand: "Everest",
    description: "Pure gram flour made from premium quality chana dal",
    images: [
      {
        url: "https://foodunpacked.com/wp-content/uploads/2022/01/AdobeStock_216474104-scaled.jpeg",
        alt: "Besan Gram Flour"
      }
    ],
    price: {
      mrp: 120,
      sellingPrice: 108,
      discountPercent: 10
    },
    unit: {
      quantity: 1,
      unitType: "kg"
    },
    category: "flour",
    subcategory: "Gram Flour",
    stock: 100,
    isAvailable: true,
    tags: ["besan", "gram flour", "chana dal", "pure"],
    expiryDate: new Date("2025-12-20"),
    warehouseLocation: "A-18",
    deliveryTimeEstimate: "10 mins",
    rating: {
      average: 4.3,
      totalReviews: 98
    }
  },
  {
    productNo: "ATT004",
    name: "Jowar Flour",
    brand: "24 Mantra",
    description: "Organic jowar flour, gluten-free and nutritious",
    images: [
      {
        url: "https://foodunpacked.com/wp-content/uploads/2022/01/AdobeStock_216474104-scaled.jpeg",
        alt: "Jowar Flour"
      }
    ],
    price: {
      mrp: 180,
      sellingPrice: 162,
      discountPercent: 10
    },
    unit: {
      quantity: 1,
      unitType: "kg"
    },
    category: "atta",
    subcategory: "Millet Flour",
    stock: 65,
    isAvailable: true,
    tags: ["jowar", "gluten-free", "organic", "millet"],
    expiryDate: new Date("2026-02-15"),
    warehouseLocation: "A-20",
    deliveryTimeEstimate: "18 mins",
    rating: {
      average: 4.2,
      totalReviews: 54
    }
  },
  {
    productNo: "PUL004",
    name: "Kabuli Chana",
    brand: "Tata Sampann",
    description: "Premium quality kabuli chana, perfect for chole",
    images: [
      {
        url: "https://foodunpacked.com/wp-content/uploads/2022/01/AdobeStock_216474104-scaled.jpeg",
        alt: "Kabuli Chana"
      }
    ],
    price: {
      mrp: 170,
      sellingPrice: 153,
      discountPercent: 10
    },
    unit: {
      quantity: 1,
      unitType: "kg"
    },
    category: "pulses",
    subcategory: "Chana",
    stock: 80,
    isAvailable: true,
    tags: ["kabuli chana", "chickpeas", "protein", "chole"],
    expiryDate: new Date("2026-08-20"),
    warehouseLocation: "C-22",
    deliveryTimeEstimate: "15 mins",
    rating: {
      average: 4.3,
      totalReviews: 143
    }
  },
  {
    productNo: "OIL004",
    name: "Coconut Oil Pure",
    brand: "Parachute",
    description: "100% pure coconut oil for cooking and hair care",
    images: [
      {
        url: "https://foodunpacked.com/wp-content/uploads/2022/01/AdobeStock_216474104-scaled.jpeg",
        alt: "Coconut Oil Pure"
      }
    ],
    price: {
      mrp: 180,
      sellingPrice: 162,
      discountPercent: 10
    },
    unit: {
      quantity: 500,
      unitType: "ml"
    },
    category: "oils",
    subcategory: "Coconut Oil",
    stock: 95,
    isAvailable: true,
    tags: ["coconut oil", "pure", "cooking", "hair care"],
    expiryDate: new Date("2026-12-10"),
    warehouseLocation: "D-28",
    deliveryTimeEstimate: "12 mins",
    rating: {
      average: 4.4,
      totalReviews: 176
    }
  },
  {
    productNo: "RIC004",
    name: "Jeera Rice",
    brand: "India Gate",
    description: "Aromatic jeera rice, perfect for biryani and pulao",
    images: [
      {
        url: "https://foodunpacked.com/wp-content/uploads/2022/01/AdobeStock_216474104-scaled.jpeg",
        alt: "Jeera Rice"
      }
    ],
    price: {
      mrp: 320,
      sellingPrice: 288,
      discountPercent: 10
    },
    unit: {
      quantity: 5,
      unitType: "kg"
    },
    category: "rice",
    subcategory: "Basmati Rice",
    stock: 110,
    isAvailable: true,
    tags: ["jeera rice", "aromatic", "biryani", "pulao"],
    expiryDate: new Date("2026-12-25"),
    warehouseLocation: "E-18",
    deliveryTimeEstimate: "10 mins",
    rating: {
      average: 4.5,
      totalReviews: 234
    }
  },
  {
    productNo: "GHE004",
    name: "Organic Cow Ghee",
    brand: "Organic India",
    description: "Certified organic cow ghee, pure and chemical-free",
    images: [
      {
        url: "https://foodunpacked.com/wp-content/uploads/2022/01/AdobeStock_216474104-scaled.jpeg",
        alt: "Organic Cow Ghee"
      }
    ],
    price: {
      mrp: 750,
      sellingPrice: 675,
      discountPercent: 10
    },
    unit: {
      quantity: 500,
      unitType: "ml"
    },
    category: "ghee",
    subcategory: "A2 Cow Ghee",
    stock: 45,
    isAvailable: true,
    tags: ["organic", "cow ghee", "pure", "chemical-free"],
    expiryDate: new Date("2026-06-30"),
    warehouseLocation: "F-15",
    deliveryTimeEstimate: "20 mins",
    rating: {
      average: 4.6,
      totalReviews: 67
    }
  },
  {
    productNo: "DAL004",
    name: "Rajma Red Kidney Beans",
    brand: "Tata Sampann",
    description: "Premium red kidney beans, perfect for rajma curry",
    images: [
      {
        url: "https://foodunpacked.com/wp-content/uploads/2022/01/AdobeStock_216474104-scaled.jpeg",
        alt: "Rajma Red Kidney Beans"
      }
    ],
    price: {
      mrp: 180,
      sellingPrice: 162,
      discountPercent: 10
    },
    unit: {
      quantity: 1,
      unitType: "kg"
    },
    category: "dals",
    subcategory: "Rajma",
    stock: 75,
    isAvailable: true,
    tags: ["rajma", "kidney beans", "protein", "curry"],
    expiryDate: new Date("2026-09-15"),
    warehouseLocation: "G-25",
    deliveryTimeEstimate: "15 mins",
    rating: {
      average: 4.3,
      totalReviews: 189
    }
  },
  {
    productNo: "PC004",
    name: "Moisturizing Lotion",
    brand: "Nivea",
    description: "Daily moisturizing body lotion for soft and smooth skin",
    images: [
      {
        url: "https://foodunpacked.com/wp-content/uploads/2022/01/AdobeStock_216474104-scaled.jpeg",
        alt: "Moisturizing Lotion"
      }
    ],
    price: {
      mrp: 250,
      sellingPrice: 225,
      discountPercent: 10
    },
    unit: {
      quantity: 200,
      unitType: "ml"
    },
    category: "personal care",
    subcategory: "Body Care",
    stock: 60,
    isAvailable: true,
    tags: ["moisturizer", "body lotion", "soft skin", "daily care"],
    expiryDate: new Date("2027-01-20"),
    warehouseLocation: "H-18",
    deliveryTimeEstimate: "18 mins",
    rating: {
      average: 4.2,
      totalReviews: 145
    }
  },
  {
    productNo: "BEV004",
    name: "Fresh Apple Juice",
    brand: "Tropicana",
    description: "100% fresh apple juice with natural fruit goodness",
    images: [
      {
        url: "https://foodunpacked.com/wp-content/uploads/2022/01/AdobeStock_216474104-scaled.jpeg",
        alt: "Fresh Apple Juice"
      }
    ],
    price: {
      mrp: 120,
      sellingPrice: 108,
      discountPercent: 10
    },
    unit: {
      quantity: 1,
      unitType: "l"
    },
    category: "beverages",
    subcategory: "Juices",
    stock: 50,
    isAvailable: true,
    tags: ["apple juice", "fresh", "natural", "vitamin"],
    expiryDate: new Date("2025-11-30"),
    warehouseLocation: "I-20",
    deliveryTimeEstimate: "12 mins",
    rating: {
      average: 4.0,
      totalReviews: 89
    }
  },
  {
    productNo: "PCK004",
    name: "Garlic Pickle",
    brand: "Mother's Recipe",
    description: "Spicy garlic pickle with traditional South Indian taste",
    images: [
      {
        url: "https://foodunpacked.com/wp-content/uploads/2022/01/AdobeStock_216474104-scaled.jpeg",
        alt: "Garlic Pickle"
      }
    ],
    price: {
      mrp: 90,
      sellingPrice: 81,
      discountPercent: 10
    },
    unit: {
      quantity: 300,
      unitType: "g"
    },
    category: "picks",
    subcategory: "Vegetable Pickles",
    stock: 70,
    isAvailable: true,
    tags: ["garlic pickle", "spicy", "South Indian", "traditional"],
    expiryDate: new Date("2026-11-20"),
    warehouseLocation: "J-18",
    deliveryTimeEstimate: "15 mins",
    rating: {
      average: 4.3,
      totalReviews: 167
    }
  },
  {
    productNo: "FLR005",
    name: "Rice Flour",
    brand: "Everest",
    description: "Fine rice flour for making dosa, idli and other South Indian dishes",
    images: [
      {
        url: "https://foodunpacked.com/wp-content/uploads/2022/01/AdobeStock_216474104-scaled.jpeg",
        alt: "Rice Flour"
      }
    ],
    price: {
      mrp: 80,
      sellingPrice: 72,
      discountPercent: 10
    },
    unit: {
      quantity: 1,
      unitType: "kg"
    },
    category: "flour",
    subcategory: "Rice Flour",
    stock: 90,
    isAvailable: true,
    tags: ["rice flour", "dosa", "idli", "South Indian"],
    expiryDate: new Date("2025-12-15"),
    warehouseLocation: "A-22",
    deliveryTimeEstimate: "12 mins",
    rating: {
      average: 4.1,
      totalReviews: 78
    }
  },
  {
    productNo: "ATT005",
    name: "Ragi Flour",
    brand: "Pro Nature",
    description: "Organic ragi flour, rich in calcium and iron",
    images: [
      {
        url: "https://foodunpacked.com/wp-content/uploads/2022/01/AdobeStock_216474104-scaled.jpeg",
        alt: "Ragi Flour"
      }
    ],
    price: {
      mrp: 150,
      sellingPrice: 135,
      discountPercent: 10
    },
    unit: {
      quantity: 1,
      unitType: "kg"
    },
    category: "atta",
    subcategory: "Millet Flour",
    stock: 50,
    isAvailable: true,
    tags: ["ragi", "finger millet", "calcium", "iron"],
    expiryDate: new Date("2026-03-10"),
    warehouseLocation: "A-25",
    deliveryTimeEstimate: "20 mins",
    rating: {
      average: 4.4,
      totalReviews: 62
    }
  },
  {
    productNo: "PUL005",
    name: "Green Moong Whole",
    brand: "Everest",
    description: "Whole green moong beans, perfect for sprouts and curry",
    images: [
      {
        url: "https://foodunpacked.com/wp-content/uploads/2022/01/AdobeStock_216474104-scaled.jpeg",
        alt: "Green Moong Whole"
      }
    ],
    price: {
      mrp: 160,
      sellingPrice: 144,
      discountPercent: 10
    },
    unit: {
      quantity: 1,
      unitType: "kg"
    },
    category: "pulses",
    subcategory: "Moong Dal",
    stock: 85,
    isAvailable: true,
    tags: ["green moong", "whole", "sprouts", "healthy"],
    expiryDate: new Date("2026-07-25"),
    warehouseLocation: "C-25",
    deliveryTimeEstimate: "15 mins",
    rating: {
      average: 4.2,
      totalReviews: 123
    }
  },
  {
    productNo: "OIL005",
    name: "Sesame Oil",
    brand: "Idhayam",
    description: "Cold-pressed sesame oil with natural aroma and taste",
    images: [
      {
        url: "https://foodunpacked.com/wp-content/uploads/2022/01/AdobeStock_216474104-scaled.jpeg",
        alt: "Sesame Oil"
      }
    ],
    price: {
      mrp: 220,
      sellingPrice: 198,
      discountPercent: 10
    },
    unit: {
      quantity: 500,
      unitType: "ml"
    },
    category: "oils",
    subcategory: "Sesame Oil",
    stock: 70,
    isAvailable: true,
    tags: ["sesame oil", "cold-pressed", "natural", "aromatic"],
    expiryDate: new Date("2026-10-20"),
    warehouseLocation: "D-30",
    deliveryTimeEstimate: "18 mins",
    rating: {
      average: 4.5,
      totalReviews: 98
    }
  },
  {
    productNo: "RIC005",
    name: "Ponni Rice",
    brand: "Laxmi",
    description: "Premium ponni rice from Tamil Nadu, perfect for daily meals",
    images: [
      {
        url: "https://foodunpacked.com/wp-content/uploads/2022/01/AdobeStock_216474104-scaled.jpeg",
        alt: "Ponni Rice"
      }
    ],
    price: {
      mrp: 250,
      sellingPrice: 225,
      discountPercent: 10
    },
    unit: {
      quantity: 5,
      unitType: "kg"
    },
    category: "rice",
    subcategory: "Ponni Rice",
    stock: 130,
    isAvailable: true,
    tags: ["ponni rice", "Tamil Nadu", "daily meals", "premium"],
    expiryDate: new Date("2026-12-31"),
    warehouseLocation: "E-22",
    deliveryTimeEstimate: "12 mins",
    rating: {
      average: 4.3,
      totalReviews: 187
    }
  },
  {
    productNo: "GHE005",
    name: "Bilona Ghee",
    brand: "Govind",
    description: "Traditional bilona method cow ghee, hand-churned",
    images: [
      {
        url: "https://foodunpacked.com/wp-content/uploads/2022/01/AdobeStock_216474104-scaled.jpeg",
        alt: "Bilona Ghee"
      }
    ],
    price: {
      mrp: 800,
      sellingPrice: 720,
      discountPercent: 10
    },
    unit: {
      quantity: 500,
      unitType: "ml"
    },
    category: "ghee",
    subcategory: "A2 Cow Ghee",
    stock: 35,
    isAvailable: true,
    tags: ["bilona", "hand-churned", "traditional", "premium"],
    expiryDate: new Date("2026-07-15"),
    warehouseLocation: "F-18",
    deliveryTimeEstimate: "25 mins",
    rating: {
      average: 4.8,
      totalReviews: 45
    }
  }
];
