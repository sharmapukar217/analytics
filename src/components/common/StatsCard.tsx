import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { LineChart, Line, CartesianGrid, XAxis, LabelList } from "recharts";
import { ExternalLinkIcon, LucideIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { AnalyticsDateRangePicker } from "../analytics/AnalyticsDateRangePicker";

type StatsCardProps = {
  title: string;
  icon: LucideIcon;
  value: number;
  previousValue?: number;
  chartConfig: any;
  chartData: Record<string, any>[];
  dataKey: string;

  classNames?: {
    badgeClassName?: string;
  };
};

export function StatsCard({
  title,
  icon: Icon,
  value,
  previousValue,
  chartConfig,
  chartData,
  dataKey,
  classNames,
}: StatsCardProps) {
  const changedValue = React.useMemo(() => {
    if (!previousValue) return null;
    let delta = value / previousValue;
    if (previousValue > value) delta = -delta;
    return Number(delta * 100).toFixed(2);
  }, [previousValue, value]);

  return (
    <Card className="gap-2 py-4">
      <CardHeader className="px-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Icon className="text-primary size-4" />
            <h1>{title}</h1>
          </CardTitle>
          <Dialog>
            <DialogTrigger>
              <ExternalLinkIcon className="size-4" />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{title}&apos;s Graph</DialogTitle>
              </DialogHeader>

              <AnalyticsDateRangePicker disabledPresets={[0, 1]} />

              <div>
                <ChartContainer
                  config={chartConfig}
                  className="min-w-full overflow-auto"
                >
                  <LineChart
                    data={chartData}
                    margin={{ top: 2, bottom: 2, left: 12, right: 12 }}
                  >
                    <ChartTooltip content={<ChartTooltipContent />} />

                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={10}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />

                    <Line
                      type="monotone"
                      dataKey={dataKey}
                      stroke={`var(--color-${dataKey})`}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ChartContainer>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent className="grid grid-cols-2 px-4">
        <div className="flex flex-col my-auto">
          <div className="inline-flex items-center gap-2">
            <strong className="text-2xl">{value}</strong>

            {changedValue ? (
              <div
                className={twMerge(
                  "text-[0.7rem] px-2 py-1 rounded-full font-semibold",
                  classNames?.badgeClassName,
                )}
              >
                {changedValue}%
              </div>
            ) : null}
          </div>

          {!!previousValue && (
            <small className="text-muted-foreground text-xs font-medium">
              vs {previousValue} last period
            </small>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
