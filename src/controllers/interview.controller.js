const { CanvasFactory } = require("pdf-parse/worker");
const pdfParse = require("pdf-parse");
const {generateInterviewReport , generateResumePdf } = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")
const generaterInterviewReportController = async(req,res)=>{
    const resumeContent = await (new pdfParse.PDFParse({ data: Uint8Array.from(req.file.buffer), CanvasFactory })).getText();
    const {jobDescription,selfDescription} = req.body
    const interViewReportByAi = await generateInterviewReport({resume:resumeContent.text,jobDescription,selfDescription})

    const interViewReport = await interviewReportModel.create({
        resume:resumeContent.text,
        jobDescription,
        selfDescription, 
        title:interViewReportByAi.title,
        matchScore:interViewReportByAi.matchScore,
        technicalQuestions:interViewReportByAi.technicalQuestions,
        behavioralQuestions:interViewReportByAi.behavioralQuestions,
        skillGaps:interViewReportByAi.skillGaps,
        preparationPlan:interViewReportByAi.preparationPlan,
        user:req.user.id
    })

    return res.status(201).json({
        message:"Interview Report Generated",
        interviewReport:interViewReport
    })
}


const getInterViewReportByIdController = async(req,res)=>{
    const { interViewID } = req.params

    console.log(req.user.id)
    console.log(interViewID)
    const interviewReport =  await interviewReportModel.findOne( { _id:interViewID , user:req.user.id });

    if(!interviewReport){
        return res.status(404).json({
            message:"Interview report not found"
        })
    }
    res.status(200).json({
        message:"Interview report fetched successfully",
        interviewReport
    })
}

const getAllInterviewController = async(req,res)=>{
    const interviewReports = await interviewReportModel.find({user:req.user.id}).sort({createdAt:-1}).select("-__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan -resume -selfDescription -jobDescription")
    res.status(200).json({
        message:"Interview reports fetched successfully",
        interviewReports
    })
}

const generateResumePdfController = async(req,res)=>{
    const { interViewID } = req.params
    const interviewResport = await interviewReportModel.findOne({ _id:interViewID , user:req.user.id })
    if(!interviewResport){
        return res.status(404).json({
            message:"Interview report not found"
        })
    }
    const {resume , selfDescription , jobDescription} = interviewResport
    const pdfBuffer = await generateResumePdf({resume,selfDescription,jobDescription})
    res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=resume_${interViewID}.pdf`,
        'Content-Length': pdfBuffer.length
    });
    res.status(200).send(pdfBuffer);
 }
module.exports = {generaterInterviewReportController,getInterViewReportByIdController,getAllInterviewController,generateResumePdfController}