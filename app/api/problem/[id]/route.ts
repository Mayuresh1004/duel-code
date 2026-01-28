import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  if (!id || typeof id !== "string") {
    return NextResponse.json(
      { success: false, error: "Invalid problem id" },
      { status: 400 }
    );
  }

  const problem = await db.problem.findUnique({
    where: { id },
  });

  if (!problem) {
    return NextResponse.json(
      { success: false, error: "Problem not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: problem,
  });
}