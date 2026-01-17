import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";
import { theme } from "../../constants/theme";

interface Props {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "danger";
  isLoading?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
}

export const Button = ({
  title,
  onPress,
  variant = "primary",
  isLoading = false,
  icon,
  style,
}: Props) => {
  const getColors = () => {
    const { colors } = theme;
    // Defaulting to light theme for now, or use a hook if you have one
    const t = colors.light;

    switch (variant) {
      case "secondary":
        return { bg: t.surfaceSecondary, text: t.text, border: "transparent" };
      case "outline":
        return { bg: "transparent", text: t.primary, border: t.primary };
      case "danger":
        return { bg: t.error, text: t.textInverse, border: "transparent" };
      default: // primary
        return { bg: t.primary, text: t.textInverse, border: "transparent" };
    }
  };

  const c = getColors();

  return (
    <Pressable
      onPress={isLoading ? undefined : onPress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: c.bg,
          borderColor: c.border,
          borderWidth: variant === "outline" ? 1 : 0,
          opacity: pressed || isLoading ? 0.8 : 1,
        },
        style,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color={c.text} />
      ) : (
        <>
          {icon && (
            <Ionicons
              name={icon}
              size={20}
              color={c.text}
              style={{ marginRight: theme.spacing.sm }}
            />
          )}
          <Text style={[styles.text, { color: c.text }]}>{title}</Text>
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 52,
    borderRadius: theme.borderRadius.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: theme.spacing.lg,
    width: "100%",
    ...theme.shadows.sm, // Add subtle shadow from theme
  },
  text: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    letterSpacing: 0.5,
  },
});
