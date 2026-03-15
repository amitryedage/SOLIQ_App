import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const categories = ['All', 'Smart Switches', 'Inverters', 'Solar Meters', 'EV Chargers'];

const productsData = [
    {
        id: '1',
        name: 'WiFi Smart Plug',
        desc: 'Compatible: 16A',
        price: '1,299',
        oldPrice: '1,699',
        rating: '4.7',
        reviews: '150',
        iconType: 'MCI',
        iconName: 'power-socket-eu',
        category: 'Smart Switches',
    },
    {
        id: '2',
        name: 'Hybrid Solar Inverter',
        desc: 'Compatible: 3 - 10 KW',
        price: '19,999',
        oldPrice: '24,999',
        rating: '4.8',
        reviews: '210',
        verified: true,
        iconType: 'MCI',
        iconName: 'car-battery',
        category: 'Inverters',
    },
    {
        id: '3',
        name: 'Smart Door Lock',
        desc: 'Fingerprint & Keypad',
        price: '7,499',
        oldPrice: '9,999',
        rating: '4.6',
        reviews: '85',
        iconType: 'MCI',
        iconName: 'door-closed-lock',
        category: 'Smart Switches',
    },
    {
        id: '4',
        name: 'Solar Energy Meter',
        desc: 'Real-Time Monitoring',
        price: '4,200',
        oldPrice: '5,500',
        rating: '4.5',
        reviews: '95',
        iconType: 'MCI',
        iconName: 'counter',
        category: 'Solar Meters',
    },
    {
        id: '5',
        name: 'EV Fast Charger',
        desc: 'Level 2 Charging',
        price: '24,999',
        oldPrice: '29,999',
        rating: '4.9',
        reviews: '45',
        iconType: 'MCI',
        iconName: 'ev-station',
        category: 'EV Chargers',
    },
];

const trendingProducts = [
    { id: 't1', name: 'Smart Switch', price: '1,499', iconName: 'toggle-switch', iconType: 'MCI' },
    { id: 't2', name: 'Video Doorbell', price: '3,299', iconName: 'bell-ring', iconType: 'MCI' },
    { id: 't3', name: 'EV Charger', price: '14,999', iconName: 'ev-station', iconType: 'MCI' },
];

const ProductIcon = ({ type, name, size = 60 }) => {
    return (
        <View style={styles.productIconContainer}>
            {type === 'MCI' ? (
                <MaterialCommunityIcons name={name} size={size} color="#333" />
            ) : (
                <Ionicons name={name} size={size} color="#333" />
            )}
        </View>
    );
};

const MarketScreen = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredProducts = activeCategory === 'All' 
        ? productsData 
        : productsData.filter(product => product.category === activeCategory);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={{ flex: 1 }} />
                <Text style={styles.headerTitle}>Marketplace</Text>
                <View style={styles.headerIcons}>
                    <TouchableOpacity style={styles.iconBtn}>
                        <Ionicons name="search-outline" size={24} color="#333" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconBtn}>
                        <Ionicons name="cart-outline" size={26} color="#333" />
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>2</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Categories */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
                    {categories.map((cat, index) => (
                        <TouchableOpacity 
                            key={index} 
                            style={[styles.categoryPill, activeCategory === cat && styles.categoryPillActive]}
                            onPress={() => setActiveCategory(cat)}
                        >
                            <Text style={[styles.categoryText, activeCategory === cat && styles.categoryTextActive]}>{cat}</Text>
                        </TouchableOpacity>
                    ))}
                    <View style={{ width: 20 }} />
                </ScrollView>

                {/* Promo Banner */}
                <LinearGradient
                    colors={['#FF6A00', '#EE0979']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.promoBanner}
                >
                    <View style={styles.promoContent}>
                        <Text style={styles.promoTitle}>Power Your Home Efficiently!</Text>
                        <TouchableOpacity style={styles.promoBtn}>
                            <Text style={styles.promoBtnText}>Shop Now</Text>
                            <Ionicons name="arrow-forward" size={16} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.promoRight}>
                        <View style={styles.discountBadge}>
                            <Text style={styles.discountText}>20%</Text>
                            <Text style={styles.discountSubtext}>OFF</Text>
                        </View>
                        <MaterialCommunityIcons name="inverter-grid" size={70} color="#fff" style={styles.promoIcon} />
                    </View>
                </LinearGradient>

                {/* Product Grid */}
                <View style={styles.productGrid}>
                    {filteredProducts.map(product => (
                        <View key={product.id} style={styles.productCard}>
                            <ProductIcon type={product.iconType} name={product.iconName} />
                            <View style={styles.productInfo}>
                                <Text style={styles.productName} numberOfLines={1}>{product.name}</Text>
                                <Text style={styles.productDesc}>{product.desc}</Text>
                                <View style={styles.priceRow}>
                                    <Text style={styles.price}>₹ {product.price}</Text>
                                    <Text style={styles.oldPrice}>₹ {product.oldPrice}</Text>
                                </View>
                                {product.verified && (
                                    <View style={styles.verifiedRow}>
                                        <Ionicons name="checkmark-circle" size={12} color="#4CAF50" />
                                        <Text style={styles.verifiedText}>SolariQ Verified</Text>
                                    </View>
                                )}
                            </View>
                            <View style={styles.cardFooter}>
                                <View style={styles.ratingRow}>
                                    <Ionicons name="star" size={12} color="#FFC107" />
                                    <Text style={styles.ratingText}>{product.rating}</Text>
                                    <Text style={styles.reviewsText}>({product.reviews})</Text>
                                </View>
                                <TouchableOpacity style={styles.addToCartBtn}>
                                    <Text style={styles.addToCartText}>Add to Cart</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                    {filteredProducts.length === 0 && (
                        <View style={{ width: '100%', alignItems: 'center', marginVertical: 20 }}>
                            <Text style={{ color: '#888' }}>No products found in this category.</Text>
                        </View>
                    )}
                </View>

                {/* Trending Section */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Trending in Home Automation</Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.trendingContainer} contentContainerStyle={{ paddingHorizontal: 15 }}>
                    {trendingProducts.map((product) => (
                        <View key={product.id} style={styles.trendingCard}>
                            <ProductIcon type={product.iconType} name={product.iconName} size={40} />
                            <View style={styles.trendingInfo}>
                                <Text style={styles.trendingName}>{product.name}</Text>
                                <Text style={styles.trendingPrice}>₹ {product.price}</Text>
                            </View>
                            <TouchableOpacity style={styles.addToCartBtnFull}>
                                <Text style={styles.addToCartText}>Add to Cart</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>

                {/* Bundle Deals */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Bundle Deals</Text>
                </View>
                <View style={styles.bundleCard}>
                    <View style={styles.saveBadge}>
                        <Text style={styles.saveBadgeText}>Save ₹2,500!</Text>
                        <View style={styles.triangleCorner} />
                    </View>
                    
                    <View style={styles.bundleContent}>
                        <View style={styles.bundleImages}>
                            <MaterialCommunityIcons name="toggle-switch" size={40} color="#666" />
                            <Ionicons name="add" size={24} color="#999" />
                            <MaterialCommunityIcons name="counter" size={40} color="#666" />
                        </View>
                        <View style={styles.bundleDetails}>
                            <Text style={styles.bundleTitle}>Smart Switch + Energy Meter Combo</Text>
                            <Text style={styles.bundleSpecialOffer}>Special Offer: ₹ 5,499</Text>
                            <Text style={styles.bundleMRP}>MRP: ₹7,999</Text>
                        </View>
                    </View>
                    <View style={styles.bundleFooter}>
                        <View style={{flex: 1}} />
                        <TouchableOpacity style={styles.shopBundleBtn}>
                            <Text style={styles.shopBundleText}>Shop Bundle</Text>
                            <Ionicons name="chevron-forward" size={16} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>
                
                <View style={styles.bottomPadding} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA', // Light grey background like mockup
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2A3B5C', // Dark blueish tint
        flex: 2,
        textAlign: 'center',
    },
    headerIcons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    iconBtn: {
        marginLeft: 15,
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        top: -4,
        right: -6,
        backgroundColor: '#FF4C4C',
        borderRadius: 10,
        width: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#fff',
    },
    badgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    scrollContent: {
        paddingBottom: 100,
    },
    categoriesContainer: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
    },
    categoryPill: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        marginRight: 10,
        height: 36,
        justifyContent: 'center',
    },
    categoryPillActive: {
        backgroundColor: '#F26C22',
        borderColor: '#F26C22',
    },
    categoryText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#555',
    },
    categoryTextActive: {
        color: '#fff',
    },
    promoBanner: {
        margin: 15,
        borderRadius: 16,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden',
    },
    promoContent: {
        flex: 1.5,
    },
    promoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 15,
        lineHeight: 24,
    },
    promoBtn: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        width: 120,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.4)',
    },
    promoBtnText: {
        color: '#fff',
        fontWeight: '600',
        marginRight: 5,
        fontSize: 13,
    },
    promoRight: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    discountBadge: {
        position: 'absolute',
        top: -10,
        right: -10,
        backgroundColor: '#FF8A65', // Lighter orange
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        borderWidth: 2,
        borderColor: '#fff',
    },
    discountText: {
        color: '#fff',
        fontWeight: '800',
        fontSize: 16,
    },
    discountSubtext: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 10,
    },
    promoIcon: {
        opacity: 0.9,
    },
    productGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
    },
    productCard: {
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 12,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    productIconContainer: {
        height: 90,
        backgroundColor: '#F5F7FA',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    productInfo: {
        marginBottom: 8,
    },
    productName: {
        fontSize: 14,
        fontWeight: '700',
        color: '#2A3B5C',
        marginBottom: 4,
    },
    productDesc: {
        fontSize: 11,
        color: '#888',
        marginBottom: 6,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 4,
    },
    price: {
        fontSize: 15,
        fontWeight: '800',
        color: '#F26C22', // Theme orange
        marginRight: 6,
    },
    oldPrice: {
        fontSize: 11,
        color: '#999',
        textDecorationLine: 'line-through',
    },
    verifiedRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    verifiedText: {
        fontSize: 10,
        color: '#4CAF50',
        marginLeft: 4,
        fontWeight: '600',
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 'auto', // Push to bottom
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#555',
        marginLeft: 3,
    },
    reviewsText: {
        fontSize: 10,
        color: '#999',
        marginLeft: 2,
    },
    addToCartBtn: {
        backgroundColor: '#F26C22',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
    },
    addToCartText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: '600',
    },
    sectionHeader: {
        paddingHorizontal: 15,
        marginTop: 10,
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#2A3B5C',
    },
    trendingContainer: {
        marginBottom: 20,
    },
    trendingCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 12,
        marginRight: 15,
        width: 140,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    trendingInfo: {
        marginTop: 10,
        marginBottom: 12,
    },
    trendingName: {
        fontSize: 13,
        fontWeight: '600',
        color: '#2A3B5C',
        marginBottom: 4,
    },
    trendingPrice: {
        fontSize: 14,
        fontWeight: '800',
        color: '#F26C22',
    },
    addToCartBtnFull: {
        backgroundColor: '#F26C22',
        paddingVertical: 8,
        borderRadius: 12,
        alignItems: 'center',
    },
    bundleCard: {
        marginHorizontal: 15,
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#f0f0f0',
        position: 'relative',
        marginBottom: 20,
    },
    saveBadge: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#F26C22',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderTopLeftRadius: 16,
        borderBottomRightRadius: 16,
        zIndex: 2,
    },
    saveBadgeText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: '700',
    },
    triangleCorner: {
        position: 'absolute',
        bottom: -6,
        left: 0,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderRightWidth: 6,
        borderTopWidth: 6,
        borderRightColor: 'transparent',
        borderTopColor: '#C0561B', // Darker shade for folded effect
    },
    bundleContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15, // Space for badge
    },
    bundleImages: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F7FA',
        padding: 10,
        borderRadius: 12,
        marginRight: 15,
    },
    bundleDetails: {
        flex: 1,
    },
    bundleTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#2A3B5C',
        marginBottom: 6,
    },
    bundleSpecialOffer: {
        fontSize: 13,
        fontWeight: '700',
        color: '#333',
        marginBottom: 2,
    },
    bundleMRP: {
        fontSize: 12,
        color: '#888',
        textDecorationLine: 'line-through',
    },
    bundleFooter: {
        flexDirection: 'row',
        marginTop: 15,
        alignItems: 'center',
    },
    shopBundleBtn: {
        backgroundColor: '#F26C22',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    shopBundleText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
        marginRight: 4,
    },
    bottomPadding: {
        height: 20,
    }
});

export default MarketScreen;
