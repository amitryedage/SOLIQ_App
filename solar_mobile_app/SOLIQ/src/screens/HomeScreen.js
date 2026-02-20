import React from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import TopNavbar from '../components/TopNavbar';
import ActionGrid from '../components/ActionGrid';


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
