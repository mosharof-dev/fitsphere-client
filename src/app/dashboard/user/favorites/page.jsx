import PageContainer from "@/components/dashboard/PageContainer";
import FavoritesList from "@/components/dashboard/favorites/FavoritesList";

export default function FavoritesPage() {
  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard/user/overview" },
    { label: "Favorite Classes" },
  ];

  return (
    <PageContainer
      title="Favorite Classes"
      description="Your saved and favorite classes and instructors list."
      breadcrumbs={breadcrumbs}
    >
      <FavoritesList />
    </PageContainer>
  );
}
