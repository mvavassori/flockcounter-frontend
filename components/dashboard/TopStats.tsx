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
    averageVisitDuration: {
      date: string;
      medianTimeSpent: string;
    }[];
    totalVisits: {
      date: string;
      count: number;
    }[];
    uniqueVisitors: {
      date: string;
      count: number;
    }[];
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
      data: [100, 200, 300, 400, 500, 600, 700],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};

const TopStats: React.FC<TopStatsProps> = (props) => {
  const { data } = props;

  const [topStatsData, setTopStatsData] = useState<TopStatsProps["data"]>(data);

  const options = {};

  return (
    <div>
      <h2>Top Stats</h2>
      <ul>
        {topStatsData.totalVisits.map((total, index) => (
          <li key={index + 100}>
            Total visits on {total.date}: {total.count}
          </li>
        ))}
        {topStatsData.uniqueVisitors.map((unique, index) => (
          <li key={index + 200}>
            Unique visitors on {unique.date}: {unique.count}
          </li>
        ))}
        {topStatsData.averageVisitDuration.map((average, index) => (
          <li key={index}>
            Average visit duration on {average.date}: {average.medianTimeSpent}
          </li>
        ))}
      </ul>
      <Line options={options} data={sampleData} />
    </div>
  );
};

export default TopStats;
