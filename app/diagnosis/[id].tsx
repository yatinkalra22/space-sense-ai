import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "../../components/ui/button";
import { useTheme } from "../../hooks/use-theme";
import { Diagnosis, Solution } from "../../types/diagnosis";

// Mock Data
const MOCK_RESULT: Diagnosis = {
  id: "123",
  imageUrl: "https://via.placeholder.com/400",
  overallVibe: "Sterile & Cold",
  score: 42,
  advice:
    "Your room feels more like a waiting room than a living space. It lacks personal artifacts and warmth.",
  Solution: [
    {
      title: 'The "Furniture Drift"',
      idea: "best",
      description:
        "Everything is pushed against the walls, creating a dead zone in the middle.",
      fix: "Float the sofa 6 inches off the wall and anchor it with a large area rug.",
    },
    {
      title: "Lighting Glare",
      idea: "good",
      description: "Harsh overhead lighting washes out the room.",
      fix: "Switch to 2700K bulbs and add floor lamps.",
    },
  ],
};

export default function DiagnosisScreen() {
  const { uri } = useLocalSearchParams();
  const { colors, spacing, fontSize, fontWeight, borderRadius, shadows } =
    useTheme();

  const getScoreColor = (score: number) => {
    if (score > 70) return colors.success;
    if (score > 40) return colors.warning;
    return colors.error;
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Hero Image */}
      <View style={{ height: 350, width: "100%", position: "relative" }}>
        <Image
          source={{ uri: (uri as string) || MOCK_RESULT.imageUrl }}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
        {/* Floating Score Badge */}
        <View
          style={[
            styles.scoreBadge,
            { backgroundColor: colors.surface, ...shadows.lg },
          ]}
        >
          <Text
            style={{
              fontSize: 10,
              color: colors.textTertiary,
              fontWeight: "bold",
            }}
          >
            SCORE
          </Text>
          <Text
            style={{
              fontSize: 32,
              fontWeight: "bold",
              color: getScoreColor(MOCK_RESULT.score),
            }}
          >
            {MOCK_RESULT.score}
          </Text>
        </View>
      </View>

      <View style={{ padding: spacing.lg }}>
        {/* Main Verdict */}
        <Text
          style={{
            fontSize: fontSize["3xl"],
            fontWeight: fontWeight.bold,
            color: colors.text,
            marginBottom: spacing.xs,
          }}
        >
          {MOCK_RESULT.overallVibe}
        </Text>
        <Text
          style={{
            fontSize: fontSize.base,
            color: colors.textSecondary,
            lineHeight: 24,
          }}
        >
          {MOCK_RESULT.advice}
        </Text>

        <View
          style={{
            height: 1,
            backgroundColor: colors.border,
            marginVertical: spacing.xl,
          }}
        />

        {/* Treatment Plan */}
        <Text
          style={{
            fontSize: fontSize.xl,
            fontWeight: fontWeight.bold,
            color: colors.text,
            marginBottom: spacing.md,
          }}
        >
          Treatment Plan
        </Text>

        {MOCK_RESULT.Solution.map((item: Solution, index: number) => (
          <View
            key={index}
            style={[
              styles.card,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: spacing.sm,
              }}
            >
              <Ionicons
                name="bandage"
                size={20}
                color={colors.primary}
                style={{ marginRight: spacing.sm }}
              />
              <Text
                style={{
                  fontSize: fontSize.lg,
                  fontWeight: fontWeight.semibold,
                  color: colors.text,
                  flex: 1,
                }}
              >
                {item.title}
              </Text>
              {item.idea === "best" && (
                <View
                  style={{
                    backgroundColor: colors.error + "15",
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 4,
                  }}
                >
                  <Text
                    style={{
                      color: colors.error,
                      fontSize: 10,
                      fontWeight: "bold",
                    }}
                  >
                    CRITICAL
                  </Text>
                </View>
              )}
            </View>

            <Text
              style={{ color: colors.textSecondary, marginBottom: spacing.md }}
            >
              {item.description}
            </Text>

            <View
              style={{
                backgroundColor: colors.backgroundSecondary,
                padding: spacing.md,
                borderRadius: borderRadius.md,
              }}
            >
              <Text
                style={{
                  color: colors.primary,
                  fontWeight: fontWeight.bold,
                  marginBottom: 4,
                }}
              >
                RX FIX:
              </Text>
              <Text style={{ color: colors.text }}>{item.fix}</Text>
            </View>
          </View>
        ))}

        <Button
          title="Visualize This Fix"
          onPress={() => alert("Generating visual...")}
          style={{ marginTop: spacing.lg }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scoreBadge: {
    position: "absolute",
    right: 20,
    bottom: -30,
    borderRadius: 999,
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
});
