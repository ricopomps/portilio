import ProjectDescriptionPage from "@/components/ProjectPage";
import { prisma } from "@/lib/db/prisma";
import { Project } from "@prisma/client";
import { notFound } from "next/navigation";

interface ProjectPageProps {
  params: { projectId: string };
}

export default async function ProjectPage({
  params: { projectId },
}: ProjectPageProps) {
  let project: Project | undefined = undefined;

  if (projectId) {
    const existingProject = await prisma.project.findUnique({
      where: { id: projectId },
    });
    if (existingProject) project = existingProject;
  }

  if (!project) notFound();

  return <ProjectDescriptionPage project={project} />;
}
