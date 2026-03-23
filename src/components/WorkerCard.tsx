import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Star } from 'lucide-react-native';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import { Button } from './Button';

interface Worker {
  id: string;
  name: string;
  rating: number;
  price: number;
  category: string;
  distance?: string;
  isAvailable?: boolean;
}

interface WorkerCardProps {
  worker: Worker;
  onChat: () => void;
  onBook: () => void;
  onPress?: () => void;
}

export const WorkerCard: React.FC<WorkerCardProps> = ({
  worker,
  onChat,
  onBook,
  onPress,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <View style={styles.container}>
        
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {worker.name.charAt(0).toUpperCase()}
            </Text>
          </View>

          <View style={styles.info}>
            <Text style={styles.name}>{worker.name}</Text>
            <Text style={styles.category}>{worker.category}</Text>

            {/* Extra info */}
            <Text style={styles.meta}>
              📍 {worker.distance || 'Nearby'}
              {worker.isAvailable && ' • 🟢 Available'}
            </Text>
          </View>

          <View style={styles.ratingContainer}>
            <Star size={14} color="#FBBF24" fill="#FBBF24" />
            <Text style={styles.rating}>{worker.rating}</Text>
          </View>
        </View>

        {/* PRICE */}
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Starting from</Text>
          <Text style={styles.price}>₹{worker.price}</Text>
        </View>

        {/* ACTIONS */}
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginRight: SPACING.md,
    width: 260,
    ...SHADOWS.light,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },

  avatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
  },

  info: {
    flex: 1,
  },

  name: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
  },

  category: {
    fontSize: 13,
    color: COLORS.gray,
  },

  meta: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 2,
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: BORDER_RADIUS.sm,
  },

  rating: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
    color: '#D97706',
  },

  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: SPACING.sm,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },

  priceLabel: {
    color: COLORS.gray,
    fontSize: 12,
  },

  price: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
  },

  actions: {
    flexDirection: 'row',
    marginTop: SPACING.sm,
  },

  actionButton: {
    flex: 1,
    paddingVertical: 8,
  },
});