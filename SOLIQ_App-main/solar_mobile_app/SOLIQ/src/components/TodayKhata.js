import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const TodayKhata = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(20)).current;
    const progressAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                delay: 400, // Starts as soon as Header finishes
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 500,
                delay: 400,
                useNativeDriver: true,
            }),
            Animated.timing(progressAnim, {
                toValue: 1,
                duration: 1000,
                delay: 600, // Grows after sliding up
                easing: Easing.out(Easing.cubic),
                useNativeDriver: false,
            })
        ]).start();
    }, []);

    const data = [
        { id: 1, icon: 'wb-sunny', iconType: 'MaterialIcons', color: '#FFD700', title: 'Solar Generated', time: '11:30 AM', value: '+18.3', unit: 'kWh', progress: 0.8 },
        { id: 2, icon: 'home-flash', iconType: 'MaterialCommunityIcons', color: '#FFA000', title: 'Home Consumption', time: '11:30 AM', value: '-12.8', unit: 'kWh' },
        { id: 3, icon: 'grid-on', iconType: 'MaterialIcons', color: '#4CAF50', title: 'Exported to Grid', time: '02:15 PM', value: '+4.2', unit: 'kWh' },
        { id: 4, icon: 'gift', iconType: 'FontAwesome5', color: '#FF7043', title: 'SLA Auto-Credit', time: '09:42 AM', value: '+₹120', subtitle: 'Reason: 23 min downtime' },
    ];

    const renderIcon = (item) => {
        if (item.iconType === 'MaterialIcons') return <MaterialIcons name={item.icon} size={24} color={item.color} />;
        if (item.iconType === 'MaterialCommunityIcons') return <FontAwesome5 name="bolt" size={24} color={item.color} />; // Appears to be a custom bolt in image
        if (item.iconType === 'FontAwesome5') return <FontAwesome5 name={item.icon} size={24} color={item.color} />;
        return null;
    };

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <View style={styles.header}>
                <Text style={styles.title}>Today's Khata</Text>
                <TouchableOpacity style={styles.viewHistory}>
                    <Text style={styles.viewHistoryText}>View History</Text>
                    <Ionicons name="arrow-forward" size={14} color="#4FA7D8" />
                </TouchableOpacity>
            </View>

            {data.map((item) => (
                <View key={item.id} style={styles.itemCard}>
                    <View style={[styles.iconContainer, { backgroundColor: item.color + '15' }]}>
                        {renderIcon(item)}
                    </View>
                    <View style={styles.itemContent}>
                        <View style={styles.row}>
                            <View>
                                <Text style={styles.itemTitle}>{item.title}</Text>
                                <Text style={styles.itemTime}>{item.time}</Text>
                            </View>
                            <View style={styles.valueRow}>
                                <Text style={styles.itemValue}>{item.value}</Text>
                                <Text style={styles.itemUnit}>{item.unit}</Text>
                            </View>
                        </View>
                        {item.progress && (
                            <View style={styles.progressContainer}>
                                <Animated.View
                                    style={[
                                        styles.progressBar,
                                        {
                                            width: progressAnim.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: ['0%', (item.progress * 100) + '%']
                                            })
                                        }
                                    ]}
                                />
                            </View>
                        )}
                        {item.subtitle && (
                            <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                        )}
                    </View>
                </View>
            ))}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    viewHistory: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewHistoryText: {
        fontSize: 12,
        color: '#4FA7D8',
        marginRight: 4,
    },
    itemCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    iconContainer: {
        width: 45,
        height: 45,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    itemContent: {
        flex: 1,
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    itemTime: {
        fontSize: 11,
        color: '#999',
        marginTop: 2,
    },
    valueRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    itemUnit: {
        fontSize: 12,
        color: '#666',
        marginLeft: 4,
    },
    progressContainer: {
        height: 4,
        backgroundColor: '#E0E0E0',
        borderRadius: 2,
        marginTop: 8,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#4CAF50',
    },
    itemSubtitle: {
        fontSize: 11,
        color: '#666',
        fontStyle: 'italic',
        marginTop: 5,
    },
});

export default TodayKhata;