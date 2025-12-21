import * as React from "react";
import { create } from "zustand";
import { useQuery } from "@tanstack/react-query";
import type { DateRange } from "react-day-picker";

import type { AnalyticsData } from "@/lib/types/analytics";

interface DateRangeState {
  dateRange: DateRange | undefined;
  setDateRange: (value: DateRange | undefined) => void;
}

export const useDateRange = create<DateRangeState>((set) => ({
  dateRange: {
    from: new Date(new Date().getFullYear(), 0, 1), // January 1 of current year
    to: new Date(new Date().getFullYear(), 11, 31), // December 31 of current year
  },
  setDateRange: (value: DateRange | undefined) => set({ dateRange: value }),
}));

export function useGetAnalytics() {
  const { dateRange } = useDateRange();

  return useQuery({
    enabled: !!dateRange,
    queryKey: ["analytics", dateRange?.from, dateRange?.to],
    queryFn: async ({ queryKey }) => {
      const [, from, to] = queryKey;

      const baseUrl = new URL(
        `${process.env.NEXT_PUBLIC_API_URL}/api/analytics`,
      );
      if (from)
        baseUrl.searchParams.append(
          "startDate",
          new Date(from).toISOString().split("T")[0],
        );
      if (to)
        baseUrl.searchParams.append(
          "endDate",
          new Date(to).toISOString().split("T")[0],
        );

      const response = await fetch(baseUrl, {
        headers: {
          "X-Analytics-Token": "sastodeal-analytics-token-2025-secure",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch analytics data");
      }

      return response.json() as Promise<AnalyticsData>;
    },
  });
}
