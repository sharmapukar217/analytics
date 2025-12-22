"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, LabelList, Rectangle, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetAnalytics } from "@/hooks/useAnalytics";
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { formatCurrency } from "@/lib/utils";

export default function WeeklySales() {
  const { data, refetch, isRefetching } = useGetAnalytics();

  return (
    <Tabs defaultValue="sales">
      <Card className="py-4 select-none h-fit">
        <CardHeader className="px-4">
          <CardTitle className="flex items-center gap-2">
            <h1>Weekly Report</h1>
          </CardTitle>
          <TabsList className="w-full mt-1">
            <TabsTrigger value="sales">Sales ( Nrs. )</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>
        </CardHeader>

        <CardContent className="px-4">
          <TabsContent value="sales">
            <SalesChart />
          </TabsContent>

          <TabsContent value="orders">
            <OrdersChart />
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  );
}

function SalesChart() {
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
    <ChartContainer
      config={{
        sales: { label: "Sales" },
        sunday: { label: "Sunday", color: "var(--color-gray-100)" },
        monday: { label: "Monday", color: "var(--color-gray-100)" },
        tuesday: { label: "Tuesday", color: "var(--color-gray-100)" },
        wednesday: { label: "Wednesday", color: "var(--color-gray-100)" },
        thursday: { label: "Thursday", color: "var(--color-gray-100)" },
        friday: { label: "Friday", color: "var(--color-gray-100)" },
        saturday: { label: "Saturday", color: "var(--color-gray-100)" },
      }}
    >
      <BarChart accessibilityLayer data={chartData} margin={{ top: 24 }}>
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
            <ChartTooltipContent
              labelFormatter={(value) => value}
              formatter={(value) => formatCurrency(value as number)}
            />
          }
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
          />{" "}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}

function OrdersChart() {
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
        orders: daySales?.orderCount ?? null,
        fill: `var(--color-${day.toLowerCase()})`,
      };
    });
  }, [data?.weeklySales]);

  const activeIndex = React.useMemo(() => {
    if (!chartData || chartData.length === 0) return -1;
    let maxIndex = 0;
    let maxValue = chartData[0].orders ?? 0;
    chartData.forEach((item, index) => {
      if ((item.orders ?? 0) > maxValue) {
        maxValue = item.orders ?? 0;
        maxIndex = index;
      }
    });
    return maxIndex;
  }, [chartData]);

  return (
    <ChartContainer
      config={{
        orders: { label: "Orders" },
        sunday: { label: "Sunday", color: "var(--color-gray-100)" },
        monday: { label: "Monday", color: "var(--color-gray-100)" },
        tuesday: { label: "Tuesday", color: "var(--color-gray-100)" },
        wednesday: { label: "Wednesday", color: "var(--color-gray-100)" },
        thursday: { label: "Thursday", color: "var(--color-gray-100)" },
        friday: { label: "Friday", color: "var(--color-gray-100)" },
        saturday: { label: "Saturday", color: "var(--color-gray-100)" },
      }}
    >
      <BarChart accessibilityLayer data={chartData} margin={{ top: 24 }}>
        <XAxis
          dataKey="day"
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
          <LabelList position="top" className="fill-foreground" fontSize={7} />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
