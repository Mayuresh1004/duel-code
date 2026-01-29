import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import { problems } from "../modules/problems/problems";
import "dotenv/config";

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("Starting seeding...");

    // 1. Ensure a default Admin user exists
    // We'll use a placeholder if no admin is found, but ideally there should be one.
    let admin = await prisma.user.findFirst({
        where: { role: "ADMIN" },
    });

    if (!admin) {
        console.log("No admin user found. Creating a temporary seed admin...");
        admin = await prisma.user.upsert({
            where: { email: "admin@example.com" },
            update: {},
            create: {
                clerkId: "seed_admin_clerk_id",
                email: "admin@example.com",
                firstName: "Seed",
                lastName: "Admin",
                role: "ADMIN",
            },
        });
    }

    const allProblems: any[] = [
        ...problems.ARRAY,
        ...problems.STRING,
        ...problems.DP,
        ...problems.PRACTICE,
    ];

    console.log(`Found ${allProblems.length} problems to seed.`);

    let createdCount = 0;
    let updatedCount = 0;

    for (const problem of allProblems) {
        const {
            title,
            description,
            difficulty,
            tags,
            constraints,
            testCases,
            codeSnippets,
            referenceSolutions,
            driverCode,
            examples,
        } = problem;

        const data = {
            title,
            description,
            difficulty: difficulty as any,
            tags,
            constraints,
            testCases: testCases as any,
            codeSnippets: codeSnippets as any,
            referenceSolution: referenceSolutions as any,
            driverCode: (driverCode || {}) as any,
            examples: (examples || {}) as any,
            userId: admin.id,
        };

        const existingProblem = await prisma.problem.findUnique({
            where: { title: title },
        });

        if (existingProblem) {
            await prisma.problem.update({
                where: { id: existingProblem.id },
                data,
            });
            updatedCount++;
        } else {
            await prisma.problem.create({
                data,
            });
            createdCount++;
        }
    }

    console.log(`Seeding complete. Created: ${createdCount}, Updated: ${updatedCount}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
