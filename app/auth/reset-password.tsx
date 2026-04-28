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

export default function ResetPasswordScreen() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const isValid = password.length >= 6 && password === confirmPassword;

  const handleReset = () => {
    setIsSuccess(true);
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

          {!isSuccess ? (
            <>
              <View className="mb-10 items-center">
                <View className="w-20 h-20 bg-blue-100 dark:bg-blue-900/40 rounded-3xl items-center justify-center mb-6">
                  <Ionicons name="lock-closed" size={40} color="#0a7ea4" />
                </View>
                <ThemedText className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 text-center mb-3">
                  Reset Password
                </ThemedText>
                <ThemedText className="text-[15px] text-gray-500 dark:text-gray-400 text-center leading-6 px-4">
                  Create a new password. Make sure it's at least 6 characters
                  long.
                </ThemedText>
              </View>

              <View className="mb-5">
                <ThemedText className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-2 uppercase tracking-wider ml-2">
                  New Password
                </ThemedText>
                <View className="bg-white dark:bg-[#1E1E1E] flex-row items-center rounded-2xl border border-gray-100 dark:border-gray-800 px-4 h-14">
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="#9ca3af"
                  />
                  <TextInput
                    className="flex-1 ml-3 text-gray-800 dark:text-gray-100 font-semibold"
                    placeholder="••••••••"
                    placeholderTextColor="#9ca3af"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={20}
                      color="#9ca3af"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View className="mb-8">
                <ThemedText className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-2 uppercase tracking-wider ml-2">
                  Confirm Password
                </ThemedText>
                <View className="bg-white dark:bg-[#1E1E1E] flex-row items-center rounded-2xl border border-gray-100 dark:border-gray-800 px-4 h-14">
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="#9ca3af"
                  />
                  <TextInput
                    className="flex-1 ml-3 text-gray-800 dark:text-gray-100 font-semibold"
                    placeholder="••••••••"
                    placeholderTextColor="#9ca3af"
                    secureTextEntry={!showConfirm}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirm(!showConfirm)}
                  >
                    <Ionicons
                      name={showConfirm ? "eye-off-outline" : "eye-outline"}
                      size={20}
                      color="#9ca3af"
                    />
                  </TouchableOpacity>
                </View>
                {confirmPassword.length > 0 && password !== confirmPassword && (
                  <ThemedText className="text-red-500 text-xs mt-2 ml-2">
                    Passwords do not match
                  </ThemedText>
                )}
              </View>

              <TouchableOpacity
                onPress={handleReset}
                disabled={!isValid}
                className={`py-4 rounded-2xl items-center shadow-sm mb-6 ${
                  isValid ? "bg-[#0a7ea4]" : "bg-gray-300 dark:bg-gray-700"
                }`}
              >
                <ThemedText className="text-white font-bold text-base">
                  Reset Password
                </ThemedText>
              </TouchableOpacity>
            </>
          ) : (
            <View className="flex-1 items-center justify-center">
              <View className="w-24 h-24 bg-green-100 dark:bg-green-900/40 rounded-full items-center justify-center mb-8">
                <Ionicons name="checkmark-circle" size={60} color="#10b981" />
              </View>
              <ThemedText className="text-2xl font-extrabold text-gray-800 dark:text-gray-100 text-center mb-3">
                Password Reset!
              </ThemedText>
              <ThemedText className="text-[15px] text-gray-500 dark:text-gray-400 text-center leading-6 px-8 mb-10">
                Your password has been successfully updated. You can now log in
                with your new credentials.
              </ThemedText>
              <TouchableOpacity
                onPress={() => router.replace("/auth/login")}
                className="bg-[#0a7ea4] py-4 rounded-2xl items-center shadow-sm w-full"
              >
                <ThemedText className="text-white font-bold text-base">
                  Back to Login
                </ThemedText>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
