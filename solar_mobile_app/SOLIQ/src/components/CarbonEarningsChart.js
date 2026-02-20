import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Rect, Line } from 'react-native-svg';

const { width } = Dimensions.get('window');
const CHART_WIDTH = width - 70;
const CHART_HEIGHT = 120;

const CarbonEarningsChart = () => {
    const data = [60, 40, 45, 80, 55]; // Heights for bars
    const barWidth = 35;
    const spacing = (CHART_WIDTH - (data.length * barWidth)) / (data.length - 1);

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

                <View style={styles.svgContainer}>
                    <Svg height={CHART_HEIGHT} width={CHART_WIDTH}>
                        {/* Grid Lines */}
                        <Line x1="0" y1="0" x2={CHART_WIDTH} y2="0" stroke="#eee" strokeWidth="1" />
                        <Line x1="0" y1={CHART_HEIGHT / 2} x2={CHART_WIDTH} y2={CHART_HEIGHT / 2} stroke="#eee" strokeWidth="1" />
                        <Line x1="0" y1={CHART_HEIGHT} x2={CHART_WIDTH} y2={CHART_HEIGHT} stroke="#eee" strokeWidth="1" />

                        {data.map((h, i) => (
                            <Rect
                                key={i}
                                x={i * (barWidth + spacing)}
                                y={CHART_HEIGHT - h}
                                width={barWidth}
                                height={h}
                                fill="#FFA000"
                                rx="5"
                            />
                        ))}
                    </Svg>
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

export default CarbonEarningsChart;
