export const getDateRange = (period: string) => {
  // Get the current time in UTC
  const now = new Date();

  // Start of today in UTC (midnight)
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let startDate: Date;
  let endDate: Date = now;

  switch (period) {
    case "today":
      startDate = today; // Start of today (midnight)
      endDate = new Date(today); // End of today at 23:59:59.999
      endDate.setHours(23, 59, 59, 999);
      break;

    case "yesterday":
      startDate = new Date(today);
      startDate.setDate(today.getDate() - 1); // Start of yesterday
      endDate = new Date(startDate); // End of yesterday at 23:59:59.999
      endDate.setHours(23, 59, 59, 999);
      break;

    case "week":
      // Start of the week, including today
      startDate = new Date(today);
      startDate.setDate(today.getDate() - 6); // 6 days back to include today
      break;

    case "month":
      startDate = new Date(today);
      startDate.setDate(today.getDate() - 30);
      break;

    case "month-to-date":
      // Start of this month (UTC)
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;

    case "last-month":
      // Start of the previous month (UTC)
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      // End of the previous month (last day of the previous month)
      endDate = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
      break;

    case "year-to-date":
      // Start of this year (UTC)
      startDate = new Date(now.getFullYear(), 0, 1);
      break;

    case "last-12-months":
      // 12 months ago from today (UTC)
      startDate = new Date(
        now.getFullYear() - 1,
        now.getMonth(),
        now.getDate()
      );
      break;

    case "last-5-years":
      // 5 years ago from today (UTC)
      startDate = new Date(
        now.getFullYear() - 5,
        now.getMonth(),
        now.getDate()
      );
      break;

    default:
      // Last 7 days by default
      startDate = new Date(today);
      startDate.setDate(today.getDate() - 7);
  }

  return {
    startDateString: startDate.toISOString(), // Convert to UTC string for database or API usage
    endDateString: endDate.toISOString(), // Convert to UTC string
  };
};

export const formatXAxisDate = (timestamp: string, interval: string) => {
  const date = new Date(timestamp);
  const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  switch (interval) {
    case "hour":
      return date.toLocaleString("en-US", {
        hour: "numeric",
        hour12: true,
        // timeZone: "UTC",
      });
    case "day":
      return utcDate.toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        timeZone: "UTC",
      });
    case "month":
      return utcDate.toLocaleString("en-US", {
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      });
    default:
      return utcDate.toLocaleString("en-US", { timeZone: "UTC" });
  }
};

export const formatTooltipDate = (
  timestamp: string,
  period: string,
  interval: string
) => {
  const date = new Date(timestamp);
  const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
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
        return utcDate.toLocaleString("en-US", {
          weekday: "short",
          day: "numeric",
          month: "short",
        });
      }
      break;
    case "month":
      if (["year-to-date", "last-12-months", "last-5-years"].includes(period)) {
        return utcDate.toLocaleString("en-US", {
          month: "short",
          year: "numeric",
        });
      }
      break;
  }
  return date.toLocaleString();
};

export const convertDurationToSeconds = (durationString: string) => {
  const parts = durationString.split(" ");
  let seconds = 0;
  parts.forEach((part) => {
    if (part.includes("h")) seconds += parseInt(part) * 3600;
    else if (part.includes("m")) seconds += parseInt(part) * 60;
    else if (part.includes("s")) seconds += parseInt(part);
  });
  return seconds;
};

// Helper function to format duration in seconds to hh:mm:ss or mm:ss
export const formatDuration = (totalSeconds: number) => {
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

export const getInterval = (period: string, interval: string) => {
  if (interval === "day" && period === "week") {
    return 0;
  } else if (interval === "day" && period !== "week") {
    return 3;
  } else if (interval === "month" && period === "last-5-years") {
    return 8;
  } else {
    return 2;
  }
};

// todo: non serve più a un cazzo, da cambaire. Il datestring è dicentato UTC date.
function parseTooltipDate(dateString: string, interval: string): Date | null {
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
