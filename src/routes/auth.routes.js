import { Router } from "express";
import { check, createAdmin, login, logout, register } from "../controllers/auth.controller.js";
import { checkAdmin, verifyAuth } from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", register)
authRouter.post("/login", login)
authRouter.post("/logout", verifyAuth, logout)
authRouter.get("/check", verifyAuth,check)
authRouter.get("/create-admin", verifyAuth, checkAdmin, createAdmin)


export default authRouter;