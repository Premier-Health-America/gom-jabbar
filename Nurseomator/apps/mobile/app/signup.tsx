import { ThemedScrollView } from "@/components/ThemedScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const SignUpScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useAuth();

  const handleSignUp = async () => {
    console.log("Sign up with:", name, email, password);
    await signUp({ name, email, password });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ThemedScrollView contentContainerStyle={styles.scrollView}>
        <ThemedText style={styles.title}>Sign Up</ThemedText>
        <ThemedView style={{ width: "100%", gap: 10, marginBottom: 20 }}>
          <ThemedTextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <ThemedTextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <ThemedTextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </ThemedView>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <ThemedText style={styles.buttonText}>Sign Up</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.navigate("/signin")}>
          <ThemedText style={styles.linkText}>
            Already have an account? Sign In
          </ThemedText>
        </TouchableOpacity>
      </ThemedScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  linkText: {
    color: "#007AFF",
    textAlign: "center",
    marginTop: 20,
  },
});

export default SignUpScreen;
