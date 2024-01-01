"use client";
import useDebounce from "@/hooks/useDebounce";
import { useState } from "react";
import ProjectSearch from "./ProjectSearch";
import UserSearch from "./UserSearch";

export default function SearchHandler() {
  const [searchProjects, setSearchProjects] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const searchInputDebounced = useDebounce(searchInput);

  return (
    <div>
      <div>
        <div className="mb-3 flex items-center justify-center gap-3">
          <input
            type="search"
            placeholder="Search"
            className="rounded-full border border-gray-300 bg-transparent px-4 py-2 dark:border-gray-800 dark:text-white"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
          />
          <button
            className="btn btn-primary "
            onClick={() => setSearchProjects(!searchProjects)}
          >
            Search {searchProjects ? "Users" : "Projects"}
          </button>
        </div>
      </div>
      {searchProjects && <ProjectSearch search={searchInputDebounced} />}
      {!searchProjects && <UserSearch username={searchInputDebounced} />}
    </div>
  );
}
