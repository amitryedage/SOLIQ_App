import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const StatsBar = () => {
    return (
        <View style={styles.container}>
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
        </View>
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