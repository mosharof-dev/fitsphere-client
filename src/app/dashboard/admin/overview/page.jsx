import PageContainer from "@/components/dashboard/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Activity,
  Receipt,
  Dumbbell,
  ShieldAlert,
  Ban,
  MessageSquare,
  DollarSign,
  UserPlus,
} from "lucide-react";
import { getUserSession } from "@/lib/core/session";
import { getDashboardStats } from "@/lib/actions/dashboard";
import { redirect } from "next/navigation";
import Image from "next/image";
import AdminChart from "./AdminChart";

export default async function AdminOverviewPage() {
  const session = await getUserSession();

  if (!session) {
    redirect("/login");
  }

  const stats = await getDashboardStats("admin", session.email);

  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard/admin/overview" },
    { label: "Platform Overview" },
  ];

  return (
    <PageContainer
      title="Admin Dashboard"
      description="Monitor platform activity, users, and overall revenue."
      breadcrumbs={breadcrumbs}
    >
      {/* Profile Section */}
      <div className="mb-8 mt-4 p-6 rounded-3xl bg-[#0b1120]/80 backdrop-blur-md border border-white/10 shadow-lg flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)] flex-shrink-0 z-10">
          <Image
            src={
              session.image || "https://i.ibb.co.com/M5k4WkY/default-avatar.png"
            }
            alt={session.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="text-center md:text-left flex-1 z-10">
          <h2 className="text-2xl font-bold text-white">{session.name}</h2>
          <p className="text-slate-400">{session.email}</p>
          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5" />
            Admin
          </div>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Card className="bg-[#0b1120]/80 backdrop-blur-md border-white/10 text-white shadow-lg overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold text-slate-300">
              Total Users
            </CardTitle>
            <div className="p-2 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500/20 transition-colors duration-300">
              <Users className="h-4 w-4 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-white">
              {stats ? (
                stats.totalUsers
              ) : (
                <span className="animate-pulse text-slate-600">0</span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Total registered accounts
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#0b1120]/80 backdrop-blur-md border-white/10 text-white shadow-lg overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold text-slate-300">
              Active Trainers
            </CardTitle>
            <div className="p-2 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors duration-300">
              <Dumbbell className="h-4 w-4 text-purple-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-white">
              {stats ? (
                stats.totalTrainers
              ) : (
                <span className="animate-pulse text-slate-600">0</span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Approved trainers on platform
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#0b1120]/80 backdrop-blur-md border-white/10 text-white shadow-lg overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold text-slate-300">
              Blocked Users
            </CardTitle>
            <div className="p-2 bg-red-500/10 rounded-lg group-hover:bg-red-500/20 transition-colors duration-300">
              <Ban className="h-4 w-4 text-red-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-white">
              {stats ? (
                stats.blockedUsers
              ) : (
                <span className="animate-pulse text-slate-600">0</span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Accounts restricted by admin
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#0b1120]/80 backdrop-blur-md border-white/10 text-white shadow-lg overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold text-slate-300">
              Total Revenue
            </CardTitle>
            <div className="p-2 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-colors duration-300">
              <DollarSign className="h-4 w-4 text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-emerald-400">
              {stats ? (
                `$${stats.totalRevenue?.toLocaleString()}`
              ) : (
                <span className="animate-pulse text-slate-600">$0</span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Total revenue generated
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#0b1120]/80 backdrop-blur-md border-white/10 text-white shadow-lg overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold text-slate-300">
              Total Classes
            </CardTitle>
            <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors duration-300">
              <Activity className="h-4 w-4 text-blue-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-white">
              {stats ? (
                stats.totalClasses
              ) : (
                <span className="animate-pulse text-slate-600">0</span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Total classes submitted
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#0b1120]/80 backdrop-blur-md border-white/10 text-white shadow-lg overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold text-slate-300">
              Total Transactions
            </CardTitle>
            <div className="p-2 bg-indigo-500/10 rounded-lg group-hover:bg-indigo-500/20 transition-colors duration-300">
              <Receipt className="h-4 w-4 text-indigo-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-white">
              {stats ? (
                stats.totalBookings
              ) : (
                <span className="animate-pulse text-slate-600">0</span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Total successful payments
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#0b1120]/80 backdrop-blur-md border-white/10 text-white shadow-lg overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold text-slate-300">
              Forum Posts
            </CardTitle>
            <div className="p-2 bg-orange-500/10 rounded-lg group-hover:bg-orange-500/20 transition-colors duration-300">
              <MessageSquare className="h-4 w-4 text-orange-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-white">
              {stats ? (
                stats.totalPosts
              ) : (
                <span className="animate-pulse text-slate-600">0</span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Total community discussions
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#0b1120]/80 backdrop-blur-md border-white/10 text-white shadow-lg overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold text-slate-300">
              Pending Applications
            </CardTitle>
            <div className="p-2 bg-yellow-500/10 rounded-lg group-hover:bg-yellow-500/20 transition-colors duration-300">
              <UserPlus className="h-4 w-4 text-yellow-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-white">
              {stats ? (
                stats.pendingTrainers
              ) : (
                <span className="animate-pulse text-slate-600">0</span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Trainers awaiting approval
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Chart */}
      {stats && (
        <AdminChart stats={stats} />
      )}
    </PageContainer>
  );
}
