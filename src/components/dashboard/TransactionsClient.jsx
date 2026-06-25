"use client";

import React, { useMemo } from "react";
import { DollarSign, Search, Filter } from "lucide-react";
import { format } from "date-fns";

export default function TransactionsClient({ transactions = [] }) {
  const totalRevenue = useMemo(() => {
    return transactions.reduce((sum, item) => {
      return sum + (Number(item.price) || 0);
    }, 0);
  }, [transactions]);

  return (
    <div className="space-y-6 mt-4">
      {/* Summary Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tile 1: Total Revenue */}
        <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 relative overflow-hidden group hover:border-[#06B6D4]/50 transition-colors">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#06B6D4] opacity-5 blur-[50px] rounded-full group-hover:opacity-20 transition-opacity"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 bg-gradient-to-br from-[#06B6D4] to-[#3B82F6] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#06B6D4]/20">
              <DollarSign className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">
                Total Revenue
              </p>
              <h3 className="text-3xl font-extrabold text-white">
                ${totalRevenue.toLocaleString()}
              </h3>
            </div>
          </div>
        </div>

        {/* Tile 2: Total Transactions */}
        <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 relative overflow-hidden group hover:border-[#3B82F6]/50 transition-colors">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#3B82F6] opacity-5 blur-[50px] rounded-full group-hover:opacity-20 transition-opacity"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#3B82F6]/20">
              <svg
                className="w-7 h-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">
                Total Transactions
              </p>
              <h3 className="text-3xl font-extrabold text-white">
                {transactions.length}
              </h3>
            </div>
          </div>
        </div>

        {/* Tile 3: Average Value */}
        <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 relative overflow-hidden group hover:border-[#8B5CF6]/50 transition-colors">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#8B5CF6] opacity-5 blur-[50px] rounded-full group-hover:opacity-20 transition-opacity"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 bg-gradient-to-br from-[#8B5CF6] to-[#D946EF] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#8B5CF6]/20">
              <svg
                className="w-7 h-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">
                Avg. Transaction
              </p>
              <h3 className="text-3xl font-extrabold text-white">
                $
                {transactions.length > 0
                  ? (totalRevenue / transactions.length).toFixed(2)
                  : "0.00"}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-white">
            Recent Transactions
          </h2>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search email..."
                className="bg-[#020617] border border-white/10 text-white text-sm rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-[#06B6D4]/50 transition-colors w-full sm:w-64"
              />
            </div>
            <button className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-[#020617]/50 text-slate-400 text-sm">
                <th className="font-medium p-6">User Email</th>
                <th className="font-medium p-6">Amount</th>
                <th className="font-medium p-6">Date</th>
                <th className="font-medium p-6">Transaction ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-12 text-center text-slate-400">
                    No transactions found.
                  </td>
                </tr>
              ) : (
                transactions.map((tx) => (
                  <tr
                    key={tx._id}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#06B6D4]/20 to-[#3B82F6]/20 border border-white/10 flex items-center justify-center text-[#06B6D4] font-bold">
                          {tx.userName?.charAt(0).toUpperCase() ||
                            tx.userEmail?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-white">
                            {tx.userName || "User"}
                          </p>
                          <p className="text-sm text-slate-400">
                            {tx.userEmail}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#06B6D4]/10 text-[#06B6D4] font-semibold text-sm border border-[#06B6D4]/20">
                        ${tx.price}
                      </span>
                    </td>
                    <td className="p-6">
                      <p className="text-white">
                        {tx.createdAt
                          ? format(new Date(tx.createdAt), "MMM dd, yyyy")
                          : "N/A"}
                      </p>
                      <p className="text-xs text-slate-400">
                        {tx.createdAt
                          ? format(new Date(tx.createdAt), "hh:mm a")
                          : ""}
                      </p>
                    </td>
                    <td className="p-6">
                      <span
                        className="font-mono text-xs text-slate-300 bg-white/5 px-2 py-1 rounded border border-white/10"
                        title={tx.transactionId}
                      >
                        {tx.transactionId
                          ? tx.transactionId.length > 25
                            ? `${tx.transactionId.substring(0, 25)}...`
                            : tx.transactionId
                          : "N/A"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
