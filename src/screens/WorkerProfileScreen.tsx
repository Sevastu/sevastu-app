import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Star, CheckCircle } from 'lucide-react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { Button } from '../components/Button';
import { workerService, Worker } from '../services/workerService';

export const WorkerProfileScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { workerId } = route.params as { workerId: string };

    const [worker, setWorker] = useState<Worker | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchWorkerDetails();
    }, [workerId]);

    const fetchWorkerDetails = async () => {
        try {
            setLoading(true);
            const data = await workerService.getWorkerById(workerId);
            setWorker(data);
        } catch (err: any) {
            setError('Failed to load worker profile.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    if (error || !worker) {
        return (
            <View style={styles.center}>
                <Text style={{ color: 'red' }}>{error || 'Worker not found'}</Text>
                <Button title="Go Back" onPress={() => navigation.goBack()} style={{ marginTop: 20 }} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{worker.name.charAt(0)}</Text>
                    </View>
                    <Text style={styles.name}>{worker.name}</Text>
                    <Text style={styles.category}>{worker.category}</Text>

                    <View style={styles.statsContainer}>
                        <View style={styles.statBox}>
                            <Star size={20} color="#FBBF24" fill="#FBBF24" />
                            <Text style={styles.statValue}>{worker.rating}</Text>
                            <Text style={styles.statLabel}>Rating</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.statBox}>
                            <CheckCircle size={20} color={COLORS.primary} />
                            <Text style={styles.statValue}>{worker.completedJobs}</Text>
                            <Text style={styles.statLabel}>Jobs Done</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Skills</Text>
                    <View style={styles.skillsContainer}>
                        {worker.skills?.map((skill, index) => (
                            <View key={index} style={styles.skillBadge}>
                                <Text style={styles.skillText}>{skill}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Pricing</Text>
                    <View style={styles.priceContainer}>
                        <Text style={styles.priceDescription}>Standard Service Call</Text>
                        <Text style={styles.price}>₹{worker.price}</Text>
                    </View>
                </View>

                {worker.reviews && worker.reviews.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Reviews</Text>
                        {worker.reviews.map((review, idx) => (
                            <View key={idx} style={{ marginBottom: 12 }}>
                                <Text style={{ fontWeight: '600' }}>{review.userName}</Text>
                                <Text style={{ color: COLORS.gray }}>{review.comment}</Text>
                            </View>
                        ))}
                    </View>
                )}

                <View style={{ height: 100 }} />
            </ScrollView>

            <View style={styles.bottomBar}>
                <Button
                    title="Chat"
                    variant="outline"
                    style={styles.actionBtn}
                    onPress={() => (navigation as any).navigate('Chat', { workerId: worker.id })}
                />
                <View style={{ width: SPACING.md }} />
                <Button
                    title="Book Now"
                    style={styles.actionBtn}
                    onPress={() => (navigation as any).navigate('Booking', { workerId: worker.id })}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    header: {
        backgroundColor: COLORS.white,
        padding: SPACING.lg,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: COLORS.primary + '20',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: SPACING.md,
    },
    avatarText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 4,
    },
    category: {
        fontSize: 16,
        color: COLORS.gray,
        marginBottom: SPACING.md,
    },
    statsContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-evenly',
        marginTop: SPACING.md,
        paddingTop: SPACING.md,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    statBox: {
        alignItems: 'center',
    },
    divider: {
        width: 1,
        height: '100%',
        backgroundColor: COLORS.border,
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 4,
        color: COLORS.text,
    },
    statLabel: {
        fontSize: 12,
        color: COLORS.gray,
        marginTop: 2,
    },
    section: {
        padding: SPACING.lg,
        backgroundColor: COLORS.white,
        marginTop: SPACING.md,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: SPACING.md,
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    skillBadge: {
        backgroundColor: COLORS.background,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
        borderRadius: BORDER_RADIUS.lg,
        marginRight: SPACING.sm,
        marginBottom: SPACING.sm,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    skillText: {
        color: COLORS.text,
        fontSize: 14,
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SPACING.md,
        backgroundColor: COLORS.background,
        borderRadius: BORDER_RADIUS.md,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    priceDescription: {
        fontSize: 16,
        color: COLORS.text,
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.white,
        flexDirection: 'row',
        padding: SPACING.lg,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    actionBtn: {
        flex: 1,
    },
});
