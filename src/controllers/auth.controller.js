const mongoose = require("mongoose")
const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const tokenBlockListMModel = require("../models/tokenBlackList.model");

/** 
    @route - POST /api/auth/register
    @access public
*/
async function RegisterUserController (req,res){
    const {username , email , password } = req.body;
    
    if(!username || !email || !password ){
        return res.status(400).json({
            message:"Please Provide username, email and password"
        })
    }

    const isUserExists = await userModel.findOne({ $or: [ { username } , { email } ] })
    
    if(isUserExists){
        return res.status(409).json({
            message:"User email or username Exists"
        })
    }

    const hashPassword = await bcrypt.hash(password,10);

    const user = await userModel.create( { 
        username,
        email,
        password:hashPassword
     } )
    
    const token = jwt.sign({
        id:user._id,
        username:user.username},process.env.JWT_KEY,{
            expiresIn:"1d"
        });

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    });

    return res.status(201).json({
        message:"User Created Successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    }) 
}

async function LoginUserController(req,res){
    const { email , password } = req.body;
    const user = await userModel.findOne({ email })
    if(!user){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }
    const isPasswordValid = await bcrypt.compare(password,user.password);

    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }

    const token = jwt.sign({
        id:user._id,
        username:user.username
    },process.env.JWT_KEY,{
        expiresIn:"1d"
    })

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    });

    return res.status(200).json({
        message:"User LoggedIn Successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })

}

async function logOutController(req,res) {
    const token = req.cookies.token
    if(token){
        await tokenBlockListMModel.create({token})
    }
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    });
    res.status(200).json({
        message:"User LogOut Successfully"
    })
}

async function getMeController(req,res){
    
    const user = await userModel.findById(req.user.id)
    
    return res.status(200).json({
        message:"User details fetched Successfully",
        user:{
            username:user.username,
            email:user.email
        }
    })
}
 

module.exports = {
    RegisterUserController,LoginUserController,logOutController,getMeController
}
