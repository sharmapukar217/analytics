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

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export function TopSellingProducts() {
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

  const { totalSold, totalAmount } = useMemo(() => {
    let sold = 0;
    let amount = 0;

    channelData?.forEach((p) => {
      sold += p.totalQuantitySold;
      amount += p.totalSales;
    });

    return { totalSold: sold, totalAmount: amount };
  }, [channelData]);

  return (
    <Card className="p-0 gap-2 h-[300px] overflow-auto no-scrollbar">
      <CardHeader className="!pt-4 px-4 py-0">
        <div className="flex items-center gap-4 justify-between">
          <CardTitle>Top selling products </CardTitle>

          <Select value={currentStore} onValueChange={setCurrentStore}>
            <SelectTrigger size="sm">
              <SelectValue placeholder="Select a channel" />
            </SelectTrigger>

            <SelectContent align="end">
              <SelectItem value="all">Overall Stores</SelectItem>

              {channels.map((channel) => (
                <SelectItem key={channel.id} value={channel.id}>
                  {channel.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="border-t p-0 h-full flex">
        <Table className="h-full flex-1">
          <TableHeader className="sticky top-0 bg-card border-b z-10">
            <TableRow>
              <TableHead className="w-[10px] border-r text-center">#</TableHead>
              <TableHead className="max-w-[300px] text-center overflow-hidden text-ellipsis border-r">
                Variant Name
              </TableHead>
              <TableHead className="max-w-[100px] overflow-hidden text-ellipsis border-r text-center">
                Total Sold
              </TableHead>
              <TableHead className="text-center max-w-[150px]">
                Total Sales
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="h-full">
            {channelData?.map((productVariant) => (
              <TableRow key={productVariant.productVariantId}>
                <TableCell className="font-medium border-r text-center">
                  {productVariant.productVariantId}
                </TableCell>
                <TableCell className="text-center max-w-[300px] overflow-hidden text-ellipsis border-r">
                  {productVariant.productVariantName}
                </TableCell>
                <TableCell className="max-w-[100px] overflow-hidden text-ellipsis border-r text-center">
                  {productVariant.totalQuantitySold}
                </TableCell>
                <TableCell className="text-center max-w-[150px] overflow-hidden text-ellipsis">
                  {formatCurrency(productVariant.totalSales)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>

              <TableCell className="text-center max-w-[100px] overflow-hidden text-ellipsis">
                {totalSold}
              </TableCell>
              <TableCell className="text-center max-w-[150px] overflow-hidden text-ellipsis">
                {/*Rs. {totalAmount.toFixed(2)}*/}
                {formatCurrency(totalAmount)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}
