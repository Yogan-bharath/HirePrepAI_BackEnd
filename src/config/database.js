const mongoose = require("mongoose");

const DB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DB connects ✅✅");
    } catch (error) {
        console.error("Error in Connection DB:", error);
        throw error;
    }
};

module.exports = DB;