import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, Stack } from "expo-router";

export default function HelpSupportScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#f0f7fa] dark:bg-[#151718]">
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-row items-center px-6 pt-4 pb-6">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 bg-white dark:bg-[#1E1E1E] rounded-full items-center justify-center border border-gray-100 dark:border-gray-800"
        >
          <Ionicons name="arrow-back" size={20} color="#687076" />
        </TouchableOpacity>
        <ThemedText className="flex-1 text-center text-lg font-bold text-gray-800 dark:text-gray-100 mr-10">
          Help & Support
        </ThemedText>
      </View>
      <ScrollView className="px-5">
        <ThemedView className="bg-white dark:bg-[#1E1E1E] rounded-[28px] border border-gray-100 dark:border-gray-800 p-2">
          <TouchableOpacity
            onPress={() => router.push("/faq")}
            className="flex-row items-center justify-between p-4 border-b border-gray-50 dark:border-gray-800"
          >
            <ThemedText className="text-[15px] font-semibold text-gray-800 dark:text-gray-100">
              FAQ
            </ThemedText>
            <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/contact-us")}
            className="flex-row items-center justify-between p-4 border-b border-gray-50 dark:border-gray-800"
          >
            <ThemedText className="text-[15px] font-semibold text-gray-800 dark:text-gray-100">
              Contact Us
            </ThemedText>
            <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/report-problem")}
            className="flex-row items-center justify-between p-4"
          >
            <ThemedText className="text-[15px] font-semibold text-gray-800 dark:text-gray-100">
              Report a Problem
            </ThemedText>
            <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
          </TouchableOpacity>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}
