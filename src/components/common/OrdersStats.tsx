import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { LineChart, Line, CartesianGrid, XAxis, LabelList } from "recharts";
import { LucideIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

type StatsCardProps = {
  title: string;
  icon: React.ReactNode;
  value: string | number;
};

export function OrdersStats({ title, icon, value }: StatsCardProps) {
  return (
    <Card className="gap-2 py-4">
      <CardHeader className="px-4">
        <CardTitle className="flex items-center gap-2">
          {icon ? icon : null}
          <h1>{title}</h1>
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-2 px-4">
        <div className="flex flex-col my-auto">
          <div className="inline-flex items-center gap-2">
            <strong className="text-2xl">{value}</strong>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
