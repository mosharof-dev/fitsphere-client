import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function UserLayout({ children }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/");
  }

  if (session.user.role !== "user") {
    redirect(`/dashboard/${session.user.role}/overview`);
  }

  return <>{children}</>;
}
