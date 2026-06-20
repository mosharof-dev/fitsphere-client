import PageContainer from "@/components/dashboard/PageContainer";
import ComingSoon from "@/components/dashboard/ComingSoon";

export default function AdminAddForumPostPage() {
  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard/admin/overview" },
    { label: "Add Forum Post" }
  ];

  return (
    <PageContainer 
      title="Add Forum Post" 
      description="Create an official post in the community forum."
      breadcrumbs={breadcrumbs}
    >
      <ComingSoon />
    </PageContainer>
  );
}
