export const getDateRange = (period: string) => {
  const now = new Date();
  const today = new Date(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
  );
  let startDate;
  let endDate = now;

  switch (period) {
    case "today":
      startDate = today;
      endDate = new Date(
        Date.UTC(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          23,
          59,
          59,
          999
        )
      );
      break;
    case "yesterday":
      startDate = new Date(
        Date.UTC(today.getFullYear(), today.getMonth(), today.getDate() - 1)
      );
      endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000 - 1);
      break;
    case "week":
      startDate = new Date(
        Date.UTC(today.getFullYear(), today.getMonth(), today.getDate() - 7)
      );
      break;
    case "month":
      startDate = new Date(
        Date.UTC(today.getFullYear(), today.getMonth(), today.getDate() - 30)
      );
      break;
    case "month-to-date":
      startDate = new Date(Date.UTC(today.getFullYear(), today.getMonth(), 1));
      break;
    case "last-month":
      startDate = new Date(
        Date.UTC(today.getFullYear(), today.getMonth() - 1, 1)
      );
      endDate = new Date(
        Date.UTC(today.getFullYear(), today.getMonth(), 0, 23, 59, 59, 999)
      );
      break;
    case "year-to-date":
      startDate = new Date(Date.UTC(today.getFullYear(), 0, 1));
      break;
    case "last-12-months":
      startDate = new Date(
        Date.UTC(now.getFullYear() - 1, now.getMonth(), now.getDate())
      );
      break;
    case "last-5-years":
      startDate = new Date(
        Date.UTC(now.getFullYear() - 5, now.getMonth(), now.getDate())
      );
      break;
    default:
      startDate = new Date(
        Date.UTC(today.getFullYear(), today.getMonth(), today.getDate() - 7)
      ); // Last 7 Days
  }

  // Adjust endDate to the end of the day if needed
  if (period !== "today" && period !== "yesterday" && period !== "last-month") {
    endDate = new Date(
      Date.UTC(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        23,
        59,
        59,
        999
      )
    );
  }

  return {
    startDateString: startDate.toISOString(), // UTC time string
    endDateString: endDate.toISOString(), // UTC time string
  };
};

export const formatXAxisDate = (dateString: string) => {
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

export const formatTooltipDate = (
  dateString: string,
  period: string,
  interval: string
): string => {
  const date = parseTooltipDate(dateString, interval);

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
