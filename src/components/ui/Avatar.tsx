import React from 'react';
import { View, Image, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, BORDER_RADIUS } from '../../theme';
import { Text } from './Typography';

interface AvatarProps {
  source?: string;
  name?: string;
  size?: number;
  style?: ViewStyle | ViewStyle[];
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
  name,
  size = 40,
  style,
}) => {
  const getInitials = (n: string) => {
    return n.split(' ').map((i) => i.charAt(0)).join('').toUpperCase();
  };

  return (
    <View
      style={[
        styles.container,
        { width: size, height: size, borderRadius: size / 2 },
        style,
      ]}
    >
      {source ? (
        <Image
          source={{ uri: source }}
          style={[styles.image, { borderRadius: size / 2 }]}
        />
      ) : (
        <View style={[styles.placeholder, { borderRadius: size / 2 }]}>
          <Text variant="bodyLarge" color={COLORS.primary} style={{ fontWeight: 'bold' }}>
            {name ? getInitials(name) : 'U'}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
