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
import { useDays, useGetAnalytics } from "@/hooks/useAnalytics";

export function SalesGraph() {
  const { days } = useDays();
  const { data } = useGetAnalytics();
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
    <Card className="p-0">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex h-full flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3">
          <CardTitle>Overall Sales Report</CardTitle>
          <CardDescription>
            Showing total sales report for the last {days} days(s)
          </CardDescription>
        </div>
        <div className="flex">
          {tabOptions.map((tabOption) => {
            return (
              <button
                key={tabOption.key}
                onClick={() => setActiveTab(tabOption.key)}
                data-active={tabOption.key === activeTab ? true : undefined}
                className="min-w-16 items-center hover:bg-muted/10 focus:bg-muted/50 data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6 duration-500"
              >
                <span className="text-muted-foreground text-xs capitalize">
                  {tabOption.label}
                </span>
                <span className="text-lg leading-none font-bold sm:text-3xl">
                  {tabOption.value}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>

      <CardContent className="px-4 min-h-[250px]">
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
