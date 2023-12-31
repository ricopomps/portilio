import { prisma } from "@/lib/db/prisma";
import { createProjectSchema } from "@/lib/validation/project";
import { auth } from "@clerk/nextjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parseResult = createProjectSchema.safeParse(body);

    if (!parseResult.success) {
      console.error("Invalid input", parseResult.error);

      return Response.json({ error: `Invalid input` }, { status: 400 });
    }

    const { title, description, imageUrl } = parseResult.data;

    const { userId } = auth();

    if (!userId) {
      return Response.json({ error: `Unauthorized` }, { status: 401 });
    }

    const createdProject = await prisma.project.create({
      data: { title, description, imageUrl, userId },
    });

    return Response.json(createdProject, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);

    return Response.json({ error: `Error creating project` }, { status: 500 });
  }
}
