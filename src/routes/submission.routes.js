import express from "express";
import { verifyAuth } from "../middleware/auth.middleware.js";
import { getAllSubmissions, getSubmissionForProblem, getSubmissionForProblemCount } from "../controllers/submission.controller.js";

const submissionRouter = express.Router();

submissionRouter.get('/get-all-submissions', verifyAuth, getAllSubmissions);
submissionRouter.get('/get-submissions/:problemId', verifyAuth, getSubmissionForProblem);
submissionRouter.get('/get-submissions-count/:problemId', verifyAuth, getSubmissionForProblemCount);

export default submissionRouter;