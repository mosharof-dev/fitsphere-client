import PageContainer from "@/components/dashboard/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Dumbbell, ShieldCheck } from "lucide-react";
import { getUserSession } from "@/lib/core/session";
import { getDashboardStats } from "@/lib/actions/dashboard";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function TrainerOverviewPage() {
  const session = await getUserSession();
  
  if (!session) {
    redirect("/login");
  }

  const stats = await getDashboardStats("trainer", session.email);

  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard/trainer/overview" },
    { label: "Overview" }
  ];

  return (
    <PageContainer 
      title="Trainer Dashboard" 
      description="Overview of your classes and student engagement."
      breadcrumbs={breadcrumbs}
    >
      {/* Profile Section */}
      <div className="mb-8 p-6 rounded-3xl bg-[#0b1120]/80 backdrop-blur-md border border-white/10 shadow-lg flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] flex-shrink-0 z-10">
          <Image 
            src={session.image || "https://i.ibb.co.com/M5k4WkY/default-avatar.png"} 
            alt={session.name} 
            fill 
            className="object-cover"
          />
        </div>
        <div className="text-center md:text-left flex-1 z-10">
          <h2 className="text-2xl font-bold text-white">{session.name}</h2>
          <p className="text-slate-400">{session.email}</p>
          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            Trainer
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-[#0b1120]/80 backdrop-blur-md border-white/10 text-white shadow-lg overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold text-slate-300">Total Classes Created</CardTitle>
            <div className="p-2 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-colors duration-300">
              <Dumbbell className="h-4 w-4 text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-white">
              {stats ? stats.totalClassesCreated : <span className="animate-pulse text-slate-600">0</span>}
            </div>
            <p className="text-xs text-slate-400 mt-1">Classes you have published</p>
          </CardContent>
        </Card>

        <Card className="bg-[#0b1120]/80 backdrop-blur-md border-white/10 text-white shadow-lg overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold text-slate-300">Total Enrolled Students</CardTitle>
            <div className="p-2 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500/20 transition-colors duration-300">
              <Users className="h-4 w-4 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-white">
              {stats ? stats.totalStudentsEnrolled : <span className="animate-pulse text-slate-600">0</span>}
            </div>
            <p className="text-xs text-slate-400 mt-1">Total bookings across all your classes</p>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
