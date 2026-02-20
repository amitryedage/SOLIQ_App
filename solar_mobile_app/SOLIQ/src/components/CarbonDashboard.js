import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CarbonMetricGrid from './CarbonMetricGrid';

const CarbonDashboard = () => {
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.header}>
                <Text style={styles.title}>Carbon Credits Dashboard</Text>
                <Text style={styles.subtitle}>Environmental impact & carbon trading</Text>
            </View>

            <CarbonMetricGrid />

            <View style={styles.placeholder}>
                <Text style={styles.placeholderText}>More sections coming in next phases...</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        paddingBottom: 100,
    },
    header: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        fontSize: 12,
        color: '#999',
        marginTop: 4,
    },
    placeholder: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: '#eee',
        borderStyle: 'dashed',
        borderRadius: 15,
    },
    placeholderText: {
        color: '#bbb',
        fontStyle: 'italic',
    }
});

export default CarbonDashboard;
