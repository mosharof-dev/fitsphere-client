"use client";

import React, { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import SidebarSkeleton from "./SidebarSkeleton";
import { useSession } from "@/lib/auth-client";

export default function DashboardLayout({ children }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { data: sessionData, isPending } = useSession();
  const user = sessionData?.user;
  const userRole = user?.role;

  return (
    <div className="flex min-h-screen w-full bg-[#020617] text-slate-200 selection:bg-cyan-500/30">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-72 border-r border-white/5 bg-[#0b1120] shadow-[4px_0_24px_rgba(0,0,0,0.2)]">
        {isPending ? (
          <SidebarSkeleton />
        ) : (
          <DashboardSidebar user={user} role={userRole} />
        )}
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-w-0">
        <DashboardHeader 
          role={userRole} 
          user={user}
          isPending={isPending}
          onMenuClick={() => setIsMobileOpen(true)} 
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />
        <main className="flex-1 overflow-auto bg-[#020617] p-2 sm:p-4">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
