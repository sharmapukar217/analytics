"use client";

import * as React from "react";
import { DashboardSidebar } from "@/components/layouts/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  BadgeDollarSignIcon,
  CalendarIcon,
  CheckCircleIcon,
  ChevronDown,
  CircleXIcon,
  HourglassIcon,
  ScrollTextIcon,
  SmileIcon,
  UsersIcon,
} from "lucide-react";
import type { DateRange } from "react-day-picker";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";
import { Select, SelectContent, SelectItem } from "@/components/ui/select";
import { SelectTrigger } from "@radix-ui/react-select";

import { StatsCard } from "@/components/common/StatsCard";
import WeeklySales from "@/components/common/WeeklySales";
import { TodaySales } from "@/components/common/TodaySales";
import { SalesGraph } from "@/components/common/SalesGraph";
import { OrdersStats } from "@/components/common/OrdersStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TodaysOrderCard } from "@/components/common/todays-orders/TodaysOrderCard";
import { useDays, useGetAnalytics } from "@/hooks/useAnalytics";

export default function Home() {
  const { data } = useGetAnalytics();

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset className="bg-muted">
        <DashboardHeader />
        <main className="px-4 py-2 space-y-4">
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-4 select-none">
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
                data?.ordersByMonth.reduce((current, order) => current + order.value, 0)
                || 0
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
              value={data?.totalSales || 0}
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 select-none">
            <OrdersStats
              title="Active Orders"
              icon={<ScrollTextIcon className="size-4 text-primary" />}
              value={data?.todaysSales.orders.active || 0}
            />

            <OrdersStats
              title="Pending Orders"
              icon={<HourglassIcon className="size-4 text-orange-500" />}
              value={data?.todaysSales.orders.pending || 0}
            />

            <OrdersStats
              title="Completed Orders"
              icon={<CheckCircleIcon className="size-4 text-green-500" />}
              value={data?.todaysSales.orders.completed || 0}
            />

            <OrdersStats
              title="Cancelled Orders"
              icon={<CircleXIcon className="size-4 text-destructive" />}
              value={data?.todaysSales.orders.cancelled || 0}
            />
          </div>

          <div className="grid lg:grid-cols-12 gap-4">
            <div className="lg:col-span-4">
              <TodaySales />
            </div>
            <div className="lg:col-span-8">
              <SalesGraph />
            </div>
            <div className="lg:col-span-8">
              <TodaysOrderCard />
            </div>

            <div className="lg:col-span-4">
              <WeeklySales />
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function DateRangeLabel({ date }: { date?: DateRange }) {
  if (!date?.from) return "Select a date";

  if (date.to && date.from.toDateString() !== date.to.toDateString()) {
    return `${formatDate(date.from)} - ${formatDate(date.to)}`;
  }

  return formatDate(date.from);
}

function DashboardHeader() {
  const { days, setDays } = useDays();
  const [date, setDate] = React.useState<DateRange | undefined>();

  return (
    <header className="p-4 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
      <h1 className="font-semibold text-lg">Analytics</h1>
      <div className="inline-flex items-center gap-4">
        <Popover>
          <ButtonGroup className="select-none">
            <PopoverTrigger asChild>
              <Button
                size="sm"
                variant="secondary"
                className="bg-card hover:bg-card/85 text-xs rounded-full min-w-36"
              >
                <CalendarIcon className="size-3" />
                <DateRangeLabel date={date} />
              </Button>
            </PopoverTrigger>

            <ButtonGroupSeparator />

            <Select value={days} onValueChange={setDays}>
              <SelectTrigger asChild>
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-card hover:bg-card/85 text-xs rounded-full group"
                >
                  Last {days} day(s)
                  <ChevronDown className="group-data-[state=open]:rotate-180 duration-500 size-3" />
                </Button>
              </SelectTrigger>

              <SelectContent align="end">
                <SelectItem value="1">Last 1 day</SelectItem>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
              </SelectContent>
            </Select>
          </ButtonGroup>

          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              selected={date}
              onSelect={setDate}
              className="[--cell-size:--spacing(7)]"
              mode="range"
            />
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
