import { useTheme } from "@/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export const Preview = ({ imageUri }: { imageUri: string | null }) => {
  const { colors, borderRadius, spacing, fontSize, fontWeight } = useTheme();

  // 1. Empty State (No Image)
  if (!imageUri) {
    return (
      <View
        style={[
          styles.frame,
          styles.emptyState,
          {
            backgroundColor: colors.surfaceSecondary, // Dynamic gray background
            borderColor: colors.borderSecondary, // Dynamic border
          },
        ]}
      >
        <Ionicons name="scan-outline" size={48} color={colors.iconSecondary} />
        <Text
          style={[
            styles.helperText,
            { color: colors.textSecondary, fontSize: fontSize.base },
          ]}
        >
          Tap to scan room
        </Text>
      </View>
    );
  }

  // 2. Image Preview State with Scanner Overlay
  return (
    <View
      style={[
        styles.frame,
        {
          backgroundColor: colors.backgroundSecondary,
          borderColor: "transparent", // No border when image is present
        },
      ]}
    >
      <Image
        source={{ uri: imageUri }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Decorative Scanner Corners - using Primary Brand Color */}
      <View style={[styles.cornerTL, { borderColor: colors.primary }]} />
      <View style={[styles.cornerTR, { borderColor: colors.primary }]} />
      <View style={[styles.cornerBL, { borderColor: colors.primary }]} />
      <View style={[styles.cornerBR, { borderColor: colors.primary }]} />

      {/* Status Badge */}
      <View style={styles.badge}>
        <Text style={styles.badgeText}>READY TO ANALYZE</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frame: {
    width: "100%",
    height: 320,
    borderRadius: 16, // using standard radius from theme would be theme.borderRadius.xl
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  emptyState: {
    borderWidth: 2,
    borderStyle: "dashed",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  helperText: {
    marginTop: 12,
    fontWeight: "600",
  },

  // Decorative Corners
  cornerTL: {
    position: "absolute",
    top: 20,
    left: 20,
    width: 24,
    height: 24,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 4,
  },
  cornerTR: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 24,
    height: 24,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 4,
  },
  cornerBL: {
    position: "absolute",
    bottom: 20,
    left: 20,
    width: 24,
    height: 24,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 4,
  },
  cornerBR: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 24,
    height: 24,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 4,
  },

  badge: {
    position: "absolute",
    bottom: 24,
    backgroundColor: "rgba(0,0,0,0.75)", // Semi-transparent black looks good
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
    backdropFilter: "blur(10px)", // Works on Web, ignored on native
  },
  badgeText: {
    color: "#10B981", // bright green to stand out against black badge
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1.5,
  },
});
