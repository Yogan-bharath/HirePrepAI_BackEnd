const mongoose = require("mongoose")

const DB = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB connects ✅✅")
    }catch(error){
        console.log("Error in Connection BD");
    }
}

module.exports = DB;