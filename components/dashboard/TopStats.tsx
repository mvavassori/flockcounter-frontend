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
import { getTopStats, getLivePageViews } from "@/service/backendCalls";
import Spinner from "@/components/Spinner";
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
  const { data: session } = useSession();

  const [topStats, setTopStats] = useState<TopStatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState("");
  const [livePageviews, setLivePageviews] = useState(0);

  // Check if we are in demo mode based on the domain
  const isDemo = domain === process.env.NEXT_PUBLIC_DEMO_DOMAIN;

  useEffect(() => {
    if (isDemo) {
      // Use a dummy token for the demo (could be any string)
      setAccessToken("demo");
    } else if (session?.backendTokens?.accessToken) {
      setAccessToken(session.backendTokens.accessToken);
    }
  }, [isDemo, session?.backendTokens?.accessToken]);

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
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
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
  ]);

  useEffect(() => {
    let intervalId;

    // Function to fetch live pageviews
    const fetchLivePageviews = async () => {
      if (!accessToken) return;
      try {
        const livePageviewsData = await getLivePageViews(domain, accessToken);
        setLivePageviews(livePageviewsData); // Update state with the live pageviews count
      } catch (err: any) {
        if (err.message === "Unauthorized") {
          console.error("Unauthorized request. Please check your credentials.");
        }
        console.error("Error fetching live pageviews:", err);
      }
    };

    // Call the function immediately on component mount
    if (accessToken) {
      fetchLivePageviews();
    }

    // Set up the interval to call the function every 30 seconds
    intervalId = setInterval(fetchLivePageviews, 30000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [domain, accessToken]); // Dependency array: re-run effect if domain changes

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

  // Dynamically set color classes based on livePageviews
  const dotColor = livePageviews > 0 ? "bg-green-500" : "bg-red-500";
  const pingColor = livePageviews > 0 ? "bg-green-400" : "bg-red-400";

  if (loading) {
    return (
      <div className="w-full mt-8">
        <ul className="flex gap-4 bg-white rounded-t-lg p-4">
          <li className="font-semibold text-gray-600 text-lg flex items-baseline gap-2">
            Total visits: <Spinner />
          </li>
          <li className="font-semibold text-gray-600 text-lg flex items-baseline gap-2">
            Visitors: <Spinner />
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
            Visitors:
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
      <div className="flex justify-between items-center">
        <ul className="flex items-center gap-4 rounded-t-lg p-4 my-0">
          <li
            onClick={() => handleMetricChange("totalVisits")}
            className={
              selectedMetric === "totalVisits"
                ? "font-semibold text-lg cursor-pointer border-b-4 border-blue-500"
                : "font-semibold text-lg cursor-pointer border-b-4 border-transparent hover:border-gray-400"
            }
          >
            Total visits: {topStats?.aggregates?.totalVisits}
          </li>
          <li
            onClick={() => handleMetricChange("uniqueVisitors")}
            className={
              selectedMetric === "uniqueVisitors"
                ? "font-semibold text-lg cursor-pointer border-b-4 border-red-500"
                : "font-semibold text-lg cursor-pointer border-b-4 border-transparent hover:border-gray-400"
            }
          >
            Visitors: {topStats?.aggregates?.uniqueVisitors}
          </li>
          <li
            onClick={() => handleMetricChange("medianVisitDuration")}
            className={
              selectedMetric === "medianVisitDuration"
                ? "font-semibold text-lg cursor-pointer border-b-4 border-green-500"
                : "font-semibold text-lg cursor-pointer border-b-4 border-transparent hover:border-gray-400"
            }
          >
            Median visit duration: {topStats?.aggregates?.medianVisitDuration}
          </li>
        </ul>
        <div className="flex items-center p-4">
          {/* Pulsating Dot */}
          <span className="relative flex h-3 w-3">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                livePageviews > 0 ? "bg-green-400" : "bg-red-400"
              } opacity-75`}
            ></span>
            <span
              className={`relative inline-flex rounded-full h-3 w-3 ${
                livePageviews > 0 ? "bg-green-500" : "bg-red-500"
              }`}
            ></span>
          </span>
          {/* Live Pageviews Count */}
          <p className="ml-2 font-semibold text-sm">
            Live pageviews: {livePageviews}
          </p>
        </div>
      </div>
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
