import PageContainer from "@/components/dashboard/PageContainer";
import AddForumPostForm from "@/components/forum/AddForumPostForm";

export const metadata = {
  title: "Add Forum Post",
  description: "Contribute to the FitSphere Community Forum",
};

export default function AdminAddForumPage() {
  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard/admin/overview" },
    { label: "Add Forum Post" },
  ];

  return (
    <PageContainer
      title="Add Forum Post (Admin)"
      description="Create official announcements or share insights with the community."
      breadcrumbs={breadcrumbs}
    >
      <AddForumPostForm redirectPath="/dashboard/admin/manage-forum" />
    </PageContainer>
  );
}
