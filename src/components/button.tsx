import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';

interface Props {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  isLoading?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
}

export const Button = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  isLoading = false, 
  icon,
  style 
}: Props) => {
  
  const getBackgroundColor = () => {
    if (variant === 'secondary') return COLORS.secondary;
    if (variant === 'outline') return 'transparent';
    return COLORS.primary;
  };

  const getTextColor = () => {
    if (variant === 'secondary') return COLORS.text;
    if (variant === 'outline') return COLORS.primary;
    return COLORS.white;
  };

  return (
    <Pressable
      onPress={isLoading ? undefined : onPress}
      style={({ pressed }) => [
        styles.container,
        { 
          backgroundColor: getBackgroundColor(),
          borderColor: variant === 'outline' ? COLORS.primary : 'transparent',
          borderWidth: variant === 'outline' ? 1 : 0,
          opacity: pressed || isLoading ? 0.7 : 1,
        },
        style,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <>
          {icon && (
            <Ionicons 
              name={icon} 
              size={20} 
              color={getTextColor()} 
              style={{ marginRight: SPACING.s }} 
            />
          )}
          <Text style={[styles.text, { color: getTextColor() }]}>
            {title}
          </Text>
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.l,
    width: '100%',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});