import { useTheme } from "@/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function ModalScreen() {
  const { colors, spacing, fontSize, fontWeight } = useTheme();

  const steps = [
    { icon: "camera", title: "Scan", desc: "Take a photo of your room." },
    {
      icon: "scan",
      title: "Diagnose",
      desc: "AI identifies layout & lighting issues.",
    },
    {
      icon: "color-wand",
      title: "Fix",
      desc: "Get a visual prescription to solve it.",
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text
        style={{
          fontSize: fontSize["2xl"],
          fontWeight: fontWeight.bold,
          color: colors.text,
          marginBottom: spacing.xl,
        }}
      >
        How VibeFix Works
      </Text>

      {steps.map((step, index) => (
        <View key={index} style={styles.stepRow}>
          <View
            style={[styles.iconBox, { backgroundColor: colors.primary + "20" }]}
          >
            <Ionicons
              name={step.icon as any}
              size={24}
              color={colors.primary}
            />
          </View>
          <View>
            <Text
              style={{
                fontSize: fontSize.lg,
                fontWeight: fontWeight.semibold,
                color: colors.text,
              }}
            >
              {step.title}
            </Text>
            <Text style={{ color: colors.textSecondary }}>{step.desc}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
});
