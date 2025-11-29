"use client";

import { ChartLineIcon, RefreshCcwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  type ChartConfig,
  ChartTooltipContent,
  ChartTooltip,
} from "@/components/ui/chart";
import { Label, Pie, PieChart } from "recharts";
import { useGetAnalytics } from "@/hooks/useAnalytics";
import React from "react";

const chartConfig: ChartConfig = {
  count: { label: "Orders" },
  completed: { label: "Completed", color: "var(--chart-2)" },
  ongoing: { label: "Ongoing", color: "var(--chart-4)" },
  cancelled: { label: "Cancelled", color: "var(--chart-1)" },
};

export function TodaySales() {
  const { data, refetch, isRefetching } = useGetAnalytics();

  const chartData = React.useMemo(() => {
    if (!data?.todaysSales?.orders) return [];
    return [
      {
        status: "completed",
        count: data.todaysSales.orders.completed,
        fill: "var(--chart-2)",
      },
      {
        status: "ongoing",
        count: data.todaysSales.orders.active,
        fill: "var(--chart-4)",
      },
      {
        status: "cancelled",
        count: data.todaysSales.orders.cancelled,
        fill: "var(--chart-1)",
      },
      {
        status: "pending",
        count: data.todaysSales.orders.pending,
        fill: "var(--chart-3)",
      },
    ];
  }, [data?.todaysSales?.orders]);

  const totalSales = React.useMemo(
    () => data?.todaysSales?.total ?? 0,
    [data?.todaysSales?.total],
  );

  return (
    <Card className="py-4">
      <CardHeader className="px-4">
        <div className="flex justify-between">
          <CardTitle className="flex items-center gap-2">
            <ChartLineIcon className="text-primary size-4" />
            <h1>Today&apos;s Sales</h1>
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
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              innerRadius={75}
              startAngle={180}
              endAngle={0}
              cornerRadius={10}
              paddingAngle={2}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) / 1.25}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) / 1.25}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {totalSales}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) / 1.25 + 24}
                          className="fill-muted-foreground font-medium"
                        >
                          Sales
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
