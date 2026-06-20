"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function RoleBadge({ role, className }) {
  const roleStyles = {
    user: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    trainer: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    admin: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  };

  const labels = {
    user: "User",
    trainer: "Trainer",
    admin: "Admin",
  };

  return (
    <Badge 
      variant="outline" 
      className={cn("uppercase text-[10px] px-2.5 py-0.5 tracking-widest font-bold shadow-sm", roleStyles[role] || roleStyles.user, className)}
    >
      {labels[role] || "User"}
    </Badge>
  );
}
