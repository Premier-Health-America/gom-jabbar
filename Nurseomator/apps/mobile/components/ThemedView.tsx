import { useThemeColor } from "@/hooks/useThemeColor";
import { View, type ViewProps } from "react-native";
import {
  EdgeRecord,
  SafeAreaView,
  type SafeAreaViewProps,
} from "react-native-safe-area-context";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export type ThemedSafeAreaViewProps = Omit<SafeAreaViewProps, "edges"> & {
  lightColor?: string;
  darkColor?: string;
  edges?: Readonly<EdgeRecord>;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function ThemedSafeAreaView({
  style,
  lightColor,
  darkColor,
  edges,
  ...otherProps
}: ThemedSafeAreaViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <SafeAreaView
      edges={{ top: "maximum", ...edges }}
      style={[{ backgroundColor, flex: 1 }, style]}
      {...otherProps}
    />
  );
}
