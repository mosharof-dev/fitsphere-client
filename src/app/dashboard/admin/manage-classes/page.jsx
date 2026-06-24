import PageContainer from "@/components/dashboard/PageContainer";
import ComingSoon from "@/components/dashboard/ComingSoon";
import { getAllAdminClasses } from "@/lib/api/classes";

export default async function ManageClassesPage() {
  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard/admin/overview" },
    { label: "Manage Classes" },
  ];

  const getAll = await getAllAdminClasses();

  console.log(getAll);

  return (
    <PageContainer
      title="Manage Classes"
      description="View and manage all active classes."
      breadcrumbs={breadcrumbs}
    >
      <ComingSoon />
    </PageContainer>
  );
}
