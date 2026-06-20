import PageContainer from "@/components/dashboard/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Activity, Receipt, Dumbbell } from "lucide-react";

export default function AdminOverviewPage() {
  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard/admin/overview" },
    { label: "Platform Overview" }
  ];

  return (
    <PageContainer 
      title="Admin Dashboard" 
      description="Monitor platform activity and manage users."
      breadcrumbs={breadcrumbs}
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-[#0b1120]/80 backdrop-blur-md border-white/10 text-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-300">Total Users</CardTitle>
            <div className="p-2 bg-cyan-500/10 rounded-lg">
              <Users className="h-4 w-4 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold animate-pulse text-slate-500">Loading...</div>
            <p className="text-xs text-slate-500 mt-1">Data fetching...</p>
          </CardContent>
        </Card>
        
        <Card className="bg-[#0b1120]/80 backdrop-blur-md border-white/10 text-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-300">Active Trainers</CardTitle>
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Dumbbell className="h-4 w-4 text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold animate-pulse text-slate-500">Loading...</div>
            <p className="text-xs text-slate-500 mt-1">Data fetching...</p>
          </CardContent>
        </Card>

        <Card className="bg-[#0b1120]/80 backdrop-blur-md border-white/10 text-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-300">Monthly Revenue</CardTitle>
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <Receipt className="h-4 w-4 text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold animate-pulse text-slate-500">Loading...</div>
            <p className="text-xs text-slate-500 mt-1">Data fetching...</p>
          </CardContent>
        </Card>

        <Card className="bg-[#0b1120]/80 backdrop-blur-md border-white/10 text-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-300">Active Sessions</CardTitle>
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Activity className="h-4 w-4 text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold animate-pulse text-slate-500">Loading...</div>
            <p className="text-xs text-slate-500 mt-1">Data fetching...</p>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
