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

  const options = {
    interaction: {
      intersect: false,
    },
  };

  return (
    <div>
      <h2>Top Stats</h2>
      <ul>
        <li>Total visits: {topStatsData.aggregates.totalVisits}</li>
        <li>Unique visitors: {topStatsData.aggregates.uniqueVisitors}</li>
        <li>
          Average visit duration: {topStatsData.aggregates.averageVisitDuration}
        </li>
      </ul>
      <div>
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
};

export default TopStats;
