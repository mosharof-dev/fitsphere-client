import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function UserLayout({ children }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/unauthorized");
  }

  if (session.user.role !== "user") {
    redirect("/forbidden");
  }

  return <>{children}</>;
}
