import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/hooks/useAuth";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useRealTimeChats } from "@/hooks/ws";
import type { Chat, Patient } from "@repo/schemas/db";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import {
  Composer,
  GiftedChat,
  IMessage,
  InputToolbar,
} from "react-native-gifted-chat";

export default function ChatScreen() {
  const { user, apiClient } = useAuth();
  if (!user) {
    return <Redirect href="/signin" />;
  }
  const nurseId = user.id;

  const { patient: patientStringified } = useLocalSearchParams<{
    patient: string;
  }>();

  const patient =
    patientStringified !== undefined
      ? (JSON.parse(patientStringified) as Patient)
      : null;

  if (!nurseId || !patient) {
    if (router.canGoBack()) {
      router.back();
      return;
    } else {
      router.replace("/(app)/(tabs)/patients");
      return;
    }
  }

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isLoadingEarlier, setIsLoadingEarlier] = useState(false);
  const [cursor, setCursor] = useState<string | undefined>();
  const [hasMore, setHasMore] = useState(true);

  const theme = useColorScheme();
  const styles = getStyles(theme);
  const realTimeChats = useRealTimeChats();

  // Simulated WebSocket connection from patient for testing purposes
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setMessages((previousMessages) =>
  //       GiftedChat.append(previousMessages, [
  //         {
  //           _id: new Date().toISOString(),
  //           createdAt: new Date(),
  //           text: "Hello! This is a simulated response from patient.",
  //           user: {
  //             _id: patient.id,
  //             name: patient.name,
  //           },
  //           sent: true,
  //           received: true,
  //         },
  //       ])
  //     );
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  const receiveMessages = (chats: Chat[]) => {
    setMessages((previousMessages) =>
      GiftedChat.prepend(
        previousMessages,
        chats.map((chat) => ({
          _id: chat.id,
          createdAt: new Date(chat.createdAt),
          text: chat.message,
          user: {
            _id: chat.sender == "nurse" ? nurseId : patient.id,
            name: chat.sender == "nurse" ? user.name : patient.name,
          },
        }))
      )
    );
  };

  const onSend = useCallback((messages: IMessage[] = []) => {
    realTimeChats.send({
      nurseId,
      patientId: patient.id,
      message: messages[0].text,
    });
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  const handleLoadEarlier = useCallback(async () => {
    if (isLoadingEarlier || !hasMore) return;

    setIsLoadingEarlier(true);

    try {
      const { data, error } = await apiClient
        .patients({ id: patient.id })
        .chat.get({
          query: { pageSize: 10, cursor: cursor ?? "" },
        });

      if (error) {
        console.error("ERROR:", error);
        return;
      }

      if (data.data.length === 0) {
        setHasMore(false);
      } else {
        receiveMessages(data.data);
        setCursor(data.cursor);
      }
    } catch (error) {
      console.error("ERROR:", error);
    } finally {
      setIsLoadingEarlier(false);
    }
  }, [isLoadingEarlier, hasMore, setCursor]);

  useEffect(() => {
    handleLoadEarlier();
  }, []);

  useEffect(() => {
    const handleNewChat = (message: MessageEvent<Chat>) => {
      console.log("Got new chat:", message.data);
      receiveMessages([message.data]);
    };
    realTimeChats.on("message", handleNewChat);

    return () => {
      realTimeChats.off("message", handleNewChat);
    };
  }, []);

  return (
    <ThemedView style={styles.container}>
      <GiftedChat
        messages={messages}
        user={{
          _id: user.id,
        }}
        onSend={onSend}
        loadEarlier={true}
        onLoadEarlier={handleLoadEarlier}
        isLoadingEarlier={isLoadingEarlier}
        infiniteScroll={true}
        renderInputToolbar={(props) => (
          <InputToolbar
            {...props}
            primaryStyle={{ backgroundColor: Colors[theme].background }}
          />
        )}
        renderComposer={(props) => (
          <Composer {...props} textInputStyle={{ color: Colors[theme].text }} />
        )}
      />
    </ThemedView>
  );
}

const getStyles = (theme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
  });
