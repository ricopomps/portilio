import { Project } from "@prisma/client";
import Image from "next/image";
import Markdown from "./Markdown";

interface ProjectDescriptionPageProps {
  project: Project;
}
export default function ProjectDescriptionPage({
  project: { title, description, imageUrl, subtitle },
}: ProjectDescriptionPageProps) {
  return (
    <section className="w-full grow space-y-5">
      {imageUrl && (
        <div className="flex justify-center">
          <Image
            src={imageUrl}
            alt="Company logo"
            width={300}
            height={300}
            className="rounded-xl"
          />
        </div>
      )}
      <div className="flex items-center justify-center gap-3">
        <div>
          <div>
            <h1 className="text-xl font-bold">{title}</h1>
            <h3 className="text-center font-light">{subtitle}</h3>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        {description && <Markdown>{description}</Markdown>}
      </div>
    </section>
  );
}
