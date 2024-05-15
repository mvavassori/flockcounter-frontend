"use client";

import { useState } from "react";
// import "chart.js/auto";
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

interface TopStatsProps {
  data: {
    aggregates: {
      averageVisitDuration: string;
      totalVisits: number;
      uniqueVisitors: number;
    };
    perDayStats: {
      averageVisitDuration: {
        date: string;
        medianTimeSpent: string;
      }[];
      totalVisits: {
        count: number;
        date: string;
      }[];
      uniqueVisitors: {
        count: number;
        date: string;
      }[];
    };
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

const sampleData = {
  labels: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  datasets: [
    {
      label: "Total visits",
      data: [400, 100, 300, 900, 156, 800, 400],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};

const TopStats: React.FC<TopStatsProps> = (props) => {
  const { data } = props;

  const [topStatsData, setTopStatsData] = useState<TopStatsProps["data"]>(data);

  const chartData = {
    labels: topStatsData.perDayStats.totalVisits.map((item) => item.date),
    datasets: [
      {
        label: "Total visits",
        data: topStatsData.perDayStats.totalVisits.map((item) => item.count),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "Unique visitors",
        data: topStatsData.perDayStats.uniqueVisitors.map((item) => item.count),
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
      {
        label: "Average visit duration",
        data: topStatsData.perDayStats.averageVisitDuration.map((item) => {
          // Convert medianTimeSpent to a numerical value (e.g., seconds)
          const timeParts = item.medianTimeSpent.split(" ");
          const minutes = parseInt(timeParts[0].replace("m", ""));
          const seconds = parseInt(timeParts[1].replace("s", ""));
          return minutes * 60 + seconds;
        }),
        fill: false,
        borderColor: "rgb(54, 162, 235)",
        tension: 0.1,
      },
    ],
  };

  const [timePeriod, setTimePeriod] = useState<"7d" | "30d" | "90d">("7d");

  const options = {
    interaction: {
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      zoom: {
        limits: {
          x: { min: "2022-01-01", max: "2022-01-31" },
        },
        pan: {
          enabled: true,
          mode: "x",
          speed: 10,
          threshold: 10,
        },
        zoom: {
          enabled: true,
          mode: "x",
          speed: 0.1,
          threshold: 10,
        },
      },
      dateRange: {
        start:
          timePeriod === "7d"
            ? "2022-01-25"
            : timePeriod === "30d"
            ? "2022-01-15"
            : "2022-01-01",
        end:
          timePeriod === "7d"
            ? "2022-01-31"
            : timePeriod === "30d"
            ? "2022-01-31"
            : "2022-01-31",
        ranges: [
          {
            label: "7 days",
            value: "7d",
          },
          {
            label: "30 days",
            value: "30d",
          },
          {
            label: "90 days",
            value: "90d",
          },
        ],
        onChange: (newTimePeriod: any) => {
          setTimePeriod(newTimePeriod);
        },
      },
    },
  };
  return (
    <div className="w-full mt-8 shadow-lg">
      <ul className="flex gap-4 bg-white rounded-t-lg p-4">
        <li>
          <span className="font-semibold text-lg">Total visits:</span>{" "}
          {topStatsData.aggregates.totalVisits}
        </li>
        <li>
          <span className="font-semibold text-lg">Unique visitors:</span>{" "}
          {topStatsData.aggregates.uniqueVisitors}
        </li>
        <li>
          <span className="font-semibold text-lg">Average visit duration:</span>{" "}
          {topStatsData.aggregates.averageVisitDuration}
        </li>
      </ul>
      <div className="flex justify-center bg-white rounded-b-lg pb-4 shadow-lg">
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
};

export default TopStats;
