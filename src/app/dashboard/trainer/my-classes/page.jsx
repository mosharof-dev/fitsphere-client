import PageContainer from "@/components/dashboard/PageContainer";
import { getTrainerMyClasses } from "@/lib/api/classes";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  CalendarDays,
  DollarSign,
  Eye,
  Edit,
  Trash2,
  Users,
  Plus,
  MapPin,
} from "lucide-react";

export default async function MyClassesPage() {
  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard/trainer/overview" },
    { label: "My Classes" },
  ];

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const myClasses = await getTrainerMyClasses(session?.user?.id);

  return (
    <PageContainer breadcrumbs={breadcrumbs}>
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">My Classes</h1>
          <p className="text-gray-400">View and manage all your classes</p>
        </div>
        <Link
          href="/dashboard/trainer/add-class"
          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-6 py-2.5 rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transform hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Class</span>
        </Link>
      </div>

      {myClasses && myClasses.length > 0 ? (
        <div className="flex flex-col gap-6">
          {myClasses.map((classItem) => (
            <div
              key={classItem._id}
              className="bg-[#0B1120]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] hover:border-cyan-500/30 transition-all duration-500 group flex flex-col md:flex-row"
            >
              {/* Image Section */}
              <div className="relative h-60 md:h-auto md:w-2/5 lg:w-1/3 overflow-hidden bg-muted shrink-0">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120]/80 via-transparent to-transparent z-10 md:hidden" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0B1120] z-10 hidden md:block" />
                {classItem.featured_image_url ? (
                  <Image
                    src={classItem.featured_image_url}
                    alt={classItem.class_name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-muted-foreground">No image</span>
                  </div>
                )}

                {/* Badges Overlay */}
                <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
                  <span className="bg-cyan-500 text-black text-xs px-3 py-1.5 rounded-full font-bold tracking-wide shadow-lg">
                    {classItem.category}
                  </span>
                </div>

                <div className="absolute top-4 right-4 z-20 md:right-auto md:left-4 md:top-14">
                  <span
                    className={`text-xs px-3 py-1.5 rounded-full font-bold tracking-wide shadow-lg ${
                      classItem.status === "approved"
                        ? "bg-emerald-500 text-black"
                        : classItem.status === "pending"
                          ? "bg-amber-500 text-black"
                          : "bg-rose-500 text-white"
                    }`}
                  >
                    {classItem.status?.toUpperCase() || "UNKNOWN"}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 md:p-8 flex-grow flex flex-col relative z-20 bg-[#0B1120]">
                <div className="flex justify-between items-start mb-3 gap-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors leading-tight">
                    {classItem.class_name}
                  </h3>
                  <div className="flex items-center text-gray-300 text-sm bg-white/5 px-3 py-1.5 rounded-full border border-white/10 shrink-0">
                    <MapPin className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
                    <span>{classItem.difficulty}</span>
                  </div>
                </div>

                <p className="text-sm md:text-base text-gray-400 line-clamp-3 mb-6 leading-relaxed">
                  {classItem.description}
                </p>

                {/* Info Pills */}
                <div className="flex flex-wrap gap-3 mb-8">
                  <span className="flex items-center text-xs md:text-sm text-cyan-50 bg-cyan-500/10 px-3 py-1.5 rounded-lg border border-cyan-500/20">
                    <Clock className="w-4 h-4 mr-2 text-cyan-400" />
                    {classItem.time} • {classItem.duration}
                  </span>
                  <span className="flex items-center text-xs md:text-sm text-cyan-50 bg-cyan-500/10 px-3 py-1.5 rounded-lg border border-cyan-500/20">
                    <CalendarDays className="w-4 h-4 mr-2 text-cyan-400" />
                    {classItem.days?.join(", ") || "No days"}
                  </span>
                  <span className="flex items-center text-xs md:text-sm text-cyan-50 bg-cyan-500/10 px-3 py-1.5 rounded-lg border border-cyan-500/20">
                    <Users className="w-4 h-4 mr-2 text-cyan-400" />
                    {classItem.bookingCount || 0} Bookings
                  </span>
                </div>

                {/* Bottom Actions Row */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mt-auto pt-5 border-t border-white/10 gap-6 sm:gap-4">
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">
                      PRICE
                    </p>
                    <div className="flex items-baseline text-cyan-400 font-extrabold">
                      <DollarSign className="w-6 h-6 -ml-1.5" />
                      <span className="text-3xl md:text-4xl">
                        {classItem.price}
                      </span>
                      <span className="text-sm text-gray-500 font-medium ml-1">
                        /class
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full sm:w-auto">
                    <Link
                      href={`/dashboard/trainer/my-classes/${classItem._id}`}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 text-gray-300 hover:bg-cyan-500 hover:text-black transition-all duration-300 font-semibold text-sm border border-transparent hover:border-cyan-400"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </Link>
                    <Link
                      href={`/dashboard/trainer/my-classes/edit/${classItem._id}`}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 text-gray-300 hover:bg-emerald-500 hover:text-black transition-all duration-300 font-semibold text-sm border border-transparent hover:border-emerald-400"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </Link>
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 text-gray-300 hover:bg-rose-500 hover:text-white transition-all duration-300 font-semibold text-sm border border-transparent hover:border-rose-400">
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 px-4 text-center border border-dashed border-white/10 rounded-3xl bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm">
          <div className="w-24 h-24 bg-cyan-500/10 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(6,182,212,0.15)] relative">
            <div className="absolute inset-0 border border-cyan-500/20 rounded-full animate-ping opacity-20"></div>
            <CalendarDays className="w-12 h-12 text-cyan-400" />
          </div>
          <h3 className="text-3xl font-extrabold text-white mb-3">
            No Classes Found
          </h3>
          <p className="text-gray-400 max-w-md mb-10 text-lg">
            You haven&apos;t created any classes yet. Start sharing your
            expertise by creating your first fitness class.
          </p>
          <Link
            href="/dashboard/trainer/add-class"
            className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] transform hover:-translate-y-1"
          >
            <Plus className="w-6 h-6" />
            <span>Create New Class</span>
          </Link>
        </div>
      )}
    </PageContainer>
  );
}
