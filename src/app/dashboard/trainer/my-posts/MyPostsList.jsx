"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import {
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Trash2,
  ExternalLink,
  Plus,
} from "lucide-react";
import { deleteForumPost } from "@/lib/actions/forum";
import { toast } from "sonner";
import { AlertDialog, Button } from "@heroui/react";

export default function MyPostsList({ initialPosts }) {
  const [posts, setPosts] = useState(initialPosts || []);
  const [deletingId, setDeletingId] = useState(null);

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

  if (!posts || posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4 text-center border border-dashed border-white/10 rounded-3xl bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm">
        <div className="w-24 h-24 bg-cyan-500/10 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(6,182,212,0.15)] relative">
          <div className="absolute inset-0 border border-cyan-500/20 rounded-full animate-ping opacity-20"></div>
          <MessageSquare className="w-12 h-12 text-cyan-400" />
        </div>
        <h3 className="text-3xl font-extrabold text-white mb-3">
          No posts yet
        </h3>
        <p className="text-gray-400 max-w-md mb-10 text-lg">
          You haven&apos;t created any forum posts yet. Share your knowledge
          with the community!
        </p>
        <Link
          href="/dashboard/trainer/add-forum-post"
          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] transform hover:-translate-y-1"
        >
          <Plus className="w-6 h-6" />
          <span>Create a Post</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col m-4 gap-6">
      {posts.map((post) => (
        <div
          key={post._id}
          className="bg-[#0B1120]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] hover:border-cyan-500/30 transition-all duration-500 group flex flex-col md:flex-row"
        >
          {/* Image Section */}
          <div className="relative h-60 md:h-auto md:w-2/5 lg:w-1/3 overflow-hidden bg-muted shrink-0">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120]/80 via-transparent to-transparent z-10 md:hidden" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0B1120] z-10 hidden md:block" />

            {post.image ? (
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#020617]">
                <MessageSquare className="w-12 h-12 text-slate-600 opacity-50" />
              </div>
            )}

            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 z-20">
              <span className="bg-cyan-500 text-black text-xs px-3 py-1.5 rounded-full font-bold tracking-wide shadow-lg">
                Forum Post
              </span>
            </div>

            <div className="absolute top-4 right-4 z-20 md:right-auto md:left-4 md:top-14">
              <span className="bg-emerald-500 text-black text-xs px-3 py-1.5 rounded-full font-bold tracking-wide shadow-lg">
                {format(new Date(post.createdAt), "MMM dd, yyyy")}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 md:p-8 flex-grow flex flex-col relative z-20 bg-[#0B1120]">
            <div className="flex justify-between items-start mb-3 gap-4">
              <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors leading-tight">
                {post.title}
              </h3>
            </div>

            <p className="text-sm md:text-base text-gray-400 line-clamp-3 mb-6 leading-relaxed flex-grow">
              {post.description}
            </p>

            {/* Info Pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="flex items-center text-xs md:text-sm text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                <ThumbsUp className="w-4 h-4 mr-2" />
                {post.likeCount || 0} Likes
              </span>
              <span className="flex items-center text-xs md:text-sm text-red-400 bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20">
                <ThumbsDown className="w-4 h-4 mr-2" />
                {post.dislikeCount || 0} Dislikes
              </span>
              <span className="flex items-center text-xs md:text-sm text-cyan-400 bg-cyan-500/10 px-3 py-1.5 rounded-lg border border-cyan-500/20">
                <MessageSquare className="w-4 h-4 mr-2" />
                {post.commentCount || 0} Comments
              </span>
            </div>

            {/* Bottom Actions Row */}
            <div className="flex flex-col sm:flex-row justify-end items-start sm:items-end mt-auto pt-5 border-t border-white/10 gap-6 sm:gap-4">
              <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full sm:w-auto">
                <Link
                  href={`/forum/${post._id}`}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 text-gray-300 hover:bg-cyan-500 hover:text-black transition-all duration-300 font-semibold text-sm border border-transparent hover:border-cyan-400"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>View Post</span>
                </Link>

                <AlertDialog>
                  <AlertDialog.Trigger>
                    <button
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 text-gray-300 hover:bg-red-500 hover:text-white transition-all duration-300 font-semibold text-sm border border-transparent hover:border-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={deletingId === post._id}
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </AlertDialog.Trigger>
                  <AlertDialog.Backdrop>
                    <AlertDialog.Container>
                      <AlertDialog.Dialog className="bg-[#071028] border-white/10 text-white sm:max-w-[400px]">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                          <AlertDialog.Icon status="danger" />
                          <AlertDialog.Heading>
                            Delete Forum Post?
                          </AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                          <p className="text-slate-400">
                            Are you sure you want to delete &quot;{post.title}
                            &quot;? This action cannot be undone and will remove
                            all associated comments and votes.
                          </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                          <Button
                            slot="close"
                            variant="flat"
                            className="bg-transparent border-white/10 hover:bg-white/5 text-white"
                          >
                            Cancel
                          </Button>
                          <Button
                            slot="close"
                            color="danger"
                            onPress={() => handleDelete(post._id)}
                            onClick={() => handleDelete(post._id)}
                            className="bg-red-500 hover:bg-red-600 text-white border-0"
                          >
                            Yes, delete post
                          </Button>
                        </AlertDialog.Footer>
                      </AlertDialog.Dialog>
                    </AlertDialog.Container>
                  </AlertDialog.Backdrop>
                </AlertDialog>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
