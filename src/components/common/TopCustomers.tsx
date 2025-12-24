"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAnalytics } from "@/hooks/useAnalytics";
import { formatCurrency } from "@/lib/utils";
import { useMemo, useState } from "react";

type TabKey = "orders" | "spent";

export function TopCustomers() {
  const { data } = useGetAnalytics();
  const [tab, setTab] = useState<TabKey>("orders");

  const customers = useMemo(() => {
    if (!data?.topCustomers) return [];

    return tab === "orders"
      ? data.topCustomers.byOrderCount
      : data.topCustomers.byTotalSpent;
  }, [data, tab]);

  const { totalOrders, totalSpent } = useMemo(() => {
    let orders = 0;
    let spent = 0;

    customers.forEach((c) => {
      orders += c.orderCount;
      spent += c.totalSpent;
    });

    return { totalOrders: orders, totalSpent: spent };
  }, [customers]);

  return (
    <Card className="p-0 gap-2">
      <CardHeader className="!pt-4 px-4 py-0 space-y-3">
        <div className="flex items-center justify-between">
          <CardTitle>Top Customers</CardTitle>
        </div>

        <Tabs value={tab} onValueChange={(v) => setTab(v as TabKey)}>
          <TabsList>
            <TabsTrigger value="orders">By Orders</TabsTrigger>
            <TabsTrigger value="spent">By Total Spent</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>

      <CardContent className="border-t p-0 h-full flex">
        <Table className="h-full flex-1">
          <TableHeader className="sticky top-0 bg-card border-b z-10">
            <TableRow>
              <TableHead className="w-[10px] text-center border-r">#</TableHead>
              <TableHead className="max-w-[250px] text-center border-r">
                Customer
              </TableHead>
              <TableHead className="text-center border-r">
                Orders
              </TableHead>
              <TableHead className="text-center">
                Total Spent
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {customers.map((customer, index) => (
              <TableRow key={customer.customerId}>
                <TableCell className="text-center border-r">
                  {index + 1}
                </TableCell>

                <TableCell className="text-center border-r max-w-[250px] truncate">
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {customer.customerName}
                    </span>
                    <span className="text-xs text-muted-foreground truncate">
                      {customer.customerEmail}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="text-center border-r">
                  {customer.orderCount}
                </TableCell>

                <TableCell className="text-center">
                  {formatCurrency(customer.totalSpent)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell className="text-center">
                {totalOrders}
              </TableCell>
              <TableCell className="text-center">
                {formatCurrency(totalSpent)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}
