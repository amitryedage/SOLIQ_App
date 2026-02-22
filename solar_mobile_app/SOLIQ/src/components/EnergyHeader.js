import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const EnergyHeader = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(-20)).current;

    //  Animations
    const progressWidth = useRef(new Animated.Value(0)).current;
    const spinAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Entrance & Progress Animations
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(progressWidth, {
                toValue: 73, // Target is 73%
                duration: 1200, // Slightly longer, smooth growth
                delay: 300,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: false, // Animating width requires false
            })
        ]).start();

        // Infinite Spin Animation for Sun
        Animated.loop(
            Animated.timing(spinAnim, {
                toValue: 1,
                duration: 10000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const spin = spinAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    const animatedWidth = progressWidth.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%']
    });

    return (
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            <LinearGradient
                colors={['#7BCF93', '#4FA7D8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.container}
            >
                <View style={styles.metricsRow}>
                    <View style={styles.metricSection}>
                        <Text style={styles.label}>CURRENT GENERATION</Text>
                        <View style={styles.valueRow}>
                            <Text style={styles.value}>2.5</Text>
                            <Text style={styles.unit}>kW</Text>
                            <Animated.View style={{ transform: [{ rotate: spin }] }}>
                                <Ionicons name="sunny" size={20} color="#FFD700" style={styles.icon} />
                            </Animated.View>
                        </View>
                        <Text style={styles.subtext}>Peak production</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.metricSection}>
                        <Text style={styles.label}>TODAY'S ENERGY</Text>
                        <View style={styles.valueRow}>
                            <Text style={styles.value}>18.3</Text>
                            <Text style={styles.unit}>kWh</Text>
                        </View>
                        <View style={styles.targetRow}>
                            <Text style={styles.targetText}>Target: 25 kWh</Text>
                            <Text style={styles.percentageText}>73%</Text>
                        </View>
                        <View style={styles.progressBarBg}>
                            <Animated.View style={[styles.progressBarFill, { width: animatedWidth }]} />
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 20,
        borderRadius: 20,
        padding: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    metricsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    metricSection: {
        flex: 1,
    },
    label: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 10,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    valueRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    value: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
    },
    unit: {
        color: '#fff',
        fontSize: 14,
        marginLeft: 5,
    },
    icon: {
        marginLeft: 8,
    },
    subtext: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 12,
        marginTop: 5,
    },
    divider: {
        width: 1,
        backgroundColor: 'rgba(255,255,255,0.3)',
        marginHorizontal: 15,
    },
    targetRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 5,
    },
    targetText: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 10,
    },
    percentageText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    progressBarBg: {
        height: 6,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#fff',
        borderRadius: 3,
    },
});

export default EnergyHeader;