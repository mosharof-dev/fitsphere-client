import PageContainer from "@/components/dashboard/PageContainer";
import { getAllTrainerApplications } from "@/lib/actions/trainerApplications";
import AppliedTrainersTable from "./AppliedTrainersTable";

export const metadata = {
  title: "Applied Trainers",
  description: "Review and approve trainer applications.",
};

export default async function AppliedTrainersPage() {
  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard/admin/overview" },
    { label: "Applied Trainers" },
  ];

  let applications = [];
  try {
    applications = await getAllTrainerApplications() || [];
  } catch (error) {
    console.error("Failed to fetch applications:", error);
  }

  return (
    <PageContainer
      title="Applied Trainers"
      description="Review and approve trainer applications."
      breadcrumbs={breadcrumbs}
    >
      <AppliedTrainersTable initialApplications={applications} />
    </PageContainer>
  );
}
