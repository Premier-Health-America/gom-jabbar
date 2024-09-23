import { useAuth } from "@/hooks/useAuth";
import { treaty } from "@elysiajs/eden";
import { API } from "@repo/server/src";

let _realTimeLocations: ReturnType<
  ReturnType<typeof treaty<API>>["api"]["v1"]["ws"]["locations"]["subscribe"]
>;
let _realTimeNotfications: ReturnType<
  ReturnType<
    typeof treaty<API>
  >["api"]["v1"]["ws"]["notifications"]["subscribe"]
>;
let _realTimeChats: ReturnType<
  ReturnType<typeof treaty<API>>["api"]["v1"]["ws"]["chats"]["subscribe"]
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

export const useRealTimeNotifications = () => {
  const { apiClient, sessionId } = useAuth();

  if (_realTimeNotfications) return _realTimeNotfications;

  const realTimeNotfications = apiClient.ws.notifications.subscribe({
    query: { token: sessionId },
  });

  _realTimeNotfications = realTimeNotfications;
  return realTimeNotfications;
};

export const useRealTimeChats = () => {
  const { apiClient, sessionId } = useAuth();

  if (_realTimeChats) return _realTimeChats;

  const realTimeChats = apiClient.ws.chats.subscribe({
    query: { token: sessionId },
  });

  _realTimeChats = realTimeChats;
  return realTimeChats;
};
