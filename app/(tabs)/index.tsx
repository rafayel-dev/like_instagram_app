import React, { useMemo, useState } from "react";
import {
  View,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  useColorScheme,
  Modal,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { ThemedText } from "@/components/themed-text";
import { POSTS, STORIES } from "@/features/social/mock-data";

const POST_COMMENTS: Record<string, string[]> = {
  "1": ["So clean!", "Love this vibe."],
  "2": ["Great work team.", "Ship it."],
  "3": ["This setup looks solid."],
};

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const iconColor = isDark ? "#f5f5f5" : "#111111";
  const router = useRouter();

  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [savedPosts, setSavedPosts] = useState<Record<string, boolean>>({});
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState("");
  const [extraComments, setExtraComments] = useState<Record<string, string[]>>({});

  const activeComments = useMemo(() => {
    if (!activeCommentPostId) return [];
    return [
      ...(POST_COMMENTS[activeCommentPostId] ?? []),
      ...(extraComments[activeCommentPostId] ?? []),
    ];
  }, [activeCommentPostId, extraComments]);

  const toggleLike = (postId: string) => {
    setLikedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const toggleSave = (postId: string) => {
    setSavedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const submitComment = () => {
    if (!activeCommentPostId) return;
    const next = commentInput.trim();
    if (!next) return;
    setExtraComments((prev) => ({
      ...prev,
      [activeCommentPostId]: [...(prev[activeCommentPostId] ?? []), next],
    }));
    setCommentInput("");
  };

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
              <TouchableOpacity
                className="items-center mr-4 w-[74px]"
                onPress={() => router.push("/(tabs)/Profile")}
              >
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
                <ThemedText
                  className="mt-1 text-[12px] text-gray-600 dark:text-gray-300"
                  numberOfLines={1}
                >
                  {item.name}
                </ThemedText>
              </TouchableOpacity>
            )}
          />
        </View>

        {POSTS.map((post) => {
          const liked = !!likedPosts[post.id];
          const saved = !!savedPosts[post.id];
          const likeCount = liked ? post.likes + 1 : post.likes;

          return (
            <View key={post.id} className="pb-4">
              <View className="flex-row items-center justify-between px-3 py-3">
                <TouchableOpacity
                  className="flex-row items-center"
                  onPress={() => router.push("/(tabs)/Profile")}
                >
                  <Image
                    source={{ uri: post.avatar }}
                    className="w-9 h-9 rounded-full bg-gray-200"
                  />
                  <ThemedText className="ml-2 text-[14px] font-semibold text-black dark:text-white">
                    {post.user}
                  </ThemedText>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons name="ellipsis-horizontal" size={18} color={iconColor} />
                </TouchableOpacity>
              </View>

              <Image
                source={{ uri: post.image }}
                className="w-full h-[380px] bg-gray-200"
                resizeMode="cover"
              />

              <View className="flex-row items-center justify-between px-3 pt-3">
                <View className="flex-row items-center">
                  <TouchableOpacity className="mr-4" onPress={() => toggleLike(post.id)}>
                    <Ionicons
                      name={liked ? "heart" : "heart-outline"}
                      size={26}
                      color={liked ? "#ef4444" : iconColor}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="mr-4"
                    onPress={() => setActiveCommentPostId(post.id)}
                  >
                    <Ionicons name="chatbubble-outline" size={24} color={iconColor} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => router.push("/(tabs)/Chat")}>
                    <Ionicons name="paper-plane-outline" size={24} color={iconColor} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => toggleSave(post.id)}>
                  <Ionicons
                    name={saved ? "bookmark" : "bookmark-outline"}
                    size={24}
                    color={iconColor}
                  />
                </TouchableOpacity>
              </View>

              <View className="px-3 pt-2">
                <ThemedText className="text-[14px] font-semibold text-black dark:text-white">
                  {likeCount.toLocaleString()} likes
                </ThemedText>
                <ThemedText className="text-[14px] text-black dark:text-white mt-1">
                  <ThemedText className="font-semibold">{post.user} </ThemedText>
                  {post.caption}
                </ThemedText>
                <TouchableOpacity onPress={() => setActiveCommentPostId(post.id)}>
                  <ThemedText className="text-[13px] text-gray-500 mt-1">
                    View comments
                  </ThemedText>
                </TouchableOpacity>
                <ThemedText className="text-[12px] text-gray-500 mt-1">{post.time}</ThemedText>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <Modal
        visible={!!activeCommentPostId}
        transparent
        animationType="slide"
        onRequestClose={() => setActiveCommentPostId(null)}
      >
        <View className="flex-1 justify-end bg-black/40">
          <View className="bg-white dark:bg-[#121212] rounded-t-2xl p-4 min-h-[40%] max-h-[70%]">
            <View className="flex-row items-center justify-between mb-3">
              <ThemedText className="text-[16px] font-semibold">Comments</ThemedText>
              <TouchableOpacity onPress={() => setActiveCommentPostId(null)}>
                <Ionicons name="close" size={22} color={iconColor} />
              </TouchableOpacity>
            </View>

            <ScrollView className="mb-3">
              {activeComments.map((comment, index) => (
                <ThemedText key={`${comment}-${index}`} className="text-[14px] mb-2">
                  {comment}
                </ThemedText>
              ))}
            </ScrollView>

            <View className="flex-row items-center border border-gray-300 dark:border-gray-700 rounded-full px-3">
              <TextInput
                value={commentInput}
                onChangeText={setCommentInput}
                placeholder="Add a comment"
                placeholderTextColor="#8e8e8e"
                className="flex-1 py-2 text-black dark:text-white"
              />
              <TouchableOpacity onPress={submitComment}>
                <ThemedText className="text-[#3797f0] font-semibold">Post</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
