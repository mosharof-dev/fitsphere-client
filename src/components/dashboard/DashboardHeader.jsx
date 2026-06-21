"use client";

import React from "react";
import { Menu, ArrowLeft } from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import DashboardSidebar from "./DashboardSidebar";
import SidebarSkeleton from "./SidebarSkeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardHeader({
  role,
  user,
  isPending,
  onMenuClick,
  isMobileOpen,
  setIsMobileOpen,
}) {
  const getRoleTitle = (role) => {
    switch (role) {
      case "admin": return "Admin Dashboard";
      case "trainer": return "Trainer Dashboard";
      default: return "User Dashboard";
    }
  };

  return (
    <>
      <header className="sticky top-0 z-30 flex h-18 shrink-0 items-center justify-between border-b border-white/5 bg-[#020617]/80 backdrop-blur-md px-4 sm:px-6">
        {/* Left Side: Mobile Menu & Dynamic Title */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-slate-400 hover:text-white hover:bg-white/5"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>

          <div className="hidden sm:flex flex-col">
            <h1 className="text-lg font-bold text-white tracking-tight">
              Welcome to {getRoleTitle(role)}
            </h1>
            <p className="text-xs text-slate-400">
              Manage your fitness journey efficiently.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors mr-2 border border-cyan-400/20 px-3 py-1.5 rounded-full hover:bg-cyan-400/10"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back To Website</span>
            <span className="inline sm:hidden">Back To Website</span>
          </Link>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetContent
          side="left"
          className="p-0 bg-[#0b1120] border-r-white/5 w-72 text-white"
        >
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          {isPending ? (
            <SidebarSkeleton />
          ) : (
            <DashboardSidebar
              role={role}
              user={user}
              onClickItem={() => setIsMobileOpen(false)}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
