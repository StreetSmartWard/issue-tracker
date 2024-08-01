import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

const createIssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});
export async function GET(request: NextRequest) {
  try {
    const issues = await prisma.issue.findMany();
    return NextResponse.json(issues, { status: 200 });
  } catch (error) {
    console.error("Error fetching issues:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
// export async function POST(request: NextRequest) {
//   const body = await request.json();
//   const validation = createIssueSchema.safeParse(body);
//   if (!validation.success) {
//     return NextResponse.json(validation.error.errors, { status: 400 });
//   }
//   try {
//     const newIssue = prisma.issue.create({
//       data: {
//         title: body.title,
//         description: body.description,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//     });
//     return NextResponse.json(newIssue, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error }, { status: 500 });
//   }
// }
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
    }
    const { title, description } = body;
    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    const newIssue = await prisma.issue.create({
      data: {
        title,
        description,
      },
    });

    console.log("Created new issue:", newIssue);
    return NextResponse.json(newIssue, { status: 201 });
  } catch (error: any) {
    console.error("Error creating issue:", error);
    return NextResponse.json(
      { error: "Failed to create issue", details: error.message },
      { status: 500 }
    );
  }
}
