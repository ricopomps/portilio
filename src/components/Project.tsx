import placeholderImage from "@/assets/placeholderImage.png";
import { Project } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
interface ProjectProps {
  project: Project;
  viewOnly?: boolean;
}

export default function Project({ project, viewOnly }: ProjectProps) {
  const wasUpdated = project.updatedAt > project.createdAt;
  //   const createdUpdatedAtTimeStamp = (
  //     wasUpdated ? project.updatedAt : project.createdAt
  //   ).toDateString();

  return (
    <Link
      href={
        viewOnly
          ? `/project/${project.id}`
          : `/projects/add-project?projectId=${project.id}`
      }
      className="card w-full bg-base-100 transition-shadow hover:shadow-xl"
    >
      <figure>
        <Image
          src={project.imageUrl || placeholderImage}
          alt={project.title}
          width={800}
          height={400}
          className="h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{project.title}</h2>
        <h3 className="text-center font-light">{project.subtitle}</h3>
      </div>
    </Link>
  );
}
