import { getAllClasses } from "@/lib/api/classes";
import SearchFilter from "@/components/classes/SearchFilter";
import CategoryFilter from "@/components/classes/CategoryFilter";
import ClassesList from "@/components/classes/ClassesList";
import Pagination from "@/components/classes/Pagination";
import { Suspense } from "react";
import ClassCardSkeleton from "@/components/classes/ClassCardSkeleton";
import React from "react";

export const metadata = {
  title: "Browse Classes | FitSphere",
  description: "Find the perfect fitness class for you at FitSphere.",
};

const ClassesPage = async ({ searchParams }) => {
  const params = await searchParams;
  const page = params?.page || "1";
  const search = params?.search || "";
  const category = params?.category || "";

  const queryParams = new URLSearchParams({
    page,
    limit: "12",
    ...(search && { search }),
    ...(category && { category }),
  });

  let data = [];
  let totalPages = 0;
  let currentPage = 1;
  let error = false;

  let totalItems = 0;

  try {
    const res = await getAllClasses(queryParams.toString());
    data = res.data || [];
    totalPages = res.totalPages || 0;
    currentPage = res.currentPage || 1;
    totalItems = res.total || 0;
  } catch (err) {
    console.error("Failed to load classes:", err);
    error = true;
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto space-y-12 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Browse{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#06B6D4] to-[#3B82F6]">
              Classes
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover a wide variety of fitness classes tailored to your goals.
            Whether you want to build strength, increase flexibility, or boost
            your cardio, we have something for everyone.
          </p>
        </div>

        {/* Filters Section */}
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between bg-[#0B1120] p-6 rounded-3xl border border-slate-800 shadow-xl shadow-black/20">
          <Suspense
            fallback={
              <div className="h-14 w-full max-w-md bg-card animate-pulse rounded-lg" />
            }
          >
            <SearchFilter />
          </Suspense>

          <Suspense
            fallback={
              <div className="h-14 w-full max-w-xs bg-card animate-pulse rounded-lg" />
            }
          >
            <CategoryFilter />
          </Suspense>
        </div>

        {/* Classes List */}
        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
              {Array.from({ length: 8 }).map((_, i) => (
                <ClassCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          <ClassesList classes={data} error={error} />
        </Suspense>

        {/* Pagination */}
        {!error && totalPages > 1 && (
          <Suspense fallback={null}>
            <Pagination
              totalPages={totalPages}
              currentPage={Number(currentPage)}
              totalItems={totalItems}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default ClassesPage;
