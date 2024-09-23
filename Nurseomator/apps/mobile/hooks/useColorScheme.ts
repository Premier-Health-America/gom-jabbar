import { useColorScheme as colorTheme } from "react-native";

export function useColorScheme(): "light" | "dark" {
  return colorTheme() ?? "light";
}
