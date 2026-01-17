import { LoadingOverlay } from "@/components/loadingoverlay";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "../../components/ui/button";
import { Preview } from "../../components/ui/preview";
import { useTheme } from "../../hooks/use-theme";

export default function HomeScreen() {
  const { colors, spacing, fontSize, fontWeight } = useTheme();

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");

  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });
    if (!res.canceled) setImageUri(res.assets[0].uri);
  };

  const handleDiagnosis = async () => {
    if (!imageUri)
      return Alert.alert("Missing Scan", "Please scan a room first.");

    setIsLoading(true);
    try {
      setStatus("Uploading scan...");
      // await uploadImage(imageUri); // Uncomment when Firebase is live

      setStatus("Analyzing geometry...");
      await new Promise((r) => setTimeout(r, 1000));

      setStatus("Diagnosing vibe...");
      await new Promise((r) => setTimeout(r, 1000));

      router.push({
        pathname: "/diagnosis/[id]",
        params: { id: Date.now().toString(), uri: imageUri },
      });
    } catch (error) {
      Alert.alert("Error", "Analysis failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ padding: spacing.lg, paddingBottom: 100 }}
    >
      <LoadingOverlay visible={isLoading} message={status} />

      {/* Header Section */}
      <View style={styles.header}>
        <View>
          <Text
            style={{
              fontSize: fontSize["3xl"],
              fontWeight: fontWeight.bold,
              color: colors.text,
            }}
          >
            VibeFix AI
          </Text>
          <Text
            style={{
              fontSize: fontSize.base,
              color: colors.textSecondary,
              marginTop: 4,
            }}
          >
            AI-Powered Interior Diagnosis
          </Text>
        </View>
        <Link href="/modal" asChild>
          <Ionicons
            name="help-circle-outline"
            size={28}
            color={colors.primary}
          />
        </Link>
      </View>

      <View style={{ height: spacing.xl }} />

      {/* Main Preview Area */}
      <Preview imageUri={imageUri} />

      <View style={{ gap: spacing.md, marginTop: spacing.xl }}>
        {!imageUri ? (
          <>
            <Button
              title="Select Room Photo"
              onPress={pickImage}
              icon="images"
              style={{ height: 56 }}
            />
            <Text
              style={{
                textAlign: "center",
                color: colors.textTertiary,
                fontSize: fontSize.sm,
              }}
            >
              Supports JPG, PNG • Max 10MB
            </Text>
          </>
        ) : (
          <>
            <Button
              title="Run Diagnosis"
              onPress={handleDiagnosis}
              variant="primary"
              style={{ height: 56 }}
            />
            <Button
              title="Choose Different Photo"
              onPress={pickImage}
              variant="outline"
            />
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
});
