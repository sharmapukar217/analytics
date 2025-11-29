import * as React from "react";
import { create } from "zustand";
import { request } from "graphql-request";
import { useQuery } from "@tanstack/react-query";

import { graphql } from "@/generated";

const AnalyticsQuery = graphql(`
	query Analytics($days: Int) {
	  analytics(days: $days) {
	    totalUsers
	    totalSales
	    totalOrders {
	      active
	      pending
	      completed
	      cancelled
	    }
	    usersByMonth {
	      month
	      value
	    }
	    salesByMonth {
	      month
	      value
	    }
	    ordersByMonth {
	      month
	      value
	    }
	    todaysSales {
	      total
	      orders {
	        active
	        pending
	        completed
	        cancelled
	      }
	    }
	    weeklySales {
	      day
	      date
	      value
	    }
	    overallSalesReport {
	      all
	      completed
	    }
	  }
	}
`);

interface DaysState {
  days: string;
  setDays: (value: string) => void;
}

export const useDays = create<DaysState>((set) => ({
  days: "1",
  setDays: (value: string) => set({ days: value }),
}));

export function useGetAnalytics() {
  const { days } = useDays();

  return useQuery({
    enabled: !!days,
    queryKey: ["analytics", days],
    queryFn: ({ queryKey }) => {
      return request("/admin-api", AnalyticsQuery, {
        days: parseInt(queryKey[1] || "1"),
      }).then((r) => r.analytics);
    },
  });
}
