import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StatusBar as RNStatusBar,
} from 'react-native';
import { Search, Filter, Calendar } from 'lucide-react-native';
import { COLORS, SPACING } from '../theme';
import { Text } from '../components/ui/Typography';
import { JobCard, Booking } from '../components/JobCard';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { jobService, Job } from '../services/jobService';

export const BookingsScreen = () => {
  const [jobs, setJobs] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await jobService.getMyJobs();
      
      // Map API data to our Booking type for UI consistency
      const mappedJobs: Booking[] = data.map((job: any) => ({
        id: job.id,
        serviceName: job.service || 'General Service',
        workerName: job.workerName || 'Assigned Professional',
        date: job.date || 'TBD',
        time: job.time || 'Morning',
        status: (job.status === 'ongoing' ? 'accepted' : job.status) as any,
        price: job.price || 0,
      }));
      
      setJobs(mappedJobs);
    } catch (err) {
      setError('Failed to fetch your bookings.');
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter(job =>
    job.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.workerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text variant="h1">My Bookings</Text>
          <Text variant="bodyMedium" color={COLORS.textMuted}>Manage your service requests</Text>
        </View>

        <View style={styles.filterSection}>
          <Input
            placeholder="Search bookings..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            leftIcon={<Search size={20} color={COLORS.textMuted} />}
            containerStyle={styles.searchBar}
            style={styles.input}
          />
          <Button
            title=""
            variant="outline"
            style={styles.filterBtn}
            leftIcon={<Filter size={20} color={COLORS.text} />}
          />
        </View>

        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : (
          <FlatList
            data={filteredJobs}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <JobCard
                booking={item}
                onPress={() => {}}
              />
            )}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <View style={styles.emptyIcon}>
                  <Calendar size={48} color={COLORS.textMuted} />
                </View>
                <Text variant="h3" align="center" style={styles.emptyTitle}>No Bookings Found</Text>
                <Text variant="bodyMedium" color={COLORS.textMuted} align="center" style={styles.emptySubtitle}>
                  You haven't booked any services yet. Find a professional to get started.
                </Text>
                <Button
                  title="Explore Services"
                  onPress={() => {}}
                  style={styles.exploreBtn}
                />
              </View>
            )}
            onRefresh={fetchJobs}
            refreshing={loading}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
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
  header: {
    padding: 24,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  filterSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    zIndex: 1,
  },
  searchBar: {
    flex: 1,
    marginBottom: 0,
    marginRight: 12,
  },
  input: {
    height: 48,
  },
  filterBtn: {
    width: 48,
    height: 48,
    paddingHorizontal: 0,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  emptyTitle: {
    marginBottom: 8,
  },
  emptySubtitle: {
    marginBottom: 32,
    lineHeight: 22,
  },
  exploreBtn: {
    paddingHorizontal: 32,
  },
});
