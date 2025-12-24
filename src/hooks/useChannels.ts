import * as React from "react";
import { create } from "zustand";
import { useQuery } from "@tanstack/react-query";
import type { DateRange } from "react-day-picker";

import type { AnalyticsData } from "@/lib/types/analytics";

type Channel = {
  id: string;
  code: string;
  token: string;
};

type ChannelStore = {
  currentChannel: Channel | undefined;
  setCurrentChannel: (value: Channel | undefined) => void;
};

export const useCurrentChannel = create<ChannelStore>((set) => ({
  currentChannel: undefined,
  setCurrentChannel: (currentChannel) => {
    set((store) => ({ ...store, currentChannel }));
  },
}));

const DEFAULT_CHANNEL_CODE = "__default_channel__";

export function useGetChannels() {
  return useQuery<Channel[]>({
    queryKey: ["channels"],
    queryFn: async ({ queryKey }) => {
      const [, from, to] = queryKey;

      const baseUrl = new URL(
        `${process.env.NEXT_PUBLIC_API_URL}/api/analytics/channels`,
      );

      const response = await fetch(baseUrl, {
        headers: {
          "X-Analytics-Token": "sastodeal-analytics-token-2025-secure",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch channel data");
      }

      const json = await response.json();
      const allChannelsList = (json?.channels || []) as Channel[];

      const defaultChannel = allChannelsList.find(
        (ch) => ch.code === DEFAULT_CHANNEL_CODE,
      );
      const filteredChannels = allChannelsList.filter(
        (channel) => channel.code !== DEFAULT_CHANNEL_CODE,
      );

      if (!defaultChannel) return filteredChannels;

      return [
        {
          id: defaultChannel.id,
          code: "Default Store ( All )",
          token: defaultChannel.token!,
        },
        ...filteredChannels,
      ];
    },
  });
}
