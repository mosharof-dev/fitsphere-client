"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { MessageSquare, ThumbsUp, ThumbsDown, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";

export default function ForumGrid({ posts, currentPage, totalPages }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);
    router.push(`/forum?${params.toString()}`);
  };

  if (!posts || posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-[#071028] border border-white/5 rounded-[24px]">
        <MessageSquare className="w-16 h-16 text-slate-500 mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">No posts yet</h3>
        <p className="text-slate-400 text-center">
          Be the first to start a discussion!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post._id} className="bg-[#071028] border border-white/5 rounded-[24px] overflow-hidden flex flex-col hover:border-cyan-500/20 transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] group">
            <div className="relative h-48 w-full overflow-hidden bg-[#020617]/50">
              {post.image ? (
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-500">
                  <ImageIcon className="w-8 h-8 opacity-50" />
                </div>
              )}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 z-10">
                {post.authorImage ? (
                  <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0 border border-white/10">
                    <Image src={post.authorImage} alt={post.authorName || ""} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px] font-bold shrink-0">
                    {post.authorName?.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-xs font-medium text-white">{post.authorName}</span>
              </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <div className="text-xs text-slate-400 mb-3 font-medium">
                {format(new Date(post.createdAt), 'MMMM dd, yyyy')}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 leading-tight group-hover:text-cyan-400 transition-colors">
                {post.title}
              </h3>
              
              <p className="text-sm text-slate-400 line-clamp-3 mb-6 flex-grow">
                {post.description}
              </p>

              <div className="flex items-center gap-4 py-4 border-t border-white/5 mb-2">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <ThumbsUp className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-medium">{post.likeCount || 0}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <ThumbsDown className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-medium">{post.dislikeCount || 0}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300 ml-auto">
                  <MessageSquare className="w-4 h-4 text-cyan-500" />
                  <span className="text-sm font-medium">{post.commentCount || 0}</span>
                </div>
              </div>

              <div className="pt-2">
                <Link 
                  href={`/forum/${post._id}`}
                  className="w-full bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-white font-medium py-3 rounded-xl flex items-center justify-center transition-all border border-cyan-500/20"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 bg-[#071028] border border-white/10 rounded-lg hover:border-cyan-500/50 hover:text-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-lg font-medium transition-all ${
                  currentPage === page 
                    ? "bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]" 
                    : "bg-[#071028] border border-white/10 hover:border-cyan-500/50 hover:text-cyan-400"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 bg-[#071028] border border-white/10 rounded-lg hover:border-cyan-500/50 hover:text-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
