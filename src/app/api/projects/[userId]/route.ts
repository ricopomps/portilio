import { prisma } from "@/lib/db/prisma";
import {
  FindProjectsSchema,
  findProjectsSchema,
} from "@/lib/validation/project";

export async function GET(
  req: Request,
  { params }: { params: FindProjectsSchema },
) {
  try {
    const parseResult = findProjectsSchema.safeParse(params);

    if (!parseResult.success) {
      console.error("Invalid input", parseResult.error);

      return Response.json({ error: `Invalid input` }, { status: 400 });
    }

    const { userId } = parseResult.data;

    const projectsByUser = await prisma.project.findMany({ where: { userId } });

    return Response.json(projectsByUser, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);

    return Response.json({ error: `Error creating project` }, { status: 500 });
  }
}
