import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "../global.css";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";

import { useColorScheme } from "@/hooks/use-color-scheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(
      colorScheme === "dark" ? "#151718" : "#f0f7fa"
    );
  }, [colorScheme]);

  const CustomDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: "#151718",
    },
  };

  const CustomDefaultTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#f0f7fa",
    },
  };

  return (
    <ThemeProvider value={colorScheme === "dark" ? CustomDarkTheme : CustomDefaultTheme}>
      <Stack
        screenOptions={{
          contentStyle: {
            backgroundColor: colorScheme === "dark" ? "#151718" : "#f0f7fa",
          },
        }}
      >
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="auth/login" options={{ headerShown: false }} />
        <Stack.Screen name="auth/signup" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
