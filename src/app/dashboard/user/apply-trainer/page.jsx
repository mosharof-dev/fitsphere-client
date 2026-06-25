import PageContainer from "@/components/dashboard/PageContainer";
import ApplyTrainerContent from "./ApplyTrainerContent";
import { getUserSession } from "@/lib/core/session";
import { getUserApplication } from "@/lib/actions/trainerApplications";

export const metadata = {
  title: "Apply As Trainer",
  description: "Apply to become a trainer on FitSphere",
};

export default async function ApplyTrainerPage() {
  const session = await getUserSession();
  
  let existingApplication = null;
  if (session?.id) {
    existingApplication = await getUserApplication(session.id);
  }

  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard/user/overview" },
    { label: "Apply As Trainer" }
  ];

  return (
    <PageContainer breadcrumbs={breadcrumbs}>
      <ApplyTrainerContent existingApplication={existingApplication} />
    </PageContainer>
  );
}
