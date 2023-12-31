import { Project } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface ProjectProps {
  project: Project;
}

export default function Project({ project }: ProjectProps) {
  const wasUpdated = project.updatedAt > project.createdAt;

  const createdUpdatedAtTimeStamp = (
    wasUpdated ? project.updatedAt : project.createdAt
  ).toDateString();

  return (
    <Link
      href={`/projects/add-project?projectId=${project.id}`}
      className="card w-full bg-base-100 transition-shadow hover:shadow-xl"
    >
      <figure>
        <Image
          src={project.imageUrl}
          alt={project.title}
          width={800}
          height={400}
          className="h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{project.title}</h2>
        <p>{project.description}</p>
      </div>
    </Link>
  );
}
