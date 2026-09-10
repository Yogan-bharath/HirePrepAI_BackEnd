const dotenv = require("dotenv");
dotenv.config();

const app = require("./src/app.js");
const DB = require("./src/config/database.js")

const PORT = process.env.PORT || 3000


app.listen(PORT,async ()=>{
    await DB()
    console.log(`Server is running on http://localhost:${PORT}`)
})