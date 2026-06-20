import PageContainer from "@/components/dashboard/PageContainer";
import ComingSoon from "@/components/dashboard/ComingSoon";

export default function ApplyTrainerPage() {
  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard/user/overview" },
    { label: "Apply As Trainer" }
  ];

  return (
    <PageContainer 
      title="Apply As Trainer" 
      description="Submit your application to become a certified trainer."
      breadcrumbs={breadcrumbs}
    >
      <ComingSoon />
    </PageContainer>
  );
}
