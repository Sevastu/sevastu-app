import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, ScrollView, ActivityIndicator } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { WorkerCard } from '../components/WorkerCard';
import { Input } from '../components/Input';
import { Search } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { workerService, Worker } from '../services/workerService';

export const SearchScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');
    const [workers, setWorkers] = useState<Worker[]>([]);
    const [loading, setLoading] = useState(true);

    const filters = ['All', 'Price', 'Rating', 'Distance'];

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
        <View style={styles.container}>
            <View style={styles.header}>
                <Input
                    placeholder="Search for workers, categories..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    icon={<Search color={COLORS.gray} size={20} />}
                    style={styles.searchInput}
                />
                <View style={styles.filtersContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {filters.map(filter => (
                            <TouchableOpacity
                                key={filter}
                                style={[
                                    styles.filterBtn,
                                    activeFilter === filter && styles.filterBtnActive
                                ]}
                                onPress={() => setActiveFilter(filter)}
                            >
                                <Text style={[
                                    styles.filterText,
                                    activeFilter === filter && styles.filterTextActive
                                ]}>
                                    {filter}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </View>

            {loading ? (
                <View style={styles.center}><ActivityIndicator color={COLORS.primary} /></View>
            ) : (
                <FlatList
                    data={filteredWorkers}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContainer}
                    renderItem={({ item }) => (
                        <View style={styles.cardWrapper}>
                            <WorkerCard
                                worker={item}
                                onChat={() => (navigation as any).navigate('Chat', { workerId: item.id })}
                                onBook={() => (navigation as any).navigate('Booking', { workerId: item.id })}
                                onPress={() => (navigation as any).navigate('WorkerProfile', { workerId: item.id })}
                            />
                        </View>
                    )}
                    ListEmptyComponent={() => (
                        <View style={{ marginTop: 50, alignItems: 'center' }}>
                            <Text style={{ color: COLORS.gray }}>No workers found matching your search.</Text>
                        </View>
                    )}
                    onRefresh={fetchWorkers}
                    refreshing={loading}
                />
            )}
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
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        paddingBottom: SPACING.sm,
    },
    searchInput: {
        height: 48,
    },
    filtersContainer: {
        flexDirection: 'row',
        marginTop: -SPACING.sm,
        marginBottom: SPACING.sm,
    },
    filterBtn: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: 20,
        backgroundColor: COLORS.background,
        marginRight: SPACING.sm,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    filterBtnActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    filterText: {
        color: COLORS.gray,
        fontWeight: '500',
    },
    filterTextActive: {
        color: COLORS.white,
    },
    listContainer: {
        padding: SPACING.md,
        alignItems: 'center',
    },
    cardWrapper: {
        marginBottom: SPACING.md,
        width: '100%',
        alignItems: 'center',
    }
});
