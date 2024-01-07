import Project from "@/components/Project";
import UserListItem from "@/components/UserListItem";
import { prisma } from "@/lib/db/prisma";
import { clerkClient } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

interface UserPageProps {
  params: { username: string };
}

export default async function UserPage({
  params: { username },
}: UserPageProps) {
  let user: User | undefined = undefined;

  if (username) {
    const existingUser = await clerkClient.users.getUserList({
      username: [username],
    });

    if (existingUser.length !== 0) user = existingUser[0];
  }

  if (!user) notFound();

  const userProjects = await prisma.project.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between gap-2  p-4">
        <div className="w-[100%] flex-col">
          <div role="tablist" className="tabs-boxed tabs">
            <a role="tab" className="tab">
              General
            </a>
            <a role="tab" className="tab tab-active">
              FrontEnd
            </a>
            <a role="tab" className="tab">
              Backend
            </a>
          </div>
        </div>
        <div className="flex w-[100%] items-center justify-end ">
          <div className="w-[70%]">
            <UserListItem user={user} />
          </div>
        </div>
      </div>
      <div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {userProjects.map((project) => (
            <Project viewOnly project={project} key={project.id} />
          ))}
          {userProjects.length === 0 && (
            <div className="col-span-full text-center">
              User does not have any projects yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
