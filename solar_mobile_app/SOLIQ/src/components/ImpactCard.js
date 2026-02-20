import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const ImpactCard = ({ icon, iconType, iconColor, value, unit, label, subtext, bgColor }) => {
    return (
        <View style={[styles.container, { backgroundColor: bgColor }]}>
            <View style={styles.iconContainer}>
                {iconType === 'Ionicons' && <Ionicons name={icon} size={48} color={iconColor} />}
                {iconType === 'MCI' && <MaterialCommunityIcons name={icon} size={48} color={iconColor} />}
                {/* Special case for Earth icon if needed, but Ionicons/globe works */}
            </View>

            <View style={styles.content}>
                <View style={styles.valueRow}>
                    <Text style={[styles.value, { color: iconColor }]}>{value} {unit}</Text>
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
        shadowOpacity: 0.05,
        shadowRadius: 5,
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
