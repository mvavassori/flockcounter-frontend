"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSession } from "next-auth/react";
import { getTopStats } from "@/service/backendCalls";
import Spinner from "@/components/Spinner";
import { useRefetch } from "@/context/RefetchContext";
import {
  getDateRange,
  formatXAxisDate,
  getInterval,
  convertDurationToSeconds,
  formatTooltipDate,
} from "@/utils/helper";
import CustomTooltip from "@/components/CustomTooltip";

interface PerIntervalStats {
  [key: string]: { count?: number; medianTimeSpent?: string; period: string }[];
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
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
}

interface TopStatsData {
  aggregates: {
    medianVisitDuration: string;
    totalVisits: number;
    uniqueVisitors: number;
  };
  perIntervalStats: PerIntervalStats;
}

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
    utmSource,
    utmMedium,
    utmCampaign,
    utmTerm,
    utmContent,
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
          city,
          utmSource,
          utmMedium,
          utmCampaign,
          utmTerm,
          utmContent
        );
        setTopStats(topStatsData);
      } catch (err: any) {
        if (err.message === "Unauthorized") {
          // await update();
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
    utmSource,
    utmMedium,
    utmCampaign,
    utmTerm,
    utmContent,
    shouldRefetch,
  ]);

  const getChartData = () => {
    return (
      topStats?.perIntervalStats?.[selectedMetric]?.map((item) => {
        const date = new Date(item.period);
        const userTimezoneOffset = date.getTimezoneOffset() * 60000;

        // Adjust date based on the timezone offset
        const adjustedDate =
          userTimezoneOffset < 0
            ? new Date(date.getTime() - userTimezoneOffset) // Timezone ahead of UTC (negative offset)
            : new Date(date.getTime() + userTimezoneOffset); // Timezone behind UTC or no difference (positive offset or 0)

        return {
          period: adjustedDate.toISOString(), // Convert to ISO string format
          value:
            selectedMetric === "medianVisitDuration"
              ? convertDurationToSeconds(item.medianTimeSpent ?? "0s") // Default to 0s if undefined
              : item.count ?? 0, // Default to 0 if count is undefined
        };
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
            Total visits:
          </li>
          <li className="font-semibold text-gray-600 text-lg flex items-baseline gap-2">
            Unique visitors:
          </li>
          <li className="font-semibold text-gray-600 text-lg flex items-baseline gap-2">
            Median visit duration:
          </li>
        </ul>
        <div className="flex justify-center items-center pb-4 h-[512px]">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mt-8 bg-slate-100 rounded-md">
      <ul className="flex gap-4 rounded-t-lg p-4">
        <li
          onClick={() => handleMetricChange("totalVisits")}
          className={
            selectedMetric === "totalVisits"
              ? "font-semibold text-lg cursor-pointer border-b-4 border-blue-500"
              : "font-semibold text-lg cursor-pointer"
          }
        >
          Total visits: {topStats?.aggregates?.totalVisits}
        </li>
        <li
          onClick={() => handleMetricChange("uniqueVisitors")}
          className={
            selectedMetric === "uniqueVisitors"
              ? "font-semibold text-lg cursor-pointer border-b-4 border-red-500"
              : "font-semibold text-lg cursor-pointer"
          }
        >
          Unique visitors: {topStats?.aggregates?.uniqueVisitors}
        </li>
        <li
          onClick={() => handleMetricChange("medianVisitDuration")}
          className={
            selectedMetric === "medianVisitDuration"
              ? "font-semibold text-lg cursor-pointer border-b-4 border-green-500"
              : "font-semibold text-lg cursor-pointer"
          }
        >
          Median visit duration: {topStats?.aggregates?.medianVisitDuration}
        </li>
      </ul>
      <div className="pb-4">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={getChartData()}
            margin={{ top: 5, left: 5, right: 65, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="period"
              tickFormatter={(timestamp) =>
                formatXAxisDate(timestamp, interval)
              }
              interval={getInterval(period, interval)}
            />
            <YAxis />
            <Tooltip
              content={
                <CustomTooltip
                  selectedMetric={selectedMetric}
                  period={period}
                  interval={interval}
                />
              }
              labelFormatter={(label) =>
                formatTooltipDate(label, period, interval)
              }
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={
                selectedMetric === "totalVisits"
                  ? "#3b82f6"
                  : selectedMetric === "uniqueVisitors"
                  ? "#ef4444"
                  : "#22c55e"
              }
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TopStats;
