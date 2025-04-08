import { TooltipProps } from "recharts";
import { formatTooltipDate, formatDuration } from "@/utils/helper";

import type { JSX } from "react";

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
    const formattedDate = formatTooltipDate(label, period, interval);

    // Get the current value from the payload
    const value = payload[0]?.value;

    // Determine the appropriate label and value formatting based on the selectedMetric
    let labelValue = "";
    if (payload[0]?.name === "value") {
      if (selectedMetric === "totalVisits") {
        labelValue = `visits: ${value}`;
      } else if (selectedMetric === "uniqueVisitors") {
        labelValue = `unique visitors: ${value}`;
      } else if (selectedMetric === "medianVisitDuration") {
        labelValue = `duration: ${formatDuration(value as number)}`; // Format the time value
      }
    }

    return (
      <div className="custom-tooltip bg-white border p-2 rounded-sm shadow-sm">
        <p>{formattedDate}</p>
        <p>{labelValue}</p>
      </div>
    );
  }

  return null;
}
