import Project from "@/components/Project";
import * as ProjectApi from "@/network/api/project";
import { handleError } from "@/utils/utils";
import { Project as ProjectModel } from "@prisma/client";
import { useEffect, useState } from "react";

interface ProjectSearchProps {
  search: string;
}

export default function ProjectSearch({ search }: ProjectSearchProps) {
  const [projects, setProjects] = useState<ProjectModel[]>();
  useEffect(() => {
    async function loadInitialUsers() {
      setProjects(undefined);

      try {
        const projectsResponse = await ProjectApi.searchProjects(search);
        setProjects(projectsResponse);
      } catch (error) {
        handleError(error);
      }
    }
    loadInitialUsers();
  }, [search]);

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {projects &&
          projects.map((project) => (
            <Project project={project} key={project.id} viewOnly />
          ))}
      </div>
    </div>
  );
}
