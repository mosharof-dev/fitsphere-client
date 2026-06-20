import PageContainer from "@/components/dashboard/PageContainer";
import ComingSoon from "@/components/dashboard/ComingSoon";

export default function AppliedTrainersPage() {
  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard/admin/overview" },
    { label: "Applied Trainers" }
  ];

  return (
    <PageContainer 
      title="Applied Trainers" 
      description="Review and approve trainer applications."
      breadcrumbs={breadcrumbs}
    >
      <ComingSoon />
    </PageContainer>
  );
}
