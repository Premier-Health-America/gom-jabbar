import { useAuth } from "@/hooks/useAuth";
import { treaty } from "@elysiajs/eden";
import { API } from "@repo/server/src";

let _realTimeLocations: ReturnType<
  ReturnType<typeof treaty<API>>["api"]["v1"]["ws"]["locations"]["subscribe"]
>;

export const useRealTimeLocations = () => {
  const { apiClient, sessionId } = useAuth();

  if (_realTimeLocations) return _realTimeLocations;

  const realTimeLocations = apiClient.ws.locations.subscribe({
    query: { token: sessionId },
  });
  _realTimeLocations = realTimeLocations;
  return realTimeLocations;
};
