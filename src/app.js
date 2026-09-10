const express = require("express")
const authRouter =require("./routes/auth.routes") 
const interViewRouter =require("./routes/interview.routes") 
const cookieParser = require("cookie-parser")
const cors = require("cors")
const app = express();

app.use(express.json());
app.use(cookieParser())

app.use(cors({
    origin:["http://localhost:3000","https://hire-prep-ai-front-end-e985.vercel.app"],
    credentials:true
}))
// this can be used for local development and testing purposes, but it should be removed or modified for production deployment to ensure security and proper access control.

app.get("/",(req,res)=>{
    res.status(200).json({
        message:"Welcome to HirePrepAi"
    })
})
app.use("/api/auth",authRouter)
app.use("/api/interview",interViewRouter)


module.exports = app;