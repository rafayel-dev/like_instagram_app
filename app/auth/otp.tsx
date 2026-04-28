import React, { useState, useRef } from "react";
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

export default function OTPScreen() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const inputs = useRef<(TextInput | null)[]>([]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const isComplete = otp.every((digit) => digit !== "");

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

          <View className="mb-10 items-center">
            <View className="w-20 h-20 bg-green-100 dark:bg-green-900/40 rounded-3xl items-center justify-center mb-6">
              <Ionicons name="shield-checkmark" size={40} color="#10b981" />
            </View>
            <ThemedText className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 text-center mb-3">
              Verify OTP
            </ThemedText>
            <ThemedText className="text-[15px] text-gray-500 dark:text-gray-400 text-center leading-6 px-4">
              Enter the 4-digit code we sent to your email address.
            </ThemedText>
          </View>

          <View className="flex-row justify-center gap-4 mb-8">
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  inputs.current[index] = ref;
                }}
                className={`w-16 h-16 bg-white dark:bg-[#1E1E1E] text-center text-2xl font-bold rounded-2xl border-2 ${
                  digit
                    ? "border-[#0a7ea4] text-gray-800 dark:text-gray-100"
                    : "border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500"
                }`}
                maxLength={1}
                keyboardType="number-pad"
                value={digit}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
              />
            ))}
          </View>

          <TouchableOpacity
            onPress={() => router.push("/auth/reset-password")}
            disabled={!isComplete}
            className={`py-4 rounded-2xl items-center shadow-sm mb-6 ${
              isComplete ? "bg-[#0a7ea4]" : "bg-gray-300 dark:bg-gray-700"
            }`}
          >
            <ThemedText className="text-white font-bold text-base">
              Verify
            </ThemedText>
          </TouchableOpacity>

          <View className="items-center">
            {timer > 0 ? (
              <ThemedText className="text-gray-400 dark:text-gray-500 text-sm">
                Resend code in{" "}
                <ThemedText className="text-[#0a7ea4] dark:text-[#38bdf8] font-bold">
                  {timer}s
                </ThemedText>
              </ThemedText>
            ) : (
              <TouchableOpacity onPress={() => setTimer(30)}>
                <ThemedText className="text-[#0a7ea4] dark:text-[#38bdf8] font-bold text-sm">
                  Resend Code
                </ThemedText>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
