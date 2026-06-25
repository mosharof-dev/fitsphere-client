import PageContainer from "@/components/dashboard/PageContainer";
import AddForumPostForm from "@/components/forum/AddForumPostForm";

export const metadata = {
  title: "Add Forum Post",
  description: "Contribute to the FitSphere Community Forum",
};

export default function TrainerAddForumPage() {
  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard/trainer/overview" },
    { label: "Add Forum Post" },
  ];

  return (
    <PageContainer
      title="Add Forum Post"
      description="Share your knowledge, tips, and insights with the FitSphere community."
      breadcrumbs={breadcrumbs}
    >
      <AddForumPostForm redirectPath="/dashboard/trainer/my-posts" />
    </PageContainer>
  );
}
