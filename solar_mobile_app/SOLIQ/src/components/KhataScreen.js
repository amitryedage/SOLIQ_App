import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import KhataEnergyChart from './KhataEnergyChart';
import KhataBillingHistory from './KhataBillingHistory';

const KhataScreen = () => {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header Title Section */}
                <View style={styles.headerSection}>
                    <Text style={styles.pageTitle}>Billing Dashboard</Text>
                    <Text style={styles.pageSubtitle}>Monthly billing & savings overview</Text>
                </View>

                {/* Summary Metrics Cards */}
                <View style={styles.metricsContainer}>
                    <View style={[styles.metricCard, { backgroundColor: '#FFF5E6' }]}>
                        <View style={styles.metricHeader}>
                            <Ionicons name="cash-outline" size={14} color="#F59E0B" />
                            <Text style={styles.metricLabel}>Current Bill</Text>
                        </View>
                        <Text style={[styles.metricValue, { color: '#0F172A' }]}>₹0</Text>
                    </View>

                    <View style={[styles.metricCard, { backgroundColor: '#E0F2FE' }]}>
                        <View style={styles.metricHeader}>
                            <Ionicons name="trending-up-outline" size={14} color="#059669" />
                            <Text style={styles.metricLabel}>Total Savings</Text>
                        </View>
                        <Text style={[styles.metricValue, { color: '#0F172A' }]}>₹22735</Text>
                    </View>

                    <View style={[styles.metricCard, { backgroundColor: '#EEF2FF' }]}>
                        <View style={styles.metricHeader}>
                            <Ionicons name="calculator-outline" size={14} color="#6366F1" />
                            <Text style={styles.metricLabel}>Avg Monthly Bill</Text>
                        </View>
                        <Text style={[styles.metricValue, { color: '#0F172A' }]}>₹2037</Text>
                    </View>
                </View>

                {/* Energy Chart Component */}
                <KhataEnergyChart />

                {/* Billing History Section */}
                <KhataBillingHistory />

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA', // Slight off-white background matching the design
    },
    scrollContainer: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 100, // Make room for bottom nav
    },
    headerSection: {
        paddingHorizontal: 24,
        marginTop: 10,
        marginBottom: 20,
    },
    pageTitle: {
        fontSize: 26,
        fontWeight: '700',
        color: '#111827',
        letterSpacing: -0.5,
        marginBottom: 6,
    },
    pageSubtitle: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '500',
    },
    metricsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    metricCard: {
        flex: 1,
        borderRadius: 16,
        padding: 12,
        marginHorizontal: 4,
        // Optional subtle shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    metricHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    metricLabel: {
        fontSize: 10,
        fontWeight: '600',
        color: '#475569',
        marginLeft: 4,
    },
    metricValue: {
        fontSize: 20,
        fontWeight: '800',
        letterSpacing: -0.5,
    },
});

export default KhataScreen;
