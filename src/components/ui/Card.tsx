import React from 'react';
import { View, StyleSheet, ViewStyle, Pressable, ViewProps } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../../theme';

interface CardProps extends ViewProps {
  padding?: keyof typeof SPACING;
  variant?: 'elevated' | 'outline' | 'flat';
  onPress?: () => void;
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
}

export const Card: React.FC<CardProps> = ({
  padding = 'md',
  variant = 'elevated',
  onPress,
  children,
  style,
  ...props
}) => {
  const paddingValue = SPACING[padding];

  const Container = onPress ? Pressable : View;

  return (
    <Container
      onPress={onPress}
      style={[
        styles.card,
        styles[variant],
        { padding: paddingValue },
        style,
      ]}
      {...props}
    >
      {children}
    </Container>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
  },
  elevated: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  outline: {
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  flat: {
    backgroundColor: COLORS.background,
  },
});
