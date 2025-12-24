"use client";

import * as React from "react";
import { toPng } from "html-to-image";
import {
  BadgeDollarSignIcon,
  UsersIcon,
  TruckIcon,
  ClockIcon,
  CheckCheckIcon,
  XCircleIcon,
  CircleQuestionMark,
  XIcon,
  LoaderIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDateRange, useGetAnalytics } from "@/hooks/useAnalytics";
import { AnalyticsDateRangePicker } from "@/components/analytics/AnalyticsDateRangePicker";
import { Progress } from "@/components/ui/progress";
import { TodaySales } from "@/components/common/TodaySales";
import { StatsCard } from "@/components/common/StatsCard";
import WeeklySales from "@/components/common/WeeklySales";
import { SalesGraph } from "@/components/common/SalesGraph";
import { TopSellingProducts } from "@/components/common/TopSellingProducts";
import { MonthlyReport } from "@/components/common/MonthlyReport";
import { formatCurrency } from "@/lib/utils";
import { ChannelWiseAnalytics } from "@/components/common/ChannelWiseAnalytics";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { DateRange } from "react-day-picker";
import { Tabs } from "radix-ui";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TopTenRidersChart } from "@/components/common/TopTenRidersChart";
import { RidersTable } from "@/components/common/RidersTable";
import Link from "next/link";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useCurrentChannel, useGetChannels } from "@/hooks/useChannels";

function ChannelSelect() {
  const channelsQuery = useGetChannels();
  const { currentChannel, setCurrentChannel } = useCurrentChannel();
  const { isLoading } = useGetAnalytics();

  const channels = React.useMemo(() => {
    return channelsQuery.data || [];
  }, [channelsQuery.data]);

  React.useEffect(() => {
    if (!currentChannel && !!channels.length) {
      setCurrentChannel(channels[0]);
    }
  }, [channelsQuery, currentChannel, setCurrentChannel]);

  if ((!channelsQuery.isLoading && !channels.length) || channels.length <= 1) {
    return null;
  }

  return (
    <Select
      value={currentChannel?.token}
      onValueChange={(channelToken) => {
        setCurrentChannel(channels.find((ch) => ch.token === channelToken));
      }}
    >
      <SelectTrigger size="sm" className="relative">
        <SelectValue placeholder="Default Channel" />
        {isLoading ? (
          <div className="absolute right-3 inset-y-0 flex items-center justify-center bg-background z-100">
            <LoaderIcon className="animate-spin" />
          </div>
        ) : null}
      </SelectTrigger>
      <SelectContent align="start">
        {channels.map((channel) => (
          <SelectItem key={channel.token} value={channel.token}>
            {channel.code}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function getDateRangeLabel({ date }: { date: DateRange | undefined }) {
  if (!date?.from) return "sales_report";
  if (!date.to) return date.from.toLocaleDateString();
  return `${date.from.toLocaleDateString()}_to_${date.to.toLocaleDateString()}`;
}

function DashboardHeader() {
  const { dateRange } = useDateRange();
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const { mutate, error, reset, isPending } = useMutation({
    networkMode: "always",
    mutationKey: ["export-to-png"],
    async mutationFn() {
      const mainContent = document.getElementById("main-content");
      if (!mainContent) throw new Error("Main content not found!");

      const link = Object.assign(document.createElement("a"), {
        href: await toPng(mainContent),
        download: getDateRangeLabel({ date: dateRange }),
      });

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  });

  React.useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (error) timeoutRef.current = setTimeout(() => reset(), 3000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [error]);

  return (
    <header className="p-4 flex flex-col sm:flex-row gap-4 items-center">
      <div className="ms-auto inline-flex items-center gap-4">
        <ChannelSelect />

        <AnalyticsDateRangePicker />
        <Button
          size="sm"
          disabled={isPending}
          variant={error ? "destructive" : "outline"}
          onClick={() => mutate()}
        >
          {isPending ? "Exporting..." : error ? "Retry" : "Export"}
        </Button>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" asChild>
              <Link
                rel="noopener noreferrer"
                href="https://docs.google.com/document/d/1CuIDO6uZLr2dvsTIatDj7rUErNAdCoR6MdDD_6SUdV0/edit?tab=t.0"
                target="_blank"
              >
                <CircleQuestionMark />
              </Link>
            </Button>
          </TooltipTrigger>

          <TooltipContent>User Guide</TooltipContent>
        </Tooltip>
      </div>
    </header>
  );
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const getPercentage = (fraction: number, total: number): number => {
  if (!total) return 0;
  return Number(((fraction / total) * 100).toFixed(2));
};

export default function AnalyticsPage() {
  const { data, isLoading, error } = useGetAnalytics();

  const totalActiveOrdersToday = data?.todaysSales.orders.active || 0;
  const totalCompletedOrdersToday = data?.todaysSales.orders.completed || 0;
  const totalPendingOrdersToday = data?.todaysSales.orders.pending || 0;
  const totalCancelledOrdersToday = data?.todaysSales.orders.cancelled || 0;

  const totalOrdersToday =
    totalActiveOrdersToday +
    totalCompletedOrdersToday +
    totalPendingOrdersToday +
    totalCancelledOrdersToday;

  const overallTotalActiveOrders = data?.totalOrders.active || 0;
  const overallCompletedOrders = data?.totalOrders.completed || 0;
  const overallPendingOrders = data?.totalOrders.pending || 0;
  const overallCancelledOrders = data?.totalOrders.cancelled || 0;

  const totalOverallOrders =
    overallTotalActiveOrders +
    overallCompletedOrders +
    overallPendingOrders +
    overallCancelledOrders;

  return (
    <div className="container pb-8">
      <DashboardHeader />

      <main id="main-content">
        <div className="grid gap-2">
          <strong>Today&apos;s Sales</strong>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
            <div className="flex flex-col gap-4 h-full">
              <Card className="w-full h-fit gap-0 py-0 overflow-clip">
                <CardHeader className="border-b pt-6">
                  <h1 className="text-sm font-medium text-muted-foreground group-data-[state=active]:text-primary/85">
                    Sales Overview
                  </h1>
                  <h2 className="text-xl font-semibold group-data-[state=active]:text-primary">
                    {formatCurrency(data?.todaysSales.total)}
                  </h2>
                </CardHeader>

                <CardContent className="grid relative">
                  <div className="relative grid grid-cols-2 py-8">
                    <div className="grid gap-4">
                      <div className="inline-flex items-center gap-2">
                        {/*<div className="flex items-center justify-center size-9 bg-green-500 text-white rounded-lg">
                            <CheckCheckIcon className="size-5" />
                          </div>*/}

                        <img src="/delivered.png" className="h-9 object-fit" />

                        <div className="grid">
                          <h2 className="text-sm font-semibold">Delivered</h2>
                          <div className="space-y-1">
                            <h3 className="text-sm font-medium">
                              {data?.todaysSales.orders.completed}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="absolute inset-y-0 flex flex-col gap-1 items-center justify-center left-1/2 -translate-x-1/2">
                      <div className="w-0.5 h-full bg-muted rounded-full" />
                      <div className="size-8 shrink-0 flex items-center justify-center bg-muted rounded-full text-xs font-medium text-muted-foreground">
                        Vs
                      </div>
                      <div className="w-0.5 h-full bg-muted rounded-full" />
                    </div>

                    <div className="grid gap-4 px-4 ps-8">
                      <div className="inline-flex items-center gap-2">
                        <img src="/cancelled.png" className="h-9 object-fit" />

                        <div className="grid">
                          <h2 className="text-sm font-semibold">Cancelled</h2>
                          <div className="space-y-1">
                            <h3 className="text-sm font-medium">
                              {data?.todaysSales.orders.cancelled}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <TodaySales />
            </div>

            <div className="grid gap-4 h-fit">
              <Card className="w-full gap-0 h-fit md">
                <CardHeader>
                  <h1 className="text-lg font-medium">Statistics</h1>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid">
                    <div className="flex items-center justify-between">
                      <h1 className="font-medium text-sm">Delivered Orders</h1>
                    </div>

                    <div className="mt-2 space-y-0.5">
                      <div className="flex items-center justify-between">
                        <h2 className="text-muted-foreground font-medium text-xs">
                          {totalCompletedOrdersToday} completed order(s) out of{" "}
                          {totalOrdersToday} total.
                        </h2>
                        <h2 className="text-green-500 text-xs">
                          {getPercentage(
                            totalCompletedOrdersToday,
                            totalOrdersToday,
                          )}
                          %
                        </h2>
                      </div>
                      <Progress
                        value={getPercentage(
                          totalCompletedOrdersToday,
                          totalOrdersToday,
                        )}
                        indicatorClassName="bg-green-500"
                      />
                    </div>
                  </div>

                  <div className="grid">
                    <div className="flex items-center justify-between">
                      <h1 className="font-medium text-sm">
                        Delivery in-progress
                      </h1>
                    </div>

                    <div className="mt-2 space-y-0.5">
                      <div className="flex items-center justify-between">
                        <h2 className="text-muted-foreground font-medium text-xs">
                          {totalPendingOrdersToday} pending order(s) out of{" "}
                          {totalOrdersToday} total.
                        </h2>
                        <h2 className="text-muted-foreground text-xs">
                          {getPercentage(
                            totalPendingOrdersToday,
                            totalOrdersToday,
                          )}
                          %
                        </h2>
                      </div>
                      <Progress
                        value={getPercentage(
                          totalPendingOrdersToday,
                          totalOrdersToday,
                        )}
                        indicatorClassName="bg-muted-foreground"
                      />
                    </div>
                  </div>

                  <div className="grid">
                    <div className="flex items-center justify-between">
                      <h1 className="font-medium text-sm">Unassigned orders</h1>
                    </div>

                    <div className="mt-2 space-y-0.5">
                      <div className="flex items-center justify-between">
                        <h2 className="text-muted-foreground font-medium text-xs">
                          {totalActiveOrdersToday} order(s) in delivery out of{" "}
                          {totalOrdersToday} total.
                        </h2>
                        <h2 className="text-primary text-xs">
                          {getPercentage(
                            totalActiveOrdersToday,
                            totalOrdersToday,
                          )}
                          %
                        </h2>
                      </div>
                      <Progress
                        value={getPercentage(
                          totalActiveOrdersToday,
                          totalOrdersToday,
                        )}
                      />
                    </div>
                  </div>

                  <div className="grid">
                    <div className="flex items-center justify-between">
                      <h1 className="font-medium text-sm">Cancelled Orders</h1>
                    </div>

                    <div className="mt-2 space-y-0.5">
                      <div className="flex items-center justify-between">
                        <h2 className="text-muted-foreground font-medium text-xs">
                          {totalCancelledOrdersToday} cancelled order(s) out of{" "}
                          {totalOrdersToday} total.
                        </h2>
                        <h2 className="text-destructive text-xs">
                          {getPercentage(
                            totalCancelledOrdersToday,
                            totalOrdersToday,
                          )}
                          %
                        </h2>
                      </div>
                      <Progress
                        value={getPercentage(
                          totalCancelledOrdersToday,
                          totalOrdersToday,
                        )}
                        indicatorClassName="bg-destructive"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-2">
                <strong>Today&apos;s Orders</strong>
                <div className="h-fit grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center rounded-md justify-center size-9 bg-primary/10 text-primary">
                          <TruckIcon />
                        </div>
                        <h2 className="text-lg font-medium">
                          {totalOrdersToday}
                        </h2>
                      </div>

                      <div className="grid">
                        <h3 className="text-sm font-semibold">Total Orders</h3>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="h-fit">
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center rounded-md justify-center size-9 bg-muted text-muted-foreground">
                          <XIcon />
                        </div>
                        <h2 className="text-lg font-medium">
                          {data?.todaysSales.orders.active}
                        </h2>
                      </div>

                      <div className="grid">
                        <h3 className="text-sm font-semibold">
                          Unassigned orders
                        </h3>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="h-fit">
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center rounded-md justify-center size-9 bg-muted text-muted-foreground">
                          <ClockIcon />
                        </div>
                        <h2 className="text-lg font-medium">
                          {data?.todaysSales.orders.pending}
                        </h2>
                      </div>

                      <div className="grid">
                        <h3 className="text-sm font-semibold">
                          Delivery in-progress
                        </h3>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="h-fit">
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center rounded-md justify-center size-9 bg-destructive/10 text-destructive">
                          <ClockIcon />
                        </div>
                        <h2 className="text-lg font-medium">
                          {data?.todaysSales.orders.cancelled}
                        </h2>
                      </div>

                      <div className="grid">
                        <h3 className="text-sm font-semibold">
                          Cancelled Orders
                        </h3>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="h-fit">
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center rounded-md justify-center size-9 bg-green-500/10 text-green-500">
                          <CheckCheckIcon />
                        </div>
                        <h2 className="text-lg font-medium">
                          {data?.todaysSales.orders.completed}
                        </h2>
                      </div>

                      <div className="grid">
                        <h3 className="text-sm font-semibold">
                          Delivered Orders
                        </h3>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            <div className="flex-1 grid gap-4">
              <TopSellingProducts />
              <WeeklySales />
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4">
          <strong>Overall Sales Report</strong>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 select-none">
            <StatsCard
              title="Total Users"
              icon={UsersIcon}
              value={data?.totalUsers || 0}
              previousValue={0}
              chartData={data?.usersByMonth || []}
              chartConfig={{
                value: {
                  label: "Users",
                  color: "var(--chart-2)",
                },
              }}
              dataKey="value"
              classNames={{
                badgeClassName: "bg-green-500/10 text-green-500",
              }}
            />

            <StatsCard
              title="Total Orders"
              icon={UsersIcon}
              value={
                data?.ordersByMonth.reduce(
                  (current, order) => current + order.value,
                  0,
                ) || 0
              }
              previousValue={0}
              chartData={data?.ordersByMonth || []}
              chartConfig={{
                value: {
                  label: "Orders",
                  color: "var(--chart-2)",
                },
              }}
              dataKey="value"
              classNames={{
                badgeClassName: "bg-green-500/10 text-green-500",
              }}
            />

            <StatsCard
              title="Total Sales"
              icon={BadgeDollarSignIcon}
              value={formatCurrency(data?.totalSales)}
              previousValue={0}
              chartData={data?.salesByMonth || []}
              chartConfig={{
                value: {
                  label: "Sales",
                  color: "var(--chart-1)",
                },
              }}
              dataKey="value"
              classNames={{
                badgeClassName: "bg-red-500/10 text-red-500",
              }}
            />

            {/* TODO: Replace with actual analytics data */}
            {/*<StatsCard
                 title="Total Reviews"
                 icon={SmileIcon}
                 value={0}
                 previousValue={10}
                 chartData={[
                   { month: "January", reviews: 2 },
                   { month: "February", reviews: 7 },
                   { month: "March", reviews: 3 },
                   { month: "April", reviews: 0 },
                   { month: "May", reviews: 4 },
                   { month: "June", reviews: 7 },
                 ]}
                 chartConfig={{
                   reviews: {
                     label: "Reviews",
                     color: "var(--chart-2)",
                   },
                 }}
                 dataKey="reviews"
                 classNames={{
                   badgeClassName: "bg-green-500/10 text-green-500",
                 }}
               />*/}
          </div>

          <SalesGraph />
        </div>

        <div className="grid lg:grid-cols-2 gap-4 mt-4">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-4">
            <Card>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center rounded-md justify-center size-9 bg-primary/10 text-primary">
                    <TruckIcon />
                  </div>
                  <h2 className="text-lg font-medium">{totalOverallOrders}</h2>
                </div>

                <div className="grid">
                  <h3 className="text-sm font-semibold">Total Orders</h3>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center rounded-md justify-center size-9 bg-primary/10 text-primary">
                    <TruckIcon />
                  </div>
                  <h2 className="text-lg font-medium">
                    {overallTotalActiveOrders}
                  </h2>
                </div>

                <div className="grid">
                  <h3 className="text-sm font-semibold">
                    Total Unassigned Orders
                  </h3>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center rounded-md justify-center size-9 bg-muted text-muted-foreground">
                    <ClockIcon />
                  </div>
                  <h2 className="text-lg font-medium">
                    {overallPendingOrders}
                  </h2>
                </div>

                <div className="grid">
                  <h3 className="text-sm font-semibold">
                    Delivery in-progress
                  </h3>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center rounded-md justify-center size-9 bg-destructive/10 text-destructive">
                    <ClockIcon />
                  </div>
                  <h2 className="text-lg font-medium">
                    {overallCancelledOrders}
                  </h2>
                </div>

                <div className="grid">
                  <h3 className="text-sm font-semibold">Cancelled Orders</h3>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center rounded-md justify-center size-9 bg-green-500/10 text-green-500">
                    <CheckCheckIcon />
                  </div>
                  <h2 className="text-lg font-medium">
                    {overallCompletedOrders}
                  </h2>
                </div>

                <div className="grid">
                  <h3 className="text-sm font-semibold">Delivered Orders</h3>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="w-full h-full gap-0 py-0 overflow-clip">
            <CardHeader className="border-b pt-6">
              <h1 className="text-sm font-medium text-muted-foreground group-data-[state=active]:text-primary/85">
                Payments
              </h1>
              <h2 className="text-xl font-semibold group-data-[state=active]:text-primary">
                {formatCurrency(data?.totalSales)}
              </h2>
            </CardHeader>

            <CardContent className="grid relative h-full py-8">
              <div className="relative grid grid-cols-2">
                <div className="grid gap-4">
                  <div className="inline-flex items-center gap-2">
                    <img src="/cod.png" className="h-9 object-fit" />

                    <div className="grid">
                      <h2 className="text-sm font-semibold">COD</h2>
                      <div className="space-y-1">
                        <Tooltip>
                          <TooltipTrigger>
                            <h3 className="text-sm font-medium overflow-clip text-ellipsis max-w-[18ch]">
                              {formatCurrency(data?.payments.cod)}
                            </h3>
                          </TooltipTrigger>
                          <TooltipContent>
                            {formatCurrency(data?.payments.cod)}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-y-0 flex flex-col gap-1 items-center justify-center left-1/2 -translate-x-1/2">
                  <div className="w-0.5 h-full bg-muted rounded-full" />
                  <div className="size-8 shrink-0 flex items-center justify-center bg-muted rounded-full text-xs font-medium text-muted-foreground">
                    Vs
                  </div>
                  <div className="w-0.5 h-full bg-muted rounded-full" />
                </div>

                <div className="grid gap-4 px-4 ps-8">
                  <div className="inline-flex items-center gap-2">
                    <img src="/khalti.webp" className="size-8" />

                    <div className="grid">
                      <h2 className="text-sm font-semibold">Khalti</h2>
                      <div className="space-y-1">
                        <Tooltip>
                          <TooltipTrigger>
                            <h3 className="text-sm font-medium overflow-clip text-ellipsis max-w-[12ch]">
                              {formatCurrency(data?.payments.khalti)}
                            </h3>
                          </TooltipTrigger>
                          <TooltipContent>
                            {formatCurrency(data?.payments.khalti)}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 mt-4 gap-4">
          <div>
            <ChannelWiseAnalytics />
          </div>

          <div>
            <MonthlyReport />
          </div>
        </div>

        <div className="grid md:grid-cols-2 mt-4 h-102 overflow-clip gap-4">
          <div>
            <TopTenRidersChart />
          </div>

          <div>
            <RidersTable />
          </div>
        </div>
      </main>
    </div>
  );
}
