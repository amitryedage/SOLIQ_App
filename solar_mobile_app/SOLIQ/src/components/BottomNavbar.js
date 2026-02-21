import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const NavItem = ({ icon, label, active, iconType, onPress }) => {
    return (
        <TouchableOpacity style={styles.navItem} onPress={onPress}>
            {iconType === 'Ionicons' && <Ionicons name={icon} size={24} color={active ? '#4FA7D8' : '#999'} />}
            {iconType === 'MCI' && <MaterialCommunityIcons name={icon} size={24} color={active ? '#4FA7D8' : '#999'} />}
            {iconType === 'FA' && <FontAwesome5 name={icon} size={20} color={active ? '#4FA7D8' : '#999'} />}
            <Text style={[styles.navLabel, active && styles.activeLabel]}>{label}</Text>
        </TouchableOpacity>
    );
};

const BottomNavbar = ({ activeTab, onTabPress }) => {
    return (
        <View style={styles.outerContainer}>
            <View style={styles.container}>
                <NavItem
                    icon="home"
                    iconType="Ionicons"
                    label="Home"
                    active={activeTab === 'home'}
                    onPress={() => onTabPress('home')}
                />
                <NavItem
                    icon="text-box-outline"
                    iconType="MCI"
                    label="Khata"
                    active={activeTab === 'khata'}
                    onPress={() => onTabPress('khata')}
                />

                <NavItem
                    icon="star-outline"
                    iconType="Ionicons"
                    label="Plans"
                    active={activeTab === 'subscription'}
                    onPress={() => onTabPress('subscription')}
                />


                <NavItem
                    icon="cart"
                    iconType="Ionicons"
                    label="Market"
                    active={activeTab === 'market'}
                    onPress={() => onTabPress('market')}
                />
                <NavItem
                    icon="leaf"
                    iconType="FA"
                    label="CO2"
                    active={activeTab === 'carbon'}
                    onPress={() => onTabPress('carbon')}
                />
            </View>

            {/* Floating Action Button */}
            <TouchableOpacity style={styles.fabContainer}>
                <LinearGradient
                    colors={['#FF8A65', '#EF5350']}
                    style={styles.fab}
                >
                    <Ionicons name="add" size={32} color="#fff" />
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 25, // For notch support/safe area
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    navLabel: {
        fontSize: 10,
        color: '#999',
        marginTop: 4,
    },
    activeLabel: {
        color: '#4FA7D8',
        fontWeight: 'bold',
    },
    fabSpacer: {
        flex: 1,
    },
    fabContainer: {
        position: 'absolute',
        bottom: 90, // Hover above the nav bar height
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#fff', // White ring
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    fab: {
        width: 52,
        height: 52,
        borderRadius: 26,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default BottomNavbar;
