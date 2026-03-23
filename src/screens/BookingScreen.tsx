import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { Button } from '../components/Button';
import { workerService, Worker } from '../services/workerService';
import { jobService } from '../services/jobService';

export const BookingScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { workerId } = route.params as { workerId: string };

    const [worker, setWorker] = useState<Worker | null>(null);
    const [loading, setLoading] = useState(true);
    const [bookingLoading, setBookingLoading] = useState(false);

    const dates = ['Today', 'Tomorrow', 'Mar 24', 'Mar 25', 'Mar 26'];
    const times = ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM', '06:00 PM'];

    const [selectedDate, setSelectedDate] = useState('Today');
    const [selectedTime, setSelectedTime] = useState('11:00 AM');

    useEffect(() => {
        fetchWorker();
    }, []);

    const fetchWorker = async () => {
        try {
            const data = await workerService.getWorkerById(workerId);
            setWorker(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleConfirm = async () => {
        if (!worker) return;

        try {
            setBookingLoading(true);
            await jobService.createJob({
                workerId: worker.id,
                service: worker.category,
                scheduledAt: `${selectedDate} ${selectedTime}`,
                address: 'User Primary Address', // Mock address
            });

            Alert.alert(
                "Booking Successful!",
                "Your service has been scheduled.",
                [{ text: "OK", onPress: () => (navigation as any).navigate('HomeTab') }]
            );
        } catch (err: any) {
            Alert.alert("Error", "Could not complete booking. Please try again.");
        } finally {
            setBookingLoading(false);
        }
    };

    if (loading) return <View style={styles.center}><ActivityIndicator color={COLORS.primary} /></View>;

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.workerSummary}>
                    <Text style={styles.workerName}>Booking: {worker?.name}</Text>
                    <Text style={styles.servicePrice}>Service: {worker?.category} • ₹{worker?.price}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Select Date</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {dates.map((date) => (
                            <TouchableOpacity
                                key={date}
                                style={[styles.chip, selectedDate === date && styles.chipActive]}
                                onPress={() => setSelectedDate(date)}
                                disabled={bookingLoading}
                            >
                                <Text style={[styles.chipText, selectedDate === date && styles.chipTextActive]}>
                                    {date}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Select Time</Text>
                    <View style={styles.timeGrid}>
                        {times.map((time) => (
                            <TouchableOpacity
                                key={time}
                                style={[styles.timeChip, selectedTime === time && styles.timeChipActive]}
                                onPress={() => setSelectedTime(time)}
                                disabled={bookingLoading}
                            >
                                <Text style={[styles.timeChipText, selectedTime === time && styles.timeChipTextActive]}>
                                    {time}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>

            <View style={styles.bottomBar}>
                <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>Total Check-out</Text>
                    <Text style={styles.totalAmount}>₹{worker?.price}</Text>
                </View>
                <Button
                    title="Confirm Booking"
                    onPress={handleConfirm}
                    isLoading={bookingLoading}
                    disabled={bookingLoading}
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
    },
    workerSummary: {
        backgroundColor: COLORS.white,
        padding: SPACING.lg,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    workerName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    servicePrice: {
        fontSize: 14,
        color: COLORS.gray,
        marginTop: 4,
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
    chip: {
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
        backgroundColor: COLORS.background,
        marginRight: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    chipActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    chipText: {
        fontSize: 16,
        color: COLORS.gray,
        fontWeight: '500',
    },
    chipTextActive: {
        color: COLORS.white,
    },
    timeGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    timeChip: {
        width: '48%',
        paddingVertical: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
        backgroundColor: COLORS.background,
        marginBottom: SPACING.md,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    timeChipActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    timeChipText: {
        fontSize: 16,
        color: COLORS.text,
        fontWeight: '500',
    },
    timeChipTextActive: {
        color: COLORS.white,
    },
    bottomBar: {
        backgroundColor: COLORS.white,
        padding: SPACING.lg,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    totalLabel: {
        fontSize: 16,
        color: COLORS.gray,
    },
    totalAmount: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.text,
    },
});
