import CodeEditor from "@/components/CodeEditor";
import { Editorial } from "@/components/Editorial";
import { ProblemDescription } from "@/components/ProblemDescription";
import { Solution } from "@/components/Solution";
import { Submissions } from "@/components/Submissions";
import { useExecutionStore } from "@/store/useExecutionStore";
import useProblemStore from "@/store/useProblemStore";
import { Editor } from "@monaco-editor/react";
import {
  BookHeart,
  BookOpen,
  BookText,
  CloudUpload,
  Code2Icon,
  CopyCheck,
  History,
  Play,
  Rotate3dIcon,
  RotateCcw,
} from "lucide-react";
import { editor } from "monaco-editor";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export const ProblemPage = () => {
  const { getProblemById, problem } = useProblemStore();
  const { executeCode } = useExecutionStore()
  const [isHandlerDragging, setHandlerDragging] = useState(false);
  const [isCodeDragging, setIsCodeDragging] = useState(false);
  const [editorWidth, setEditorWidth] = useState();
  const [width, setWidth] = useState();
  const [index, setIndex] = useState(0);
  const [section, setSection] = useState("description");
  const [ language, setLanguage ] = useState('javascript')
  const [ sourceCode, setSourceCode ] = useState()

  const handlerRef = useRef(null);
  const boxARef = useRef(null);
  const codeBlockRef = useRef(null);
  const containerRef = useRef(null);
  const testcaseRef = useRef(null);
  const codeBlockHandlerRef = useRef(null);
  const boxRef = useRef(null);
  const { id } = useParams();

  const runCode = ( ) => {
    executeCode({source_code : sourceCode, language_id:language})
  }

  const onChange = ( value ) => {
    console.log(value);
    
    setSourceCode(value)
  }

  useEffect(() => {
    getProblemById(id);
  }, []);

  useEffect(() => {
    setSourceCode( problem?.codeSnippets[language])
  }, [problem]);

  const resizer = (ref, fn) => {
    const handler = ref.current;
    const mouseDown = (e) => {
      if (e.target === handler) {
        // console.log("mousedown", e.target);
        fn(true);
      }
    };
    const mouseUp = (e) => {
      //   console.log("mouseup", e.target);
      fn(false);
    };
    document.addEventListener("mousedown", mouseDown);
    document.addEventListener("mouseup", mouseUp);
    return () => {
      document.removeEventListener("mousedown", mouseDown);
      document.removeEventListener("mouseup", mouseUp);
    };
  };
  useEffect(() => {
    return resizer(handlerRef, setHandlerDragging);
  }, []);

  useEffect(() => {
    return resizer(codeBlockHandlerRef, setIsCodeDragging);
  }, []);

  const select = (index) => {
    console.log(index);
    setIndex(index);
  };

  const openSection = (section) => {
    console.log(section);
    setSection(section);
  };

  const handleHorizontalResize = (e) => {
    const box = boxARef.current;
    if (!isHandlerDragging) return;

    const boxMinWidth = 100;
    const containerLeft = box.getBoundingClientRect().left;

    const newWidth = e.clientX - containerLeft;
    const width = Math.max(boxMinWidth, newWidth - 8);
    setWidth(width);
    box.style.width = width + "px";
    box.style.flexGrow = 0;
  };

  useEffect(() => {
    document.body.style.userSelect = "none";
    document.addEventListener("mousemove", handleHorizontalResize);
    return () => {
      document.removeEventListener("mousemove", handleHorizontalResize);
      document.body.style.userSelect = "auto";
    };
  }, [isHandlerDragging]);

  const handleVerticalResize = (e) => {
    const box = codeBlockRef.current;
    if (!isCodeDragging) return;

    const boxMinHeight = 100;
    box.style.height = Math.max(boxMinHeight, e.clientY - 8) + "px";
    box.style.flexGrow = 0;
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleVerticalResize);
    return () =>
      document.removeEventListener("mousemove", handleVerticalResize);
  }, [isCodeDragging]);

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden bg-base-200">
      <div
        className="w-full h-10 flex items-center justify-center gap-5 mt-2
      "
      >
        <button 
          onClick={() => runCode()}
          className=" btn-secondary flex btn btn-sm text-white"
          >
          <Play className="p-0.5" />
          Run
        </button>
        <button className="btn-primary flex btn btn-sm text-white">
          <CloudUpload className="p-0.5" />
          Submit
        </button>
      </div>
      <div
        className="flex w-full p-2 pt-0 flex-grow overflow-hidden"
        id="container"
        ref={containerRef}
      >
        <div
          className="box-border h-212 flex-shrink basis-auto rounded-2xl flex flex-grow flex-col @container min-w-96 min-h-0 overflow-auto mt-1 bg-base-100 "
          id="boxA"
          ref={boxARef}
        >
          <div className="text-gray-700 flex items-center text-md p-5 bg-base-300 rounded-t-2xl font-semibold dark:text-gray-400 overflow-hidden h-10">
            <span
              className={`rounded mx-4 section: flex items-center ${
                section === "description" ? "dark:text-white text-black" : ""
              }`}
              onClick={() => openSection("description")}
            >
              <BookText className="h-4 text-secondary" />
              Description{" "}
            </span>{" "}
            |
            <span
              className={`rounded mx-4 section: flex items-center ${
                section === "editorial" ? "dark:text-white text-black" : ""
              }`}
              onClick={() => openSection("editorial")}
            >
              <BookOpen className="h-4 text-yellow-400" />
              Editorial{" "}
            </span>{" "}
            |
            <span
              className={`rounded mx-4 section: flex items-center ${
                section === "solution" ? "dark:text-white text-black" : ""
              }`}
              onClick={() => openSection("solution")}
            >
              <BookHeart className="h-4 text-primary" />
              Solution{" "}
            </span>
            |
            <span
              className={`rounded mx-4 section: flex items-center ${
                section === "submissions" ? "dark:text-white text-black" : ""
              }`}
              onClick={() => openSection("submissions")}
            >
              <History className="h-4 text-green-300" />
              Submissions{" "}
            </span>
          </div>

          <div className="flex-grow overflow-auto w-full flex">
            {section === "description" && problem && (
              <ProblemDescription problem={problem} />
            )}
            {section === "editorial" && problem && (
              <Editorial problem={problem} />
            )}
            {section === "solution" && problem && (
              <Solution problem={problem} />
            )}
            {section === "submission" && problem && (
              <Submissions problem={problem} />
            )}
          </div>
        </div>
        <div className="relative w-4 h-full z-10 flex items-center">
          <div
            className="absolute left-1/2 -translate-x-1/2 w-1 h-10 bg-secondary-content rounded cursor-ew-resize"
            ref={handlerRef}
          />
        </div>
        <div
          className=" box-border flex-shrink basis-auto rounded-2xl m-1 ml-0 flex flex-grow flex-col min-w-96 overflow-auto justify-center items-center"
          ref={boxRef}
        >
          <div
            ref={codeBlockRef}
            className="bg-gray-800 w-full min-h-0 flex flex-col rounded-2xl flex-grow flex-shrink basis-auto h-1/2"
          >
            <div className="flex items-center text-md p-2 bg-base-300 rounded-t-2xl font-semibold dark:text-gray-400 gap-2 h-10 justify-between">
              <div className="flex gap-2">
                <Code2Icon className="text-primary ml-4" />
                Code
              </div>

              <div className="flex items-center justify-between mx-4">
                <RotateCcw className="h-5 w-5 text-secondary-content p-0.5" />
                <select
                  name="language"
                  id="language"
                  className="p-2 font-medium rounded-3xl select-ghost"
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="javascript">Javascript</option>
                  <option value="java">Java</option>
                  <option value="python">Python</option>
                </select>
              </div>
            </div>
            <div className="h-full overflow-hidden rounded-b-2xl">
              {problem?.codeSnippets.javascript && (
                <CodeEditor value={problem.codeSnippets.javascript} onChange={onChange}/>
              )}
            </div>
          </div>
          <div
            className="w-10 h-0.5 m-2 rounded-4xl bg-secondary-content cursor-ns-resize"
            ref={codeBlockHandlerRef}
          ></div>
          <div
            ref={testcaseRef}
            className="bg-base-100 w-full flex flex-col flex-1 flex-grow flex-shrink basis-auto rounded-2xl overflow-hidden"
          >
            <div className="flex items-center text-md p-2 bg-base-300 rounded-t-2xl font-semibold dark:text-gray-400 h-10 gap-2 ">
              <CopyCheck className="text-primary ml-4" />
              Testcases
            </div>
            <div className="h-fit w-fit flex gap-10 m-3">
              {problem?.testcases.map((testcase, index) => (
                <div>
                  <button
                    className="btn dark:bg-gray-700 @dark:text-white border-none font-medium"
                    onClick={() => select(index)}
                  >
                    {" "}
                    Testcase {index + 1}{" "}
                  </button>
                </div>
              ))}
            </div>
            <div className=" border-2 border-gray-700 m-3 p-6 rounded-3xl ">
              Input : {problem?.testcases[index].input}
              <br />
              Expected Output : {problem?.testcases[index].output}
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
