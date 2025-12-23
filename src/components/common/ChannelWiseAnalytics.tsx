import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useGetAnalytics } from "@/hooks/useAnalytics";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { SelectValue } from "@radix-ui/react-select";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import { formatCurrency } from "@/lib/utils";

export function ChannelWiseAnalytics() {
  const { data } = useGetAnalytics();
  const [selectedChannel, setSelectedChannel] = React.useState("all");

  const channels = React.useMemo(() => {
    if (!data?.channelWiseAnalytics?.length) return [];
    return data.channelWiseAnalytics.map((channel) => ({
      id: channel.channelId,
      name: channel.channelName,
    }));
  }, [data]);

  return (
    <Card>
      <Tabs defaultValue="sales">
        <CardHeader>
          <CardTitle>Channelwise Analytics</CardTitle>
          <TabsList className="mt-1">
            <TabsTrigger value="sales">Sales (Nrs.)</TabsTrigger>
            <TabsTrigger value="orders">Completed Orders</TabsTrigger>
          </TabsList>

          {/*<Select value={selectedChannel} onValueChange={setSelectedChannel}>
            <SelectTrigger size="sm">
              <SelectValue placeholder="Select a channel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Channels</SelectItem>
              {channels.map((channel) => (
                <SelectItem key={channel.id} value={channel.id}>
                  {channel.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>*/}
        </CardHeader>
        <CardContent>
          <TabsContent value="sales">
            <SalesGraph />
          </TabsContent>

          <TabsContent value="orders">
            <CompletedOrdersGraph />
          </TabsContent>
          {/* <React.Activity mode={selectedChannel === "all" ? "visible" : "hidden"}>
          <AllChannelsChart />
        </React.Activity>

        <React.Activity mode={selectedChannel === "all" ? "hidden" : "visible"}>
          <ActiveChannelChart />
        </React.Activity>*/}
        </CardContent>
      </Tabs>
    </Card>
  );
}

function SalesGraph() {
  const { data } = useGetAnalytics();
  const chartData = React.useMemo(() => {
    if (!data?.channelWiseAnalytics?.length) return [];
    return data.channelWiseAnalytics.map((channelData) => ({
      channelName: channelData.channelName,
      sales: channelData.totalSales,
      // completed: channelData.totalCompletedOrders,
    }));
  }, [data]);

  const barWidth = 80;
  const chartWidth = chartData.length * barWidth;

  return (
    <div className="relative overflow-auto scrollbar-hidden h-[250px]">
      <div className="absolute inset-0" style={{ minWidth: chartWidth }}>
        <ChartContainer
          config={{
            sales: { label: "Sales", color: "var(--chart-4)" },
          }}
          className="size-full"
        >
          <BarChart
            height={250}
            data={chartData}
            width={chartWidth}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="channelName"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value: string) => value.slice(0, 10)}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent labelFormatter={(value) => value} />
              }
            />

            <Bar
              radius={4}
              barSize={40}
              dataKey="sales"
              fill="var(--color-sales)"
            />

            <LabelList
              position="top"
              className="fill-foreground"
              fontSize={7}
              formatter={(value: number) => formatCurrency(value)}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}

function CompletedOrdersGraph() {
  const { data } = useGetAnalytics();
  const chartData = React.useMemo(() => {
    if (!data?.channelWiseAnalytics?.length) return [];
    return data.channelWiseAnalytics.map((channelData) => ({
      channelName: channelData.channelName,
      completed: channelData.totalCompletedOrders,
    }));
  }, [data]);

  const barWidth = 80;
  const chartWidth = chartData.length * barWidth;

  return (
    <div className="relative overflow-auto scrollbar-hidden h-[250px]">
      <div className="absolute inset-0" style={{ minWidth: chartWidth }}>
        <ChartContainer
          config={{
            completed: { label: "Completed", color: "var(--chart-2)" },
          }}
          className="size-full"
        >
          <BarChart
            height={250}
            data={chartData}
            width={chartWidth}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="channelName"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value: string) => value.slice(0, 10)}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />

            <Bar
              radius={4}
              barSize={40}
              dataKey="completed"
              fill="var(--color-completed)"
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}
