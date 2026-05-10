"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  completed: number;
  pending: number;
  overdue: number;
};

export default function ProductivityChart({
  completed,
  pending,
  overdue,
}: Props) {

  const data = [
    {
      name: "Completed",
      value: completed,
    },
    {
      name: "Pending",
      value: pending,
    },
    {
      name: "Overdue",
      value: overdue,
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">

      <h2 className="text-xl font-semibold mb-5">
        Task Analytics
      </h2>

      <div className="h-72">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={data}>

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="value" radius={[8, 8, 0, 0]} />

          </BarChart>

        </ResponsiveContainer>

      </div>
    </div>
  );
}