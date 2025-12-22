"use client";

import React from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { formatCurrency } from "@/lib/utils";

export function MonthlyReport() {
  return (
    <Tabs defaultValue="sales">
      <Card className="py-4 select-none h-fit">
        <CardHeader className="px-4">
          <CardTitle className="flex items-center gap-2">
            <h1>Monthly Report</h1>
          </CardTitle>

          <TabsList className="w-full">
            <TabsTrigger value="sales">Sales by month</TabsTrigger>
            <TabsTrigger value="orders">Orders by month</TabsTrigger>
          </TabsList>
        </CardHeader>

        <CardContent>
          <TabsContent value="sales">
            <SalesByMonth />
          </TabsContent>

          <TabsContent value="orders">
            <OrdersByMonth />
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  );
}

function SalesByMonth() {
  const { data, refetch, isRefetching } = useGetAnalytics();

  const chartData = React.useMemo(() => {
    if (!data?.salesByMonth) return [];

    return data.salesByMonth.map((item) => ({
      month: item.month,
      sales: item.value,
      fill: `var(--color-${item.month.toLowerCase()})`,
    }));
  }, [data?.salesByMonth]);

  const chartConfig = React.useMemo<ChartConfig>(() => {
    if (!data?.salesByMonth) return {};

    return data.salesByMonth.reduce(
      (acc, item) => {
        acc[item.month.toLowerCase()] = {
          label: item.month,
          color: "var(--color-gray-100)",
        };
        return acc;
      },
      { sales: { label: "Sales" } } as ChartConfig,
    );
  }, [data?.salesByMonth]);

  const activeIndex = React.useMemo(() => {
    if (!chartData.length) return -1;

    let maxIndex = 0;
    let maxValue = chartData[0].sales;

    chartData.forEach((item, index) => {
      if (item.sales > maxValue) {
        maxValue = item.sales;
        maxIndex = index;
      }
    });

    return maxIndex;
  }, [chartData]);

  return (
    <CardContent className="px-4 max-w-full">
      <ChartContainer config={chartConfig}>
        <BarChart accessibilityLayer data={chartData} margin={{ top: 24 }}>
          <XAxis
            dataKey="month"
            tickMargin={10}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />

          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent labelFormatter={(value) => value} />}
          />

          <Bar
            radius={8}
            barSize={40}
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
            <LabelList
              position="top"
              className="fill-foreground"
              fontSize={7}
              formatter={(value: number) => formatCurrency(value)}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </CardContent>
  );
}

function OrdersByMonth() {
  const { data, refetch, isRefetching } = useGetAnalytics();

  const chartData = React.useMemo(() => {
    if (!data?.ordersByMonth) return [];

    return data.ordersByMonth.map((item) => ({
      month: item.month,
      orders: item.value,
      fill: `var(--color-${item.month.toLowerCase()})`,
    }));
  }, [data?.ordersByMonth]);

  const chartConfig = React.useMemo<ChartConfig>(() => {
    if (!data?.ordersByMonth) return {};

    return data.ordersByMonth.reduce(
      (acc, item) => {
        acc[item.month.toLowerCase()] = {
          label: item.month,
          color: "var(--color-gray-100)",
        };
        return acc;
      },
      { orders: { label: "Orders" } } as ChartConfig,
    );
  }, [data?.ordersByMonth]);

  const activeIndex = React.useMemo(() => {
    if (!chartData.length) return -1;

    let maxIndex = 0;
    let maxValue = chartData[0].orders;

    chartData.forEach((item, index) => {
      if (item.orders > maxValue) {
        maxValue = item.orders;
        maxIndex = index;
      }
    });

    return maxIndex;
  }, [chartData]);

  return (
    <CardContent className="px-4">
      <ChartContainer config={chartConfig}>
        <BarChart accessibilityLayer data={chartData} margin={{ top: 24 }}>
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />

          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent labelFormatter={(value) => value} />}
          />

          <Bar
            radius={8}
            dataKey="orders"
            barSize={40}
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
            <LabelList
              position="top"
              fontSize={7}
              className="fill-foreground"
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </CardContent>
  );
}
