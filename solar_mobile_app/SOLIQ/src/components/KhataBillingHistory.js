import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// Reusable Spring-Animated Button Wrapper
const BouncyButton = ({ children, style, onPress }) => {
    const scaleValue = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleValue, {
            toValue: 0.9,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleValue, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={onPress}
        >
            <Animated.View style={[style, { transform: [{ scale: scaleValue }] }]}>
                {children}
            </Animated.View>
        </TouchableOpacity>
    );
};

const KhataBillingHistory = () => {
    // Mock History Data matching the design
    const historyData = [
        { id: '1', month: '2026-01', gen: '598.0 kWh', con: '313.7 kWh', savings: '₹4667', sub: '₹0' },
        { id: '2', month: '2025-12', gen: '422.7 kWh', con: '293.8 kWh', savings: '₹2722', sub: 'Paid' },
        { id: '3', month: '2025-11', gen: '422.7 kWh', con: '1999', savings: '₹1999', sub: 'Download' }, // For custom icons
    ];

    // Animation values for waterfall row entrance
    const rowOpacities = useRef(historyData.map(() => new Animated.Value(0))).current;
    const rowTranslations = useRef(historyData.map(() => new Animated.Value(15))).current;

    // Advanced: Live Status Beacon Animation
    const beaconAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Beacon Pulse Loop
        Animated.loop(
            Animated.timing(beaconAnim, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            })
        ).start();

        const animations = historyData.map((_, index) => {
            return Animated.parallel([
                Animated.timing(rowOpacities[index], {
                    toValue: 1,
                    duration: 350,
                    useNativeDriver: true,
                }),
                Animated.timing(rowTranslations[index], {
                    toValue: 0,
                    duration: 350,
                    useNativeDriver: true,
                })
            ]);
        });
        Animated.stagger(100, animations).start();
    }, []);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Billing History</Text>
                <BouncyButton style={styles.seeAllButton}>
                    <Text style={styles.seeAllText}>See All</Text>
                    <Ionicons name="chevron-forward" size={16} color="#3B82F6" />
                </BouncyButton>
            </View>

            {/* Table Header Row */}
            <View style={styles.tableHeader}>
                <Text style={[styles.columnHeader, { flex: 1.5 }]}>Month</Text>
                <Text style={[styles.columnHeader, { flex: 2, textAlign: 'center' }]}>Generated</Text>
                <Text style={[styles.columnHeader, { flex: 2, textAlign: 'center' }]}>Consumed</Text>
                <Text style={[styles.columnHeader, { flex: 1.5, textAlign: 'center' }]}>Savings</Text>
                <Text style={[styles.columnHeader, { flex: 1.5, textAlign: 'center' }]}>Sub.</Text>
            </View>

            {/* Table Rows */}
            {historyData.map((row, index) => (
                <Animated.View
                    key={row.id}
                    style={[
                        styles.tableRow,
                        index !== historyData.length - 1 && styles.rowBorder,
                        {
                            opacity: rowOpacities[index],
                            transform: [
                                { translateY: rowTranslations[index] },
                                { perspective: 1000 },
                                {
                                    rotateX: rowOpacities[index].interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['30deg', '0deg']
                                    })
                                }
                            ]
                        }
                    ]}
                >
                    <Text style={[styles.cellText, { flex: 1.5, fontWeight: '700', color: '#1E293B' }]}>{row.month}</Text>

                    {/* Generated */}
                    <Text style={[styles.cellText, { flex: 2, textAlign: 'center', color: '#059669' }]}>{row.gen}</Text>

                    {/* Consumed */}
                    <View style={{ flex: 2, alignItems: 'center' }}>
                        <Text style={[styles.cellText, { color: row.con.includes('kWh') ? '#3B82F6' : '#1E293B' }]}>
                            {row.con.includes('kWh') ? row.con : `₹${row.con}`}
                        </Text>
                    </View>

                    {/* Savings */}
                    <Text style={[styles.cellText, { flex: 1.5, textAlign: 'center', color: row.savings.includes('₹') && row.con.includes('1999') ? '#1E293B' : '#059669' }]}>{row.savings}</Text>

                    {/* Sub / Action */}
                    <View style={styles.actionCell}>
                        {row.sub === 'Paid' ? (
                            <View style={styles.paidBadge}>
                                <View style={{ position: 'relative', width: 10, height: 10, justifyContent: 'center', alignItems: 'center', marginRight: 4 }}>
                                    <Animated.View
                                        style={[
                                            styles.paidDot,
                                            {
                                                position: 'absolute',
                                                transform: [{ scale: beaconAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 2.5] }) }],
                                                opacity: beaconAnim.interpolate({ inputRange: [0, 1], outputRange: [0.6, 0] }),
                                            }
                                        ]}
                                    />
                                    <View style={styles.paidDot} />
                                </View>
                                <Text style={styles.paidText}>Paid</Text>
                            </View>
                        ) : row.sub === 'Download' ? (
                            <View style={styles.downloadActions}>
                                <TouchableOpacity>
                                    <Ionicons name="download-outline" size={16} color="#F59E0B" style={{ marginRight: 6 }} />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <MaterialCommunityIcons name="export-variant" size={16} color="#F59E0B" />
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <Text style={[styles.cellText, { fontWeight: '700', color: '#1E293B' }]}>{row.sub}</Text>
                        )}
                    </View>
                </Animated.View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginHorizontal: 20,
        marginBottom: 30, // Extra bottom margin for scroll padding
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 10,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#475569',
    },
    seeAllButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    seeAllText: {
        fontSize: 14,
        color: '#3B82F6',
        fontWeight: '500',
        marginRight: 2,
    },
    tableHeader: {
        flexDirection: 'row',
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    columnHeader: {
        fontSize: 12,
        fontWeight: '600',
        color: '#1E293B',
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
    },
    rowBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#F8FAFC',
    },
    cellText: {
        fontSize: 12,
        fontWeight: '500',
    },
    actionCell: {
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    paidBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FEF3C7',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#FDE68A',
    },
    paidDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#D97706',
        marginRight: 4,
    },
    paidText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#B45309',
    },
    downloadActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default KhataBillingHistory;
