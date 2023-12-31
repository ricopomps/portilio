import { prisma } from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.json();

    const createdProject = await prisma.project.create({
      data: formData,
    });

    return NextResponse.json(
      {
        message: "Project creation successful",
        payment: createdProject,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error creating project:", error);

    return NextResponse.json(
      { error: `Error creating project` },
      { status: 500 },
    );
  }
}
