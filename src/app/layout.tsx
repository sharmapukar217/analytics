"use client";

import "@/assets/global.css";

import type { Metadata } from "next";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function RootLayout({ children }: React.PropsWithChildren) {
  const [queryClient] = React.useState(() => {
    return new QueryClient();
  });

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
          <QueryClientProvider client={queryClient}>
            <div className="contents">{children}</div>
            <ReactQueryDevtools client={queryClient} />
          </QueryClientProvider>
      </body>
    </html>
  );
}
