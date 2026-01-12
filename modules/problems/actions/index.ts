"use server"

import { UserRole } from "@/app/generated/prisma/enums"
import db from "@/lib/db"
import { getJudge0LanguageId, pollBatchResults, submitBatch } from "@/lib/judge0"
import { currentUser } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { includes, success } from "zod"



export const getAllProblems = async () =>{
    try {
        
        const user = await currentUser()

        const data = await db.user.findUnique({
            where:{
                clerkId: user?.id
            },
            select:{
                id:true
            }
        })

        const problems = await db.problem.findMany({
            include:{
                solvedBy:{
                    where:{
                        userId: data?.id
                    } 
                }
            },
            orderBy:{
                createdAt:"desc"
            }
        })

        return {
            success:true,
            data:problems
        }


    } catch (error) {
        return {
            success:false,
            error:"Failed to fetch Problem"
        }
    }
}


export const getProblembyId = async (id) => {
    try {
        
        const problem = await db.problem.findUnique({
            where:{
                id: id
            }
        })

        return {success:true, data:problem}

    } catch (error) {
        console.error("Error Fetching Problem:",error);
        return {success:false, error:"Failed to fetch problem"}
        
    }
}


export const deleteProblem = async (problemId)=>{
    try {
            const user = await currentUser();

    if(!user){
        throw new Error("Unauthorized")
    }

    const dbUser = await db.user.findUnique({
        where:{
            clerkId: user.id
        },
        select:{
            role:true
        }
    })

    if(dbUser?.role !== UserRole.ADMIN){
        throw new Error("Only Admins can delete problems")
    }

    await db.problem.delete({
        where:{id:problemId}
    })

    revalidatePath('/problems')


    return {success:true, message:"Problem Deleted Successfully"}
} catch (error) {
        return {success:false, error:"Could not delete the Problem"}
        
    }

}


export const runCode = async (source_code, language, stdin, expected_output, id) => {
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
    const problem = await db.problem.findUnique({where: {id}});
    let finalSourceCode = source_code;
    
    if (problem?.driverCode && problem.driverCode[language.toUpperCase()]) {
        const driver = problem.driverCode[language.toUpperCase()];
         // Simple replacement of placeholder
        finalSourceCode = driver.replace('// @USER_CODE', source_code);
    }
    
    // Fallback if no specific language driver but user passed number:
    // We need to resolve language name from ID if it's a number to check driver code?
    // The current flow passes language name string usually.

    const judge0Id = getJudge0LanguageId(language);

    const submissions = stdin.map((input) => ({
        source_code: finalSourceCode,
        language_id: judge0Id,
        stdin: input,
        base64_encoded: false,
    }));

    const submitResponse = await submitBatch(submissions);
    const tokens = submitResponse.map((res) => res.token);
    const results = await pollBatchResults(tokens);

    let allPassed = true;
    const detailedResults = results.map((result, i) => {
        const stdout = result.stdout?.trim() || null;
        const expected_outputs = expected_output[i]?.trim();
        const passed = stdout === expected_outputs;
        if (!passed) allPassed = false;

        return {
            testCase: i + 1,
            passed,
            stdout,
            expected: expected_outputs,
            stderr: result.stderr || null,
            compile_output: result.compile_output || null,
            status: result.status.description,
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

export const submitCode = async (source_code, language, problemId) => {
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
    if(!languageKey && typeof language === 'number') {
         // Best effort reverse map or assume user sends string. 
         // For submit from frontend, we should ensure we send string.
         // Let's defer map logic or just assume standard keys.
         // ... For now reliance on frontend sending "JAVASCRIPT" etc.
    }
    
    if (languageKey && problem.driverCode && problem.driverCode[languageKey]) {
        const driver = problem.driverCode[languageKey];
        finalSourceCode = driver.replace('// @USER_CODE', source_code);
    }

    const testCases: any = problem.testCases;
    if (!testCases || testCases.length === 0) {
         return { success: false, error: "No test cases found for this problem" };
    }

    const judge0Id = getJudge0LanguageId(language);
    
    const submissions = testCases.map((tc) => ({
        source_code: finalSourceCode,
        language_id: judge0Id,
        stdin: tc.input,
        expected_output: tc.output, // Adding this might help debugging if Judge0 supports it, otherwise ignored
        base64_encoded: false,
    }));

    const submitResponse = await submitBatch(submissions);
    const tokens = submitResponse.map((res) => res.token);
    const results = await pollBatchResults(tokens);

    let allPassed = true;
    const detailedResults = results.map((result, i) => {
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
            status: result.status.description,
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
            stdin: JSON.stringify(testCases.map(tc => tc.input)),
            stdout: JSON.stringify(detailedResults.map(r => r.stdout)),
            stderr: JSON.stringify(detailedResults.map(r => r.stderr)),
            compileOutput: JSON.stringify(detailedResults.map(r => r.compile_output)),
            status: allPassed ? "Accepted" : "Wrong Answer",
            memory: JSON.stringify(detailedResults.map(r => r.memory)),
            time: JSON.stringify(detailedResults.map(r => r.time)),
        }
    });

    if(allPassed){
      await db.problemSolved.upsert({
        where:{
          userId_problemId:{userId:dbUser.id , problemId:problem.id}
        },
        update:{},
        create:{
          userId:dbUser.id,
          problemId:problem.id
        }
      })
    }

    const testCaseResults = detailedResults.map((result)=>({
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
        where:{ id: submission.id },
        include:{testCases:true}
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

// Keeping a simple alias for backward compatibility or clarity if needed, 
// strictly speaking executeCode was the old name. 
export const executeCode = runCode;