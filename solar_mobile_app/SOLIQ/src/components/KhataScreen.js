import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const KhataScreen = () => {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {/* Top Toolbar */}
            <View style={styles.topToolbar}>
                <TouchableOpacity style={styles.menuButton}>
                    <Ionicons name="menu-outline" size={28} color="#1A1A1A" />
                </TouchableOpacity>

                <View style={styles.logoContainer}>
                    <Ionicons name="sunny" size={28} color="#FBC02D" />
                    <Text style={{ marginLeft: 6 }}>
                        <Text style={{ color: '#F4B13E', fontSize: 20, fontWeight: '900', letterSpacing: 0.5 }}>SOL</Text>
                        <Text style={{ color: '#4285B4', fontSize: 20, fontWeight: '900', letterSpacing: 0.5 }}>IQ</Text>
                    </Text>
                </View>

                <View style={styles.rightToolbar}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="notifications" size={24} color="#1A1A1A" />
                        <View style={styles.notificationBadge}>
                            <Text style={styles.notificationBadgeText}>3</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.avatarContainer}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>A</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header Title Section */}
                <View style={styles.headerSection}>
                    <Text style={styles.pageTitle}>Billing Dashboard</Text>
                    <Text style={styles.pageSubtitle}>Monthly billing & savings overview</Text>
                </View>

                {/* Content will go here in Phase 2 */}

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA', // Slight off-white background matching the design
    },
    topToolbar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 15,
        backgroundColor: '#FAFAFA',
    },
    menuButton: {
        padding: 4,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightToolbar: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        padding: 4,
        marginRight: 12,
        position: 'relative',
    },
    notificationBadge: {
        position: 'absolute',
        top: 2,
        right: 2,
        backgroundColor: '#EF4444',
        borderRadius: 10,
        minWidth: 16,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#FAFAFA',
    },
    notificationBadgeText: {
        color: '#fff',
        fontSize: 9,
        fontWeight: 'bold',
    },
    avatarContainer: {
        padding: 2,
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#4285B4',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    scrollContainer: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 100, // Make room for bottom nav
    },
    headerSection: {
        paddingHorizontal: 24,
        marginTop: 10,
        marginBottom: 20,
    },
    pageTitle: {
        fontSize: 26,
        fontWeight: '700',
        color: '#111827',
        letterSpacing: -0.5,
        marginBottom: 6,
    },
    pageSubtitle: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '500',
    },
});

export default KhataScreen;
