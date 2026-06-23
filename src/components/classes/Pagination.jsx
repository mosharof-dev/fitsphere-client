"use client";

import { Pagination as HeroUIPagination } from "@heroui/react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function Pagination({
  totalPages,
  currentPage,
  totalItems = 120,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const itemsPerPage = 12;

  const handlePageChange = (p) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("page", p.toString());

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`, { scroll: true });
  };

  const getPageNumbers = () => {
    const pages = [];
    pages.push(1);
    if (currentPage > 3) pages.push("ellipsis");
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push("ellipsis");
    if (totalPages > 1) pages.push(totalPages);
    return pages;
  };

  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="w-full mt-12 pt-8 border-t border-slate-800/80">
      <HeroUIPagination
        page={currentPage}
        className="w-full flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 [&_ul]:gap-2 [&_li>button]:bg-transparent [&_li>button]:text-white hover:[&_li>button]:bg-white/10 [&_[data-active=true]]:bg-white/20 [&_[data-active=true]]:font-bold [&_[data-active=true]]:text-white"
      >
        <HeroUIPagination.Summary className="text-slate-400">
          Showing {startItem}-{endItem} of {totalItems} results
        </HeroUIPagination.Summary>
        <HeroUIPagination.Content>
          <HeroUIPagination.Item>
            <HeroUIPagination.Previous
              isDisabled={currentPage === 1}
              onPress={() => handlePageChange(currentPage - 1)}
            >
              <HeroUIPagination.PreviousIcon />
              <span>Previous</span>
            </HeroUIPagination.Previous>
          </HeroUIPagination.Item>
          {getPageNumbers().map((p, i) =>
            p === "ellipsis" ? (
              <HeroUIPagination.Item key={`ellipsis-${i}`}>
                <HeroUIPagination.Ellipsis />
              </HeroUIPagination.Item>
            ) : (
              <HeroUIPagination.Item key={p}>
                <HeroUIPagination.Link
                  isActive={p === currentPage}
                  onPress={() => handlePageChange(p)}
                >
                  {p}
                </HeroUIPagination.Link>
              </HeroUIPagination.Item>
            ),
          )}
          <HeroUIPagination.Item>
            <HeroUIPagination.Next
              isDisabled={currentPage === totalPages}
              onPress={() => handlePageChange(currentPage + 1)}
            >
              <span>Next</span>
              <HeroUIPagination.NextIcon />
            </HeroUIPagination.Next>
          </HeroUIPagination.Item>
        </HeroUIPagination.Content>
      </HeroUIPagination>
    </div>
  );
}
