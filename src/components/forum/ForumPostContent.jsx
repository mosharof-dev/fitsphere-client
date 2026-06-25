"use client";

import { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { ThumbsUp, ThumbsDown, MessageSquare, AlertCircle, Share2, CornerDownRight, Trash2, Edit2 } from "lucide-react";
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

  // Filter top-level comments and replies
  const topLevelComments = comments.filter(c => !c.parentCommentId);
  
  const getReplies = (parentId) => {
    return comments.filter(c => c.parentCommentId === parentId);
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

    if (vote === type) {
      toast.info(`You have already ${type}d this post.`);
      return;
    }

    // Optimistic Update
    const prevVote = vote;
    setVote(type);
    
    if (type === "upvote") {
      setLikeCount(prev => prev + 1);
      if (prevVote === "downvote") setDislikeCount(prev => Math.max(0, prev - 1));
    } else {
      setDislikeCount(prev => prev + 1);
      if (prevVote === "upvote") setLikeCount(prev => Math.max(0, prev - 1));
    }

    try {
      await voteForumPost(post._id, type);
    } catch (error) {
      // Revert on failure
      setVote(prevVote);
      if (type === "upvote") {
        setLikeCount(prev => Math.max(0, prev - 1));
        if (prevVote === "downvote") setDislikeCount(prev => prev + 1);
      } else {
        setDislikeCount(prev => Math.max(0, prev - 1));
        if (prevVote === "upvote") setLikeCount(prev => prev + 1);
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
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Main Post Section */}
      <div className="bg-[#071028] border border-white/5 rounded-[24px] overflow-hidden shadow-2xl">
        {post.image && (
          <div className="relative w-full h-[300px] md:h-[400px]">
            <Image 
              src={post.image} 
              alt={post.title} 
              fill 
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071028] to-transparent"></div>
          </div>
        )}
        
        <div className="p-6 md:p-10 -mt-20 relative z-10">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-3 bg-[#020617]/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm font-bold">
                {post.authorName?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{post.authorName}</p>
                <p className="text-xs text-cyan-400 capitalize">{post.authorRole}</p>
              </div>
            </div>
            <span className="text-sm text-slate-400 bg-[#020617]/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              {format(new Date(post.createdAt), 'MMMM dd, yyyy')}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 leading-tight">
            {post.title}
          </h1>

          <div className="prose prose-invert prose-cyan max-w-none mb-12 text-slate-300 leading-relaxed whitespace-pre-wrap">
            {post.description}
          </div>

          {/* Interaction Bar */}
          <div className="flex items-center justify-between py-6 border-t border-white/10">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => handleVote("upvote")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                  vote === "upvote" 
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" 
                    : "bg-[#020617]/50 text-slate-400 border border-white/5 hover:border-emerald-500/30 hover:text-emerald-400"
                }`}
              >
                <ThumbsUp className="w-5 h-5" />
                {likeCount}
              </button>
              
              <button 
                onClick={() => handleVote("downvote")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                  vote === "downvote" 
                    ? "bg-red-500/20 text-red-400 border border-red-500/30" 
                    : "bg-[#020617]/50 text-slate-400 border border-white/5 hover:border-red-500/30 hover:text-red-400"
                }`}
              >
                <ThumbsDown className="w-5 h-5" />
                {dislikeCount}
              </button>
            </div>

            <button className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors">
              <Share2 className="w-5 h-5" />
              <span className="text-sm font-medium hidden sm:inline">Share</span>
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
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm font-bold shrink-0">
                  {comment.authorName?.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 bg-[#020617]/50 border border-white/5 rounded-2xl rounded-tl-none p-4 group">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-semibold text-white mr-3">{comment.authorName}</span>
                      <span className="text-xs text-slate-500">
                        {format(new Date(comment.createdAt), 'MMM dd, yyyy h:mm a')}
                      </span>
                    </div>
                    {currentUser?.id === comment.authorId && (
                      <button 
                        onClick={() => handleDeleteComment(comment._id)}
                        className="text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                        title="Delete Comment"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-3 whitespace-pre-wrap">
                    {comment.text}
                  </p>
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
                      <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold shrink-0">
                        {reply.authorName?.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 bg-[#020617]/30 border border-white/5 rounded-2xl rounded-tl-none p-4 group">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="font-semibold text-white text-sm mr-3">{reply.authorName}</span>
                            <span className="text-xs text-slate-500">
                              {format(new Date(reply.createdAt), 'MMM dd')}
                            </span>
                          </div>
                          {currentUser?.id === reply.authorId && (
                            <button 
                              onClick={() => handleDeleteComment(reply._id)}
                              className="text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                              title="Delete Reply"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                          {reply.text}
                        </p>
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
