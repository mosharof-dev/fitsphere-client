import React from "react";
import Image from "next/image";
import { MessageSquare, Users, TrendingUp, Zap } from "lucide-react";
import { getAllForumPosts } from "@/lib/actions/forum";
import ForumGrid from "@/components/forum/ForumGrid";

export const metadata = {
  title: "Community Forum | FitSphere",
  description: "Join the conversation on the FitSphere Community Forum",
};

export default async function ForumPage({ searchParams }) {
  const params = await searchParams;
  const page = parseInt(params?.page || "1", 10);
  const limit = 6;
  const response = await getAllForumPosts(page, limit);

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Modern Community Hero Section */}
        <div className="relative mb-16 rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#0B1120] to-[#020617] p-8 md:p-12 shadow-[0_0_50px_rgba(6,182,212,0.1)]">
          {/* Abstract background elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3"></div>
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                Live Community Hub
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                Connect. Share.<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Inspire.</span>
              </h1>
              <p className="text-lg text-slate-400 mb-8 max-w-xl leading-relaxed">
                Join thousands of fitness enthusiasts. Share your daily progress, ask questions, and get expert advice from certified trainers in our vibrant social network.
              </p>
              
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex -space-x-4">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0B1120] bg-slate-800 overflow-hidden relative">
                      <Image src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" fill className="object-cover" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-[#0B1120] bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold z-10">
                    +2k
                  </div>
                </div>
                <div className="text-sm">
                  <div className="text-white font-bold">Active Members</div>
                  <div className="text-slate-500">Joined this week</div>
                </div>
              </div>
            </div>

            <div className="hidden lg:grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-right-8 duration-700 delay-150">
              <div className="space-y-4 translate-y-8">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 transition-colors group">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-4 text-cyan-400 group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">10k+</h3>
                  <p className="text-sm text-slate-400">Daily Discussions</p>
                </div>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-colors group">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 text-blue-400 group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">Expert</h3>
                  <p className="text-sm text-slate-400">Trainer Advice</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-6 shadow-lg shadow-cyan-500/20 text-white group">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 text-white group-hover:rotate-12 transition-transform">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-1">Trending</h3>
                  <p className="text-sm text-cyan-100">Top fitness topics</p>
                </div>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-emerald-500/30 transition-colors group">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-4 text-emerald-400 group-hover:scale-110 transition-transform">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">Instant</h3>
                  <p className="text-sm text-slate-400">Community Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Header & Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-white/10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Recent Discussions</h2>
            <p className="text-slate-400 text-sm">Explore the latest posts from our community</p>
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <button className="px-5 py-2.5 rounded-full bg-cyan-500 text-black font-semibold text-sm whitespace-nowrap shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all hover:scale-105">
              Latest
            </button>
            <button className="px-5 py-2.5 rounded-full bg-[#0B1120] border border-white/10 text-slate-300 font-medium text-sm hover:border-cyan-500/50 hover:text-cyan-400 whitespace-nowrap transition-all">
              Trending
            </button>
            <button className="px-5 py-2.5 rounded-full bg-[#0B1120] border border-white/10 text-slate-300 font-medium text-sm hover:border-cyan-500/50 hover:text-cyan-400 whitespace-nowrap transition-all">
              Most Liked
            </button>
          </div>
        </div>

        <ForumGrid 
          posts={response?.posts || []} 
          currentPage={response?.currentPage || 1} 
          totalPages={response?.totalPages || 1} 
        />
      </div>
    </div>
  );
}
