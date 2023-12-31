import { prisma } from "@/lib/db/prisma";

export async function POST(req: Request) {
  try {
    const formData = await req.json();

    const createdProject = await prisma.project.create({
      data: formData,
    });

    return Response.json(createdProject, { status: 200 });
  } catch (error) {
    console.error("Error creating project:", error);

    return Response.json({ error: `Error creating project` }, { status: 500 });
  }
}
