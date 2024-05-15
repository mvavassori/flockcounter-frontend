"use client";

import { useState, useEffect } from "react";
import { DateRange, RangeKeyDict, Range } from "react-date-range";
import {
  startOfDay,
  endOfDay,
  subDays,
  startOfMonth,
  endOfMonth,
  startOfYear,
} from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const PeriodPicker = () => {
  const [selectedDisplayValue, setSelectedDisplayValue] =
    useState<string>("Last 7 Days");

  const [defaultRange, setDefaultRange] = useState<Range>({
    startDate: startOfDay(subDays(new Date(), 6)),
    endDate: endOfDay(new Date()),
    key: "selection",
  });

  const [customRange, setCustomRange] = useState<Range>({
    startDate: undefined,
    endDate: undefined,
    key: "selection",
  });

  const [isPickerOpen, setIsPickerOpen] = useState(false);

  useEffect(() => {
    console.log(customRange);
    console.log(defaultRange);
  }, [customRange, defaultRange]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedDisplayValue(value);

    if (value === "Custom Range") {
      setIsPickerOpen(true);
    } else {
      setIsPickerOpen(false);
      handleDefaultRangeSelection(value);
    }
  };

  const handleDefaultRangeSelection = (value: string) => {
    const today = new Date();
    switch (value) {
      case "Today":
        setDefaultRange({
          startDate: startOfDay(today),
          endDate: endOfDay(today),
          key: "selection",
        });
        break;
      case "Yesterday":
        const yesterday = subDays(today, 1);
        setDefaultRange({
          startDate: startOfDay(yesterday),
          endDate: endOfDay(yesterday),
          key: "selection",
        });
        break;
      case "Last 7 Days":
        setDefaultRange({
          startDate: startOfDay(subDays(today, 6)),
          endDate: endOfDay(today),
          key: "selection",
        });
        setCustomRange({
          startDate: undefined,
          endDate: undefined,
          key: "selection",
        });
        break;
      case "Last 30 Days":
        setDefaultRange({
          startDate: startOfDay(subDays(today, 29)),
          endDate: endOfDay(today),
          key: "selection",
        });
        break;
      case "Month to Date":
        setDefaultRange({
          startDate: startOfDay(startOfMonth(today)),
          endDate: endOfDay(today),
          key: "selection",
        });
        break;
      case "Last Month":
        const lastMonthStart = startOfMonth(subDays(today, today.getDate()));
        const lastMonthEnd = endOfMonth(subDays(today, today.getDate()));
        setDefaultRange({
          startDate: startOfDay(lastMonthStart),
          endDate: endOfDay(lastMonthEnd),
          key: "selection",
        });
        break;
      case "Year to Date":
        setDefaultRange({
          startDate: startOfDay(startOfYear(today)),
          endDate: endOfDay(today),
          key: "selection",
        });
        break;
      case "Last 12 Months":
        setDefaultRange({
          startDate: startOfDay(subDays(today, 364)),
          endDate: endOfDay(today),
          key: "selection",
        });
        break;
      default:
        break;
    }
  };

  const handleDateRangeChange = (ranges: RangeKeyDict) => {
    if (ranges.selection.startDate && ranges.selection.endDate) {
      setCustomRange(ranges.selection);
      setSelectedDisplayValue(
        `Custom Range (${ranges.selection.startDate?.toDateString()} - ${ranges.selection.endDate?.toDateString()})`
      );
      setIsPickerOpen(false);
    }
  };

  return (
    <div className="space-y-4">
      <select
        className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={selectedDisplayValue}
        onChange={handleSelectChange}
      >
        <option value="Today">Today</option>
        <option value="Yesterday">Yesterday</option>
        <option value="Last 7 Days">Last 7 Days</option>
        <option value="Last 30 Days">Last 30 Days</option>
        <option value="Month to Date">Month to Date</option>
        <option value="Last Month">Last Month</option>
        <option value="Year to Date">Year to Date</option>
        <option value="Last 12 Months">Last 12 Months</option>
        <option value="Custom Range">Custom Range</option>
      </select>

      {isPickerOpen && (
        <div className="relative z-10">
          <DateRange
            onChange={handleDateRangeChange}
            moveRangeOnFirstSelection={false}
            maxDate={new Date()}
            ranges={[customRange]}
            showMonthAndYearPickers={false}
            showDateDisplay={false}
          />
        </div>
      )}
    </div>
  );
};

export default PeriodPicker;
