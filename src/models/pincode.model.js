const mongoose = require('mongoose')

const pincode = new mongoose.Schema({
    pincode:{
        type:Number,
    required:true,
    },
    city:{
        type:String,
        require:true
    },
    state:{
        type:String,
        required:true
    }
})
module.exports= mongoose.model('Pincode',pincode)