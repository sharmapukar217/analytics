"use client";

import React from "react";
import { Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useGetAnalytics } from "@/hooks/useAnalytics";

const chartConfig = {
  rides: {
    label: "Completed Orders",
  },
} satisfies ChartConfig;

export function TopTenRidersChart() {
  const { data } = useGetAnalytics();

  const chartData = React.useMemo(() => {
    if (!data?.riderStats?.topRiders) return [];

    return data.riderStats.topRiders.slice(0, 10).map((rider, index) => ({
      name: rider.riderName,
      value: rider.completedOrders,
      fill: `var(--chart-${(index % 5) + 1})`,
    }));
  }, [data]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Top 10 Riders</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="aspect-square mx-auto pb-4">
          <PieChart width={320} height={320} margin={{ top: 14, left: 14, bottom: 14, right: 14 }}>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              label={({ name, value }) => `${name} (${value})`}
              outerRadius={120}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
