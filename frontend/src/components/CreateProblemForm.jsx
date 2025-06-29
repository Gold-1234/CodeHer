import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Plus,
  Trash2,
  Code2,
  FileText,
  LightBulb,
  BookOpen,
  CheckCircle2,
  Download,
} from "lucide-react";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Navigate, useNavigate, useNavigation } from "react-router-dom";

const problemSchema = z.object({
  title: z.string().min(3, "Title should be at least 3 characters."),
  description: z
    .string()
    .min(10, "Description should.  bat least 10 characters."),
  difficulty: z.enum(["HARD", "MEDIUM", "EASY"]),
  tags: z.array(z.string()).min(1, "At least one tag is required."),
  examples: z.object({
    JAVASCRIPT: z.object({
      input: z.string().min(1, "Input is required."),
      output: z.string().min(1, "Output is required."),
      explanation: z.string().optional(),
    }),
    PYTHON: z.object({
      input: z.string().min(1, "Input is required."),
      output: z.string().min(1, "Output is required."),
      explanation: z.string().optional(),
    }),
    JAVA: z.object({
      input: z.string().min(1, "Input is required."),
      output: z.string().min(1, "Output is required."),
      explanation: z.string().optional(),
    }),
  }),
  constraints: z.string().min(1, "Atleast 1 constraints required."),
  testcases: z
    .array(
      z.object({
        input: z.string().min(1, "Input is required."),
        output: z.string().min(1, "Output is required."),
      })
    )
    .min(1, "Atleast one testcase is required."),
  codeSnippets: z.object({
    JAVASCRIPT: z.string().min(1, "Input is required."),
    PYTHON: z.string().min(1, "Output is required."),
    JAVA: z.string().optional(),
  }),
});

const CreateProblemForm = () => {
  const navigation = useNavigate();
  const { register, control, handleSubmit, reset, formState:{errors}} = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      defaultValues: {
        testcases: [{ input: "", output: "" }],
        tags: [""],
        examples: {
          JAVASCRIPT: { input: "", output: "", explanation: "" },
          PYTHON: { input: "", output: "", explanation: "" },
          JAVA: { input: "", output: "", explanation: "" },
        },
        codeSnippets: {
          JAVASCRIPT: "function solution() {\n  // Write your code here\n}",
          PYTHON: "def solution():\n    # Write your code here\n    pass",
          JAVA: "public class Solution {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}",
        },
        referenceSolutions: {
          JAVASCRIPT: "// Add your reference solution here",
          PYTHON: "# Add your reference solution here",
          JAVA: "// Add your reference solution here",
        },
      },
    },
  });

  const { 
	fields : testcaseFields, 
	append : appendTestcase, 
	remove : removeTestcase, 
	replace: replaceTestcases 
	} = useFieldArray({
	control,
	name: "testCases"
  })
  const { 
	fields : tagFields, 
	append : appendTag, 
	remove : removeTag, 
	replace: replaceTag 
	} = useFieldArray({
	control,
	name: "tags"
  })

  const [ isLoading, setIsLoading ] = useState(false);

  const onSubmit = async(value) => {
	console.log(value);
	
  }

  return (
  	<div className="container mx-auto py-8 px-4 max-w-7xl">
		
	</div>
	);
};

export default CreateProblemForm;
