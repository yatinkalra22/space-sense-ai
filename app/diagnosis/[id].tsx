import { Diagnosis, Solution } from "@/types/diagnosis";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "../../components/ui/button";
import { theme } from "../../constants/theme";

// MOCK DATA - Replace with Firebase fetch later
const MOCK_RESULT: Diagnosis = {
  id: "123",
  imageUrl: "https://via.placeholder.com/400",
  overallVibe: "Cold",
  score: 42,
  advice:
    "Your room lacks texture and warmth. It feels like a dentist's waiting room rather than a home. You need to soften the edges.",
  Solution: [
    {
      title: 'The "Layout Drift"',
      idea: "best",
      description:
        "Furniture is pushed against the walls, creating a dead zone in the center.",
      fix: "Pull the sofa 6 inches off the wall and anchor it with a rug.",
    },
    {
      title: "Lighting Glare",
      idea: "good",
      description: "Single overhead light source creates harsh shadows.",
      fix: "Add floor lamps at eye level with 2700K bulbs.",
    },
  ],
};

export default function DiagnosisScreen() {
  const router = useRouter();
  const { uri } = useLocalSearchParams();
  const t = theme.colors.light; // Access light theme tokens

  const getScoreColor = (score: number) => {
    if (score > 70) return t.success;
    if (score > 40) return t.warning;
    return t.error;
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: t.background }]}>
      {/* 1. Header Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: (uri as string) || MOCK_RESULT.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={[styles.scoreBadge, { backgroundColor: t.surface }]}>
          <Text style={[styles.scoreTitle, { color: t.textTertiary }]}>
            Vibe Score
          </Text>
          <Text
            style={[
              styles.scoreVal,
              { color: getScoreColor(MOCK_RESULT.score) },
            ]}
          >
            {MOCK_RESULT.score}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        {/* 2. Diagnosis Summary */}
        <Text style={[styles.vibeTitle, { color: t.text }]}>
          {MOCK_RESULT.overallVibe}
        </Text>
        <Text style={[styles.summary, { color: t.textSecondary }]}>
          {MOCK_RESULT.advice}
        </Text>

        <View style={[styles.divider, { backgroundColor: t.border }]} />

        <Text style={[styles.sectionHeader, { color: t.text }]}>
          Diagnosis Breakdown
        </Text>

        {/* 3. Solutions List */}
        {MOCK_RESULT.Solution.map((Solution, index) => (
          <SolutionCard key={index} item={Solution} theme={t} />
        ))}

        <Button
          title="Generate Visual Fix"
          onPress={() => alert("Generating AI Redesign...")}
          style={{ marginTop: theme.spacing.xl }}
        />
      </View>
    </ScrollView>
  );
}

const SolutionCard = ({
  item,
  theme: t,
}: {
  item: Solution;
  theme: typeof theme.colors.light;
}) => (
  <View
    style={[styles.card, { backgroundColor: t.surface, borderColor: t.border }]}
  >
    <View style={styles.cardHeader}>
      <Ionicons name="alert-circle" size={20} color={t.primary} />
      <Text style={[styles.cardTitle, { color: t.text }]}>{item.title}</Text>
      {item.idea === "best" && (
        <View
          style={[
            styles.highTag,
            { backgroundColor: theme.palette.error + "20" },
          ]}
        >
          <Text style={[styles.tagText, { color: t.error }]}>CRITICAL</Text>
        </View>
      )}
    </View>
    <Text style={[styles.cardDesc, { color: t.textSecondary }]}>
      {item.description}
    </Text>

    <View style={[styles.fixBox, { backgroundColor: t.backgroundSecondary }]}>
      <Text style={[styles.fixLabel, { color: t.primary }]}>RX:</Text>
      <Text style={[styles.fixText, { color: t.text }]}>{item.fix}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  imageContainer: { height: 320, width: "100%", position: "relative" },
  image: { width: "100%", height: "100%" },
  scoreBadge: {
    position: "absolute",
    right: theme.spacing.lg,
    bottom: -30,
    borderRadius: theme.borderRadius.full,
    width: 90,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    ...theme.shadows.md,
  },
  scoreTitle: {
    fontSize: theme.fontSize.xs,
    textTransform: "uppercase",
    fontWeight: theme.fontWeight.bold,
  },
  scoreVal: {
    fontSize: theme.fontSize["3xl"],
    fontWeight: theme.fontWeight.bold,
  },

  content: { padding: theme.spacing.lg, paddingTop: theme.spacing["2xl"] + 10 },

  vibeTitle: {
    fontSize: theme.fontSize["2xl"],
    fontWeight: theme.fontWeight.bold,
    marginBottom: theme.spacing.sm,
  },
  summary: { fontSize: theme.fontSize.base, lineHeight: 24 },

  divider: { height: 1, marginVertical: theme.spacing.lg },
  sectionHeader: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    marginBottom: theme.spacing.md,
  },

  // Card
  card: {
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    ...theme.shadows.sm,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.xs,
  },
  cardTitle: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    marginLeft: theme.spacing.sm,
    flex: 1,
  },
  cardDesc: { marginBottom: theme.spacing.md },

  fixBox: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    flexDirection: "row",
  },
  fixLabel: {
    fontWeight: theme.fontWeight.bold,
    marginRight: theme.spacing.sm,
  },
  fixText: { flex: 1, fontWeight: theme.fontWeight.medium },

  highTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
  },
  tagText: { fontSize: 10, fontWeight: "bold" },
});
