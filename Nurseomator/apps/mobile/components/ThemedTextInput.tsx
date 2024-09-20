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

  return (
    // <Text
    //   style={[
    //     { color },
    //     type === 'default' ? styles.default : undefined,
    //     type === 'title' ? styles.title : undefined,
    //     type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
    //     type === 'subtitle' ? styles.subtitle : undefined,
    //     type === 'link' ? styles.link : undefined,
    //     style,
    //   ]}
    //   {...rest}
    // />
    <TextInput style={[{ color }, styles.default]} {...rest} />
  );
}

const styles = StyleSheet.create({
  default: {
    // fontSize: 16,
    // lineHeight: 24,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export { ThemedTextInput };
