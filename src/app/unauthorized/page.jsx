"use client";

import React from "react";
import Link from "next/link";
import { Lock, Home, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center relative overflow-hidden p-6">
      {/* Background Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[40%] h-[40%] bg-[#06B6D4] opacity-10 blur-[120px] rounded-full mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[50%] h-[50%] bg-[#3B82F6] opacity-10 blur-[150px] rounded-full mix-blend-screen"></div>
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(to right, #ffffff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-lg w-full bg-[#0b1120]/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-10 md:p-14 text-center shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_40px_rgba(6,182,212,0.15)] animate-in fade-in zoom-in-95 duration-700">
        <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[inset_0_0_20px_rgba(6,182,212,0.2)] relative">
          <div className="absolute inset-0 rounded-full border-2 border-cyan-500/50 animate-ping opacity-20"></div>
          <Lock className="w-10 h-10 text-cyan-400" />
        </div>
        
        <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
          Unauthorized Access
        </h1>
        
        <p className="text-slate-400 text-lg mb-10 leading-relaxed">
          Oops! It looks like you are not logged in. You need to sign in to access this secured area.
        </p>

        <div className="flex flex-col gap-4">
          <button 
            onClick={() => router.push("/login")}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:scale-[1.02] transition-all duration-300"
          >
            Sign In to Continue
            <ArrowRight className="w-5 h-5" />
          </button>

          <Link 
            href="/"
            className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-medium py-4 rounded-xl transition-all duration-300 hover:text-white"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
