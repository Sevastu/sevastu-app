import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Home, Search, Calendar, MessageCircle, User } from 'lucide-react-native';

import { HomeScreen } from '../screens/HomeScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { BookingsScreen } from '../screens/BookingsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { WorkerProfileScreen } from '../screens/WorkerProfileScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { BookingScreen } from '../screens/BookingScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { VerifyOtpScreen } from '../screens/VerifyOtpScreen';
import { SetPasswordScreen } from '../screens/SetPasswordScreen';
import { SplashScreen } from '../screens/SplashScreen';
import { RoleSelectionScreen } from '../screens/RoleSelectionScreen';
import { COLORS } from '../theme';
import { View } from 'react-native';
import { Text } from '../components/ui/Typography';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ChatListScreen = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background }}>
        <MessageCircle size={64} color={COLORS.textMuted} />
        <Text variant="h3" style={{ marginTop: 20 }}>Your Messages</Text>
        <Text variant="bodyMedium" color={COLORS.textMuted}>Book a service to start chatting with professionals</Text>
    </View>
);

function BottomTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.textMuted,
                headerShown: false,
                tabBarStyle: {
                    borderTopWidth: 1,
                    borderTopColor: COLORS.border,
                    elevation: 0,
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                    backgroundColor: COLORS.white,
                },
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '600',
                }
            }}
        >
            <Tab.Screen
                name="HomeTab"
                component={HomeScreen}
                options={{
                    title: 'Explore',
                    tabBarIcon: ({ color, size }) => <Home color={color} size={size} />
                }}
            />
            <Tab.Screen
                name="SearchTab"
                component={SearchScreen}
                options={{
                    title: 'Search',
                    tabBarIcon: ({ color, size }) => <Search color={color} size={size} />
                }}
            />
            <Tab.Screen
                name="BookingsTab"
                component={BookingsScreen}
                options={{
                    title: 'Bookings',
                    tabBarIcon: ({ color, size }) => <Calendar color={color} size={size} />
                }}
            />
            <Tab.Screen
                name="ChatListTab"
                component={ChatListScreen}
                options={{
                    title: 'Chat',
                    tabBarIcon: ({ color, size }) => <MessageCircle color={color} size={size} />
                }}
            />
            <Tab.Screen
                name="ProfileTab"
                component={ProfileScreen}
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, size }) => <User color={color} size={size} />
                }}
            />
        </Tab.Navigator>
    );
}

export function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash">
                <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
                <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="VerifyOtp" component={VerifyOtpScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SetPassword" component={SetPasswordScreen} options={{ title: 'Security', headerShadowVisible: false }} />
                <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
                <Stack.Screen
                    name="WorkerProfile"
                    component={WorkerProfileScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Chat"
                    component={ChatScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Booking"
                    component={BookingScreen}
                    options={{ headerShown: true, title: 'Book Service', headerShadowVisible: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
