import { TooltipProps } from "recharts";

function formatDate(
  dateString: string,
  period: string,
  interval: string
): string {
  const date = parseDate(dateString, interval);

  if (!date) {
    throw new Error("Invalid date string or format");
  }

  switch (interval) {
    case "hour":
      if (period === "today" || period === "yesterday") {
        return date.toLocaleString("en-US", {
          weekday: "short",
          day: "numeric",
          month: "short",
          hour: "numeric",
          hour12: true,
        });
      }
      break;
    case "day":
      if (["week", "month", "month-to-date", "last-month"].includes(period)) {
        return date.toLocaleString("en-US", {
          weekday: "short",
          day: "numeric",
          month: "short",
        });
      }
      break;
    case "month":
      if (["year-to-date", "last-12-months", "last-5-years"].includes(period)) {
        return date.toLocaleString("en-US", {
          month: "short",
          year: "numeric",
        });
      }
      break;
  }

  throw new Error("Invalid combination of period and interval");
}

function parseDate(dateString: string, interval: string): Date | null {
  const currentYear = new Date().getFullYear();

  if (interval === "hour") {
    const hour = parseInt(dateString, 10);
    if (isNaN(hour) || hour < 0 || hour > 23) return null;
    const date = new Date();
    date.setHours(hour, 0, 0, 0);
    return date;
  } else if (interval === "day") {
    const [day, month] = dateString.split(" ");
    const monthIndex = getMonthIndex(month);
    if (monthIndex === -1 || isNaN(parseInt(day))) return null;
    return new Date(currentYear, monthIndex, parseInt(day));
  } else if (interval === "month") {
    const [month, year] = dateString.split(" ");
    const monthIndex = getMonthIndex(month);
    if (monthIndex === -1 || isNaN(parseInt(year))) return null;
    return new Date(parseInt(year), monthIndex, 1);
  }
  return null;
}

function getMonthIndex(month: string): number {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months.findIndex((m) => m.toLowerCase() === month.toLowerCase());
}

// Helper function to format duration in seconds to hh:mm:ss or mm:ss
const formatDuration = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  } else {
    return `${seconds}s`;
  }
};

export default function CustomTooltip({
  active,
  payload,
  label,
  selectedMetric,
  period,
  interval,
}: TooltipProps<number, string> & {
  selectedMetric: string;
  period: string;
  interval: string;
}): JSX.Element | null {
  if (active && payload && payload.length) {
    // Format the date with the day of the week
    const formattedDate = formatDate(label, period, interval);

    // Get the current value from the payload
    const value = payload[0]?.value;

    // Determine the appropriate label and value formatting based on the selectedMetric
    let labelValue = "";
    if (payload[0]?.name === "value") {
      if (selectedMetric === "totalVisits") {
        labelValue = `visitors: ${value}`;
      } else if (selectedMetric === "uniqueVisitors") {
        labelValue = `unique visitors: ${value}`;
      } else if (selectedMetric === "medianVisitDuration") {
        labelValue = `duration: ${formatDuration(value as number)}`; // Format the time value
      }
    }

    return (
      <div className="custom-tooltip bg-white border p-2 rounded shadow">
        <p>{formattedDate}</p>
        <p>{labelValue}</p>
      </div>
    );
  }

  return null;
}
