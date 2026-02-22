import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
import { Ionicons } from '@expo/vector-icons';

const EnergyScore = () => {
    const score = 820;
    const maxScore = 900;
    const percentage = score / maxScore;
    const radius = 60;
    const strokeWidth = 10;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference * (1 - (percentage * 0.75)); // 0.75 to make it a partial circle

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(20)).current;
    const gaugeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                delay: 550, // Slightly after TodayKhata
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 500,
                delay: 550,
                useNativeDriver: true,
            }),
            Animated.timing(gaugeAnim, {
                toValue: 1,
                duration: 1500,
                delay: 750, // Starts drawing right after it slides in
                easing: Easing.out(Easing.cubic),
                useNativeDriver: false, // strokeDashoffset cannot use native driver
            })
        ]).start();
    }, []);

    const animatedDashoffset = gaugeAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [circumference, strokeDashoffset]
    });

    return (
        <AnimatedLinearGradient
            colors={['#FFFFFF', '#E8F1FF']}
            style={[styles.container, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
        >
            <View style={styles.gaugeContainer}>
                <Svg height="150" width="150" viewBox="0 0 150 150">
                    <Circle
                        cx="75"
                        cy="75"
                        r={radius}
                        stroke="#E0E0E0"
                        strokeWidth={strokeWidth}
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference * 0.25}
                        strokeLinecap="round"
                        transform="rotate(135 75 75)"
                    />
                    <AnimatedCircle
                        cx="75"
                        cy="75"
                        r={radius}
                        stroke="#4FA7D8"
                        strokeWidth={strokeWidth}
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={animatedDashoffset}
                        strokeLinecap="round"
                        transform="rotate(135 75 75)"
                    />
                </Svg>
                <View style={styles.scoreTextContainer}>
                    <Text style={styles.scoreValue}>{score}</Text>
                    <Text style={styles.scoreMax}>/ {maxScore}</Text>
                    <Text style={styles.scoreLabel}>Energy Score</Text>
                </View>
            </View>

            <View style={styles.benefitsContainer}>
                {[
                    'Lower subscription rate',
                    'Priority support',
                    'Carbon credit bonus',
                    'Premium plan discount'
                ].map((benefit, index) => (
                    <View key={index} style={styles.benefitItem}>
                        {index === 3 ? (
                            <Ionicons name="lock-closed" size={14} color="#999" style={styles.checkIcon} />
                        ) : (
                            <Ionicons name="checkmark-circle" size={14} color="#4CAF50" style={styles.checkIcon} />
                        )}
                        <Text style={[styles.benefitText, index === 3 && styles.lockedText]}>{benefit}</Text>
                    </View>
                ))}
            </View>
        </AnimatedLinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 20,
        borderRadius: 20,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    gaugeContainer: {
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scoreTextContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scoreValue: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
    },
    scoreMax: {
        fontSize: 12,
        color: '#666',
    },
    scoreLabel: {
        fontSize: 10,
        color: '#4FA7D8',
        fontWeight: '600',
        marginTop: 2,
    },
    benefitsContainer: {
        flex: 1,
        marginLeft: 10,
    },
    benefitItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    checkIcon: {
        marginRight: 6,
    },
    benefitText: {
        fontSize: 11,
        color: '#333',
    },
    lockedText: {
        color: '#999',
    },
});

export default EnergyScore;