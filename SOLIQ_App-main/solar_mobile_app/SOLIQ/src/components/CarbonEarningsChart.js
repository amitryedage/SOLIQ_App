import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, PanResponder, Animated, Easing } from 'react-native';
import Svg, { Rect, Line, Defs, LinearGradient, Stop, Text as SvgText } from 'react-native-svg';

const AnimatedRect = Animated.createAnimatedComponent(Rect);
const { width } = Dimensions.get('window');

const CHART_WIDTH = width - 70;
const CHART_HEIGHT = 140;

const CarbonEarningsChart = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const tooltipOpacity = useRef(new Animated.Value(0)).current;
    const entryAnim = useRef(new Animated.Value(0)).current;

    // Staggered Growth Anims for 5 bars
    const barGrowthAnims = useRef([
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
    ]).current;

    useEffect(() => {
        Animated.timing(entryAnim, {
            toValue: 1,
            duration: 800,
            delay: 150, // Slight stagger after the line chart
            useNativeDriver: true,
        }).start(() => {
            // After entrance, trigger domino bar growth
            const barAnimations = barGrowthAnims.map((anim) => {
                return Animated.timing(anim, {
                    toValue: 1,
                    duration: 800,
                    easing: Easing.out(Easing.cubic),
                    useNativeDriver: false,
                });
            });
            Animated.stagger(120, barAnimations).start();
        });
    }, []);

    const MAX_EARNINGS = 400;
    const data = [
        { label: 'Jan', value: 245 },
        { label: 'Mar', value: 180 },
        { label: 'May', value: 310 },
        { label: 'Jul', value: 375 },
        { label: 'Sep', value: 225 },
    ].map(d => ({ ...d, h: (d.value / MAX_EARNINGS) * CHART_HEIGHT }));

    const barWidth = 32;
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
                    Animated.timing(tooltipOpacity, { toValue: 1, duration: 150, useNativeDriver: true }).start();
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
                // Do not hide the tooltip. Leave it visible!
            },
            onPanResponderTerminate: () => {
                // Do not hide the tooltip. Leave it visible!
            },
        })
    ).current;

    return (
        <Animated.View style={[styles.container, { opacity: entryAnim, transform: [{ translateY: entryAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }] }]}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>Carbon Credit Earnings</Text>
                    <Text style={styles.subtitle}>Revenue generated (₹)</Text>
                </View>
                <View style={[styles.legend, { backgroundColor: '#FFFBEB' }]}>
                    <View style={[styles.dot, { backgroundColor: '#F59E0B' }]} />
                    <Text style={[styles.legendText, { color: '#B45309' }]}>Earnings (₹)</Text>
                </View>
            </View>

            <View style={styles.chartArea}>
                <View style={styles.yAxis}>
                    <Text style={styles.axisLabel}>400</Text>
                    <Text style={styles.axisLabel}>200</Text>
                    <Text style={styles.axisLabel}>0</Text>
                </View>

                <View style={styles.svgContainer} {...panResponder.panHandlers}>
                    <Svg height={CHART_HEIGHT + 30} width={CHART_WIDTH}>
                        <Defs>
                            <LinearGradient id="barGradNormal" x1="0" y1="0" x2="0" y2="1">
                                <Stop offset="0" stopColor="#FBBF24" />
                                <Stop offset="1" stopColor="#F59E0B" />
                            </LinearGradient>
                            <LinearGradient id="barGradActive" x1="0" y1="0" x2="0" y2="1">
                                <Stop offset="0" stopColor="#FDE68A" />
                                <Stop offset="1" stopColor="#F59E0B" />
                            </LinearGradient>
                        </Defs>

                        <Line x1="0" y1="0" x2={CHART_WIDTH} y2="0" stroke="rgba(0,0,0,0.04)" strokeWidth="1" strokeDasharray="3 3" />
                        <Line x1="0" y1={CHART_HEIGHT / 2} x2={CHART_WIDTH} y2={CHART_HEIGHT / 2} stroke="rgba(0,0,0,0.04)" strokeWidth="1" strokeDasharray="3 3" />
                        <Line x1="0" y1={CHART_HEIGHT} x2={CHART_WIDTH} y2={CHART_HEIGHT} stroke="rgba(0,0,0,0.04)" strokeWidth="1" />

                        {data.map((item, i) => {
                            const isActive = activeIndex === i;
                            const isDimmed = activeIndex !== null && activeIndex !== i;
                            const growth = barGrowthAnims[i];

                            const animatedHeight = growth.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, item.h]
                            });
                            const animatedY = growth.interpolate({
                                inputRange: [0, 1],
                                outputRange: [CHART_HEIGHT, CHART_HEIGHT - item.h]
                            });

                            return (
                                <AnimatedRect
                                    key={`bar-${i}`}
                                    x={i * (barWidth + spacing)}
                                    y={animatedY}
                                    width={barWidth}
                                    height={animatedHeight}
                                    fill={isActive ? "url(#barGradActive)" : "url(#barGradNormal)"}
                                    opacity={isDimmed ? 0.4 : 1}
                                    rx="6" // Rounded caps
                                />
                            );
                        })}

                        {/* Perfectly Aligned X-Axis Labels */}
                        {data.map((item, i) => (
                            <SvgText
                                key={`label-${i}`}
                                x={i * (barWidth + spacing) + (barWidth / 2)} // Centered exactly under the bar
                                y={CHART_HEIGHT + 18}
                                fontSize="10"
                                fill="#94A3B8"
                                fontWeight="600"
                                textAnchor="middle"
                            >
                                {item.label}
                            </SvgText>
                        ))}
                    </Svg>

                    {activeIndex !== null && (
                        <Animated.View style={[styles.tooltipContainer, {
                            opacity: tooltipOpacity,
                            left: Math.max(0, Math.min(CHART_WIDTH - 60, (activeIndex * (barWidth + spacing)) - 14)),
                            top: Math.max(-10, CHART_HEIGHT - data[activeIndex].h - 35),
                            transform: [{ scale: tooltipOpacity.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] }) }]
                        }]}>
                            <View style={[styles.tooltip, { backgroundColor: '#78350F' }]}>
                                <Text style={styles.tooltipValue}>₹{data[activeIndex].value}</Text>
                            </View>
                        </Animated.View>
                    )}
                </View>
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
        paddingBottom: 20, // Make room for the SVG text labels
    },
    tooltipContainer: {
        position: 'absolute',
        alignItems: 'center',
        zIndex: 100,
        width: 60,
    },
    tooltip: {
        borderRadius: 12,
        paddingVertical: 5,
        paddingHorizontal: 8,
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
    },
    tooltipValue: {
        color: '#FFFBEB',
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
});

export default CarbonEarningsChart;
