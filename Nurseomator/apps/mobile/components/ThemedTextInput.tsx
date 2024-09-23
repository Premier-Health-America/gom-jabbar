import { StyleSheet, TextInput, TextInputProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
};

function ThemedTextInput({
  style,
  lightColor,
  darkColor,
  ...rest
}: ThemedTextInputProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <TextInput style={[{ color }, styles.default, style]} {...rest} />;
}

const styles = StyleSheet.create({
  default: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    width: "100%",
  },
});

export { ThemedTextInput };
