import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const SubscriptionScreen = () => {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {/* Header Section */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Subscription</Text>
                <TouchableOpacity style={styles.themeButton}>
                    <Ionicons name="sunny-outline" size={24} color="#FBC02D" />
                </TouchableOpacity>
            </View>

            <Text style={styles.sectionSubtitle}>Manage your SolarIQ plan</Text>

            {/* Current Plan Card (Basic) */}
            <View style={styles.currentPlanCard}>
                <Text style={styles.planBadgeTextTop}>Current Plan</Text>

                <View style={styles.planHeader}>
                    <FontAwesome5 name="seedling" size={24} color="#4CAF50" />
                    <Text style={styles.planName}>Basic</Text>
                </View>

                <Text style={styles.priceText}>
                    <Text style={styles.priceAmount}>₹499</Text>/month
                </Text>

                <View style={styles.statusBadges}>
                    <View style={styles.badge}>
                        <View style={styles.badgeDot} />
                        <Text style={styles.badgeText}>Active</Text>
                    </View>
                    <View style={styles.badge}>
                        <View style={styles.badgeDot} />
                        <Text style={styles.badgeText}>Paid</Text>
                    </View>
                    <View style={styles.badge}>
                        <View style={styles.badgeDot} />
                        <Text style={styles.badgeText}>Auto-renew: ON</Text>
                    </View>
                </View>

                <View style={styles.specsContainer}>
                    <Text style={styles.specText}>Capacity: 5 kW</Text>
                    <Text style={styles.specText}>Support: Email (48h response)</Text>
                    <Text style={styles.specText}>SLA: 95%</Text>
                </View>
            </View>

            {/* Spacer for next phases */}
            <View style={{ height: 100 }} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCFDFF', // Very light, slightly cool background
    },
    content: {
        flexGrow: 1,
        padding: 20,
        paddingTop: 10,
        paddingBottom: 120, // accommodate bottom navbar
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    themeButton: {
        padding: 8,
        backgroundColor: '#FFF8E1',
        borderRadius: 10,
    },
    sectionSubtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 15,
        fontWeight: '500',
    },

    // Current Plan Card Styles
    currentPlanCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: '#FFE0B2', // Subtle orange tint to border
        shadowColor: '#FF9800',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
        marginBottom: 30,
    },
    planBadgeTextTop: {
        fontSize: 12,
        color: '#888',
        fontWeight: '600',
        marginBottom: 8,
    },
    planHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    planName: {
        fontSize: 26,
        fontWeight: '900',
        color: '#1A1A1A',
        marginLeft: 10,
    },
    priceText: {
        fontSize: 16,
        color: '#F59E0B', // Amber
        fontWeight: '600',
        marginBottom: 15,
    },
    priceAmount: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    statusBadges: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
        gap: 8,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E8F5E9', // Light green
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
    },
    badgeDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#4CAF50',
        marginRight: 6,
    },
    badgeText: {
        fontSize: 12,
        color: '#2E7D32',
        fontWeight: '600',
    },
    specsContainer: {
        marginTop: 5,
        gap: 6,
    },
    specText: {
        fontSize: 14,
        color: '#555',
        fontWeight: '400',
    }
});

export default SubscriptionScreen;
