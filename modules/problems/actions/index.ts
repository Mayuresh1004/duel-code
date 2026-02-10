"use server"

import { UserRole } from "@/app/generated/prisma/enums"
import db from "@/lib/db"
import { getJudge0LanguageId, submitBatch, pollBatchResults, replaceUserCodeInDriver, getDriverCodePlaceholder } from "@/lib/judge0"
import { currentUser } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

// getBuiltinDriverCode and prepareUserCodeForBuiltinWrapper are now in lib/judge0 or similar, 
// strictly speaking the original code had them inline or in piston.ts.
// Actually, looking at the previous file read, getBuiltinDriverCode was IN THIS FILE.
// But we should probably use the one in lib/judge0 if available, or keep using this one if it helps.
// The task is to switch execution engine.
// Let's check lib/judge0.ts again. It has getJudge0LanguageId, getDriverCodePlaceholder, replaceUserCodeInDriver, submitBatch, pollBatchResults.
// It DOES NOT have getBuiltinDriverCode. 
// So I will keep getBuiltinDriverCode here for now or if I need to move it I will.
// Wait, the original code in actions/index.ts has getBuiltinDriverCode.
// I will keep it there.

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
        let userId = undefined;

        if (user) {
            const dbUser = await db.user.findUnique({
                where: {
                    clerkId: user.id
                },
                select: {
                    id: true
                }
            })
            userId = dbUser?.id;
        }

        const problems = await db.problem.findMany({
            include: {
                solvedBy: {
                    where: {
                        userId: userId
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
        console.error("Error in getAllProblems:", error);
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

    if (!user) return { success: false, error: "Unauthorized" };

    const dbUser = await db.user.findUnique({
        where: { clerkId: user.id || "" }
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
        ? (problem.driverCode as Record<string, string>)[languageKey]
        : null;
    const builtinDriverRaw = getBuiltinDriverCode(problem?.title, languageKey);
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

    // Judge0 Logic
    // const compiledLanguage = getPistonLanguage(language); // REMOVED
    const languageId = getJudge0LanguageId(language);

    // Validate final source code
    if (!finalSourceCode || finalSourceCode.trim().length === 0) {
        return { success: false, error: "Source code cannot be empty" };
    }

    console.log(`[runCode] Language: ${language} -> ID: ${languageId}, Code preview: ${finalSourceCode.substring(0, 200)}...`);

    try {
        // Prepare batch submissions
        const submissions = stdin.map((input, i) => ({
            language_id: languageId,
            source_code: finalSourceCode,
            stdin: input || "",
            expected_output: expected_output[i] || ""
        }));

        // Submit to Judge0
        const submissionTokens = await submitBatch(submissions);

        // Ensure we have tokens
        const tokens = submissionTokens.map((s: any) => s.token);
        if (!tokens || tokens.length === 0) {
            throw new Error("No tokens received from Judge0");
        }

        // Poll for results
        const results = await pollBatchResults(tokens);

        // Map results to our format
        const detailedResults = results.map((run: any, i: number) => {
            const stdout = run.stdout ? Buffer.from(run.stdout, 'base64').toString('utf-8').trim() : (run.stdout === null ? null : "");
            const stderr = run.stderr ? Buffer.from(run.stderr, 'base64').toString('utf-8').trim() : (run.stderr === null ? null : "");
            const compile_output = run.compile_output ? Buffer.from(run.compile_output, 'base64').toString('utf-8').trim() : (run.compile_output === null ? null : "");
            const message = run.message ? Buffer.from(run.message, 'base64').toString('utf-8').trim() : (run.message === null ? null : "");

            // Status ID 3 is Accepted in Judge0
            const isAccepted = run.status.id === 3;
            // Verify output matches expected if not strictly accepted by Judge0 (though Judge0 checks this too if expected_output is sent)
            // But we sent expected_output, so Judge0 status should be reliable.
            // Let's double check manually just in case or trust Judge0.
            // Actually, for "Run" we trust Judge0 status if we sent expected_output.

            // Wait, previous Piston logic did manual check: `const passed = !isError && stdout === expected;`
            // Judge0 returns status.id. 
            // 3 = Accepted
            // 4 = Wrong Answer
            // 6 = Compilation Error
            // 11 = Runtime Error (SIGSEGV, etc)

            const passed = isAccepted;

            return {
                testCase: i + 1,
                passed,
                stdout,
                expected: expected_output[i]?.trim(),
                stderr: stderr || compile_output, // fallback to compile_output if stderr is empty?
                compile_output,
                message,
                status: run.status.description,
                statusId: run.status.id,
                memory: run.memory + " KB",
                time: run.time + " s",
            };
        });

        const allPassed = detailedResults.every((r: any) => r.passed);

        return {
            success: true,
            message: allPassed ? "All test cases passed!" : "Some test cases failed",
            data: {
                status: allPassed ? "Accepted" : "Wrong Answer",
                results: detailedResults,
            },
        };

    } catch (error: any) {
        console.error("[runCode] Judge0 Error:", error);
        // If error is from submitBatch/pollBatchResults it might be "Judge0 API error..."
        return { success: false, error: error.message || "Failed to execute code" };
    }
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
        ? (problem.driverCode as Record<string, string>)[languageKey]
        : null;
    const builtinDriverRaw = getBuiltinDriverCode(problem?.title, languageKey || String(language));
    const builtinDriver = builtinDriverRaw && !shouldSkipBuiltinWrapper(languageKey || String(language), source_code)
        ? builtinDriverRaw
        : null;

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

    // Judge0 Logic
    const languageId = getJudge0LanguageId(language);

    // Validate final source code
    if (!finalSourceCode || finalSourceCode.trim().length === 0) {
        return { success: false, error: "Source code cannot be empty" };
    }

    console.log(`[submitCode] Language: ${language} -> ID: ${languageId}, Code preview: ${finalSourceCode.substring(0, 200)}...`);

    try {
        // Prepare batch submissions
        const submissions = testCases.map((tc: any) => ({
            language_id: languageId,
            source_code: finalSourceCode,
            stdin: tc.input || "",
            expected_output: tc.output || ""
        }));

        // Submit to Judge0
        const submissionTokens = await submitBatch(submissions);

        // Ensure we have tokens
        const tokens = submissionTokens.map((s: any) => s.token);
        if (!tokens || tokens.length === 0) {
            throw new Error("No tokens received from Judge0");
        }

        // Poll
        const results = await pollBatchResults(tokens);

        const detailedResults = results.map((run: any, i: number) => {
            const stdout = run.stdout ? Buffer.from(run.stdout, 'base64').toString('utf-8').trim() : (run.stdout === null ? null : "");
            const stderr = run.stderr ? Buffer.from(run.stderr, 'base64').toString('utf-8').trim() : (run.stderr === null ? null : "");
            const compile_output = run.compile_output ? Buffer.from(run.compile_output, 'base64').toString('utf-8').trim() : (run.compile_output === null ? null : "");
            const message = run.message ? Buffer.from(run.message, 'base64').toString('utf-8').trim() : (run.message === null ? null : "");

            const isAccepted = run.status.id === 3;
            const passed = isAccepted;

            return {
                testCase: i + 1,
                passed,
                stdout,
                expected: testCases[i].output?.trim(),
                stderr: stderr || compile_output,
                compile_output,
                message,
                status: run.status.description,
                statusId: run.status.id,
                memory: run.memory + " KB",
                time: run.time + " s",
            };
        });

        const allPassed = detailedResults.every((r: any) => r.passed);

        // Save Submission
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
                stdin: JSON.stringify((testCases as any[]).map((tc: any) => tc.input)),
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

    } catch (error: any) {
        console.error("[submitCode] Judge0 Error:", error);
        return { success: false, error: error.message || "Failed to execute code" };
    }
}


export const getAllSubmissionByUser = async (problemId: string) => {
    const user = await currentUser();
    if (!user) return { success: false, error: "Unauthorized" };

    console.log("Fetching History");


    const userId = await db.user.findUnique({
        where: { clerkId: user.id || "" },
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

    // revalidatePath(`/problem/${problemId}`);

    console.log("History Fetched");


    return { success: true, data: submissions || [] }
}

// Keeping a simple alias for backward compatibility or clarity if needed, 
export const executeCode = runCode;