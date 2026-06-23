"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Filter } from "lucide-react";

export const categories = [
  "All",
  "Yoga",
  "Cardio",
  "Strength Training",
  "Pilates",
  "HIIT",
  "CrossFit",
  "Zumba",
  "Bodybuilding"
];

export default function CategoryFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCategoryParam = searchParams.get("category");
  const selectedCategories = currentCategoryParam 
    ? currentCategoryParam.split(",")
    : [];

  const isAllSelected = selectedCategories.length === 0 || selectedCategories.includes("All");

  const handleToggle = (cat) => {
    let newSelected = [...selectedCategories];
    
    if (cat === "All") {
      newSelected = [];
    } else {
      // Remove "All" if it was somehow in the array
      newSelected = newSelected.filter(c => c !== "All");

      if (newSelected.includes(cat)) {
        newSelected = newSelected.filter(c => c !== cat);
      } else {
        newSelected.push(cat);
      }
    }
    
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    
    if (newSelected.length > 0) {
      current.set("category", newSelected.join(","));
    } else {
      current.delete("category");
    }
    
    // Reset page to 1 when filter changes
    current.set("page", "1");
    
    const search = current.toString();
    const query = search ? `?${search}` : "";
    
    router.push(`${pathname}${query}`, { scroll: false });
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
        <Filter className="w-4 h-4 text-[#06B6D4]" />
        <span>Filter by Category</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const isSelected = cat === "All" ? isAllSelected : selectedCategories.includes(cat);
          return (
            <button
              key={cat}
              onClick={() => handleToggle(cat)}
              className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 border ${
                isSelected
                  ? "bg-[#06B6D4]/20 text-[#06B6D4] border-[#06B6D4]/50 shadow-lg shadow-[#06B6D4]/10"
                  : "bg-slate-800/50 text-slate-300 border-slate-700 hover:border-[#06B6D4]/50 hover:bg-[#06B6D4]/10"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}
