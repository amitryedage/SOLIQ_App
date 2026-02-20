import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Ionicons, FontAwesome5, Entypo } from '@expo/vector-icons';

const ActionButton = ({ icon, label, sublabel, color, iconType }) => {
    return (
        <TouchableOpacity style={styles.button}>
            <View style={[styles.iconContainer, { backgroundColor: color + '15' }]}>
                {iconType === 'MCI' && <MaterialCommunityIcons name={icon} size={24} color={color} />}
                {iconType === 'FA' && <FontAwesome5 name={icon} size={20} color={color} />}
                {iconType === 'Entypo' && <Entypo name={icon} size={24} color={color} />}
                {iconType === 'Ionicons' && <Ionicons name={icon} size={24} color={color} />}
            </View>
            <Text style={styles.buttonLabel}>{label}</Text>
            <Text style={styles.buttonSublabel}>{sublabel}</Text>
        </TouchableOpacity>
    );
};

const ActionGrid = () => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <ActionButton
                    icon="credit-card-outline"
                    iconType="MCI"
                    label="Pay Bill"
                    sublabel="₹2,340 Due"
                    color="#4FA7D8"
                />
                <ActionButton
                    icon="swap-horizontal-circle"
                    iconType="MCI"
                    label="Trade Energy"
                    sublabel="5.5 kWh Available"
                    color="#4CAF50"
                />
            </View>
            <View style={styles.row}>
                <ActionButton
                    icon="message-draw"
                    iconType="MCI"
                    label="Raise Ticket"
                    sublabel="Support"
                    color="#FFA000"
                />
                <ActionButton
                    icon="leaf"
                    iconType="FA"
                    label="Carbon Credits"
                    sublabel="0.8 Credits"
                    color="#66BB6A"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#fff',
        flex: 1,
        marginHorizontal: 5,
        borderRadius: 15,
        padding: 15,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F0F0F0',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    iconContainer: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonLabel: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#333',
    },
    buttonSublabel: {
        fontSize: 10,
        color: '#666',
        marginTop: 2,
    },
});

export default ActionGrid;
