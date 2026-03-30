import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const StatsBar = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                delay: 200,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 500,
                delay: 200,
                useNativeDriver: true,
            })
        ]).start();
    }, []);

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim, transform: [{ translateX: slideAnim }] }]}>
            <View style={styles.statItem}>
                <Ionicons name="flash" size={16} color="#FBC02D" />
                <Text style={styles.statValue}>87%</Text>
                <Text style={styles.statLabel}>Self-consumed</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.statItem}>
                <MaterialCommunityIcons name="home-variant-outline" size={16} color="#4CAF50" />
                <Text style={styles.statValue}>4.2 kWh</Text>
                <Text style={styles.statLabel}>to Grid</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.statItem}>
                <MaterialCommunityIcons name="hand-coin-outline" size={16} color="#8D6E63" />
                <Text style={styles.statValue}>₹487</Text>
                <Text style={styles.statLabel}>Saved</Text>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#F5F9F6',
        marginHorizontal: 20,
        borderRadius: 15,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: -10, // Slight overlap with the header gradient card
        zIndex: 1,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginHorizontal: 4,
    },
    statLabel: {
        fontSize: 10,
        color: '#666',
    },
    divider: {
        width: 1,
        height: 20,
        backgroundColor: '#DDD',
    },
});

export default StatsBar;