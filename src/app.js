const express = require("express")
const authRouter =require("./routes/auth.routes") 
const interViewRouter =require("./routes/interview.routes") 
const cookieParser = require("cookie-parser")
const cors = require("cors")
const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin:"https://hire-prep-ai-front-end-e985.vercel.app",
    credentials:true
}))

app.get("/",(req,res)=>{
    res.status(200).json({
        message:"Welcome to HirePrepAi"
    })
})
app.use("/api/auth",authRouter)
app.use("/api/interview",interViewRouter)


module.exports = app;