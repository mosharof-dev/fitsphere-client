import React from "react";
import PageContainer from "@/components/dashboard/PageContainer";
import TransactionsClient from "@/components/dashboard/TransactionsClient";
import { getAllBookings } from "@/lib/api/bookings";

// Fetch data on the server
async function fetchTransactions() {
  try {
    const res = await getAllBookings();
    return res;
  } catch (error) {
    console.error("Failed to fetch transactions:", error);
    return [];
  }
}

export default async function TransactionsPage() {
  const transactions = await fetchTransactions();

  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard/admin/overview" },
    { label: "Transactions" },
  ];

  return (
    <PageContainer
      title="Transactions"
      description="View financial transactions and revenue history."
      breadcrumbs={breadcrumbs}
    >
      <TransactionsClient transactions={transactions} />
    </PageContainer>
  );
}
