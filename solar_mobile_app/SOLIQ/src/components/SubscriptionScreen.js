import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Animated, Easing } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const FeatureItem = ({ text, delay }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(10)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 400,
                delay: delay,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 400,
                delay: delay,
                useNativeDriver: true,
            })
        ]).start();
    }, [delay, fadeAnim, slideAnim]);

    return (
        <Animated.View style={[styles.featureItem, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <Ionicons name="checkmark" size={14} color="#4CAF50" style={styles.featureIcon} />
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
            useNativeDriver: false, // width doesn't support native driver
        }).start();
    }, [fillPercentage, widthAnim]);

    return (
        <View style={[styles.progressBg, { backgroundColor: bg }]}>
            <Animated.View style={[
                styles.progressFill,
                {
                    backgroundColor: color,
                    width: widthAnim.interpolate({
                        inputRange: [0, 100],
                        outputRange: ['0%', '100%']
                    })
                }
            ]} />
        </View>
    );
};

const SubscriptionScreen = () => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, { toValue: 0.95, useNativeDriver: true }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, { toValue: 1, friction: 3, tension: 40, useNativeDriver: true }).start();
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
            {/* Header Section */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Subscription</Text>
                <TouchableOpacity style={styles.themeButton}>
                    <Ionicons name="sunny-outline" size={24} color="#FBC02D" />
                </TouchableOpacity>
            </View>

            <Text style={styles.sectionSubtitle}>Manage your SolarIQ plan</Text>

            {/* Current Plan Card (Basic) */}
            <View style={styles.currentPlanCard}>
                <Text style={styles.planBadgeTextTop}>Current Plan</Text>

                <View style={styles.planHeader}>
                    <FontAwesome5 name="seedling" size={24} color="#4CAF50" />
                    <Text style={styles.planName}>Basic</Text>
                </View>

                <Text style={styles.priceText}>
                    <Text style={styles.priceAmount}>₹499</Text>/month
                </Text>

                <View style={styles.statusBadges}>
                    <View style={styles.badge}>
                        <View style={styles.badgeDot} />
                        <Text style={styles.badgeText}>Active</Text>
                    </View>
                    <View style={styles.badge}>
                        <View style={styles.badgeDot} />
                        <Text style={styles.badgeText}>Paid</Text>
                    </View>
                    <View style={styles.badge}>
                        <View style={styles.badgeDot} />
                        <Text style={styles.badgeText}>Auto-renew: ON</Text>
                    </View>
                </View>

                <View style={styles.specsContainer}>
                    <Text style={styles.specText}>Capacity: 5 kW</Text>
                    <AnimatedProgressBar fillPercentage={25} color="#4CAF50" bg="#E8F5E9" />
                    <Text style={[styles.specText, { marginTop: 6 }]}>Support: Email (48h response)</Text>
                    <Text style={styles.specText}>SLA: 95%</Text>
                </View>
            </View>

            {/* Upgrade Section */}
            <Text style={styles.sectionTitleTop}>Upgrade Your Plan</Text>

            <View style={styles.upgradeGrid}>
                {/* Basic Card (Disabled) */}
                <View style={[styles.planCard, styles.basicCard]}>
                    <View style={styles.cardHeaderFlex}>
                        <FontAwesome5 name="seedling" size={18} color="#777" />
                        <View style={styles.currentBadgeSmall}>
                            <Text style={styles.currentBadgeText}>CURRENT</Text>
                        </View>
                    </View>
                    <Text style={styles.cardPlanName}>Basic</Text>
                    <Text style={styles.cardPriceText}>
                        <Text style={styles.cardPriceAmountBasic}>₹499</Text>/mo
                    </Text>

                    <View style={styles.cardSpecs}>
                        <Text style={styles.cardSpecText}>Capacity: 5 kW</Text>
                        <AnimatedProgressBar fillPercentage={25} color="#999" bg="#E2E8F0" />
                        <Text style={[styles.cardSpecText, { marginTop: 4 }]}>Support: Email (48h response)</Text>
                        <Text style={styles.cardSpecText}>SLA: 99%</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.featureList}>
                        <FeatureItem text="Up to 5 kW monitoring" delay={100} />
                        <FeatureItem text="Daily reports" delay={200} />
                        <FeatureItem text="Email support" delay={300} />
                        <FeatureItem text="Basic analytics" delay={400} />
                        <FeatureItem text="Mobile app access" delay={500} />
                    </View>

                    <TouchableOpacity style={styles.currentPlanBtn} disabled>
                        <Text style={styles.currentPlanBtnText}>Current Plan</Text>
                    </TouchableOpacity>
                </View>

                {/* Premium Card (Highlighted) */}
                <View style={[styles.planCard, styles.premiumCard]}>
                    <View style={styles.cardHeaderFlex}>
                        <Ionicons name="flash" size={18} color="#FF9800" />
                    </View>
                    <Text style={styles.cardPlanName}>Premium</Text>
                    <Text style={styles.cardPriceText}>
                        <Text style={styles.cardPriceAmountPremium}>₹999</Text>/mo
                    </Text>

                    <View style={styles.cardSpecs}>
                        <Text style={styles.cardSpecText}>Capacity: 15 kW</Text>
                        <AnimatedProgressBar fillPercentage={50} color="#FF9800" bg="#FFE0B2" />
                        <Text style={[styles.cardSpecText, { marginTop: 4 }]}>Support: Priority (4h response)</Text>
                        <Text style={styles.cardSpecText}>SLA: 99.9%</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.featureList}>
                        <FeatureItem text="Up to 15 kW monitoring" delay={100} />
                        <FeatureItem text="Real-time dashboard" delay={200} />
                        <FeatureItem text="Priority support" delay={300} />
                        <FeatureItem text="Advanced analytics" delay={400} />
                        <FeatureItem text="Fault detection" delay={500} />
                        <FeatureItem text="Carbon tracking" delay={600} />
                        <FeatureItem text="API access" delay={700} />
                    </View>
                </View>
            </View>

            {/* Independence Tier Card */}
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <LinearGradient
                    colors={['#F3E5F5', '#E1BEE7']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.independenceCard}
                >
                    <FontAwesome5 name="rocket" size={24} color="#D81B60" style={styles.independenceIcon} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View>
                            <Text style={styles.independencePlanName}>Independence</Text>
                            <Text style={styles.independencePriceText}>
                                <Text style={styles.independencePriceAmount}>₹1999</Text>/mo
                            </Text>
                        </View>
                        <View style={{ width: 100, alignItems: 'flex-end', marginBottom: 15 }}>
                            <Text style={[styles.cardSpecText, { color: '#880E4F' }]}>Capacity: 50 kW+</Text>
                            <AnimatedProgressBar fillPercentage={100} color="#D81B60" bg="#F8BBD0" />
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.upgradeBtnContainer}
                        activeOpacity={0.9}
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}
                    >
                        <LinearGradient
                            colors={['#FF9800', '#F57C00']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.upgradeBtn}
                        >
                            <Text style={styles.upgradeBtnText}>Upgrade to Independence</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </LinearGradient>
            </Animated.View>

            {/* Spacer for bottom navbar */}
            <View style={{ height: 100 }} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFCFF',
    },
    content: {
        flexGrow: 1,
        padding: 20,
        paddingTop: 10,
        paddingBottom: 120, // accommodate bottom navbar
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    themeButton: {
        padding: 8,
        backgroundColor: '#FFF8E1',
        borderRadius: 10,
    },
    sectionSubtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 15,
        fontWeight: '500',
    },

    // Current Plan Card Styles
    currentPlanCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: '#FFE0B2',
        shadowColor: '#FF9800',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
        marginBottom: 30,
    },
    planBadgeTextTop: {
        fontSize: 12,
        color: '#888',
        fontWeight: '600',
        marginBottom: 8,
    },
    planHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    planName: {
        fontSize: 26,
        fontWeight: '900',
        color: '#1A1A1A',
        marginLeft: 10,
    },
    priceText: {
        fontSize: 16,
        color: '#F59E0B', // Amber
        fontWeight: '600',
        marginBottom: 15,
    },
    priceAmount: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    statusBadges: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
        gap: 8,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E8F5E9',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
    },
    badgeDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#4CAF50',
        marginRight: 6,
    },
    badgeText: {
        fontSize: 12,
        color: '#2E7D32',
        fontWeight: '600',
    },
    specsContainer: {
        marginTop: 5,
        gap: 6,
    },
    specText: {
        fontSize: 14,
        color: '#555',
        fontWeight: '400',
    },

    // Upgrade Section Styles
    sectionTitleTop: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginBottom: 15,
    },
    upgradeGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    planCard: {
        width: '48%', // Allow them to sit side-by-side
        borderRadius: 16,
        padding: 15,
        borderWidth: 1,
    },
    basicCard: {
        backgroundColor: '#F5F7FA',
        borderColor: '#E2E8F0',
    },
    premiumCard: {
        backgroundColor: '#FFF8F0',
        borderColor: '#FFE0B2',
        shadowColor: '#FF9800',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
    },
    cardHeaderFlex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        height: 24,
    },
    currentBadgeSmall: {
        backgroundColor: '#FFE0B2',
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 10,
    },
    currentBadgeText: {
        fontSize: 8,
        fontWeight: 'bold',
        color: '#F57C00',
    },
    cardPlanName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginBottom: 5,
    },
    cardPriceText: {
        fontSize: 12,
        color: '#555',
        marginBottom: 15,
    },
    cardPriceAmountBasic: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#F59E0B',
    },
    cardPriceAmountPremium: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#F59E0B',
    },
    cardSpecs: {
        marginBottom: 10,
    },
    cardSpecText: {
        fontSize: 10,
        color: '#666',
        marginBottom: 4,
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.05)',
        marginVertical: 10,
    },
    featureList: {
        gap: 6,
        marginBottom: 15,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    featureIcon: {
        marginTop: 1,
        marginRight: 4,
    },
    featureText: {
        fontSize: 10,
        color: '#555',
        flex: 1,
    },
    currentPlanBtn: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 'auto',
    },
    currentPlanBtnText: {
        fontSize: 12,
        color: '#888',
        fontWeight: '600',
    },

    // Independence Card Styles
    independenceCard: {
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        elevation: 2,
        shadowColor: '#AB47BC',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
    },
    independenceIcon: {
        marginBottom: 10,
    },
    independencePlanName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginBottom: 5,
    },
    independencePriceText: {
        fontSize: 14,
        color: '#D81B60', // Deep pink/purple
        fontWeight: '600',
    },
    independencePriceAmount: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    upgradeBtnContainer: {
        width: '100%',
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#F57C00',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    upgradeBtn: {
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    upgradeBtnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    // Progress Bar Styles
    progressBg: {
        height: 6,
        borderRadius: 3,
        width: '100%',
        overflow: 'hidden',
        marginTop: 2,
    },
    progressFill: {
        height: '100%',
        borderRadius: 3,
    }
});

export default SubscriptionScreen;
