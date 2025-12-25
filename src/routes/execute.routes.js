import { Router } from "express";
import { verifyAuth } from "../middleware/auth.middleware.js";
import { executeCode, submitCode } from "../controllers/executeCode.controller.js";

const executionRouter = Router();

executionRouter.post('/', verifyAuth, executeCode)
executionRouter.post('/submit', verifyAuth, submitCode)
export default executionRouter;