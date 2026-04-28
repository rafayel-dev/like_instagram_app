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
import { ThemedView } from "@/components/themed-view";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, Stack } from "expo-router";

export default function ReportProblemScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const router = useRouter();

  const categories = [
    { id: "app-crashing", label: "App crashing or freezing", icon: "flash" },
    { id: "login-trouble", label: "Trouble logging in", icon: "log-in" },
    { id: "ui-bug", label: "UI layout issue", icon: "color-palette" },
    { id: "something-else", label: "Something else", icon: "help-circle" },
  ];

  const handleSubmit = () => {
    // Handle submit logic here
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f0f7fa] dark:bg-[#151718]">
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View className="flex-row items-center px-6 pt-4 pb-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 bg-white dark:bg-[#1E1E1E] rounded-full items-center justify-center border border-gray-100 dark:border-gray-800"
          >
            <Ionicons name="arrow-back" size={20} color="#687076" />
          </TouchableOpacity>
          <ThemedText className="flex-1 text-center text-lg font-bold text-gray-800 dark:text-gray-100 mr-10">
            Report a Problem
          </ThemedText>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} className="px-5">
          <View className="mb-6">
            <ThemedText className="text-[15px] text-gray-500 dark:text-gray-400 leading-6 px-2">
              Tell us what's happening. Your feedback helps us improve the
              experience for everyone.
            </ThemedText>
          </View>

          <ThemedText className="text-[12px] font-bold text-gray-400 dark:text-gray-500 mb-3 ml-2 uppercase tracking-wider">
            Select a Category
          </ThemedText>

          <View className="flex-row flex-wrap gap-3 mb-8">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => setSelectedCategory(cat.id)}
                  className={`flex-row items-center px-4 py-3 rounded-2xl border ${
                    isSelected
                      ? "bg-[#0a7ea4] border-[#0a7ea4]"
                      : "bg-white dark:bg-[#1E1E1E] border-gray-100 dark:border-gray-800"
                  }`}
                >
                  <Ionicons
                    name={cat.icon as any}
                    size={16}
                    color={isSelected ? "white" : "#687076"}
                    style={{ marginRight: 8 }}
                  />
                  <ThemedText
                    className={`font-semibold ${
                      isSelected ? "text-white" : "text-gray-700 dark:text-gray-200"
                    }`}
                  >
                    {cat.label}
                  </ThemedText>
                </TouchableOpacity>
              );
            })}
          </View>

          <ThemedText className="text-[12px] font-bold text-gray-400 dark:text-gray-500 mb-3 ml-2 uppercase tracking-wider">
            Description
          </ThemedText>

          <ThemedView className="bg-white dark:bg-[#1E1E1E] rounded-3xl border border-gray-100 dark:border-gray-800 p-4 mb-8">
            <TextInput
              placeholder="Please describe the issue in detail..."
              placeholderTextColor="#9ca3af"
              className="text-gray-800 dark:text-gray-100 text-[15px] leading-6 min-h-[120px]"
              multiline
              textAlignVertical="top"
              value={description}
              onChangeText={setDescription}
            />
          </ThemedView>

          <TouchableOpacity
            onPress={handleSubmit}
            disabled={!selectedCategory || description.length < 5}
            className={`py-4 rounded-2xl items-center flex-row justify-center mb-10 ${
              !selectedCategory || description.length < 5
                ? "bg-gray-300 dark:bg-gray-700"
                : "bg-[#0a7ea4]"
            }`}
          >
            <Ionicons
              name="send"
              size={18}
              color="white"
              style={{ marginRight: 8 }}
            />
            <ThemedText className="text-white font-bold text-base">
              Submit Report
            </ThemedText>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
