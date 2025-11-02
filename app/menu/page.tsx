'use client';

import React, { useState } from 'react';
import { Sparkles, Coffee, Droplets, IceCream, Leaf, Cake, Star, ChefHat } from 'lucide-react';
import { CONTACT, LINKS } from '@/lib/siteConfig';

interface MenuItem {
    name: string;
    price: number | { S: number; L: number | null };
    icon?: string;
    popular?: boolean;
    mustTry?: boolean;
}

interface MenuData {
    [key: string]: MenuItem[];
}

const MakersMenu = () => {
    const [activeCategory, setActiveCategory] = useState('specialShakes');
    const [selectedSize, setSelectedSize] = useState<'S' | 'L'>('S');
    const [showMore, setShowMore] = useState<{[key: string]: boolean}>({});

    const categories = [
        { id: 'specialShakes', name: 'Signature Shakes', icon: IceCream, color: 'from-blue-500 to-blue-600' },
        { id: 'classicShakes', name: 'Classic Shakes', icon: Coffee, color: 'from-blue-400 to-blue-500' },
        { id: 'premiumShakes', name: 'Premium Shakes', icon: Sparkles, color: 'from-blue-600 to-blue-700' },
        { id: 'beverages', name: 'Beverages', icon: Droplets, color: 'from-blue-500 to-blue-600' },
        { id: 'food', name: 'Food & Desserts', icon: Cake, color: 'from-blue-400 to-blue-600' },
        { id: 'healthy', name: 'Healthy Options', icon: Leaf, color: 'from-blue-500 to-blue-700' }
    ];

    const menuData: MenuData = {
        specialShakes: [
            // Mom Special Shakes
            { name: "Cookies 'N' Cream", price: 169, popular: true },
            { name: "Chocolate Strawberry", price: 179 },
            { name: "Oreo 'Go' Nuts", price: 179 },
            { name: "KitKat", price: 189 },
            { name: "Death By Chocolate", price: 239 },
            { name: "KitKat Oreo", price: 209 },
            { name: "Snickers", price: 209 },
            { name: "Belgium Dark Chocolate", price: 219, mustTry: true },
            { name: "Choco -A- List", price: 219 },
            { name: "Belgium Explode", price: 239 },
            { name: "Mighty Berry", price: 239 },
            { name: "Ferrero Rocher", price: 249 },
            // Biscoff Bliss
            { name: "Biscoff Shake", price: { S: 149, L: 199 } },
            { name: "Biscoff Coffee", price: { S: 159, L: 209 } },
            { name: "Biscoff Monster", price: { S: 179, L: 229 }, mustTry: true },
            { name: "Biscoff Brownie", price: { S: 189, L: 249 } },
            // Red Velvet
            { name: "Red Velvet Shake", price: { S: 149, L: 199 } },
            { name: "Red Velvet Banana", price: { S: 159, L: 209 } },
            { name: "Red Velvet Oreo", price: { S: 159, L: 209 } },
            { name: "Red Velvet Caramel", price: { S: 179, L: 229 } },
            { name: "Red Velvet Nutella", price: { S: 179, L: 229 } },
            { name: "Red Velvet Brownie", price: { S: 199, L: 249 }, mustTry: true }
        ],
        classicShakes: [
            // Nutella Nerds
            { name: "Nutella", price: { S: 129, L: 179 } },
            { name: "Nutella Banana", price: { S: 139, L: 189 } },
            { name: "Choco Chip Nutella", price: { S: 149, L: 199 } },
            { name: "Nutella Peanut Butter", price: { S: 159, L: 209 } },
            { name: "Nutella Brownie", price: { S: 179, L: 229 }, mustTry: true },
            // Captain Oreo
            { name: "Strawberry Oreo", price: { S: 129, L: 169 } },
            { name: "Blackcurrant Oreo", price: { S: 129, L: 169 } },
            { name: "Peanut Butter Oreo", price: { S: 139, L: 179 } },
            { name: "Choco Oreo", price: { S: 149, L: 189 } },
            // Banana Special
            { name: "Strawberry Banana", price: { S: 119, L: 159 } },
            { name: "Chocochip Banana", price: { S: 129, L: 169 } },
            { name: "Oreo Banana", price: { S: 129, L: 169 } },
            { name: "Peanut Butter Banana", price: { S: 129, L: 169 } },
            // Insta Shakes
            { name: "Wonder Vanilla", price: { S: 109, L: 149 } },
            { name: "Coffee", price: { S: 119, L: 159 } },
            { name: "Chocochip Cookies", price: { S: 129, L: 169 } },
            { name: "Oreo", price: { S: 129, L: 169 } },
            { name: "Pan Shake", price: { S: 129, L: 169 }, mustTry: true },
            { name: "Peanut Butter", price: { S: 129, L: 169 } },
            { name: "5Star", price: { S: 129, L: 179 } },
            { name: "Munch", price: { S: 129, L: 179 } },
            { name: "Dates", price: { S: 139, L: 189 } },
            { name: "Butterscotch", price: { S: 149, L: 199 } }
        ],
        premiumShakes: [
            // Brownie Creations
            { name: "Strawberry Brownie", price: { S: 149, L: 199 }, mustTry: true },
            { name: "Coffee Brownie", price: { S: 159, L: 209 } },
            { name: "Peanut Butter Brownie", price: { S: 159, L: 209 } },
            { name: "Choco Chip Brownie", price: { S: 169, L: 219 } },
            { name: "Oreo Brownie", price: { S: 169, L: 219 } },
            { name: "Chocolate Brownie", price: { S: 169, L: 219 } },
            // Cheesy Shakes
            { name: "Cheesy Red Velvet", price: { S: 129, L: 179 } },
            { name: "Cheesy Newyork", price: { S: 139, L: 189 } },
            { name: "Cheesy Blueberry", price: { S: 139, L: 189 } },
            { name: "Cheesy Strawberry", price: { S: 139, L: 189 } },
            // Notty Nuts
            { name: "Strawberry Nuts", price: { S: 149, L: null } },
            { name: "Blackcurrant Nuts", price: { S: 149, L: null } },
            { name: "Kaju Gulkand", price: { S: 149, L: null } },
            { name: "Caramel Nuts", price: { S: 169, L: null } },
            { name: "Nutella Nuts", price: { S: 169, L: null } },
            { name: "Brownie Nuts", price: { S: 189, L: null } },
            { name: "Dry Fruits Special", price: { S: 209, L: null }, mustTry: true }
        ],
        beverages: [
            // Cold Coffees
            { name: "Classic Cold Coffee", price: 169 },
            { name: "Vanilla Cold Coffee", price: 169 },
            { name: "Irish Cold Coffee", price: 179 },
            { name: "Oreo Cold Coffee", price: 179, mustTry: true },
            { name: "Hazelnut Cold Coffee", price: 189 },
            // Bubble Teas
            { name: "Taro Bubble Tea", price: 239 },
            { name: "Chocolate Fusion Bubble Tea", price: 239 },
            { name: "Mocha Bubble Tea", price: 249 },
            { name: "Oreo Bliss Bubble Tea", price: 249 },
            { name: "Mixed Berry Bubble Tea", price: 249, mustTry: true },
            { name: "Blueberry Bubble Tea", price: 249 },
            // Mocktails
            { name: "Passion Fruit Mocktail", price: 129 },
            { name: "Blue Curacao Mocktail", price: 129 },
            { name: "Classic Lemonade", price: 129 },
            { name: "Strawberry Lemonade", price: 129, mustTry: true },
            { name: "Green Apple Lemonade", price: 129 }
        ],
        food: [
            // Momos
            { name: "Mix Veg Momo", price: 110 },
            { name: "Veg Schezwan Momo", price: 130 },
            { name: "Classic Paneer Momo", price: 140 },
            { name: "Chicken Peri Peri Momo", price: 160 },
            { name: "Chicken Schezwan Momo", price: 160 },
            // Desserts
            { name: "Brownie Indulge", price: 119 },
            { name: "Red Velvet Caramel Bliss", price: 129 },
            { name: "Caramel Crunch Brownie", price: 119 },
            { name: "Crazy Biscoff", price: 139, mustTry: true }
        ],
        healthy: [
            // Healthy Crunches
            { name: "Strawberry Crunch", price: { S: 119, L: 169 } },
            { name: "Blackcurrant Crunch", price: { S: 129, L: 169 } },
            { name: "Banana Crunch", price: { S: 119, L: 169 } },
            { name: "Caramel Crunch", price: { S: 139, L: 189 } },
            // Fruit Walkers
            { name: "Strawberry Smoothie", price: { S: 119, L: 159 } },
            { name: "Blackcurrant Smoothie", price: { S: 119, L: 159 } },
            { name: "Banana Smoothie", price: { S: 119, L: 159 } },
            { name: "Green Apple Smoothie", price: { S: 119, L: 169 } },
            { name: "Mango Smoothie", price: { S: 139, L: 189 } }
        ]
    };

    const getPrice = (item: MenuItem) => {
        if (typeof item.price === 'number') {
            return `₹${item.price}`;
        } else {
            if (selectedSize === 'L' && item.price.L === null) {
                return 'Small Only';
            }
            return `₹${item.price[selectedSize]}`;
        }
    };

    const shouldShowSizeToggle = () => {
        const currentItems = menuData[activeCategory] || [];
        return currentItems.some(item => typeof item.price === 'object');
    };

    const getVisibleItems = (categoryId: string) => {
        const items = menuData[categoryId] || [];
        const isShowingMore = showMore[categoryId];

        // For desktop: 2 rows with 4 items each = 8 items initially
        // For mobile: 3 items initially
        const desktopLimit = 8;
        const mobileLimit = 3;

        if (isShowingMore) {
            return {
                desktop: items,
                mobile: items,
                hasMoreDesktop: false,
                hasMoreMobile: false
            };
        }

        return {
            desktop: items.slice(0, desktopLimit),
            mobile: items.slice(0, mobileLimit),
            hasMoreDesktop: items.length > desktopLimit,
            hasMoreMobile: items.length > mobileLimit
        };
    };

    const handleLoadMore = (categoryId: string) => {
        setShowMore(prev => ({
            ...prev,
            [categoryId]: true
        }));
    };

    return (
        <div className="menu-page min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/40 to-blue-50/60 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100/30 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
                <div className="absolute top-40 right-10 w-32 h-32 bg-blue-200/30 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-20 left-20 w-32 h-32 bg-gray-200/30 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative z-10 py-12 px-4">
                {/* Hero Header */}
                <div className="text-center mb-6 md:mb-12">
                    <div className="max-w-4xl mx-auto">
                        <div className="inline-flex items-center justify-center p-2 md:p-3 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full mb-4 md:mb-6 shadow-lg animate-float">
                            <ChefHat className="w-6 h-6 md:w-8 md:h-8 text-white" />
                        </div>
                        <h1 className="font-black text-5xl md:text-8xl bg-gradient-to-r from-gray-800 via-gray-900 to-blue-900 bg-clip-text text-transparent mb-4 md:mb-8 leading-tight tracking-tight">
                            Our Menu
                        </h1>
                        <div className="max-w-3xl mx-auto">
                            <p className="font-light text-base md:text-xl text-gray-600 mb-2 md:mb-4">
                                The Art of Thick & Creamy
                            </p>
                            <p className="font-semibold text-sm md:text-lg bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                                Pure Joy in Every Sip
                            </p>
                        </div>
                        <div className="flex justify-center mt-4 md:mt-6">
                            <div className="flex items-center space-x-1 md:space-x-2 bg-white/60 backdrop-blur-sm px-3 md:px-6 py-1 md:py-2 rounded-full shadow-md border border-blue-100">
                                <Star className="w-3 h-3 md:w-4 md:h-4 text-blue-500 fill-current animate-pulse" />
                                <span className="font-medium text-gray-700 text-xs md:text-sm">Premium Quality Ingredients</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Category Navigation */}
                <div className="max-w-7xl mx-auto mb-6 md:mb-12 perspective-1000">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
                        {categories.map((cat) => {
                            const Icon = cat.icon;
                            const isActive = activeCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`group relative dashboard-card-3d p-3 md:p-4 rounded-xl md:rounded-2xl transition-all duration-500 transform hover:scale-105 ${
                                        isActive
                                            ? `bg-gradient-to-br ${cat.color} text-white shadow-xl`
                                            : 'glass-3d text-gray-700 hover:shadow-xl'
                                    }`}
                                >
                                    <div className="relative z-10 flex flex-col items-center space-y-2 md:space-y-2">
                                        <div className={`p-2 md:p-2 rounded-lg md:rounded-xl transition-all duration-300 ${
                                            isActive 
                                                ? 'bg-white/20 backdrop-blur-sm' 
                                                : 'bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-blue-100 group-hover:to-blue-200'
                                        }`}>
                                            <Icon className={`w-6 h-6 md:w-6 md:h-6 transition-colors duration-300 ${
                                                isActive ? 'text-white' : 'text-gray-600 group-hover:text-blue-600'
                                            }`} />
                                        </div>
                                        <div className="font-semibold text-xs md:text-xs text-center leading-tight">
                                            {cat.name}
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Enhanced Size Toggle */}
                {shouldShowSizeToggle() && (
                    <div className="max-w-7xl mx-auto mb-6 md:mb-8 flex justify-center">
                        <div className="bg-white/60 backdrop-blur-sm rounded-xl md:rounded-2xl p-1 md:p-2 shadow-md border border-blue-100">
                            <div className="flex">
                                <button
                                    onClick={() => setSelectedSize('S')}
                                    className={`px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl font-semibold text-xs md:text-sm transition-all duration-300 ${
                                        selectedSize === 'S'
                                            ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg transform scale-105'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                                    }`}
                                >
                                    Small
                                </button>
                                <button
                                    onClick={() => setSelectedSize('L')}
                                    className={`px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl font-semibold text-xs md:text-sm transition-all duration-300 ${
                                        selectedSize === 'L'
                                            ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg transform scale-105'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                                    }`}
                                >
                                    Large
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Enhanced Menu Items Grid */}
                <div className="max-w-7xl mx-auto perspective-1000">
                    {/* Desktop/Tablet Card View */}
                    <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {getVisibleItems(activeCategory).desktop?.map((item, index) => (
                            <div
                                key={index}
                                className="group dashboard-card-3d glass-3d rounded-xl p-4 shadow-lg transition-all duration-500"
                            >
                                {/* Compact Badges */}
                                <div className="flex justify-start items-start mb-3">
                                    <div className="flex gap-1">
                                        {item.mustTry && (
                                            <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold shadow-md animate-pulse">
                                                Must Try
                                            </span>
                                        )}
                                        {item.popular && (
                                            <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold shadow-md">
                                                Popular
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Compact Content */}
                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-1">
                                        <h3 className="font-semibold text-sm text-gray-900 leading-tight flex-1 pr-2">
                                            {item.name}
                                        </h3>
                                        <div className="text-right">
                                            <div className="font-bold text-base text-blue-600">
                                                {getPrice(item)}
                                            </div>
                                        </div>
                                    </div>
                                    {typeof item.price === 'object' && (
                                        <div className="font-medium text-[10px] text-gray-500">
                                            {selectedSize === 'S' ? 'Small' : item.price.L === null ? 'Small Only' : 'Large'}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Load More Button for Desktop */}
                        {getVisibleItems(activeCategory).hasMoreDesktop && (
                            <div className="col-span-2 lg:col-span-3 xl:col-span-4">
                                <button
                                    onClick={() => handleLoadMore(activeCategory)}
                                    className="w-full glass-3d rounded-xl p-3 md:p-4 shadow-lg transition-all duration-300 hover:shadow-xl flex items-center justify-center space-x-2"
                                >
                                    <span className="font-semibold text-gray-700 text-xs md:text-sm">
                                        Load More
                                    </span>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Mobile List View */}
                    <div className="md:hidden space-y-2">
                        {getVisibleItems(activeCategory).mobile?.map((item, index) => (
                            <div
                                key={index}
                                className="glass-3d rounded-lg p-2 shadow-md transition-all duration-300 hover:shadow-lg"
                            >
                                <div className="flex items-start justify-between mb-1">
                                    <h3 className="font-semibold text-sm text-gray-900 leading-tight flex-1 pr-2">
                                        {item.name}
                                    </h3>
                                    <div className="text-right">
                                        <div className="font-bold text-sm text-blue-600">
                                            {getPrice(item)}
                                        </div>
                                        {typeof item.price === 'object' && (
                                            <div className="font-medium text-[10px] text-gray-500">
                                                {selectedSize === 'S' ? 'Small' : item.price.L === null ? 'Small Only' : 'Large'}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Mobile Badges */}
                                {(item.mustTry || item.popular) && (
                                    <div className="flex gap-1">
                                        {item.mustTry && (
                                            <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-1.5 py-0.5 rounded-full text-[9px] font-bold">
                                                Must Try
                                            </span>
                                        )}
                                        {item.popular && (
                                            <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-1.5 py-0.5 rounded-full text-[9px] font-bold">
                                                Popular
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Load More Button for Mobile */}
                        {getVisibleItems(activeCategory).hasMoreMobile && (
                            <div className="flex justify-center">
                                <button
                                    onClick={() => handleLoadMore(activeCategory)}
                                    className="glass-3d rounded-lg p-3 shadow-lg transition-all duration-300 hover:shadow-xl flex items-center justify-center space-x-2"
                                >
                                    <span className="font-semibold text-gray-700 text-xs">
                                        Load More
                                    </span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Enhanced Add-ons Section */}
                <div className="max-w-7xl mx-auto mt-12 md:mt-16">
                    <div className="text-center mb-6 md:mb-12">
                        <h3 className="font-extrabold text-2xl md:text-4xl bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-2 md:mb-4">
                            Customize Your Order
                        </h3>
                        <p className="font-normal text-base md:text-lg text-gray-600">Add-Ons - ₹30 Each</p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2 md:gap-3 lg:gap-4 perspective-1000">
                        {['Banana', 'Chocochip', 'Kit Kat', 'Munch', 'Oreo', '5 Star', 'Ice Cream', 'Brownie'].map((addon) => (
                            <button
                                key={addon}
                                className="group dashboard-card-3d glass-3d rounded-lg md:rounded-xl p-2 md:p-3 lg:p-4 shadow-md md:shadow-lg transition-all duration-500 text-center hover:scale-105"
                            >
                                <div className="text-[10px] sm:text-xs md:text-sm text-gray-700 group-hover:text-blue-900 transition-colors duration-300 leading-tight font-medium">
                                    {addon}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Enhanced Footer CTA */}
                <div className="max-w-4xl mx-auto mt-16 md:mt-24">
                    <div className="relative bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl md:rounded-2xl p-4 md:p-8 text-center text-white shadow-lg overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-500/20 backdrop-blur-sm"></div>
                        <div className="relative z-10">
                            <div className="inline-flex items-center justify-center p-2 md:p-3 bg-white/20 rounded-full mb-3 md:mb-4 animate-float">
                                <ChefHat className="w-5 h-5 md:w-6 md:h-6 text-white" />
                            </div>
                            <h3 className="font-extrabold text-xl md:text-3xl mb-2 md:mb-4">Catering Available!</h3>
                            <p className="font-normal text-sm md:text-base mb-4 md:mb-6 opacity-90">Perfect for Birthdays, Weddings, Anniversaries, and College Events</p>
                            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 md:gap-4">
                                <a href={LINKS.telHref} className="group bg-white/90 backdrop-blur-sm text-blue-600 px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl font-bold text-sm md:text-base hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-md">
                                    Call: {CONTACT.phoneDisplay}
                                </a>
                                <a href={LINKS.mailtoHref} className="group bg-white/20 backdrop-blur-sm border-2 border-white text-white px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl font-bold text-sm md:text-base hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105">
                                    Email Us
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MakersMenu;
