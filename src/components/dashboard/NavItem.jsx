"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function NavItem({ href, icon: Icon, name, isActive }) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200 border",
        isActive 
          ? "bg-cyan-950/30 text-cyan-400 border-cyan-900/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]" 
          : "text-slate-400 border-transparent hover:bg-white/5 hover:text-white"
      )}
    >
      {Icon && <Icon size={18} className={isActive ? "text-cyan-400" : "text-slate-500"} />}
      {name}
    </Link>
  );
}
