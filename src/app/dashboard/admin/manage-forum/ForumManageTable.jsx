"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  Trash2,
  ExternalLink,
  Search,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { deleteForumPost } from "@/lib/actions/forum";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { AlertDialog, Button } from "@heroui/react";

export default function ForumManageTable({ initialPosts }) {
  const [posts, setPosts] = useState(initialPosts || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.authorName?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const paginatedPosts = filteredPosts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDelete = async (id) => {
    setDeletingId(id);
    toast.loading("Deleting post...");
    try {
      await deleteForumPost(id);
      setPosts(posts.filter((p) => p._id !== id));
      toast.dismiss();
      toast.success("Post deleted successfully");
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to delete post");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6 mt-6 animate-in fade-in duration-500">
      {/* Top Bar with Search */}
      <div className="bg-[#0B1120]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-6 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-cyan-500/50 group-focus-within:text-cyan-400 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search posts by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-11 pr-4 py-3 bg-[#020617]/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all shadow-inner"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-xl text-cyan-400 text-sm font-medium flex-1 md:flex-none text-center">
            Total Posts: {posts.length}
          </div>
        </div>
      </div>

      {/* Modern List Layout */}
      <div className="space-y-4">
        {paginatedPosts.length > 0 ? (
          paginatedPosts.map((post) => (
            <div
              key={post._id}
              className="group bg-[#0B1120]/60 backdrop-blur-md border border-white/5 rounded-2xl p-4 md:p-5 hover:bg-[#0f172a] hover:border-cyan-500/30 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(6,182,212,0.1)] flex flex-col lg:flex-row items-start lg:items-center gap-6"
            >
              {/* Thumbnail & Title */}
              <div className="flex items-start gap-4 flex-1 w-full min-w-0">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-[#020617] border border-white/10 group-hover:border-cyan-500/30 transition-colors">
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-slate-600 opacity-50" />
                    </div>
                  )}
                </div>
                <div className="flex flex-col min-w-0 flex-1 py-1">
                  <h3 className="text-lg font-bold text-white truncate mb-2 group-hover:text-cyan-400 transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-auto">
                    {post.authorImage ? (
                      <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0 border border-white/10">
                        <Image
                          src={post.authorImage}
                          alt={post.authorName || ""}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px] font-bold shrink-0">
                        {post.authorName?.charAt(0).toUpperCase() || "U"}
                      </div>
                    )}
                    <span className="text-sm font-medium text-slate-300 truncate">
                      {post.authorName}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-bold bg-white/5 px-2 py-0.5 rounded-md text-slate-400">
                      {post.authorRole}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats & Actions Row */}
              <div className="flex items-center justify-between w-full lg:w-auto gap-6 lg:gap-8 border-t border-white/5 lg:border-t-0 pt-4 lg:pt-0">
                {/* Metrics */}
                <div className="flex items-center gap-4 shrink-0">
                  <div className="flex items-center gap-1.5 text-slate-400 bg-[#020617] px-3 py-1.5 rounded-lg border border-white/5">
                    <ThumbsUp className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-semibold">
                      {post.likeCount || 0}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400 bg-[#020617] px-3 py-1.5 rounded-lg border border-white/5">
                    <MessageSquare className="w-4 h-4 text-cyan-500" />
                    <span className="text-xs font-semibold">
                      {post.commentCount || 0}
                    </span>
                  </div>
                </div>

                {/* Date */}
                <div className="hidden sm:block text-sm font-medium text-slate-500 shrink-0">
                  {format(new Date(post.createdAt), "MMM dd, yyyy")}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/forum/${post._id}`}
                    target="_blank"
                    className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 hover:bg-cyan-500 hover:text-black text-slate-300 transition-all duration-300 border border-transparent hover:border-cyan-400 tooltip-trigger shadow-sm"
                    title="View Post"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>

                  <AlertDialog>
                    <AlertDialog.Trigger>
                      <button
                        className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 hover:bg-red-500 hover:text-white text-slate-300 transition-all duration-300 border border-transparent hover:border-red-400 tooltip-trigger shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Delete Post"
                        disabled={deletingId === post._id}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </AlertDialog.Trigger>
                    <AlertDialog.Backdrop>
                      <AlertDialog.Container>
                        <AlertDialog.Dialog className="bg-[#0B1120] border border-white/10 text-white sm:max-w-[400px] shadow-2xl rounded-2xl">
                          <AlertDialog.CloseTrigger />
                          <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading className="text-xl font-bold">
                              Delete Forum Post?
                            </AlertDialog.Heading>
                          </AlertDialog.Header>
                          <AlertDialog.Body>
                            <p className="text-slate-400">
                              Are you sure you want to delete{" "}
                              <strong className="text-white">
                                &quot;{post.title}&quot;
                              </strong>
                              ? This action is permanent and will remove all
                              associated comments.
                            </p>
                          </AlertDialog.Body>
                          <AlertDialog.Footer>
                            <Button
                              slot="close"
                              variant="flat"
                              className="bg-transparent border-white/10 hover:bg-white/5 text-slate-300 font-medium rounded-xl"
                            >
                              Cancel
                            </Button>
                            <Button
                              slot="close"
                              color="danger"
                              onPress={() => handleDelete(post._id)}
                              onClick={() => handleDelete(post._id)}
                              className="bg-red-500 hover:bg-red-600 text-white border-0 font-medium shadow-lg shadow-red-500/20 rounded-xl"
                            >
                              Yes, Delete
                            </Button>
                          </AlertDialog.Footer>
                        </AlertDialog.Dialog>
                      </AlertDialog.Container>
                    </AlertDialog.Backdrop>
                  </AlertDialog>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-[#0B1120]/40 backdrop-blur-md border border-white/5 rounded-2xl border-dashed">
            <MessageSquare className="w-12 h-12 text-slate-600 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No posts found
            </h3>
            <p className="text-slate-400">
              {searchTerm
                ? "No posts match your search criteria."
                : "There are no forum posts to moderate yet."}
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 mt-6 border-t border-white/10">
            <div className="text-sm text-slate-400">
              Showing page <span className="font-medium text-white">{currentPage}</span> of <span className="font-medium text-white">{totalPages}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-2 py-2 text-sm font-medium text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              
              <div className="flex items-center gap-1 px-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                      currentPage === page 
                        ? "bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.3)]" 
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-2 py-2 text-sm font-medium text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
