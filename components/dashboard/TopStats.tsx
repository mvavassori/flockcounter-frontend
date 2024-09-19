"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useSession } from "next-auth/react";
import { getTopStats } from "@/service/backendCalls";
import Spinner from "@/components/Spinner";
import { useRefetch } from "@/context/RefetchContext";
import { getDateRange } from "@/app/websites/[domain]/page";
import CustomTooltip from "@/components/CustomTooltip";

interface PerIntervalStats {
  [key: string]: { count: number; period: string }[];
}

interface TopStatsProps {
  domain: string;
  period: string;
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

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  // If the date string includes a day (YYYY-MM-DD), format as "19 Sep"
  if (dateString.length === 10) {
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
    }).format(date);
  }
  // If the date string includes only the month (YYYY-MM), format as "Sep 2024"
  else if (dateString.length === 7) {
    return new Intl.DateTimeFormat("en-GB", {
      month: "short",
      year: "numeric",
    }).format(date);
  }
  return dateString; // Fallback if format doesn't match
};

const TopStats: React.FC<TopStatsProps> = (props) => {
  const {
    domain,
    period,
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
  const { data: session, update } = useSession();
  const { shouldRefetch, triggerRefetch } = useRefetch();

  const [topStats, setTopStats] = useState<TopStatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    if (session?.backendTokens.accessToken) {
      setAccessToken(session.backendTokens.accessToken);
    }
  }, [session?.backendTokens.accessToken, shouldRefetch]);

  useEffect(() => {
    const fetchTopStats = async () => {
      if (!accessToken) return;
      setLoading(true);
      const { startDateString, endDateString } = getDateRange(period);
      try {
        const topStatsData = await getTopStats(
          domain,
          startDateString,
          endDateString,
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
      } catch (err: any) {
        if (err.message === "Unauthorized") {
          await update();
          triggerRefetch();
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    if (accessToken || shouldRefetch) {
      fetchTopStats();
    }
  }, [
    domain,
    period,
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
    shouldRefetch,
  ]);

  const getChartData = () => {
    return (
      topStats?.perIntervalStats?.[selectedMetric]?.map((item) => {
        if (
          selectedMetric === "medianVisitDuration" &&
          "medianTimeSpent" in item
        ) {
          const timeParts = (item.medianTimeSpent as string).split(" ");
          if (timeParts[0].includes("h")) {
            const hours = parseInt(timeParts[0].replace("h", ""), 10);
            const minutes = parseInt(timeParts[1].replace("m", ""), 10);
            const seconds = parseInt(timeParts[2].replace("s", ""), 10);
            return {
              period: formatDate(item.period), // Format the period date
              value: hours * 60 * 60 + minutes * 60 + seconds,
            };
          } else if (timeParts[0].includes("m")) {
            const minutes = parseInt(timeParts[0].replace("m", ""), 10);
            const seconds = parseInt(timeParts[1].replace("s", ""), 10);
            return {
              period: formatDate(item.period), // Format the period date
              value: minutes * 60 + seconds,
            };
          } else {
            const seconds = parseInt(timeParts[0].replace("s", ""), 10);
            return {
              period: formatDate(item.period), // Format the period date
              value: seconds,
            };
          }
        } else {
          return {
            period: formatDate(item.period), // Format the period date
            value: item.count,
          };
        }
      }) || []
    );
  };

  const handleMetricChange = (
    metric: "totalVisits" | "uniqueVisitors" | "medianVisitDuration"
  ) => {
    setSelectedMetric(metric);
  };

  if (loading) {
    return (
      <div className="w-full mt-8">
        <ul className="flex gap-4 bg-white rounded-t-lg p-4">
          <li className="font-semibold text-gray-600 text-lg flex items-baseline gap-2">
            Total visits: <Spinner />
          </li>
          <li className="font-semibold text-gray-600 text-lg flex items-baseline gap-2">
            Unique visitors: <Spinner />
          </li>
          <li className="font-semibold text-gray-600 text-lg flex items-baseline gap-2">
            Median visit duration: <Spinner />
          </li>
        </ul>
        <div className="flex justify-center items-center pb-4 h-[512px]">
          <Spinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full mt-8">
        <ul className="flex gap-4 bg-white rounded-t-lg p-4">
          <li className="font-semibold text-gray-600 text-lg flex items-baseline gap-2">
            Total visits: <Spinner />
          </li>
          <li className="font-semibold text-gray-600 text-lg flex items-baseline gap-2">
            Unique visitors: <Spinner />
          </li>
          <li className="font-semibold text-gray-600 text-lg flex items-baseline gap-2">
            Median visit duration: <Spinner />
          </li>
        </ul>
        <div className="flex justify-center items-center pb-4 h-[512px]">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mt-8">
      <ul className="flex gap-4 bg-white rounded-t-lg p-4">
        <li
          onClick={() => handleMetricChange("totalVisits")}
          className={
            selectedMetric === "totalVisits"
              ? "font-semibold text-lg cursor-pointer underline"
              : "font-semibold text-lg cursor-pointer"
          }
        >
          Total visits: {topStats?.aggregates?.totalVisits}
        </li>
        <li
          onClick={() => handleMetricChange("uniqueVisitors")}
          className={
            selectedMetric === "uniqueVisitors"
              ? "font-semibold text-lg cursor-pointer underline"
              : "font-semibold text-lg cursor-pointer"
          }
        >
          Unique visitors: {topStats?.aggregates?.uniqueVisitors}
        </li>
        <li
          onClick={() => handleMetricChange("medianVisitDuration")}
          className={
            selectedMetric === "medianVisitDuration"
              ? "font-semibold text-lg cursor-pointer underline"
              : "font-semibold text-lg cursor-pointer"
          }
        >
          Median visit duration: {topStats?.aggregates?.medianVisitDuration}
        </li>
      </ul>
      <div className="flex justify-center bg-white pb-4">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={getChartData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            {/* <Tooltip /> */}
            <Tooltip
              content={
                <CustomTooltip
                  selectedMetric={selectedMetric}
                  period={period}
                  interval={interval}
                />
              }
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke={
                selectedMetric === "totalVisits"
                  ? "rgb(75, 192, 192)"
                  : selectedMetric === "uniqueVisitors"
                  ? "rgb(255, 99, 132)"
                  : "rgb(54, 162, 235)"
              }
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TopStats;
