import React, { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

// ─── Icon Mapper ─────────────────────────
const getIcon = (name: string) => {
  const icons: any = {
    "person.fill": "person",
    "paperplane.fill": "paper-plane",
    "lock.fill": "lock-closed",
    "questionmark.circle.fill": "help-circle",
    "info.circle.fill": "information-circle",
    "chevron.right": "chevron-forward",
    "gearshape.fill": "settings",
    "camera.fill": "camera",
    pencil: "create",
    "rectangle.portrait.and.arrow.right": "log-out",
  };

  return icons[name] || "ellipse";
};

// ─── Sub Components ──────────────────────

const StatCard = ({ label, value }: any) => (
  <View className="flex-1 items-center">
    <ThemedText className="text-lg font-bold text-gray-800 dark:text-gray-100">{value}</ThemedText>
    <ThemedText className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{label}</ThemedText>
  </View>
);

const Section = ({ title, children }: any) => (
  <View className="mb-6">
    <ThemedText className="text-[10px] font-bold text-[#0a7ea4] dark:text-[#38bdf8] uppercase tracking-[2px] ml-4 mb-2">
      {title}
    </ThemedText>
    <ThemedView className="bg-white dark:bg-[#1E1E1E] rounded-[28px] border border-gray-100 dark:border-gray-800 overflow-hidden mx-1">
      <View className="divide-y divide-gray-50 dark:divide-gray-800">{children}</View>
    </ThemedView>
  </View>
);

const MenuItem = ({
  icon,
  label,
  description,
  badge,
  onPress,
  iconColor = "#0a7ea4",
}: any) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.6}
    className="flex-row items-center justify-between p-4 bg-white dark:bg-[#1E1E1E]"
  >
    <View className="flex-row items-center flex-1">
      <View
        style={{ backgroundColor: `${iconColor}15` }}
        className="w-10 h-10 rounded-2xl items-center justify-center"
      >
        <Ionicons name={getIcon(icon)} size={20} color={iconColor} />
      </View>

      <View className="ml-4 flex-1">
        <ThemedText className="text-[15px] font-semibold text-gray-800 dark:text-gray-100">
          {label}
        </ThemedText>
        {description && (
          <ThemedText className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">
            {description}
          </ThemedText>
        )}
      </View>
    </View>

    <View className="flex-row items-center">
      {badge && (
        <View className="bg-[#0a7ea4] px-2 py-0.5 rounded-full mr-2">
          <ThemedText className="text-[10px] text-white font-bold">
            {badge}
          </ThemedText>
        </View>
      )}
      <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
    </View>
  </TouchableOpacity>
);

// ─── Main ───────────────────────────────

export default function ProfileScreen() {
  const router = useRouter();
  const [activeToast, setActiveToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setActiveToast(msg);
    setTimeout(() => setActiveToast(null), 2500);
  };

  return (
    <SafeAreaView className="flex-1 pb-4 bg-[#f0f7fa] dark:bg-[#151718]">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row justify-between items-center px-6 pt-4 pb-2">
          <View className="bg-[#0a7ea4]/10 dark:bg-[#0a7ea4]/20 px-4 py-1.5 rounded-full">
            <ThemedText className="text-[12px] font-bold text-[#0a7ea4] dark:text-[#38bdf8]">
              MY PROFILE
            </ThemedText>
          </View>

          <TouchableOpacity
            onPress={() => router.push("/settings")}
            className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full items-center justify-center border border-gray-100 dark:border-gray-700"
          >
            <Ionicons name="settings" size={20} color="#687076" />
          </TouchableOpacity>
        </View>

        {/* Avatar */}
        <ThemedView className="mx-5 mt-4 bg-white dark:bg-[#1E1E1E] rounded-[40px] border border-gray-100 dark:border-gray-800 p-8 items-center">
          <View className="relative mb-4">
            <View className="w-28 h-28 rounded-full bg-blue-50 dark:bg-blue-900/20 items-center justify-center">
              <Image
                source={{ uri: "https://placehold.net/avatar.png" }}
                className="w-28 h-28 rounded-full"
              />
            </View>

            <TouchableOpacity
              onPress={() => showToast("Change Photo")}
              className="absolute bottom-1 right-1 bg-[#0a7ea4] p-2 rounded-full"
            >
              <Ionicons name="camera" size={14} color="white" />
            </TouchableOpacity>
          </View>

          <ThemedText type="title">John Doe</ThemedText>
          <ThemedText className="text-sm text-gray-400 dark:text-gray-500 mt-1">
            john.doe@example.com
          </ThemedText>

          {/* Stats */}
          <View className="w-full flex-row mt-8 pt-6 border-t border-gray-50 dark:border-gray-800">
            <StatCard label="Posts" value="128" />
            <StatCard label="Followers" value="4.2k" />
            <StatCard label="Following" value="319" />
          </View>
        </ThemedView>

        {/* Menu Body */}
        <View className="px-5 mt-8 pb-10">
          <Section title="Account Settings">
            <MenuItem
              icon="person.fill"
              label="Personal Information"
              description="Update your bio and data"
              onPress={() => router.push("/personal-info")}
            />
            <MenuItem
              icon="paperplane.fill"
              label="Notifications"
              description="Manage alerts & sounds"
              iconColor="#fbbf24"
              onPress={() => router.push("/notifications")}
            />
            <MenuItem
              icon="lock.fill"
              label="Privacy & Security"
              description="Control your visibility"
              iconColor="#10b981"
              onPress={() => router.push("/privacy-security")}
            />
          </Section>

          <Section title="More">
            <MenuItem
              icon="questionmark.circle.fill"
              label="Help & Support"
              iconColor="#f472b6"
              onPress={() => router.push("/help-support")}
            />
            <MenuItem
              icon="info.circle.fill"
              label="About App"
              description="Version 1.0.1"
              onPress={() => router.push("/about-app")}
            />
          </Section>
        </View>

        {/* Logout */}
        <TouchableOpacity
          onPress={() => router.push("/auth/login")}
          className="!mx-5 !mt-6 !flex-row !items-center !justify-center !bg-red-50 dark:!bg-red-500/10 !py-4 !rounded-3xl !border !border-red-100 dark:!border-red-500/20"
        >
          <Ionicons name="log-out" size={18} color="#ef4444" />
          <ThemedText className="!text-red-500 !font-bold !ml-2">
            Log Out
          </ThemedText>
        </TouchableOpacity>
      </ScrollView>

      {/* Toast */}
      {activeToast && (
        <View className="!absolute !bottom-10 !left-0 !right-0 !items-center">
          <View className="!bg-gray-800 dark:!bg-gray-200 !px-6 !py-3 !rounded-full !flex-row !items-center">
            <ThemedText className="!text-white dark:!text-gray-900 !text-xs !font-bold">
              {activeToast}
            </ThemedText>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
