import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/hooks/useAuth";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useRealTimeChats } from "@/hooks/ws";
import type { Chat, Patient } from "@repo/schemas/db";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ChatScreen() {
  const { user } = useAuth();
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

  const [messages, setMessages] = useState<Chat[]>([]);
  const [inputText, setInputText] = useState("");
  const flatListRef = useRef<FlatList>(null);
  const theme = useColorScheme();
  const styles = getStyles(theme);
  const realTimeChats = useRealTimeChats();

  // Simulated WebSocket connection from patient for testing purposes
  useEffect(() => {
    const interval = setInterval(() => {
      receiveMessage({
        id: new Date().toISOString(),
        nurseId,
        patientId: patient.id,
        sender: "patient",
        message: "Hello! This is a simulated response from patient.",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleNewChat = (message: MessageEvent<Chat>) => {
      console.log("Got new chat:", message.data);
      receiveMessage(message.data);
    };
    realTimeChats.on("message", handleNewChat);

    return () => {
      realTimeChats.off("message", handleNewChat);
    };
  });

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Chat = {
        id: Date.now().toString(),
        nurseId,
        patientId: patient.id,
        sender: "nurse",
        message: inputText.trim(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputText("");
      realTimeChats.send({
        nurseId,
        patientId: patient.id,
        message: inputText.trim(),
      });
    }
  };

  const receiveMessage = (chat: Chat) => {
    setMessages((prevMessages) => [...prevMessages, chat]);
  };

  const renderMessage = ({ item }: { item: Chat }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender == "nurse" ? styles.userMessage : styles.otherMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.message}</Text>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messageList}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
        />
        <ThemedView style={styles.inputContainer}>
          <ThemedTextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message..."
            placeholderTextColor="#888"
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <ThemedText style={styles.sendButtonText}>Send</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const getStyles = (theme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    messageList: {
      paddingHorizontal: 10,
      paddingBottom: 10,
    },
    messageBubble: {
      maxWidth: "80%",
      padding: 10,
      borderRadius: 20,
      marginVertical: 5,
    },
    userMessage: {
      alignSelf: "flex-end",
      backgroundColor: theme === "light" ? "#0084ff" : "#0084ff",
    },
    otherMessage: {
      alignSelf: "flex-start",
      backgroundColor: "#303030",
    },
    messageText: {
      color: "#fff",
    },
    inputContainer: {
      flexDirection: "row",
      padding: 10,
      borderTopWidth: 1,
      borderTopColor: "#303030",
    },
    input: {
      flex: 1,
      borderRadius: 20,
      paddingHorizontal: 15,
      paddingVertical: 10,
      marginRight: 10,
    },
    sendButton: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#0084ff",
      borderRadius: 20,
      paddingHorizontal: 15,
    },
    sendButtonText: {
      color: "#fff",
      fontWeight: "bold",
    },
  });
