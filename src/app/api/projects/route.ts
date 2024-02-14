import { prisma } from "@/lib/db/prisma";
import {
  createProjectSchema,
  deleteProjectSchema,
  updateProjectSchema,
} from "@/lib/validation/project";
import { auth } from "@clerk/nextjs";
import { put } from "@vercel/blob";
import path from "path";

export async function POST(req: Request) {
  try {
    const body = await req.formData();
    const values = Object.fromEntries(body.entries());

    const parseResult = createProjectSchema.safeParse(values);

    if (!parseResult.success) {
      console.error("Invalid input", parseResult.error);

      return Response.json({ error: `Invalid input` }, { status: 400 });
    }

    const { title, description, imageUrl, subtitle } = parseResult.data;

    const { userId } = auth();

    if (!userId) {
      return Response.json({ error: `Unauthorized` }, { status: 401 });
    }

    const url = await uploadFile(imageUrl);

    const createdProject = await prisma.project.create({
      data: { title, description, imageUrl: url, userId, subtitle },
    });

    return Response.json(createdProject, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);

    return Response.json({ error: `Error creating project` }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const parseResult = updateProjectSchema.safeParse(body);

    if (!parseResult.success) {
      console.error("Invalid input", parseResult.error);

      return Response.json({ error: `Invalid input` }, { status: 400 });
    }

    const { id, title, description, imageUrl, subtitle } = parseResult.data;

    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) {
      return Response.json({ error: "Project not found" }, { status: 404 });
    }

    const { userId } = auth();

    if (!userId || userId !== project.userId) {
      return Response.json({ error: `Unauthorized` }, { status: 401 });
    }

    const url = await uploadFile(imageUrl);

    const updatedProject = await prisma.project.update({
      where: { id },
      data: { title, description, imageUrl: url, subtitle },
    });

    return Response.json(updatedProject, { status: 200 });
  } catch (error) {
    console.error("Error updating project:", error);

    return Response.json({ error: `Error updating project` }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    const parseResult = deleteProjectSchema.safeParse(body);

    if (!parseResult.success) {
      console.error("Invalid input", parseResult.error);

      return Response.json({ error: `Invalid input` }, { status: 400 });
    }

    const { id } = parseResult.data;

    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) {
      return Response.json({ error: "Project not found" }, { status: 404 });
    }

    const { userId } = auth();

    if (!userId || userId !== project.userId) {
      return Response.json({ error: `Unauthorized` }, { status: 401 });
    }

    await prisma.project.delete({ where: { id } });

    return Response.json({ message: "Project deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting project:", error);

    return Response.json({ error: `Error deleting project` }, { status: 500 });
  }
}

async function uploadFile(file: File | undefined) {
  if (!file) return;
  const blob = await put(
    `portilio/project_image/${file.name}${path.extname(file.name)}`,
    file,
    { access: "public", addRandomSuffix: false },
  );
  return blob.url;
}
