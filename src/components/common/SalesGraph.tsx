"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AllSalesGraph } from "./AllSalesGraph";
import { CompletedOnlySalesGraph } from "./CompletedOnlySalesGraph";
import { useDateRange, useGetAnalytics } from "@/hooks/useAnalytics";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export function SalesGraph() {
  const { data } = useGetAnalytics();
  const { dateRange } = useDateRange();
  const [activeTab, setActiveTab] = React.useState("all");
  const tabOptions = React.useMemo(() => {
    return [
      { key: "all", label: "All", value: data?.overallSalesReport.all || 0 },
      {
        key: "completed",
        label: "Completed",
        value: data?.overallSalesReport.completed || 0,
      },
    ];
  }, []);

  return (
    <Card className="p-0 overflow-clip">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row overflow-clip">
        <div className="flex h-full flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3">
          <CardTitle>Overall Sales Report</CardTitle>
          <CardDescription>Showing total sales report</CardDescription>
        </div>
        <div className="flex">
          {tabOptions.map((tabOption) => {
            return (
              <Button
                key={tabOption.key}
                onClick={() => setActiveTab(tabOption.key)}
                variant={activeTab === tabOption.key ? "default" : "secondary"}
                data-active={tabOption.key === activeTab ? true : undefined}
                className="min-w-16 !h-full rounded-none relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
              >
                <span
                  className={cn(
                    "text-primary-foreground/85 text-xs capitalize",
                    [activeTab !== tabOption.key && "text-foreground/85"],
                  )}
                >
                  {tabOption.label}
                </span>
                <span className="text-lg leading-none font-bold sm:text-3xl">
                  {tabOption.value}
                </span>
              </Button>
            );
          })}
        </div>
      </CardHeader>

      <CardContent className="!p-0 min-h-[250px]">
        <React.Activity mode={activeTab === "all" ? "visible" : "hidden"}>
          <AllSalesGraph />
        </React.Activity>
        <React.Activity mode={activeTab === "completed" ? "visible" : "hidden"}>
          <CompletedOnlySalesGraph />
        </React.Activity>
      </CardContent>
    </Card>
  );
}
