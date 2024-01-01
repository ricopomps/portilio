import { prisma } from "@/lib/db/prisma";
import { searchProjectsSchema } from "@/lib/validation/project";
import url from "url";

export async function GET(req: Request) {
  try {
    const parsedUrl = url.parse(req.url, true);
    const parseResult = searchProjectsSchema.safeParse(parsedUrl.query);

    if (!parseResult.success) {
      console.error("Invalid input", parseResult.error);

      return Response.json({ error: `Invalid input` }, { status: 400 });
    }

    const { search } = parseResult.data;

    const searchedProjects = await prisma.project.findMany({
      where: {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      },
    });

    return Response.json(searchedProjects, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);

    return Response.json({ error: `Error creating project` }, { status: 500 });
  }
}
