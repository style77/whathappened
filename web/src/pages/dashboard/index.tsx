import React from "react";
import { Layout } from "../../components/dashboard/Layout";
import { DashboardStatsCard } from "../../components/dashboard/Stats";
import { BugAntIcon } from "@heroicons/react/24/outline";

const testStats = [
  { title: "Crash Reports", formattedValue: "1,234", icon: <BugAntIcon />, description: "↗︎ 12% from last week" },
  { title: "Critical Issues", formattedValue: "12", icon: <BugAntIcon />, description: "↗︎ 12% from last week" },
  { title: "Users Affected", formattedValue: "1,234", icon: <BugAntIcon />, description: "↙ 12% from last week" },
  { title: "New Issues", formattedValue: "1,234", icon: <BugAntIcon />, description: "↙ 12% from last week" }
]

export const Dashboard: React.FC = () => {
  return (
    <Layout>
      <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
        {
          testStats.map((stat, i) => (
            <DashboardStatsCard
              key={i}
              title={stat.title}
              formattedValue={stat.formattedValue}
              icon={stat.icon}
              description={stat.description}
            />
          ))
        }
      </div>
    </Layout>
  );
};