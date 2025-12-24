import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAnalytics } from "@/hooks/useAnalytics";
import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { formatCurrency } from "@/lib/utils";
import { useCurrentChannel } from "@/hooks/useChannels";

export function TopSellingProducts() {
  const { data } = useGetAnalytics();
  const { currentChannel } = useCurrentChannel();

  const channelData = useMemo(() => {
    return (
      data?.mostSoldProductVariants?.byChannel.find(
        (channel) => channel.channelCode === currentChannel?.code,
      )?.variants || []
    );
  }, [currentChannel, data]);

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
