import React from "react";
import { Hammer } from "lucide-react";

export default function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#0b1120]/50 backdrop-blur-sm p-8 sm:p-12 text-center min-h-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#020617] border border-white/5 mb-5 shadow-inner">
        <Hammer className="h-6 w-6 text-cyan-500" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">🚧 Content Coming Soon</h3>
      <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
        This feature is currently under development and will be available soon.
      </p>
    </div>
  );
}
