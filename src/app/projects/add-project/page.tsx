import { prisma } from "@/lib/db/prisma";
import { Project } from "@prisma/client";
import { Metadata } from "next";
import AddProjectForm from "./addProjectForm";

interface AddProjectPageProps {
  searchParams: {
    projectId?: string;
  };
}

export function generateMetadata({
  searchParams: { projectId },
}: AddProjectPageProps): Metadata {
  return {
    title: `Portilio - ${projectId ? "Update" : "Add"} project`,
  };
}

export default async function AddProjectPage({
  searchParams: { projectId },
}: AddProjectPageProps) {
  let project: Project | undefined = undefined;

  if (projectId) {
    const existingProject = await prisma.project.findUnique({
      where: { id: projectId },
    });
    if (existingProject) project = existingProject;
  }

  return <AddProjectForm projectToEdit={project} />;
}
