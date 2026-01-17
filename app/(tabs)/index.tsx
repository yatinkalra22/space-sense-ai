import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { Preview } from "../../components/preview";
import { COLORS } from "../../src/constants/theme";
import { mockUploadFile } from "../services/fileService";

export default function Screen() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  // Open Camera
  const takePhoto = async () => {
    const res = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });
    if (!res.canceled) setImageUri(res.assets[0].uri);
  };

  // Open Gallery
  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!res.canceled) setImageUri(res.assets[0].uri);
  };

  // "Run AI"
  const handleDiagnosis = async () => {
    if (!imageUri)
      return Alert.alert("Missing Scan", "Please scan the room first.");

    try {
      // 1. Upload the image to our "Service"
      await mockUploadFile(imageUri, "room_scan.jpg", "image");

      // 2. Simulate AI Processing time
      await new Promise((r) => setTimeout(r, 2000));

      // 3. Navigate to results (we pass the data params)
      router.push({
        pathname: "/_sitemap",
        params: {
          symptoms: JSON.stringify(["awkward_layout", "poor_lighting"]),
          uri: imageUri,
        },
      });
    } catch (error) {
      Alert.alert(
        "Error",
        "There was an error processing your scan. Please try again."
      );
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <View style={{ padding: 24 }}>
        {/* Header */}
        <Text
          style={{ fontSize: 24, fontWeight: "bold", color: COLORS.textMain }}
        >
          Room Diagnosis
        </Text>
        <Text
          style={{ fontSize: 16, color: COLORS.textMuted, marginBottom: 24 }}
        >
          What feels &quot;off&quot; about this space?
        </Text>

        {/* 1. Scanner Viewfinder */}
        <Pressable onPress={takePhoto}>
          <Preview imageUri={imageUri} />
        </Pressable>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 12,
            marginBottom: 30,
          }}
        >
          <Text
            onPress={pickImage}
            style={{ color: COLORS.primary, fontWeight: "600" }}
          >
            Or select from gallery
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
