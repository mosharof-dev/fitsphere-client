import PageContainer from "@/components/dashboard/PageContainer";
import ManageUsersClient from "./ManageUsersClient";
import { getUserList } from "@/lib/api/users";

export default async function ManageUsersPage() {
  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard/admin/overview" },
    { label: "Manage Users" },
  ];

  const users = await getUserList();
  
  // Need to handle potential better-auth data structure.
  // Better Auth listUsers returns { users: [...] }
  const userList = Array.isArray(users) ? users : (users?.users || []);
  
  // We'll pass plain objects to the client.
  const serializedUsers = userList.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    role: user.role || "user",
    status: user.status || "active",
    createdAt: user.createdAt?.toISOString?.() || user.createdAt || null,
  })) || [];

  return (
    <PageContainer
      title="Manage Users"
      description="View and manage all registered users."
      breadcrumbs={breadcrumbs}
    >
      <ManageUsersClient initialUsers={serializedUsers} />
    </PageContainer>
  );
}
