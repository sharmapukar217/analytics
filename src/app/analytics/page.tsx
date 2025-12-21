"use client";

import { DashboardSidebar } from "@/components/layouts/DashboardSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  BadgeDollarSignIcon,
  CheckCircleIcon,
  CircleXIcon,
  HourglassIcon,
  ScrollTextIcon,
  UsersIcon,
  TrendingUpIcon,
  ShoppingCartIcon,
  PackageIcon,
  TruckIcon,
  ExternalLinkIcon,
  ClockIcon,
  ChartLineIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  Label,
} from "recharts";

import { useGetAnalytics } from "@/hooks/useAnalytics";
import { AnalyticsDateRangePicker } from "@/components/analytics/AnalyticsDateRangePicker";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TodaySales } from "@/components/common/TodaySales";
import { StatsCard } from "@/components/common/StatsCard";
import WeeklySales from "@/components/common/WeeklySales";
import { SalesGraph } from "@/components/common/SalesGraph";
import { TopSellingProducts } from "@/components/common/TopSellingProducts";

function DashboardHeader() {
  return (
    <header className="p-4 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
      <div />
      <div className="inline-flex items-center gap-4">
        <AnalyticsDateRangePicker />
      </div>
    </header>
  );
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function AnalyticsPage() {
  const { data, isLoading, error } = useGetAnalytics();

  return (
    <div className="container pb-8">
      <DashboardHeader />

      <div className="grid gap-2">
        <strong>Today&apos;s Sales</strong>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
          <div className="flex flex-col gap-4">
            <Card className="w-full h-fit">
              <CardHeader>
                <div className="flex justify-between">
                  <div className="grid">
                    <h1 className="text-sm font-medium text-muted-foreground">
                      Sales Overview
                    </h1>
                    <h2 className="text-xl font-semibold">$38.5k</h2>
                  </div>
                  <h3 className="text-xs font-semibold">+18.2%</h3>
                </div>
              </CardHeader>
              <CardContent className="grid">
                <div className="flex items-center justify-between">
                  <div className="grid gap-4">
                    <div className="inline-flex items-center gap-2">
                      <div className="flex items-center justify-center size-9 bg-muted rounded-lg">
                        <ShoppingCartIcon className="size-5" />
                      </div>
                      <h2 className="text-sm">Orders</h2>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium">
                        6,440 <span className="text-green-500">(+62.2%)</span>
                      </h3>
                    </div>
                  </div>

                  <div className="relative flex flex-col items-center gap-2 h-full">
                    <div className="w-0.5 h-full bg-muted rounded-full" />
                    <div className="size-8 shrink-0 flex items-center justify-center bg-muted rounded-full text-xs font-medium text-muted-foreground">
                      Vs
                    </div>
                    <div className="w-0.5 h-full bg-muted rounded-full" />
                  </div>

                  <div className="grid gap-4">
                    <div className="inline-flex items-center gap-2">
                      <div className="flex items-center justify-center size-9 bg-muted rounded-lg">
                        <PackageIcon className="size-5" />
                      </div>
                      <h2 className="text-sm">Delivery</h2>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium">
                        6,440 <span className="text-green-500">(+62.2%)</span>
                      </h3>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <TodaySales />
          </div>

          <div className="grid gap-4">
            <Card className="w-full h-fit md">
              <CardHeader>
                <h1 className="text-sm font-medium">Statistics</h1>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid">
                  <div className="flex items-center justify-between">
                    <h1 className="font-medium text-sm">Order placed</h1>
                    <div className="text-xs font-medium px-2 py-0.5 flex items-center justify-center bg-muted text-foreground rounded-sm">
                      +10
                    </div>
                  </div>

                  <div className="mt-2 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <h2 className="text-muted-foreground font-medium text-xs">
                        12 New orders
                      </h2>
                      <h2 className="text-primary text-xs">85%</h2>
                    </div>
                    <Progress value={85} />
                  </div>
                </div>

                <div className="grid">
                  <div className="flex items-center justify-between">
                    <h1 className="font-medium text-sm">Order Delivered</h1>
                    <div className="text-xs font-medium px-2 py-0.5 flex items-center justify-center bg-muted text-foreground rounded-sm">
                      +40
                    </div>
                  </div>

                  <div className="mt-2 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <h2 className="text-muted-foreground font-medium text-xs">
                        12 delivered
                      </h2>
                      <h2 className="text-green-500 text-xs">85%</h2>
                    </div>
                    <Progress value={32} indicatorClassName="bg-green-500" />
                  </div>
                </div>

                <div className="grid">
                  <div className="flex items-center justify-between">
                    <h1 className="font-medium text-sm">Order Delivered</h1>
                    <div className="text-xs font-medium px-2 py-0.5 flex items-center justify-center bg-muted text-foreground rounded-sm">
                      +40
                    </div>
                  </div>

                  <div className="mt-2 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <h2 className="text-muted-foreground font-medium text-xs">
                        12 New Cancelled
                      </h2>
                      <h2 className="text-destructive text-xs">85%</h2>
                    </div>
                    <Progress value={32} indicatorClassName="bg-destructive" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card className="h-fit">
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center rounded-md justify-center size-9 bg-primary/10 text-primary">
                      <TruckIcon />
                    </div>
                    <h2 className="text-lg font-medium">42</h2>

                    {/*  <div className="ms-auto">
                      <Dialog>
                        <DialogTrigger>
                          <ExternalLinkIcon className="size-4 text-muted-foreground hover:text-primary duration-500" />
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              Today&apos;s Shipped Orders
                            </DialogTitle>
                          </DialogHeader>


                          <div></div>
                        </DialogContent>
                      </Dialog>
                    </div>*/}
                  </div>

                  <div className="grid">
                    <h3 className="text-sm font-semibold">Shipped Orders</h3>
                  </div>
                </CardContent>
              </Card>

              <Card className="h-fit">
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center rounded-md justify-center size-9 bg-primary/10 text-primary">
                      <ClockIcon />
                    </div>
                    <h2 className="text-lg font-medium">54</h2>

                    {/*  <div className="ms-auto">
                      <Dialog>
                        <DialogTrigger>
                          <ExternalLinkIcon className="size-4 text-muted-foreground hover:text-primary duration-500" />
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              Today&apos;s Shipped Orders
                            </DialogTitle>
                          </DialogHeader>


                          <div></div>
                        </DialogContent>
                      </Dialog>
                    </div>*/}
                  </div>

                  <div className="grid">
                    <h3 className="text-sm font-semibold">Pending Orders</h3>
                  </div>
                </CardContent>
              </Card>

              <Card className="h-fit">
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center rounded-md justify-center size-9 bg-primary/10 text-primary">
                      <ClockIcon />
                    </div>
                    <h2 className="text-lg font-medium">54</h2>

                    {/*  <div className="ms-auto">
                      <Dialog>
                        <DialogTrigger>
                          <ExternalLinkIcon className="size-4 text-muted-foreground hover:text-primary duration-500" />
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              Today&apos;s Shipped Orders
                            </DialogTitle>
                          </DialogHeader>


                          <div></div>
                        </DialogContent>
                      </Dialog>
                    </div>*/}
                  </div>

                  <div className="grid">
                    <h3 className="text-sm font-semibold">Pending Orders</h3>
                  </div>
                </CardContent>
              </Card>

              <Card className="h-fit">
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center rounded-md justify-center size-9 bg-primary/10 text-primary">
                      <ClockIcon />
                    </div>
                    <h2 className="text-lg font-medium">54</h2>

                    {/*  <div className="ms-auto">
                      <Dialog>
                        <DialogTrigger>
                          <ExternalLinkIcon className="size-4 text-muted-foreground hover:text-primary duration-500" />
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              Today&apos;s Shipped Orders
                            </DialogTitle>
                          </DialogHeader>


                          <div></div>
                        </DialogContent>
                      </Dialog>
                    </div>*/}
                  </div>

                  <div className="grid">
                    <h3 className="text-sm font-semibold">Pending Orders</h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex-1 grid gap-4">
            <div className="grid gap-2">
              <Card className="px-0 max-h-[300px] overflow-auto">
                <CardHeader className="px-4 py-0">
                  <CardTitle>Top selling products </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <TopSellingProducts />
                </CardContent>
              </Card>
            </div>

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

        <SalesGraph />
      </div>
    </div>
  );
}
