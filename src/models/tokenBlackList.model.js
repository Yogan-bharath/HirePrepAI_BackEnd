const mongoose = require("mongoose")

const tokenBlockListSchema = new mongoose.Schema({
    token:{
        type:String,
        require:[true,"Token is Required to Block"]
    }
},{
    timeseries:true
})

const tokenBlockListMModel = mongoose.model("tokenBlockList",tokenBlockListSchema)

module.exports = tokenBlockListMModel;