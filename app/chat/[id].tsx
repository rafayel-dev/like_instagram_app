import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { View, TextInput, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { ThemedText } from "@/components/themed-text";

const CHAT_META: Record<string, { name: string; status: string }> = {
  "1": { name: "Jane Doe", status: "Active now" },
  "2": { name: "John Smith", status: "Active 1h ago" },
  "3": { name: "UI/UX Community", status: "23 members online" },
  "4": { name: "Tech Bros", status: "5 members online" },
  "5": { name: "Emily Clark", status: "Active yesterday" },
  "6": { name: "Mike Ross", status: "Active 2d ago" },
  "7": { name: "Sarah Lee", status: "Active 3d ago" },
};

const MESSAGES: Record<string, { id: string; text: string; mine: boolean; time: string }[]> = {
  "1": [
    { id: "1", text: "Hey! Did you check the reel?", mine: false, time: "09:12" },
    { id: "2", text: "Yes, looked great.", mine: true, time: "09:13" },
    { id: "3", text: "Sending one more.", mine: false, time: "09:14" },
  ],
  "2": [
    { id: "1", text: "Are we shipping today?", mine: false, time: "10:01" },
    { id: "2", text: "Yes, after QA signs off.", mine: true, time: "10:03" },
  ],
};

export default function ChatConversationScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [draft, setDraft] = useState("");
  const meta = CHAT_META[id ?? ""] ?? { name: "Conversation", status: "Offline" };

  const initialMessages = useMemo(
    () => MESSAGES[id ?? ""] ?? [{ id: "1", text: "Start your conversation.", mine: false, time: "Now" }],
    [id]
  );
  const [messages, setMessages] = useState(initialMessages);

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  const sendMessage = () => {
    const text = draft.trim();
    if (!text) return;
    const next = {
      id: String(messages.length + 1),
      text,
      mine: true,
      time: "Now",
    };
    setMessages((prev) => [...prev, next]);
    setDraft("");
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black" edges={["top", "bottom"]}>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-row items-center px-3 py-3 border-b border-gray-200 dark:border-gray-800">
        <TouchableOpacity onPress={() => router.back()} className="p-2 mr-1">
          <Ionicons name="arrow-back" size={22} color="#8e8e8e" />
        </TouchableOpacity>
        <View className="flex-1">
          <ThemedText className="text-[17px] font-semibold text-black dark:text-white">
            {meta.name}
          </ThemedText>
          <ThemedText className="text-[12px] text-gray-500">{meta.status}</ThemedText>
        </View>
        <TouchableOpacity className="p-2">
          <Ionicons name="call-outline" size={22} color="#8e8e8e" />
        </TouchableOpacity>
        <TouchableOpacity className="p-2">
          <Ionicons name="videocam-outline" size={24} color="#8e8e8e" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 14 }}
        renderItem={({ item }) => (
          <View className={`mb-3 ${item.mine ? "items-end" : "items-start"}`}>
            <View
              className={`px-3 py-2 max-w-[82%] rounded-2xl ${
                item.mine ? "bg-[#3797f0]" : "bg-gray-200 dark:bg-gray-800"
              }`}
            >
              <ThemedText className={`text-[15px] ${item.mine ? "text-white" : "text-black dark:text-white"}`}>
                {item.text}
              </ThemedText>
            </View>
            <ThemedText className="text-[11px] text-gray-500 mt-1 px-1">
              {item.time}
            </ThemedText>
          </View>
        )}
      />

      <View className="px-3 py-2 border-t border-gray-200 dark:border-gray-800 flex-row items-center">
        <TextInput
          value={draft}
          onChangeText={setDraft}
          placeholder="Message"
          placeholderTextColor="#8e8e8e"
          className="flex-1 bg-[#efefef] dark:bg-[#262626] text-black dark:text-white rounded-full px-4 py-2"
        />
        <TouchableOpacity onPress={sendMessage} className="ml-2 p-2">
          <Ionicons name="send" size={22} color="#3797f0" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
