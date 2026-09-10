require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
zodToJsonSchema = require("zod-to-json-schema").default



const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GEN_AI_API_KEY
});


/* =========================================================
   JSON SCHEMA
   ========================================================= */

const interviewReportJsonSchema = {
    type: "object",

    properties: {

        matchScore: {
            type: "number",
            description:
                "A score between 0 and 100 indicating how well the user's resume and self description match the job description."
        },

        technicalQuestions: {
            type: "array",

            description:
                "Technical interview questions personalized to the candidate.",

            items: {
                type: "object",

                properties: {

                    question: {
                        type: "string",
                        description:
                            "The technical question that can be asked in the interview."
                    },

                    intention: {
                        type: "string",
                        description:
                            "The interviewer's intention behind asking this question."
                    },

                    answer: {
                        type: "string",
                        description:
                            "How the candidate should answer the question, including important concepts and points to cover."
                    }
                },

                required: [
                    "question",
                    "intention",
                    "answer"
                ]
            }
        },


        behavioralQuestions: {
            type: "array",

            description:
                "Behavioral interview questions personalized to the candidate.",

            items: {
                type: "object",

                properties: {

                    question: {
                        type: "string",
                        description:
                            "The behavioral question that can be asked in the interview."
                    },

                    intention: {
                        type: "string",
                        description:
                            "The interviewer's intention behind asking this behavioral question."
                    },

                    answer: {
                        type: "string",
                        description:
                            "How the candidate should answer this question, preferably using the STAR method."
                    }
                },

                required: [
                    "question",
                    "intention",
                    "answer"
                ]
            }
        },


        skillGaps: {
            type: "array",

            description:
                "Skills missing from the candidate that are relevant to the job description.",

            items: {
                type: "object",

                properties: {

                    skill: {
                        type: "string",
                        description:
                            "The skill or technology that the candidate is lacking."
                    },

                    severity: {
                        type: "string",

                        enum: [
                            "low",
                            "medium",
                            "high"
                        ],

                        description:
                            "Severity of the skill gap."
                    }
                },

                required: [
                    "skill",
                    "severity"
                ]
            }
        },


        preparationPlan: {
            type: "array",

            description:
                "A day-by-day preparation plan for the candidate.",

            items: {
                type: "object",

                properties: {

                    day: {
                        type: "integer",
                        description:
                            "The day number of the preparation plan, starting from 1."
                    },

                    focus: {
                        type: "string",
                        description:
                            "The main focus for the day."
                    },

                    tasks: {
                        type: "array",

                        items: {
                            type: "string"
                        },

                        description:
                            "The tasks the candidate should complete during the day."
                    }
                },

                required: [
                    "day",
                    "focus",
                    "tasks"
                ]
            }
        },

        title:{
            type:"string",
            description:"The title of the interview report",
        }
    },

    required: [
        "matchScore",
        "technicalQuestions",
        "behavioralQuestions",
        "skillGaps",
        "preparationPlan",
        "title"
    ]
};


/* =========================================================
   ZOD VALIDATION SCHEMA
   ========================================================= */

const interviewReportSchema = z.object({

    matchScore: z
        .number()
        .min(0)
        .max(100),

    technicalQuestions: z.array(
        z.object({
            question: z.string(),
            intention: z.string(),
            answer: z.string()
        })
    ),

    behavioralQuestions: z.array(
        z.object({
            question: z.string(),
            intention: z.string(),
            answer: z.string()
        })
    ),

    skillGaps: z.array(
        z.object({
            skill: z.string(),
            severity: z.enum([
                "low",
                "medium",
                "high"
            ])
        })
    ),

    preparationPlan: z.array(
        z.object({
            day: z.number(),
            focus: z.string(),
            tasks: z.array(z.string())
        })
    ),
    title: z.string().describe("The title of the interview report")
});


/* =========================================================
   GENERATE INTERVIEW REPORT
   ========================================================= */

const generateInterviewReport = async ({
    resume,
    selfDescription,
    jobDescription
}) => {

    const prompt = `
You are an expert career coach, technical recruiter,
and interview preparation assistant.

Analyze the candidate's resume, self-description,
and the target job description.

========================
JOB DESCRIPTION
========================

${jobDescription}


========================
RESUME
========================

${resume}


========================
SELF DESCRIPTION
========================

${selfDescription}


========================
TASK
========================

Generate a highly personalized interview preparation report.


MATCH SCORE:

Calculate a realistic score from 0 to 100 based on:

- Technical skill match
- Project relevance
- Required technologies
- Candidate experience
- Education requirements
- Missing skills
- Overall job relevance

Do not give an unnecessarily high score.


TECHNICAL QUESTIONS:

Generate 8 technical interview questions.

Prioritize:

1. Candidate's actual projects
2. Technologies explicitly mentioned in the resume
3. Technologies required by the job description
4. Important fundamentals for the role

For every question provide:

- question
- intention
- answer

IMPORTANT:

Never invent technologies or implementation details.

For example, if the resume does not say Redux was used,
do not claim that Redux was used.

Instead ask an open-ended question such as:

"How did you manage state in your application?"


BEHAVIORAL QUESTIONS:

Generate 5 behavioral interview questions.

Make them relevant to:

- Candidate projects
- Candidate experience
- Job requirements
- Teamwork
- Problem solving
- Learning ability
- Communication

For every question provide:

- question
- intention
- answer

Use the STAR method where appropriate.


SKILL GAPS:

Identify 3-5 genuine skill gaps.

Only include skills that:

- Are relevant to the job description
- Are not clearly demonstrated in the resume
- Would actually help the candidate perform better in the role

Do not invent skill gaps unnecessarily.

Severity:

low = relatively easy to learn

medium = requires meaningful preparation

high = requires substantial preparation


PREPARATION PLAN:

Create a 7-day preparation plan.

The plan must be personalized according to:

- Technical questions
- Behavioral questions
- Skill gaps
- Candidate projects
- Job requirements

Each day should contain:

- day
- focus
- tasks

Tasks should be specific and actionable.

Title: 

create a concise and relevant title for the interview report.


Do not generate a generic preparation plan.


IMPORTANT:

Use only information supported by the provided resume
and self-description.

Never claim that the candidate used a technology
unless it is explicitly supported by the provided information.

Return ONLY the structured JSON response.
`;


    try {

        const res = await ai.models.generateContent({
            model: "gemini-3.1-flash-lite",
            contents: prompt,

            config: {
                responseMimeType: "application/json",
                responseSchema: interviewReportJsonSchema
            }
        });

        const report = JSON.parse(res.text);

        return report;


    } catch (error) {

        console.error(
            "Interview report generation error:",
            error
        );

        throw error;
    }
};

const generateResumeFromHtml = async (htmlContent) => {
    const { default: puppeteer } = await import("puppeteer");
    try {
        
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
        const pdfBuffer = await page.pdf({ format: 'A4',margin:{
            top:'20mm',
            bottom:'20mm',
            left:'15mm',
            right:'15mm'
        } });
        await browser.close();
        return pdfBuffer;

    }catch(error){
        throw new Error("Failed to generate PDF from HTML content: " + error.message);
    }
}

const generateResumePdf = async ({resume,selfDescription,jobDescription}) => {
    const resumeSchema = z.object({
        html:z.string().describe("The HTML content of the resume which can be converted to PDF using Puppeteer")
    })
    const prompt = `Generate a professional resume in HTML format based on the following information: Resume: ${resume} Self Description: ${selfDescription} Job Description: ${jobDescription} the response should be a valid JSON object with a single key "html" containing the HTML content of the resume. the resume should be tailored to the job description and should highlight the candidate's skills and experience relevant to the job. the content of the resume should not be sound like AI generated content, it should be human written and professional. you can highlight the content using some colors and styles, but it should be professional and not too flashy. ...this is the prompt i am giving to the model and this is all i am getting Software Developer`
    try{
        const res = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: prompt,
        config:{
            responseMimeType: "application/json",
            responseSchema:  zodToJsonSchema(resumeSchema)
        }
        })
        
        const jsonContent = JSON.parse(res.text);
        
        const pdfBuffer = await generateResumeFromHtml(jsonContent.html);

        return pdfBuffer;

    }catch(error){
        throw new Error("Failed to generate resume PDF: " + error.message);
    }
}


module.exports = {generateInterviewReport,generateResumePdf};