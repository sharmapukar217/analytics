import type { DateRange } from "react-day-picker";

export interface AnalyticsData {
  totalUsers: number;
  totalSales: number;
  totalOrders: {
    active: number;
    pending: number;
    completed: number;
    cancelled: number;
  };
  usersByMonth: Array<{
    month: string;
    value: number;
  }>;
  salesByMonth: Array<{
    month: string;
    value: number;
  }>;
  ordersByMonth: Array<{
    month: string;
    value: number;
  }>;
  todaysSales: {
    total: number;
    orders: {
      active: number;
      pending: number;
      completed: number;
      cancelled: number;
    };
  };
  weeklySales: Array<{
    day: string;
    date: string;
    value: number;
  }>;
  overallSalesReport: {
    all: number;
    completed: number;
  };
  channelWiseAnalytics: Array<{
    channelId: string;
    channelCode: string;
    channelName: string;
    totalCompletedOrders: number;
    totalSales: number;
  }>;
  mostSoldProductVariants: {
    overall: Array<{
      productVariantId: number;
      productVariantName: string;
      productVariantSku: string;
      totalQuantitySold: number;
      totalSales: number;
    }>;
    byChannel: Array<{
      channelId: string;
      channelCode: string;
      channelName: string;
      variants: Array<{
        productVariantId: number;
        productVariantName: string;
        productVariantSku: string;
        totalQuantitySold: number;
        totalSales: number;
      }>;
    }>;
  };
}
