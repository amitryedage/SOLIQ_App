import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CarbonMetricGrid from './CarbonMetricGrid';
import ImpactCard from './ImpactCard';
import CarbonOffsetChart from './CarbonOffsetChart';
import CarbonEarningsChart from './CarbonEarningsChart';

const CarbonDashboard = () => {
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.header}>
                <Text style={styles.title}>Carbon Credits Dashboard</Text>
                <Text style={styles.subtitle}>Environmental impact & carbon trading</Text>
            </View>

            <CarbonMetricGrid />

            <View style={styles.impactContainer}>
                <ImpactCard
                    icon="earth"
                    iconType="Ionicons"
                    iconColor="#4BA2C7"
                    value="2456"
                    unit="kg"
                    label="CO₂ Prevented"
                    subtext="Equivalent to removing 0.5 cars for a year"
                    bgColor="#EBF8FF"
                />
                <ImpactCard
                    icon="flash"
                    iconType="Ionicons"
                    iconColor="#E67E22"
                    value="2995"
                    unit="kWh"
                    label="Clean Energy Generated"
                    subtext="Using CO₂ factor: 0.82 kg/kWh"
                    bgColor="#FFF5EB"
                />
            </View>

            <CarbonOffsetChart />
            <CarbonEarningsChart />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        paddingBottom: 100,
    },
    header: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        fontSize: 12,
        color: '#999',
        marginTop: 4,
    },
    impactContainer: {
        marginTop: 10,
    },
});

export default CarbonDashboard;
