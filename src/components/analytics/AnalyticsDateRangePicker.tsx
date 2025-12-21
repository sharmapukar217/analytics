"use client";
import * as React from "react";
import { CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";

import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";
import { Calendar } from "../ui/calendar";
import { useDateRange } from "@/hooks/useAnalytics";

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
const CALENDAR_PRESETS = [
  {
    label: "Today",
    range: {
      from: new Date(),
      to: new Date(),
    },
  },
  {
    label: "This Week",
    range: (() => {
      const today = new Date();
      const startOfWeek = addDays(today, -today.getDay());
      const endOfWeek = addDays(startOfWeek, 6);
      return { from: startOfWeek, to: endOfWeek };
    })(),
  },
  {
    label: "This Month",
    range: (() => {
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      return { from: startOfMonth, to: endOfMonth };
    })(),
  },
  {
    label: "This Year",
    range: (() => {
      const today = new Date();
      const startOfYear = new Date(today.getFullYear(), 0, 1);
      const endOfYear = new Date(today.getFullYear(), 11, 31);
      return { from: startOfYear, to: endOfYear };
    })(),
  },
  {
    label: "Last 7 Days",
    range: {
      from: addDays(new Date(), -7),
      to: new Date(),
    },
  },
  {
    label: "Last 30 Days",
    range: {
      from: addDays(new Date(), -30),
      to: new Date(),
    },
  },
  {
    label: "Last 6 months",
    range: {
      from: addDays(new Date(), -180),
      to: new Date(),
    },
  },
  {
    label: "Last 1 year",
    range: {
      from: addDays(new Date(), -365),
      to: new Date(),
    },
  },
  {
    label: "Reset",
    variant: "destructive" as const,
    className: "mt-auto",
    range: {
      from: undefined,
      to: undefined,
    },
  },
];

function DateRangeLabel({ date }: { date: DateRange | undefined }) {
  if (!date?.from) return "Pick a date range";
  if (!date.to) return date.from.toLocaleDateString();
  return `${date.from.toLocaleDateString()} - ${date.to.toLocaleDateString()}`;
}

type AnalyticsDateRangePickerProps = {
  disabledPresets?: number[];
};

export function AnalyticsDateRangePicker({
  disabledPresets = [],
}: AnalyticsDateRangePickerProps) {
  const { dateRange, setDateRange } = useDateRange();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="secondary"
          className="text-xs rounded-full min-w-36"
        >
          <CalendarIcon className="size-3" />
          <DateRangeLabel date={dateRange} />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0 flex" align="end">
        <div className="border-r flex flex-col p-2 gap-1">
          {CALENDAR_PRESETS.map(
            ({ label, range, variant, className }, index) => (
              <React.Fragment key={label}>
                {index === CALENDAR_PRESETS.length - 1 && <Separator />}
                <Button
                  size="xs"
                  className={className}
                  variant={variant || "ghost"}
                  disabled={disabledPresets.includes(index)}
                  onClick={() => setDateRange(range)}
                >
                  {label}
                </Button>
              </React.Fragment>
            ),
          )}
        </div>
        <Calendar
          numberOfMonths={2}
          selected={dateRange}
          onSelect={setDateRange}
          className="[--cell-size:--spacing(7)]"
          mode="range"
        />
      </PopoverContent>
    </Popover>
  );
}
