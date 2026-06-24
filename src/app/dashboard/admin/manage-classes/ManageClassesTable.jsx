"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { updateClassStatus, deleteClass } from "@/lib/actions/classes";
import ManageClassesPagination from "./ManageClassesPagination";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import DeleteConfirmDialog from "@/components/ui/DeleteConfirmDialog";

export default function ManageClassesTable({
  classes,
  totalPages,
  currentPage,
  totalItems,
}) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  const handleStatusChange = async (id, newStatus) => {
    setLoadingId(id);
    try {
      await updateClassStatus(id, newStatus);
      router.refresh();
    } catch (error) {
      console.error("Failed to update status", error);
    } finally {
      setLoadingId(null);
    }
  };

  const executeDelete = async (id) => {
    setLoadingId(id);
    try {
      await deleteClass(id);
      router.refresh();
    } catch (error) {
      console.error("Failed to delete class", error);
    } finally {
      setLoadingId(null);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle className="w-3.5 h-3.5" />
            Approved
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
            <XCircle className="w-3.5 h-3.5" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock className="w-3.5 h-3.5" />
            Pending
          </span>
        );
    }
  };

  const filteredClasses =
    classes?.filter((cls) => activeTab === "all" || cls.status === activeTab) ||
    [];

  const tabOptions = [
    { id: "all", label: "All Classes" },
    { id: "pending", label: "Pending" },
    { id: "approved", label: "Approved" },
    { id: "rejected", label: "Rejected" },
  ];

  return (
    <div className="w-full space-y-6 mt-6">
      <div className="flex w-full flex-col">
        <div className="flex w-full border-b border-slate-800 gap-6">
          {tabOptions.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
                activeTab === tab.id
                  ? "border-cyan-500 text-cyan-400"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/40 shadow-xl overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[11px] text-slate-400 uppercase tracking-wider bg-slate-900/80 border-b border-slate-800">
              <tr>
                <th scope="col" className="px-6 py-5 font-semibold">
                  Class info
                </th>
                <th scope="col" className="px-6 py-5 font-semibold">
                  Trainer
                </th>
                <th scope="col" className="px-6 py-5 font-semibold">
                  Status
                </th>
                <th scope="col" className="px-6 py-5 font-semibold text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredClasses.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-12 text-center text-slate-400"
                  >
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-slate-800/50 flex items-center justify-center">
                        <Clock className="w-6 h-6 text-slate-500" />
                      </div>
                      <p>No classes found.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredClasses.map((cls) => (
                  <tr
                    key={cls._id}
                    className="hover:bg-slate-800/30 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-14 w-14 relative rounded-lg overflow-hidden bg-slate-800 shrink-0 border border-slate-700/50 shadow-sm">
                          <Image
                            src={
                              cls.featured_image_url ||
                              "https://placehold.co/100x100"
                            }
                            alt={cls.class_name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-slate-200 mb-1 line-clamp-1">
                            {cls.class_name}
                          </div>
                          <div className="text-xs text-slate-400">
                            {cls.category} • {cls.duration}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-slate-300">
                        {cls.trainerName || "Unknown"}
                      </div>
                      <div className="text-xs text-slate-500">
                        {cls.trainerEmail}
                      </div>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(cls.status)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 px-3 text-xs bg-emerald-500/5 text-emerald-400 hover:bg-emerald-500 hover:text-white border-emerald-500/20 hover:border-emerald-500 transition-all"
                          disabled={
                            cls.status === "approved" || loadingId === cls._id
                          }
                          onClick={() =>
                            handleStatusChange(cls._id, "approved")
                          }
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 px-3 text-xs bg-red-500/5 text-red-400 hover:bg-red-500 hover:text-white border-red-500/20 hover:border-red-500 transition-all"
                          disabled={
                            cls.status === "rejected" || loadingId === cls._id
                          }
                          onClick={() =>
                            handleStatusChange(cls._id, "rejected")
                          }
                        >
                          Reject
                        </Button>
                        <div className="w-px h-4 bg-slate-700 mx-1"></div>
                        <DeleteConfirmDialog
                          isLoading={loadingId === cls._id}
                          onConfirm={() => executeDelete(cls._id)}
                          title="Delete Class?"
                          description="Are you sure you want to delete this class? This action cannot be undone. All data related to this class will be permanently removed."
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ManageClassesPagination
        totalPages={totalPages}
        currentPage={currentPage}
        totalItems={totalItems}
      />
    </div>
  );
}
