export const getDateRange = (period: string) => {
  // Get the current time in local time (not UTC)
  const now = new Date();

  // Start of today in local time (midnight)
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let startDate: Date;
  let endDate: Date = now; // End date is initialized to the current time

  switch (period) {
    case "today":
      startDate = today; // Start of today at 00:00:00.000 (local time)
      endDate = new Date(today); // Set end of today at 23:59:59.999 (local time)
      endDate.setHours(23, 59, 59, 999);
      break;

    case "yesterday":
      startDate = new Date(today); // Set start of yesterday at 00:00:00.000 (local time)
      startDate.setDate(today.getDate() - 1);
      endDate = new Date(startDate); // End of yesterday at 23:59:59.999 (local time)
      endDate.setHours(23, 59, 59, 999);
      break;

    case "week":
      // Start of the week: 6 days ago from today to include today
      startDate = new Date(today);
      startDate.setDate(today.getDate() - 6);
      break;

    case "month":
      // Start of the last 30 days
      startDate = new Date(today);
      startDate.setDate(today.getDate() - 30);
      break;

    case "month-to-date":
      // Start of this month (local time)
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;

    case "last-month":
      // Start of the previous month (local time)
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      // End of the previous month (last day of the previous month)
      endDate = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
      break;

    case "year-to-date":
      // Start of this year (local time)
      startDate = new Date(now.getFullYear(), 0, 1);
      break;

    case "last-12-months":
      // 12 months ago from today (local time)
      startDate = new Date(
        now.getFullYear() - 1,
        now.getMonth(),
        now.getDate()
      );
      break;

    case "last-5-years":
      // 5 years ago from today (local time)
      startDate = new Date(
        now.getFullYear() - 5,
        now.getMonth(),
        now.getDate()
      );
      break;

    default:
      // Default to the last 7 days (including today)
      startDate = new Date(today);
      startDate.setDate(today.getDate() - 6);
  }

  return {
    startDateString: startDate.toISOString(), // Convert to ISO string for UTC representation
    endDateString: endDate.toISOString(), // Convert to ISO string for UTC representation
  };
};

export const formatXAxisDate = (timestamp: string, interval: string) => {
  const date = new Date(timestamp);
  const userTimezoneOffset = date.getTimezoneOffset() * 60000; // Offset in milliseconds

  // Adjust date based on user's timezone
  const adjustedDate =
    userTimezoneOffset < 0
      ? new Date(date.getTime() + userTimezoneOffset) // Local timezone ahead of UTC (negative offset)
      : new Date(date.getTime() - userTimezoneOffset); // Local timezone behind UTC or no difference (positive offset or 0)

  switch (interval) {
    case "hour":
      // Format as hour (12-hour format with AM/PM)
      return adjustedDate.toLocaleString("en-US", {
        hour: "numeric",
        hour12: true,
      });
    case "day":
      // Format as day and month
      return date.toLocaleString("en-US", {
        day: "numeric",
        month: "short",
      });
    case "month":
      // Format as month and year
      return date.toLocaleString("en-US", {
        month: "short",
        year: "numeric",
      });
    default:
      // Default to full local date and time
      return date.toLocaleString();
  }
};

export const formatTooltipDate = (
  timestamp: string,
  period: string,
  interval: string
) => {
  const date = new Date(timestamp);
  const userTimezoneOffset = date.getTimezoneOffset() * 60000; // Offset in milliseconds

  // Adjust date based on user's timezone
  const adjustedDate =
    userTimezoneOffset < 0
      ? new Date(date.getTime() + userTimezoneOffset) // Local timezone ahead of UTC (negative offset)
      : new Date(date.getTime() - userTimezoneOffset); // Local timezone behind UTC or no difference (positive offset or 0)

  switch (interval) {
    case "hour":
      if (period === "today" || period === "yesterday") {
        // Format as weekday, day, month, and hour
        return adjustedDate.toLocaleString("en-US", {
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
        // Format as weekday, day, and month
        return date.toLocaleString("en-US", {
          weekday: "short",
          day: "numeric",
          month: "short",
        });
      }
      break;
    case "month":
      if (["year-to-date", "last-12-months", "last-5-years"].includes(period)) {
        // Format as month and year
        return date.toLocaleString("en-US", {
          month: "short",
          year: "numeric",
        });
      }
      break;
  }
  // Default to full local date and time
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

// Helper function to format duration in seconds to hh:mm:ss or mm:ss //todo check if useful
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

// Helper Functions for Password Rules
export const hasSpecialChar = (s: string): boolean => {
  return /[!@#$%^&*(),.?":{}|<>]/.test(s);
};

export const hasNumber = (s: string): boolean => {
  return /[0-9]/.test(s);
};

export const hasUppercase = (s: string): boolean => {
  return /[A-Z]/.test(s);
};
