import { getForumPostDetails, getVoteStatus } from "@/lib/actions/forum";
import { getComments } from "@/lib/actions/comments";
import { getUserSession } from "@/lib/core/session";
import ForumPostContent from "@/components/forum/ForumPostContent";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const post = await getForumPostDetails(id);
  if (!post) return { title: "Post Not Found" };
  
  return {
    title: `${post.title} | FitSphere Forum`,
    description: post.description,
  };
}

export default async function ForumPostDetailsPage({ params }) {
  const { id } = await params;
  const user = await getUserSession();
  
  // Need to be logged in to view post details as per requirements
  // We'll let the Client Component or Middleware handle strict redirect, 
  // but here we can just pass the user session to it.
  
  const [post, comments, initialVote] = await Promise.all([
    getForumPostDetails(id),
    getComments(id),
    user ? getVoteStatus(id) : null,
  ]);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-6">
        <ForumPostContent 
          post={post} 
          initialComments={comments} 
          initialVote={initialVote}
          currentUser={user}
        />
      </div>
    </div>
  );
}
