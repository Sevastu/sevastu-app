import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Users, Hammer } from 'lucide-react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../theme';
import { Text } from '../components/ui/Typography';

export function RoleSelectionScreen({ navigation }: any) {
  const handleSelectRole = (role: 'worker' | 'customer') => {
    // Navigate to Login. Role can be passed as param if needed.
    navigation.replace('Login', { role });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="h1" style={{ textAlign: 'center', marginBottom: SPACING.sm || 8 }}>Welcome</Text>
        <Text variant="bodyLarge" color={COLORS.textMuted} style={{ textAlign: 'center' }}>
          Choose how you want to use SevaSetu
        </Text>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity 
          style={styles.card} 
          activeOpacity={0.8}
          onPress={() => handleSelectRole('customer')}
        >
          <View style={[styles.iconWrapper, { backgroundColor: COLORS.primary + '15' }]}>
            <Users color={COLORS.primary} size={40} />
          </View>
          <Text variant="h3" style={styles.cardTitle}>I want to hire</Text>
          <Text variant="bodyMedium" color={COLORS.textMuted} style={styles.cardDesc}>
            Find and book trusted professionals for your needs
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card} 
          activeOpacity={0.8}
          onPress={() => handleSelectRole('worker')}
        >
          <View style={[styles.iconWrapper, { backgroundColor: COLORS.success + '15' }]}>
            <Hammer color={COLORS.success} size={40} />
          </View>
          <Text variant="h3" style={styles.cardTitle}>I am a professional</Text>
          <Text variant="bodyMedium" color={COLORS.textMuted} style={styles.cardDesc}>
            Provide services and grow your business
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background || '#ffffff',
    padding: SPACING.lg || 24,
    justifyContent: 'center',
  },
  header: {
    marginBottom: (SPACING.xl || 32) * 1.5,
  },
  optionsContainer: {
    gap: SPACING.lg || 24,
  },
  card: {
    backgroundColor: COLORS.white || '#ffffff',
    padding: SPACING.xl || 32,
    borderRadius: BORDER_RADIUS.lg || 16,
    borderWidth: 1,
    borderColor: COLORS.border || '#e5e5e5',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md || 16,
  },
  cardTitle: {
    marginBottom: SPACING.xs || 4,
    textAlign: 'center',
  },
  cardDesc: {
    textAlign: 'center',
    paddingHorizontal: SPACING.md || 16,
  }
});
