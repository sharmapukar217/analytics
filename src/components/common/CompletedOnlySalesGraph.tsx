import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetAnalytics } from "@/hooks/useAnalytics";
import React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

// const chartData = [
//   { month: "January", sales: 186 },
//   { month: "February", sales: 305 },
//   { month: "March", sales: 237 },
//   { month: "April", sales: 73 },
//   { month: "May", sales: 209 },
//   { month: "June", sales: 214 },
//   { month: "July", sales: 214 },
//   { month: "August", sales: 214 },
//   { month: "September", sales: 4 },
// ];
const chartConfig = {
  sales: {
    label: "Sales",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function CompletedOnlySalesGraph() {
  const { data } = useGetAnalytics();

  const chartData = React.useMemo(() => {
    if (!data?.dailyOrderStats?.length) return [];

    const monthlyMap = new Map<string, number>();

    data.dailyOrderStats.forEach((info) => {
      const monthKey = new Date(info.date).toLocaleString("en-US", {
        month: "short",
        year: "numeric",
      });

      monthlyMap.set(
        monthKey,
        (monthlyMap.get(monthKey) ?? 0) + info.completed,
      );
    });

    return Array.from(monthlyMap, ([month, completed]) => ({
      month,
      completed,
    }));
  }, [data]);

  return (
    <div className="size-full relative">
      <div className="absolute inset-0 overflow-clip flex">
        <ChartContainer
          config={chartConfig}
          className="flex-1 overflow-auto h-[250px]"
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-sales)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-sales)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="sales"
              type="natural"
              fill="url(#fillSales)"
              fillOpacity={0.4}
              stroke="var(--color-sales)"
              stackId="a"
              dot={{ fill: "var(--color-sales)" }}
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  );
}
