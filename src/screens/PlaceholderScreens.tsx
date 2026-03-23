import React from 'react';
import { View, Text } from 'react-native';

const PlaceholderScreen = ({ title }: { title: string }) => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{title}</Text>
    </View>
);

export const HomeScreen = () => <PlaceholderScreen title="Home Screen" />;
export const SearchScreen = () => <PlaceholderScreen title="Search Screen" />;
export const BookingsScreen = () => <PlaceholderScreen title="Bookings Screen" />;
export const ChatListScreen = () => <PlaceholderScreen title="Chat List Screen" />;
export const ProfileScreen = () => <PlaceholderScreen title="Profile Screen" />;
export const WorkerProfileScreen = () => <PlaceholderScreen title="Worker Profile Screen" />;
export const ChatScreen = () => <PlaceholderScreen title="Chat Screen" />;
export const BookingScreen = () => <PlaceholderScreen title="Booking Screen" />;
