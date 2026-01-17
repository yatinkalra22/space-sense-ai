import { LoadingOverlay } from "@/components/loadingoverlay";
import { Button } from "@/components/ui/button";
import { Preview } from "@/components/ui/preview";
import { uploadImage } from "@/services/fileService";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { theme } from "../../constants/theme";

export default function Screen() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");

  const t = theme.colors.light; // Using light theme for now

  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!res.canceled) setImageUri(res.assets[0].uri);
  };

  const handleDiagnosis = async () => {
    if (!imageUri)
      return Alert.alert("Missing Scan", "Please scan the room first.");

    setIsLoading(true);

    try {
      setStatus("Uploading scan...");
      // 1. Upload to Firebase
      const downloadUrl = await uploadImage(imageUri);

      setStatus("Analyzing geometry...");
      // 2. Here you would call your AI Cloud Function with downloadUrl
      await new Promise((r) => setTimeout(r, 1500));

      setStatus("Diagnosing vibe...");
      await new Promise((r) => setTimeout(r, 1000));

      // 3. Navigate
      router.push({
        pathname: "/diagnosis/123",
        params: { uri: imageUri },
      });
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Error",
        "Could not analyze room. Please check your connection."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: t.background }}
      contentContainerStyle={{ padding: theme.spacing.lg }}
    >
      <LoadingOverlay visible={isLoading} message={status} />

      <View
        style={{
          marginTop: theme.spacing["2xl"],
          marginBottom: theme.spacing.lg,
        }}
      >
        <Text
          style={{
            fontSize: theme.fontSize["4xl"],
            fontWeight: theme.fontWeight.bold,
            color: t.text,
          }}
        >
          VibeFix AI
        </Text>
        <Text
          style={{
            fontSize: theme.fontSize.lg,
            color: t.textSecondary,
            marginTop: theme.spacing.sm,
          }}
        >
          Don't just restyle.{" "}
          <Text style={{ color: t.primary, fontWeight: theme.fontWeight.bold }}>
            Diagnose.
          </Text>
        </Text>
      </View>

      {/* Preview Component needs to be updated to accept styles if needed, 
          but works as is if it uses standard views */}
      <Preview imageUri={imageUri} />

      <View style={{ gap: theme.spacing.md, marginTop: theme.spacing.xl }}>
        {!imageUri ? (
          <Button title="Scan Room" onPress={pickImage} icon="camera" />
        ) : (
          <>
            <Button
              title="Run Vibe Diagnosis"
              onPress={handleDiagnosis}
              variant="primary"
            />
            <Button
              title="Retake Photo"
              onPress={pickImage}
              variant="outline"
            />
          </>
        )}
      </View>
    </ScrollView>
  );
}
