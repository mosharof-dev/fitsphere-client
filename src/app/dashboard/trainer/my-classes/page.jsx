import PageContainer from "@/components/dashboard/PageContainer";
import ComingSoon from "@/components/dashboard/ComingSoon";

export default function MyClassesPage() {
  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard/trainer/overview" },
    { label: "My Classes" }
  ];

  return (
    <PageContainer 
      title="My Classes" 
      description="Manage the classes you are teaching."
      breadcrumbs={breadcrumbs}
    >
      <ComingSoon />
    </PageContainer>
  );
}
