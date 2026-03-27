import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ChevronLeft, Info, MapPin } from 'lucide-react-native';
import { COLORS, SPACING } from '../theme';
import { Text } from '../components/ui/Typography';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
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
        address: 'Mithapur, Patna - 800001', // Mock address
      });

      Alert.alert(
        "Booking Successful!",
        "Your service has been scheduled. The professional will arrive at the selected time.",
        [{ text: "Great!", onPress: () => (navigation as any).navigate('HomeTab') }]
      );
    } catch (err: any) {
      Alert.alert("Error", "Could not complete booking. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={24} color={COLORS.text} />
        </Pressable>
        <Text variant="h3" style={{ marginLeft: 12 }}>Schedule Service</Text>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Card variant="outline" padding="md" style={styles.workerSummary}>
            <View style={styles.summaryRow}>
              <View>
                <Text variant="h4">{worker?.name}</Text>
                <Text variant="bodySmall" color={COLORS.textMuted}>{worker?.category}</Text>
              </View>
              <Text variant="h3" color={COLORS.primary}>₹{worker?.price}</Text>
            </View>
            <View style={styles.addressRow}>
              <MapPin size={16} color={COLORS.textMuted} />
              <Text variant="bodyMedium" color={COLORS.textMuted} style={{ marginLeft: 6 }}>
                Mithapur, Patna (Change)
              </Text>
            </View>
          </Card>

          <View style={styles.section}>
            <Text variant="h4" style={styles.sectionTitle}>Select Date</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipList}>
              {dates.map((date) => (
                <Pressable
                  key={date}
                  style={[styles.chip, selectedDate === date && styles.chipActive]}
                  onPress={() => setSelectedDate(date)}
                  disabled={bookingLoading}
                >
                  <Text
                    variant="label"
                    style={[styles.chipText, selectedDate === date && styles.chipTextActive]}
                  >
                    {date}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          <View style={styles.section}>
            <Text variant="h4" style={styles.sectionTitle}>Select Time Slot</Text>
            <View style={styles.timeGrid}>
              {times.map((time) => (
                <Pressable
                  key={time}
                  style={[styles.timeChip, selectedTime === time && styles.timeChipActive]}
                  onPress={() => setSelectedTime(time)}
                  disabled={bookingLoading}
                >
                  <Text
                    variant="bodyMedium"
                    style={[styles.timeChipText, selectedTime === time && styles.timeChipTextActive]}
                  >
                    {time}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <Card variant="flat" padding="md" style={styles.infoBox}>
            <View style={styles.infoRow}>
              <Info size={18} color={COLORS.info} />
              <Text variant="bodySmall" color={COLORS.info} style={styles.infoText}>
                The professional might contact you 30 minutes before arrival to confirm the location.
              </Text>
            </View>
          </Card>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text variant="bodyLarge" color={COLORS.textMuted}>Grand Total</Text>
          <Text variant="h2" color={COLORS.primary}>₹{worker?.price}</Text>
        </View>
        <Button
          title="Confirm & Schedule"
          onPress={handleConfirm}
          loading={bookingLoading}
          size="lg"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 24,
  },
  workerSummary: {
    marginBottom: 24,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    borderStyle: 'dashed',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  chipList: {
    paddingBottom: 4,
  },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    marginRight: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  chipText: {
    fontWeight: '600',
    color: COLORS.textMuted,
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
    width: '31%',
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  timeChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  timeChipText: {
    fontWeight: '600',
    color: COLORS.text,
  },
  timeChipTextActive: {
    color: COLORS.white,
  },
  infoBox: {
    backgroundColor: COLORS.info + '10',
    borderColor: COLORS.info + '30',
    borderWidth: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoText: {
    marginLeft: 12,
    flex: 1,
    lineHeight: 18,
  },
  footer: {
    padding: 24,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
});
