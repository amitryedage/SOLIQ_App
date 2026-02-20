import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, PanResponder, Animated } from 'react-native';
import Svg, { Rect, Line } from 'react-native-svg';

const { width } = Dimensions.get('window');
const CHART_WIDTH = width - 70;
const CHART_HEIGHT = 120;

const CarbonEarningsChart = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const tooltipOpacity = useRef(new Animated.Value(0)).current;

    const data = [
        { label: 'Jan', value: 245, h: 60 },
        { label: 'Mar', value: 180, h: 40 },
        { label: 'May', value: 210, h: 45 },
        { label: 'Jul', value: 375, h: 80 },
        { label: 'Sep', value: 225, h: 55 },
    ];

    const barWidth = 35;
    const spacing = (CHART_WIDTH - (data.length * barWidth)) / (data.length - 1);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: (evt) => {
                const { locationX } = evt.nativeEvent;
                const index = Math.floor(locationX / (barWidth + spacing));
                if (index >= 0 && index < data.length) {
                    setActiveIndex(index);
                    Animated.timing(tooltipOpacity, { toValue: 1, duration: 200, useNativeDriver: true }).start();
                }
            },
            onPanResponderMove: (evt) => {
                const { locationX } = evt.nativeEvent;
                const index = Math.floor(locationX / (barWidth + spacing));
                if (index >= 0 && index < data.length) {
                    setActiveIndex(index);
                } else {
                    setActiveIndex(null);
                }
            },
            onPanResponderRelease: () => {
                Animated.timing(tooltipOpacity, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => {
                    setActiveIndex(null);
                });
            },
            onPanResponderTerminate: () => {
                Animated.timing(tooltipOpacity, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => {
                    setActiveIndex(null);
                });
            },
        })
    ).current;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Carbon Credit Earnings</Text>
            </View>

            <View style={styles.chartArea}>
                <View style={styles.yAxis}>
                    <Text style={styles.axisLabel}>400</Text>
                    <Text style={styles.axisLabel}>200</Text>
                    <Text style={styles.axisLabel}>0</Text>
                </View>

                <View style={styles.svgContainer} {...panResponder.panHandlers}>
                    <Svg height={CHART_HEIGHT} width={CHART_WIDTH}>
                        <Line x1="0" y1="0" x2={CHART_WIDTH} y2="0" stroke="#eee" strokeWidth="1" />
                        <Line x1="0" y1={CHART_HEIGHT / 2} x2={CHART_WIDTH} y2={CHART_HEIGHT / 2} stroke="#eee" strokeWidth="1" />
                        <Line x1="0" y1={CHART_HEIGHT} x2={CHART_WIDTH} y2={CHART_HEIGHT} stroke="#eee" strokeWidth="1" />

                        {data.map((item, i) => (
                            <Rect
                                key={i}
                                x={i * (barWidth + spacing)}
                                y={CHART_HEIGHT - item.h}
                                width={barWidth}
                                height={item.h}
                                fill={activeIndex === i ? '#FF8F00' : '#FFA000'}
                                rx="5"
                            />
                        ))}
                    </Svg>

                    {activeIndex !== null && (
                        <Animated.View style={[styles.tooltip, {
                            opacity: tooltipOpacity,
                            left: Math.max(0, Math.min(CHART_WIDTH - 60, (activeIndex * (barWidth + spacing)) - 12.5)),
                            top: CHART_HEIGHT - data[activeIndex].h - 45,
                            transform: [{ scale: tooltipOpacity }]
                        }]}>
                            <Text style={styles.tooltipValue}>₹{data[activeIndex].value}</Text>
                        </Animated.View>
                    )}
                </View>
            </View>

            <View style={styles.xAxis}>
                <Text style={styles.axisLabel}>Jan</Text>
                <Text style={styles.axisLabel}>Mar</Text>
                <Text style={styles.axisLabel}>May</Text>
                <Text style={styles.axisLabel}>Jul</Text>
                <Text style={styles.axisLabel}>Sep</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginHorizontal: 15,
        marginVertical: 10,
        borderRadius: 20,
        padding: 15,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    header: {
        marginBottom: 15,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    chartArea: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    yAxis: {
        justifyContent: 'space-between',
        height: CHART_HEIGHT,
        marginRight: 10,
    },
    svgContainer: {
        flex: 1,
        position: 'relative',
    },
    xAxis: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 35,
        marginTop: 10,
    },
    axisLabel: {
        fontSize: 10,
        color: '#BBB',
    },
    tooltip: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.85)',
        borderRadius: 8,
        paddingVertical: 5,
        paddingHorizontal: 8,
        alignItems: 'center',
        minWidth: 60,
        zIndex: 100,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    tooltipValue: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default CarbonEarningsChart;
