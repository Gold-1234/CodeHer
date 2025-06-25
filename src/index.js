import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"

dotenv.config()

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: process.env.BASE_URL,
		credentials: true
	})
)
app.use((req, res, next) => {
  console.log("Request Path:", req.path); // /api/submit
  console.log("Full URL:", req.originalUrl); // /api/submit?lang=cpp
  next();
});

const PORT = process.env.PORT;


app.get('/', (req, res) => {
	console.log("healthcheck");
	
	res.send("Hello, Welcome to codeher : )");
})

import authRouter from "./routes/auth.routes.js";
import problemRouter from "./routes/problem.routes.js";
import executionRouter from "./routes/execute.routes.js";
import submissionRouter from "./routes/submission.routes.js";
import listRouter from "./routes/lists.routes.js"


app.use("/api/v1/auth", authRouter);
app.use("/api/v1/problem", problemRouter);
app.use("/api/v1/execute-code", executionRouter);
app.use("/api/v1/submission", submissionRouter);
app.use("/api/v1/list", listRouter);


app.listen(PORT, () => {
	console.log(`App is listening on port ${PORT}`);
	
})