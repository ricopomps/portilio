import SearchHandler from "./SearchHandler";

interface SearchPageProps {
  searchParams: {
    search?: string;
    searchType?: string;
    page?: string;
  };
}

export default function SearchPage({
  searchParams: { page, search, searchType },
}: SearchPageProps) {
  const currentPage = page ? +page : 1;

  return (
    <SearchHandler page={currentPage} search={search} searchType={searchType} />
  );
}
