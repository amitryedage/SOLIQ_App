import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function JourneyScreen({ onComplete }) {
  return (
    <LinearGradient colors={['#F4FAFF', '#EAF5FA']} style={styles.container}>
      <SafeAreaView style={{ flex: 1, paddingTop: 60 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <View style={styles.header}>
            <Text style={styles.title}>Start Your SolIQ Journey</Text>
            <Text style={styles.subtitle}>Choose the path that powers your lifestyle.</Text>
          </View>

          {/* Card 1: Homeowner */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>I OWN MY HOUSE</Text>
            </View>
            <View style={styles.illustrationContainer}>
              <View style={styles.illustrationCircle}>
                <Ionicons name="home-outline" size={54} color="#4285B4" />
              </View>
              <Ionicons name="sunny-outline" size={24} color="#F4B13E" style={styles.floatingIcon1} />
              <Ionicons name="flash-outline" size={20} color="#7ED321" style={styles.floatingIcon2} />
            </View>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>I OWN MY HOUSE</Text>
            </View>
            <Text style={styles.cardDescription}>
              Unlock zero-upfront solar installation for your own roof. (On-Site Solution).
            </Text>
            <TouchableOpacity style={styles.primaryButton} onPress={() => onComplete('owner')} activeOpacity={0.8}>
              <Text style={styles.primaryButtonText}>GO SOLAR ON-SITE</Text>
            </TouchableOpacity>
          </View>

          {/* Card 2: Renter */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>I AM A RENTER / TENANT</Text>
            </View>
            <View style={styles.illustrationContainer}>
              <View style={[styles.illustrationCircle, { backgroundColor: '#F0F9ED' }]}>
                <Ionicons name="business-outline" size={54} color="#7ED321" />
              </View>
              <Ionicons name="leaf-outline" size={24} color="#7ED321" style={styles.floatingIcon1} />
              <Ionicons name="link-outline" size={20} color="#4285B4" style={styles.floatingIcon2} />
            </View>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>I AM A RENTER / TENANT</Text>
            </View>
            <Text style={styles.cardDescription}>
              Subscribe to virtual solar energy credits. No roof needed. (Virtual Subscription).
            </Text>
            <TouchableOpacity style={styles.secondaryButton} onPress={() => onComplete('renter')} activeOpacity={0.8}>
              <Text style={styles.secondaryButtonText}>JOIN VIRTUAL SOLAR</Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Logo */}
          <View style={styles.bottomLogoContainer}>
            <Text style={styles.logoTextContainer}>
              <Text style={styles.logoSol}>SOL</Text>
              <Text style={styles.logoIq}>IQ</Text>
            </Text>
          </View>

        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: '#102B4C',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#5A7184',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '100%',
    padding: 24,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#A3D2ED',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 5,
  },
  cardHeader: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A1A1A',
    letterSpacing: 0.5,
  },
  illustrationContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 140,
    marginBottom: 15,
  },
  illustrationCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E6F2F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingIcon1: {
    position: 'absolute',
    top: 20,
    right: 40,
    opacity: 0.8,
  },
  floatingIcon2: {
    position: 'absolute',
    bottom: 20,
    left: 40,
    opacity: 0.8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#5A7184',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  primaryButton: {
    backgroundColor: '#264A64', // Dark blue
    width: '100%',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E6F2F8',
  },
  secondaryButtonText: {
    color: '#4285B4',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  bottomLogoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  logoTextContainer: {
    flexDirection: 'row',
  },
  logoSol: {
    color: '#F9C449',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  logoIq: {
    color: '#407FAC',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
