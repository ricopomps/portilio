import Pagination from "@/components/Paginations";
import Project from "@/components/Project";
import * as ProjectApi from "@/network/api/project";
import { handleError } from "@/utils/utils";
import { Project as ProjectModel } from "@prisma/client";
import { useEffect, useState } from "react";

interface ProjectSearchProps {
  searchParams: {
    search?: string;
    page: number;
  };
}

export default function ProjectSearch({
  searchParams: { search, page },
}: ProjectSearchProps) {
  const [projects, setProjects] = useState<ProjectModel[]>();
  const projectPerPage = 9;

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
      <div className="mb-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {projects &&
          projects.map((project) => (
            <Project project={project} key={project.id} viewOnly />
          ))}
      </div>
      {projects && projects.length > 0 && (
        <Pagination
          currentPage={page}
          searchParams={
            new URLSearchParams({
              ...(search && { search }),
              ...(page && { page: page.toString() }),
            })
          }
          totalPages={Math.ceil(projects.length / projectPerPage)}
          baseUrl="search"
        />
      )}
    </div>
  );
}
