import React, { useState } from "react";
import {
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  useColorScheme,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/themed-text";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const MOCK_NOTES = [
  {
    id: "1",
    name: "Your note",
    note: "Leave a note",
    avatar: "https://i.pravatar.cc/150?u=me",
    isMe: true,
  },
  {
    id: "2",
    name: "Jane",
    note: "Need coffee",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    isMe: false,
  },
  {
    id: "3",
    name: "John",
    note: "Gym time",
    avatar: "https://i.pravatar.cc/150?u=1",
    isMe: false,
  },
  {
    id: "4",
    name: "Emily",
    note: "Sleepy",
    avatar: "https://i.pravatar.cc/150?u=4",
    isMe: false,
  },
  {
    id: "5",
    name: "Mike",
    note: "Working...",
    avatar: "https://i.pravatar.cc/150?u=5",
    isMe: false,
  },
];

const MOCK_CHATS = [
  {
    id: "1",
    name: "Jane Doe",
    lastMessage: "Sent you a reel.",
    time: "2m",
    unread: true,
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    id: "2",
    name: "John Smith",
    lastMessage: "Reacted to your message.",
    time: "1h",
    unread: false,
    avatar: "https://i.pravatar.cc/150?u=1",
  },
  {
    id: "3",
    name: "UI/UX Community",
    lastMessage: "Jane: That looks great!",
    time: "4h",
    unread: false,
    avatar: "https://i.pravatar.cc/150?u=2",
  },
  {
    id: "4",
    name: "Tech Bros",
    lastMessage: "Sent an attachment.",
    time: "1d",
    unread: true,
    avatar: "https://i.pravatar.cc/150?u=3",
  },
  {
    id: "5",
    name: "Emily Clark",
    lastMessage: "Active yesterday",
    time: "",
    unread: false,
    avatar: "https://i.pravatar.cc/150?u=4",
  },
  {
    id: "6",
    name: "Mike Ross",
    lastMessage: "See you soon!",
    time: "2d",
    unread: false,
    avatar: "https://i.pravatar.cc/150?u=5",
  },
  {
    id: "7",
    name: "Sarah Lee",
    lastMessage: "Loved it!",
    time: "3d",
    unread: false,
    avatar: "https://i.pravatar.cc/150?u=6",
  },
];

export default function ChatListScreen() {
  const [search, setSearch] = useState("");
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const iconColor = isDark ? "white" : "black";
  const router = useRouter();

  const filteredChats = MOCK_CHATS.filter((chat) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      chat.name.toLowerCase().includes(q) ||
      chat.lastMessage.toLowerCase().includes(q)
    );
  });

  const renderNote = ({ item }: { item: (typeof MOCK_NOTES)[0] }) => (
    <View className="items-center mr-4 w-[72px]">
      <View className="relative">
        <Image
          source={{ uri: item.avatar }}
          className="w-[72px] h-[72px] rounded-full bg-gray-200"
        />
        {item.isMe && (
          <View className="absolute bottom-0 right-0 bg-white dark:bg-black rounded-full p-[2px]">
            <View className="bg-gray-200 dark:bg-gray-700 w-6 h-6 rounded-full items-center justify-center">
              <Ionicons name="add" size={16} color={iconColor} />
            </View>
          </View>
        )}
        {!item.isMe && (
          <View className="absolute -top-2 -right-1 bg-white dark:bg-black px-3 py-1 rounded-2xl border border-gray-100 dark:border-gray-800 z-10 shadow-sm max-w-[80px]">
            <ThemedText
              className="text-[11px] text-gray-800 dark:text-gray-200 text-center"
              numberOfLines={1}
            >
              {item.note}
            </ThemedText>
          </View>
        )}
      </View>
      <ThemedText
        className="text-[12px] text-gray-500 mt-2 text-center"
        numberOfLines={1}
      >
        {item.name}
      </ThemedText>
    </View>
  );

  const renderChat = ({ item }: { item: (typeof MOCK_CHATS)[0] }) => (
    <TouchableOpacity
      className="flex-row items-center px-4 py-3"
      onPress={() =>
        router.push({ pathname: "/chat/[id]", params: { id: item.id } })
      }
    >
      <Image
        source={{ uri: item.avatar }}
        className="w-14 h-14 rounded-full mr-3 bg-gray-200"
      />
      <View className="flex-1 justify-center">
        <ThemedText
          className={`text-[15px] ${item.unread ? "font-bold" : "font-medium"} text-black dark:text-white mb-1`}
        >
          {item.name}
        </ThemedText>
        <View className="flex-row items-center pr-4">
          <ThemedText
            className={`text-[13px] flex-shrink ${item.unread ? "font-bold text-black dark:text-white" : "text-gray-500"} mr-1`}
            numberOfLines={1}
          >
            {item.lastMessage}
          </ThemedText>
          {item.time ? (
            <ThemedText className="text-[13px] text-gray-500 flex-shrink-0">
              . {item.time}
            </ThemedText>
          ) : null}
        </View>
      </View>
      {item.unread && <View className="w-2 h-2 rounded-full bg-[#3797f0] mr-3" />}
      <TouchableOpacity
        onPress={(e) => {
          e.stopPropagation();
        }}
      >
        <Ionicons name="camera-outline" size={26} color="#8e8e8e" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black" edges={["top"]}>
      <View className="flex-row items-center justify-between px-4 py-3">
        <View className="flex-row items-center gap-1">
          <ThemedText className="font-bold text-[22px] text-black dark:text-white">
            username
          </ThemedText>
          <Ionicons
            name="chevron-down"
            size={16}
            color={iconColor}
            className="mt-1"
          />
        </View>
        <View className="flex-row items-center gap-5">
          <TouchableOpacity>
            <Ionicons name="create-outline" size={28} color={iconColor} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-4 py-2">
          <View className="flex-row items-center bg-[#efefef] dark:bg-[#262626] rounded-xl px-3 py-2">
            <Ionicons
              name="search"
              size={20}
              color="#8e8e8e"
              className="mr-2"
            />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search"
              placeholderTextColor="#8e8e8e"
              className="flex-1 text-[16px] text-black dark:text-white py-1"
            />
          </View>
        </View>

        <View className="py-2">
          <FlatList
            data={MOCK_NOTES}
            keyExtractor={(item) => item.id}
            renderItem={renderNote}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          />
        </View>

        <View className="flex-row justify-between items-center px-4 pt-4 pb-2">
          <ThemedText className="font-semibold text-[16px] text-black dark:text-white">
            Messages
          </ThemedText>
          <TouchableOpacity>
            <ThemedText className="text-[#3797f0] font-medium text-[14px]">
              Requests
            </ThemedText>
          </TouchableOpacity>
        </View>

        <View className="pb-10">
          {filteredChats.map((chat) => (
            <React.Fragment key={chat.id}>
              {renderChat({ item: chat })}
            </React.Fragment>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
