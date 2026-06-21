import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function TrainerLayout({ children }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/");
  }

  if (session.user.role !== "trainer") {
    redirect(`/dashboard/${session.user.role}/overview`);
  }

  return <>{children}</>;
}
