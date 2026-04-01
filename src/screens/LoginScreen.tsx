import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Image,
} from 'react-native';
import { Mail, Phone, Lock, ChevronRight, Grape as Google } from 'lucide-react-native';
import { COLORS, SPACING } from '../theme';
import { Text } from '../components/ui/Typography';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import authService from '../services/authService';

export const LoginScreen = ({ navigation }: any) => {
  const [mode, setMode] = useState<'otp' | 'password'>('otp');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!phone) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }
    setLoading(true);
    try {
      await authService.sendOtp(phone);
      navigation.navigate('VerifyOtp', { phone });
    } catch (error) {
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
    setLoading(true);
    try {
      const data = await authService.loginWithEmail(email, password);
      Alert.alert('Success', `Welcome back!`);
      navigation.replace('Main');
    } catch (error) {
      Alert.alert('Error', 'Invalid credentials. Please try again.');
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
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <View style={styles.logo}>
                <Text variant="h1" color={COLORS.white}>K</Text>
              </View>
            </View>
            <Text variant="h1" align="center" style={styles.title}>Sevastu</Text>
            <Text variant="bodyLarge" align="center" color={COLORS.textMuted} style={styles.subtitle}>
              Premium Home Services at Your Doorstep
            </Text>
          </View>

          <View style={styles.tabContainer}>
            <Pressable
              style={[styles.tab, mode === 'otp' && styles.activeTab]}
              onPress={() => setMode('otp')}
            >
              <Text
                variant="label"
                color={mode === 'otp' ? COLORS.primary : COLORS.textMuted}
                style={{ fontWeight: mode === 'otp' ? '700' : '500' }}
              >
                Phone OTP
              </Text>
            </Pressable>
            <Pressable
              style={[styles.tab, mode === 'password' && styles.activeTab]}
              onPress={() => setMode('password')}
            >
              <Text
                variant="label"
                color={mode === 'password' ? COLORS.primary : COLORS.textMuted}
                style={{ fontWeight: mode === 'password' ? '700' : '500' }}
              >
                Password
              </Text>
            </Pressable>
          </View>

          <View style={styles.form}>
            {mode === 'otp' ? (
              <>
                <Input
                  label="Phone Number"
                  placeholder="Enter 10 digit number"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  leftIcon={<Phone size={20} color={COLORS.textMuted} />}
                />
                <Button
                  title="Verify with OTP"
                  onPress={handleSendOtp}
                  loading={loading}
                  rightIcon={<ChevronRight size={20} color={COLORS.white} />}
                  style={styles.mainBtn}
                />
              </>
            ) : (
              <>
                <Input
                  label="Email Address"
                  placeholder="name@example.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  leftIcon={<Mail size={20} color={COLORS.textMuted} />}
                />
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  leftIcon={<Lock size={20} color={COLORS.textMuted} />}
                />
                <Button
                  title="Sign In"
                  onPress={handleEmailLogin}
                  loading={loading}
                  style={styles.mainBtn}
                />
              </>
            )}
          </View>

          <View style={styles.divider}>
            <View style={styles.line} />
            <Text variant="bodySmall" color={COLORS.textMuted} style={styles.dividerText}>
              OR CONTINUE WITH
            </Text>
            <View style={styles.line} />
          </View>

          <View style={styles.socialContainer}>
            <Button
              title="Google"
              variant="outline"
              style={styles.socialBtn}
              onPress={() => { }}
              leftIcon={<Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' }} style={{ width: 20, height: 20 }} />}
            />
          </View>

          <View style={styles.footer}>
            <Text variant="bodyMedium" color={COLORS.textMuted}>
              Don't have an account?{' '}
            </Text>
            <Pressable onPress={() => navigation.navigate('Register')}>
              <Text variant="bodyMedium" color={COLORS.primary} style={{ fontWeight: '700' }}>
                Sign Up
              </Text>
            </Pressable>
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
  scrollContent: {
    padding: 24,
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    paddingHorizontal: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    padding: 6,
    borderRadius: 14,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: COLORS.primaryLight,
  },
  form: {
    marginBottom: 32,
  },
  mainBtn: {
    marginTop: 8,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    marginHorizontal: 16,
    letterSpacing: 1,
    fontWeight: '700',
  },
  socialContainer: {
    marginBottom: 40,
  },
  socialBtn: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
