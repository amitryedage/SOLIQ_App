import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TopNavbar = () => {
    const spinAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(spinAnim, {
                toValue: 1,
                duration: 10000, // 10 seconds for a full rotation (slow & smooth)
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const spin = spinAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    return (
        <View style={styles.container}>
            <View style={styles.leftSection}>
                <TouchableOpacity style={styles.menuButton}>
                    <Ionicons name="menu-outline" size={28} color="#333" />
                </TouchableOpacity>
                <View style={styles.logoContainer}>
                    <Animated.View style={{ transform: [{ rotate: spin }] }}>
                        <Ionicons name="sunny" size={32} color="#FBC02D" />
                    </Animated.View>
                    <Text style={{ marginLeft: 6 }}>
                        <Text style={{ color: '#F4B13E', fontSize: 22, fontWeight: '900', letterSpacing: 0.5 }}>SOL</Text>
                        <Text style={{ color: '#4285B4', fontSize: 22, fontWeight: '900', letterSpacing: 0.5 }}>IQ</Text>
                    </Text>
                </View>
            </View>
            <View style={styles.rightSection}>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="notifications" size={24} color="#333" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.avatarContainer}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>A</Text>
                    </View>
                    <View style={styles.avatarBadge}>
                        <Text style={styles.avatarBadgeText}>3</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 18,
        paddingBottom: 10,
        backgroundColor: '#fff',
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuButton: {
        marginRight: 15,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 8,
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        marginRight: 15,
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#4FA7D8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    avatarBadge: {
        position: 'absolute',
        top: -4,
        right: -4,
        backgroundColor: '#FF4C4C',
        borderRadius: 9,
        width: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#fff',
    },
    avatarBadgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
});

export default TopNavbar;
