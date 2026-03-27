import React, { useRef } from 'react';
import {
  Pressable,
  Animated,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  PressableProps,
} from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '../../theme';
import { Text } from './Typography';

interface ButtonProps extends PressableProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'error';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  ...props
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          button: styles.primaryButton,
          text: styles.primaryText,
          loader: COLORS.white,
        };
      case 'secondary':
        return {
          button: styles.secondaryButton,
          text: styles.secondaryText,
          loader: COLORS.primary,
        };
      case 'outline':
        return {
          button: styles.outlineButton,
          text: styles.outlineText,
          loader: COLORS.primary,
        };
      case 'ghost':
        return {
          button: styles.ghostButton,
          text: styles.ghostText,
          loader: COLORS.primary,
        };
      case 'error':
        return {
          button: styles.errorButton,
          text: styles.errorText,
          loader: COLORS.white,
        };
      default:
        return {
          button: styles.primaryButton,
          text: styles.primaryText,
          loader: COLORS.white,
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return { paddingVertical: 8, paddingHorizontal: 12 };
      case 'lg':
        return { paddingVertical: 18, paddingHorizontal: 24 };
      case 'md':
      default:
        return { paddingVertical: 14, paddingHorizontal: 16 };
    }
  };

  const { button, text, loader } = getVariantStyles();
  const sizeStyle = getSizeStyles();

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, style]}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.button,
          button,
          sizeStyle,
          disabled && styles.disabled,
          loading && styles.loading,
        ]}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <ActivityIndicator color={loader} size="small" />
        ) : (
          <>
            {leftIcon && <Animated.View style={styles.leftIcon}>{leftIcon}</Animated.View>}
            <Text
              variant={size === 'sm' ? 'bodySmall' : 'button'}
              style={[text, textStyle, { textAlign: 'center' }]}
            >
              {title}
            </Text>
            {rightIcon && <Animated.View style={styles.rightIcon}>{rightIcon}</Animated.View>}
          </>
        )}
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: BORDER_RADIUS.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
  },
  primaryText: {
    color: COLORS.white,
  },
  secondaryButton: {
    backgroundColor: COLORS.primaryLight,
  },
  secondaryText: {
    color: COLORS.primary,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  outlineText: {
    color: COLORS.text,
  },
  ghostButton: {
    backgroundColor: 'transparent',
  },
  ghostText: {
    color: COLORS.primary,
  },
  errorButton: {
    backgroundColor: COLORS.error,
  },
  errorText: {
    color: COLORS.white,
  },
  disabled: {
    opacity: 0.5,
  },
  loading: {
    opacity: 0.9,
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
});
