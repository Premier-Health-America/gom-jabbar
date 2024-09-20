import * as SecureStore from "expo-secure-store";

const SESSION_ID_KEY = "sessionId";

export class SecureStorage {
  static async getSessionId() {
    return await SecureStore.getItemAsync(SESSION_ID_KEY);
  }

  static async setSessionId(sessionId: string) {
    await SecureStore.setItemAsync(SESSION_ID_KEY, sessionId);
  }

  static async removeSessionId() {
    await SecureStore.deleteItemAsync(SESSION_ID_KEY);
  }
}
