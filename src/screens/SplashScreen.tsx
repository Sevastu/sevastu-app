import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Users, Wrench } from 'lucide-react-native';
import { COLORS } from '../theme';
import { Text } from '../components/ui/Typography';

export function SplashScreen({ navigation }: any) {
  const scale = new Animated.Value(0.5);
  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        tension: 10,
        friction: 2,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('RoleSelection'); // Navigate directly, preventing back
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.iconContainer, { opacity, transform: [{ scale }] }]}>
        <Users color={COLORS.primary} size={64} style={styles.icon} />
        <Wrench color={COLORS.primary} size={48} style={styles.iconAlt} />
      </Animated.View>
      <Animated.View style={{ opacity, marginTop: 20, alignItems: 'center' }}>
        <Text variant="h1" color={COLORS.primary}>SevaSetu</Text>
        <Text variant="bodyLarge" color={COLORS.textMuted}>Your service partner</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background || '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: -10,
    zIndex: 2,
  },
  iconAlt: {
    marginLeft: 0,
    zIndex: 1,
  }
});
