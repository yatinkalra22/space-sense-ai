import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";

export const uploadImage = async (uri: string): Promise<string> => {
  try {
    // 1. Convert URI to Blob (Required for Firebase on React Native)
    const response = await fetch(uri);
    const blob = await response.blob();

    // 2. Create Reference
    const filename = `scans/${Date.now()}.jpg`;
    const storageRef = ref(storage, filename);

    // 3. Upload
    await uploadBytes(storageRef, blob);

    // 4. Get URL to pass to your AI backend
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error("Upload failed", error);
    throw new Error("Failed to upload image");
  }
};
