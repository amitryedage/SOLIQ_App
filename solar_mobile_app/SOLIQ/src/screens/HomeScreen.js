import React from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import TopNavbar from '../components/TopNavbar';
import EnergyHeader from '../components/EnergyHeader';
import StatsBar from '../components/StatsBar';
import TodayKhata from '../components/TodayKhata';
import EnergyScore from '../components/EnergyScore';
import ActionGrid from '../components/ActionGrid';
import BottomNavbar from '../components/BottomNavbar';

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />
            <TopNavbar />
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
            <BottomNavbar />
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
});

export default HomeScreen;
