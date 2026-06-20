import PageContainer from "@/components/dashboard/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Calendar, Heart } from "lucide-react";

export default function UserOverviewPage() {
  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard/user/overview" },
    { label: "Overview" }
  ];

  return (
    <PageContainer 
      title="User Dashboard" 
      description="Here is your fitness summary for today."
      breadcrumbs={breadcrumbs}
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-[#0b1120]/80 backdrop-blur-md border-white/10 text-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-300">Upcoming Classes</CardTitle>
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Calendar className="h-4 w-4 text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold animate-pulse text-slate-500">Loading...</div>
            <p className="text-xs text-slate-500 mt-1">Data fetching...</p>
          </CardContent>
        </Card>

        <Card className="bg-[#0b1120]/80 backdrop-blur-md border-white/10 text-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-300">Favorite Classes</CardTitle>
            <div className="p-2 bg-pink-500/10 rounded-lg">
              <Heart className="h-4 w-4 text-pink-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold animate-pulse text-slate-500">Loading...</div>
            <p className="text-xs text-slate-500 mt-1">Data fetching...</p>
          </CardContent>
        </Card>

        <Card className="bg-[#0b1120]/80 backdrop-blur-md border-white/10 text-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-300">Activity Score</CardTitle>
            <div className="p-2 bg-cyan-500/10 rounded-lg">
              <Activity className="h-4 w-4 text-cyan-400" />
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
