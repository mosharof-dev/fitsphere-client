"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MoreVertical,
  Shield,
  ShieldAlert,
  Ban,
  CheckCircle,
  Search,
  User,
  Mail,
  Activity,
  Dumbbell,
} from "lucide-react";
import { toast } from "sonner";
import { updateUserRole, updateUserStatus } from "@/lib/actions/users";
import { format } from "date-fns";
import Image from "next/image";

export default function ManageUsersClient({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUpdating, setIsUpdating] = useState(null);

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleMakeAdmin = async (userId) => {
    try {
      setIsUpdating(userId);
      await updateUserRole(userId, "admin");
      setUsers(
        users.map((u) => (u.id === userId ? { ...u, role: "admin" } : u)),
      );
      toast.success("User promoted to Admin successfully");
    } catch (error) {
      toast.error("Failed to promote user");
      console.error(error);
    } finally {
      setIsUpdating(null);
    }
  };

  const handleToggleBlock = async (userId, currentStatus) => {
    try {
      setIsUpdating(userId);
      const newStatus = currentStatus === "blocked" ? "active" : "blocked";
      await updateUserStatus(userId, newStatus);
      setUsers(
        users.map((u) => (u.id === userId ? { ...u, status: newStatus } : u)),
      );
      toast.success(
        `User ${newStatus === "blocked" ? "blocked" : "unblocked"} successfully`,
      );
    } catch (error) {
      toast.error("Failed to update user status");
      console.error(error);
    } finally {
      setIsUpdating(null);
    }
  };

  return (
    <div className="space-y-6 mt-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#1E293B]/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-center backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <User className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400 font-medium mb-1">
                Total Users
              </p>
              <h3 className="text-2xl font-bold text-white">{users.length}</h3>
            </div>
          </div>
        </div>

        <div className="bg-[#1E293B]/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-center backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
              <Dumbbell className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400 font-medium mb-1">
                Total Trainers
              </p>
              <h3 className="text-2xl font-bold text-white">
                {users.filter((u) => u.role === "trainer").length}
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-[#1E293B]/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-center backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
              <Ban className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400 font-medium mb-1">
                Blocked Users
              </p>
              <h3 className="text-2xl font-bold text-white">
                {users.filter((u) => u.status === "blocked").length}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:max-w-xs group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-[#06B6D4] transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 bg-[#1E293B]/50 border border-white/10 rounded-xl text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-[#06B6D4]/50 focus:ring-1 focus:ring-[#06B6D4]/50 transition-all backdrop-blur-sm"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#1E293B]/30 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-400 uppercase bg-black/20">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wider">User</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Role</th>
                <th className="px-6 py-4 font-semibold tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 font-semibold tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-4 font-semibold tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#06B6D4] to-[#3B82F6] p-[2px]">
                            <div className="w-full h-full rounded-full bg-[#0F172A] flex items-center justify-center overflow-hidden relative">
                              {user.image ? (
                                <Image
                                  src={user.image}
                                  alt={user.name}
                                  fill
                                  sizes="40px"
                                  className="object-cover"
                                />
                              ) : (
                                <User className="w-5 h-5 text-slate-300" />
                              )}
                            </div>
                          </div>
                          <div>
                            <div className="font-medium text-slate-200 group-hover:text-white transition-colors">
                              {user.name}
                            </div>
                            <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                              <Mail className="w-3 h-3" />
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {user.role === "admin" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                            <ShieldAlert className="w-3.5 h-3.5" />
                            Admin
                          </span>
                        )}
                        {user.role === "trainer" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            <Dumbbell className="w-3.5 h-3.5" />
                            Trainer
                          </span>
                        )}
                        {user.role !== "admin" && user.role !== "trainer" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-500/10 text-slate-400 border border-slate-500/20">
                            <Shield className="w-3.5 h-3.5" />
                            User
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${
                            user.status === "blocked"
                              ? "bg-red-500/10 text-red-400 border border-red-500/20"
                              : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          }`}
                        >
                          {user.status === "blocked" ? (
                            <Ban className="w-3.5 h-3.5" />
                          ) : (
                            <Activity className="w-3.5 h-3.5" />
                          )}
                          {user.status === "blocked" ? "Blocked" : "Active"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-400">
                        {user.createdAt
                          ? format(new Date(user.createdAt), "MMM dd, yyyy")
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {user.role !== "admin" && (
                            <button
                              onClick={() => handleMakeAdmin(user.id)}
                              disabled={isUpdating === user.id}
                              className="p-2 bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 hover:text-purple-300 rounded-lg transition-colors border border-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed group/btn relative"
                              title="Make Admin"
                            >
                              <ShieldAlert className="w-4 h-4" />
                              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-xs text-white px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap">
                                Make Admin
                              </span>
                            </button>
                          )}

                          {user.role !== "admin" && (
                            <button
                              onClick={() =>
                                handleToggleBlock(user.id, user.status)
                              }
                              disabled={isUpdating === user.id}
                              className={`p-2 rounded-lg transition-colors border disabled:opacity-50 disabled:cursor-not-allowed group/btn relative ${
                                user.status === "blocked"
                                  ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border-emerald-500/20"
                                  : "bg-red-500/10 text-red-400 hover:bg-red-500/20 border-red-500/20"
                              }`}
                              title={
                                user.status === "blocked"
                                  ? "Unblock User"
                                  : "Block User"
                              }
                            >
                              {user.status === "blocked" ? (
                                <CheckCircle className="w-4 h-4" />
                              ) : (
                                <Ban className="w-4 h-4" />
                              )}
                              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-xs text-white px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap">
                                {user.status === "blocked"
                                  ? "Unblock"
                                  : "Block"}
                              </span>
                            </button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-slate-400"
                    >
                      <div className="flex flex-col items-center justify-center gap-3">
                        <Search className="w-10 h-10 text-slate-600" />
                        <p>No users found matching your search.</p>
                      </div>
                    </td>
                  </motion.tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
