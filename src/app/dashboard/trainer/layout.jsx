import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function TrainerLayout({ children }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/unauthorized");
  }

  if (session.user.role !== "trainer") {
    redirect("/forbidden");
  }

  return <>{children}</>;
}
