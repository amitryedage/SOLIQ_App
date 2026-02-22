import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, Easing } from 'react-native';
import CarbonMetricGrid from './CarbonMetricGrid';
import ImpactCard from './ImpactCard';
import CarbonOffsetChart from './CarbonOffsetChart';
import CarbonEarningsChart from './CarbonEarningsChart';

const CarbonDashboard = () => {
    // V4 Advanced Entrance Animations
    const entranceAnims = useRef([
        new Animated.Value(0), // 0: Header
        new Animated.Value(0), // 1: Metric Grid
        new Animated.Value(0), // 2: Impact Card 1
        new Animated.Value(0), // 3: Impact Card 2
        new Animated.Value(0), // 4: Offset Chart
        new Animated.Value(0), // 5: Earnings Chart
    ]).current;

    useEffect(() => {
        const entranceSequence = entranceAnims.map((anim) => {
            return Animated.timing(anim, {
                toValue: 1,
                duration: 600,
                easing: Easing.out(Easing.back(1.5)),
                useNativeDriver: true,
            });
        });

        Animated.stagger(150, entranceSequence).start();
    }, []);

    const createEntranceStyle = (index) => ({
        opacity: entranceAnims[index],
        transform: [
            { scale: entranceAnims[index].interpolate({ inputRange: [0, 1], outputRange: [0.92, 1] }) },
            { translateY: entranceAnims[index].interpolate({ inputRange: [0, 1], outputRange: [30, 0] }) }
        ]
    });

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
            <Animated.View style={[styles.header, createEntranceStyle(0)]}>
                <Text style={styles.title}>Carbon Credits Dashboard</Text>
                <Text style={styles.subtitle}>Environmental impact & carbon trading</Text>
            </Animated.View>

            <Animated.View style={createEntranceStyle(1)}>
                <CarbonMetricGrid />
            </Animated.View>

            <View style={styles.impactContainer}>
                <Animated.View style={createEntranceStyle(2)}>
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
                </Animated.View>
                <Animated.View style={createEntranceStyle(3)}>
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
                </Animated.View>
            </View>

            <Animated.View style={createEntranceStyle(4)}>
                <CarbonOffsetChart />
            </Animated.View>

            <Animated.View style={createEntranceStyle(5)}>
                <CarbonEarningsChart />
            </Animated.View>

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
