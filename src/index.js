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

const PORT = process.env.PORT;


app.get('/', (req, res) => {
	console.log("healthcheck");
	
	res.send("Hello, Welcome to codeher : )");
})

import authRouter from "./routes/auth.routes.js";
import problemRouter from "./routes/problem.routes.js";

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/problem", problemRouter);

app.listen(PORT, () => {
	console.log(`App is listening on port ${PORT}`);
	
})