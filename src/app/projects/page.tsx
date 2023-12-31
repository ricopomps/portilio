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
    <div>
      hi {userId} - {JSON.stringify(allProjects)}
    </div>
  );
}
