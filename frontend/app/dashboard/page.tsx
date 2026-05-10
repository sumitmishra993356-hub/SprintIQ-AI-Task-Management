


"use client";

import { useEffect, useState } from "react";

import api from "@/services/api";

import StatCard from "@/components/dashboard/StatCard";
import ProductivityChart from "@/components/dashboard/ProductivityChart";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import AIInsights from "@/components/dashboard/AIInsights";

export default function DashboardPage() {

  const [stats, setStats] = useState<any>(null);

  useEffect(() => {

    fetchDashboard();

  }, []);

  const fetchDashboard = async () => {

    try {

      const { data } = await api.get(
        "/dashboard"
      );

      setStats(data);

    } catch (error) {

      console.log(error);
    }
  };

  if (!stats) {
    return (<div>
      <p>Loading...</p>
      <div className="grid grid-cols-4 gap-5">

        {[1, 2, 3, 4].map((item) => (

          <div
            key={item}
            className="bg-white h-32 rounded-2xl animate-pulse"
          />

        ))}

      </div>
    </div>
    );
  }

  return (
    <div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 hidden md:block">

        <StatCard
          title="Projects"
          value={stats.totalProjects}
        />

        <StatCard
          title="Tasks"
          value={stats.totalTasks}
        />

        <StatCard
          title="Completed"
          value={stats.completedTasks}
        />

        <StatCard
          title="Productivity"
          value={stats.productivityScore}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">

          <ProductivityChart
            completed={stats.completedTasks}
            pending={stats.pendingTasks}
            overdue={stats.overdueTasks}
          />

          <AIInsights insights={stats.insights} />

        </div>

        <div className="mt-6">

          <ActivityFeed
            activities={stats.recentActivities}
          />

        </div>

      </div>

    </div>
  );
}