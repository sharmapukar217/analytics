"use client";

import * as React from "react";
import { BarChart, Bar, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetAnalytics } from "@/hooks/useAnalytics";

// const chartData = [
//   { date: "2025-01-01", all: 500, completed: 420, cancelled: 80 },
//   { date: "2025-01-02", all: 520, completed: 430, cancelled: 90 },
//   { date: "2025-01-03", all: 480, completed: 400, cancelled: 80 },
//   { date: "2025-01-04", all: 550, completed: 470, cancelled: 80 },
//   { date: "2025-01-05", all: 600, completed: 500, cancelled: 100 },
//   { date: "2025-01-06", all: 620, completed: 520, cancelled: 100 },
//   { date: "2025-01-07", all: 580, completed: 480, cancelled: 100 },
//   { date: "2025-01-08", all: 590, completed: 490, cancelled: 100 },
//   { date: "2025-01-09", all: 610, completed: 510, cancelled: 100 },
//   { date: "2025-01-10", all: 630, completed: 520, cancelled: 110 },
//   { date: "2025-01-11", all: 650, completed: 540, cancelled: 110 },
//   { date: "2025-01-12", all: 670, completed: 560, cancelled: 110 },
//   { date: "2025-01-13", all: 690, completed: 580, cancelled: 110 },
//   { date: "2025-01-14", all: 700, completed: 600, cancelled: 100 },
//   { date: "2025-01-15", all: 720, completed: 620, cancelled: 100 },
//   { date: "2025-01-16", all: 710, completed: 610, cancelled: 100 },
//   { date: "2025-01-17", all: 730, completed: 630, cancelled: 100 },
//   { date: "2025-01-18", all: 740, completed: 640, cancelled: 100 },
//   { date: "2025-01-19", all: 750, completed: 650, cancelled: 100 },
//   { date: "2025-01-20", all: 760, completed: 660, cancelled: 100 },
// ];

const chartConfig = {
  all: { label: "All", color: "var(--primary)" },
  completed: { label: "Completed", color: "var(--chart-2)" },
  cancelled: { label: "Cancelled", color: "var(--chart-1)" },
} satisfies ChartConfig;

export function AllSalesGraph() {
  const barWidth = 120;
  const { data } = useGetAnalytics();

  const chartData = React.useMemo(() => {
    if (!data?.dailyOrderStats?.length) return [];
    return data.dailyOrderStats.flatMap((info) => info).reverse();
  }, [data]);
  const chartWidth = chartData.length * barWidth;

  return (
    <div className="relative overflow-auto scrollbar-hidden h-[250px]">
      <div className="absolute inset-0" style={{ minWidth: chartWidth }}>
        <ChartContainer config={chartConfig} className="size-full">
          <BarChart
            width={chartWidth}
            height={250}
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
              }
            />

            <Bar radius={4} dataKey="all" fill="var(--color-all)" />
            <Bar radius={4} dataKey="completed" fill="var(--color-completed)" />
            <Bar radius={4} dataKey="cancelled" fill="var(--color-cancelled)" />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}
