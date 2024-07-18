"use client";

import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { useSession } from "next-auth/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";

import { getTopStats } from "@/service/backendCalls";

interface PerIntervalStats {
  [key: string]: { count: number; period: string }[];
}

interface TopStatsProps {
  domain: string;
  startDate: string;
  endDate: string;
  interval: string;
  page: string;
  referrer: string;
  device: string;
  os: string;
  browser: string;
  language: string;
  country: string;
  region: string;
  city: string;
}

interface TopStatsData {
  aggregates: {
    medianVisitDuration: string;
    totalVisits: number;
    uniqueVisitors: number;
  };
  perIntervalStats: PerIntervalStats;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

const TopStats: React.FC<TopStatsProps> = (props) => {
  const {
    domain,
    startDate,
    endDate,
    interval,
    page,
    referrer,
    device,
    os,
    browser,
    language,
    country,
    region,
    city,
  } = props;

  const [selectedMetric, setSelectedMetric] = useState<
    "totalVisits" | "uniqueVisitors" | "medianVisitDuration"
  >("totalVisits");

  const { data } = useSession();

  const [topStats, setTopStats] = useState<TopStatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    if (data?.backendTokens.accessToken) {
      setAccessToken(data.backendTokens.accessToken);
    }
  }, [data?.backendTokens.accessToken]);

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    setLoading(true);
    const fetchTopStats = async () => {
      try {
        const topStatsData = await getTopStats(
          domain,
          startDate,
          endDate,
          interval,
          accessToken,
          page,
          referrer,
          device,
          os,
          browser,
          language,
          country,
          region,
          city
        );
        setTopStats(topStatsData);
      } catch (err: Error | any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTopStats();
  }, [
    domain,
    startDate,
    endDate,
    interval,
    accessToken,
    page,
    referrer,
    device,
    os,
    browser,
    language,
    country,
    region,
    city,
  ]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const chartData = {
    labels: topStats?.perIntervalStats[selectedMetric].map(
      (item) => item.period
    ),
    datasets: [
      {
        label:
          selectedMetric === "totalVisits"
            ? "Total visits"
            : selectedMetric === "uniqueVisitors"
            ? "Unique visitors"
            : "Median visit duration",
        data: topStats?.perIntervalStats[selectedMetric].map((item) => {
          if (
            selectedMetric === "medianVisitDuration" &&
            "medianTimeSpent" in item
          ) {
            const medianTimeSpent = item.medianTimeSpent as string;
            const timeParts = medianTimeSpent.split(" ");
            console.log(timeParts);
            // check whether the string contains "h" for time longer than 60 minutes "m" for time longer than 60 seconds or "s".
            if (timeParts[0].includes("h")) {
              const hours = parseInt(timeParts[0].replace("h", ""));
              const minutes = parseInt(timeParts[1].replace("m", ""));
              const seconds = parseInt(timeParts[2].replace("s", ""));
              return hours * 60 * 60 + minutes * 60 + seconds;
            } else if (timeParts[0].includes("m")) {
              const minutes = parseInt(timeParts[0].replace("m", ""));
              const seconds = parseInt(timeParts[1].replace("s", ""));
              return minutes * 60 + seconds;
            } else {
              const seconds = parseInt(timeParts[0].replace("s", ""));
              return seconds;
            }
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
    // make y axis start at 0
    scales: {
      y: {
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
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
          Total visits: {topStats?.aggregates.totalVisits}
        </li>
        <li
          onClick={() => handleMetricChange("uniqueVisitors")}
          className={
            selectedMetric === "uniqueVisitors"
              ? "font-semibold text-lg cursor-pointer underline"
              : "font-semibold text-lg cursor-pointer"
          }
        >
          Unique visitors: {topStats?.aggregates.uniqueVisitors}
        </li>
        <li
          onClick={() => handleMetricChange("medianVisitDuration")}
          className={
            selectedMetric === "medianVisitDuration"
              ? "font-semibold text-lg cursor-pointer underline"
              : "font-semibold text-lg cursor-pointer"
          }
        >
          Median visit duration: {topStats?.aggregates.medianVisitDuration}
        </li>
      </ul>
      <div className="flex justify-center bg-white rounded-b-lg pb-4 shadow-lg">
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
};

export default TopStats;
