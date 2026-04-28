import React from "react";
import { View, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/themed-text";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, Stack } from "expo-router";

export default function AboutAppScreen() {
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
          About App
        </ThemedText>
      </View>
      <ScrollView className="px-5">
        <View className="items-center mt-10">
          <View className="w-24 h-24 bg-[#0a7ea4] rounded-3xl items-center justify-center mb-4">
            <Ionicons name="chatbubbles" size={50} color="white" />
          </View>
          <ThemedText className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            ChatApp
          </ThemedText>
          <ThemedText className="text-sm text-gray-400 dark:text-gray-500 mt-2">
            Version 1.0.1
          </ThemedText>

          <ThemedText className="text-center text-gray-500 dark:text-gray-400 mt-8 leading-6">
            A beautiful, performant React Native application showcasing modern
            UI patterns and smooth navigation flows.
          </ThemedText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
