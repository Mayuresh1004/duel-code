import { UserRole } from "@/app/generated/prisma/enums";
import db from "@/lib/db";
import { getJudge0LanguageId, pollBatchResults, submitBatch } from "@/lib/judge0";
import { currentUserRole, getCurrentUser } from "@/modules/auth/actions";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try {

        const userRole = await currentUserRole()

        const user = await getCurrentUser();

        if(!user || userRole!==UserRole.ADMIN){
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
                                
                return NextResponse.json({error:"Reference solutions must bee provided for all supported languages"},{status:400})

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
                    return NextResponse.json(
                        {
                        error: `Validation failed for ${language}`,
                        testCase: {
                            input: submissions[i].stdin,
                            expectedOutput: submissions[i].expected_output,
                            actualOutput: result.stdout,
                            error: result.stderr || result.compile_output,
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
            userId: user.id
            }
        })
    
        return NextResponse.json({
            success:true,
            message: "Problem created successfully",
            data:newProblem,
        }, {status:201})
    } catch (error) {

        console.log("Error:",error);
        

        return NextResponse.json({

            success:false,
            error: "Failed to save the prblm",
        }, {status:500})
    }
}