"use client";

import { Search, X } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function SearchFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const initialSearch = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  // Sync state if URL changes externally
  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
  }, [searchParams]);

  // Debounced search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      
      if (searchTerm) {
        current.set("search", searchTerm);
      } else {
        current.delete("search");
      }
      
      // Reset to page 1 on new search
      current.set("page", "1");
      
      const search = current.toString();
      const query = search ? `?${search}` : "";
      
      router.push(`${pathname}${query}`, { scroll: false });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, pathname, router, searchParams]);

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="w-full max-w-md relative flex items-center">
      <Search className="w-5 h-5 text-slate-400 absolute left-4" />
      <input
        type="text"
        placeholder="Search classes by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full h-12 pl-12 pr-10 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/50 focus:border-[#06B6D4] transition-all shadow-inner shadow-black/20"
      />
      {searchTerm && (
        <button
          onClick={clearSearch}
          className="absolute right-3 p-1 rounded-full hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
