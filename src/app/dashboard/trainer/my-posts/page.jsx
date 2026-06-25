import PageContainer from "@/components/dashboard/PageContainer";
import { getMyForumPosts } from "@/lib/actions/forum";
import MyPostsList from "./MyPostsList";

export const metadata = {
  title: "My Forum Posts",
  description: "Manage your forum posts",
};

export default async function MyPostsPage() {
  const posts = await getMyForumPosts();

  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard/trainer/overview" },
    { label: "My Forum Posts" },
  ];

  return (
    <PageContainer
      title="My Forum Posts"
      description="Manage and track the posts you've shared with the community."
      breadcrumbs={breadcrumbs}
    >
      <MyPostsList initialPosts={posts} />
    </PageContainer>
  );
}
