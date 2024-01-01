"use client";
import Project from "@/components/Project";
import useDebounce from "@/hooks/useDebounce";
import * as ProjectApi from "@/network/api/project";
import { handleError } from "@/utils/utils";
import { Project as ProjectModel } from "@prisma/client";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const [searchInput, setSearchInput] = useState("");
  const searchInputDebounced = useDebounce(searchInput);

  const [projects, setProjects] = useState<ProjectModel[]>();
  useEffect(() => {
    async function loadInitialUsers() {
      setProjects(undefined);

      try {
        const projectsResponse =
          await ProjectApi.searchProjects(searchInputDebounced);
        setProjects(projectsResponse);
      } catch (error) {
        handleError(error);
      }
    }
    loadInitialUsers();
  }, [searchInputDebounced]);

  return (
    <div>
      <div>
        <div className="mb-3 flex items-center justify-center">
          <input
            type="search"
            placeholder="Search"
            className="rounded-full border border-gray-300 bg-transparent px-4 py-2 dark:border-gray-800 dark:text-white"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {projects &&
          projects.map((project) => (
            <Project project={project} key={project.id} viewOnly />
          ))}
      </div>
    </div>
  );
}
