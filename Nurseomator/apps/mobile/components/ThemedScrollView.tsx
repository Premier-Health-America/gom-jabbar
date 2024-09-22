import { useThemeColor } from "@/hooks/useThemeColor";
import { ScrollView, type ScrollViewProps } from "react-native";
import { EdgeRecord } from "react-native-safe-area-context";

export type ThemedScrollViewProps = Omit<ScrollViewProps, "edges"> & {
  lightColor?: string;
  darkColor?: string;
  edges?: Readonly<EdgeRecord>;
};

export function ThemedScrollView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedScrollViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <ScrollView style={[{ backgroundColor }, style]} {...otherProps} />;
}
