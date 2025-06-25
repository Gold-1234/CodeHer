import { Router } from "express";
import { verifyAuth } from "../middleware/auth.middleware.js";
import { executeCode } from "../controllers/executeCode.controller.js";

const executionRouter = Router();

executionRouter.post('/', verifyAuth, executeCode)

export default executionRouter;