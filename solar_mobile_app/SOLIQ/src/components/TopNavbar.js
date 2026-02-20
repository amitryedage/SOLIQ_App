import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TopNavbar = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Ionicons name="menu-outline" size={28} color="#333" />
            </TouchableOpacity>
            
            <Text style={styles.title}>Energy Khata</Text>
            
            <TouchableOpacity style={styles.notificationContainer}>
                <Ionicons name="notifications-outline" size={26} color="#333" />
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>2</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    notificationContainer: {
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        top: -2,
        right: -2,
        backgroundColor: '#FF4C4C',
        borderRadius: 10,
        width: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#fff',
    },
    badgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
});

export default TopNavbar;
