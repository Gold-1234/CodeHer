import { Router } from "express";
import { checkAdmin, verifyAuth } from "../middleware/auth.middleware.js";
import { createProblem, deleteProblem, getAllProblems, getProblemById, getProblemSolvedByUser, updateProblem } from "../controllers/problem.controller.js";

const problemRouter = Router();

problemRouter.post('/create-problem', verifyAuth, checkAdmin, createProblem)
problemRouter.get('/problems', verifyAuth, getAllProblems)
problemRouter.get('/problem/:id', verifyAuth, getProblemById)
problemRouter.delete('/delete-problem/:id', verifyAuth, checkAdmin, deleteProblem)
problemRouter.put('/update-problem/:id', verifyAuth, checkAdmin, updateProblem)
problemRouter.get('/solved-problem', verifyAuth, getProblemSolvedByUser)

export default problemRouter