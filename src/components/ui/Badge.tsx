import React from 'react';
import { View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '../../theme';
import { Text } from './Typography';

interface Props {
  label: string;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
}

export const Badge: React.FC<Props> = ({
  label,
  variant = 'neutral',
  style,
  textStyle,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return { bg: COLORS.success + '15', text: COLORS.success };
      case 'warning':
        return { bg: COLORS.warning + '15', text: COLORS.warning };
      case 'error':
        return { bg: COLORS.error + '15', text: COLORS.error };
      case 'info':
        return { bg: COLORS.info + '15', text: COLORS.info };
      case 'neutral':
      default:
        return { bg: COLORS.textMuted + '15', text: COLORS.textMuted };
    }
  };

  const { bg, text } = getVariantStyles();

  return (
    <View style={[styles.badge, { backgroundColor: bg }, style]}>
      <Text
        variant="caption"
        style={[{ color: text, fontWeight: '700' }, textStyle]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.xs,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
