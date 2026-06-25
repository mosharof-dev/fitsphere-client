"use client";

import React from "react";
import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center relative overflow-hidden p-6">
      {/* Background Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-[30%] h-[40%] bg-[#06B6D4] opacity-10 blur-[150px] rounded-full mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-[40%] h-[40%] bg-[#3B82F6] opacity-[0.05] blur-[150px] rounded-full mix-blend-screen"></div>
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(to right, #ffffff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      <div className="relative z-10 text-center animate-in fade-in slide-in-from-bottom-10 duration-700 max-w-2xl w-full">
        {/* Custom SVG Illustration */}
        <div className="relative w-64 h-64 mx-auto mb-8">
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full animate-[spin_60s_linear_infinite]"
          >
            <path
              fill="#06B6D4"
              fillOpacity="0.1"
              d="M45.7,-76.4C58.9,-69.2,69.2,-55.5,76.5,-41.2C83.8,-26.9,88.1,-12,85.2,1.9C82.3,15.8,72.2,28.6,62.8,40.9C53.4,53.2,44.7,64.9,32.4,72.1C20.1,79.3,4.2,82,-10.8,79.6C-25.8,77.2,-39.9,69.7,-51.7,60.1C-63.5,50.5,-73,38.8,-79.1,25.3C-85.2,11.8,-87.9,-3.5,-84.3,-17.6C-80.7,-31.7,-70.8,-44.6,-58.5,-52.4C-46.2,-60.2,-31.5,-62.9,-17.9,-65C-4.3,-67.1,8.2,-68.6,22.2,-72C36.2,-75.4,51.7,-80.6,45.7,-76.4Z"
              transform="translate(100 100)"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-blue-600 drop-shadow-[0_0_30px_rgba(6,182,212,0.5)] tracking-tighter">
              404
            </span>
          </div>
          {/* Decorative floating elements */}
          <div className="absolute top-10 left-0 w-4 h-4 bg-blue-500 rounded-full animate-bounce shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
          <div className="absolute bottom-10 right-0 w-6 h-6 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_15px_rgba(6,182,212,0.8)]"></div>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
          Page Not Found
        </h1>
        
        <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-lg mx-auto leading-relaxed">
          The page you are looking for doesn't exist or has been moved. Let's get you back on track to your fitness journey.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => router.back()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#0B1120] hover:bg-[#111827] text-white font-bold px-8 py-4 rounded-full border border-white/10 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>

          <Link 
            href="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] text-white font-bold px-8 py-4 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all duration-300 hover:scale-105"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
