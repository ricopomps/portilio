"use client";
import useDebounce from "@/hooks/useDebounce";
import { cn } from "@/utils/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProjectSearch from "./ProjectSearch";
import UserSearch from "./UserSearch";

interface SearchHandlerProps {
  search?: string;
  searchType?: string;
  page: number;
}

type SearchType = "projects" | "users";

export default function SearchHandler({
  page,
  search,
  searchType,
}: SearchHandlerProps) {
  const [searchInput, setSerchInput] = useState(search);
  const searchInputDebounced = useDebounce(searchInput);
  const router = useRouter();

  function getSearchTypeLink(searchForProjects: SearchType) {
    const searchParams = new URLSearchParams({
      ...(search && { search }),
      ...(page && { page: page.toString() }),
    });

    searchParams.set("searchType", searchForProjects);

    return `search/?${searchParams.toString()}`;
  }

  useEffect(() => {
    function handleInputChange(value: string) {
      const searchParams = new URLSearchParams({
        ...(searchType && { searchType }),
        ...(page && { page: page.toString() }),
        ...(value && { search: value }),
      });

      router.push(`search/?${searchParams.toString()}`);
    }

    handleInputChange(searchInputDebounced ?? "");
  }, [searchInputDebounced, page, router, searchType]);

  const searchProjects = searchType !== "users";

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
              setSerchInput(e.target.value);
            }}
          />
          <div className=" flex-col">
            <div role="tablist" className="tabs-boxed tabs">
              <Link
                href={getSearchTypeLink("projects")}
                role="tab"
                className={cn("tab", searchProjects && "tab-active")}
              >
                Projects
              </Link>
              <Link
                href={getSearchTypeLink("users")}
                role="tab"
                className={cn("tab", !searchProjects && "tab-active")}
              >
                Users
              </Link>
            </div>
          </div>
        </div>
      </div>
      {searchProjects && (
        <ProjectSearch searchParams={{ search: searchInputDebounced, page }} />
      )}
      {!searchProjects && (
        <UserSearch searchParams={{ search: searchInputDebounced, page }} />
      )}
    </div>
  );
}
