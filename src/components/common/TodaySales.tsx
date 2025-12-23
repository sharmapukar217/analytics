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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { formatCurrency } from "@/lib/utils";

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

  const totalSalesCount = React.useMemo(() => {
    const orders = data?.todaysSales.orders;
    if (!orders) return 0;

    return Object.values(orders).reduce((sum, count) => sum + count, 0);
  }, [data?.todaysSales]);

  return (
    <Card className="py-4 h-fit">
      <CardHeader className="px-4">
        <div className="flex justify-between">
          <CardTitle className="flex items-center gap-2">
            <ChartLineIcon className="text-primary size-4" />
            <h1>Today&apos;s Sales</h1>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-4">
        <Tabs defaultValue="sales-amount">
          <TabsList className="w-full">
            <TabsTrigger value="sales-number">Sales (Nrs.)</TabsTrigger>
            <TabsTrigger value="sales-amount">Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="sales-amount">
            <div className="max-h-[150px]">
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
                                className="fill-foreground text-sm font-bold"
                              >
                                {totalSalesCount}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) / 1.25 + 16}
                                className="fill-muted-foreground font-medium"
                              >
                                Total Orders
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </div>
          </TabsContent>

          <TabsContent value="sales-number">
            <div className="max-h-[150px]">
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
                                className="fill-foreground text-sm font-bold"
                              >
                                {formatCurrency(totalSales)}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) / 1.25 + 16}
                                className="fill-muted-foreground font-medium"
                              >
                                Total Sales Amount
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
