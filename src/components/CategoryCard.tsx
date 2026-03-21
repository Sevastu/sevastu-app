import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import { LucideIcon } from 'lucide-react-native';

interface CategoryCardProps {
    label: string;
    Icon: LucideIcon;
    onPress: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ label, Icon, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
            <View style={styles.iconContainer}>
                <Icon size={24} color={COLORS.primary} />
            </View>
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.md,
        padding: SPACING.md,
        alignItems: 'center',
        justifyContent: 'center',
        width: '48%', // Approx half with some gap
        marginBottom: SPACING.md,
        ...SHADOWS.light,
    },
    iconContainer: {
        backgroundColor: COLORS.background,
        padding: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
        marginBottom: SPACING.sm,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.text,
    },
});
