import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import { ChevronLeft, RefreshCcw } from 'lucide-react-native';
import { COLORS, SPACING } from '../theme';
import { Text } from '../components/ui/Typography';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import authService from '../services/authService';

export const VerifyOtpScreen = ({ navigation, route }: any) => {
  const { phone } = route.params;
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerifyOtp = async () => {
    if (!otp || otp.length < 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP');
      return;
    }
    setLoading(true);
    try {
      const data = await authService.verifyOtp(phone, otp);
      Alert.alert('Success', 'Phone number verified!');
      navigation.replace('Main');
    } catch (error) {
      Alert.alert('Error', 'Invalid OTP. Please try again.');
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
        <View style={styles.navHeader}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
            <ChevronLeft size={24} color={COLORS.text} />
          </Pressable>
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <Text variant="h1" style={styles.title}>Confirm OTP</Text>
            <Text variant="bodyLarge" color={COLORS.textMuted} align="center" style={styles.subtitle}>
              We've sent a 6-digit code to{'\n'}
              <Text variant="bodyLarge" color={COLORS.text} style={{ fontWeight: '700' }}>
                {phone}
              </Text>
            </Text>
          </View>

          <View style={styles.form}>
            <Input
              placeholder="0 0 0 0 0 0"
              value={otp}
              onChangeText={setOtp}
              keyboardType="number-pad"
              maxLength={6}
              style={styles.otpInput}
              autoFocus
            />
            {/* Note: Real premium apps use a specialized OTP input with visible dashes/boxes */}
            
            <Button
              title="Verify Account"
              onPress={handleVerifyOtp}
              loading={loading}
              style={styles.verifyBtn}
            />

            <View style={styles.resendContainer}>
              <Text variant="bodyMedium" color={COLORS.textMuted}>Didn't receive code? </Text>
              <Pressable style={styles.resendBtn}>
                <RefreshCcw size={14} color={COLORS.primary} style={{ marginRight: 4 }} />
                <Text variant="bodyMedium" color={COLORS.primary} style={{ fontWeight: '700' }}>
                  Resend OTP
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  navHeader: {
    padding: 16,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    marginBottom: 12,
  },
  subtitle: {
    lineHeight: 24,
  },
  form: {
    width: '100%',
  },
  otpInput: {
    textAlign: 'center',
    letterSpacing: 16,
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.primary,
    height: 70,
  },
  verifyBtn: {
    height: 56,
    marginTop: 24,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  resendBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
