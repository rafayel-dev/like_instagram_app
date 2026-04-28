import React from "react";
import {
  View,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { ThemedText } from "@/components/themed-text";

const STORIES = [
  { id: "0", name: "Your Story", avatar: "https://i.pravatar.cc/150?u=me", isMine: true },
  { id: "1", name: "Jane", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
  { id: "2", name: "John", avatar: "https://i.pravatar.cc/150?u=1" },
  { id: "3", name: "Emily", avatar: "https://i.pravatar.cc/150?u=4" },
  { id: "4", name: "Mike", avatar: "https://i.pravatar.cc/150?u=5" },
  { id: "5", name: "Sarah", avatar: "https://i.pravatar.cc/150?u=6" },
];

const POSTS = [
  {
    id: "1",
    user: "Jane Doe",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
    likes: "3,482",
    caption: "Weekend mood with coffee and clean UI ideas.",
    time: "12 minutes ago",
  },
  {
    id: "2",
    user: "John Smith",
    avatar: "https://i.pravatar.cc/150?u=1",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
    likes: "1,204",
    caption: "Shipping a new React Native screen today.",
    time: "1 hour ago",
  },
  {
    id: "3",
    user: "Emily Clark",
    avatar: "https://i.pravatar.cc/150?u=4",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    likes: "892",
    caption: "Late night product flow review.",
    time: "3 hours ago",
  },
];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const iconColor = isDark ? "#f5f5f5" : "#111111";
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black" edges={["top"]}>
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
        <ThemedText className="text-[26px] font-bold text-black dark:text-white">
          Instagram
        </ThemedText>
        <View className="flex-row items-center">
          <TouchableOpacity className="mr-4">
            <Ionicons name="heart-outline" size={26} color={iconColor} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/(tabs)/Chat")}>
            <Ionicons name="paper-plane-outline" size={25} color={iconColor} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="py-3 border-b border-gray-200 dark:border-gray-800">
          <FlatList
            horizontal
            data={STORIES}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 12 }}
            renderItem={({ item }) => (
              <TouchableOpacity className="items-center mr-4 w-[74px]">
                <View className="relative">
                  <View className="w-[68px] h-[68px] rounded-full p-[2px] bg-[#ff7a00]">
                    <Image
                      source={{ uri: item.avatar }}
                      className="w-full h-full rounded-full border-2 border-white dark:border-black"
                    />
                  </View>
                  {item.isMine ? (
                    <View className="absolute bottom-0 right-0 bg-[#3797f0] w-5 h-5 rounded-full items-center justify-center border border-white dark:border-black">
                      <Ionicons name="add" size={14} color="#fff" />
                    </View>
                  ) : null}
                </View>
                <ThemedText className="mt-1 text-[12px] text-gray-600 dark:text-gray-300" numberOfLines={1}>
                  {item.name}
                </ThemedText>
              </TouchableOpacity>
            )}
          />
        </View>

        {POSTS.map((post) => (
          <View key={post.id} className="pb-4">
            <View className="flex-row items-center justify-between px-3 py-3">
              <View className="flex-row items-center">
                <Image source={{ uri: post.avatar }} className="w-9 h-9 rounded-full bg-gray-200" />
                <ThemedText className="ml-2 text-[14px] font-semibold text-black dark:text-white">
                  {post.user}
                </ThemedText>
              </View>
              <TouchableOpacity>
                <Ionicons name="ellipsis-horizontal" size={18} color={iconColor} />
              </TouchableOpacity>
            </View>

            <Image source={{ uri: post.image }} className="w-full h-[380px] bg-gray-200" resizeMode="cover" />

            <View className="flex-row items-center justify-between px-3 pt-3">
              <View className="flex-row items-center">
                <TouchableOpacity className="mr-4">
                  <Ionicons name="heart-outline" size={26} color={iconColor} />
                </TouchableOpacity>
                <TouchableOpacity className="mr-4">
                  <Ionicons name="chatbubble-outline" size={24} color={iconColor} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons name="paper-plane-outline" size={24} color={iconColor} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity>
                <Ionicons name="bookmark-outline" size={24} color={iconColor} />
              </TouchableOpacity>
            </View>

            <View className="px-3 pt-2">
              <ThemedText className="text-[14px] font-semibold text-black dark:text-white">
                {post.likes} likes
              </ThemedText>
              <ThemedText className="text-[14px] text-black dark:text-white mt-1">
                <ThemedText className="font-semibold">{post.user} </ThemedText>
                {post.caption}
              </ThemedText>
              <ThemedText className="text-[12px] text-gray-500 mt-1">{post.time}</ThemedText>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
