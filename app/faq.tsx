import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, Stack } from "expo-router";

const FAQItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View className="border-b border-gray-50 dark:border-gray-800">
      <TouchableOpacity
        className="flex-row items-center justify-between p-4"
        onPress={() => setExpanded(!expanded)}
      >
        <ThemedText className="text-[15px] font-semibold text-gray-800 dark:text-gray-100 flex-1 pr-4">
          {question}
        </ThemedText>
        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={16}
          color="#0a7ea4"
        />
      </TouchableOpacity>
      {expanded && (
        <View className="px-4 pb-4">
          <ThemedText className="text-[14px] text-gray-500 dark:text-gray-400 leading-6">
            {answer}
          </ThemedText>
        </View>
      )}
    </View>
  );
};

export default function FAQScreen() {
  const router = useRouter();

  const faqs = [
    {
      question: "How do I change my password?",
      answer:
        "You can change your password by going to Profile > Privacy & Security > Change Password. Follow the on-screen instructions to set a new password securely.",
    },
    {
      question: "Can I use the app offline?",
      answer:
        "While basic navigation works offline, you need an active internet connection to send or receive new chat messages and update your profile.",
    },
    {
      question: "How do I report another user?",
      answer:
        "Open the chat with the user you wish to report, tap on their profile icon at the top, and select 'Report User'. Our moderation team will review it shortly.",
    },
    {
      question: "How do I delete my account?",
      answer:
        "To permanently delete your account, navigate to Profile > Privacy & Security > Delete Account. Please note that this action cannot be undone and all your data will be erased.",
    },
  ];

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
          FAQ
        </ThemedText>
      </View>

      <ScrollView className="px-5">
        <ThemedView className="bg-white dark:bg-[#1E1E1E] rounded-[28px] border border-gray-100 dark:border-gray-800 overflow-hidden mb-6">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}
