import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ClassHeader() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
      <Link href="/" className="group flex items-center text-slate-400 hover:text-[#06B6D4] transition-colors">
        <div className="p-2 rounded-full bg-white/5 border border-white/5 group-hover:border-[#06B6D4]/30 mr-3 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </div>
        <span className="font-medium">Back to Home</span>
      </Link>
      <Link href="/classes" className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md rounded-xl text-sm font-medium text-white transition-all duration-300">
        View All Classes
      </Link>
    </div>
  );
}
