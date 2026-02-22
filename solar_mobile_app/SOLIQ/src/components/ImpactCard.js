import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated, Easing } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// --- INTERACTIVE TICKER ---
const AnimatedNumber = ({ value, duration = 1500, delay = 0, prefix = '' }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: parseFloat(value),
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

    return <Text>{prefix}{displayValue.toLocaleString()}</Text>;
};

const ImpactCard = ({ icon, iconType, iconColor, value, unit, label, subtext, bgColor, delay = 0 }) => {
    const shimmerAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Recurring Shimmer Animation
        Animated.loop(
            Animated.sequence([
                Animated.delay(2000 + Math.random() * 2000), // Randomize start a bit
                Animated.timing(shimmerAnim, { toValue: 1, duration: 2000, easing: Easing.linear, useNativeDriver: true }),
                Animated.timing(shimmerAnim, { toValue: 0, duration: 0, useNativeDriver: true })
            ])
        ).start();
    }, []);

    const shimmerTranslate = shimmerAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-200, 200]
    });

    return (
        <View style={[styles.container, { backgroundColor: bgColor || 'rgba(255, 255, 255, 0.8)' }]}>
            {/* Shimmer overlay */}
            <Animated.View style={[styles.shimmer, {
                transform: [{ rotate: '45deg' }, { scale: 2 }, { translateX: shimmerTranslate }]
            }]}>
                <LinearGradient
                    colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ flex: 1 }}
                />
            </Animated.View>

            <View style={styles.iconContainer}>
                {iconType === 'Ionicons' && <Ionicons name={icon} size={48} color={iconColor} />}
                {iconType === 'MCI' && <MaterialCommunityIcons name={icon} size={48} color={iconColor} />}
            </View>

            <View style={styles.content}>
                <View style={styles.valueRow}>
                    <Text style={[styles.value, { color: iconColor }]}>
                        <AnimatedNumber value={value} delay={delay} /> {unit}
                    </Text>
                </View>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.subtext}>{subtext}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 20,
        padding: 20,
        marginVertical: 10,
        marginHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.8)',
    },
    shimmer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
    },
    iconContainer: {
        marginBottom: 15,
    },
    content: {
        alignItems: 'center',
    },
    valueRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 4,
    },
    value: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    label: {
        fontSize: 14,
        color: '#666',
        fontWeight: '600',
        marginBottom: 4,
    },
    subtext: {
        fontSize: 10,
        color: '#999',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
});

export default ImpactCard;
