"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateApplicationStatus } from "@/lib/actions/trainerApplications";
import { CheckCircle, XCircle, Clock, SearchX, X } from "lucide-react";
import { toast } from "sonner";

export default function AppliedTrainersTable({ initialApplications }) {
  const router = useRouter();
  const [applications, setApplications] = useState(initialApplications);
  const [activeTab, setActiveTab] = useState("all");
  const [loadingId, setLoadingId] = useState(null);

  // Modal State
  const [selectedApp, setSelectedApp] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [isRejecting, setIsRejecting] = useState(false);

  const handleAction = async (status) => {
    if (status === "rejected" && !feedback.trim()) {
      toast.error("Please provide feedback for rejection.");
      return;
    }

    setLoadingId(selectedApp._id);
    try {
      await updateApplicationStatus(selectedApp._id, status, feedback);
      toast.success(`Application ${status} successfully!`);
      // Optimistically update the list
      setApplications((prev) =>
        prev.map((app) =>
          app._id === selectedApp._id ? { ...app, status } : app
        )
      );
      closeModal();
      router.refresh();
    } catch (err) {
      toast.error(`Failed to ${status.toLowerCase()} application.`);
    } finally {
      setLoadingId(null);
    }
  };

  const openModal = (app) => {
    setSelectedApp(app);
    setFeedback("");
    setIsRejecting(false);
  };

  const closeModal = () => {
    setSelectedApp(null);
    setFeedback("");
    setIsRejecting(false);
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle className="w-3.5 h-3.5" /> Approved
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-red-500/10 text-red-400 border border-red-500/20">
            <XCircle className="w-3.5 h-3.5" /> Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock className="w-3.5 h-3.5" /> Pending
          </span>
        );
    }
  };

  const filteredApplications = applications?.filter(
    (app) => activeTab === "all" || app.status?.toLowerCase() === activeTab
  ) || [];

  const tabOptions = [
    { id: "all", label: "All Applications" },
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

      <div className="rounded-xl border border-slate-800 bg-[#071028] shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[11px] text-slate-400 uppercase tracking-wider bg-[#0b1120] border-b border-white/5">
              <tr>
                <th scope="col" className="px-6 py-5 font-semibold">Applicant Info</th>
                <th scope="col" className="px-6 py-5 font-semibold">Experience</th>
                <th scope="col" className="px-6 py-5 font-semibold">Specialty</th>
                <th scope="col" className="px-6 py-5 font-semibold">Status</th>
                <th scope="col" className="px-6 py-5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredApplications.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-16 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="w-14 h-14 rounded-full bg-[#020617]/50 border border-white/5 flex items-center justify-center">
                        <SearchX className="w-6 h-6 text-slate-500" />
                      </div>
                      <p>No {activeTab !== "all" ? activeTab : ""} applications found.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredApplications.map((app) => (
                  <tr
                    key={app._id}
                    className="hover:bg-white/[0.02] transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-200 mb-1">{app.name}</div>
                      <div className="text-xs text-slate-500">{app.email}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                      <span className="font-semibold text-cyan-400">{app.experience}</span> years
                    </td>
                    <td className="px-6 py-4 text-slate-300">{app.specialty}</td>
                    <td className="px-6 py-4">{getStatusBadge(app.status)}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => openModal(app)}
                        className="inline-flex items-center justify-center h-8 px-4 text-xs font-semibold rounded-lg bg-[#020617] text-slate-300 border border-white/10 hover:border-cyan-500/50 hover:text-cyan-400 transition-all shadow-sm"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Custom Details Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#071028] border border-white/10 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-[#0b1120]">
              <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                Applicant Details
              </h3>
              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <div>
                  <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Name</span>
                  <span className="text-sm text-slate-200 font-medium">{selectedApp.name}</span>
                </div>
                <div>
                  <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Email</span>
                  <span className="text-sm text-slate-200 font-medium truncate">{selectedApp.email}</span>
                </div>
                <div>
                  <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Experience</span>
                  <span className="text-sm text-slate-200 font-medium">{selectedApp.experience} Years</span>
                </div>
                <div>
                  <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Specialty</span>
                  <span className="text-sm text-slate-200 font-medium">{selectedApp.specialty}</span>
                </div>
                <div className="col-span-2">
                  <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Description</span>
                  <div className="text-sm text-slate-300 bg-[#020617]/50 border border-white/5 rounded-xl p-4 leading-relaxed">
                    {selectedApp.description || selectedApp.availableTime || "No description provided."}
                  </div>
                </div>
              </div>

              {/* Conditional Feedback Field */}
              {isRejecting && (
                <div className="pt-4 border-t border-white/5 animate-in slide-in-from-top-2 duration-300">
                  <label htmlFor="feedback" className="block text-[11px] font-bold text-slate-400 tracking-wider mb-2 uppercase">
                    Rejection Feedback <span className="text-red-400 normal-case">*</span>
                  </label>
                  <textarea
                    id="feedback"
                    rows="3"
                    className="w-full h-auto py-3 px-4 rounded-xl border border-white/10 bg-[#020617]/50 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/50 transition-all resize-y"
                    placeholder="Briefly explain why this application is rejected..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-5 bg-[#0b1120] border-t border-white/5 flex justify-end gap-3">
              {isRejecting ? (
                <>
                  <button
                    onClick={() => setIsRejecting(false)}
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-300 bg-transparent border border-white/10 hover:bg-white/5 transition-all"
                    disabled={loadingId === selectedApp._id}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleAction("rejected")}
                    disabled={loadingId === selectedApp._id || !feedback.trim()}
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-500 hover:bg-red-600 disabled:opacity-50 transition-all shadow-[0_0_15px_rgba(239,68,68,0.2)] flex items-center gap-2"
                  >
                    {loadingId === selectedApp._id ? "Rejecting..." : "Confirm Rejection"}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsRejecting(true)}
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleAction("approved")}
                    disabled={loadingId === selectedApp._id}
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600 border border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all"
                  >
                    {loadingId === selectedApp._id ? "Approving..." : "Approve"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
