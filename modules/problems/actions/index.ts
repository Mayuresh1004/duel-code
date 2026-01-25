"use server"

import { UserRole } from "@/app/generated/prisma/enums"
import db from "@/lib/db"
import { getJudge0LanguageId, pollBatchResults, submitBatch, replaceUserCodeInDriver } from "@/lib/judge0"
import { currentUser } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { includes, success } from "zod"

function getBuiltinDriverCode(problemTitle: string | undefined | null, languageKey: string) {
    const title = (problemTitle || "").trim().toLowerCase();

    // Built-in drivers for seeded problems (when DB driverCode is missing).
    // These drivers expect the editor snippet to provide `class Solution { ... }` (CPP/JAVA)
    // or `class Solution:` (PYTHON) and will call the appropriate method.
    if (title === "valid palindrome") {
        if (languageKey === "CPP") {
            return `#include <bits/stdc++.h>
using namespace std;

// @USER_CODE

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    string s;
    getline(cin, s);

    Solution sol;
    cout << (sol.isPalindrome(s) ? "true" : "false");
    return 0;
}`;
        }

        if (languageKey === "JAVA") {
            return `import java.util.*;

// @USER_CODE

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.hasNextLine() ? sc.nextLine() : "";
        Solution sol = new Solution();
        System.out.print(sol.isPalindrome(s) ? "true" : "false");
    }
}`;
        }

        if (languageKey === "PYTHON") {
            // If user provides class Solution with isPalindrome, call it and print lowercase true/false
            return `# @USER_CODE

if __name__ == "__main__":
    import sys
    s = sys.stdin.read()
    # Keep line as-is (includes spaces/punctuation)
    s = s.rstrip("\\n")
    sol = Solution()
    print(str(sol.isPalindrome(s)).lower())
`;
        }

        if (languageKey === "GOLANG") {
            return `package main

import (
    "fmt"
    "io/ioutil"
    "os"
    "strings"
    "unicode"
)

// @USER_CODE

func main() {
    b, _ := ioutil.ReadAll(os.Stdin)
    // Note: this string literal must be escaped in the TS template,
    // so Go receives backslashes rather than real newlines.
    s := strings.TrimRight(string(b), "\\r\\n")
    if isPalindrome(s) {
        fmt.Print("true")
    } else {
        fmt.Print("false")
    }
}

// helper to keep unicode imports used if user doesn't
var _ = unicode.IsLetter
`;
        }
    }

    return null;
}

function prepareUserCodeForBuiltinWrapper(languageKey: string, userCode: string) {
    const code = userCode || "";

    // If user pasted a full program, keep as-is (the wrapper is skipped elsewhere).
    if (shouldSkipBuiltinWrapper(languageKey, code)) return code;

    if (languageKey === "GOLANG") {
        const lines = code.split(/\r?\n/);
        const out: string[] = [];
        let skippingImportBlock = false;

        for (const line of lines) {
            const trimmed = line.trim();

            // Remove package declarations
            if (/^package\s+\w+/.test(trimmed)) continue;

            // Remove import blocks: import ( ... )
            if (!skippingImportBlock && /^import\s*\(\s*$/.test(trimmed)) {
                skippingImportBlock = true;
                continue;
            }
            if (skippingImportBlock) {
                if (/^\)\s*$/.test(trimmed)) {
                    skippingImportBlock = false;
                }
                continue;
            }

            // Remove single-line imports: import "x"
            if (/^import\s+["`]/.test(trimmed)) continue;

            out.push(line);
        }

        return out.join("\n").trim();
    }
// return
    return code;
}

function shouldSkipBuiltinWrapper(languageKey: string, sourceCode: string) {
    const code = sourceCode || "";
    if (languageKey === "GOLANG") {
        return /(^|\n)\s*package\s+main\b/.test(code) || /\bfunc\s+main\s*\(/.test(code);
    }
    if (languageKey === "CPP") {
        return /\bint\s+main\s*\(/.test(code);
    }
    if (languageKey === "JAVA") {
        return /\bpublic\s+static\s+void\s+main\s*\(/.test(code) || /\bclass\s+Main\b/.test(code);
    }
    if (languageKey === "PYTHON") {
        return /if\s+__name__\s*==\s*["']__main__["']\s*:/.test(code);
    }
    return false;
}



export const getAllProblems = async () => {
    try {

        const user = await currentUser()

        const data = await db.user.findUnique({
            where: {
                clerkId: user?.id
            },
            select: {
                id: true
            }
        })

        const problems = await db.problem.findMany({
            include: {
                solvedBy: {
                    where: {
                        userId: data?.id
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        return {
            success: true,
            data: problems
        }


    } catch (error) {
        return {
            success: false,
            error: "Failed to fetch Problem"
        }
    }
}


export const getProblembyId = async (id: string) => {
    try {

        const problem = await db.problem.findUnique({
            where: {
                id: id
            }
        })

        return { success: true, data: problem }

    } catch (error) {
        console.error("Error Fetching Problem:", error);
        return { success: false, error: "Failed to fetch problem" }

    }
}


export const deleteProblem = async (problemId: string) => {
    try {
        const user = await currentUser();

        if (!user) {
            throw new Error("Unauthorized")
        }

        const dbUser = await db.user.findUnique({
            where: {
                clerkId: user.id
            },
            select: {
                role: true
            }
        })

        if (dbUser?.role !== UserRole.ADMIN) {
            throw new Error("Only Admins can delete problems")
        }

        await db.problem.delete({
            where: { id: problemId }
        })

        revalidatePath('/problems')


        return { success: true, message: "Problem Deleted Successfully" }
    } catch (error) {
        return { success: false, error: "Could not delete the Problem" }

    }

}


export const runCode = async (
    source_code: string,
    language: string | number,
    stdin: string[],
    expected_output: string[],
    id: string
) => {
    // This is for "Run" button - runs against public test cases (stdin provided by client)
    const user = await currentUser();
    // Verify user exists but don't strictly require DB user for just running code? 
    // Actually existing implementation checks DB user, let's keep it.

    if (!user) return { success: false, error: "Unauthorized" };

    const dbUser = await db.user.findUnique({
        where: { clerkId: user.id }
    });

    if (!dbUser) return { success: false, error: "User not found" };

    if (
        !Array.isArray(stdin) ||
        stdin.length === 0 ||
        !Array.isArray(expected_output) ||
        expected_output.length !== stdin.length
    ) {
        return { success: false, error: "Invalid test cases" };
    }

    // Fetch problem to see if there's driver code
    const problem = await db.problem.findUnique({ where: { id } });
    let finalSourceCode = source_code;

    const languageKey = typeof language === "string" ? language.toUpperCase() : String(language);
    const driverFromDb = problem?.driverCode && typeof problem.driverCode === "object"
        ? (problem.driverCode as any)[languageKey]
        : null;
    const builtinDriverRaw = getBuiltinDriverCode(problem?.title as any, languageKey);
    const builtinDriver = builtinDriverRaw && !shouldSkipBuiltinWrapper(languageKey, source_code)
        ? builtinDriverRaw
        : null;

    // Prefer built-in drivers for seeded problems (they match our class-based snippets).
    const driverToUse = builtinDriver || driverFromDb;
    if (driverToUse) {
        const userCodeForWrapper = builtinDriver
            ? prepareUserCodeForBuiltinWrapper(languageKey, source_code)
            : source_code;
        finalSourceCode = replaceUserCodeInDriver(driverToUse, userCodeForWrapper, language);
        console.log(`[runCode] Driver code applied for ${languageKey}${builtinDriver ? " (builtin)" : " (db)"} . Final code length: ${finalSourceCode.length}`);
    } else {
        console.log(`[runCode] No driver code found for ${languageKey}, using user code directly`);
    }

    const judge0Id = getJudge0LanguageId(language);
    
    // Validate final source code
    if (!finalSourceCode || finalSourceCode.trim().length === 0) {
        return { success: false, error: "Source code cannot be empty" };
    }

    console.log(`[runCode] Language: ${language}, Judge0 ID: ${judge0Id}, Code preview: ${finalSourceCode.substring(0, 200)}...`);

    const submissions = stdin.map((input) => ({
        source_code: finalSourceCode,
        language_id: judge0Id,
        stdin: input || "",
        base64_encoded: false,
    }));

    // Validate submissions before sending
    if (submissions.length === 0) {
        return { success: false, error: "No test cases to run" };
    }

    if (submissions.some((s: any) => !s.source_code || s.language_id === undefined)) {
        return { success: false, error: "Invalid submission data" };
    }

    let submitResponse;
    try {
        submitResponse = await submitBatch(submissions);
    } catch (error: any) {
        console.error("[runCode] Error submitting to Judge0:", error);
        return { success: false, error: error.message || "Failed to submit code to Judge0" };
    }

    // Handle different response formats from Judge0
    if (!submitResponse || !Array.isArray(submitResponse)) {
        console.error("[runCode] Invalid response from Judge0:", submitResponse);
        return { success: false, error: "Invalid response from Judge0 API" };
    }

    const tokens = submitResponse.map((res: any) => res.token).filter((token: any) => token);
    
    if (tokens.length === 0) {
        console.error("[runCode] No tokens received from Judge0:", submitResponse);
        return { success: false, error: "No submission tokens received from Judge0" };
    }

    let results;
    try {
        results = await pollBatchResults(tokens);
    } catch (error: any) {
        console.error("[runCode] Error polling results:", error);
        return { success: false, error: error.message || "Failed to get execution results" };
    }

    const decodeBase64Safe = (value: string | null | undefined) => {
        if (!value) return null;
        // Only attempt base64 decode if it looks like base64
        const looksBase64 = /^[A-Za-z0-9+/]+={0,2}$/.test(value) && value.length % 4 === 0;
        if (!looksBase64) return value;
        try {
            const decoded = Buffer.from(value, "base64").toString("utf8");
            // Heuristic: decoded text should have printable chars; if not, keep original
            if (!decoded || decoded.includes("\uFFFD")) return value;
            return decoded;
        } catch {
            return value;
        }
    };

    // Check for compilation errors or runtime errors first
    const hasCompilationError = results.some((r: any) => r.status.id === 6 || r.compile_output);
    const hasRuntimeError = results.some((r: any) => r.status.id >= 7 && r.status.id <= 12);
    
    if (hasCompilationError || hasRuntimeError) {
        const firstError = results.find((r: any) =>
            r.status?.id === 6 ||
            (r.status?.id >= 7 && r.status?.id <= 12) ||
            r.compile_output ||
            r.stderr ||
            r.message
        );
        return {
            success: false,
            error: firstError?.status?.description || "Compilation or Runtime Error",
            data: {
                status: firstError?.status?.description || "Error",
                results: results.map((result: any, i: number) => {
                    const stdoutDecoded = decodeBase64Safe(result.stdout);
                    const stderrDecoded = decodeBase64Safe(result.stderr);
                    const compileDecoded = decodeBase64Safe(result.compile_output);
                    return {
                    testCase: i + 1,
                    passed: false,
                    stdout: stdoutDecoded?.trim() || null,
                    expected: expected_output[i]?.trim(),
                    stderr: stderrDecoded,
                    compile_output: compileDecoded,
                    message: result.message || null,
                    status: result.status.description,
                    statusId: result.status.id,
                    memory: result.memory ? `${result.memory} KB` : undefined,
                    time: result.time ? `${result.time} s` : undefined,
                }}),
            },
        };
    }

    let allPassed = true;
    const detailedResults = results.map((result: any, i: number) => {
        const stdoutDecoded = decodeBase64Safe(result.stdout);
        const stderrDecoded = decodeBase64Safe(result.stderr);
        const compileDecoded = decodeBase64Safe(result.compile_output);
        const stdout = stdoutDecoded?.trim() || null;
        const expected_outputs = expected_output[i]?.trim();
        const passed = stdout === expected_outputs;
        if (!passed) allPassed = false;

        return {
            testCase: i + 1,
            passed,
            stdout,
            expected: expected_outputs,
            stderr: stderrDecoded,
            compile_output: compileDecoded,
            message: result.message || null,
            status: result.status.description,
            statusId: result.status.id,
            memory: result.memory ? `${result.memory} KB` : undefined,
            time: result.time ? `${result.time} s` : undefined,
        };
    });

    return {
        success: true,
        message: allPassed ? "All test cases passed!" : "Some test cases failed",
        data: {
            status: allPassed ? "Accepted" : "Wrong Answer",
            results: detailedResults,
        },
    };
};

export const submitCode = async (
    source_code: string,
    language: string | number,
    problemId: string
) => {
    // This is for "Submit" button - runs against ALL test cases (hidden in DB)
    const user = await currentUser();
    if (!user) return { success: false, error: "Unauthorized" };

    const dbUser = await db.user.findUnique({ where: { clerkId: user.id } });
    if (!dbUser) return { success: false, error: "User not found" };

    const problem = await db.problem.findUnique({
        where: { id: problemId }
    });

    if (!problem) return { success: false, error: "Problem not found" };

    let finalSourceCode = source_code;
    // Apply driver code if available
    let languageKey = typeof language === 'string' ? language.toUpperCase() : null;
    if (!languageKey && typeof language === 'number') {
        // Map language ID to string key for driver code lookup
        const languageIdMap: Record<number, string> = {
            71: 'PYTHON',
            63: 'JAVASCRIPT',
            62: 'JAVA',
            54: 'CPP',
            60: 'GOLANG',
        };
        languageKey = languageIdMap[language] || null;
    }

    const driverFromDb = languageKey && problem.driverCode && typeof problem.driverCode === "object"
        ? (problem.driverCode as any)[languageKey]
        : null;
    const builtinDriverRaw = getBuiltinDriverCode(problem?.title as any, languageKey || String(language));
    const builtinDriver = builtinDriverRaw && !shouldSkipBuiltinWrapper(languageKey || String(language), source_code)
        ? builtinDriverRaw
        : null;

    // Prefer built-in drivers for seeded problems (they match our class-based snippets).
    const driverToUse = builtinDriver || driverFromDb;

    if (driverToUse) {
        const userCodeForWrapper = builtinDriver
            ? prepareUserCodeForBuiltinWrapper(languageKey || String(language), source_code)
            : source_code;
        finalSourceCode = replaceUserCodeInDriver(driverToUse, userCodeForWrapper, language);
        console.log(`[submitCode] Driver code applied for ${languageKey || language}${builtinDriver ? " (builtin)" : " (db)"} . Final code length: ${finalSourceCode.length}`);
    } else {
        console.log(`[submitCode] No driver code found for ${languageKey || language}, using user code directly`);
    }

    const testCases: any = problem.testCases;
    if (!testCases || testCases.length === 0) {
        return { success: false, error: "No test cases found for this problem" };
    }

    const judge0Id = getJudge0LanguageId(language);
    
    // Validate final source code
    if (!finalSourceCode || finalSourceCode.trim().length === 0) {
        return { success: false, error: "Source code cannot be empty" };
    }

    console.log(`[submitCode] Language: ${language}, Judge0 ID: ${judge0Id}, Code preview: ${finalSourceCode.substring(0, 200)}...`);

    const submissions = testCases.map((tc: any) => ({
        source_code: finalSourceCode,
        language_id: judge0Id,
        stdin: tc.input || "",
        expected_output: tc.output, // Adding this might help debugging if Judge0 supports it, otherwise ignored
        base64_encoded: false,
    }));

    // Validate submissions before sending
    if (submissions.length === 0) {
        return { success: false, error: "No test cases to run" };
    }

    if (submissions.some((s: any) => !s.source_code || s.language_id === undefined)) {
        return { success: false, error: "Invalid submission data" };
    }

    let submitResponse;
    try {
        submitResponse = await submitBatch(submissions);
    } catch (error: any) {
        console.error("[submitCode] Error submitting to Judge0:", error);
        return { success: false, error: error.message || "Failed to submit code to Judge0" };
    }

    // Handle different response formats from Judge0
    if (!submitResponse || !Array.isArray(submitResponse)) {
        console.error("[submitCode] Invalid response from Judge0:", submitResponse);
        return { success: false, error: "Invalid response from Judge0 API" };
    }

    const tokens = submitResponse.map((res: any) => res.token).filter((token: any) => token);
    
    if (tokens.length === 0) {
        console.error("[submitCode] No tokens received from Judge0:", submitResponse);
        return { success: false, error: "No submission tokens received from Judge0" };
    }

    let results;
    try {
        results = await pollBatchResults(tokens);
    } catch (error: any) {
        console.error("[submitCode] Error polling results:", error);
        return { success: false, error: error.message || "Failed to get execution results" };
    }

    // Check for compilation errors or runtime errors first
    const hasCompilationError = results.some((r: any) => r.status.id === 6 || r.compile_output);
    const hasRuntimeError = results.some((r: any) => r.status.id >= 7 && r.status.id <= 12);
    
    if (hasCompilationError || hasRuntimeError) {
        const firstError = results.find((r: any) =>
            r.status?.id === 6 ||
            (r.status?.id >= 7 && r.status?.id <= 12) ||
            r.compile_output ||
            r.stderr ||
            r.message
        );
        return {
            success: false,
            error: firstError?.status?.description || "Compilation or Runtime Error",
            data: {
                status: firstError?.status?.description || "Error",
                results: results.map((result: any, i: number) => ({
                    testCase: i + 1,
                    passed: false,
                    stdout: result.stdout?.trim() || null,
                    expected: testCases[i].output?.trim(),
                    stderr: result.stderr || null,
                    compile_output: result.compile_output || null,
                    message: result.message || null,
                    status: result.status.description,
                    statusId: result.status.id,
                    memory: result.memory ? `${result.memory} KB` : undefined,
                    time: result.time ? `${result.time} s` : undefined,
                })),
            },
        };
    }

    let allPassed = true;
    const detailedResults = results.map((result: any, i: number) => {
        const stdout = result.stdout?.trim() || null;
        const expected_outputs = testCases[i].output?.trim();
        const passed = stdout === expected_outputs;
        if (!passed) allPassed = false;

        return {
            testCase: i + 1,
            passed,
            stdout,
            expected: expected_outputs,
            stderr: result.stderr || null,
            compile_output: result.compile_output || null,
            message: result.message || null,
            status: result.status.description,
            statusId: result.status.id,
            memory: result.memory ? `${result.memory} KB` : undefined,
            time: result.time ? `${result.time} s` : undefined,
        };
    });

    // Save Submission
    // Helper to get string lang
    let languageString: string;
    if (typeof language === 'number') {
        const languageIdMap: Record<number, string> = {
            71: 'PYTHON',
            63: 'JAVASCRIPT',
            62: 'JAVA',
            54: 'CPP',
            60: 'GOLANG',
        };
        languageString = languageIdMap[language] || String(language);
    } else {
        languageString = language.toUpperCase();
    }

    const submission = await db.submissions.create({
        data: {
            userId: dbUser.id,
            problemId: problem.id,
            sourceCode: source_code, // Store ORIGINAL user code
            language: languageString,
            stdin: JSON.stringify(testCases.map((tc: any) => tc.input)),
            stdout: JSON.stringify(detailedResults.map((r: any) => r.stdout)),
            stderr: JSON.stringify(detailedResults.map((r: any) => r.stderr)),
            compileOutput: JSON.stringify(detailedResults.map((r: any) => r.compile_output)),
            status: allPassed ? "Accepted" : "Wrong Answer",
            memory: JSON.stringify(detailedResults.map((r: any) => r.memory)),
            time: JSON.stringify(detailedResults.map((r: any) => r.time)),
        }
    });

    if (allPassed) {
        await db.problemSolved.upsert({
            where: {
                userId_problemId: { userId: dbUser.id, problemId: problem.id }
            },
            update: {},
            create: {
                userId: dbUser.id,
                problemId: problem.id
            }
        })
    }

    const testCaseResults = detailedResults.map((result: any) => ({
        submissionId: submission.id,
        testCase: result.testCase,
        passed: result.passed,
        stdout: result.stdout,
        expected: result.expected,
        stderr: result.stderr,
        compileOutput: result.compile_output,
        status: result.status,
        memory: result.memory,
        time: result.time,
    }))

    await db.testCaseResult.createMany({ data: testCaseResults });

    const submissionWithTestCases = await db.submissions.findUnique({
        where: { id: submission.id },
        include: { testCases: true }
    })

    return {
        success: true,
        message: allPassed ? "All test cases passed!" : "Some test cases failed",
        submission: submissionWithTestCases,
        data: {
            submissionId: submission.id,
            status: allPassed ? "Accepted" : "Wrong Answer",
            results: detailedResults,
        },
    };
}


export const getAllSubmissionByUser = async (problemId) => {
    const user = await currentUser();
    if (!user) return { success: false, error: "Unauthorized" };

    const userId = await db.user.findUnique({
        where: { clerkId: user.id },
        select: { id: true }
    })

    const submissions = await db.submissions.findMany({
        where: {
            userId: userId?.id,
            problemId: problemId
        },
        orderBy: {
            createdAt: "desc"
        },
        include: {
            testCases: true
        }
    })

    return { success: true, data: submissions }
}

// Keeping a simple alias for backward compatibility or clarity if needed, 
export const executeCode = runCode;