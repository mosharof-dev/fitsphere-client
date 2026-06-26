"use client";

import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const COLORS = ['#06b6d4', '#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899', '#f43f5e'];

export default function TrainerChart({ data }) {
  // If no data or empty, we can show a placeholder or nothing
  if (!data || data.length === 0) {
    return (
      <Card className="mt-8 bg-[#0b1120]/80 backdrop-blur-md border-white/10 text-white shadow-xl overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent pointer-events-none"></div>
        <CardHeader className="relative z-10 pb-2">
          <CardTitle className="text-xl font-bold text-white">Student Enrollments</CardTitle>
          <CardDescription className="text-slate-400">Distribution of students across your classes</CardDescription>
        </CardHeader>
        <CardContent className="relative z-10 pt-4 flex items-center justify-center h-[350px]">
          <p className="text-slate-400">No enrollments yet. Share your classes to get students!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-8 bg-[#0b1120]/80 backdrop-blur-md border-white/10 text-white shadow-xl overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none"></div>
      <CardHeader className="relative z-10 pb-2">
        <CardTitle className="text-xl font-bold text-white">Student Enrollments</CardTitle>
        <CardDescription className="text-slate-400">Distribution of students across your classes</CardDescription>
      </CardHeader>
      <CardContent className="relative z-10 pt-4">
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0f172a', 
                  borderColor: '#1e293b',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
                  color: '#fff'
                }}
                itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                formatter={(value, name) => [`${value} Students`, name]}
              />
              <Legend verticalAlign="bottom" height={36} wrapperStyle={{ color: '#cbd5e1' }}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
