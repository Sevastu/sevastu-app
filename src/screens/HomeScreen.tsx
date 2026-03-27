import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { MapPin, Search, Bell, Zap, Droplets, Home as HomeIcon, Wind } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SPACING } from '../theme';
import { Text } from '../components/ui/Typography';
import { Avatar } from '../components/ui/Avatar';
import { CategoryChip } from '../components/CategoryChip';
import { WorkerCard } from '../components/WorkerCard';
import { Skeleton } from '../components/ui/Skeleton';
import { workerService, Worker } from '../services/workerService';

const CATEGORIES = [
  { id: '1', name: 'Electrician', Icon: Zap },
  { id: '2', name: 'Plumber', Icon: Droplets },
  { id: '3', name: 'Maid', Icon: HomeIcon },
  { id: '4', name: 'AC Repair', Icon: Wind },
  { id: '5', name: 'Painter', Icon: Zap },
  { id: '6', name: 'Carpenter', Icon: HomeIcon },
];

export const HomeScreen = () => {
  const navigation = useNavigation();
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await workerService.getWorkersNearby();
      setWorkers(data);
    } catch (err: any) {
      setError('Failed to fetch nearby workers.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View>
        <Text variant="bodySmall" color={COLORS.textMuted}>Current Location</Text>
        <View style={styles.locationRow}>
          <MapPin size={16} color={COLORS.primary} fill={COLORS.primary + '20'} />
          <Text variant="label" style={styles.locationText}>Mithapur, Patna</Text>
        </View>
      </View>
      <View style={styles.headerActions}>
        <Pressable style={styles.iconBtn}>
          <Bell size={22} color={COLORS.text} />
          <View style={styles.badge} />
        </Pressable>
        <Pressable onPress={() => (navigation as any).navigate('Profile')}>
          <Avatar name="User" size={42} />
        </Pressable>
      </View>
    </View>
  );

  const renderSearch = () => (
    <View style={styles.searchContainer}>
      <Text variant="h2" style={styles.greeting}>What service do you need today?</Text>
      <Pressable
        style={styles.fakeSearch}
        onPress={() => (navigation as any).navigate('Search')}
      >
        <Search size={20} color={COLORS.textMuted} />
        <Text variant="bodyMedium" color={COLORS.textMuted} style={styles.searchText}>
          Search for "Electrician"...
        </Text>
      </Pressable>
    </View>
  );

  const renderCategories = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text variant="h3">Categories</Text>
        <Pressable>
          <Text variant="bodySmall" color={COLORS.primary} style={{ fontWeight: '700' }}>See All</Text>
        </Pressable>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesList}
      >
        <CategoryChip
          label="All"
          active={activeCategory === 'All'}
          onPress={() => setActiveCategory('All')}
        />
        {CATEGORIES.map((cat) => (
          <CategoryChip
            key={cat.id}
            label={cat.name}
            Icon={<cat.Icon size={16} color={activeCategory === cat.name ? COLORS.white : COLORS.primary} />}
            active={activeCategory === cat.name}
            onPress={() => setActiveCategory(cat.name)}
          />
        ))}
      </ScrollView>
    </View>
  );

  const renderFeatured = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text variant="h3">Top Rated Workers</Text>
        <Pressable>
          <Text variant="bodySmall" color={COLORS.primary} style={{ fontWeight: '700' }}>View More</Text>
        </Pressable>
      </View>
      {loading ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} width={280} height={180} style={{ marginRight: 16, borderRadius: 16 }} />
          ))}
        </ScrollView>
      ) : (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={workers.slice(0, 5)}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.horizontalList}
          renderItem={({ item }) => (
            <WorkerCard
              worker={item}
              horizontal
              onPress={() => (navigation as any).navigate('WorkerProfile', { workerId: item.id })}
              onBook={() => (navigation as any).navigate('Booking', { workerId: item.id })}
            />
          )}
        />
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
      >
        <View style={{ backgroundColor: COLORS.background }}>
          {renderHeader()}
        </View>

        {renderSearch()}
        {renderCategories()}
        {renderFeatured()}

        <View style={styles.section}>
          <Text variant="h3" style={styles.sectionTitle}>Available Nearby</Text>
          {loading ? (
            <View style={{ paddingHorizontal: 16 }}>
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} width="100%" height={120} style={{ marginBottom: 16, borderRadius: 16 }} />
              ))}
            </View>
          ) : (
            <View style={{ paddingHorizontal: 16 }}>
              {workers.map((item) => (
                <WorkerCard
                  key={item.id}
                  worker={item}
                  onPress={() => (navigation as any).navigate('WorkerProfile', { workerId: item.id })}
                  onBook={() => (navigation as any).navigate('Booking', { workerId: item.id })}
                />
              ))}
            </View>
          )}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.background,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  locationText: {
    marginLeft: 4,
    fontWeight: '700',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.error,
    borderWidth: 1.5,
    borderColor: COLORS.white,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  greeting: {
    marginBottom: 16,
    width: '80%',
  },
  fakeSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    height: 54,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  searchText: {
    marginLeft: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categoriesList: {
    paddingHorizontal: 16,
  },
  horizontalList: {
    paddingHorizontal: 16,
  },
});