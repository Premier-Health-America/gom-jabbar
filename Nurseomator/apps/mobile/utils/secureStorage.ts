import * as SecureStore from "expo-secure-store";

const SESSION_ID_KEY = "sessionId";

export class SecureStorage {
  static async getSessionId() {
    try {
      return await SecureStore.getItemAsync(SESSION_ID_KEY);
    } catch (error) {
      console.error("Error while getting session id:", error);
      return null;
    }
  }

  static async setSessionId(sessionId: string) {
    try {
      await SecureStore.setItemAsync(SESSION_ID_KEY, sessionId);
    } catch (err) {
      console.error("Error while setting session id:", err);
    }
  }

  static async removeSessionId() {
    try {
      await SecureStore.deleteItemAsync(SESSION_ID_KEY);
    } catch (error) {
      console.error("Error while removing session id:", error);
    }
  }
}
