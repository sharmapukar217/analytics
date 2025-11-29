import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TodaysOrderCard() {
  return (
    <Card className="py-4">
      <CardHeader className="px-4">
        <CardTitle>
          <h1>Today&apos;s Orders</h1>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4"></CardContent>
    </Card>
  );
}
