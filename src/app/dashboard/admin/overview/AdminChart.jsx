"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AdminChart({ stats }) {
  if (!stats) return null;

  // Format the data from the cards into an array for the BarChart
  const data = [
    { name: "Users", value: stats.totalUsers || 0, color: "#06b6d4" },
    { name: "Trainers", value: stats.totalTrainers || 0, color: "#a855f7" },
    { name: "Classes", value: stats.totalClasses || 0, color: "#3b82f6" },
    { name: "Transactions", value: stats.totalBookings || 0, color: "#6366f1" },
    { name: "Forum Posts", value: stats.totalPosts || 0, color: "#f97316" },
    { name: "Pending", value: stats.pendingTrainers || 0, color: "#eab308" },
    { name: "Blocked", value: stats.blockedUsers || 0, color: "#ef4444" },
  ];

  return (
    <Card className="mt-8 bg-[#0b1120]/80 backdrop-blur-md border-white/10 text-white shadow-xl overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none"></div>
      <CardHeader className="relative z-10 pb-2">
        <CardTitle className="text-xl font-bold text-white">Platform Statistics Overview</CardTitle>
        <CardDescription className="text-slate-400">Visual representation of the data from your metric cards</CardDescription>
      </CardHeader>
      <CardContent className="relative z-10 pt-4">
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: -20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="#64748b" 
                tick={{ fill: '#94a3b8', fontSize: 12 }} 
                tickLine={false} 
                axisLine={false} 
                dy={10}
              />
              <YAxis 
                stroke="#64748b" 
                tick={{ fill: '#64748b', fontSize: 12 }} 
                tickLine={false} 
                axisLine={false} 
                dx={-10}
              />
              <Tooltip 
                cursor={{ fill: '#1e293b', opacity: 0.4 }}
                contentStyle={{ 
                  backgroundColor: '#0f172a', 
                  borderColor: '#1e293b',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
                  color: '#fff'
                }}
                itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                formatter={(value, name, props) => [value, props.payload.name]}
              />
              <Bar 
                dataKey="value" 
                radius={[6, 6, 0, 0]}
                barSize={40}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
