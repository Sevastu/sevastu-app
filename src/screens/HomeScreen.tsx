import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { MapPin, Search } from 'lucide-react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { CategoryCard } from '../components/CategoryCard';
import { WorkerCard } from '../components/WorkerCard';
import { useNavigation } from '@react-navigation/native';
import { workerService, Worker } from '../services/workerService';

const CATEGORIES = [
    { id: '1', name: 'Electrician', iconName: 'zap' },
    { id: '2', name: 'Plumber', iconName: 'droplet' },
    { id: '3', name: 'Maid', iconName: 'home' },
    { id: '4', name: 'AC Repair', iconName: 'wind' },
];

export const HomeScreen = () => {
    const navigation = useNavigation();
    const [workers, setWorkers] = useState<Worker[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <View style={styles.locationContainer}>
                    <MapPin color={COLORS.primary} size={20} />
                    <Text style={styles.locationText}>Mithapur, Patna</Text>
                </View>
                <TouchableOpacity style={styles.profileBtn}>
                    <Text style={styles.profileBtnText}>U</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.searchSection}>
                <Text style={styles.greeting}>Find services</Text>
                <Text style={styles.subGreeting}>What do you need help with?</Text>

                <TouchableOpacity
                    style={styles.fakeSearchBar}
                    onPress={() => (navigation as any).navigate('SearchTab')}
                    activeOpacity={0.8}
                >
                    <Search color={COLORS.gray} size={20} style={styles.searchIcon} />
                    <Text style={styles.searchText}>Search for "Plumber"</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Categories</Text>
                <View style={styles.categoriesGrid}>
                    {CATEGORIES.map((cat) => {
                        const lucide = require('lucide-react-native');
                        const Icon = lucide[cat.iconName === 'zap' ? 'Zap' : cat.iconName === 'droplet' ? 'Droplets' : cat.iconName === 'home' ? 'Home' : 'Wind'];
                        return (
                            <CategoryCard
                                key={cat.id}
                                label={cat.name}
                                Icon={Icon}
                                onPress={() => (navigation as any).navigate('SearchTab', { category: cat.name })}
                            />
                        );
                    })}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Available Nearby</Text>
                {loading ? (
                    <ActivityIndicator size="large" color={COLORS.primary} style={{ marginVertical: 20 }} />
                ) : error ? (
                    <View style={{ alignItems: 'center', marginVertical: 20 }}>
                        <Text style={{ color: 'red' }}>{error}</Text>
                        <TouchableOpacity onPress={fetchWorkers} style={{ marginTop: 10 }}>
                            <Text style={{ color: COLORS.primary }}>Retry</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={workers}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.workersList}
                        renderItem={({ item }) => (
                            <WorkerCard
                                worker={item}
                                onChat={() => (navigation as any).navigate('Chat', { workerId: item.id })}
                                onBook={() => (navigation as any).navigate('Booking', { workerId: item.id })}
                                onPress={() => (navigation as any).navigate('WorkerProfile', { workerId: item.id })}
                            />
                        )}
                        ListEmptyComponent={() => (
                            <Text style={{ textAlign: 'center', padding: 20, color: COLORS.gray }}>No workers available nearby.</Text>
                        )}
                    />
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.md,
        paddingTop: 40,
        paddingBottom: SPACING.md,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs,
        borderRadius: BORDER_RADIUS.md,
    },
    locationText: {
        marginLeft: SPACING.xs,
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.text,
    },
    profileBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileBtnText: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
    searchSection: {
        paddingHorizontal: SPACING.md,
        marginBottom: SPACING.lg,
    },
    greeting: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    subGreeting: {
        fontSize: 16,
        color: COLORS.gray,
        marginBottom: SPACING.md,
        marginTop: 4,
    },
    fakeSearchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: BORDER_RADIUS.md,
        paddingHorizontal: SPACING.md,
        height: 50,
    },
    searchIcon: {
        marginRight: SPACING.sm,
    },
    searchText: {
        color: COLORS.gray,
        fontSize: 16,
    },
    section: {
        marginBottom: SPACING.lg,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
        paddingHorizontal: SPACING.md,
        marginBottom: SPACING.md,
    },
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.md,
    },
    workersList: {
        paddingHorizontal: SPACING.md,
    },
});