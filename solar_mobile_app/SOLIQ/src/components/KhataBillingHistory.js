import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const KhataBillingHistory = () => {
    // Mock History Data matching the design
    const historyData = [
        { id: '1', month: '2026-01', gen: '598.0 kWh', con: '313.7 kWh', savings: '₹4667', sub: '₹0' },
        { id: '2', month: '2025-12', gen: '422.7 kWh', con: '293.8 kWh', savings: '₹2722', sub: 'Paid' },
        { id: '3', month: '2025-11', gen: '422.7 kWh', con: '1999', savings: '₹1999', sub: 'Download' }, // For custom icons
    ];

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Billing History</Text>
                <TouchableOpacity style={styles.seeAllButton}>
                    <Text style={styles.seeAllText}>See All</Text>
                    <Ionicons name="chevron-forward" size={16} color="#3B82F6" />
                </TouchableOpacity>
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
                <View
                    key={row.id}
                    style={[
                        styles.tableRow,
                        index !== historyData.length - 1 && styles.rowBorder
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
                                <View style={styles.paidDot} />
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
                </View>
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
