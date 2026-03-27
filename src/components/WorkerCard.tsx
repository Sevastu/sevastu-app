import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Star, MapPin } from 'lucide-react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../theme';
import { Card } from './ui/Card';
import { Avatar } from './ui/Avatar';
import { Text } from './ui/Typography';
import { Button } from './ui/Button';

import { workerService, Worker } from '../services/workerService';

interface WorkerCardProps {
  worker: Worker;
  onChat?: () => void;
  onBook?: () => void;
  onPress?: () => void;
  horizontal?: boolean;
}

export const WorkerCard: React.FC<WorkerCardProps> = ({
  worker,
  onChat,
  onBook,
  onPress,
  horizontal = false,
}) => {
  return (
    <Card
      onPress={onPress}
      variant="outline"
      style={[
        styles.container,
        horizontal ? { width: 280, marginRight: 16 } : {}
      ]}
      padding="none"
    >
      <View style={styles.paddingContainer}>
        <View style={styles.header}>
          <Avatar name={worker.name} source={worker.avatar} size={50} />
          <View style={styles.headerInfo}>
            <View style={styles.nameRow}>
              <Text variant="h4" style={styles.name}>{worker.name}</Text>
              <View style={styles.ratingBox}>
                <Star size={12} color={COLORS.warning} fill={COLORS.warning} />
                <Text variant="bodySmall" style={styles.ratingText}>{worker.rating}</Text>
              </View>
            </View>
            <Text variant="bodySmall" color={COLORS.textMuted}>{worker.category}</Text>
          </View>
        </View>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <MapPin size={14} color={COLORS.textMuted} />
            <Text variant="bodySmall" color={COLORS.textMuted} style={styles.metaText}>
              {worker.distance || '1.2 km'}
            </Text>
          </View>
          <View style={styles.priceContainer}>
            <Text variant="bodySmall" color={COLORS.textMuted}>Starting from </Text>
            <Text variant="bodyMedium" color={COLORS.primary} style={styles.priceText}>
              ₹{worker.price}
            </Text>
          </View>
        </View>

        <View style={styles.actions}>
          <Button
            title="Chat"
            variant="outline"
            size="sm"
            onPress={onChat}
            style={styles.actionBtn}
          />
          <View style={{ width: 12 }} />
          <Button
            title="Book Now"
            variant="primary"
            size="sm"
            onPress={onBook}
            style={styles.actionBtn}
          />
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    overflow: 'hidden',
    backgroundColor: COLORS.card,
  },
  paddingContainer: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.warning + '15',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.sm,
  },
  ratingText: {
    marginLeft: 4,
    fontWeight: '700',
    color: COLORS.warning,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    marginLeft: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    fontWeight: '800',
  },
  actions: {
    flexDirection: 'row',
  },
  actionBtn: {
    flex: 1,
  },
});