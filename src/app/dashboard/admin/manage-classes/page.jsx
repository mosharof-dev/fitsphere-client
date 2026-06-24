import PageContainer from "@/components/dashboard/PageContainer";
import { getAllAdminClasses } from "@/lib/api/classes";
import ManageClassesTable from "./ManageClassesTable";

export default async function ManageClassesPage({ searchParams }) {
  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard/admin/overview" },
    { label: "Manage Classes" },
  ];

  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams?.page || "1");
  const limit = 6;
  const queryParams = `page=${page}&limit=${limit}`;

  const response = await getAllAdminClasses(queryParams);
  const classesData = response?.data || [];
  const totalPages = response?.totalPages || 1;
  const currentPage = response?.currentPage || 1;
  const totalItems = response?.total || 0;

  return (
    <PageContainer
      title="Manage Classes"
      description="View and manage all classes submitted by trainers."
      breadcrumbs={breadcrumbs}
    >
      <ManageClassesTable
        classes={classesData}
        totalPages={totalPages}
        currentPage={currentPage}
        totalItems={totalItems}
      />
    </PageContainer>
  );
}
