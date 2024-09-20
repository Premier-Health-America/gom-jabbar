import { useApiClient } from "@/hooks/useApiClient";
import * as AuthSession from "expo-auth-session";
import * as Linking from "expo-linking";
import * as SecureStore from "expo-secure-store";
import * as WebBrowser from "expo-web-browser";

const SESSION_ID_STORE_KEY = "sessionId" as const;

export const fetchUser = async () => {
  try {
    const sessionId = await SecureStore.getItemAsync(SESSION_ID_STORE_KEY);
    const client = useApiClient(sessionId);
    const response = await client.user.$get();
    if (!response.ok) {
      console.log("Bad response:", response.status, await response.text());
      return;
    }

    const data = await response.json();
    console.log("API response:", data);
    return data;
  } catch (error) {
    console.log("Error while fetching:", error);
  }
};

export const logout = async () => {
  try {
    const sessionId = await SecureStore.getItemAsync(SESSION_ID_STORE_KEY);
    const client = useApiClient(sessionId);
    const res = await client.api.auth.logout.$post();
    if (!res.ok) {
      console.log("Logout error:", res.status, await res.text());
      return;
    }

    await SecureStore.deleteItemAsync(SESSION_ID_STORE_KEY);
    console.log("Logout success:", res.status);
  } catch (error) {
    console.log("Logout error:", error);
  }
};

export const login = async () => {
  const redirectUri = AuthSession.makeRedirectUri();
  try {
    const loginUrl = useApiClient().api.auth.login.google.$url();
    loginUrl.searchParams.set("redirectUri", redirectUri);
    const result = await WebBrowser.openAuthSessionAsync(
      loginUrl.toString(),
      redirectUri,
      { showInRecents: true }
    );
    console.log("Login Result:\n", result);
    if (result.type !== "success") return;

    const url = Linking.parse(result.url);
    const sessionId = url.queryParams?.["session_token"]?.toString() ?? null;
    if (!sessionId) return;
    console.log("Saving session ID:", sessionId);
    await SecureStore.setItemAsync(SESSION_ID_STORE_KEY, sessionId);
  } catch (error) {
    console.log("Login error:\n", error);
  }
  //   console.log("Redirect URI:", AuthSession.makeRedirectUri());
  //   console.log("URL:", Linking.createURL(""));
  //   const [request, response, promptAsync] = AuthSession.useAuthRequest(
  //     {
  //       clientId: "YOUR_CLIENT_ID",
  //       redirectUri: AuthSession.makeRedirectUri(),
  //     },
  //     {
  //       authorizationEndpoint: `${env.EXPO_PUBLIC_API_URL}/api/auth/login/google`,
  //     }
  //   );
  //   console.log("Request:", request);
  //   console.log("Response:", response);
  //   return { request, response, promptAsync };
};
