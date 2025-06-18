import { Router } from "express";
import { check, login, logout, register } from "../controllers/auth.controller.js";
import { verifyAuth } from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", register)
authRouter.post("/login", login)
authRouter.post("/logout", verifyAuth, logout)
authRouter.get("/check", verifyAuth,check)

export default authRouter;