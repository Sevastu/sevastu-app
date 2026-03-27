import React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../theme';

interface Props extends TextProps {
  variant?: keyof typeof TYPOGRAPHY;
  color?: string;
  align?: 'left' | 'center' | 'right';
}

export const Text: React.FC<Props> = ({
  variant = 'bodyMedium',
  color,
  align = 'left',
  style,
  children,
  ...props
}) => {
  const variantStyle = TYPOGRAPHY[variant];
  const textColor = color || (variant.startsWith('h') ? COLORS.text : COLORS.textMuted);

  return (
    <RNText
      style={[
        variantStyle,
        { color: textColor, textAlign: align },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};
