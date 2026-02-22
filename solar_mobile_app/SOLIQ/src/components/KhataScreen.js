import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Platform, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import KhataEnergyChart from './KhataEnergyChart';
import KhataBillingHistory from './KhataBillingHistory';

const AnimatedNumber = ({ value, duration = 2000, delay = 0, prefix = '' }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const listenerId = animatedValue.addListener(({ value }) => {
            setDisplayValue(Math.floor(value));
        });

        Animated.timing(animatedValue, {
            toValue: value,
            duration: duration,
            delay: delay,
            useNativeDriver: false, // Must be false for listeners on numbers
        }).start();

        return () => {
            animatedValue.removeListener(listenerId);
        };
    }, [value]);

    return <Text>{prefix}{displayValue.toLocaleString()}</Text>;
};

const KhataScreen = () => {
    const insets = useSafeAreaInsets();

    // Animation values for the 3 metric cards
    const cardOpacities = useRef([
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0)
    ]).current;

    const cardTranslations = useRef([
        new Animated.Value(20), // Start 20px lower
        new Animated.Value(20),
        new Animated.Value(20)
    ]).current;

    // Advanced: Breathing Icons Animation
    const breatheAnim = useRef(new Animated.Value(1)).current;

    // Advanced: Shimmer Animation
    const shimmerAnim = useRef(new Animated.Value(-1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(breatheAnim, {
                    toValue: 1.15,
                    duration: 1500,
                    useNativeDriver: true, // scale supports native driver
                }),
                Animated.timing(breatheAnim, {
                    toValue: 1,
                    duration: 1500,
                    useNativeDriver: true,
                })
            ])
        ).start();

        // Create an array of parallel animations (opacity + translation) for each card
        const animations = cardOpacities.map((opacity, index) => {
            return Animated.parallel([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                }),
                Animated.timing(cardTranslations[index], {
                    toValue: 0,
                    duration: 400,
                    useNativeDriver: true,
                })
            ]);
        });

        // Trigger them with a 150ms stagger
        Animated.stagger(150, animations).start(() => {
            // After entry animations, run the shimmer once
            setTimeout(() => {
                Animated.timing(shimmerAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }).start();
            }, 500);
        });
    }, []);

    const shimmerTranslate = shimmerAnim.interpolate({
        inputRange: [-1, 1],
        outputRange: [-Dimensions.get('window').width, Dimensions.get('window').width]
    });

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
                <View style={styles.metricsWrapper}>
                    <View style={styles.metricsContainer}>
                        <Animated.View style={[styles.metricCard, {
                            backgroundColor: '#FFF5E6',
                            opacity: cardOpacities[0],
                            transform: [{ translateY: cardTranslations[0] }]
                        }]}>
                            <View style={styles.metricHeader}>
                                <Animated.View style={{ transform: [{ scale: breatheAnim }] }}>
                                    <Ionicons name="cash-outline" size={14} color="#F59E0B" />
                                </Animated.View>
                                <Text style={styles.metricLabel}>Current Bill</Text>
                            </View>
                            <Text style={[styles.metricValue, { color: '#0F172A' }]}>
                                <AnimatedNumber value={0} delay={400} prefix="₹" />
                            </Text>
                        </Animated.View>

                        <Animated.View style={[styles.metricCard, {
                            backgroundColor: '#E0F2FE',
                            opacity: cardOpacities[1],
                            transform: [{ translateY: cardTranslations[1] }]
                        }]}>
                            <View style={styles.metricHeader}>
                                <Animated.View style={{ transform: [{ scale: breatheAnim }] }}>
                                    <Ionicons name="trending-up-outline" size={14} color="#059669" />
                                </Animated.View>
                                <Text style={styles.metricLabel}>Total Savings</Text>
                            </View>
                            <Text style={[styles.metricValue, { color: '#0F172A' }]}>
                                <AnimatedNumber value={22735} delay={550} prefix="₹" />
                            </Text>
                        </Animated.View >

                        <Animated.View style={[styles.metricCard, {
                            backgroundColor: '#EEF2FF',
                            opacity: cardOpacities[2],
                            transform: [{ translateY: cardTranslations[2] }]
                        }]}>
                            <View style={styles.metricHeader}>
                                <Animated.View style={{ transform: [{ scale: breatheAnim }] }}>
                                    <Ionicons name="calculator-outline" size={14} color="#6366F1" />
                                </Animated.View>
                                <Text style={styles.metricLabel}>Avg Monthly Bill</Text>
                            </View>
                            <Text style={[styles.metricValue, { color: '#0F172A' }]}>
                                <AnimatedNumber value={2037} delay={700} prefix="₹" />
                            </Text>
                        </Animated.View >
                    </View>

                    {/* Shimmer Overlay */}
                    <Animated.View
                        style={[
                            styles.shimmerOverlay,
                            { transform: [{ translateX: shimmerTranslate }] }
                        ]}
                        pointerEvents="none"
                    >
                        <LinearGradient
                            colors={['transparent', 'rgba(255,255,255,0.4)', 'transparent']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{ flex: 1 }}
                        />
                    </Animated.View>
                </View >

                {/* Energy Chart Component */}
                < KhataEnergyChart />

                {/* Billing History Section */}
                < KhataBillingHistory />

            </ScrollView >
        </View >
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
    metricsWrapper: {
        position: 'relative',
        overflow: 'hidden',
        marginBottom: 20,
    },
    shimmerOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: 100,
        opacity: 0.5,
    },
});

export default KhataScreen;
