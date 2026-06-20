import PageContainer from "@/components/dashboard/PageContainer";
import ComingSoon from "@/components/dashboard/ComingSoon";

export default function TransactionsPage() {
  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard/admin/overview" },
    { label: "Transactions" }
  ];

  return (
    <PageContainer 
      title="Transactions" 
      description="View financial transactions and revenue."
      breadcrumbs={breadcrumbs}
    >
      <ComingSoon />
    </PageContainer>
  );
}
