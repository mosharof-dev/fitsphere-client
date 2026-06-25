"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Trash2, ExternalLink, Search } from "lucide-react";
import { deleteForumPost } from "@/lib/actions/forum";
import { toast } from "sonner";
import Link from "next/link";
import { AlertDialog, Button } from "@heroui/react";

export default function ForumManageTable({ initialPosts }) {
  const [posts, setPosts] = useState(initialPosts || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.authorName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <div className="bg-[#071028] border border-white/5 rounded-[24px] shadow-2xl overflow-hidden">
      {/* Search Bar */}
      <div className="p-6 border-b border-white/5 flex items-center justify-between gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[250px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search posts by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#020617]/50 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#020617]/50 border-b border-white/5 text-xs uppercase tracking-wider text-slate-400">
              <th className="px-6 py-4 font-semibold">Post Title</th>
              <th className="px-6 py-4 font-semibold">Author</th>
              <th className="px-6 py-4 font-semibold">Metrics</th>
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <tr key={post._id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-white line-clamp-1 max-w-[300px]">
                      {post.title}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold shrink-0">
                        {post.authorName?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <div>
                        <p className="text-sm text-slate-200">{post.authorName}</p>
                        <p className="text-xs text-slate-500 capitalize">{post.authorRole}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md">
                        {post.likeCount || 0} Likes
                      </span>
                      <span className="text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded-md">
                        {post.commentCount || 0} Comments
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-300">
                      {format(new Date(post.createdAt), 'MMM dd, yyyy')}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        href={`/community-forum/${post._id}`}
                        target="_blank"
                        className="p-2 bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg transition-colors tooltip-trigger"
                        title="View Post"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      
                      <AlertDialog>
                        <button 
                          className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors tooltip-trigger"
                          title="Delete Post"
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
                                  Are you sure you want to delete this post? This action is permanent.
                                </p>
                              </AlertDialog.Body>
                              <AlertDialog.Footer>
                                <Button slot="close" variant="flat" className="bg-transparent border-white/10 hover:bg-white/5 text-white">
                                  Cancel
                                </Button>
                                <Button slot="close" color="danger" onPress={() => handleDelete(post._id)} className="bg-red-500 hover:bg-red-600 text-white border-0">
                                  Delete
                                </Button>
                              </AlertDialog.Footer>
                            </AlertDialog.Dialog>
                          </AlertDialog.Container>
                        </AlertDialog.Backdrop>
                      </AlertDialog>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                  {searchTerm ? "No posts found matching your search." : "No forum posts available."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
