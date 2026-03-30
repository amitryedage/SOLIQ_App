import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../lib/supabase';

export default function SignUpScreen({ onSignUp, onNavigateToLogin }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verificationStep, setVerificationStep] = useState(false);

  const handleSignUp = async () => {
    if (!fullName || !email || !password || !phone) {
      Alert.alert('Missing Fields', 'Please fill in all fields including phone number.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    // 1. Register with Supabase Auth
    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: { 
          full_name: fullName.trim(),
          phone_number: phone.trim()
        },
      },
    });

    if (error) {
      setLoading(false);
      Alert.alert('Sign Up Failed', error.message);
    } else {
      setLoading(false);
      setVerificationStep(true);
      Alert.alert('Verify Your Email', 'A 6-digit code has been sent to your email.');
    }
  };

  const handleVerifyOtp = async () => {
    if (otpCode.length !== 6) {
      Alert.alert('Invalid Code', 'Please enter the 6-digit code.');
      return;
    }

    setLoading(true);
    // 1. Verify OTP with Supabase
    const { data: { user }, error: verifyError } = await supabase.auth.verifyOtp({
      email: email.trim(),
      token: otpCode,
      type: 'signup'
    });

    if (verifyError) {
      setLoading(false);
      Alert.alert('Verification Failed', verifyError.message);
      return;
    }

    // 2. Insert into public.Login table
    const { data: loginData, error: loginError } = await supabase
      .from('Login')
      .insert([
        { 
          Email: email.trim(), 
          Password: password, 
          created_at: new Date().toISOString() 
        }
      ])
      .select('new_id')
      .single();

    if (loginError) {
      setLoading(false);
      console.error('Login Table Sync Error:', loginError);
      Alert.alert('Database Sync Error', 'Verified but Login record failed: ' + loginError.message);
      return;
    }

    // 3. Insert into public.users table
    const { error: usersError } = await supabase
      .from('users')
      .insert([
        { 
          id: loginData.new_id, 
          name: fullName,
          Phone_number: parseInt(phone.replace(/\D/g, '')), 
          user_type: 'renter'
        }
      ]);

    setLoading(false);

    if (usersError) {
      console.error('Users Sync Error:', usersError);
      Alert.alert('Partial Success', 'Verified but profile sync failed.');
    } else {
      Alert.alert('Success! 🎉', 'Your account is verified and ready.');
      onSignUp(); // Navigate to Dashboard
    }
  };

  if (verificationStep) {
    return (
      <LinearGradient colors={['#D2E7F3', '#F2DDBD', '#EFE0CC']} style={styles.container}>
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
              <View style={styles.headerContainer}>
                <Text style={styles.title}>Verify Email</Text>
                <Text style={styles.subtitle}>Enter the 6-digit code sent to</Text>
                <Text style={[styles.subtitle, { fontWeight: 'bold' }]}>{email}</Text>
              </View>

              <View style={styles.glassCard}>
                <View style={styles.inputContainer}>
                  <Ionicons name="shield-checkmark-outline" size={22} color="#102B4C" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="6-digit Code"
                    placeholderTextColor="#888"
                    value={otpCode}
                    onChangeText={setOtpCode}
                    keyboardType="number-pad"
                    maxLength={6}
                  />
                </View>

                <TouchableOpacity 
                  style={[styles.loginButton, loading && { opacity: 0.7 }]} 
                  onPress={handleVerifyOtp} 
                  activeOpacity={0.8}
                  disabled={loading}
                >
                  <LinearGradient colors={['#102B4C', '#1E456E']} style={styles.loginButtonGradient}>
                    {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.loginButtonText}>VERIFY & FINISH</Text>}
                  </LinearGradient>
                </TouchableOpacity>

                <View style={{ marginTop: 20, alignItems: 'center' }}>
                  <Text style={{ color: '#666', marginBottom: 10 }}>Didn't receive the code?</Text>
                  <TouchableOpacity 
                    onPress={async () => {
                      setLoading(true);
                      const { error } = await supabase.auth.resend({
                        type: 'signup',
                        email: email.trim(),
                      });
                      setLoading(false);
                      if (error) Alert.alert('Error', error.message);
                      else Alert.alert('Sent!', 'A new verification code has been sent to your email.');
                    }}
                    disabled={loading}
                  >
                    <Text style={{ color: '#102B4C', fontWeight: 'bold', textDecorationLine: 'underline' }}>Resend Code</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => setVerificationStep(false)} style={{ marginTop: 30, alignItems: 'center' }}>
                  <Text style={{ color: '#102B4C', fontWeight: '500', opacity: 0.7 }}>Change Email</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#D2E7F3', '#F2DDBD', '#EFE0CC']} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            
            <View style={styles.headerContainer}>
              <Text style={styles.title}>
                Welcome to <Text style={{ color: '#F9C449' }}>SOL</Text><Text style={{ color: '#407FAC' }}>IQ</Text>
              </Text>
              <Text style={styles.subtitle}>Create your clean energy account</Text>
            </View>

            <View style={styles.glassCard}>
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={22} color="#102B4C" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor="#888"
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                />
              </View>

              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={22} color="#102B4C" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Email Address"
                  placeholderTextColor="#888"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.inputContainer}>
                <Ionicons name="call-outline" size={22} color="#102B4C" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Phone Number"
                  placeholderTextColor="#888"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.inputContainer}>
                <Ionicons name="key-outline" size={22} color="#102B4C" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Create Password"
                  placeholderTextColor="#888"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                  <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={22} color="#102B4C" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.checkboxContainer} onPress={() => setAgreeTerms(!agreeTerms)} activeOpacity={0.8}>
                <Ionicons 
                    name={agreeTerms ? "checkbox" : "square-outline"} 
                    size={22} 
                    color={agreeTerms ? "#102B4C" : "#888"} 
                />
                <Text style={styles.checkboxText}>
                    I agree to the <Text style={styles.linkText}>Terms & Conditions</Text>.
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.loginButton, (!agreeTerms || loading) && { opacity: 0.7 }]} 
                onPress={handleSignUp} 
                activeOpacity={0.8} 
                disabled={!agreeTerms || loading}
              >
                <LinearGradient colors={['#102B4C', '#1E456E']} style={styles.loginButtonGradient}>
                  {loading ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <>
                      <Text style={styles.loginButtonText}>CREATE ACCOUNT</Text>
                      <Ionicons name="analytics" size={20} color="#F9C449" style={{ marginLeft: 8 }} />
                    </>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <FontAwesome5 name="google" size={20} color="#DB4437" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <FontAwesome5 name="apple" size={22} color="#000" />
              </TouchableOpacity>
            </View>

            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Already have an account? </Text>
              <TouchableOpacity onPress={onNavigateToLogin}>
                <Text style={styles.signUpLink}>Log In</Text>
              </TouchableOpacity>
            </View>

            {/* Bottom Logo */}
            <View style={styles.bottomLogoContainer}>
              <Ionicons name="leaf-outline" size={24} color="#7ED321" style={{ marginBottom: -5 }} />
              <Ionicons name="sunny" size={20} color="#F9C449" style={{ marginTop: -10, marginBottom: 5 }} />
              <View style={styles.logoTextContainer}>
                <Text style={styles.logoSol}>SOL</Text>
                <Text style={styles.logoIq}>IQ</Text>
              </View>
            </View>

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    paddingBottom: 40,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#102B4C',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 22,
  },
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 15,
    height: 55,
    borderWidth: 1,
    borderColor: '#E6E6E6',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    padding: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    paddingRight: 10,
  },
  checkboxText: {
    marginLeft: 10,
    fontSize: 13,
    color: '#333',
    lineHeight: 20,
    flex: 1,
  },
  linkText: {
    color: '#102B4C',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  loginButton: {
    width: '100%',
    shadowColor: '#102B4C',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonGradient: {
    flexDirection: 'row',
    height: 55,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 1,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#A0B0C0',
    opacity: 0.4,
  },
  dividerText: {
    marginHorizontal: 15,
    color: '#102B4C',
    fontWeight: '500',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  socialButton: {
    backgroundColor: '#FFFFFF',
    width: '40%',
    height: 55,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E6E6E6',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  signUpText: {
    color: '#333',
    fontSize: 15,
  },
  signUpLink: {
    color: '#102B4C',
    fontWeight: 'bold',
    fontSize: 15,
  },
  bottomLogoContainer: {
    alignItems: 'center',
    marginTop: 'auto',
  },
  logoTextContainer: {
    flexDirection: 'row',
  },
  logoSol: {
    color: '#F9C449',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  logoIq: {
    color: '#407FAC',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
