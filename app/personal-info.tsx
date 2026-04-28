import React from "react";
import { View, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, Stack } from "expo-router";

export default function PersonalInfoScreen() {
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
          Personal Info
        </ThemedText>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="px-5">
        <ThemedView className="bg-white dark:bg-[#1E1E1E] rounded-[28px] border border-gray-100 dark:border-gray-800 p-6 mb-6">
          <View className="mb-5">
            <ThemedText className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-2 uppercase tracking-wider">
              Full Name
            </ThemedText>
            <TextInput
              className="bg-gray-50 dark:bg-[#2A2D30] px-4 py-3 rounded-xl text-gray-800 dark:text-gray-100 font-semibold"
              defaultValue="John Doe"
            />
          </View>

          <View className="mb-5">
            <ThemedText className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-2 uppercase tracking-wider">
              Email Address
            </ThemedText>
            <TextInput
              className="bg-gray-50 dark:bg-[#2A2D30] px-4 py-3 rounded-xl text-gray-800 dark:text-gray-100 font-semibold"
              defaultValue="john.doe@example.com"
              keyboardType="email-address"
            />
          </View>

          <View className="mb-5">
            <ThemedText className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-2 uppercase tracking-wider">
              Phone Number
            </ThemedText>
            <TextInput
              className="bg-gray-50 dark:bg-[#2A2D30] px-4 py-3 rounded-xl text-gray-800 dark:text-gray-100 font-semibold"
              defaultValue="+1 (555) 123-4567"
              keyboardType="phone-pad"
            />
          </View>
        </ThemedView>

        <TouchableOpacity
          className="bg-[#0a7ea4] py-4 rounded-2xl items-center shadow-sm"
          onPress={() => router.back()}
        >
          <ThemedText className="text-white font-bold text-base">
            Save Changes
          </ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
