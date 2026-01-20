"use client";
import { Editor } from "@monaco-editor/react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Plus,
  Trash2,
  Code2,
  FileText,
  Lightbulb,
  BookOpen,
  CheckCircle2,
  Download,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { problems } from "../problems";


const problemSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  constraints: z.string().min(1, "Constraints are required"),
  hints: z.string().optional(),
  editorial: z.string().optional(),
  testCases: z
    .array(
      z.object({
        input: z.string().min(1, "Input is required"),
        output: z.string().min(1, "Output is required"),
      })
    )
    .min(1, "At least one test case is required"),
  examples: z.object({
    JAVASCRIPT: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
    PYTHON: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
    JAVA: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
    CPP: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
    GOLANG: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
  }),
  codeSnippets: z.object({
    JAVASCRIPT: z.string().min(1, "JavaScript code snippet is required"),
    PYTHON: z.string().min(1, "Python code snippet is required"),
    JAVA: z.string().min(1, "Java solution is required"),
    CPP: z.string().min(1, "C++ solution is required"),
    GOLANG: z.string().min(1, "Go solution is required"),
  }),
  referenceSolutions: z.object({
    JAVASCRIPT: z.string().min(1, "JavaScript solution is required"),
    PYTHON: z.string().min(1, "Python solution is required"),
    JAVA: z.string().min(1, "Java solution is required"),
    CPP: z.string().min(1, "Java solution is required"),
    GOLANG: z.string().min(1, "Java solution is required"),
  }),
  driverCode: z
    .object({
      JAVASCRIPT: z.string().optional(),
      PYTHON: z.string().optional(),
      JAVA: z.string().optional(),
      CPP: z.string().optional(),
      GOLANG: z.string().optional(),
    })
    .optional(),
});


const LANGUAGES = ["JAVASCRIPT", "PYTHON", "JAVA", "CPP", "GOLANG"] as const;


const CodeEditor = ({ value, onChange, language = "java" }:any) => {
  // Map language names to Monaco Editor language IDs
  const MONACO_LANGUAGE_MAP: Record<string, string> = {
  JAVASCRIPT: "javascript",
  PYTHON: "python",
  JAVA: "java",
  CPP: "cpp",
  GOLANG: "go",
};



  

   return (
    <div className="border rounded-md bg-slate-950 text-slate-50">
      <div className="px-4 py-2 bg-slate-800 border-b text-sm font-mono">
        {language}
      </div>
      <div className="h-75 w-full">
        <Editor
          height="300px"
          language={MONACO_LANGUAGE_MAP[language]}
          theme="vs-dark"
          value={value}
          onChange={onChange}
          options={{
            minimap: { enabled: false },
            fontSize: 18,
            lineNumbers: "on",
            readOnly: false,
            wordWrap: "on",
            formatOnPaste: true,
            formatOnType: true,
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
};



const CreateProblemForm = () => {
  

  const router = useRouter();
  type SampleType = keyof typeof problems;

   const [sampleType, setSampleType] = useState<SampleType>("ARRAY");
   const [sampleIndex, setSampleIndex] = useState(0);
  const [isLoading,setIsLoading] = useState(false)


  const form = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {
  testCases: [{ input: "", output: "" }],
  tags: [""],
  

  examples: {
    JAVASCRIPT: { input: "", output: "", explanation: "" },
    PYTHON: { input: "", output: "", explanation: "" },
    JAVA: { input: "", output: "", explanation: "" },
    CPP: { input: "", output: "", explanation: "" },
    GOLANG: { input: "", output: "", explanation: "" },
  },

  codeSnippets: {
    JAVASCRIPT: `function solution() {
  // Write your code here
}

const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim();
console.log(solution(input));`,

    PYTHON: `def solution():
    # Write your code here
    pass

if __name__ == "__main__":
    import sys
    data = sys.stdin.read().strip()
    print(solution())`,

    JAVA: `import java.util.*;

public class Main {
    public static void solution() {
        // Write your code here
    }

    public static void main(String[] args) {
        solution();
    }
}`,

    CPP: `#include <bits/stdc++.h>
using namespace std;

int solution() {
    // Write your code here
    return 0;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    cout << solution();
    return 0;
}`,

    GOLANG: `package main

import (
    "bufio"
    "fmt"
    "os"
)

func solution() int {
    // Write your code here
    return 0
}

func main() {
    writer := bufio.NewWriter(os.Stdout)
    defer writer.Flush()

    result := solution()
    fmt.Fprintln(writer, result)
}`
  },

  referenceSolutions: {
    JAVASCRIPT: "// Add your reference solution here",
    PYTHON: "# Add your reference solution here",
    JAVA: "// Add your reference solution here",
    CPP: "// Add your reference solution here",
    GOLANG: "// Add your reference solution here",
  },

  driverCode: {
    JAVASCRIPT: "",
    PYTHON: "",
    JAVA: "",
    CPP: "",
    GOLANG: "",
  },
}

  })

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState:{errors}
  } = form

  const {
    fields: testCaseFields,
    append: appendTestCase,
    remove: removeTestCase,
    replace: replaceTestCases,
  } = useFieldArray({
    control,
    name: "testCases",
  });

   const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
    replace: replaceTags,
  } = useFieldArray({
    control,
    //@ts-ignore
    name: "tags",
  });


    const onSubmit = async(values:any)=>{
    try {
        setIsLoading(true)
        const response = await fetch("/api/create-problem",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(values)
        })
        const data = await response.json();
        
        if (!response.ok) {
            console.error("Error response:", data);
            const errorMsg = data.error ?? "Failed to create problem";
            toast.error(errorMsg);
            
            // Log additional error details if available
            if (data.testCase) {
                console.error("Test case details:", data.testCase);
            }
            if (data.details) {
                console.error("Judge0 details:", data.details);
            }
            return;
        }
        
        toast.success(data.message ?? "Problem created successfully");        
        router.push("/problems")
    } catch (error) {
          console.error("Error creating problem:", error);
      toast.error("Failed to create problem");
    }
    finally{
         setIsLoading(false);
    }
  }

  

  
  const loadSampleData = (category: keyof typeof problems, index = 0) => {
    const sampleData = problems[category][index];
    //@ts-ignore
    
    replaceTags(sampleData.tags.map(tag => tag));
    replaceTestCases(sampleData.testCases.map(tc => tc));
    
    //@ts-ignore
  reset(sampleData);
};


    return (
      <div className="container mx-auto py-8 px-4 max-w-7xl">
      <Card className="shadow-xl">
        <CardHeader className="pb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="text-3xl flex items-center gap-3">
              <FileText className="w-8 h-8 text-amber-600" />
              Create Problem
            </CardTitle>

            <div className="flex flex-col items-center justify-center md:flex-row gap-3">
              {/* <div className="flex border rounded-md "> */}
                 <div className="">
                
                    
                    <Select
                      value={sampleType}
                      onValueChange={(value) => {
                        setSampleType(value as SampleType);
                        setSampleIndex(0);
                      }}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select Topic" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="ARRAY">
                          <Badge className="bg-green-100 text-green-800">
                            Arrays
                          </Badge>
                        </SelectItem>

                        <SelectItem value="STRING">
                          <Badge className="bg-amber-100 text-amber-800">
                            Strings
                          </Badge>
                        </SelectItem>

                        <SelectItem value="DP">
                          <Badge className="bg-red-100 text-red-800">
                            DP
                          </Badge>
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <Select
                      value={String(sampleIndex)}
                      onValueChange={(value) => setSampleIndex(parseInt(value, 10))}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select Sample" />
                      </SelectTrigger>
                      <SelectContent>
                        {(problems[sampleType] || []).map((p, idx) => (
                          <SelectItem key={p.id ?? idx} value={String(idx)}>
                            {p.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  
                
                {/* {errors.sa && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.difficulty.message}
                  </p>
                )} */}
              {/* </div> */}
                {/* <Button
                  type="button"
                  variant={sampleType === "DP" ? "default" : "outline"}
                  size="sm"
                  className="rounded-r-none"
                  onClick={() => setSampleType("DP")}
                >
                  DP Problem
                </Button>
                <Button
                  type="button"
                  variant={sampleType === "string" ? "default" : "outline"}
                  size="sm"
                  className="rounded-l-none"
                  onClick={() => setSampleType("string")}
                >
                  String Problem
                </Button> */}
              </div>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => loadSampleData(sampleType, sampleIndex)}
                className="gap-2"
              >

                <Download className="w-4 h-4" />
                Load Sample
              </Button>
            </div>
          </div>
          <Separator />
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Label htmlFor="title" className="text-lg font-semibold">
                  Title
                </Label>
                <Input
                  id="title"
                  {...register("title")}
                  placeholder="Enter problem title"
                  className="mt-2 text-lg"
                />
                {errors.title && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="description" className="text-lg font-semibold">
                  Description
                </Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="Enter problem description"
                  className="mt-2 min-h-32 text-base resize-y"
                />
                {errors.description && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="difficulty" className="text-lg font-semibold">
                  Difficulty
                </Label>
                <Controller
                  name="difficulty"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EASY">
                          <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-800"
                          >
                            Easy
                          </Badge>
                        </SelectItem>
                        <SelectItem value="MEDIUM">
                          <Badge
                            variant="secondary"
                            className="bg-amber-100 text-amber-800"
                          >
                            Medium
                          </Badge>
                        </SelectItem>
                        <SelectItem value="HARD">
                          <Badge
                            variant="secondary"
                            className="bg-red-100 text-red-800"
                          >
                            Hard
                          </Badge>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.difficulty && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.difficulty.message}
                  </p>
                )}
              </div>
            </div>

            {/* Tags */}
            <Card className="bg-amber-50 dark:bg-amber-950/20">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-amber-600" />
                    Tags
                  </CardTitle>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => appendTag("" as any)}
                    className="gap-2"
                  >
                    <Plus className="w-4 h-4" /> Add Tag
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tagFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-center">
                      <Input
                        {...register(`tags.${index}`)}
                        placeholder="Enter tag"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTag(index)}
                        disabled={tagFields.length === 1}
                        className="p-2"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
                {errors.tags && (
                  <p className="text-sm text-red-500 mt-2">
                    {errors.tags.message}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Test Cases */}
            <Card className="bg-green-50 dark:bg-green-950/20">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    Test Cases
                  </CardTitle>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => appendTestCase({ input: "", output: "" })}
                    className="gap-2"
                  >
                    <Plus className="w-4 h-4" /> Add Test Case
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {testCaseFields.map((field, index) => (
                  <Card key={field.id} className="bg-background">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">
                          Test Case #{index + 1}
                        </CardTitle>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTestCase(index)}
                          disabled={testCaseFields.length === 1}
                          className="text-red-500 gap-2"
                        >
                          <Trash2 className="w-4 h-4" /> Remove
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label className="font-medium">Input</Label>
                          <Textarea
                            {...register(`testCases.${index}.input`)}
                            placeholder="Enter test case input"
                            className="mt-2 min-h-24 resize-y font-mono"
                          />
                          {errors.testCases?.[index]?.input && (
                            <p className="text-sm text-red-500 mt-1">
                              {errors.testCases[index].input.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label className="font-medium">Expected Output</Label>
                          <Textarea
                            {...register(`testCases.${index}.output`)}
                            placeholder="Enter expected output"
                            className="mt-2 min-h-24 resize-y font-mono"
                          />
                          {errors.testCases?.[index]?.output && (
                            <p className="text-sm text-red-500 mt-1">
                              {errors.testCases[index].output.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {errors.testCases && !Array.isArray(errors.testCases) && (
                  <p className="text-sm text-red-500">
                    {errors.testCases.message}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Code Editor Sections */}
            { LANGUAGES.map((language) => (
              <Card key={language} className="bg-slate-50 dark:bg-slate-950/20">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-slate-600" />
                    {language}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Starter Code */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Starter Code Template
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Controller
                        name={`codeSnippets.${language}`}
                        control={control}
                        render={({ field }) => (
                          <CodeEditor
                            value={field.value}
                            onChange={field.onChange}
                            language={language}
                          />
                        )}
                      />
                      {errors.codeSnippets?.[language] && (
                        <p className="text-sm text-red-500 mt-2">
                          {errors.codeSnippets[language].message}
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  {/* Reference Solution */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        Reference Solution
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Controller
                        name={`referenceSolutions.${language}`}
                        control={control}
                        render={({ field }) => (
                          <CodeEditor
                            value={field.value}
                            onChange={field.onChange}
                            language={language.toLowerCase()}
                          />
                        )}
                      />
                      {errors.referenceSolutions?.[language] && (
                        <p className="text-sm text-red-500 mt-2">
                          {errors.referenceSolutions[language].message}
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  {/* Driver Code (Optional) */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <FileText className="w-5 h-5 text-slate-600" />
                        Driver Code (Optional)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-xs text-muted-foreground">
                        Use <code className="font-mono">// @USER_CODE</code> (or <code className="font-mono"># @USER_CODE</code> for Python)
                        as the placeholder where user code should be injected.
                      </p>
                      <Controller
                        name={`driverCode.${language}`}
                        control={control}
                        render={({ field }) => (
                          <CodeEditor
                            value={field.value}
                            onChange={field.onChange}
                            language={language.toLowerCase()}
                          />
                        )}
                      />
                    </CardContent>
                  </Card>

                  {/* Examples */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Example</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label className="font-medium">Input</Label>
                          <Textarea
                            {...register(`examples.${language}.input`)}
                            placeholder="Example input"
                            className="mt-2 min-h-20 resize-y font-mono"
                          />
                          {errors.examples?.[language]?.input && (
                            <p className="text-sm text-red-500 mt-1">
                              {errors.examples[language].input.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label className="font-medium">Output</Label>
                          <Textarea
                            {...register(`examples.${language}.output`)}
                            placeholder="Example output"
                            className="mt-2 min-h-20 resize-y font-mono"
                          />
                          {errors.examples?.[language]?.output && (
                            <p className="text-sm text-red-500 mt-1">
                              {errors.examples[language].output.message}
                            </p>
                          )}
                        </div>
                        <div className="md:col-span-2">
                          <Label className="font-medium">Explanation</Label>
                          <Textarea
                            {...register(`examples.${language}.explanation`)}
                            placeholder="Explain the example"
                            className="mt-2 min-h-24 resize-y"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            ))}

            {/* Additional Information */}
            <Card className="bg-amber-50 dark:bg-amber-950/20">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-600" />
                  Additional Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="font-medium">Constraints</Label>
                  <Textarea
                    {...register("constraints")}
                    placeholder="Enter problem constraints"
                    className="mt-2 min-h-24 resize-y font-mono"
                  />
                  {errors.constraints && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.constraints.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="font-medium">Hints (Optional)</Label>
                  <Textarea
                    {...register("hints")}
                    placeholder="Enter hints for solving the problem"
                    className="mt-2 min-h-24 resize-y"
                  />
                </div>
                <div>
                  <Label className="font-medium">Editorial (Optional)</Label>
                  <Textarea
                    {...register("editorial")}
                    placeholder="Enter problem editorial/solution explanation"
                    className="mt-2 min-h-32 resize-y"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end mt-6">
              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className="gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    Create Problem
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )

}

export default CreateProblemForm