import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, Easing } from 'react-native';
import Svg, { Rect, Line, Text as SvgText } from 'react-native-svg';

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const { width } = Dimensions.get('window');
const CHART_WIDTH = width - 80;
const CHART_HEIGHT = 160;

const KhataEnergyChart = () => {
    // Mock data for the last 5 months
    const data = [
        { label: '2025-08', gen: 580, con: 320 },
        { label: '2025-07', gen: 250, con: 340 },
        { label: '2025-06', gen: 420, con: 260 },
        { label: '2025-05', gen: 480, con: 320 },
    ];

    const MAX_VALUE = 600;

    // Animation
    const chartProgress = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(chartProgress, {
            toValue: 1,
            duration: 800,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: false, // SVG height/y must not use native driver
        }).start();
    }, []);

    // Group width calculations
    const numGroups = data.length;
    const groupPadding = 20; // Space between groups
    const availableWidthForBars = CHART_WIDTH - (groupPadding * (numGroups - 1));
    const groupWidth = availableWidthForBars / numGroups;

    // Bar width inside groups
    const barPadding = 4; // Space between gen and con bar
    const barWidth = (groupWidth - barPadding) / 2;

    return (
        <View style={styles.card}>
            <Text style={styles.chartTitle}>Energy Generated vs Consumed</Text>

            <View style={styles.chartContainer}>
                {/* Y-Axis Labels */}
                <View style={styles.yAxis}>
                    <Text style={styles.yAxisLabel}>600</Text>
                    <Text style={styles.yAxisLabel}>400</Text>
                    <Text style={styles.yAxisLabel}>300</Text>
                    <Text style={styles.yAxisLabel}>100</Text>
                    <Text style={styles.yAxisLabel}>0</Text>
                </View>

                {/* SVG Chart Area */}
                <View style={styles.svgWrapper}>
                    <Svg width={CHART_WIDTH} height={CHART_HEIGHT + 24}>
                        {/* Grid Lines */}
                        <Line x1="0" y1="0" x2={CHART_WIDTH} y2="0" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4 4" />
                        <Line x1="0" y1={CHART_HEIGHT * 0.33} x2={CHART_WIDTH} y2={CHART_HEIGHT * 0.33} stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4 4" />
                        <Line x1="0" y1={CHART_HEIGHT * 0.5} x2={CHART_WIDTH} y2={CHART_HEIGHT * 0.5} stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4 4" />
                        <Line x1="0" y1={CHART_HEIGHT * 0.83} x2={CHART_WIDTH} y2={CHART_HEIGHT * 0.83} stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4 4" />

                        {/* Solid Base Line */}
                        <Line x1="0" y1={CHART_HEIGHT} x2={CHART_WIDTH} y2={CHART_HEIGHT} stroke="#CBD5E1" strokeWidth="1.5" />

                        {/* Bars and Labels */}
                        {data.map((item, index) => {
                            const groupX = index * (groupWidth + groupPadding);
                            const genHeight = (item.gen / MAX_VALUE) * CHART_HEIGHT;
                            const conHeight = (item.con / MAX_VALUE) * CHART_HEIGHT;

                            const animatedGenHeight = chartProgress.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, genHeight]
                            });
                            const animatedGenY = chartProgress.interpolate({
                                inputRange: [0, 1],
                                outputRange: [CHART_HEIGHT, CHART_HEIGHT - genHeight]
                            });

                            const animatedConHeight = chartProgress.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, conHeight]
                            });
                            const animatedConY = chartProgress.interpolate({
                                inputRange: [0, 1],
                                outputRange: [CHART_HEIGHT, CHART_HEIGHT - conHeight]
                            });

                            return (
                                <React.Fragment key={index}>
                                    {/* Generated Bar (Orange) */}
                                    <AnimatedRect
                                        x={groupX}
                                        y={animatedGenY}
                                        width={barWidth}
                                        height={animatedGenHeight}
                                        fill="#F59E0B"
                                        rx={2}
                                    />

                                    {/* Consumed Bar (Blue) */}
                                    <AnimatedRect
                                        x={groupX + barWidth + barPadding}
                                        y={animatedConY}
                                        width={barWidth}
                                        height={animatedConHeight}
                                        fill="#3B82F6"
                                        rx={2}
                                    />

                                    {/* X-Axis Label */}
                                    {(index < numGroups - 1) && (
                                        <SvgText
                                            x={groupX + (groupWidth / 2)}
                                            y={CHART_HEIGHT + 16}
                                            fontSize="10"
                                            fill="#94A3B8"
                                            textAnchor="middle"
                                        >
                                            {item.label}
                                        </SvgText>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </Svg>
                </View>
            </View>

            {/* Legend */}
            <View style={styles.legendContainer}>
                <View style={styles.legendItem}>
                    <View style={[styles.legendColor, { backgroundColor: '#F59E0B' }]} />
                    <Text style={[styles.legendText, { color: '#F59E0B' }]}>Generated (kWh)</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendColor, { backgroundColor: '#3B82F6' }]} />
                    <Text style={[styles.legendText, { color: '#3B82F6' }]}>Consumed (kWh)</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginHorizontal: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
        elevation: 4,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    chartTitle: {
        fontSize: 12,
        fontWeight: '600',
        color: '#64748B',
        marginBottom: 16,
    },
    chartContainer: {
        flexDirection: 'row',
        alignItems: 'stretch',
    },
    yAxis: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingRight: 8,
        height: CHART_HEIGHT,
        width: 30,
    },
    yAxisLabel: {
        fontSize: 10,
        color: '#94A3B8',
        lineHeight: 12,
    },
    svgWrapper: {
        flex: 1,
    },
    legendContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 16,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 12,
    },
    legendColor: {
        width: 10,
        height: 10,
        marginRight: 6,
    },
    legendText: {
        fontSize: 11,
        fontWeight: '500',
    },
});

export default KhataEnergyChart;
