import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import db from "@/lib/db";
import { UserRole } from "@/app/generated/prisma/enums";
import { problems } from "@/modules/problems/problems";

export async function GET() {
    try {
        const user = await currentUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const dbUser = await db.user.findUnique({
            where: { clerkId: user.id }
        });

        if (!dbUser || dbUser.role !== UserRole.ADMIN) {
            return NextResponse.json({ error: "Unauthorized - Admin access required" }, { status: 403 });
        }

        const allProblems = [
            ...problems.ARRAY,
            ...problems.STRING,
            ...problems.DP,
            ...problems.PRACTICE
        ];

        let createdCount = 0;
        let updatedCount = 0;

        for (const problemData of allProblems) {
            const problem = problemData as any;
            const { id, title, description, difficulty, tags, constraints, testCases, codeSnippets, referenceSolutions, driverCode, examples } = problem;

            const existingProblem = await db.problem.findUnique({
                where: { title: title }
            });

            const data = {
                title,
                description,
                difficulty: difficulty as any,
                tags: [...tags] as string[],
                constraints,
                testCases: testCases as any,
                codeSnippets: codeSnippets as any,
                referenceSolution: referenceSolutions as any,
                driverCode: (driverCode || {}) as any,
                examples: (examples || {}) as any,
                userId: dbUser.id,
            };

            if (existingProblem) {
                await db.problem.update({
                    where: { id: existingProblem.id },
                    data
                });
                updatedCount++;
            } else {
                await db.problem.create({
                    data
                });
                createdCount++;
            }
        }

        return NextResponse.json({
            success: true,
            message: `Seeding complete. Created: ${createdCount}, Updated: ${updatedCount}`,
            total: allProblems.length
        });

    } catch (error: any) {
        console.error("Error seeding problems:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
