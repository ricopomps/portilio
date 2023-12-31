import Project from "@/components/Project";
import { prisma } from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portilio - Projects",
};

export default async function ProjectsPage() {
  const { userId } = auth();
  if (!userId) throw Error("userId undefined");

  const allProjects = await prisma.project.findMany({ where: { userId } }); // Find a way to call the api instead

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {allProjects.map((project) => (
        <Project project={project} key={project.id} />
      ))}
      {allProjects.length === 0 && (
        <div className="col-span-full text-center">
          User does not have any projects yet
        </div>
      )}
    </div>
  );
}
