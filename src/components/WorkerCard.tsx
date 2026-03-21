import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Star } from 'lucide-react-native';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import { Button } from './Button';

interface Worker {
    id: string;
    name: string;
    rating: number;
    price: number;
    image?: string;
    category: string;
}

interface WorkerCardProps {
    worker: Worker;
    onChat: () => void;
    onBook: () => void;
    onPress?: () => void;
}

export const WorkerCard: React.FC<WorkerCardProps> = ({ worker, onChat, onBook, onPress }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarText}>{worker.name.charAt(0)}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.name}>{worker.name}</Text>
                    <Text style={styles.category}>{worker.category}</Text>
                </View>
                <View style={styles.ratingContainer}>
                    <Star size={16} color="#FBBF24" fill="#FBBF24" />
                    <Text style={styles.rating}>{worker.rating}</Text>
                </View>
            </View>

            <View style={styles.priceContainer}>
                <Text style={styles.priceLabel}>Starting from</Text>
                <Text style={styles.price}>₹{worker.price}</Text>
            </View>

            <View style={styles.actions}>
                <Button
                    title="Chat"
                    variant="outline"
                    onPress={onChat}
                    style={styles.actionButton}
                />
                <View style={{ width: SPACING.sm }} />
                <Button
                    title="Book"
                    variant="primary"
                    onPress={onBook}
                    style={styles.actionButton}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.md,
        marginBottom: SPACING.md,
        ...SHADOWS.light,
        width: 300,
        marginRight: SPACING.md,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    avatarPlaceholder: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: COLORS.primary + '20', // 20% opacity
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: SPACING.md,
    },
    avatarText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: 2,
    },
    category: {
        fontSize: 14,
        color: COLORS.gray,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FEF3C7',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: BORDER_RADIUS.sm,
    },
    rating: {
        marginLeft: 4,
        fontWeight: '600',
        color: '#D97706',
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.md,
        paddingTop: SPACING.md,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    priceLabel: {
        color: COLORS.gray,
        fontSize: 14,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionButton: {
        flex: 1,
        paddingVertical: SPACING.sm, // Make it a bit more compact for the card
    },
});
