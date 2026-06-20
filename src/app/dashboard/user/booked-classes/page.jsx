import PageContainer from "@/components/dashboard/PageContainer";
import ComingSoon from "@/components/dashboard/ComingSoon";

export default function BookedClassesPage() {
  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard/user/overview" },
    { label: "Booked Classes" }
  ];

  return (
    <PageContainer 
      title="Booked Classes" 
      description="View and manage your upcoming class bookings."
      breadcrumbs={breadcrumbs}
    >
      <ComingSoon />
    </PageContainer>
  );
}
