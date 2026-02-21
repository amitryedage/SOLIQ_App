import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, PanResponder, Animated } from 'react-native';
import Svg, { Path, Line, Circle, Defs, LinearGradient, Stop, G } from 'react-native-svg';

const { width } = Dimensions.get('window');
const CHART_WIDTH = width - 70;
const CHART_HEIGHT = 140;

const CarbonOffsetChart = () => {
    const [activePoint, setActivePoint] = useState(null);
    const tooltipOpacity = useRef(new Animated.Value(0)).current;
    const tooltipX = useRef(new Animated.Value(0)).current;
    const entryAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Entry animation for the chart
        Animated.timing(entryAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();
    }, []);

    // Sample data points for the line chart (normalized for height)
    const data = [
        { label: 'Jan', value: 300, x: 0, y: 40 },
        { label: 'Mar', value: 470, x: (CHART_WIDTH / 5) * 1, y: 80 },
        { label: 'May', value: 410, x: (CHART_WIDTH / 5) * 2, y: 70 },
        { label: 'Jul', value: 350, x: (CHART_WIDTH / 5) * 3, y: 50 },
        { label: 'Sep', value: 280, x: (CHART_WIDTH / 5) * 4, y: 30 },
        { label: 'Dec', value: 500, x: CHART_WIDTH, y: 90 },
    ];

    const findClosestPoint = (touchX) => {
        const xStep = CHART_WIDTH / (data.length - 1);
        const index = Math.round(touchX / xStep);
        if (index >= 0 && index < data.length) {
            return { ...data[index], index };
        }
        return null;
    };

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: (evt) => {
                const { locationX } = evt.nativeEvent;
                const point = findClosestPoint(locationX);
                if (point) {
                    setActivePoint(point);
                    Animated.parallel([
                        Animated.timing(tooltipOpacity, { toValue: 1, duration: 150, useNativeDriver: true }),
                        Animated.spring(tooltipX, { toValue: point.x, friction: 6, tension: 50, useNativeDriver: true }),
                    ]).start();
                }
            },
            onPanResponderMove: (evt) => {
                const { locationX } = evt.nativeEvent;
                const point = findClosestPoint(locationX);
                if (point) {
                    if (activePoint && point.index !== activePoint.index) {
                        // Add a tiny bit of haptic feel here on a real device if expo-haptics were installed
                    }
                    setActivePoint(point);
                    Animated.spring(tooltipX, { toValue: point.x, friction: 6, tension: 50, useNativeDriver: true }).start();
                }
            },
            onPanResponderRelease: () => {
                Animated.timing(tooltipOpacity, { toValue: 0, duration: 250, useNativeDriver: true }).start(() => {
                    setActivePoint(null);
                });
            },
            onPanResponderTerminate: () => {
                Animated.timing(tooltipOpacity, { toValue: 0, duration: 250, useNativeDriver: true }).start(() => {
                    setActivePoint(null);
                });
            },
        })
    ).current;

    // Scale data to fit chart area. Create a smooth bezier curve instead of straight lines.
    // For simplicity without a complex math library, we'll keep lines but style them beautifully.
    const pathData = data.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${CHART_HEIGHT - p.y}`).join(' ');

    return (
        <Animated.View style={[styles.container, { opacity: entryAnim, transform: [{ translateY: entryAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }] }]}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>Monthly Carbon Offset</Text>
                    <Text style={styles.subtitle}>Tracking your total CO₂ prevented</Text>
                </View>
                <View style={styles.legend}>
                    <View style={[styles.dot, { backgroundColor: '#10B981' }]} />
                    <Text style={styles.legendText}>Offset (kg)</Text>
                </View>
            </View>

            <View style={styles.chartArea}>
                {/* Y-Axis Labels */}
                <View style={styles.yAxis}>
                    <Text style={styles.axisLabel}>600</Text>
                    <Text style={styles.axisLabel}>300</Text>
                    <Text style={styles.axisLabel}>0</Text>
                </View>

                <View style={styles.svgContainer} {...panResponder.panHandlers}>
                    <Svg height={CHART_HEIGHT} width={CHART_WIDTH}>
                        <Defs>
                            <LinearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                                <Stop offset="0" stopColor="#10B981" stopOpacity="0.35" />
                                <Stop offset="1" stopColor="#10B981" stopOpacity="0" />
                            </LinearGradient>
                            <LinearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                                <Stop offset="0" stopColor="#34D399" />
                                <Stop offset="0.5" stopColor="#10B981" />
                                <Stop offset="1" stopColor="#059669" />
                            </LinearGradient>
                        </Defs>

                        {/* Grid Lines */}
                        <Line x1="0" y1="0" x2={CHART_WIDTH} y2="0" stroke="rgba(0,0,0,0.04)" strokeWidth="1" strokeDasharray="3 3" />
                        <Line x1="0" y1={CHART_HEIGHT / 2} x2={CHART_WIDTH} y2={CHART_HEIGHT / 2} stroke="rgba(0,0,0,0.04)" strokeWidth="1" strokeDasharray="3 3" />
                        <Line x1="0" y1={CHART_HEIGHT} x2={CHART_WIDTH} y2={CHART_HEIGHT} stroke="rgba(0,0,0,0.04)" strokeWidth="1" />

                        {/* Area Fill */}
                        <Path
                            d={`${pathData} L ${CHART_WIDTH} ${CHART_HEIGHT} L 0 ${CHART_HEIGHT} Z`}
                            fill="url(#gradient)"
                        />

                        {/* Line Plot */}
                        <Path
                            d={pathData}
                            fill="none"
                            stroke="url(#lineGrad)"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />

                        {activePoint && (
                            <G>
                                {/* Vertical Tracking Line */}
                                <Line
                                    x1={activePoint.x}
                                    y1="0"
                                    x2={activePoint.x}
                                    y2={CHART_HEIGHT}
                                    stroke="rgba(16, 185, 129, 0.4)"
                                    strokeWidth="1.5"
                                    strokeDasharray="4 4"
                                />
                                {/* Glow Ring */}
                                <Circle
                                    cx={activePoint.x}
                                    cy={CHART_HEIGHT - activePoint.y}
                                    r="10"
                                    fill="rgba(16, 185, 129, 0.2)"
                                />
                                {/* Main Point */}
                                <Circle
                                    cx={activePoint.x}
                                    cy={CHART_HEIGHT - activePoint.y}
                                    r="5"
                                    fill="#fff"
                                    stroke="#10B981"
                                    strokeWidth="3"
                                />
                            </G>
                        )}
                    </Svg>

                    {/* Fancy Glossy Tooltip */}
                    <Animated.View style={[styles.tooltipContainer, {
                        opacity: tooltipOpacity,
                        transform: [{ translateX: tooltipX }],
                        left: -40, // Offset to center 80px width
                        top: activePoint ? Math.max(-20, CHART_HEIGHT - activePoint.y - 45) : -20
                    }]}>
                        <View style={styles.tooltip}>
                            <Text style={styles.tooltipValue}>{activePoint?.value} <Text style={{ fontSize: 9, fontWeight: 'normal' }}>kg</Text></Text>
                        </View>
                    </Animated.View>
                </View>
            </View>

            {/* X-Axis Labels */}
            <View style={styles.xAxis}>
                {data.filter((_, i) => i % 2 === 0).map((d, i) => (
                    <Text key={i} style={styles.axisLabel}>{d.label}</Text>
                ))}
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginHorizontal: 15,
        marginVertical: 10,
        borderRadius: 24,
        padding: 20,
        elevation: 6,
        shadowColor: '#94A3B8',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.8)',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: '800',
        color: '#0F172A',
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 11,
        color: '#64748B',
        marginTop: 2,
    },
    legend: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 6,
    },
    legendText: {
        fontSize: 10,
        fontWeight: '600',
        color: '#475569',
    },
    chartArea: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    yAxis: {
        justifyContent: 'space-between',
        height: CHART_HEIGHT,
        marginRight: 12,
    },
    svgContainer: {
        flex: 1,
        position: 'relative',
    },
    xAxis: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 35,
        marginTop: 15,
    },
    axisLabel: {
        fontSize: 10,
        fontWeight: '600',
        color: '#94A3B8',
    },
    tooltipContainer: {
        position: 'absolute',
        width: 80,
        alignItems: 'center',
        zIndex: 100,
    },
    tooltip: {
        backgroundColor: '#0F172A', // Dark premium tooltip
        borderRadius: 12,
        paddingVertical: 6,
        paddingHorizontal: 10,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    tooltipValue: {
        color: '#F8FAFC',
        fontSize: 13,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    }
});

export default CarbonOffsetChart;
