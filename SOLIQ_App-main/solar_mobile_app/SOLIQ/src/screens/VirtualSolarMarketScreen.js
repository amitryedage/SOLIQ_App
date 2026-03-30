import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  SafeAreaView, Animated, Easing,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const PLANS = [
  {
    id: 'mini',
    name: 'Mini Pack',
    units: 70,
    price: 499,
    originalPrice: 679,
    savings: 180,
    tags: ['💡 70 Units / month'],
    badge: null,
  },
  {
    id: 'standard',
    name: 'Standard Pack',
    units: 150,
    price: 999,
    originalPrice: 1179,
    savings: 180,
    tags: ['⚡ 150 kWh', '📱 Smart alerts', '✅ 20% margin'],
    badge: 'Most Popular',
  },
  {
    id: 'family',
    name: 'Family Pack',
    units: 320,
    price: 1999,
    originalPrice: 2559,
    savings: 560,
    tags: ['⚡ 320 kWh', '📱 Smart alerts', '✅ 15% margin'],
    badge: null,
    highlight: '15% margin',
  },
];

export default function VirtualSolarMarketScreen({ onProceed }) {
  const [selectedPlan, setSelectedPlan] = useState(PLANS[0]);

  const headerAnim = useRef(new Animated.Value(0)).current;
  const plansAnim = useRef(PLANS.map(() => new Animated.Value(0))).current;
  const summaryAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(headerAnim, { toValue: 1, duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.stagger(120, plansAnim.map(a => Animated.timing(a, { toValue: 1, duration: 400, easing: Easing.out(Easing.back(1.3)), useNativeDriver: true }))),
      Animated.timing(summaryAnim, { toValue: 1, duration: 400, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();
  }, []);

  const makeAnimStyle = (anim) => ({
    opacity: anim,
    transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }],
  });

  return (
    <LinearGradient colors={['#FDF8EE', '#EDF5FB', '#FAFAFA']} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

          {/* Header Banner */}
          <Animated.View style={[styles.heroBanner, makeAnimStyle(headerAnim)]}>
            <LinearGradient colors={['#1E3A5F', '#264A7A']} style={styles.heroBannerGradient}>
              <View style={styles.heroTopRow}>
                <View style={styles.heroBadge}>
                  <Ionicons name="flash" size={14} color="#F9C449" />
                  <Text style={styles.heroBadgeText}>SWIGGY-STYLE SOLAR MARKETPLACE</Text>
                </View>
                <View style={styles.liveBadge}>
                  <View style={styles.liveDot} />
                  <Text style={styles.liveText}>LIVE NOW</Text>
                </View>
              </View>
              <Text style={styles.heroTitle}>
                We buy wholesale solar & sell you digital units — pay less than your DISCOM rate.
              </Text>
              <View style={styles.heroFlashWrap}>
                <Ionicons name="flash" size={22} color="#F9C449" />
              </View>
            </LinearGradient>
          </Animated.View>

          {/* Choose Plan */}
          <Text style={styles.sectionTitle}>CHOOSE YOUR PLAN</Text>

          {PLANS.map((plan, idx) => {
            const isSelected = selectedPlan.id === plan.id;
            return (
              <Animated.View key={plan.id} style={makeAnimStyle(plansAnim[idx])}>
                <TouchableOpacity
                  style={[styles.planCard, isSelected && styles.planCardSelected]}
                  onPress={() => setSelectedPlan(plan)}
                  activeOpacity={0.85}
                >
                  <View style={styles.planRow}>
                    <View style={styles.planIconWrap}>
                      <Ionicons name={plan.units <= 70 ? 'phone-portrait-outline' : 'home-outline'} size={28} color="#264A7A" />
                    </View>
                    <View style={styles.planInfo}>
                      {plan.badge && (
                        <View style={styles.planBadge}>
                          <Text style={styles.planBadgeText}>{plan.badge}</Text>
                        </View>
                      )}
                      <Text style={styles.planName}>{plan.name}</Text>
                      <Text style={styles.planUnits}>• {plan.units} Units / month</Text>
                    </View>
                    <View style={styles.planPriceCol}>
                      <Text style={styles.planPrice}>₹{plan.price.toLocaleString()}</Text>
                      <Text style={styles.planPriceSub}>/month</Text>
                    </View>
                  </View>
                  <View style={styles.planTagRow}>
                    {plan.tags.map((tag, i) => (
                      <Text key={i} style={styles.planTag}>{tag}</Text>
                    ))}
                    <View style={styles.savingsBadge}>
                      <Text style={styles.savingsText}>Save ₹{plan.savings}</Text>
                    </View>
                  </View>
                  {plan.highlight && (
                    <View style={styles.highlightBadge}>
                      <Text style={styles.highlightText}>{plan.highlight}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              </Animated.View>
            );
          })}

          {/* Order Summary */}
          <Animated.View style={[styles.summaryCard, makeAnimStyle(summaryAnim)]}>
            <Text style={styles.sectionTitle}>ORDER SUMMARY</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Plan</Text>
              <Text style={styles.summaryValue}>{selectedPlan.name}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Units per month</Text>
              <Text style={styles.summaryValue}>{selectedPlan.units} kWh</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Duration</Text>
              <Text style={styles.summaryValue}>1 month</Text>
            </View>
            <View style={[styles.summaryRow, styles.summaryTotalRow]}>
              <Text style={styles.summaryTotalLabel}>Total payable</Text>
              <Text style={styles.summaryTotalValue}>₹{selectedPlan.price.toLocaleString()}</Text>
            </View>
          </Animated.View>

          {/* Proceed Button */}
          <TouchableOpacity style={styles.proceedBtn} onPress={onProceed} activeOpacity={0.85}>
            <LinearGradient colors={['#1E3A5F', '#264A7A']} style={styles.proceedGradient}>
              <Ionicons name="flash" size={18} color="#F9C449" style={{ marginRight: 8 }} />
              <Text style={styles.proceedText}>PROCEED TO PAY</Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.footer}>🔒 Secured by RazorPay · 100% renewable · Cancel anytime</Text>

          {/* SOLIQ Logo */}
          <View style={styles.logoRow}>
            <Text style={styles.logoSol}>SOL</Text>
            <Text style={styles.logoIq}>IQ</Text>
          </View>

        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 16, paddingBottom: 50 },
  heroBanner: { borderRadius: 16, overflow: 'hidden', marginBottom: 24 },
  heroBannerGradient: { padding: 18 },
  heroTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  heroBadge: { flexDirection: 'row', alignItems: 'center' },
  heroBadgeText: { color: '#A0C4E8', fontSize: 10, fontWeight: '700', letterSpacing: 0.5, marginLeft: 4 },
  liveBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9C449', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#1E3A5F', marginRight: 5 },
  liveText: { fontSize: 10, fontWeight: '800', color: '#1E3A5F' },
  heroTitle: { color: '#FFFFFF', fontSize: 14, lineHeight: 20, fontWeight: '500', marginBottom: 12 },
  heroFlashWrap: { alignSelf: 'flex-start', backgroundColor: 'rgba(249,196,73,0.2)', padding: 8, borderRadius: 10 },
  sectionTitle: { fontSize: 11, fontWeight: '800', color: '#6B7A8D', letterSpacing: 1, marginBottom: 12, marginTop: 4 },
  planCard: {
    backgroundColor: '#FFFFFF', borderRadius: 14, padding: 16, marginBottom: 12,
    borderWidth: 1.5, borderColor: '#E8ECF0',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2,
  },
  planCardSelected: { borderColor: '#264A7A', backgroundColor: '#F0F6FF' },
  planBadge: { alignSelf: 'flex-start', backgroundColor: '#F9C449', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20, marginBottom: 6 },
  planBadgeText: { fontSize: 9, fontWeight: '800', color: '#1E3A5F' },
  planRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  planIconWrap: { width: 46, height: 46, borderRadius: 12, backgroundColor: '#EDF2FC', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  planInfo: { flex: 1 },
  planName: { fontSize: 15, fontWeight: '700', color: '#1A2A3A' },
  planUnits: { fontSize: 12, color: '#6B7A8D', marginTop: 2 },
  planPriceCol: { alignItems: 'flex-end' },
  planPrice: { fontSize: 20, fontWeight: '800', color: '#1E3A5F' },
  planPriceSub: { fontSize: 11, color: '#6B7A8D' },
  planTagRow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 6 },
  planTag: { fontSize: 11, color: '#4A6080', backgroundColor: '#EEF3FA', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  savingsBadge: { backgroundColor: '#E8F5E9', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  savingsText: { fontSize: 11, fontWeight: '700', color: '#2E7D32' },
  highlightBadge: { marginTop: 8, backgroundColor: '#FFF3E0', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  highlightText: { fontSize: 11, fontWeight: '700', color: '#E65100' },
  summaryCard: { backgroundColor: '#FFFFFF', borderRadius: 14, padding: 18, marginTop: 8, marginBottom: 20, borderWidth: 1, borderColor: '#E8ECF0', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 6, elevation: 2 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  summaryLabel: { fontSize: 13, color: '#6B7A8D' },
  summaryValue: { fontSize: 13, fontWeight: '600', color: '#1A2A3A' },
  summaryTotalRow: { borderTopWidth: 1, borderTopColor: '#E8ECF0', paddingTop: 10, marginTop: 4 },
  summaryTotalLabel: { fontSize: 14, fontWeight: '700', color: '#1A2A3A' },
  summaryTotalValue: { fontSize: 16, fontWeight: '800', color: '#1E3A5F' },
  proceedBtn: { shadowColor: '#1E3A5F', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 6, marginBottom: 16 },
  proceedGradient: { flexDirection: 'row', height: 55, borderRadius: 30, alignItems: 'center', justifyContent: 'center' },
  proceedText: { color: '#FFF', fontWeight: '800', fontSize: 15, letterSpacing: 1 },
  footer: { textAlign: 'center', fontSize: 11, color: '#8A9BAE', marginBottom: 20 },
  logoRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 4 },
  logoSol: { color: '#F9C449', fontSize: 22, fontWeight: '800' },
  logoIq: { color: '#407FAC', fontSize: 22, fontWeight: '800' },
});
