import PageContainer from "@/components/dashboard/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Star, TrendingUp } from "lucide-react";

export default function TrainerOverviewPage() {
  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard/trainer/overview" },
    { label: "Overview" }
  ];

  return (
    <PageContainer 
      title="Trainer Dashboard" 
      description="Overview of your classes and performance."
      breadcrumbs={breadcrumbs}
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-[#0b1120]/80 backdrop-blur-md border-white/10 text-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-300">Total Students</CardTitle>
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
            <CardTitle className="text-sm font-semibold text-slate-300">Average Rating</CardTitle>
            <div className="p-2 bg-yellow-500/10 rounded-lg">
              <Star className="h-4 w-4 text-yellow-400" />
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
              <TrendingUp className="h-4 w-4 text-emerald-400" />
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
