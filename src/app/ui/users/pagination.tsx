"use client";

import { cn, generatePagination } from "@/app/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function UsersPagination({
  totalPages,
}: {
  totalPages: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageLink = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  };

  const pages = generatePagination(currentPage, totalPages);

  return (
    <div className="flex items-center gap-2">
      <Link
        href={createPageLink(currentPage - 1)}
        className={cn(
          "hover:text-blue-500",
          currentPage <= 1 && "pointer-events-none text-gray-500"
        )}
      >
        Prev
      </Link>
      <div>
        {pages.map((page, index) => {
          if (page === "...") {
            return <span key={index}>...</span>;
          }
          const isActive = page === currentPage;
          return (
            <Link
              key={index}
              href={createPageLink(Number(page))}
              className={`px-3 py-1 rounded ${
                isActive ? "bg-blue-500 text-white" : "text-blue-500"
              }`}
            >
              {page}
            </Link>
          );
        })}
      </div>
      <Link
        href={createPageLink(currentPage + 1)}
        className={cn(
          "hover:text-blue-500",
          currentPage >= totalPages && "pointer-events-none text-gray-500"
        )}
      >
        Next
      </Link>
    </div>
  );
}
