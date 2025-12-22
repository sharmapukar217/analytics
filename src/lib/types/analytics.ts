// export interface AnalyticsData {
//   totalUsers: number;
//   totalSales: number;

//   totalOrders: {
//     active: number;
//     pending: number;
//     completed: number;
//     cancelled: number;
//   };

//   usersByMonth: MonthValue[];
//   salesByMonth: MonthValue[];
//   ordersByMonth: MonthValue[];

//   todaysSales: {
//     total: number;
//     orders: {
//       active: number;
//       pending: number;
//       completed: number;
//       cancelled: number;
//     };
//   };

//   weeklySales: WeeklySales[];

//   dailyOrderStats: DailyOrderStat[];

//   overallSalesReport: {
//     all: number;
//     completed: number;
//   };

//   channelWiseAnalytics: ChannelWiseAnalytics[];
// }

// export interface MonthValue {
//   month: string;
//   value: number;
// }

// export interface WeeklySales {
//   day: string;
//   date: string;
//   value: number;
//   orderCount: number;
// }

// export interface DailyOrderStat {
//   date: string;
//   all: number;
//   com2leted: number;
//   cancelled: number;
// }

// export interface ChannelWiseAnalytics {
//   channelId: string;
//   channelCode: string;
//   channelName: string;
//   totalCompletedOrders: number;
//   totalSales: number;
// }

export type AnalyticsData = {
  totalUsers: number;
  totalSales: number;
  totalOrders: {
    active: number;
    pending: number;
    completed: number;
    cancelled: number;
  };
  usersByMonth: {
    month: string;
    value: number;
  }[];
  salesByMonth: {
    month: string;
    value: number;
  }[];
  ordersByMonth: {
    month: string;
    value: number;
  }[];
  todaysSales: {
    total: number;
    orders: {
      active: number;
      pending: number;
      completed: number;
      cancelled: number;
    };
  };
  weeklySales: {
    day: string;
    date: string;
    value: number;
    orderCount: number;
  }[];
  dailyOrderStats: {
    date: string;
    all: number;
    completed: number;
    cancelled: number;
  }[];
  overallSalesReport: {
    all: number;
    completed: number;
  };
  channelWiseAnalytics: {
    channelId: string;
    channelCode: string;
    channelName: string;
    totalCompletedOrders: number;
    totalSales: number;
  }[];
  mostSoldProductVariants: {
    overall: {
      productVariantId: number;
      productVariantName: string;
      productVariantSku: string;
      totalQuantitySold: number;
      totalSales: number;
    }[];
    byChannel: {
      channelId: string;
      channelCode: string;
      channelName: string;
      variants: {
        productVariantId: number;
        productVariantName: string;
        productVariantSku: string;
        totalQuantitySold: number;
        totalSales: number;
      }[];
    }[];
  };
  riderStats: {
    topRiders: {
      riderId: string;
      riderName: string;
      riderEmail: string;
      completedOrders: number;
    }[];
    allRiders: {
      riderId: string;
      riderName: string;
      riderEmail: string;
      completedOrders: number;
    }[];
  };
  payments: {
    cod: number;
    khalti: number;
  };
};
