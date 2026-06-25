"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { getUserBookings } from "@/lib/api/bookings";
import Link from "next/link";
import { Calendar, Clock, CreditCard } from "lucide-react";

export default function BookedClasses() {
  const { data: session, isPending } = useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (session?.user?.email) {
        try {
          const data = await getUserBookings(session.user.email);
          setBookings(data);
        } catch (error) {
          console.error("Error fetching bookings:", error);
        } finally {
          setLoading(false);
        }
      } else if (!isPending) {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [session, isPending]);

  if (isPending || loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#06B6D4]/30 border-t-[#06B6D4] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="bg-[#0f172a] p-8 rounded-2xl border border-white/10 text-center">
        <p className="text-slate-400">
          Please login to view your booked classes.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">All booked Classes</h2>

        <span className="px-4 py-1.5 rounded-full bg-[#06B6D4]/10 text-[#06B6D4] text-sm font-medium border border-[#06B6D4]/20">
          Total: {bookings.length}
        </span>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-[#0f172a] p-12 rounded-3xl border border-white/10 text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
            <Calendar className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            No Classes Booked Yet
          </h3>
          <p className="text-slate-400 mb-6 max-w-sm mx-auto">
            You haven&apos;t enrolled in any classes. Browse our classes and
            start your fitness journey today.
          </p>
          <Link
            href="/classes"
            className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium transition-colors"
          >
            Explore Classes
          </Link>
        </div>
      ) : (
        <div className="bg-[#0f172a] rounded-3xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="px-6 py-4 text-sm font-semibold text-slate-400">
                    Class Info
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-400">
                    Schedule
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-400">
                    Status
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-400 text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {bookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-white font-bold mb-1">
                          {booking.className}
                        </p>
                        <p className="text-sm text-slate-400 flex items-center gap-1">
                          Instructor: {booking.trainerName}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-300">
                        <Clock className="w-4 h-4 text-[#06B6D4]" />
                        <span className="text-sm">{booking.schedule}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                        <span className="text-sm font-medium text-emerald-400">
                          Paid
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/classes/${booking.classId}`}
                        className="inline-block px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-white font-medium transition-colors"
                      >
                        View Class
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
