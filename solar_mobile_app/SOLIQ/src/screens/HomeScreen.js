import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, StatusBar, Text } from 'react-native';
import TopNavbar from '../components/TopNavbar';
import EnergyHeader from '../components/EnergyHeader';
import StatsBar from '../components/StatsBar';
import TodayKhata from '../components/TodayKhata';
import EnergyScore from '../components/EnergyScore';
import ActionGrid from '../components/ActionGrid';
import BottomNavbar from '../components/BottomNavbar';
import CarbonDashboard from '../components/CarbonDashboard';
import SubscriptionScreen from '../components/SubscriptionScreen';

const HomeScreen = () => {
    const [activeTab, setActiveTab] = useState('subscription');

    const renderContent = () => {
        if (activeTab === 'home') {
            return (
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <EnergyHeader />
                    <StatsBar />
                    <TodayKhata />
                    <EnergyScore />
                    <ActionGrid />
                </ScrollView>
            );
        }

        if (activeTab === 'carbon') {
            return <CarbonDashboard />;
        }

        if (activeTab === 'subscription') {
            return <SubscriptionScreen />;
        }

        return (
            <View style={styles.placeholder}>
                <Text>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />
            <TopNavbar />
            {renderContent()}
            <BottomNavbar activeTab={activeTab} onTabPress={setActiveTab} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        paddingBottom: 100, // Account for BottomNavbar
    },
    placeholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
    }
});

export default HomeScreen;
