import React, { useMemo, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { ThemedText } from "@/components/themed-text";
import { SUGGESTIONS, TRENDING } from "@/features/social/mock-data";

export default function ExploreScreen() {
  const [query, setQuery] = useState("");
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();

  const filteredSuggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SUGGESTIONS;
    return SUGGESTIONS.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.handle.toLowerCase().includes(q) ||
        item.topic.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black" edges={["top"]}>
      <View className="px-4 pt-2 pb-3">
        <ThemedText className="text-[28px] font-bold text-black dark:text-white">
          Explore
        </ThemedText>
      </View>

      <View className="px-4 pb-3">
        <View className="flex-row items-center bg-[#efefef] dark:bg-[#262626] rounded-xl px-3 py-2">
          <Ionicons name="search" size={20} color="#8e8e8e" />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search people, topics, communities"
            placeholderTextColor="#8e8e8e"
            className="flex-1 ml-2 text-[15px] text-black dark:text-white"
          />
        </View>
      </View>

      <View className="px-4 pb-3">
        <ThemedText className="text-[16px] font-semibold text-black dark:text-white mb-2">
          Trending
        </ThemedText>
        <View className="flex-row flex-wrap">
          {TRENDING.map((item) => (
            <View
              key={item}
              className="mr-2 mb-2 px-3 py-2 rounded-full bg-[#f4f4f5] dark:bg-[#1f1f1f]"
            >
              <ThemedText className="text-[13px] text-gray-700 dark:text-gray-300">
                {item}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>

      <FlatList
        data={filteredSuggestions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListHeaderComponent={
          <View className="px-4 pb-2">
            <ThemedText className="text-[16px] font-semibold text-black dark:text-white">
              Discover
            </ThemedText>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            className="flex-row items-center px-4 py-3"
            onPress={() =>
              router.push({ pathname: "/chat/[id]", params: { id: item.chatId } })
            }
          >
            <Image
              source={{ uri: item.avatar }}
              className="w-12 h-12 rounded-full bg-gray-200"
            />
            <View className="flex-1 ml-3">
              <ThemedText className="text-[15px] font-semibold text-black dark:text-white">
                {item.name}
              </ThemedText>
              <ThemedText className="text-[13px] text-gray-500">
                {item.handle} . {item.topic}
              </ThemedText>
            </View>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={20}
              color={isDark ? "#c4c4c4" : "#8e8e8e"}
            />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View className="px-4 py-8">
            <ThemedText className="text-center text-[14px] text-gray-500">
              No results found.
            </ThemedText>
          </View>
        }
      />
    </SafeAreaView>
  );
}
