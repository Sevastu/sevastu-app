import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Pressable } from 'react-native';
import { User, Settings, CreditCard, HelpCircle, LogOut, ChevronRight, ShieldCheck, Bell, MapPin, Heart } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SPACING, BORDER_RADIUS } from '../theme';
import { Text } from '../components/ui/Typography';
import { Avatar } from '../components/ui/Avatar';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export const ProfileScreen = () => {
  const navigation = useNavigation();

  const menuGroups = [
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Edit Profile', onPress: () => {} },
        { icon: MapPin, label: 'Saved Addresses', onPress: () => {} },
        { icon: Heart, label: 'My Favorites', onPress: () => {} },
        { icon: ShieldCheck, label: 'Security & Password', onPress: () => navigation.navigate('SetPassword' as never) },
      ]
    },
    {
      title: 'Payments & Offers',
      items: [
        { icon: CreditCard, label: 'Payment Methods', onPress: () => {} },
        { icon: Bell, label: 'Promotions', onPress: () => {} },
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help Center', onPress: () => {} },
        { icon: Settings, label: 'AppSettings', onPress: () => {} },
      ]
    }
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={styles.header}>
          <Text variant="h1" style={styles.headerTitle}>Profile</Text>
          <View style={styles.profileCard}>
            <Avatar name="John Doe" size={80} style={styles.avatar} />
            <View style={styles.profileInfo}>
              <Text variant="h2">John Doe</Text>
              <Text variant="bodyMedium" color={COLORS.textMuted}>john.doe@example.com</Text>
              <View style={styles.verifiedBadge}>
                <Text variant="caption" color={COLORS.primary} style={{ fontWeight: '700' }}>Gold Member</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text variant="h3">24</Text>
            <Text variant="bodySmall" color={COLORS.textMuted}>Bookings</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text variant="h3">12</Text>
            <Text variant="bodySmall" color={COLORS.textMuted}>Reviews</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text variant="h3">4</Text>
            <Text variant="bodySmall" color={COLORS.textMuted}>Saved</Text>
          </View>
        </View>

        {menuGroups.map((group, groupIdx) => (
          <View key={groupIdx} style={styles.menuGroup}>
            <Text variant="caption" color={COLORS.textMuted} style={styles.groupTitle}>
              {group.title}
            </Text>
            <Card variant="outline" padding="none" style={styles.groupCard}>
              {group.items.map((item, idx) => (
                <Pressable
                  key={idx}
                  style={[
                    styles.menuItem,
                    idx === group.items.length - 1 && { borderBottomWidth: 0 }
                  ]}
                  onPress={item.onPress}
                >
                  <View style={styles.menuItemLeft}>
                    <View style={styles.iconContainer}>
                      <item.icon color={COLORS.primary} size={20} />
                    </View>
                    <Text variant="label">{item.label}</Text>
                  </View>
                  <ChevronRight color={COLORS.border} size={20} />
                </Pressable>
              ))}
            </Card>
          </View>
        ))}

        <View style={styles.logoutContainer}>
          <Button
            title="Log Out"
            variant="error"
            leftIcon={<LogOut size={20} color={COLORS.white} />}
            onPress={() => (navigation as any).replace('Login')}
            style={styles.logoutBtn}
          />
          <Text variant="bodySmall" color={COLORS.textMuted} align="center" style={{ marginTop: 16 }}>
            KaamSetu v1.0.4
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerTitle: {
    marginBottom: 24,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    borderWidth: 4,
    borderColor: COLORS.primaryLight,
  },
  profileInfo: {
    marginLeft: 20,
    flex: 1,
  },
  verifiedBadge: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    marginHorizontal: 24,
    marginTop: -20,
    borderRadius: 20,
    padding: 20,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: '60%',
    backgroundColor: COLORS.border,
    alignSelf: 'center',
  },
  menuGroup: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  groupTitle: {
    marginLeft: 4,
    marginBottom: 12,
  },
  groupCard: {
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  logoutContainer: {
    paddingHorizontal: 24,
    marginTop: 40,
  },
  logoutBtn: {
    height: 56,
  },
});
