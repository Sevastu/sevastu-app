import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../theme';
import { Text } from './ui/Typography';

interface CategoryChipProps {
  label: string;
  Icon?: React.ReactNode;
  active?: boolean;
  onPress?: () => void;
}

export const CategoryChip: React.FC<CategoryChipProps> = ({
  label,
  Icon,
  active,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        active && styles.activeChip,
      ]}
    >
      {Icon && <View style={styles.icon}>{Icon}</View>}
      <Text
        variant="bodySmall"
        style={[
          styles.label,
          active && styles.activeLabel,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 10,
  },
  activeChip: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  icon: {
    marginRight: 6,
  },
  label: {
    fontWeight: '600',
    color: COLORS.text,
  },
  activeLabel: {
    color: COLORS.white,
  },
});
