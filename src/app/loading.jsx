"use client";

import React from "react";
import { Dumbbell } from "lucide-react";

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#020617]/90 backdrop-blur-sm flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center w-20 h-20">
          {/* Outer glowing ring */}
          <div className="absolute inset-0 border-4 border-white/10 border-t-cyan-500 rounded-full animate-spin"></div>
          
          {/* Inner Fitness Icon with pulse */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Dumbbell className="w-8 h-8 text-cyan-400 animate-pulse drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
          </div>
        </div>
        
        {/* Text */}
        <div className="mt-8 flex items-center gap-1 text-cyan-400 font-medium tracking-widest text-sm uppercase">
          Loading
          <span className="animate-[ping_1.5s_infinite] inline-block">.</span>
          <span className="animate-[ping_1.5s_0.3s_infinite] inline-block">.</span>
          <span className="animate-[ping_1.5s_0.6s_infinite] inline-block">.</span>
        </div>
      </div>
    </div>
  );
}
