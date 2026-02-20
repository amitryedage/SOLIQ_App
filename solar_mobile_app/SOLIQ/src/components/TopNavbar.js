import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TopNavbar = () => {
    return (
        <View style={styles.container}>
            <View style={styles.leftSection}>
                <TouchableOpacity style={styles.menuButton}>
                    <Ionicons name="menu-outline" size={28} color="#333" />
                </TouchableOpacity>
                <View style={styles.logoContainer}>
                    <Ionicons name="sunny" size={24} color="#FBC02D" />
                    <Text style={styles.title}>SolarIQ</Text>
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
        paddingVertical: 10,
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
