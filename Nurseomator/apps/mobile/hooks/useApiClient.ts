import { useEnv } from "@/hooks/useEnv";
import type { API } from "@repo/server/src";
import { hc } from "hono/client";

export const useApi = (bearerToken?: string | null) =>
  hc<API>(useEnv().EXPO_PUBLIC_API_URL, {
    headers: {
      Authorization: `Bearer ${bearerToken ?? ""}`,
    },
  });
