import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { User, Settings, CreditCard, HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { Button } from '../components/Button';

export const ProfileScreen = () => {
    const menuItems = [
        { icon: User, label: 'Edit Profile' },
        { icon: CreditCard, label: 'Payment Methods' },
        { icon: Settings, label: 'Settings' },
        { icon: HelpCircle, label: 'Help & Support' },
    ];

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <View style={styles.avatarContainer}>
                    <Text style={styles.avatarText}>U</Text>
                </View>
                <Text style={styles.name}>John Doe</Text>
                <Text style={styles.email}>john.doe@example.com</Text>
                <View style={styles.phoneBadge}>
                    <Text style={styles.phoneText}>+91 9876543210</Text>
                </View>
            </View>

            <View style={styles.menuContainer}>
                {menuItems.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.menuItem}>
                        <View style={styles.menuItemLeft}>
                            <item.icon color={COLORS.gray} size={24} style={styles.menuIcon} />
                            <Text style={styles.menuLabel}>{item.label}</Text>
                        </View>
                        <ChevronRight color={COLORS.gray} size={20} />
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.logoutContainer}>
                <Button
                    title="Logout"
                    variant="outline"
                    onPress={() => { }}
                    style={styles.logoutButton}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        backgroundColor: COLORS.white,
        paddingVertical: SPACING.lg + 20,
        paddingHorizontal: SPACING.lg,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: SPACING.md,
    },
    avatarText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: COLORS.white,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 4,
    },
    email: {
        fontSize: 14,
        color: COLORS.gray,
        marginBottom: SPACING.md,
    },
    phoneBadge: {
        backgroundColor: COLORS.background,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
        borderRadius: BORDER_RADIUS.lg,
    },
    phoneText: {
        color: COLORS.text,
        fontWeight: '500',
    },
    menuContainer: {
        marginTop: SPACING.md,
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: COLORS.border,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.lg,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.background,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuIcon: {
        marginRight: SPACING.md,
    },
    menuLabel: {
        fontSize: 16,
        color: COLORS.text,
    },
    logoutContainer: {
        padding: SPACING.lg,
        marginTop: SPACING.md,
    },
    logoutButton: {
        borderColor: 'red',
    },
});
