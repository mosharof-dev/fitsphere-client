import PageContainer from "@/components/dashboard/PageContainer";
import BookedClasses from "./BookedClasses";

const breadcrumbs = [
  { label: "Dashboard", href: "/dashboard/user/overview" },
  { label: "Booked Classes" },
];

const BookedClassesPage = () => {
  return (
    <PageContainer breadcrumbs={breadcrumbs}>
      <BookedClasses />
    </PageContainer>
  );
};

export default BookedClassesPage;
