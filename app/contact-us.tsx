import React from "react";
import { View, ScrollView, TouchableOpacity, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, Stack } from "expo-router";

export default function ContactUsScreen() {
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
          Contact Us
        </ThemedText>
      </View>

      <ScrollView className="px-5">
        <ThemedText className="text-[15px] text-gray-500 dark:text-gray-400 mb-6 px-2 leading-6">
          We're here to help! Choose a method below to get in touch with our
          support team. We usually respond within 24 hours.
        </ThemedText>

        <ThemedView className="bg-white dark:bg-[#1E1E1E] rounded-[28px] border border-gray-100 dark:border-gray-800 p-2 mb-6">
          <TouchableOpacity
            className="flex-row items-center p-4 border-b border-gray-50 dark:border-gray-800"
            onPress={() => Linking.openURL("mailto:support@example.com")}
          >
            <View className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-900/40 items-center justify-center mr-4">
              <Ionicons name="mail" size={20} color="#0a7ea4" />
            </View>
            <View className="flex-1">
              <ThemedText className="text-[15px] font-semibold text-gray-800 dark:text-gray-100">
                Email Support
              </ThemedText>
              <ThemedText className="text-[12px] text-gray-400 dark:text-gray-500 mt-1">
                support@example.com
              </ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center p-4 border-b border-gray-50 dark:border-gray-800"
            onPress={() => Linking.openURL("tel:+15551234567")}
          >
            <View className="w-10 h-10 rounded-2xl bg-green-50 dark:bg-green-900/40 items-center justify-center mr-4">
              <Ionicons name="call" size={20} color="#10b981" />
            </View>
            <View className="flex-1">
              <ThemedText className="text-[15px] font-semibold text-gray-800 dark:text-gray-100">
                Call Us
              </ThemedText>
              <ThemedText className="text-[12px] text-gray-400 dark:text-gray-500 mt-1">
                Mon-Fri, 9am-5pm EST
              </ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center p-4">
            <View className="w-10 h-10 rounded-2xl bg-purple-50 dark:bg-purple-900/40 items-center justify-center mr-4">
              <Ionicons name="chatbubbles" size={20} color="#8b5cf6" />
            </View>
            <View className="flex-1">
              <ThemedText className="text-[15px] font-semibold text-gray-800 dark:text-gray-100">
                Live Chat
              </ThemedText>
              <ThemedText className="text-[12px] text-gray-400 dark:text-gray-500 mt-1">
                Available 24/7
              </ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
          </TouchableOpacity>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}
