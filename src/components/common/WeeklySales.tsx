"use client";

import { Button } from "@/components/ui/button";
import { ChartLineIcon, RefreshCcwIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, LabelList, Rectangle, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetAnalytics } from "@/hooks/useAnalytics";
import React from "react";

const chartConfig: ChartConfig = {
  sales: { label: "Sales" },
  sunday: { label: "Sunday", color: "var(--color-gray-100)" },
  monday: { label: "Monday", color: "var(--color-gray-100)" },
  tuesday: { label: "Tuesday", color: "var(--color-gray-100)" },
  wednesday: { label: "Wednesday", color: "var(--color-gray-100)" },
  thursday: { label: "Thursday", color: "var(--color-gray-100)" },
  friday: { label: "Friday", color: "var(--color-gray-100)" },
  saturday: { label: "Saturday", color: "var(--color-gray-100)" },
};

export default function WeeklySales() {
  const { data, refetch, isRefetching } = useGetAnalytics();

  const chartData = React.useMemo(() => {
    if (!data?.weeklySales) return [];

    const weekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    return weekDays.map((day) => {
      const daySales = data.weeklySales.find((item) => {
        const itemDate = new Date(item.date);
        return itemDate.getDay() === weekDays.indexOf(day);
      });

      return {
        day,
        sales: daySales?.value ?? null,
        fill: `var(--color-${day.toLowerCase()})`,
      };
    });
  }, [data?.weeklySales]);

  const activeIndex = React.useMemo(() => {
    if (!chartData || chartData.length === 0) return -1;
    let maxIndex = 0;
    let maxValue = chartData[0].sales ?? 0;
    chartData.forEach((item, index) => {
      if ((item.sales ?? 0) > maxValue) {
        maxValue = item.sales ?? 0;
        maxIndex = index;
      }
    });
    return maxIndex;
  }, [chartData]);

  return (
    <Card className="py-4 select-none">
      <CardHeader className="px-4">
        <div className="flex justify-between">
          <CardTitle className="flex items-center gap-2">
            <ChartLineIcon className="text-primary size-4" />
            <h1>Sales of the week</h1>
          </CardTitle>
          <Button
            size="icon"
            variant="ghost"
            disabled={isRefetching}
            onClick={() => refetch()}
          >
            <RefreshCcwIcon className={isRefetching ? "animate-spin" : ""} />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="px-4">
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent labelFormatter={(value) => value} />
              }
            />

            <Bar
              radius={8}
              dataKey="sales"
              activeIndex={activeIndex}
              activeBar={({ ...props }) => (
                <Rectangle
                  {...props}
                  strokeDasharray={4}
                  strokeDashoffset={4}
                  fill="var(--color-primary)"
                />
              )}
            >
              <LabelList position="top" className="fill-foreground" />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
