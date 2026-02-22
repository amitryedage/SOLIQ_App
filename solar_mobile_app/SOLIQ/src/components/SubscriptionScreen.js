import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Animated, Easing } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

// --- BACKGROUND ANIMATION ---
const AnimatedBackground = () => {
    const anim1 = useRef(new Animated.Value(0)).current;
    const anim2 = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const createLoop = (anim, duration) => {
            return Animated.loop(
                Animated.sequence([
                    Animated.timing(anim, { toValue: 1, duration: duration, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
                    Animated.timing(anim, { toValue: 0, duration: duration, easing: Easing.inOut(Easing.ease), useNativeDriver: true })
                ])
            );
        };
        createLoop(anim1, 8000).start();
        createLoop(anim2, 12000).start();
    }, []);

    const translateY1 = anim1.interpolate({ inputRange: [0, 1], outputRange: [0, -100] });
    const translateY2 = anim2.interpolate({ inputRange: [0, 1], outputRange: [0, 150] });
    const scale1 = anim1.interpolate({ inputRange: [0, 1], outputRange: [1, 1.2] });

    return (
        <View style={StyleSheet.absoluteFillObject}>
            <LinearGradient colors={['#F0F4FF', '#FAFCFF']} style={StyleSheet.absoluteFillObject} />
            <Animated.View style={[styles.bgBlob, styles.bgBlob1, { transform: [{ translateY: translateY1 }, { scale: scale1 }] }]} />
            <Animated.View style={[styles.bgBlob, styles.bgBlob2, { transform: [{ translateY: translateY2 }] }]} />
            <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(255,255,255,0.4)' }]} />
        </View>
    );
};

// --- COMPONENTS ---
const FeatureItem = ({ text, delay }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(10)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, { toValue: 1, duration: 400, delay: delay, useNativeDriver: true }),
            Animated.timing(slideAnim, { toValue: 0, duration: 400, delay: delay, useNativeDriver: true })
        ]).start();
    }, [delay]);

    return (
        <Animated.View style={[styles.featureItem, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <View style={styles.featureIconContainer}>
                <Ionicons name="checkmark" size={12} color="#fff" />
            </View>
            <Text style={styles.featureText}>{text}</Text>
        </Animated.View>
    );
};

const AnimatedProgressBar = ({ fillPercentage, color, bg }) => {
    const widthAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(widthAnim, {
            toValue: fillPercentage,
            duration: 1000,
            easing: Easing.out(Easing.exp),
            useNativeDriver: false,
        }).start();
    }, [fillPercentage]);

    return (
        <View style={[styles.progressBg, { backgroundColor: bg }]}>
            <Animated.View style={[styles.progressFill, { backgroundColor: color, width: widthAnim.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }) }]} />
        </View>
    );
};

// --- INTERACTIVE TICKER ---
const AnimatedNumber = ({ value, duration = 1500, delay = 0, prefix = '', suffix = '' }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: value,
            duration: duration,
            delay: delay,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: false,
        }).start();

        const listener = animatedValue.addListener(({ value }) => {
            setDisplayValue(Math.floor(value));
        });

        return () => animatedValue.removeListener(listener);
    }, [value]);

    return <Text>{prefix}{displayValue.toLocaleString()}{suffix}</Text>;
};

// --- MAIN SCREEN ---
const SubscriptionScreen = () => {
    // V3 Advanced Entrance Animations
    const entranceAnims = useRef([
        new Animated.Value(0), // 0: Header
        new Animated.Value(0), // 1: Subtitle
        new Animated.Value(0), // 2: Current Plan Card
        new Animated.Value(0), // 3: Compare Title
        new Animated.Value(0), // 4: Basic Card
        new Animated.Value(0), // 5: Premium Card
        new Animated.Value(0), // 6: Independence Card
    ]).current;

    const shimmerAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const floatAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Continuous Floating Animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(floatAnim, { toValue: -8, duration: 2000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
                Animated.timing(floatAnim, { toValue: 0, duration: 2000, easing: Easing.inOut(Easing.ease), useNativeDriver: true })
            ])
        ).start();

        // Recurring Shimmer Animation
        Animated.loop(
            Animated.sequence([
                Animated.delay(3000),
                Animated.timing(shimmerAnim, { toValue: 1, duration: 1500, easing: Easing.linear, useNativeDriver: true }),
                Animated.timing(shimmerAnim, { toValue: 0, duration: 0, useNativeDriver: true })
            ])
        ).start();

        // Sequential Staggered Entrance
        const entranceSequence = entranceAnims.map((anim) => {
            return Animated.timing(anim, {
                toValue: 1,
                duration: 600,
                easing: Easing.out(Easing.back(1.5)),
                useNativeDriver: true,
            });
        });

        Animated.stagger(120, entranceSequence).start();
    }, []);

    // Animation Style Helper
    const createEntranceStyle = (index) => {
        const extraTransforms = [];
        if (index === 4) { // Basic flips from left
            extraTransforms.push({ rotateY: entranceAnims[index].interpolate({ inputRange: [0, 1], outputRange: ['15deg', '0deg'] }) });
        } else if (index === 5) { // Premium flips from right
            extraTransforms.push({ rotateY: entranceAnims[index].interpolate({ inputRange: [0, 1], outputRange: ['-15deg', '0deg'] }) });
        }

        return {
            opacity: entranceAnims[index],
            transform: [
                { scale: entranceAnims[index].interpolate({ inputRange: [0, 1], outputRange: [0.9, 1] }) },
                { translateY: entranceAnims[index].interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) },
                ...extraTransforms
            ]
        };
    };

    const shimmerTranslate = shimmerAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-300, 300]
    });

    const handlePressIn = () => Animated.spring(scaleAnim, { toValue: 0.95, useNativeDriver: true }).start();
    const handlePressOut = () => Animated.spring(scaleAnim, { toValue: 1, friction: 3, tension: 40, useNativeDriver: true }).start();

    return (
        <View style={styles.container}>
            <AnimatedBackground />

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {/* Header Section */}
                <Animated.View style={[styles.header, createEntranceStyle(0)]}>
                    <TouchableOpacity style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>
                        <Text style={{ color: '#F4B13E' }}>SOL</Text>
                        <Text style={{ color: '#4285B4' }}>IQ</Text>
                        <Text style={{ color: '#0F172A' }}> Premium</Text>
                    </Text>
                    <TouchableOpacity style={styles.themeButton}>
                        <Ionicons name="diamond-outline" size={22} color="#F59E0B" />
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View style={createEntranceStyle(1)}>
                    <Text style={styles.sectionSubtitle}>Unlock the full potential of your solar grid with advanced insights.</Text>
                </Animated.View>

                {/* Current Plan Card (Glassmorphism) */}
                <Animated.View style={[styles.glassCard, styles.currentPlanCard, createEntranceStyle(2)]}>
                    <View style={styles.glassHighlight} />
                    <View style={styles.planBadgeContainer}>
                        <Text style={styles.planBadgeTextTop}>CURRENT PLAN</Text>
                        <View style={styles.pulsingDot} />
                    </View>

                    <View style={styles.planHeader}>
                        <LinearGradient colors={['#4CAF50', '#2E7D32']} style={styles.iconCircle}>
                            <FontAwesome5 name="seedling" size={16} color="#fff" />
                        </LinearGradient>
                        <Text style={styles.planName}>Basic</Text>
                    </View>

                    <Text style={styles.priceText}>
                        <Text style={styles.priceAmount}>
                            <AnimatedNumber value={499} delay={800} prefix="₹" />
                        </Text>/month
                    </Text>

                    <View style={styles.specsContainer}>
                        <Text style={styles.specText}>Capacity: <AnimatedNumber value={5} delay={1000} suffix=" kW" /></Text>
                        <AnimatedProgressBar fillPercentage={25} color="#4CAF50" bg="rgba(76, 175, 80, 0.2)" />
                        <Text style={[styles.specText, { marginTop: 10 }]}>Support: Email (48h response)</Text>
                        <Text style={styles.specText}>SLA: 95%</Text>
                    </View>
                </Animated.View>

                {/* Upgrade Section */}
                <Animated.View style={createEntranceStyle(3)}>
                    <Text style={styles.sectionTitleTop}>Compare Plans</Text>
                </Animated.View>

                <View style={styles.upgradeGrid}>
                    {/* Basic Card */}
                    <Animated.View style={[styles.glassCard, styles.planCard, styles.basicCard, createEntranceStyle(4)]}>
                        <View style={styles.cardHeaderFlex}>
                            <View style={[styles.iconCircleSmall, { backgroundColor: '#E2E8F0' }]}>
                                <FontAwesome5 name="seedling" size={10} color="#64748b" />
                            </View>
                            <View style={styles.currentBadgeSmall}>
                                <Text style={styles.currentBadgeText}>ACTIVE</Text>
                            </View>
                        </View>
                        <Text style={styles.cardPlanName}>Basic</Text>
                        <Text style={styles.cardPriceText}>
                            <AnimatedNumber value={499} delay={1100} prefix="₹" />
                            <Text style={{ fontSize: 10 }}>/mo</Text>
                        </Text>

                        <View style={styles.divider} />

                        <View style={styles.featureList}>
                            <FeatureItem text="5 kW monitoring" delay={100} />
                            <FeatureItem text="Daily reports" delay={200} />
                            <FeatureItem text="Email support" delay={300} />
                        </View>
                    </Animated.View>

                    {/* Premium Card (Highlighted) */}
                    <Animated.View style={[styles.glassCard, styles.planCard, styles.premiumCard, createEntranceStyle(5)]}>
                        <Animated.View style={[styles.premiumGlow, { opacity: entranceAnims[5] }]} />
                        <Animated.View style={[styles.shimmer, { transform: [{ rotate: '45deg' }, { scale: 2 }, { translateX: shimmerTranslate }] }]}>
                            <LinearGradient colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0)']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ flex: 1 }} />
                        </Animated.View>
                        <View style={styles.cardHeaderFlex}>
                            <LinearGradient colors={['#F59E0B', '#EA580C']} style={styles.iconCircleSmall}>
                                <Ionicons name="flash" size={12} color="#fff" />
                            </LinearGradient>
                        </View>
                        <Text style={styles.cardPlanName}>Premium</Text>
                        <Text style={[styles.cardPriceText, { color: '#EA580C' }]}>
                            <AnimatedNumber value={999} delay={1200} prefix="₹" />
                            <Text style={{ fontSize: 10 }}>/mo</Text>
                        </Text>

                        <View style={styles.divider} />

                        <View style={styles.featureList}>
                            <FeatureItem text="15 kW limit" delay={100} />
                            <FeatureItem text="Real-time map" delay={200} />
                            <FeatureItem text="Priority support" delay={300} />
                            <FeatureItem text="Carbon tracking" delay={400} />
                        </View>
                    </Animated.View>
                </View>

                {/* Independence Tier Card (Floating + Spring) */}
                <Animated.View style={[createEntranceStyle(6), { transform: [...createEntranceStyle(6).transform, { scale: scaleAnim }, { translateY: floatAnim }] }]}>
                    <LinearGradient
                        colors={['#F3E5F5', '#E1BEE7']} // Restored original colors
                        style={[styles.glassCard, styles.independenceCard]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        {/* Shimmer overlay simulation */}
                        <Animated.View style={[styles.shimmer, { transform: [{ rotate: '45deg' }, { scale: 2 }, { translateX: shimmerTranslate }] }]}>
                            <LinearGradient colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0)']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ flex: 1 }} />
                        </Animated.View>

                        <View style={styles.independenceHeaderRow}>
                            <FontAwesome5 name="rocket" size={24} color="#D81B60" style={{ marginBottom: 10 }} />
                            <View style={styles.eliteBadge}>
                                <Text style={styles.eliteBadgeText}>ELITE TIER</Text>
                            </View>
                        </View>

                        <Text style={styles.independencePlanName}>Independence</Text>
                        <Text style={styles.independencePriceText}>
                            <AnimatedNumber value={1999} delay={1300} prefix="₹" />
                            <Text style={{ fontSize: 14, color: '#D81B60' }}>/month</Text>
                        </Text>

                        <View style={[styles.specsContainer, { marginBottom: 20 }]}>
                            <Text style={styles.specText}>Capacity: Unlimited (<AnimatedNumber value={50} delay={1500} suffix=" kW+" />)</Text>
                            <AnimatedProgressBar fillPercentage={100} color="#D81B60" bg="#F8BBD0" />
                        </View>

                        <TouchableOpacity
                            activeOpacity={1} // Handled by scaleAnim
                            onPressIn={handlePressIn}
                            onPressOut={handlePressOut}
                            style={styles.upgradeBtnShadow}
                        >
                            <LinearGradient
                                colors={['#FF9800', '#F57C00']} // Premium orange button
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.upgradeBtn}
                            >
                                <Text style={styles.upgradeBtnText}>Upgrade to Independence</Text>
                                <Ionicons name="arrow-forward" size={18} color="#fff" style={{ marginLeft: 8 }} />
                            </LinearGradient>
                        </TouchableOpacity>
                    </LinearGradient>
                </Animated.View>

                <View style={{ height: 120 }} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    // Background Animations
    bgBlob: {
        position: 'absolute',
        width: 400,
        height: 400,
        borderRadius: 200,
        opacity: 0.4,
        filter: 'blur(40px)', // Web/New RN only, fallback is just opacity
    },
    bgBlob1: {
        top: -100,
        right: -100,
        backgroundColor: '#E0F2FE', // Light blue
    },
    bgBlob2: {
        bottom: 100,
        left: -150,
        backgroundColor: '#F3E8FF', // Light purple
    },

    // Core Layout
    content: {
        flexGrow: 1,
        padding: 24,
        paddingTop: 48,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    backButton: {
        width: 40, height: 40,
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 20,
        justifyContent: 'center', alignItems: 'center',
        borderWidth: 1, borderColor: 'rgba(255,255,255,1)',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '900',
        letterSpacing: -0.5,
        color: '#0F172A',
    },
    themeButton: {
        width: 40, height: 40,
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 20,
        justifyContent: 'center', alignItems: 'center',
        borderWidth: 1, borderColor: 'rgba(255,255,255,1)',
    },
    sectionSubtitle: {
        fontSize: 15,
        color: '#64748B',
        marginBottom: 32,
        lineHeight: 22,
    },

    // Glassmorphism Base
    glassCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.65)',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.95)',
        overflow: 'hidden',
    },
    glassHighlight: {
        position: 'absolute',
        top: 0, left: 0, right: 0, height: '40%',
        backgroundColor: 'rgba(255,255,255,0.3)',
    },

    iconCircle: {
        width: 36, height: 36,
        borderRadius: 12,
        justifyContent: 'center', alignItems: 'center',
        marginRight: 12,
        shadowColor: '#4CAF50', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 6,
    },
    iconCircleSmall: {
        width: 28, height: 28,
        borderRadius: 8,
        justifyContent: 'center', alignItems: 'center',
    },
    iconCircleLarge: {
        width: 48, height: 48,
        borderRadius: 16,
        justifyContent: 'center', alignItems: 'center',
        shadowColor: '#9B59B6', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 8,
    },

    // Current Plan specific
    currentPlanCard: {
        padding: 24,
        marginBottom: 32,
        shadowColor: '#94A3B8',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 5,
    },
    planBadgeContainer: {
        flexDirection: 'row', alignItems: 'center', marginBottom: 16,
    },
    pulsingDot: {
        width: 6, height: 6, borderRadius: 3, backgroundColor: '#10B981', marginLeft: 8,
        shadowColor: '#10B981', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 1, shadowRadius: 4,
    },
    planBadgeTextTop: {
        fontSize: 11,
        letterSpacing: 1,
        color: '#64748B',
        fontWeight: '800',
    },
    planHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    planName: {
        fontSize: 28,
        fontWeight: '900',
        color: '#0F172A',
        letterSpacing: -0.5,
    },
    priceText: {
        fontSize: 16,
        color: '#64748B',
        marginBottom: 20,
    },
    priceAmount: {
        fontSize: 32,
        fontWeight: '900',
        color: '#10B981',
        letterSpacing: -1,
    },

    // Upgrade Grid
    sectionTitleTop: {
        fontSize: 20,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 16,
        letterSpacing: -0.5,
    },
    upgradeGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32,
    },
    planCard: {
        width: '48%',
        padding: 16,
        borderRadius: 20,
    },
    basicCard: {
        opacity: 0.9,
    },
    premiumCard: {
        borderColor: 'rgba(245, 158, 11, 0.3)',
        borderWidth: 1.5,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    premiumGlow: { // Fake drop shadow glow directly under the border
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(245, 158, 11, 0.03)',
    },
    cardHeaderFlex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    currentBadgeSmall: {
        backgroundColor: '#E2E8F0',
        paddingHorizontal: 6,
        paddingVertical: 4,
        borderRadius: 6,
    },
    currentBadgeText: {
        fontSize: 9,
        fontWeight: '800',
        color: '#64748B',
        letterSpacing: 0.5,
    },
    cardPlanName: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 4,
    },
    cardPriceText: {
        fontSize: 24,
        fontWeight: '900',
        color: '#0F172A',
        letterSpacing: -0.5,
        marginBottom: 12,
    },

    divider: {
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.06)',
        marginVertical: 12,
    },

    featureList: {
        gap: 10,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    featureIconContainer: {
        width: 16, height: 16,
        borderRadius: 8,
        backgroundColor: '#10B981',
        justifyContent: 'center', alignItems: 'center',
        marginRight: 8,
    },
    featureText: {
        fontSize: 12,
        color: '#475569',
        fontWeight: '500',
    },

    independenceCard: {
        padding: 24,
        borderRadius: 20,
        shadowColor: '#AB47BC',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 15,
        elevation: 8,
        marginBottom: 10, // make room for float
    },
    shimmer: {
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        transform: [{ rotate: '45deg' }, { scale: 2 }, { translateX: -100 }],
    },
    independenceHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    eliteBadge: {
        backgroundColor: 'rgba(216, 27, 96, 0.1)',
        borderWidth: 1, borderColor: 'rgba(216, 27, 96, 0.3)',
        paddingHorizontal: 10, paddingVertical: 4,
        borderRadius: 12,
    },
    eliteBadgeText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#D81B60',
        letterSpacing: 1,
    },
    independencePlanName: {
        fontSize: 32,
        fontWeight: '900',
        letterSpacing: -1,
        color: '#0F172A',
        marginBottom: 4,
    },
    independencePriceText: {
        fontSize: 28,
        fontWeight: '900',
        color: '#D81B60',
        letterSpacing: -0.5,
        marginBottom: 24,
    },

    upgradeBtnShadow: {
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#F57C00',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    upgradeBtn: {
        paddingVertical: 18,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    upgradeBtnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '800',
        letterSpacing: 0.5,
    },

    // Helpers
    specsContainer: {
        marginTop: 4,
    },
    specText: {
        fontSize: 13,
        color: '#64748B',
        fontWeight: '500',
        marginBottom: 6,
    },
    progressBg: {
        height: 6,
        borderRadius: 3,
        width: '100%',
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: 3,
    }
});

export default SubscriptionScreen;
