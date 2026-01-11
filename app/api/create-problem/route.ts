import { UserRole } from "@/app/generated/prisma/enums";
import db from "@/lib/db";
import { getJudge0LanguageId, pollBatchResults, submitBatch } from "@/lib/judge0";
import { currentUserRole, getCurrentUser } from "@/modules/auth/actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try {

        const userRole = await currentUserRole()

        const userId = await getCurrentUser();

        if(!userId || userRole!==UserRole.ADMIN){
            return NextResponse.json({error:"Unauthorized"},{status:401})
        }

        const body = await request.json();
        
        const {
            title,
            description,
            difficulty,
            tags,
            examples,
            constraints,
            testCases,
            codeSnippets,
            referenceSolutions,
            }:any = body;
        
            if(!title || !description || !difficulty || !testCases || !codeSnippets || !referenceSolutions){
                return NextResponse.json({error:"Missing required fields"},{status:400})
            }

            if(!Array.isArray(testCases) || testCases.length === 0 ){
                                
                return NextResponse.json({error:"Atleast One test case is required"},{status:400})

            }

            if(!referenceSolutions || typeof referenceSolutions !== 'object' ){
                                
                return NextResponse.json({error:"Reference solutions must be provided for all supported languages"},{status:400})

            }

            for (const [language, solutionCode] of Object.entries(referenceSolutions)) {

                //Get judge0 Language Id

                const languageId = getJudge0LanguageId(language)

                if(!languageId) {
                    return NextResponse.json({error: `${language} is not supported`},{status:400})
                }

                // prepare Judge0 submissions for all the testcases

                const submissions = testCases.map((tc:any)=>({
                    source_code:solutionCode,
                    language_id: languageId,
                    stdin: tc.input,
                    expected_output: tc.output
                }))

                //Submit all testcases in batch

                const submissionResults = await submitBatch(submissions)
                

                const tokens = submissionResults.map(
                    (res:any)=>res.token
                )


                const results = await pollBatchResults(tokens);

                for (let i = 0; i < results.length; i++) {
                    const result = results[i];

                    if (result.status.id !== 3) {
                    const errorMessage = result.stderr || result.compile_output || result.message || 'Unknown error';
                    const statusDescription = result.status?.description || `Status ID: ${result.status.id}`;
                    
                    console.log(`Judge0 validation failed for ${language}:`, {
                        statusId: result.status.id,
                        statusDescription,
                        errorMessage,
                        stdout: result.stdout,
                        expectedOutput: submissions[i].expected_output
                    });
                    
                    // Build a more informative error message
                    let detailedError = `Validation failed for ${language}`;
                    if (statusDescription) {
                        detailedError += `: ${statusDescription}`;
                    }
                    if (errorMessage && errorMessage !== 'Unknown error') {
                        // Truncate long error messages for display
                        const shortError = errorMessage.length > 100 ? errorMessage.substring(0, 100) + '...' : errorMessage;
                        detailedError += ` - ${shortError}`;
                    }
                    
                    return NextResponse.json(
                        {
                        error: detailedError,
                        testCase: {
                            input: submissions[i].stdin,
                            expectedOutput: submissions[i].expected_output,
                            actualOutput: result.stdout,
                            error: errorMessage,
                            status: statusDescription,
                            statusId: result.status.id,
                        },
                        details: result,
                        },
                        { status: 400 }
                    );
                    }
                    
                }
            }


        // saving the prblm into the db

        const newProblem = await db.problem.create({
            data:{
            title,
            description,
            difficulty,
            tags,
            examples,
            constraints,
            testCases,
            codeSnippets,
            referenceSolution: referenceSolutions,
            
            userId: userId
            }
        })
    
        return NextResponse.json({
            success:true,
            message: "Problem created successfully",
            data:newProblem,
        }, {status:201})
    } catch (error: any) {

        console.error("Error creating problem:", error);
        
        // Handle Prisma unique constraint errors
        if (error?.code === 'P2002') {
            const target = error?.meta?.target;
            if (target && target.includes('title')) {
                return NextResponse.json({
                    success: false,
                    error: "A problem with this title already exists. Please use a different title.",
                }, {status: 400});
            }
        }
        
        // Provide more detailed error information
        let errorMessage = "Failed to save the problem";
        if (error instanceof Error) {
            errorMessage = error.message;
            console.error("Error details:", {
                message: error.message,
                stack: error.stack,
                name: error.name,
                code: (error as any).code
            });
        }

        return NextResponse.json({

            success:false,
            error: errorMessage,
        }, {status:500})
    }
}