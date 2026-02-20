import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, PanResponder, Animated } from 'react-native';
import Svg, { Path, Line, Circle, Defs, LinearGradient, Stop, G } from 'react-native-svg';

const { width } = Dimensions.get('window');
const CHART_WIDTH = width - 70;
const CHART_HEIGHT = 120;

const CarbonOffsetChart = () => {
    const [activePoint, setActivePoint] = useState(null);
    const tooltipOpacity = useRef(new Animated.Value(0)).current;
    const tooltipX = useRef(new Animated.Value(0)).current;

    // Sample data points for the line chart (normalized for height)
    const data = [
        { label: 'Jan', value: 300, x: 0, y: 30 },
        { label: 'Mar', value: 470, x: (CHART_WIDTH / 5) * 1, y: 70 },
        { label: 'May', value: 410, x: (CHART_WIDTH / 5) * 2, y: 60 },
        { label: 'Jul', value: 350, x: (CHART_WIDTH / 5) * 3, y: 40 },
        { label: 'Sep', value: 280, x: (CHART_WIDTH / 5) * 4, y: 20 },
        { label: 'Dec', value: 320, x: CHART_WIDTH, y: 30 },
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
                        Animated.timing(tooltipOpacity, { toValue: 1, duration: 200, useNativeDriver: true }),
                        Animated.spring(tooltipX, { toValue: point.x, friction: 8, tension: 40, useNativeDriver: true }),
                    ]).start();
                }
            },
            onPanResponderMove: (evt) => {
                const { locationX } = evt.nativeEvent;
                const point = findClosestPoint(locationX);
                if (point) {
                    setActivePoint(point);
                    Animated.spring(tooltipX, { toValue: point.x, friction: 8, tension: 40, useNativeDriver: true }).start();
                }
            },
            onPanResponderRelease: () => {
                Animated.timing(tooltipOpacity, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => {
                    setActivePoint(null);
                });
            },
            onPanResponderTerminate: () => {
                Animated.timing(tooltipOpacity, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => {
                    setActivePoint(null);
                });
            },
        })
    ).current;

    // Scale data to fit chart area
    const pathData = data.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${CHART_HEIGHT - p.y}`).join(' ');

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Monthly Carbon Offset</Text>
                <View style={styles.legend}>
                    <View style={[styles.dot, { backgroundColor: '#4CAF50' }]} />
                    <Text style={styles.legendText}>Offset (kg)</Text>
                </View>
            </View>

            <View style={styles.chartArea}>
                {/* Y-Axis Labels */}
                <View style={styles.yAxis}>
                    <Text style={styles.axisLabel}>500</Text>
                    <Text style={styles.axisLabel}>300</Text>
                    <Text style={styles.axisLabel}>0</Text>
                </View>

                <View style={styles.svgContainer} {...panResponder.panHandlers}>
                    <Svg height={CHART_HEIGHT} width={CHART_WIDTH}>
                        <Defs>
                            <LinearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                                <Stop offset="0" stopColor="#4CAF50" stopOpacity="0.2" />
                                <Stop offset="1" stopColor="#4CAF50" stopOpacity="0" />
                            </LinearGradient>
                        </Defs>

                        {/* Grid Lines */}
                        <Line x1="0" y1="0" x2={CHART_WIDTH} y2="0" stroke="#eee" strokeWidth="1" />
                        <Line x1="0" y1={CHART_HEIGHT / 2} x2={CHART_WIDTH} y2={CHART_HEIGHT / 2} stroke="#eee" strokeWidth="1" />
                        <Line x1="0" y1={CHART_HEIGHT} x2={CHART_WIDTH} y2={CHART_HEIGHT} stroke="#eee" strokeWidth="1" />

                        {/* Area Fill */}
                        <Path
                            d={`${pathData} L ${CHART_WIDTH} ${CHART_HEIGHT} L 0 ${CHART_HEIGHT} Z`}
                            fill="url(#gradient)"
                        />

                        {/* Line Plot */}
                        <Path
                            d={pathData}
                            fill="none"
                            stroke="#4CAF50"
                            strokeWidth="2"
                        />

                        {activePoint && (
                            <G>
                                <Line
                                    x1={activePoint.x}
                                    y1="0"
                                    x2={activePoint.x}
                                    y2={CHART_HEIGHT}
                                    stroke="#4CAF50"
                                    strokeWidth="1"
                                    strokeDasharray="4 2"
                                />
                                <Circle
                                    cx={activePoint.x}
                                    cy={CHART_HEIGHT - activePoint.y}
                                    r="6"
                                    fill="#4CAF50"
                                    stroke="#fff"
                                    strokeWidth="2"
                                />
                            </G>
                        )}
                    </Svg>

                    {activePoint && (
                        <Animated.View style={[styles.tooltip, {
                            opacity: tooltipOpacity,
                            transform: [
                                { translateX: Animated.subtract(tooltipX, 35) }
                            ],
                            left: 0, // We use translateX to move it
                            top: Math.max(0, CHART_HEIGHT - activePoint.y - 50)
                        }]}>
                            <Text style={styles.tooltipValue}>{activePoint.value} kg</Text>
                            <Text style={styles.tooltipLabel}>{activePoint.label}</Text>
                        </Animated.View>
                    )}
                </View>
            </View>

            {/* X-Axis Labels */}
            <View style={styles.xAxis}>
                <Text style={styles.axisLabel}>2025-01</Text>
                <Text style={styles.axisLabel}>2025-06</Text>
                <Text style={styles.axisLabel}>2025-12</Text>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    legend: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 4,
    },
    legendText: {
        fontSize: 10,
        color: '#999',
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
        padding: 8,
        alignItems: 'center',
        width: 70,
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
    tooltipLabel: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 8,
    }
});

export default CarbonOffsetChart;
