import PageContainer from "@/components/dashboard/PageContainer";
import ComingSoon from "@/components/dashboard/ComingSoon";

export default function FavoritesPage() {
  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard/user/overview" },
    { label: "Favorite Classes" }
  ];

  return (
    <PageContainer 
      title="Favorite Classes" 
      description="Your saved and favorite fitness classes."
      breadcrumbs={breadcrumbs}
    >
      <ComingSoon />
    </PageContainer>
  );
}
