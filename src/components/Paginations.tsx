import { cn } from "@/utils/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchParams: URLSearchParams;
  baseUrl?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  searchParams,
  baseUrl,
}: PaginationProps) {
  function generatePageLink(page: number) {
    searchParams.set("page", page.toString());

    return `${baseUrl}/?${searchParams.toString()}`;
  }
  return (
    <div className="flex justify-between">
      <Link
        href={generatePageLink(currentPage - 1)}
        className={cn(
          "flex items-center gap-2 font-semibold",
          currentPage <= 1 && "invisible",
        )}
      >
        <ArrowLeft size={16} />
        Página anterior
      </Link>
      <span className="font-semibold">
        Página {currentPage} de {totalPages}
      </span>
      <Link
        href={generatePageLink(currentPage + 1)}
        className={cn(
          "flex items-center gap-2 font-semibold",
          currentPage >= totalPages && "invisible",
        )}
      >
        Próxima página
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
