import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  Pressable,
  Image,
  Platform,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Star, CheckCircle, ChevronLeft, MessageSquare, Share2, ShieldCheck, MapPin } from 'lucide-react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../theme';
import { Text } from '../components/ui/Typography';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
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
        <Text color={COLORS.error}>{error || 'Worker not found'}</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} style={{ marginTop: 20 }} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        {/* HERO IMAGE SECTION */}
        <View style={styles.heroSection}>
          <Image
            source={{ uri: worker.avatar || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800' }}
            style={styles.heroImage}
          />
          <SafeAreaView style={styles.headerOverlay}>
            <View style={styles.headerRow}>
              <Pressable style={styles.headerBtn} onPress={() => navigation.goBack()}>
                <ChevronLeft size={24} color={COLORS.white} />
              </Pressable>
              <View style={{ flexDirection: 'row' }}>
                <Pressable style={styles.headerBtn}>
                  <Share2 size={20} color={COLORS.white} />
                </Pressable>
              </View>
            </View>
          </SafeAreaView>
        </View>

        {/* PROFILE INFO */}
        <View style={styles.profileCard}>
          <View style={styles.nameSection}>
            <View>
              <Text variant="h1">{worker.name}</Text>
              <Text variant="bodyLarge" color={COLORS.textMuted}>{worker.category}</Text>
            </View>
            <View style={styles.verifiedBadge}>
              <ShieldCheck size={20} color={COLORS.primary} />
              <Text variant="caption" color={COLORS.primary} style={{ marginLeft: 4 }}>Verified</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <View style={styles.ratingRow}>
                <Star size={18} color={COLORS.warning} fill={COLORS.warning} />
                <Text variant="h3" style={{ marginLeft: 6 }}>{worker.rating}</Text>
              </View>
              <Text variant="bodySmall" color={COLORS.textMuted}>Rating</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text variant="h3">{worker.completedJobs || 120}+</Text>
              <Text variant="bodySmall" color={COLORS.textMuted}>Jobs Done</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text variant="h3">5</Text>
              <Text variant="bodySmall" color={COLORS.textMuted}>Expr. Yrs</Text>
            </View>
          </View>

          <View style={styles.locationInfo}>
            <MapPin size={16} color={COLORS.textMuted} />
            <Text variant="bodyMedium" color={COLORS.textMuted} style={{ marginLeft: 4 }}>
              Serving Patna, Bihar (within 5 km)
            </Text>
          </View>
        </View>

        {/* SKILLS SECTION */}
        <View style={styles.section}>
          <Text variant="h3" style={styles.sectionTitle}>Skills & Expertise</Text>
          <View style={styles.skillsList}>
            {(worker.skills || ['Full Repair', 'Maintenance', 'Installation']).map((skill, index) => (
              <Badge key={index} label={skill} style={styles.skillBadge} />
            ))}
          </View>
        </View>

        {/* ABOUT SECTION */}
        <View style={styles.section}>
          <Text variant="h3" style={styles.sectionTitle}>About</Text>
          <Text variant="bodyMedium" color={COLORS.textMuted} style={{ lineHeight: 22 }}>
            I am a professional {worker.category} with over 5 years of experience. I specialize in providing high-quality, reliable services at affordable prices. Customer satisfaction is my top priority.
          </Text>
        </View>

        {/* REVIEWS SECTION */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text variant="h3">Recent Reviews</Text>
            <Pressable>
              <Text variant="bodySmall" color={COLORS.primary} style={{ fontWeight: '700' }}>See All</Text>
            </Pressable>
          </View>
          {(worker.reviews || [
            { userName: 'Amit Kumar', comment: 'Excellent work, very professional and punctual.', rating: 5 },
            { userName: 'Rahul Singh', comment: 'Fixed the leak quickly. Highly recommended!', rating: 4 }
          ]).map((review, idx) => (
            <Card key={idx} variant="outline" padding="md" style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Avatar name={review.userName} size={32} />
                <View style={{ marginLeft: 12, flex: 1 }}>
                  <Text variant="label">{review.userName}</Text>
                  <View style={styles.reviewRating}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={10} color={s <= review.rating ? COLORS.warning : COLORS.border} fill={s <= review.rating ? COLORS.warning : 'transparent'} />
                    ))}
                  </View>
                </View>
              </View>
              <Text variant="bodyMedium" color={COLORS.textMuted} style={{ marginTop: 8 }}>{review.comment}</Text>
            </Card>
          ))}
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* STICKY BOTTOM BAR */}
      <View style={styles.bottomBar}>
        <View style={styles.priceCol}>
          <Text variant="bodySmall" color={COLORS.textMuted}>Starting from</Text>
          <Text variant="h2" color={COLORS.primary}>₹{worker.price}</Text>
        </View>
        <View style={styles.actionCol}>
          <Button
            variant="outline"
            size="lg"
            style={[styles.actionBtn, { marginRight: 12 }]}
            leftIcon={<MessageSquare size={20} color={COLORS.primary} />}
            onPress={() => (navigation as any).navigate('Chat', { workerId: worker.id })}
            title=""
          />
          <Button
            title="Book Now"
            size="lg"
            style={styles.bookBtn}
            onPress={() => (navigation as any).navigate('Booking', { workerId: worker.id })}
          />
        </View>
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
  heroSection: {
    height: 350,
    width: '100%',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
    backgroundColor: COLORS.white,
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  nameSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background,
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: '60%',
    backgroundColor: COLORS.border,
    alignSelf: 'center',
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    padding: 24,
    backgroundColor: COLORS.white,
    marginTop: 8,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  skillsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillBadge: {
    marginRight: 8,
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  reviewCard: {
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewRating: {
    flexDirection: 'row',
    marginTop: 2,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 8,
  },
  priceCol: {
    flex: 1,
  },
  actionCol: {
    flex: 2,
    flexDirection: 'row',
  },
  actionBtn: {
    width: 56,
  },
  bookBtn: {
    flex: 1,
  },
});
