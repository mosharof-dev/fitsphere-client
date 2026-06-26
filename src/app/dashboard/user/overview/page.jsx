import PageContainer from "@/components/dashboard/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Heart, Shield, Clock, XCircle, AlertCircle } from "lucide-react";
import { getUserSession } from "@/lib/core/session";
import { getDashboardStats } from "@/lib/actions/dashboard";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function UserOverviewPage() {
  const session = await getUserSession();
  
  if (!session) {
    redirect("/login");
  }

  const stats = await getDashboardStats("user", session.email);

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
      {/* Profile Section */}
      <div className="mb-8 p-6 rounded-3xl bg-[#0b1120]/80 backdrop-blur-md border border-white/10 shadow-lg flex flex-col md:flex-row items-center gap-6">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)] flex-shrink-0">
          <Image 
            src={session.image || "https://i.ibb.co.com/M5k4WkY/default-avatar.png"} 
            alt={session.name} 
            fill 
            className="object-cover"
          />
        </div>
        <div className="text-center md:text-left flex-1">
          <h2 className="text-2xl font-bold text-white">{session.name}</h2>
          <p className="text-slate-400">{session.email}</p>
          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" />
            User
          </div>
        </div>

        {/* Trainer Application Status */}
        {stats && stats.trainerApplicationStatus !== "not_applied" && (
          <div className="bg-[#020617] p-4 rounded-2xl border border-white/5 min-w-[250px]">
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">Trainer Application</p>
            {stats.trainerApplicationStatus === "pending" && (
              <div className="flex items-center gap-2 text-yellow-400 bg-yellow-400/10 px-3 py-2 rounded-lg border border-yellow-400/20">
                <Clock className="w-4 h-4" />
                <span className="font-medium text-sm">Pending Review</span>
              </div>
            )}
            {stats.trainerApplicationStatus === "rejected" && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-red-400 bg-red-400/10 px-3 py-2 rounded-lg border border-red-400/20">
                  <XCircle className="w-4 h-4" />
                  <span className="font-medium text-sm">Application Rejected</span>
                </div>
                {stats.feedback && (
                  <div className="flex gap-2 text-xs text-slate-300 bg-white/5 p-2 rounded-lg border border-white/10 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                    <span>{stats.feedback}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-[#0b1120]/80 backdrop-blur-md border-white/10 text-white shadow-lg overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold text-slate-300">Total Booked Classes</CardTitle>
            <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors duration-300">
              <Calendar className="h-4 w-4 text-blue-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-white">
              {stats ? stats.totalBookedClasses : <span className="animate-pulse text-slate-600">0</span>}
            </div>
            <p className="text-xs text-slate-400 mt-1">Classes you have successfully booked</p>
          </CardContent>
        </Card>

        <Card className="bg-[#0b1120]/80 backdrop-blur-md border-white/10 text-white shadow-lg overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold text-slate-300">Favorite Classes</CardTitle>
            <div className="p-2 bg-pink-500/10 rounded-lg group-hover:bg-pink-500/20 transition-colors duration-300">
              <Heart className="h-4 w-4 text-pink-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-white">
              {stats ? stats.totalFavorites : <span className="animate-pulse text-slate-600">0</span>}
            </div>
            <p className="text-xs text-slate-400 mt-1">Classes you have saved</p>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
