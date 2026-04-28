import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/themed-text";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, Stack } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-[#f0f7fa] dark:bg-[#151718]">
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, padding: 24 }}
        >
          <View className="mb-10 mt-16 items-center">
            <View className="w-20 h-20 bg-[#0a7ea4] rounded-3xl items-center justify-center mb-6">
              <Ionicons name="chatbubbles" size={40} color="white" />
            </View>
            <ThemedText className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 text-center mb-2">
              Welcome Back!
            </ThemedText>
            <ThemedText className="text-[15px] text-gray-500 dark:text-gray-400 text-center">
              Sign in to continue to ChatApp
            </ThemedText>
          </View>

          <View className="mb-6">
            <ThemedText className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-2 uppercase tracking-wider ml-2">
              Email Address
            </ThemedText>
            <View className="bg-white dark:bg-[#1E1E1E] flex-row items-center rounded-2xl border border-gray-100 dark:border-gray-800 px-4 h-14">
              <Ionicons name="mail-outline" size={20} color="#9ca3af" />
              <TextInput
                className="flex-1 ml-3 text-gray-800 dark:text-gray-100 font-semibold"
                placeholder="john.doe@example.com"
                placeholderTextColor="#9ca3af"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          <View className="mb-4">
            <ThemedText className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-2 uppercase tracking-wider ml-2">
              Password
            </ThemedText>
            <View className="bg-white dark:bg-[#1E1E1E] flex-row items-center rounded-2xl border border-gray-100 dark:border-gray-800 px-4 h-14">
              <Ionicons name="lock-closed-outline" size={20} color="#9ca3af" />
              <TextInput
                className="flex-1 ml-3 text-gray-800 dark:text-gray-100 font-semibold"
                placeholder="••••••••"
                placeholderTextColor="#9ca3af"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#9ca3af"
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            className="self-end mb-8"
            onPress={() => router.push("/auth/forgot-password")}
          >
            <ThemedText className="text-[#0a7ea4] dark:text-[#38bdf8] font-semibold text-sm">
              Forgot Password?
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.replace("/(tabs)")}
            className="bg-[#0a7ea4] py-4 rounded-2xl items-center shadow-sm mb-6"
          >
            <ThemedText className="text-white font-bold text-base">
              Log In
            </ThemedText>
          </TouchableOpacity>

          <View className="flex-row items-center justify-center mt-auto">
            <ThemedText className="text-gray-500 dark:text-gray-400">
              Don't have an account?{" "}
            </ThemedText>
            <TouchableOpacity onPress={() => router.push("/auth/signup")}>
              <ThemedText className="text-[#0a7ea4] dark:text-[#38bdf8] font-bold">
                Sign Up
              </ThemedText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
