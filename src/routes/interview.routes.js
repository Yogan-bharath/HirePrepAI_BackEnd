const express  = require("express");
const authMiddleWare = require("../middleware/auth.middleware");
const interViewController = require("../controllers/interview.controller")
const upload = require("../middleware/file.middleware")
const interViewRouter = express.Router()

/**
 * @method : POST /api/interview/
 * @access  : private
 * @description : to generateInterviewReport 
 */

interViewRouter.post("/",authMiddleWare.authUser,upload.single("resume"),interViewController.generaterInterviewReportController)

/**
 * @method : GET /api/interview/report/:interViewID
 * @access  : private
 * @description : to get my Interview report interviewId
 */

interViewRouter.get("/report/:interViewID",authMiddleWare.authUser,interViewController.getInterViewReportByIdController)
/**
 * @method : GET /api/interview/
 * @access  : private
 * @description : to get alll Interview reports
 */

interViewRouter.get("/",authMiddleWare.authUser,interViewController.getAllInterviewController)

/**
 * @method : POST /api/interview/resume/pdf/:interViewID
 * @access  : private
 * @description : to generate resume pdf
 */
interViewRouter.post("/resume/pdf/:interViewID",authMiddleWare.authUser,interViewController.generateResumePdfController)

module.exports = interViewRouter;