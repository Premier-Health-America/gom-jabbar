import { useApiClient } from "@/hooks/useApiClient";
import { SecureStorage } from "@/utils/secureStorage";
import { router } from "expo-router";
import type { User } from "lucia";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { Alert } from "react-native";

const AuthContext = createContext<{
  signUp: (info: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  signIn: (info: { email: string; password: string }) => Promise<void>;
  signOut: () => void;
  user: User | null;
  sessionId?: string | null;
  isLoading: boolean;
}>({
  signUp: (info: { name: string; email: string; password: string }) =>
    new Promise(() => null),
  signIn: (info: { email: string; password: string }) =>
    new Promise(() => null),
  signOut: () => null,
  user: null,
  sessionId: null,
  isLoading: false,
});

export function useAuth() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    setIsLoading(true);
    const sessionId = await SecureStorage.getSessionId();
    setSessionId(sessionId);
    if (sessionId) {
      const userAccount = await fetchUserAccount(sessionId);
      if (userAccount) {
        setUser(userAccount);
      } else {
        await signOut();
      }
    }
    setIsLoading(false);
  };

  const fetchUserAccount = async (sessionId: string) => {
    try {
      const { data, error } = await useApiClient(sessionId).nurse.index.get();
      if (error) {
        console.error("Error while fetching user account:", error);
        return null;
      }

      console.log("Fetched user account:", data);
      return data;
    } catch (error) {
      console.error("Error while fetching user account:", error);
      return null;
    }
  };

  const signOut = async () => {
    console.log("Signing out");
    await SecureStorage.removeSessionId();
    setSessionId(null);
    setUser(null);
    setIsLoading(false);
    router.replace("/");
    console.log("Signed out");
  };

  return (
    <AuthContext.Provider
      value={{
        signUp: async (info: {
          name: string;
          email: string;
          password: string;
        }) => {
          const { name, email, password } = info;
          const { data, error } = await useApiClient().auth.signup.post({
            name,
            email,
            password,
          });
          if (error) {
            console.error("Error while signing up:", error);
            await SecureStorage.removeSessionId();
            Alert.alert("Error while signing up");
            return;
          }

          console.log("Signed in:", data);
          setSessionId(data.token);
          await SecureStorage.setSessionId(data.token);
          const userAccount = await fetchUserAccount(data.token);
          if (userAccount) {
            setUser(userAccount);
          }
          router.replace("/(app)/(tabs)/");
        },
        signIn: async (info: { email: string; password: string }) => {
          const { email, password } = info;
          const { data, error } = await useApiClient().auth.signin.post({
            email,
            password,
          });
          if (error) {
            console.error("Error while signing in:", error);
            await SecureStorage.removeSessionId();
            Alert.alert("Error while signing in");
            return;
          }

          console.log("Signed in:", data);
          setSessionId(data.token);
          await SecureStorage.setSessionId(data.token);
          const userAccount = await fetchUserAccount(data.token);
          if (userAccount) {
            setUser(userAccount);
          }
          router.replace("/(app)/(tabs)/");
        },
        signOut,
        user,
        sessionId,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
