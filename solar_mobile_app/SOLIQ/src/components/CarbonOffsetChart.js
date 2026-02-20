import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Polyline, Line, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

const { width } = Dimensions.get('window');
const CHART_WIDTH = width - 70;
const CHART_HEIGHT = 120;

const CarbonOffsetChart = () => {
    // Sample data points for the line chart (normalized for height)
    const data = [
        { x: 0, y: 30 },
        { x: 50, y: 70 },
        { x: 100, y: 60 },
        { x: 150, y: 40 },
        { x: 200, y: 20 },
        { x: 250, y: 30 },
    ];

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

                <View style={styles.svgContainer}>
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
                    </Svg>
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
});

export default CarbonOffsetChart;
