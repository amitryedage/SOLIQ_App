import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

const CarbonMetricCard = ({ title, value, unit, icon, iconType, iconColor, bgColor, trend }) => {
    return (
        <View style={[styles.container, { backgroundColor: bgColor || '#fff' }]}>
            <View style={styles.header}>
                <View style={styles.iconContainer}>
                    {iconType === 'Ionicons' && <Ionicons name={icon} size={18} color={iconColor} />}
                    {iconType === 'MCI' && <MaterialCommunityIcons name={icon} size={18} color={iconColor} />}
                    {iconType === 'FA' && <FontAwesome5 name={icon} size={16} color={iconColor} />}
                </View>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.valueRow}>
                <Text style={styles.value}>{value}</Text>
                <Text style={styles.unit}>{unit}</Text>
                {trend && (
                    <View style={styles.trendBadge}>
                        <MaterialCommunityIcons name="trending-up" size={12} color="#4CAF50" />
                        <Text style={styles.trendText}>{trend}</Text>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 15,
        padding: 15,
        margin: 5,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    iconContainer: {
        marginRight: 6,
    },
    title: {
        fontSize: 10,
        color: '#666',
        fontWeight: '500',
    },
    valueRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    value: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    unit: {
        fontSize: 12,
        color: '#666',
        marginLeft: 4,
    },
    trendBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E8F5E9',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 10,
        marginLeft: 8,
    },
    trendText: {
        fontSize: 8,
        color: '#4CAF50',
        fontWeight: 'bold',
        marginLeft: 2,
    },
});

export default CarbonMetricCard;
