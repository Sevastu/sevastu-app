import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { Search, SlidersHorizontal, MapPin } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SPACING } from '../theme';
import { Text } from '../components/ui/Typography';
import { Input } from '../components/ui/Input';
import { WorkerCard } from '../components/WorkerCard';
import { CategoryChip } from '../components/CategoryChip';
import { workerService, Worker } from '../services/workerService';

export const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);

  const filters = ['All', 'Electrician', 'Plumber', 'Maid', 'AC Repair', 'Painter', 'Carpenter'];

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      setLoading(true);
      const data = await workerService.getWorkersNearby();
      setWorkers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredWorkers = workers.filter(worker =>
    worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    worker.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text variant="h1" style={styles.headerTitle}>Find Professionals</Text>
          <View style={styles.searchRow}>
            <Input
              placeholder="Search services, workers..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              leftIcon={<Search size={20} color={COLORS.textMuted} />}
              containerStyle={styles.searchBar}
              style={styles.input}
            />
            <Pressable style={styles.filterBtn}>
              <SlidersHorizontal size={22} color={COLORS.text} />
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersList}
          >
            {filters.map(filter => (
              <CategoryChip
                key={filter}
                label={filter}
                active={activeFilter === filter}
                onPress={() => setActiveFilter(filter)}
              />
            ))}
          </ScrollView>
        </View>

        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : (
          <FlatList
            data={filteredWorkers}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <WorkerCard
                worker={item}
                onChat={() => (navigation as any).navigate('Chat', { workerId: item.id })}
                onBook={() => (navigation as any).navigate('Booking', { workerId: item.id })}
                onPress={() => (navigation as any).navigate('WorkerProfile', { workerId: item.id })}
              />
            )}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <View style={styles.emptyIcon}>
                  <Search size={40} color={COLORS.textMuted} />
                </View>
                <Text variant="h3" align="center" style={styles.emptyTitle}>No Results Found</Text>
                <Text variant="bodyMedium" color={COLORS.textMuted} align="center">
                  Try adjusting your search or filters to find what you're looking for.
                </Text>
              </View>
            )}
            onRefresh={fetchWorkers}
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
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
    zIndex: 10,
  },
  headerTitle: {
    marginBottom: 20,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    marginBottom: 0,
    marginRight: 12,
  },
  input: {
    height: 52,
  },
  filterBtn: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filtersList: {
    paddingBottom: 4,
  },
  listContainer: {
    padding: 20,
    paddingTop: 30, // Extra padding for the header shadow/overlap
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
  },
  emptyTitle: {
    marginBottom: 8,
  },
});
