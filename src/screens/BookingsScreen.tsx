import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import { Calendar, Clock } from 'lucide-react-native';
import { Button } from '../components/Button';
import { jobService, Job } from '../services/jobService';

export const BookingsScreen = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await jobService.getMyJobs();
            setJobs(data);
        } catch (err) {
            setError('Failed to fetch your bookings.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <View style={styles.center}><ActivityIndicator color={COLORS.primary} /></View>;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Bookings</Text>
            </View>

            <FlatList
                data={jobs}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => (
                    <View style={styles.bookingCard}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.serviceName}>{item.service}</Text>
                            <View style={[
                                styles.statusBadge,
                                item.status === 'completed' ? styles.statusCompleted : styles.statusOngoing
                            ]}>
                                <Text style={[
                                    styles.statusText,
                                    item.status === 'completed' ? styles.statusTextCompleted : styles.statusTextOngoing
                                ]}>
                                    {item.status.toUpperCase()}
                                </Text>
                            </View>
                        </View>

                        <Text style={styles.workerName}>Provider: {item.workerName}</Text>

                        <View style={styles.dateTimeContainer}>
                            <View style={styles.dateTime}>
                                <Calendar size={16} color={COLORS.gray} style={styles.icon} />
                                <Text style={styles.dateTimeText}>{item.date}</Text>
                            </View>
                            <View style={styles.dateTime}>
                                <Clock size={16} color={COLORS.gray} style={styles.icon} />
                                <Text style={styles.dateTimeText}>{item.time}</Text>
                            </View>
                        </View>

                        {item.status === 'ongoing' && (
                            <View style={styles.actions}>
                                <Button title="Reschedule" variant="outline" style={styles.actionBtn} />
                                <View style={{ width: SPACING.sm }} />
                                <Button title="Cancel" variant="outline" style={styles.actionBtn} />
                            </View>
                        )}
                    </View>
                )}
                ListEmptyComponent={() => (
                    <View style={{ marginTop: 50, alignItems: 'center' }}>
                        <Text style={{ color: COLORS.gray }}>No bookings found.</Text>
                        <Button title="Find Services" onPress={() => { }} style={{ marginTop: 20 }} />
                    </View>
                )}
                onRefresh={fetchJobs}
                refreshing={loading}
            />
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
    },
    header: {
        paddingTop: 40,
        paddingHorizontal: SPACING.md,
        paddingBottom: SPACING.md,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    listContainer: {
        padding: SPACING.md,
    },
    bookingCard: {
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.md,
        padding: SPACING.md,
        marginBottom: SPACING.md,
        ...SHADOWS.light,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.sm,
    },
    serviceName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    statusBadge: {
        paddingHorizontal: SPACING.sm,
        paddingVertical: 4,
        borderRadius: BORDER_RADIUS.sm,
    },
    statusOngoing: {
        backgroundColor: '#FEF3C7',
    },
    statusCompleted: {
        backgroundColor: '#D1FAE5',
    },
    statusText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    statusTextOngoing: {
        color: '#D97706',
    },
    statusTextCompleted: {
        color: '#059669',
    },
    workerName: {
        fontSize: 16,
        color: COLORS.text,
        marginBottom: SPACING.sm,
    },
    dateTimeContainer: {
        flexDirection: 'row',
        marginBottom: SPACING.md,
    },
    dateTime: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: SPACING.lg,
    },
    icon: {
        marginRight: 4,
    },
    dateTimeText: {
        color: COLORS.gray,
        fontSize: 14,
    },
    actions: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        paddingTop: SPACING.md,
    },
    actionBtn: {
        flex: 1,
        paddingVertical: SPACING.sm,
    },
});
