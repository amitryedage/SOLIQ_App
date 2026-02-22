import React from 'react';
import { View, StyleSheet } from 'react-native';
import CarbonMetricCard from './CarbonMetricCard';

const CarbonMetricGrid = () => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <CarbonMetricCard
                    title="Total CO₂ Offset"
                    value="2456"
                    unit="kg"
                    icon="leaf-outline"
                    iconType="Ionicons"
                    iconColor="#4CAF50"
                    bgColor="#F1F8F4"
                    trend="Growing"
                    delay={400}
                />
                <CarbonMetricCard
                    title="Carbon Credits"
                    value="122.8"
                    unit="credits"
                    icon="hand-coin-outline"
                    iconType="MCI"
                    iconColor="#4FA7D8"
                    bgColor="#F0F7FF"
                    delay={550}
                />
            </View>
            <View style={styles.row}>
                <CarbonMetricCard
                    title="Marketplace Value"
                    value="1474"
                    unit=""
                    icon="gold"
                    iconType="MCI"
                    iconColor="#FFA000"
                    bgColor="#FFF8E1"
                    delay={700}
                />
                <CarbonMetricCard
                    title="Trees Equivalent"
                    value="113"
                    unit="trees 🌳"
                    icon="shopping-basket"
                    iconType="FA"
                    iconColor="#66BB6A"
                    bgColor="#E8F5E9"
                    delay={850}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        marginTop: 15,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default CarbonMetricGrid;
