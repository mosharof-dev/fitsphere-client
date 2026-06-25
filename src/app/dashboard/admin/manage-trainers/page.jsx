import PageContainer from "@/components/dashboard/PageContainer";
import ManageTrainersClient from "./ManageTrainersClient";
import { getUserList } from "@/lib/api/users";

export default async function ManageTrainersPage() {
  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard/admin/overview" },
    { label: "Manage Trainers" },
  ];

  let trainers = [];
  try {
    const usersResponse = await getUserList();
    const userList = Array.isArray(usersResponse) ? usersResponse : (usersResponse?.users || []);
    
    trainers = userList
      .filter((user) => user.role === "trainer")
      .map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role || "user",
        status: user.status || "active",
        createdAt: user.createdAt?.toISOString?.() || user.createdAt || null,
      }));
  } catch (error) {
    console.error("Failed to fetch trainers:", error);
  }

  return (
    <PageContainer
      title="Manage Trainers"
      description="View and manage trainer accounts. You can demote them or block them from accessing certain features."
      breadcrumbs={breadcrumbs}
    >
      <ManageTrainersClient initialTrainers={trainers} />
    </PageContainer>
  );
}
