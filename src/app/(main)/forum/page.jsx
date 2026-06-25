import React from "react";
import { getAllForumPosts } from "@/lib/actions/forum";
import ForumGrid from "@/components/forum/ForumGrid";

export const metadata = {
  title: "Community Forum | FitSphere",
  description: "Join the conversation on the FitSphere Community Forum",
};

export default async function ForumPage({ searchParams }) {
  const page = parseInt(searchParams?.page || "1", 10);
  const limit = 6;
  const response = await getAllForumPosts(page, limit);

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Community <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Forum</span>
          </h1>
          <p className="text-lg text-slate-400">
            Join the conversation, share your fitness journey, and learn from expert trainers and community members.
          </p>
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
