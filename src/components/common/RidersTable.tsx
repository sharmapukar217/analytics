import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAnalytics } from "@/hooks/useAnalytics";
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { formatCurrency } from "@/lib/utils";

export function RidersTable() {
  const { data } = useGetAnalytics();
  const [currentStore, setCurrentStore] = useState("all");

  const channels = useMemo(() => {
    if (!data?.mostSoldProductVariants?.byChannel) return [];

    return data.mostSoldProductVariants.byChannel.map((channel) => ({
      id: channel.channelId,
      name: channel.channelName,
    }));
  }, [data?.mostSoldProductVariants]);

  const channelData = useMemo(() => {
    if (currentStore === "all") return data?.mostSoldProductVariants.overall;

    return (
      data?.mostSoldProductVariants?.byChannel.find(
        (channel) => channel.channelId === currentStore,
      )?.variants || []
    );
  }, [currentStore, data]);

  const { totalRides } = useMemo(() => {
    let totalRides = 0;

    data?.riderStats.allRiders?.forEach((rider) => {
      totalRides += rider.completedOrders;
    });
    return { totalRides };
  }, [channelData]);

  return (
    <Card className="p-0 gap-2 max-h-102 overflow-auto no-scrollbar">
      <CardHeader className="!pt-4 px-4 py-0">
        <div className="flex items-center gap-4 justify-between">
          <CardTitle>All Riders </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="border-t p-0 h-full flex">
        <Table className="h-full flex-1">
          <TableHeader className="sticky top-0 bg-card border-b z-10">
            <TableRow>
              <TableHead className="w-[10px] border-r ">#</TableHead>
              <TableHead className="max-w-[300px] overflow-hidden text-ellipsis border-r">
                Rider Name
              </TableHead>
              <TableHead className="max-w-[100px] overflow-hidden text-ellipsis border-r ">
                Total Rides
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="h-full">
            {data?.riderStats.allRiders?.map((rider) => (
              <TableRow key={rider.riderId}>
                <TableCell className="font-medium border-r ">
                  {rider.riderId}
                </TableCell>
                <TableCell className="grid max-w-[300px] overflow-hidden text-ellipsis border-r">
                  <span>{rider.riderName}</span>
                </TableCell>
                <TableCell className="max-w-[100px] overflow-hidden text-ellipsis border-r ">
                  {rider.completedOrders}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell className=" max-w-[100px] overflow-hidden text-ellipsis">
                {totalRides}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}
