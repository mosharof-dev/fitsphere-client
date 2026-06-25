"use client";

import { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { ThumbsUp, ThumbsDown, MessageSquare, AlertCircle, Share2, CornerDownRight, Trash2, Edit2, ArrowLeft, Home } from "lucide-react";
import { voteForumPost } from "@/lib/actions/forum";
import { addComment, deleteComment, editComment } from "@/lib/actions/comments";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ForumPostContent({ post, initialComments, initialVote, currentUser }) {
  const router = useRouter();
  const [vote, setVote] = useState(initialVote);
  const [likeCount, setLikeCount] = useState(post.likeCount || 0);
  const [dislikeCount, setDislikeCount] = useState(post.dislikeCount || 0);
  
  const [comments, setComments] = useState(initialComments || []);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null); // ID of the parent comment
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Edit State
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");

  const validComments = Array.isArray(comments) ? comments : [];
  // Filter top-level comments and replies
  const topLevelComments = validComments.filter(c => !c.parentCommentId);
  
  const getReplies = (parentId) => {
    return validComments.filter(c => c.parentCommentId === parentId);
  };

  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center p-12 bg-[#071028] border border-white/5 rounded-[24px]">
        <AlertCircle className="w-16 h-16 text-cyan-500 mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">Authentication Required</h3>
        <p className="text-slate-400 mb-6 text-center max-w-md">
          You must be logged in to read full forum posts, vote, and interact with the community.
        </p>
        <button 
          onClick={() => router.push("/login")}
          className="bg-cyan-500 hover:bg-cyan-400 text-white px-8 py-3 rounded-xl font-medium transition-colors"
        >
          Login to Continue
        </button>
      </div>
    );
  }

  const handleVote = async (type) => {
    if (currentUser.status === "blocked") {
      toast.error("Action restricted by Admin. You are blocked.");
      return;
    }

    // Toggle case
    const isToggleOff = vote === type;
    const prevVote = vote;
    
    // Optimistic Update
    if (isToggleOff) {
      setVote(null);
      if (type === "upvote") {
        setLikeCount(prev => Math.max(0, prev - 1));
      } else {
        setDislikeCount(prev => Math.max(0, prev - 1));
      }
    } else {
      setVote(type);
      if (type === "upvote") {
        setLikeCount(prev => prev + 1);
        if (prevVote === "downvote") setDislikeCount(prev => Math.max(0, prev - 1));
      } else {
        setDislikeCount(prev => prev + 1);
        if (prevVote === "upvote") setLikeCount(prev => Math.max(0, prev - 1));
      }
    }

    try {
      await voteForumPost(post._id, type);
    } catch (error) {
      // Revert on failure
      setVote(prevVote);
      if (isToggleOff) {
        if (type === "upvote") {
          setLikeCount(prev => prev + 1);
        } else {
          setDislikeCount(prev => prev + 1);
        }
      } else {
        if (type === "upvote") {
          setLikeCount(prev => Math.max(0, prev - 1));
          if (prevVote === "downvote") setDislikeCount(prev => prev + 1);
        } else {
          setDislikeCount(prev => Math.max(0, prev - 1));
          if (prevVote === "upvote") setLikeCount(prev => prev + 1);
        }
      }
      toast.error(error.message || "Failed to vote");
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    if (currentUser.status === "blocked") {
      toast.error("Action restricted by Admin. You are blocked.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await addComment(post._id, newComment, replyingTo);
      if (response && response._id) {
        setComments([...comments, response]);
        setNewComment("");
        setReplyingTo(null);
        toast.success(replyingTo ? "Reply posted!" : "Comment posted!");
      }
    } catch (error) {
      toast.error(error.message || "Failed to post comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditCommentSubmit = async (commentId) => {
    if (!editCommentText.trim()) return;
    try {
      await editComment(commentId, editCommentText);
      setComments(comments.map(c => c._id === commentId ? { ...c, text: editCommentText } : c));
      setEditingCommentId(null);
      toast.success("Comment updated!");
    } catch (error) {
      toast.error("Failed to update comment");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      // Remove the comment and its replies from state
      setComments(comments.filter(c => c._id !== commentId && c.parentCommentId !== commentId));
      toast.success("Comment deleted");
    } catch (error) {
      toast.error("Failed to delete comment");
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      
      {/* Top Navigation */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all hover:scale-105 text-sm font-medium text-slate-300 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" /> Go Back
        </button>
        <button 
          onClick={() => router.push("/")}
          className="flex items-center gap-2 px-5 py-2.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-full border border-cyan-500/20 transition-all hover:scale-105 text-sm font-medium"
        >
          <Home className="w-4 h-4" /> Back to Home
        </button>
      </div>

      {/* Post Header */}
      <div className="mb-10 px-2">
        <div className="flex items-center gap-4 mb-6">
          {post.authorImage ? (
            <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-white/10 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <Image src={post.authorImage} alt={post.authorName} fill className="object-cover" />
            </div>
          ) : (
            <div className="w-14 h-14 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xl font-bold shrink-0 border-2 border-cyan-500/30">
              {post.authorName?.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <h3 className="text-xl font-bold text-white mb-1">{post.authorName}</h3>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-cyan-400 capitalize font-medium px-2 py-0.5 bg-cyan-500/10 rounded-md border border-cyan-500/20">{post.authorRole}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
              <span className="text-slate-400">
                {post.createdAt ? format(new Date(post.createdAt), 'MMMM dd, yyyy') : 'Unknown Date'}
              </span>
            </div>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
          {post.title}
        </h1>
      </div>

      {/* Main Content Card */}
      <div className="bg-[#071028] border border-white/5 rounded-[32px] overflow-hidden shadow-2xl relative">
        
        {/* Hero Image */}
        {post.image && (
          <div className="relative w-full h-[350px] md:h-[500px] border-b border-white/5">
            <Image 
              src={post.image} 
              alt={post.title} 
              fill 
              className="object-cover hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071028] via-transparent to-transparent opacity-90"></div>
          </div>
        )}

        {/* Text Content & Interaction */}
        <div className={`p-8 md:p-12 ${post.image ? 'pt-8' : ''}`}>
          <div className="prose prose-invert prose-cyan max-w-none text-slate-300 text-lg leading-relaxed whitespace-pre-wrap mb-12">
            {post.description}
          </div>

          {/* Interaction Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-t border-white/10">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => handleVote("upvote")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
                  vote === "upvote" 
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]" 
                    : "bg-[#020617] text-slate-400 border border-white/10 hover:border-emerald-500/30 hover:text-emerald-400 hover:bg-emerald-500/5"
                }`}
              >
                <ThumbsUp className="w-5 h-5" />
                {likeCount}
              </button>
              
              <button 
                onClick={() => handleVote("downvote")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
                  vote === "downvote" 
                    ? "bg-red-500/20 text-red-400 border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]" 
                    : "bg-[#020617] text-slate-400 border border-white/10 hover:border-red-500/30 hover:text-red-400 hover:bg-red-500/5"
                }`}
              >
                <ThumbsDown className="w-5 h-5" />
                {dislikeCount}
              </button>
            </div>

            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#020617] text-slate-300 border border-white/10 hover:border-cyan-500/30 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all font-medium">
              <Share2 className="w-5 h-5" />
              <span>Share Post</span>
            </button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-[#071028] border border-white/5 rounded-[24px] p-6 md:p-10">
        <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
          <MessageSquare className="text-cyan-500 w-6 h-6" />
          Comments ({comments.length})
        </h3>

        {/* Comment Form */}
        <form onSubmit={handleSubmitComment} className="mb-10">
          {replyingTo && (
            <div className="flex items-center justify-between bg-[#020617]/50 border border-cyan-500/20 text-cyan-400 px-4 py-2 rounded-t-xl text-sm">
              <span className="flex items-center gap-2">
                <CornerDownRight className="w-4 h-4" />
                Replying to a comment
              </span>
              <button type="button" onClick={() => setReplyingTo(null)} className="hover:text-white transition-colors">
                Cancel
              </button>
            </div>
          )}
          <div className="relative">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add to the discussion..."
              className={`w-full bg-[#020617] border border-white/10 ${replyingTo ? 'rounded-b-xl rounded-t-none' : 'rounded-xl'} p-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 resize-y min-h-[120px]`}
              disabled={isSubmitting}
            />
            <button
              type="submit"
              disabled={isSubmitting || !newComment.trim()}
              className="absolute bottom-4 right-4 bg-cyan-500 hover:bg-cyan-400 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Posting..." : "Post Comment"}
            </button>
          </div>
        </form>

        {/* Comments List */}
        <div className="space-y-6">
          {topLevelComments.map(comment => (
            <div key={comment._id} className="space-y-4">
              {/* Main Comment */}
              <div className="flex gap-4">
                {comment.authorImage ? (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-white/10">
                    <Image src={comment.authorImage} alt={comment.authorName || ""} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm font-bold shrink-0">
                    {comment.authorName?.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex-1 bg-[#020617]/50 border border-white/5 rounded-2xl rounded-tl-none p-4 group relative">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-semibold text-white mr-3">{comment.authorName}</span>
                      <span className="text-xs text-slate-500">
                        {comment.createdAt ? format(new Date(comment.createdAt), 'MMM dd, yyyy h:mm a') : ''}
                      </span>
                    </div>
                    {currentUser?.id === comment.authorId && (
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all absolute top-4 right-4 bg-[#020617] px-2 py-1 rounded-lg border border-white/10">
                        <button 
                          onClick={() => {
                            setEditingCommentId(comment._id);
                            setEditCommentText(comment.text);
                          }}
                          className="text-slate-500 hover:text-cyan-400 p-1"
                          title="Edit Comment"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteComment(comment._id)}
                          className="text-slate-500 hover:text-red-400 p-1"
                          title="Delete Comment"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {editingCommentId === comment._id ? (
                    <div className="mb-3 animate-in fade-in zoom-in-95 duration-200">
                      <textarea
                        value={editCommentText}
                        onChange={(e) => setEditCommentText(e.target.value)}
                        className="w-full bg-[#0B1120] border border-cyan-500/50 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-cyan-500 resize-y min-h-[80px]"
                      />
                      <div className="flex gap-2 justify-end mt-2">
                        <button onClick={() => setEditingCommentId(null)} className="text-xs text-slate-400 hover:text-white px-3 py-1.5 bg-white/5 rounded-lg transition-colors">Cancel</button>
                        <button onClick={() => handleEditCommentSubmit(comment._id)} className="text-xs text-white bg-cyan-500 hover:bg-cyan-400 px-4 py-1.5 rounded-lg font-medium transition-colors">Save</button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-slate-300 text-sm leading-relaxed mb-3 whitespace-pre-wrap pr-12">
                      {comment.text}
                    </p>
                  )}

                  <button 
                    onClick={() => setReplyingTo(comment._id)}
                    className="text-xs font-medium text-slate-500 hover:text-cyan-400 transition-colors flex items-center gap-1"
                  >
                    <CornerDownRight className="w-3 h-3" /> Reply
                  </button>
                </div>
              </div>

              {/* Replies */}
              {getReplies(comment._id).length > 0 && (
                <div className="pl-14 space-y-4">
                  {getReplies(comment._id).map(reply => (
                    <div key={reply._id} className="flex gap-4">
                      {reply.authorImage ? (
                        <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-white/10">
                          <Image src={reply.authorImage} alt={reply.authorName || ""} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold shrink-0">
                          {reply.authorName?.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="flex-1 bg-[#020617]/30 border border-white/5 rounded-2xl rounded-tl-none p-4 group relative">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="font-semibold text-white text-sm mr-3">{reply.authorName}</span>
                            <span className="text-xs text-slate-500">
                              {reply.createdAt ? format(new Date(reply.createdAt), 'MMM dd') : ''}
                            </span>
                          </div>
                          {currentUser?.id === reply.authorId && (
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all absolute top-4 right-4 bg-[#020617] px-2 py-1 rounded-lg border border-white/10">
                              <button 
                                onClick={() => {
                                  setEditingCommentId(reply._id);
                                  setEditCommentText(reply.text);
                                }}
                                className="text-slate-500 hover:text-cyan-400 p-1"
                                title="Edit Reply"
                              >
                                <Edit2 className="w-3 h-3" />
                              </button>
                              <button 
                                onClick={() => handleDeleteComment(reply._id)}
                                className="text-slate-500 hover:text-red-400 p-1"
                                title="Delete Reply"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </div>

                        {editingCommentId === reply._id ? (
                          <div className="mb-1 animate-in fade-in zoom-in-95 duration-200">
                            <textarea
                              value={editCommentText}
                              onChange={(e) => setEditCommentText(e.target.value)}
                              className="w-full bg-[#0B1120] border border-cyan-500/50 rounded-xl p-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 resize-y min-h-[60px]"
                            />
                            <div className="flex gap-2 justify-end mt-2">
                              <button onClick={() => setEditingCommentId(null)} className="text-xs text-slate-400 hover:text-white px-3 py-1 bg-white/5 rounded-lg transition-colors">Cancel</button>
                              <button onClick={() => handleEditCommentSubmit(reply._id)} className="text-xs text-white bg-cyan-500 hover:bg-cyan-400 px-3 py-1 rounded-lg font-medium transition-colors">Save</button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap pr-12">
                            {reply.text}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          {comments.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              No comments yet. Be the first to share your thoughts!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
