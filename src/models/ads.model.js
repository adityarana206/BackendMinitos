const mongoose = require('mongoose');



const addScheme =new mongoose.Schema({
    adsImage:{
        type:String,
        require:true,
    },
    
})

module.exports = mongoose.model('Ads', addScheme);