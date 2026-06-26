import PageContainer from "@/components/dashboard/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  Heart,
  Shield,
  Clock,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { getUserSession } from "@/lib/core/session";
import { getDashboardStats } from "@/lib/actions/dashboard";
import { redirect } from "next/navigation";
import Image from "next/image";
import UserChart from "./UserChart";

export default async function UserOverviewPage() {
  const session = await getUserSession();

  if (!session) {
    redirect("/login");
  }

  const stats = await getDashboardStats("user", session.email);

  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard/user/overview" },
    { label: "Overview" },
  ];

  return (
    <PageContainer
      title="User Dashboard"
      description="Here is your fitness summary for today."
      breadcrumbs={breadcrumbs}
    >
      {/* Top Section: Profile and Application Status */}
      <div className="grid gap-6 mt-6 md:grid-cols-2 mb-8">
        {/* Profile Card */}
        <Card className="bg-[#0b1120]/80 backdrop-blur-md border-white/10 text-white shadow-lg overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <CardHeader className="pb-4 border-b border-white/5 relative z-10">
            <CardTitle className="text-lg font-bold text-white">
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 relative z-10 flex flex-col sm:flex-row items-center gap-5">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)] flex-shrink-0">
              <Image
                src={
                  session.image ||
                  "https://i.ibb.co.com/M5k4WkY/default-avatar.png"
                }
                alt={session.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="text-center sm:text-left flex-1">
              <h2 className="text-xl font-bold text-white mb-1">
                {session.name}
              </h2>
              <p className="text-sm text-slate-400 mb-3">{session.email}</p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wider">
                <Shield className="w-3.5 h-3.5" />
                User
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trainer Application Card */}
        <Card className="bg-[#0b1120]/80 backdrop-blur-md border-white/10 text-white shadow-lg overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <CardHeader className="pb-4 border-b border-white/5 relative z-10">
            <CardTitle className="text-lg font-bold text-white">
              Trainer Application
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 relative z-10 flex flex-col justify-center min-h-[120px]">
            {stats && stats.trainerApplicationStatus !== "not_applied" ? (
              <div className="space-y-4">
                {stats.trainerApplicationStatus === "pending" && (
                  <div className="flex items-center gap-2 text-yellow-400 bg-yellow-400/10 px-4 py-3 rounded-xl border border-yellow-400/20 w-full">
                    <Clock className="w-5 h-5" />
                    <span className="font-semibold text-sm">
                      Pending Review
                    </span>
                  </div>
                )}
                {stats.trainerApplicationStatus === "rejected" && (
                  <>
                    <div className="flex items-center gap-2 text-red-400 bg-red-400/10 px-4 py-3 rounded-xl border border-red-400/20 w-full">
                      <XCircle className="w-5 h-5" />
                      <span className="font-semibold text-sm">
                        Application Rejected
                      </span>
                    </div>
                    {stats.feedback && (
                      <div className="flex gap-2 text-sm text-slate-300 bg-white/5 p-3 rounded-xl border border-white/10 mt-2">
                        <AlertCircle className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                        <span>
                          <span className="font-semibold text-slate-400">
                            Feedback:
                          </span>{" "}
                          {stats.feedback}
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>
            ) : (
              <div className="text-center sm:text-left flex flex-col items-center sm:items-start gap-3">
                <p className="text-slate-400 text-sm">
                  You haven &apos;t applied to be a trainer yet. Share your
                  expertise with our community!
                </p>
                <a
                  href="/dashboard/user/apply"
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors border border-indigo-500"
                >
                  Apply Now
                </a>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-[#0b1120]/80 backdrop-blur-md border-white/10 text-white shadow-lg overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold text-slate-300">
              Total Booked Classes
            </CardTitle>
            <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors duration-300">
              <Calendar className="h-4 w-4 text-blue-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-white">
              {stats ? (
                stats.totalBookedClasses
              ) : (
                <span className="animate-pulse text-slate-600">0</span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Classes you have successfully booked
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#0b1120]/80 backdrop-blur-md border-white/10 text-white shadow-lg overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold text-slate-300">
              Favorite Classes
            </CardTitle>
            <div className="p-2 bg-pink-500/10 rounded-lg group-hover:bg-pink-500/20 transition-colors duration-300">
              <Heart className="h-4 w-4 text-pink-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-white">
              {stats ? (
                stats.totalFavorites
              ) : (
                <span className="animate-pulse text-slate-600">0</span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Classes you have saved
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Chart */}
      {stats && (
        <UserChart stats={stats} />
      )}
    </PageContainer>
  );
}
