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
      <div className="flex flex-col items-center justify-center p-12 bg-[#071028] border border-white/5 rounded-[24px]">
        <MessageSquare className="w-16 h-16 text-slate-500 mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">No posts yet</h3>
        <p className="text-slate-400 mb-6 text-center max-w-md">
          You haven&apos;t created any forum posts yet. Share your knowledge
          with the community!
        </p>
        <Link
          href="/dashboard/trainer/add-forum"
          className="bg-cyan-500 hover:bg-cyan-400 text-white px-6 py-2.5 rounded-xl font-medium transition-colors"
        >
          Create a Post
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {posts.map((post) => (
        <div
          key={post._id}
          className="bg-[#071028] border border-white/5 rounded-[24px] overflow-hidden flex flex-col hover:border-cyan-500/20 transition-colors group"
        >
          {/* Post Image */}
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
                <Image className="w-8 h-8 opacity-50" />
              </div>
            )}
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white border border-white/10">
              {format(new Date(post.createdAt), "MMM dd, yyyy")}
            </div>
          </div>

          {/* Post Content */}
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 leading-tight">
              {post.title}
            </h3>

            <p className="text-sm text-slate-400 line-clamp-3 mb-6 flex-grow">
              {post.description}
            </p>

            {/* Metrics */}
            <div className="flex items-center gap-4 py-4 border-t border-white/5 mb-2">
              <div className="flex items-center gap-1.5 text-slate-300">
                <ThumbsUp className="w-4 h-4 text-emerald-500" />
                <span className="text-sm font-medium">
                  {post.likeCount || 0}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <ThumbsDown className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium">
                  {post.dislikeCount || 0}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300 ml-auto">
                <MessageSquare className="w-4 h-4 text-cyan-500" />
                <span className="text-sm font-medium">
                  {post.commentCount || 0}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/5">
              <Link
                href={`/community-forum/${post._id}`}
                className="flex-1 bg-[#020617]/50 hover:bg-[#020617] border border-white/5 hover:border-cyan-500/30 text-white text-sm font-medium py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                View
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              <AlertDialog>
                <button
                  className="p-2.5 bg-red-500/10 hover:bg-red-500 border border-red-500/20 hover:border-red-500 text-red-500 hover:text-white rounded-xl transition-all"
                  disabled={deletingId === post._id}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <AlertDialog.Backdrop>
                  <AlertDialog.Container>
                    <AlertDialog.Dialog className="bg-[#071028] border-white/10 text-white sm:max-w-[400px]">
                      <AlertDialog.CloseTrigger />
                      <AlertDialog.Header>
                        <AlertDialog.Icon status="danger" />
                        <AlertDialog.Heading>Delete Forum Post?</AlertDialog.Heading>
                      </AlertDialog.Header>
                      <AlertDialog.Body>
                        <p className="text-slate-400">
                          Are you sure you want to delete &quot;{post.title}&quot;? This action cannot be undone and will remove all
                          associated comments and votes.
                        </p>
                      </AlertDialog.Body>
                      <AlertDialog.Footer>
                        <Button slot="close" variant="flat" className="bg-transparent border-white/10 hover:bg-white/5 text-white">
                          Cancel
                        </Button>
                        <Button slot="close" color="danger" onPress={() => handleDelete(post._id)} className="bg-red-500 hover:bg-red-600 text-white border-0">
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
      ))}
    </div>
  );
}
