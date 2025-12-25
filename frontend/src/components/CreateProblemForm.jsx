import React, { useCallback, useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { z } from "zod";
import {axiosInstance} from "../lib/axios"
import {useNavigate, useParams} from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { DevTool } from "@hookform/devtools";
import {
  Plus,
  Trash2,
  Code2,
  FileText,
  ChevronDown,
  BookOpen,
  CheckCircle2,
  Download,
  Lightbulb,
  Check,
  Loader,
  Save,
} from "lucide-react";
import {TextEditor} from "./TextEditor.jsx";
import CodeEditor from "./CodeEditor";
import useProblemStore from "@/store/useProblemStore";


const problemSchema = z.object({
  title: z.string().min(3, "Title should be at least 3 characters."),
  description: z
    .string()
    .min(10, "Description should.  bat least 10 characters."),
  difficulty: z.enum(["HARD", "MEDIUM", "EASY"]),
  tags: z.array(z.string()).min(1, "At least one tag is required."),
  examples: z.array(
    z.object({
      input: z.string().min(1, "Input is required."),
      output: z.string().min(1, "Output is required."),
      explanation: z.string().optional()
  })
  ),
  hints: z.array(z.string()).optional(),
  constraints: z.array(z.string()).min(1, "Atleast 1 constraints required."),
  testcases: z
    .array(
      z.object({
        input: z.string().min(1, "Input is required."),
        output: z.string().min(1, "Output is required."),
      })
    )
    .min(1, "Atleast one testcase is required."),
  codeSnippets: z.object({
    javascript: z.string().min(1, "Input is required."),
    python: z.string().min(1, "Output is required."),
    java: z.string().optional(),
  }),
  referenceSolutions: z.object({
    javascript: z.string().min(1, "Input is required."),
    python: z.string().min(1, "Output is required."),
    java: z.string().optional(),
  }),
  editorial : z
    .string()
    .min(10, "Editorial must be atleast 10 characters.")
    .optional()
});

const sampledpData = {
  title: "Climbing Stairs",
  category: "dp", // Dynamic Programming
  description:
    "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
  difficulty: "EASY",
  tags: ["Dynamic Programming", "Math", "Memoization"],
  constraints: ["1 <= n <= 45"],
  hints:[
    "To reach the nth step, you can either come from the (n-1)th step or the (n-2)th step."],
  editorial:
    "This is a classic dynamic programming problem. The number of ways to reach the nth step is the sum of the number of ways to reach the (n-1)th step and the (n-2)th step, forming a Fibonacci-like sequence.",
  testcases: [
    {
      input: "2",
      output: "2",
    },
    {
      input: "3",
      output: "3",
    },
    {
      input: "4",
      output: "5",
    },
  ],
  examples: [
    {
      input: "n = 2",
      output: "2",
      explanation:
        "There are two ways to climb to the top:\n1. 1 step + 1 step\n2. 2 steps",
    },
    {
      input: "n = 3",
      output: "3",
      explanation:
        "There are three ways to climb to the top:\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step",
    },
    {
      input: "n = 4",
      output: "5",
      explanation:
        "There are five ways to climb to the top:\n1. 1 step + 1 step + 1 step + 1 step\n2. 1 step + 1 step + 2 steps\n3. 1 step + 2 steps + 1 step\n4. 2 steps + 1 step + 1 step\n5. 2 steps + 2 steps",
    },
  ],
  codeSnippets: {
    javascript: `/**
* @param {number} n
* @return {number}
*/
function climbStairs(n) {
// Write your code here
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout,
terminal: false
});

rl.on('line', (line) => {
const n = parseInt(line.trim());
const result = climbStairs(n);

console.log(result);
rl.close();
});`,
    python: `class Solution:
  def climbStairs(self, n: int) -> int:
      # Write your code here
      pass

# Input parsing
if __name__ == "__main__":
  import sys
  
  # Parse input
  n = int(sys.stdin.readline().strip())
  
  # Solve
  sol = Solution()
  result = sol.climbStairs(n)
  
  # Print result
  print(result)`,
    java: `import java.util.Scanner;

class Main {
  public int climbStairs(int n) {
      // Write your code here
      return 0;
  }
  
  public static void main(String[] args) {
      Scanner scanner = new Scanner(System.in);
      int n = Integer.parseInt(scanner.nextLine().trim());
      
      // Use Main class instead of Solution
      Main main = new Main();
      int result = main.climbStairs(n);
      
      System.out.println(result);
      scanner.close();
  }
}`,
  },
  referenceSolutions: {
    javascript: `/**
* @param {number} n
* @return {number}
*/
function climbStairs(n) {
// Base cases
if (n <= 2) {
  return n;
}

// Dynamic programming approach
let dp = new Array(n + 1);
dp[1] = 1;
dp[2] = 2;

for (let i = 3; i <= n; i++) {
  dp[i] = dp[i - 1] + dp[i - 2];
}

return dp[n];

/* Alternative approach with O(1) space
let a = 1; // ways to climb 1 step
let b = 2; // ways to climb 2 steps

for (let i = 3; i <= n; i++) {
  let temp = a + b;
  a = b;
  b = temp;
}

return n === 1 ? a : b;
*/
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout,
terminal: false
});

rl.on('line', (line) => {
const n = parseInt(line.trim());
const result = climbStairs(n);

console.log(result);
rl.close();
});`,
    python: `class Solution:
  def climbStairs(self, n: int) -> int:
      # Base cases
      if n <= 2:
          return n
      
      # Dynamic programming approach
      dp = [0] * (n + 1)
      dp[1] = 1
      dp[2] = 2
      
      for i in range(3, n + 1):
          dp[i] = dp[i - 1] + dp[i - 2]
      
      return dp[n]
      
      # Alternative approach with O(1) space
      # a, b = 1, 2
      # 
      # for i in range(3, n + 1):
      #     a, b = b, a + b
      # 
      # return a if n == 1 else b

# Input parsing
if __name__ == "__main__":
  import sys
  
  # Parse input
  n = int(sys.stdin.readline().strip())
  
  # Solve
  sol = Solution()
  result = sol.climbStairs(n)
  
  # Print result
  print(result)`,
    java: `import java.util.Scanner;

class Main {
  public int climbStairs(int n) {
      // Base cases
      if (n <= 2) {
          return n;
      }
      
      // Dynamic programming approach
      int[] dp = new int[n + 1];
      dp[1] = 1;
      dp[2] = 2;
      
      for (int i = 3; i <= n; i++) {
          dp[i] = dp[i - 1] + dp[i - 2];
      }
      
      return dp[n];
      
      /* Alternative approach with O(1) space
      int a = 1; // ways to climb 1 step
      int b = 2; // ways to climb 2 steps
      
      for (int i = 3; i <= n; i++) {
          int temp = a + b;
          a = b;
          b = temp;
      }
      
      return n == 1 ? a : b;
      */
  }
  
  public static void main(String[] args) {
      Scanner scanner = new Scanner(System.in);
      int n = Integer.parseInt(scanner.nextLine().trim());
      
      // Use Main class instead of Solution
      Main main = new Main();
      int result = main.climbStairs(n);
      
      System.out.println(result);
      scanner.close();
  }
}`,
  },
};

const sampleStringProblem = {
  title: "Valid Palindrome",
  description:
    "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string s, return true if it is a palindrome, or false otherwise.",
  difficulty: "EASY",
  tags: ["String", "Two Pointers"],
  constraints:
    ["1 <= s.length <= 2 * 10^5\ns consists only of printable ASCII characters."],
  hints:
    ["Consider using two pointers, one from the start and one from the end, moving towards the center."],
  editorial:
    "We can use two pointers approach to check if the string is a palindrome. One pointer starts from the beginning and the other from the end, moving towards each other.",
  testcases: [
    {
      input: "A man, a plan, a canal: Panama",
      output: "true",
    },
    {
      input: "race a car",
      output: "false",
    },
    {
      input: " ",
      output: "true",
    },
  ],
  examples: [
    {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
    {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
    {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
  ],
  codeSnippets: {
    javascript: `/**
   * @param {string} s
   * @return {boolean}
   */
  function isPalindrome(s) {
    // Write your code here
  }
  
  // Add readline for dynamic input handling
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });
  
  // Process input line
  rl.on('line', (line) => {
    // Call solution with the input string
    const result = isPalindrome(line);
    
    // Output the result
    console.log(result ? "true" : "false");
    rl.close();
  });`,
    python: `class Solution:
      def isPalindrome(self, s: str) -> bool:
          # Write your code here
          pass
  
  # Input parsing
  if __name__ == "__main__":
      import sys
      # Read the input string
      s = sys.stdin.readline().strip()
      
      # Call solution
      sol = Solution()
      result = sol.isPalindrome(s)
      
      # Output result
      print(str(result).lower())  # Convert True/False to lowercase true/false`,
    java: `import java.util.Scanner;

public class Main {
    public static String preprocess(String s) {
        return s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
    }

    public static boolean isPalindrome(String s) {
       
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();

        boolean result = isPalindrome(input);
        System.out.println(result ? "true" : "false");
    }
}
`,
  },
  referenceSolutions: {
    javascript: `/**
   * @param {string} s
   * @return {boolean}
   */
  function isPalindrome(s) {
    // Convert to lowercase and remove non-alphanumeric characters
    s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Check if it's a palindrome
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
      if (s[left] !== s[right]) {
        return false;
      }
      left++;
      right--;
    }
    
    return true;
  }
  
  // Add readline for dynamic input handling
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });
  
  // Process input line
  rl.on('line', (line) => {
    // Call solution with the input string
    const result = isPalindrome(line);
    
    // Output the result
    console.log(result ? "true" : "false");
    rl.close();
  });`,
    python: `class Solution:
      def isPalindrome(self, s: str) -> bool:
          # Convert to lowercase and keep only alphanumeric characters
          filtered_chars = [c.lower() for c in s if c.isalnum()]
          
          # Check if it's a palindrome
          return filtered_chars == filtered_chars[::-1]
  
  # Input parsing
  if __name__ == "__main__":
      import sys
      # Read the input string
      s = sys.stdin.readline().strip()
      
      # Call solution
      sol = Solution()
      result = sol.isPalindrome(s)
      
      # Output result
      print(str(result).lower())  # Convert True/False to lowercase true/false`,
    java: `import java.util.Scanner;

public class Main {
    public static String preprocess(String s) {
        return s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
    }

    public static boolean isPalindrome(String s) {
        s = preprocess(s);
        int left = 0, right = s.length() - 1;

        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) return false;
            left++;
            right--;
        }

        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();

        boolean result = isPalindrome(input);
        System.out.println(result ? "true" : "false");
    }
}
`,
  },
};

const CreateProblemForm = ({ formData, mode }) => {
  
  const [sampleType , setSampleType] = useState("DP")
  const [content, setContent] = useState("");
  const [ language, setLanguage ] = useState('javascript');
  const [ solutionLanguage, setSolutionLanguage ] = useState('javascript');
  const [ isLoading, setIsLoading ] = useState(false)
  
  const { submitProblem, updateProblem } = useProblemStore()
  const navigation = useNavigate()

  useEffect(() => setLanguage("javascript"), [])
  useEffect(() => setSolutionLanguage("javascript"), [])
  useEffect(() => setIsLoading(false), [])

  const { id } = useParams()
  let defaultValues = {
      hints: [],
      description : "",
      testcases: [{ input: "", output: "" }],
      tags: [],
      constraints :[],
      examples: 
        [{ input: "", output: "", explanation: "" }]
      ,
      codeSnippets: {
        javascript: "function solution() {\n  // Write your code here\n}",
        python: "def solution():\n    # Write your code here\n    pass",
        java: "public class Solution {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}",
      },
      referenceSolutions: {
        javascript: "// Add your reference solution here",
        python: "# Add your reference solution here",
        java: "// Add your reference solution here",
      }
  }
  if(localStorage.getItem("formData")){
    defaultValues = JSON.parse(localStorage.getItem("formData"))
  } 
    
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    getValues,
    formState: { errors },
    setError
  } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues 
  });

  useEffect(() => {
    const subscription = watch((value) => {
      console.log('hello', value);
      
      localStorage.setItem("formData", JSON.stringify(value))
    })
    return () => subscription.unsubscribe()
    }, [ watch ])

  const {
    fields: testcaseFields,
    append: appendTestcase,
    remove: removeTestcase,
    replace: replaceTestcases,
  } = useFieldArray({
    control,
    name: "testcases",
  });
  const {
  fields: exampleFields,
  append: appendExample,
  remove: removeExample,
  } = useFieldArray({
      control,
      name: "examples",
    });
  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
    replace: replaceTags,
  } = useFieldArray({
    control,
    name: "tags",
  });
  const {
    fields: constraintFields,
    append: appendConstraint,
    remove: removeConstraint,
    replace: replaceconstraints,
  } = useFieldArray({
    control,
    name: "constraints",
  });
  const {
    fields: hintFields,
    append: appendHint,
    remove: removeHint,
    replace: replaceHint,
  } = useFieldArray({
    control,
    name: "hints",
  });

  const appendValue = {
    tags : appendTag,
    hints: appendHint,
    constraints : appendConstraint
  }
  
  const handleValue = ( e, type ) => {

    if (e.key == "Enter") {
      e.preventDefault();
      const value = e.target.value.trim();
      if (value && !getValues(type).includes(value)) {
        appendValue[type](value);
        e.target.value = "";
      }
    }
  };

  useEffect(() => {
    reset( formData )
    console.log(formData);
    console.log("mode", mode);
    
  }, [ formData, reset ])

  const loadSampleData = () => {
    const sampleData = sampleType === "DP" ? sampledpData : sampleStringProblem
  
    replaceTags(sampleData.tags.map((tag) => tag));
    replaceTestcases(sampleData.testcases.map((tc) => tc));

   // Reset the form with sample data
    reset(sampleData);
    
  }

  const languages = ["javascript", "python", "java"];

 
  const onSubmit = async ( value ) => {
    try {
      setIsLoading(true)
      if(!value) throw new Error("Values required")
        if( mode === 'add'){
          await submitProblem(value, navigation)
        } else {
          await updateProblem( value, navigation, id )
        }
      localStorage.removeItem("formData")
    } catch (error) {
      setError("root", { message: "Fill required fields."})
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full flex flex-1">
      <form onSubmit={handleSubmit(
            (data) => {
              console.log("Form submitted successfully with data:", data);
              onSubmit(data);
            },
            (errors) => {
              console.error("Validation errors:", errors);
            }
          )} 
          className="w-full"
        >
        <div className="flex w-full flex-row items-center justify-between text-white">
          <h1 className="text-2xl font-bold text-primary m-7">Add Problem</h1>
          {
            mode === 'edit' ? 
                <button
                    type="submit"
                    className="btn btn-primary dark:text-white mx-10"
                  >
                    <Save />
                    Save Changes
                  </button>
                   : 
            <div className="flex flex-row md:flex-row gap-3 mt-4 md:mt-0">
            <button type="submit" className="btn btn-primary text-white">
              {
                isLoading ? <span className="loading loading-spinner text-white"></span> : "Submit"
              }
              </button>
                <div className="join">
                  <button
                    type="button"
                    className={`btn join-item ${
                      sampleType === "DP" ? "btn-active" : ""
                    }`}
                    onClick={() => setSampleType("array")}
                  >
                    DP Problem
                  </button>
                  <button
                    type="button"
                    className={`btn join-item ${
                      sampleType === "string" ? "btn-active" : ""
                    }`}
                    onClick={() => setSampleType("string")}
                  >
                    String Problem
                  </button>
                </div>
                <button
                  type="button"
                  className="btn btn-secondary gap-2"
                  onClick={loadSampleData}
                >
                  <Download className="w-4 h-4" />
                  Load Sample
                </button>
          </div>
          }
          
        </div>
          
        <div className="flex flex-col items-center">
        <div className=" w-full overflow-x-hidden grid grid-cols-1 md:grid-cols-2">
          <div className="border-secondary-content border-1 flex-1 rounded-2xl m-5 p-5">
            <fieldset className="fieldset">
              <p className="text-lg font-bold">Problem Name</p>
              <input
                type="text"
                className="input w-full text-md"
                placeholder="Title"
                {...register("title")}
              />
              {errors.title && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.title.message}
                  </span>
                </label>
              )}
            </fieldset>
            <fieldset className="fieldset mt-5">
              <p className="text-lg font-bold">Problem Description</p>
              <textarea className="w-full h-20 rounded-xl input flex flex-col min-h-20 text-md mt-2 whitespace-pre-line"
              {...register("description")}>
                
              </textarea>

              {errors.description && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.description.message}
                  </span>
                </label>
              )}
            </fieldset>

            <div className="dropdown dropdown-bottom dropdown-center w-fit my-5 form-control">
              
              <select className="select select-bordered w-full text-base font-medium" {...register("difficulty")}>
                  <option value="">Select Difficulty</option>
                  <option value="EASY">EASY</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HARD">HARD</option>
              </select>
              <div className="flex flex-row items-center">
                 {errors.difficulty && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.difficulty.message}
                  </span>
                </label>
              )}
              </div>
            </div>

            <div className="flex  w-full flex-col">
              <p className="text-lg font-bold text-content">Tags</p>
              <div className="relative">
                <input
                  type="text"
                  className="input w-full rounded-xl m-2"
                  onKeyDown={(e) => handleValue(e, "tags")}
                  placeholder="Enter tag"
                />
              </div>

              <div className="w-full flex flex-wrap">
                {tagFields.map((field, index) => (
                  <div key={field.id} className="gap-2 flex items-center relative justify-between min-w-fit rounded-md bg-base-200 m-2">
                    <input
                      type="text"
                      className="span p-2 rounded-lg w-5/6  whitespace-pre-line wrap-break-word text-sm"
                      disabled
                      {...register(`tags.${index}`)}
                      placeholder="Enter tag"
                    />
                    <button
                      type="button"
                      onClick={() => removeTag(index)}
                      disabled={tagFields.length === 1}
                    >
                      <Trash2 className="h-5 text-primary m-2 cursor-pointer" />
                    </button>
                  </div>
                ))}
                {errors.tags && (
                  <div className="mt-2">
                    <span className="text-error text-sm">
                      {errors.tags.message}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex  w-full flex-col">
              <p className="text-lg font-bold text-content">Constraints</p>
              <div className="relative">
                <input
                  type="text"
                  className="input w-full rounded-xl m-2"
                  onKeyDown={(e) => handleValue( e, "constraints")}
                  placeholder="Enter problem constraint"
                />
              </div>

              <div className="w-full flex flex-wrap">
                {constraintFields.map((field, index) => (
                  <div key={field.id} className="gap-2 flex items-center relative justify-between w-full rounded-md bg-base-200 m-2">
                    <input
                      type="text"
                      className="span p-2 rounded-lg w-5/6  whitespace-pre-line wrap-break-word text-sm"
                      disabled
                      {...register(`constraints.${index}`)}
                    />
                    <button
                      type="button"
                      onClick={() => removeConstraint(index)}
                      disabled={constraintFields.length === 1}
                    >
                      <Trash2 className="h-5 text-primary m-2 cursor-pointer" />
                    </button>
                  </div>
                ))}
                {errors.constraints && (
                  <div className="mt-2">
                    <span className="text-error text-sm">
                      {errors.constraints.message}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className="flex flex-col items-center justify-center w-full my-5">
                <div className="flex flex-col items-center justify-center w-full ">
                  <p className="text-lg font-bold w-full ">Hints</p>
                  <input
                    className="input w-full my-5"
                    onKeyDown={( e ) => handleValue( e, "hints" )}
                    placeholder="Enter hint"
                 />
                </div>

                <div className="space-y-6 w-full flex flex-col ">
                  {hintFields.map((field, index) => (
                    <div key={field.id} className="card">
                      <div className="card-body p-0 w-full">
                        <div className="form-control ">
                          <div className="flex flex-row items-center bg-base-200 rounded-lg">
                            <textarea
                                className="span p-2 rounded-xl w-7/8 text-md resize-none"
                                disabled
                                {...register(`hints.${index}`)}
                                placeholder="Enter hint"
                              />
                            
                          <button
                            type="button"
                            onClick={() => {removeHint(index)}}
                            className="btn btn-ghost z-7"
                          >
                            <Trash2 className=" z-10  h-5 rounded-4xl text-primary " />
                          </button>
                          </div>
                          </div>    
                              {errors.hints?.[index] && (
                                <label className="label">
                                  <span className="label-text-alt text-error">
                                    {errors.hints[index]}
                                  </span>
                                </label>
                              )}
                      </div>
                    </div>

                  ))}
                </div>
                {errors.hints && !Array.isArray(errors.hints) && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.hints.message}
                    </span>
                  </label>
                )}
              </div>
              <div className="overflow-none">
            <p className="text-lg font-bold ">Code Snippets</p>
            <div className="overflow-none rounded-lg">
            <div className="m-5 flex">
              {
              languages.map(( field ) => (
                <div key={ field } className="flex">
                <button 
                  type="button" 
                  className={`btn ${language === field ? 'btn-active' : 'btn-ghost'}`} 
                  onClick={() => setLanguage(field)}
                >
                {field.toUpperCase()}
                </button>
                </div>
                
              ))}
            </div>
            {
              languages.map(( lang ) => (
                lang === language ? (
                <div key={lang} className={`flex h-150`}>
                  
                <Controller
                    name={`codeSnippets.${language}`}
                    control={control}
                    render={({field}) => (
                      <CodeEditor
                          value={field.value}
                          onChange={(value) => field.onChange(value)}
                          language={language.toLowerCase()}
                      />
                    )}
                    />
                    {errors.codeSnippets?.[lang] && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.codeSnippets[lang].message}
                      </span>
                    </label>
                  )}
                </div>) : null
              ))
            }
          </div>  
          </div>
           <div className=" overflow-none rounded-lg my-5">
            <p className="text-lg font-bold "> Reference Solutions </p>
            <div className="m-5 flex ">
              { languages.map((language) => (
                <button 
                key={language}
                  type="button" 
                  className={`btn ${solutionLanguage === language ? 'btn-active' : 'btn-ghost'}`} 
                  onClick={() => setSolutionLanguage(language)}
                >
                {language.toUpperCase()}
                </button>
              ))}
            </div>

            {solutionLanguage ? 
                (languages.map((lang, index) => (
                
                lang === solutionLanguage ?
                  (<div key={index} className="flex h-150">
                    
                   <Controller
                      name={`referenceSolutions.${solutionLanguage.toLowerCase()}`}
                      control={control}
                      render={({field}) => (
                        <CodeEditor
                            value={field.value}
                            onChange={(value) => field.onChange(value)}
                            language={solutionLanguage.toLowerCase()}
                        />
                      )}
                      />
                      {/* <DevTool control={control} /> */}
                      {errors.referenceSolutions?.[lang] && (
                      <label className="label">
                        <span className="label-text-alt text-error bg-red-400">
                          {errors.referenceSolutions?.[lang].message}
                        </span>
                      </label>
                    )}
                  </div> ) : null )
                )) : null
              }
              </div>
            </div>
          </div>

          <div className="border-secondary-content border-1 flex-1 rounded-2xl m-5 p-5">
            <div className="flex items-center items-between ">
                <p className="text-lg font-bold flex-1">Examples</p>
                <button
                      type="button"
                      className=" btn btn-primary rounded-4xl right-5 -bottom-5 h-10 w-40"
                      onClick={() => {
                        appendExample({input: "", output: "", example: ""})
                      }}
                    >
                      <Plus className="h-10 inline-block" />
                      <span className="label">Add Example</span>
                </button>
              </div>
              <div className="w-full overflow-auto h-auto rounded-xl  flex flex-col text-left mt-5 bg-base-100">
                {
                  exampleFields.map((example, index) => {
                    return( 
                    <div key={example.id} className="card-body mb-2 bg-base-100 rounded-lg relative">
                      <div>
                         <h4 className="text-base text-md not-visited:font-semibold">
                          Example {index + 1}
                        </h4>
                        <button
                            type="button"
                            onClick={() => {removeExample(index)}}
                            disabled={exampleFields.length == 1}
                            className="btn btn-ghost z-7 right-5 top-0 p-4 absolute"
                          >
                            <Trash2 className=" z-10  h-5 rounded-4xl text-primary " />
                          </button>
                      </div>
                      <div className="form-control">
                      <div className="flex flex-col justify-between my-2">
                        <span className="label font-semibold mr-5">Input</span>
                        <textarea type="text" className="textarea rounded-lg text-md w-full h-fit resize-none" {...register(`examples.${index}.input`)}/>
                      </div>
                      {errors.examples?.[index]?.input && (
                        <label className="label">
                          <span className="label-text-alt text-error">
                            {errors.examples?.[index]?.input.message}
                          </span>
                        </label>
                      )}
                      <div className="flex flex-col justify-between my-2">
                        <span className="label mr-5 font-semibold">Output</span>
                        <textarea type="text" className="textarea w-full rounded-lg resize-none" {...register(`examples.${index}.output`)}/>
                      </div>
                      {errors.examples?.[index]?.output && (
                        <label className="label">
                          <span className="label-text-alt text-error">
                            {errors.examples?.[index]?.output.message}
                          </span>
                        </label>
                      )}
                      <div className="flex flex-col justify-between my-2">
                        <span className="label font-semibold mr-5">Explanation</span>
                        <textarea type="text" className="textarea rounded-lg w-full resize-none" {...register(`examples.${index}.explanation`)}/>
                      </div>
                      {errors.examples?.[index]?.explanation && (
                        <label className="label">
                          <span className="label-text-alt text-error">
                            {errors.examples?.[index]?.explanation.message}
                          </span>
                        </label>
                      )}
                      </div>
                    </div>
                    
                  )})
                }
              </div>
              {errors.examples && (
                        <label className="label">
                          <span className="label-text-alt text-error">
                            {errors.examples.message}
                          </span>
                        </label>
                      )}
            <div>
              <div className="flex items-center justify-between w-full my-5">
                <p className="text-lg font-bold text-content">Testcases</p>
                <div className="relative w-80">
                  <Plus
                    className="absolute right-4 text-primary -bottom-5 h-10"
                    onClick={() => appendTestcase({ input: "", output: "" })}
                  />
                </div>
              </div>
              <div className=" bg-base-100 rounded-lg overflow-auto">
                {testcaseFields.map((testcase, index) => (
                  <div key={testcase.id} className="card bg-base-100 px-4 my-5 ">
                    <div className="card-body p-0 ">
                      <div className="flex justify-between items-center mb-4 relative ">
                        <h4 className="text-base text-md not-visited:font-semibold">
                          Testcase {index + 1}
                        </h4>
                        <div className="flex w-30 items-center">
                        <button
                          type="button"
                          onClick={() => {removeTestcase(index)}}
                          disabled={testcaseFields.length === 1}
                          className="btn btn-ghost"
                        >
                          <Trash2 className="absolute right-5 h-5 rounded-4xl text-primary " />
                        </button></div>
                      </div>
                      {(
                        <div className="flex flex-col">
                          <div className="form-control">
                            <label className="label">
                              <span className=" font-semibold">
                                Input
                              </span>
                            </label>
                            <textarea
                              className="textarea min-h-10 w-full p-3 resize-y"
                              {...register(`testcases.${index}.input`)}
                              placeholder="Enter testcase input"
                            />
                            {errors.testcases?.[index]?.input && (
                              <label className="label">
                                <span className="label-text-alt text-error">
                                  {errors.testcases[index].input.message}
                                </span>
                              </label>
                            )}
                          </div>
                          <div className="form-control mb-5">
                            <label className="label">
                              <span className="label-text font-semibold">
                                Expected output
                              </span>
                            </label>
                            <textarea
                              className="textarea min-h-10 w-full p-3 resize-y"
                              {...register(`testcases.${index}.output`)}
                              placeholder="Enter expected output "
                            />
                            {errors.testcases?.[index]?.output && (
                              <label className="label">
                                <span className="label-text-alt text-error">
                                  {errors.testcases[index].output.message}
                                </span>
                              </label>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {errors.testcases && !Array.isArray(errors.testcases) && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.testcases.message}
                </span>
              </label>
            )}
          </div>
          </div>
          <div className="flex w-full flex-col">

          
         
          <div className="w-full  m-5 border-1 border-secondary-content rounded-lg">
            <h1 className="text-2xl font-bold m-7"> Editorial </h1>
            <div className="flex flex-1 flex-col overflow-auto mx-5 h-100 text-lg">
              <Controller
                name={`editorial`}
                control={control}
                render={({ field: { value } }) => (
                      <TextEditor
                        onChange={setContent}
                        value={value}
                        placeholder="Write something..."
                      />
                    )}
                />
                {errors.editorial && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.editorial}
                  </span>
                </label>
              )}
              
            </div>
          </div>
          </div>
        </div>
       
      </form>
    </div>
  );
};

export default CreateProblemForm;
