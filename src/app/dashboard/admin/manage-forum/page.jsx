import PageContainer from "@/components/dashboard/PageContainer";
import { getAllForumPosts } from "@/lib/actions/forum";
import ForumManageTable from "./ForumManageTable";

export const metadata = {
  title: "Manage Forum Posts",
  description: "Moderate community forum posts",
};

export default async function AdminForumManagePage() {
  const response = await getAllForumPosts(1, 100);
  const posts = response?.posts || [];

  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard/admin/overview" },
    { label: "Manage Forum" },
  ];

  return (
    <PageContainer
      title="Forum Moderation"
      description="Monitor and manage all community forum posts across the platform."
      breadcrumbs={breadcrumbs}
    >
      <ForumManageTable initialPosts={posts} />
    </PageContainer>
  );
}
