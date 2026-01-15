import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants/theme';

export const Preview = ({ imageUri }: { imageUri: string | null }) => {
  if (!imageUri) {
    return (
      <View style={[styles.frame, styles.emptyState]}>
        <Ionicons name="scan-outline" size={48} color={COLORS.textMuted} />
        <Text style={styles.helperText}>Tap to scan room</Text>
      </View>
    );
  }

  return (
    <View style={styles.frame}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      {/* Overlay Lines to look like AI analysis */}
      <View style={styles.cornerTL} />
      <View style={styles.cornerTR} />
      <View style={styles.cornerBL} />
      <View style={styles.cornerBR} />
      <View style={styles.badge}>
        <Text style={styles.badgeText}>READY TO ANALYZE</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frame: {
    width: '100%',
    height: 300,
    backgroundColor: '#E4E4E7',
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  emptyState: {
    borderWidth: 2,
    borderColor: '#D4D4D8',
    borderStyle: 'dashed',
  },
  image: { width: '100%', height: '100%' },
  helperText: { marginTop: 10, color: COLORS.textMuted, fontWeight: '600' },
  
  // Decorative Corners
  cornerTL: { position: 'absolute', top: 15, left: 15, width: 20, height: 20, borderTopWidth: 3, borderLeftWidth: 3, borderColor: COLORS.primary },
  cornerTR: { position: 'absolute', top: 15, right: 15, width: 20, height: 20, borderTopWidth: 3, borderRightWidth: 3, borderColor: COLORS.primary },
  cornerBL: { position: 'absolute', bottom: 15, left: 15, width: 20, height: 20, borderBottomWidth: 3, borderLeftWidth: 3, borderColor: COLORS.primary },
  cornerBR: { position: 'absolute', bottom: 15, right: 15, width: 20, height: 20, borderBottomWidth: 3, borderRightWidth: 3, borderColor: COLORS.primary },
  
  badge: {
    position: 'absolute', bottom: 20, backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 12, paddingVertical: 4, borderRadius: 4
  },
  badgeText: { color: '#00FF99', fontSize: 10, fontWeight: 'bold', letterSpacing: 1 }
});