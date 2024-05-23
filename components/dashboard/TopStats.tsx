"use client";

import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

interface PerIntervalStats {
  [key: string]: { count: number; period: string }[];
}

interface TopStatsProps {
  data: {
    aggregates: {
      medianVisitDuration: string;
      totalVisits: number;
      uniqueVisitors: number;
    };
    perIntervalStats: PerIntervalStats;
  };
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TopStats: React.FC<TopStatsProps> = (props) => {
  const { data } = props;

  const [selectedMetric, setSelectedMetric] = useState<
    "totalVisits" | "uniqueVisitors" | "medianVisitDuration"
  >("totalVisits");

  const chartData = {
    labels: data.perIntervalStats[selectedMetric].map((item) => item.period),
    datasets: [
      {
        label:
          selectedMetric === "totalVisits"
            ? "Total visits"
            : selectedMetric === "uniqueVisitors"
            ? "Unique visitors"
            : "Median visit duration",
        data: data.perIntervalStats[selectedMetric].map((item) => {
          if (
            selectedMetric === "medianVisitDuration" &&
            "medianTimeSpent" in item
          ) {
            const medianTimeSpent = item.medianTimeSpent as string;
            const timeParts = medianTimeSpent.split(" ");
            const minutes = parseInt(timeParts[0].replace("m", ""));
            const seconds = parseInt(timeParts[1].replace("s", ""));
            return minutes * 60 + seconds;
          } else {
            return item.count;
          }
        }),
        fill: false,
        borderColor:
          selectedMetric === "totalVisits"
            ? "rgb(75, 192, 192)"
            : selectedMetric === "uniqueVisitors"
            ? "rgb(255, 99, 132)"
            : "rgb(54, 162, 235)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    interaction: {
      intersect: false,
    },
  };

  const handleMetricChange = (
    metric: "totalVisits" | "uniqueVisitors" | "medianVisitDuration"
  ) => {
    setSelectedMetric(metric);
  };

  return (
    <div className="w-full mt-8 shadow-lg">
      <ul className="flex gap-4 bg-white rounded-t-lg p-4">
        <li
          onClick={() => handleMetricChange("totalVisits")}
          className={
            selectedMetric === "totalVisits"
              ? "font-semibold text-lg cursor-pointer underline"
              : "font-semibold text-lg cursor-pointer"
          }
        >
          Total visits: {data.aggregates.totalVisits}
        </li>
        <li
          onClick={() => handleMetricChange("uniqueVisitors")}
          className={
            selectedMetric === "uniqueVisitors"
              ? "font-semibold text-lg cursor-pointer underline"
              : "font-semibold text-lg cursor-pointer"
          }
        >
          Unique visitors: {data.aggregates.uniqueVisitors}
        </li>
        <li
          onClick={() => handleMetricChange("medianVisitDuration")}
          className={
            selectedMetric === "medianVisitDuration"
              ? "font-semibold text-lg cursor-pointer underline"
              : "font-semibold text-lg cursor-pointer"
          }
        >
          Median visit duration: {data.aggregates.medianVisitDuration}
        </li>
      </ul>
      <div className="flex justify-center bg-white rounded-b-lg pb-4 shadow-lg">
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
};

export default TopStats;
