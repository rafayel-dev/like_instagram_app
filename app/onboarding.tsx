import React, { useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/themed-text";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, Stack } from "expo-router";

const { width } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    icon: "chatbubbles",
    iconBg: "#0a7ea4",
    title: "Connect with Friends",
    subtitle:
      "Send messages, share moments, and stay connected with the people who matter most.",
  },
  {
    id: "2",
    icon: "shield-checkmark",
    iconBg: "#10b981",
    title: "Safe & Secure",
    subtitle:
      "Your privacy is our priority. End-to-end encryption keeps your conversations secure.",
  },
  {
    id: "3",
    icon: "flash",
    iconBg: "#f97316",
    title: "Lightning Fast",
    subtitle:
      "Experience instant messaging with real-time delivery and seamless performance.",
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      router.replace("/auth/login");
    }
  };

  const handleSkip = () => {
    router.replace("/auth/login");
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index ?? 0);
    }
  }).current;

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const renderSlide = ({ item }: { item: (typeof slides)[0] }) => (
    <View style={{ width }} className="items-center justify-center px-10">
      <View
        style={{ backgroundColor: item.iconBg }}
        className="w-32 h-32 rounded-[40px] items-center justify-center mb-12"
      >
        <Ionicons name={item.icon as any} size={70} color="white" />
      </View>
      <ThemedText className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 text-center mb-4">
        {item.title}
      </ThemedText>
      <ThemedText className="text-[16px] text-gray-500 dark:text-gray-400 text-center leading-7">
        {item.subtitle}
      </ThemedText>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#f0f7fa] dark:bg-[#151718]">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Skip Button */}
      <View className="flex-row justify-end px-6 pt-4">
        <TouchableOpacity onPress={handleSkip}>
          <ThemedText className="text-[#0a7ea4] dark:text-[#38bdf8] font-bold text-sm">
            Skip
          </ThemedText>
        </TouchableOpacity>
      </View>

      {/* Slides */}
      <View className="flex-1 justify-center">
        <Animated.FlatList
          ref={flatListRef}
          data={slides}
          renderItem={renderSlide}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false },
          )}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
        />
      </View>

      {/* Bottom Controls */}
      <View className="px-8 pb-10">
        {/* Dots */}
        <View className="flex-row justify-center mb-10">
          {slides.map((_, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];

            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [8, 28, 8],
              extrapolate: "clamp",
            });

            const dotOpacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });

            return (
              <Animated.View
                key={index}
                style={{
                  width: dotWidth,
                  opacity: dotOpacity,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#0a7ea4",
                  marginHorizontal: 4,
                }}
              />
            );
          })}
        </View>

        {/* Next / Get Started Button */}
        <TouchableOpacity
          onPress={handleNext}
          className="bg-[#0a7ea4] py-4 rounded-2xl items-center shadow-sm"
        >
          <ThemedText className="text-white font-bold text-base">
            {currentIndex === slides.length - 1 ? "Get Started" : "Next"}
          </ThemedText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
