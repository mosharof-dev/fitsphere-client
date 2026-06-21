"use client";

import React from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function SidebarSkeleton() {
  return (
    <div className="flex h-full flex-col bg-[#0b1120]">
      {/* Logo Area Skeleton */}
      <div className="flex h-18 items-center px-6 border-b border-white/5 shrink-0">
        <div className="flex items-center gap-2">
          <Skeleton className="w-8 h-8 rounded-full bg-slate-800" />
          <Skeleton className="w-24 h-6 rounded-md bg-slate-800" />
        </div>
      </div>

      {/* Profile Section Skeleton */}
      <div className="p-5 border-b border-white/5 bg-[#020617]/30 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 flex items-center justify-center">
            <Skeleton className="w-full h-full rounded-full bg-slate-800" />
          </div>
          <div className="flex flex-col overflow-hidden gap-1.5 w-full">
            <Skeleton className="h-4 w-24 bg-slate-800" />
            <Skeleton className="h-3 w-32 bg-slate-800" />
            <Skeleton className="h-5 w-16 mt-0.5 rounded-full bg-slate-800" />
          </div>
        </div>
      </div>

      {/* Navigation Menu Skeleton */}
      <div className="flex-1 overflow-y-auto py-5 px-4 no-scrollbar">
        <nav className="flex flex-col gap-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded-xl bg-slate-800" />
          ))}
        </nav>
      </div>

      {/* Logout Button Skeleton */}
      <div className="p-4 border-t border-white/5 shrink-0 bg-[#020617]/50">
        <Skeleton className="h-11.5 w-full rounded-xl bg-slate-800" />
      </div>
    </div>
  );
}
