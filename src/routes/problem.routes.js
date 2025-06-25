import { Router } from "express";
import { checkAdmin, verifyAuth } from "../middleware/auth.middleware.js";
import { createProblem, deleteProblem, getAllProblems, getProblemById, getProblemSolvedByUser, updateProblem } from "../controllers/problem.controller.js";

const problemRouter = Router();

problemRouter.post('/create', verifyAuth, checkAdmin, createProblem)
problemRouter.get('/set', verifyAuth, getAllProblems)
problemRouter.get('/id/:id', verifyAuth, getProblemById)
problemRouter.delete('/delete/:id', verifyAuth, checkAdmin, deleteProblem)
problemRouter.put('/update/:id', verifyAuth, checkAdmin, updateProblem)
problemRouter.get('/solved', verifyAuth, getProblemSolvedByUser)

export default problemRouter