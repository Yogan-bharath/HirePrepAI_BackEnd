const express = require("express")
const authController = require("../controllers/auth.controller")
const authMiddleWare = require("../middleware/auth.middleware")
const authRouter = express.Router();
/** 
@route - POST /api/auth/register    
*/
authRouter.post("/register",authController.RegisterUserController);
/** 
 @route - POST /api/auth/login 
 */
authRouter.post("/login",authController.LoginUserController);
/** 
 @route - GET /api/auth/logout    
 */
authRouter.get("/logout",authController.logOutController);
/** 
 @route - GET /api/auth/get-me    
 */
authRouter.get("/get-me",authMiddleWare.authUser,authController.getMeController);


module.exports = authRouter