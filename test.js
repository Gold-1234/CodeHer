// test-prisma.js
import { db } from "./src/libs/db.js";

async function test() {
  try {
    const submission = await db.Submission.create({
      data: {
        userId: "21339f87-cd40-4c7b-b556-63bf8251dfdf",
        problemId: "204f6bf9-db5e-49b9-b251-053d519964b7",
        sourceCode: "test",
        language: "JAVASCRIPT",
        status: "Accepted",
		stdin: "test",
		stderr: "error",
		stdout: "output",
		compileOutput : "compile output",
		status : "status",
		memory: "memory",
		time : "time"
      }
    });
    console.log(submission);
  } catch (e) {
    console.error(e);
  }
}

test();