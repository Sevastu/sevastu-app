import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar, Clock, ChevronRight } from 'lucide-react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../theme';
import { Card } from './ui/Card';
import { Text } from './ui/Typography';
import { Badge } from './ui/Badge';

export interface Booking {
  id: string;
  serviceName: string;
  workerName: string;
  date: string;
  time: string;
  status: 'requested' | 'accepted' | 'completed' | 'cancelled';
  price: number;
}

interface JobCardProps {
  booking: Booking;
  onPress?: (id: string) => void;
}

export const JobCard: React.FC<JobCardProps> = ({
  booking,
  onPress,
}) => {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'accepted': return 'info';
      case 'requested': return 'warning';
      case 'cancelled': return 'error';
      default: return 'neutral';
    }
  };

  return (
    <Card
      onPress={() => onPress?.(booking.id)}
      variant="outline"
      style={styles.container}
    >
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text variant="h4" style={styles.title}>{booking.serviceName}</Text>
          <Text variant="bodySmall" color={COLORS.textMuted}>Worker: {booking.workerName}</Text>
        </View>
        <Badge
          label={booking.status.toUpperCase()}
          variant={getStatusVariant(booking.status)}
        />
      </View>

      <View style={styles.divider} />

      <View style={styles.detailsRow}>
        <View style={styles.detailItem}>
          <Calendar size={14} color={COLORS.textMuted} />
          <Text variant="bodySmall" color={COLORS.textMuted} style={styles.detailText}>
            {booking.date}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Clock size={14} color={COLORS.textMuted} />
          <Text variant="bodySmall" color={COLORS.textMuted} style={styles.detailText}>
            {booking.time}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text variant="h4" color={COLORS.primary}>₹{booking.price}</Text>
        <View style={styles.detailsBtn}>
          <Text variant="bodyMedium" color={COLORS.primary} style={{ fontWeight: '600', marginRight: 4 }}>
            View Details
          </Text>
          <ChevronRight size={16} color={COLORS.primary} />
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    backgroundColor: COLORS.card,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    marginBottom: 4,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 12,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  detailText: {
    marginLeft: 6,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
