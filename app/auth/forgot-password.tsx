import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/themed-text";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, Stack } from "expo-router";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleSendLink = () => {
    router.push("/auth/otp");
  };

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
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 bg-white dark:bg-[#1E1E1E] rounded-full items-center justify-center border border-gray-100 dark:border-gray-800 mb-8"
          >
            <Ionicons name="arrow-back" size={20} color="#687076" />
          </TouchableOpacity>

          <View className="mb-8 items-center">
            <View className="w-20 h-20 bg-orange-100 dark:bg-orange-900/40 rounded-3xl items-center justify-center mb-6">
              <Ionicons name="key" size={40} color="#f97316" />
            </View>
            <ThemedText className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 text-center mb-4">
              Forgot Password?
            </ThemedText>
            <ThemedText className="text-[15px] text-gray-500 dark:text-gray-400 text-center leading-6 px-4">
              {isSent
                ? "We've sent a password reset link to your email. Please check your inbox."
                : "Enter the email address associated with your account and we'll send you a link to reset your password."}
            </ThemedText>
          </View>

          {!isSent ? (
            <>
              <View className="mb-8">
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

              <TouchableOpacity
                onPress={handleSendLink}
                disabled={email.length < 5}
                className={`py-4 rounded-2xl items-center shadow-sm mb-6 ${
                  email.length < 5 ? "bg-gray-300 dark:bg-gray-700" : "bg-[#0a7ea4]"
                }`}
              >
                <ThemedText className="text-white font-bold text-base">
                  Send Reset Link
                </ThemedText>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              onPress={() => router.push("/auth/login")}
              className="bg-[#0a7ea4] py-4 rounded-2xl items-center shadow-sm mb-6 mt-4"
            >
              <ThemedText className="text-white font-bold text-base">
                Back to Log In
              </ThemedText>
            </TouchableOpacity>
          )}

          <View className="flex-row items-center justify-center mt-auto pt-8">
            <ThemedText className="text-gray-500 dark:text-gray-400">
              Remember your password?{" "}
            </ThemedText>
            <TouchableOpacity onPress={() => router.push("/auth/login")}>
              <ThemedText className="text-[#0a7ea4] dark:text-[#38bdf8] font-bold">
                Log In
              </ThemedText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
