import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Lock, ChevronLeft } from 'lucide-react-native';
import { COLORS, SPACING } from '../theme';
import { Text } from '../components/ui/Typography';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import authService from '../services/authService';

export const SetPasswordScreen = ({ navigation }: any) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSetPassword = async () => {
        if (password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters long');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }
        setLoading(true);
        try {
            await authService.setPassword(password);
            Alert.alert('Success', 'Password set successfully!');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', 'Failed to set password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.content}>
                    <View style={styles.header}>
                        <View style={styles.iconCircle}>
                            <Lock size={32} color={COLORS.primary} />
                        </View>
                        <Text variant="h1" style={styles.title}>Secure Your Account</Text>
                        <Text variant="bodyLarge" color={COLORS.textMuted} align="center">
                            Create a password to login with your email next time.
                        </Text>
                    </View>

                    <View style={styles.form}>
                        <Input
                            label="New Password"
                            placeholder="Min. 6 characters"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            leftIcon={<Lock size={20} color={COLORS.textMuted} />}
                        />
                        <Input
                            label="Confirm Password"
                            placeholder="Re-type password"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                            leftIcon={<Lock size={20} color={COLORS.textMuted} />}
                        />
                        <Button
                            title="Update Password"
                            onPress={handleSetPassword}
                            loading={loading}
                            style={styles.button}
                        />
                        <Button
                            title="Skip for now"
                            variant="ghost"
                            onPress={() => navigation.goBack()}
                            style={{ marginTop: 8 }}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        padding: 24,
        flexGrow: 1,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        marginBottom: 12,
    },
    form: {
        width: '100%',
    },
    button: {
        marginTop: 16,
    },
});
