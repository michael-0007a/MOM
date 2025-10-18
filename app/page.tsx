'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Sparkles, Heart, Blend, Users, Award, TrendingUp, Globe, ChevronDown, ChevronUp, DollarSign, Milk, Cookie, IceCream, Cherry, Coffee } from 'lucide-react';

export default function Home() {
    const [loaded, setLoaded] = useState(false);
    const [activeFilter, setActiveFilter] = useState('all');
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [activeTimelineIndex, setActiveTimelineIndex] = useState(0);
    const [timelineProgress, setTimelineProgress] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        city: '',
        investment: '',
        message: '',
    });

    useEffect(() => {
        setLoaded(true);

        // Timeline scroll handler with improved center tracking
        const handleTimelineScroll = () => {
            const timelineSection = document.getElementById('our-story');
            const timelineItems = document.querySelectorAll('.timeline-milestone');

            if (!timelineSection || timelineItems.length === 0) return;

            const sectionRect = timelineSection.getBoundingClientRect();
            const sectionTop = sectionRect.top;
            const sectionHeight = sectionRect.height;
            const viewportHeight = window.innerHeight;
            const viewportCenter = viewportHeight / 2;

            // Calculate section progress based on viewport center position
            const sectionStart = sectionTop;
            const sectionEnd = sectionTop + sectionHeight;

            // Progress calculation: 0 when center is at section top, 1 when center is at section bottom
            let sectionProgress = 0;
            if (viewportCenter >= sectionStart && viewportCenter <= sectionEnd) {
                sectionProgress = (viewportCenter - sectionStart) / sectionHeight;
            } else if (viewportCenter > sectionEnd) {
                sectionProgress = 1;
            }

            sectionProgress = Math.max(0, Math.min(1, sectionProgress));
            setTimelineProgress(sectionProgress);

            // Find active milestone based on viewport center
            let activeIndex = 0;
            let minDistance = Infinity;

            timelineItems.forEach((item, index) => {
                const itemRect = item.getBoundingClientRect();
                const itemCenter = itemRect.top + itemRect.height / 2;
                const distance = Math.abs(itemCenter - viewportCenter);

                if (distance < minDistance) {
                    minDistance = distance;
                    activeIndex = index;
                }
            });

            setActiveTimelineIndex(activeIndex);
        };

        window.addEventListener('scroll', handleTimelineScroll);
        window.addEventListener('resize', handleTimelineScroll);
        handleTimelineScroll(); // Initial call

        return () => {
            window.removeEventListener('scroll', handleTimelineScroll);
            window.removeEventListener('resize', handleTimelineScroll);
        };
    }, []);

    // Timeline data
    const milestones = [
        {
            year: '2013',
            icon: Heart,
            title: '1st Store',
            description: 'Our journey began with a single store and a dream to create the perfect milkshake experience.',
        },
        {
            year: '2015',
            icon: TrendingUp,
            title: '10 Stores',
            description: 'Rapid expansion as customers fell in love with our handcrafted milkshakes and premium quality.',
        },
        {
            year: '2017',
            icon: Users,
            title: '50 Stores',
            description: 'Became a household name with 50 stores across the region, serving thousands daily.',
        },
        {
            year: '2018',
            icon: Globe,
            title: 'USA Store',
            description: 'International expansion begins with our first store in the United States market.',
        },
        {
            year: '2020',
            icon: Award,
            title: 'UAE Store',
            description: 'Further global reach with expansion into the Middle East, bringing joy worldwide.',
        },
        {
            year: '2025',
            icon: Sparkles,
            title: 'Digital Innovation',
            description: 'Leading the industry with cutting-edge technology and nationwide delivery services.',
        },
    ];

    // Gallery data
    const galleryItems = [
        { id: 1, type: 'milkshake', icon: Milk, title: 'Classic Collection', color: 'from-blue-400 to-blue-600' },
        { id: 2, type: 'customer', icon: Users, title: 'Happy Customers', color: 'from-pink-400 to-pink-600' },
        { id: 3, type: 'milkshake', icon: Cherry, title: 'Berry Delights', color: 'from-red-400 to-red-600' },
        { id: 4, type: 'outlet', icon: Award, title: 'Our Outlets', color: 'from-blue-500 to-blue-700' },
        { id: 5, type: 'milkshake', icon: Coffee, title: 'Chocolate Heaven', color: 'from-amber-600 to-amber-800' },
        { id: 6, type: 'customer', icon: Sparkles, title: 'Celebrations', color: 'from-yellow-400 to-yellow-600' },
        { id: 7, type: 'milkshake', icon: Cherry, title: 'Tropical Paradise', color: 'from-orange-400 to-orange-600' },
        { id: 8, type: 'outlet', icon: TrendingUp, title: 'Store Ambiance', color: 'from-cyan-400 to-cyan-600' },
        { id: 9, type: 'milkshake', icon: Cookie, title: 'Cookie Crunch', color: 'from-stone-400 to-stone-600' },
        { id: 10, type: 'customer', icon: Heart, title: 'Family Time', color: 'from-green-400 to-green-600' },
        { id: 11, type: 'milkshake', icon: IceCream, title: 'Birthday Specials', color: 'from-blue-400 to-blue-600' },
        { id: 12, type: 'outlet', icon: Globe, title: 'Grand Opening', color: 'from-sky-400 to-sky-600' },
    ];

    const galleryCategories = [
        { name: 'All', filter: 'all' },
        { name: 'Milkshakes', filter: 'milkshake' },
        { name: 'Customers', filter: 'customer' },
        { name: 'Outlets', filter: 'outlet' },
    ];

    const filteredGallery = activeFilter === 'all'
        ? galleryItems
        : galleryItems.filter(item => item.type === activeFilter);

    // Franchise data
    const benefits = [
        {
            icon: DollarSign,
            title: 'High ROI',
            description: 'Average return on investment within 18-24 months',
        },
        {
            icon: Users,
            title: 'Training & Support',
            description: 'Comprehensive training and ongoing support for all franchisees',
        },
        {
            icon: TrendingUp,
            title: 'Proven Model',
            description: 'Successfully operating in 50+ cities with consistent growth',
        },
        {
            icon: Award,
            title: 'Brand Power',
            description: 'Leverage our award-winning brand and loyal customer base',
        },
    ];

    const faqs = [
        {
            question: 'What is the initial investment required?',
            answer: 'The initial investment ranges from $150,000 to $300,000, depending on the location and size of the outlet. This includes franchise fee, equipment, initial inventory, and setup costs.',
        },
        {
            question: 'Do I need prior experience in the food industry?',
            answer: 'No prior experience is necessary! We provide comprehensive training covering all aspects of running a Makers of Milkshakes outlet, from operations to customer service.',
        },
        {
            question: 'What kind of support will I receive?',
            answer: 'You will receive full support including site selection, outlet design, staff training, marketing materials, ongoing operational support, and access to our supply chain.',
        },
        {
            question: 'How long does it take to open a franchise?',
            answer: 'From application approval to grand opening, it typically takes 3-6 months, depending on location availability and local regulations.',
        },
        {
            question: 'What are the ongoing fees?',
            answer: 'Franchisees pay a 5% royalty fee on gross sales and contribute 2% to the national marketing fund.',
        },
        {
            question: 'Can I own multiple outlets?',
            answer: 'Absolutely! Many of our successful franchisees operate multiple locations. We encourage multi-unit ownership for qualified candidates.',
        },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Thank you for your interest! We will contact you within 24 hours.');
        setFormData({ name: '', email: '', phone: '', city: '', investment: '', message: '' });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Milkshake Shop Hero Section - Optimized */}
            <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden py-12">
                {/* Light Background with Enhanced Grid */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/40 to-blue-50/60">
                    {/* Enhanced Grid Overlay - More Visible */}
                    <div
                        className="absolute inset-0 opacity-40"
                        style={{
                            backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.4) 2px, transparent 2px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.4) 2px, transparent 2px)
              `,
                            backgroundSize: '50px 50px'
                        }}
                    ></div>

                    {/* Floating Light Particles */}
                    <div className="absolute inset-0">
                        {[...Array(20)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-1.5 h-1.5 bg-blue-400/50 rounded-full"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animation: `float ${4 + Math.random() * 3}s ease-in-out infinite`,
                                    animationDelay: `${Math.random() * 2}s`
                                }}
                            ></div>
                        ))}
                    </div>

                    {/* Additional sparkle particles */}
                    <div className="absolute inset-0">
                        {[...Array(12)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-0.5 h-0.5 bg-blue-500/60 rounded-full"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animation: `sparkle ${3 + Math.random() * 2}s ease-in-out infinite`,
                                    animationDelay: `${Math.random() * 3}s`
                                }}
                            ></div>
                        ))}
                    </div>

                    {/* Soft Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50/60 via-transparent to-blue-50/60"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

                        {/* Left Side - Text Content */}
                        <div className={`lg:col-span-1 col-span-1 mx-auto max-w-2xl lg:max-w-none space-y-6 transition-all duration-1000 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                            {/* Shop Badge */}
                            <div className="inline-flex items-center space-x-2 glass-3d badge-3d px-6 py-3 rounded-full shadow-lg mb-8 border-2 border-blue-200 hover:scale-105 transition-transform duration-300 cursor-pointer">
                                <Sparkles className="w-5 h-5 text-blue-500" />
                                <span className="text-blue-800 font-semibold">Premium Handcrafted Milkshakes</span>
                                <Sparkles className="w-5 h-5 text-pink-500" />
                            </div>

                            {/* Main Heading */}
                            <div className="text-center lg:text-left">
                                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 leading-tight">
                                    <span className="notable-regular text-gray-900 font-normal italic">THE #1</span>
                                    <span className="block bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent text-4xl sm:text-5xl lg:text-6xl mt-2">
                    MILKSHAKE SHOP
                  </span>
                                </h1>
                                <p className="text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-700 mt-3">
                                    Crafting Happiness in Every Cup
                                </p>

                                <p className="text-lg text-gray-600 mt-6 leading-relaxed max-w-lg mx-auto lg:mx-0">
                                    Where premium ingredients meet creativity — every shake made fresh with love, crafted for pure joy.
                                </p>
                            </div>

                            {/* CTA Buttons with 3D Effect */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center perspective-1000">
                                <a
                                    href="/menu"
                                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center space-x-2 overflow-hidden"
                                    style={{ transformStyle: 'preserve-3d' }}
                                >
                                    <span className="relative z-10">Explore Menu</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </a>
                                <a
                                    href="/store-locator"
                                    className="relative px-8 py-4 glass-3d text-blue-600 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border-2 border-blue-200 hover:border-blue-400 overflow-hidden group"
                                    style={{ transformStyle: 'preserve-3d' }}
                                >
                                    <span className="relative z-10">Find a Store</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </a>
                            </div>

                            {/* Social Proof with 3D Cards */}
                            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto perspective-1500">
                                {[
                                    { icon: Users, label: '50K+', desc: 'Happy Customers' },
                                    { icon: Award, label: '15+', desc: 'Awards Won' },
                                    { icon: Blend, label: '30+', desc: 'Unique Flavors' },
                                    { icon: Globe, label: '50+', desc: 'Locations' }
                                ].map((stat, idx) => {
                                    const Icon = stat.icon;
                                    return (
                                        <div
                                            key={idx}
                                            className="card-3d card-3d-shadow glass-3d rounded-2xl p-4 border border-blue-100 relative group cursor-pointer"
                                        >
                                            <div className="relative z-10">
                                                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                                                    <Icon className="w-6 h-6 text-white" />
                                                </div>
                                                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">{stat.label}</div>
                                                <div className="text-sm text-gray-600 font-medium">{stat.desc}</div>
                                            </div>
                                            {/* 3D depth effect */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-blue-200/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Right Side - Dashboard Cards (Desktop Only) */}
                        <div className="hidden lg:block relative h-[600px]">

                            {/* Recipe Analysis Panel - Top Left */}
                            <div
                                className={`absolute top-0 left-0 w-40 md:w-52 lg:w-64 transition-all duration-1000 delay-300 group cursor-pointer perspective-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
                                style={{ transform: 'rotateY(-18deg) rotateX(10deg) translateZ(30px)' }}
                            >
                                <div className="dashboard-card-3d bg-white/95 backdrop-blur-lg rounded-lg md:rounded-xl p-2.5 md:p-3.5 lg:p-4 border-2 border-blue-200/80 hover:border-blue-400 transition-all duration-500 relative overflow-visible shadow-2xl group-hover:shadow-3xl"
                                     style={{
                                        transform: 'translateZ(0) rotateY(3deg) rotateX(-3deg)',
                                        transformStyle: 'preserve-3d',
                                        filter: 'drop-shadow(5px 5px 15px rgba(59, 130, 246, 0.25))'
                                     }}>
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-purple-400/5 to-pink-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg pointer-events-none"></div>

                                    <div className="flex items-center space-x-1 md:space-x-2 mb-1.5 md:mb-3 relative z-10">
                                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
                                        <h3 className="text-[10px] md:text-sm font-bold text-blue-700 group-hover:text-blue-800 transition-colors">Recipe Analysis</h3>
                                    </div>
                                    <div className="space-y-1 md:space-y-2 relative z-10">
                                        <div className="flex items-center justify-between text-[9px] md:text-xs">
                                            <span className="text-blue-600 font-semibold">Base:</span>
                                            <div className="flex items-center space-x-1 md:space-x-1.5">
                                                <span className="text-gray-800 font-medium">Fresh Milk</span>
                                                <div className="w-2 h-2 md:w-3 md:h-3 bg-white border-2 border-gray-300 rounded-sm group-hover:border-blue-400 group-hover:shadow-sm transition-all"></div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between text-[9px] md:text-xs">
                                            <span className="text-blue-600 font-semibold">Component A:</span>
                                            <div className="flex items-center space-x-1 md:space-x-1.5">
                                                <span className="text-gray-800 font-medium">Strawberries</span>
                                                <div className="w-2 h-2 md:w-3 md:h-3 bg-red-400 rounded-sm group-hover:shadow-md group-hover:shadow-red-400/50 transition-all"></div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between text-[9px] md:text-xs">
                                            <span className="text-blue-600 font-semibold">Component B:</span>
                                            <div className="flex items-center space-x-1 md:space-x-1.5">
                                                <span className="text-gray-800 font-medium">Ice Cream</span>
                                                <div className="w-2 h-2 md:w-3 md:h-3 bg-yellow-300 rounded-sm group-hover:shadow-md group-hover:shadow-yellow-300/50 transition-all"></div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between text-[9px] md:text-xs pt-1 md:pt-2 border-t border-gray-200">
                                            <span className="text-blue-600 font-semibold">Status:</span>
                                            <span className="text-yellow-600 font-bold group-hover:text-yellow-700 transition-colors text-[9px] md:text-xs">Ultra Smooth ✨</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Control Panel - Top Right */}
                            <div
                                className={`absolute top-0 right-0 w-36 md:w-40 lg:w-52 transition-all duration-1000 delay-400 group cursor-pointer perspective-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
                                style={{ transform: 'rotateY(18deg) rotateX(10deg) translateZ(35px)' }}
                            >
                                <div className="dashboard-card-3d bg-white/95 backdrop-blur-lg rounded-lg md:rounded-xl p-2.5 md:p-3.5 lg:p-4 border-2 border-purple-200/80 hover:border-purple-400 transition-all duration-500 relative overflow-visible shadow-2xl group-hover:shadow-3xl"
                                     style={{
                                        transform: 'translateZ(0) rotateY(-3deg) rotateX(-3deg)',
                                        transformStyle: 'preserve-3d',
                                        filter: 'drop-shadow(-5px 5px 15px rgba(147, 51, 234, 0.25))'
                                     }}>
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 via-pink-400/5 to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg pointer-events-none"></div>

                                    <div className="flex items-center space-x-1 md:space-x-2 mb-1.5 md:mb-3 relative z-10">
                                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-purple-500 rounded-full group-hover:animate-pulse shadow-lg shadow-purple-500/50"></div>
                                        <h3 className="text-[10px] md:text-sm font-bold text-purple-700 group-hover:text-purple-800 transition-colors">Control Panel</h3>
                                    </div>
                                    <div className="space-y-1.5 md:space-y-3 relative z-10">
                                        <div className="w-full">
                                            <div className="w-full h-2 md:h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                                                <div className="w-4/5 h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full relative group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300 shadow-md">
                                                    <div className="absolute right-0 top-0 w-3 h-3 md:w-4 md:h-4 bg-white rounded-full -mt-0.5 border-2 border-purple-400 shadow-lg group-hover:border-purple-600 group-hover:shadow-xl transition-all"></div>
                                                </div>
                                            </div>
                                            <div className="text-right mt-0.5 md:mt-1">
                                                <span className="text-base md:text-xl font-bold text-purple-600 group-hover:text-purple-700 transition-colors drop-shadow-sm">80%</span>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <span className="text-[9px] md:text-xs text-white bg-purple-600 px-1.5 md:px-2.5 py-0.5 md:py-1 rounded-full group-hover:bg-purple-700 transition-colors shadow-md font-medium">Level: Optimal</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sensor Data - Middle Center */}
                            <div
                                className={`absolute top-[180px] md:top-[200px] lg:top-[220px] left-[60px] md:left-[80px] lg:left-[100px] w-32 md:w-36 lg:w-40 transition-all duration-1000 delay-500 group cursor-pointer perspective-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transform: 'rotateY(-12deg) rotateX(-8deg) translateZ(25px)' }}
                            >
                                <div className="dashboard-card-3d bg-white/95 backdrop-blur-lg rounded-lg md:rounded-xl p-2.5 md:p-3.5 lg:p-4 border-2 border-cyan-200/80 hover:border-cyan-400 transition-all duration-500 relative overflow-visible shadow-xl group-hover:shadow-2xl"
                                     style={{
                                        transform: 'translateZ(0) rotateY(5deg) rotateX(5deg)',
                                        transformStyle: 'preserve-3d',
                                        filter: 'drop-shadow(4px -4px 12px rgba(6, 182, 212, 0.25))'
                                     }}>
                                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-blue-400/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg pointer-events-none"></div>

                                    <div className="flex items-center space-x-1 md:space-x-2 mb-1 md:mb-2 relative z-10">
                                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-cyan-500 rounded-full animate-pulse shadow-lg shadow-cyan-500/50"></div>
                                        <h4 className="text-[9px] md:text-xs font-bold text-cyan-700 group-hover:text-cyan-800 transition-colors">Sensor Data</h4>
                                    </div>
                                    <div className="text-center relative z-10">
                                        <div className="text-lg md:text-2xl font-bold text-cyan-600 mb-0.5 md:mb-1 group-hover:text-cyan-700 transition-colors drop-shadow-sm">4°C</div>
                                        <div className="text-[8px] md:text-[10px] text-gray-700 bg-cyan-50 px-1 md:px-2 py-0.5 rounded group-hover:bg-cyan-100 transition-colors font-medium shadow-sm">Perfect Chill</div>
                                        <div className="mt-1 md:mt-2 w-full h-1 md:h-1.5 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                                            <div className="w-3/4 h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse group-hover:from-cyan-500 group-hover:to-blue-600 transition-all duration-300 shadow-md"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Analytics Module - Middle Right */}
                            <div
                                className={`absolute top-[200px] md:top-[220px] lg:top-[240px] right-[60px] md:right-[80px] lg:right-[100px] w-34 md:w-38 lg:w-44 transition-all duration-1000 delay-600 group cursor-pointer perspective-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transform: 'rotateY(12deg) rotateX(-8deg) translateZ(28px)' }}
                            >
                                <div className="dashboard-card-3d bg-white/95 backdrop-blur-lg rounded-lg md:rounded-xl p-2.5 md:p-3.5 lg:p-4 border-2 border-green-200/80 hover:border-green-400 transition-all duration-500 relative overflow-visible shadow-xl group-hover:shadow-2xl"
                                     style={{
                                        transform: 'translateZ(0) rotateY(-5deg) rotateX(5deg)',
                                        transformStyle: 'preserve-3d',
                                        filter: 'drop-shadow(-4px -4px 12px rgba(34, 197, 94, 0.25))'
                                     }}>
                                    <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 via-cyan-400/5 to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg pointer-events-none"></div>

                                    <div className="flex items-center space-x-1 md:space-x-2 mb-1 md:mb-2 relative z-10">
                                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full group-hover:animate-pulse shadow-lg shadow-green-500/50"></div>
                                        <h4 className="text-[9px] md:text-xs font-bold text-green-700 group-hover:text-green-800 transition-colors">Analytics</h4>
                                    </div>
                                    <div className="space-y-0.5 md:space-y-1.5 text-[9px] md:text-xs relative z-10">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 font-semibold">Calories:</span>
                                            <span className="text-gray-800 font-bold group-hover:text-gray-900 transition-colors">285</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 font-semibold">Protein:</span>
                                            <span className="text-gray-800 font-bold group-hover:text-gray-900 transition-colors">12g</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 font-semibold">Calcium:</span>
                                            <span className="text-gray-800 font-bold group-hover:text-gray-900 transition-colors">35%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Mix Configuration - Bottom Left */}
                            <div
                                className={`absolute bottom-0 left-0 w-38 md:w-44 lg:w-56 transition-all duration-1000 delay-700 group cursor-pointer perspective-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transform: 'rotateY(-20deg) rotateX(-12deg) translateZ(32px)' }}
                            >
                                <div className="dashboard-card-3d bg-white/95 backdrop-blur-lg rounded-lg md:rounded-xl p-2.5 md:p-3.5 lg:p-4 border-2 border-green-200/80 hover:border-green-400 transition-all duration-500 relative overflow-visible shadow-2xl group-hover:shadow-3xl"
                                     style={{
                                        transform: 'translateZ(0) rotateY(6deg) rotateX(6deg)',
                                        transformStyle: 'preserve-3d',
                                        filter: 'drop-shadow(6px -6px 16px rgba(34, 197, 94, 0.25))'
                                     }}>
                                    <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 via-blue-400/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg pointer-events-none"></div>

                                    <div className="flex items-center space-x-1 md:space-x-2 mb-1.5 md:mb-3 relative z-10">
                                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full group-hover:animate-pulse shadow-lg shadow-green-500/50"></div>
                                        <h3 className="text-[10px] md:text-sm font-bold text-green-700 group-hover:text-green-800 transition-colors">Mix Config</h3>
                                    </div>
                                    <div className="space-y-1 md:space-y-2 relative z-10">
                                        <div className="flex items-center space-x-1 md:space-x-2 group/item">
                                            <div className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 bg-green-500 rounded flex items-center justify-center group-hover:item:bg-green-600 transition-colors shadow-md group-hover/item:shadow-lg">
                                                <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-white rounded-sm"></div>
                                            </div>
                                            <span className="text-[9px] md:text-xs text-gray-800 font-medium group-hover:item:text-gray-900 transition-colors">Whipped Cream</span>
                                        </div>
                                        <div className="flex items-center space-x-1 md:space-x-2 group/item">
                                            <div className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 bg-green-500 rounded flex items-center justify-center group-hover:item:bg-green-600 transition-colors shadow-md group-hover/item:shadow-lg">
                                                <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-white rounded-sm"></div>
                                            </div>
                                            <span className="text-[9px] md:text-xs text-gray-800 font-medium group-hover:item:text-gray-900 transition-colors">Choco Chips</span>
                                        </div>
                                        <div className="flex items-center space-x-1 md:space-x-2 group/item">
                                            <div className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 border-2 border-gray-400 rounded group-hover/item:border-gray-600 transition-colors shadow-sm"></div>
                                            <span className="text-[9px] md:text-xs text-gray-500 font-medium group-hover:item:text-gray-700 transition-colors">Marshmallows</span>
                                        </div>
                                        <div className="flex items-center space-x-1 md:space-x-2 group/item">
                                            <div className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 bg-green-500 rounded flex items-center justify-center group-hover:item:bg-green-600 transition-colors shadow-md group-hover/item:shadow-lg">
                                                <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-white rounded-sm"></div>
                                            </div>
                                            <span className="text-[9px] md:text-xs text-gray-800 font-medium group-hover:item:text-gray-900 transition-colors">Cherry</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Process Monitor - Bottom Right */}
                            <div
                                className={`absolute bottom-0 right-0 w-36 md:w-40 lg:w-52 transition-all duration-1000 delay-800 group cursor-pointer perspective-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transform: 'rotateY(20deg) rotateX(-12deg) translateZ(30px)' }}
                            >
                                <div className="dashboard-card-3d bg-white/95 backdrop-blur-lg rounded-lg md:rounded-xl p-2.5 md:p-3.5 lg:p-4 border-2 border-yellow-200/80 hover:border-yellow-400 transition-all duration-500 relative overflow-visible shadow-xl group-hover:shadow-2xl"
                                     style={{
                                        transform: 'translateZ(0) rotateY(-6deg) rotateX(6deg)',
                                        transformStyle: 'preserve-3d',
                                        filter: 'drop-shadow(-6px -6px 16px rgba(234, 179, 8, 0.25))'
                                     }}>
                                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-orange-400/5 to-pink-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg pointer-events-none"></div>

                                    <div className="flex items-center space-x-1 md:space-x-2 mb-1.5 md:mb-3 relative z-10">
                                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-yellow-500 rounded-full animate-pulse shadow-lg shadow-yellow-500/50"></div>
                                        <h3 className="text-[10px] md:text-sm font-bold text-yellow-700 group-hover:text-yellow-800 transition-colors">Process Monitor</h3>
                                    </div>
                                    <div className="space-y-1 md:space-y-2 relative z-10">
                                        <div className="flex items-center justify-between text-[9px] md:text-xs">
                                            <span className="text-gray-700 font-semibold">Mixing:</span>
                                            <span className="text-green-700 bg-green-100 px-1 md:px-2 py-0.5 rounded text-[8px] md:text-[10px] font-bold group-hover:bg-green-200 transition-colors shadow-sm">Complete ✓</span>
                                        </div>
                                        <div className="flex items-center justify-between text-[9px] md:text-xs">
                                            <span className="text-gray-700 font-semibold">Blending:</span>
                                            <span className="text-yellow-700 bg-yellow-100 px-1 md:px-2 py-0.5 rounded text-[8px] md:text-[10px] font-bold group-hover:bg-yellow-200 transition-colors shadow-sm">In Progress</span>
                                        </div>
                                        <div className="flex items-center justify-between text-[9px] md:text-xs">
                                            <span className="text-gray-700 font-semibold">Quality:</span>
                                            <span className="text-orange-700 bg-orange-100 px-1 md:px-2 py-0.5 rounded text-[8px] md:text-[10px] font-bold group-hover:bg-orange-200 transition-colors shadow-sm">Testing</span>
                                        </div>
                                        <div className="flex items-center justify-between text-[9px] md:text-xs">
                                            <span className="text-gray-700 font-semibold">Ready:</span>
                                            <span className="text-blue-700 bg-blue-100 px-1 md:px-2 py-0.5 rounded text-[8px] md:text-[10px] font-bold group-hover:bg-blue-200 transition-colors shadow-sm">2 min</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Enhanced CSS for animations */}
                <style jsx>{`
                    @keyframes float {
                        0%, 100% { transform: translateY(0px) rotate(0deg); }
                        50% { transform: translateY(-15px) rotate(5deg); }
                    }

                    @keyframes fillShake {
                        0%, 100% { height: 70%; }
                        50% { height: 75%; }
                    }

                    @keyframes sparkle {
                        0%, 100% { opacity: 0.3; transform: scale(0.8); }
                        50% { opacity: 1; transform: scale(1.2); }
                    }

                    @keyframes shimmer {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(100%); }
                    }
                `}</style>
            </section>

            {/* Menu Section */}
            <section id="menu" className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`text-center mb-16 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                            Our <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">Menu</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Discover our handcrafted milkshakes, each one perfectly balanced for maximum flavor
                        </p>
                    </div>

                    {/* Featured Menu Items Preview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                        {/* Signature Shakes Preview */}
                        <div className={`bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            <div className="flex justify-start items-start mb-3">
                                <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow-md">
                                    Popular
                                </span>
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-1">
                                    <h3 className="font-semibold text-sm text-gray-900 leading-tight flex-1 pr-2">
                                        Cookies &apos;N&apos; Cream
                                    </h3>
                                    <div className="text-right">
                                        <div className="font-bold text-base text-blue-600">
                                            ₹169
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '0.1s' }}>
                            <div className="flex justify-start items-start mb-3">
                                <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow-md">
                                    Must Try
                                </span>
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-1">
                                    <h3 className="font-semibold text-sm text-gray-900 leading-tight flex-1 pr-2">
                                        Belgium Dark Chocolate
                                    </h3>
                                    <div className="text-right">
                                        <div className="font-bold text-base text-blue-600">
                                            ₹219
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '0.2s' }}>
                            <div className="flex justify-start items-start mb-3">
                                <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow-md">
                                    Must Try
                                </span>
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-1">
                                    <h3 className="font-semibold text-sm text-gray-900 leading-tight flex-1 pr-2">
                                        Biscoff Monster
                                    </h3>
                                    <div className="text-right">
                                        <div className="font-bold text-base text-blue-600">
                                            ₹179
                                        </div>
                                        <div className="font-medium text-xs text-gray-500">
                                            Small
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Hidden on mobile, visible on md and larger screens */}
                        <div className={`hidden md:block bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '0.3s' }}>
                            <div className="flex justify-start items-start mb-3">
                                <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow-md">
                                    Must Try
                                </span>
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-1">
                                    <h3 className="font-semibold text-sm text-gray-900 leading-tight flex-1 pr-2">
                                        Oreo Cold Coffee
                                    </h3>
                                    <div className="text-right">
                                        <div className="font-bold text-base text-blue-600">
                                            ₹179
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`hidden md:block bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '0.4s' }}>
                            <div className="flex justify-start items-start mb-3">
                                <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow-md">
                                    Must Try
                                </span>
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-1">
                                    <h3 className="font-semibold text-sm text-gray-900 leading-tight flex-1 pr-2">
                                        Pan Shake
                                    </h3>
                                    <div className="text-right">
                                        <div className="font-bold text-base text-blue-600">
                                            ₹129
                                        </div>
                                        <div className="font-medium text-xs text-gray-500">
                                            Small
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`hidden md:block bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '0.5s' }}>
                            <div className="flex justify-start items-start mb-3">
                                <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow-md">
                                    Must Try
                                </span>
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-1">
                                    <h3 className="font-semibold text-sm text-gray-900 leading-tight flex-1 pr-2">
                                        Strawberry Lemonade
                                    </h3>
                                    <div className="text-right">
                                        <div className="font-bold text-base text-blue-600">
                                            ₹129
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`hidden md:block bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '0.6s' }}>
                            <div className="flex justify-start items-start mb-3">
                                <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow-md">
                                    Must Try
                                </span>
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-1">
                                    <h3 className="font-semibold text-sm text-gray-900 leading-tight flex-1 pr-2">
                                        Crazy Biscoff
                                    </h3>
                                    <div className="text-right">
                                        <div className="font-bold text-base text-blue-600">
                                            ₹139
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`hidden md:block bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '0.7s' }}>
                            <div className="flex justify-start items-start mb-3">
                                <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow-md">
                                    Must Try
                                </span>
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-1">
                                    <h3 className="font-semibold text-sm text-gray-900 leading-tight flex-1 pr-2">
                                        Dry Fruits Special
                                    </h3>
                                    <div className="text-right">
                                        <div className="font-bold text-base text-blue-600">
                                            ₹209
                                        </div>
                                        <div className="font-medium text-xs text-gray-500">
                                            Small Only
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* View Complete Menu Button */}
                    <div className="text-center">
                        <a
                            href="/menu"
                            className={`inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-lg rounded-full hover:from-blue-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                            style={{ animationDelay: '0.8s' }}
                        >
                            <span>View Complete Menu</span>
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </a>
                        <p className="mt-4 text-gray-600 text-sm">
                            Explore our full collection of 80+ handcrafted flavors
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section id="our-story" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`text-center mb-16 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                            Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Story</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            From a small kitchen experiment to a nationwide sensation
                        </p>
                    </div>

                    {/* Enhanced Mobile-Optimized Timeline */}
                    <div className="relative">
                        {/* Animated Timeline Line with Progress - Blue Theme */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-200 via-blue-300 to-blue-400 rounded-full">
                            {/* Progress overlay - Blue Theme */}
                            <div
                                className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700 rounded-full transition-all duration-300 ease-out shadow-lg"
                                style={{
                                    height: `${timelineProgress * 100}%`,
                                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
                                }}
                            ></div>
                        </div>

                        {milestones.map((milestone, index) => (
                            <div
                                key={milestone.year}
                                className={`timeline-milestone relative flex items-center mb-8 sm:mb-16 transition-all duration-700 ease-out ${
                                    // Mobile: center everything, Desktop: alternating sides
                                    'flex-col sm:flex-row' + (index % 2 === 0 ? ' sm:flex-row' : ' sm:flex-row-reverse')
                                } ${
                                    activeTimelineIndex >= index 
                                        ? 'opacity-100 translate-y-0 scale-100' 
                                        : 'opacity-70 translate-y-4 scale-95'
                                }`}
                            >
                                {/* Mobile: Icon above card, Desktop: Icon in center */}
                                <div className="flex flex-col items-center sm:contents">
                                    {/* Enhanced Timeline Node - Mobile Optimized */}
                                    <div className={`w-16 h-16 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-500 z-10 mb-4 sm:mb-0 ${
                                        // Mobile: relative positioning, Desktop: absolute center
                                        'relative sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2'
                                    } ${
                                        activeTimelineIndex >= index 
                                            ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-xl scale-110' 
                                            : 'bg-gradient-to-br from-gray-400 to-gray-500 shadow-lg scale-100'
                                    }`}>
                                        {/* Pulsing ring for active node - Blue Theme */}
                                        {activeTimelineIndex === index && (
                                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 animate-ping opacity-30"></div>
                                        )}

                                        {/* Completed nodes glow - Blue Theme */}
                                        {activeTimelineIndex > index && (
                                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 opacity-20 animate-pulse"></div>
                                        )}

                                        <milestone.icon className={`w-8 h-8 text-white transition-all duration-300 relative z-10 ${
                                            activeTimelineIndex >= index ? 'drop-shadow-sm' : ''
                                        }`} />
                                    </div>

                                    {/* Enhanced Content Card - Mobile Optimized */}
                                    <div className={`w-full sm:w-5/12 ${
                                        // Mobile: always centered, Desktop: alternating alignment
                                        'text-center sm:text-left' + (index % 2 === 0 ? ' sm:pr-8 sm:text-right' : ' sm:pl-8 sm:text-left')
                                    }`}>
                                        <div className={`relative bg-white p-6 rounded-2xl border transition-all duration-500 transform ${
                                            activeTimelineIndex === index 
                                                ? 'shadow-2xl border-blue-300 scale-105 bg-gradient-to-br from-white to-blue-50/30' 
                                                : 'shadow-lg border-gray-200 hover:shadow-xl hover:border-blue-200'
                                        }`}>
                                            {/* Active card glow effect - Blue Theme */}
                                            {activeTimelineIndex === index && (
                                                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-blue-500/10 to-blue-600/10 rounded-2xl animate-pulse"></div>
                                            )}

                                            <div className="relative z-10">
                                                <div className={`text-3xl font-bold mb-3 transition-colors duration-300 ${
                                                    activeTimelineIndex === index 
                                                        ? 'text-blue-600 drop-shadow-sm' 
                                                        : 'text-blue-500'
                                                }`}>
                                                    {milestone.year}
                                                </div>
                                                <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                                                    activeTimelineIndex === index 
                                                        ? 'text-gray-900' 
                                                        : 'text-gray-800'
                                                }`}>
                                                    {milestone.title}
                                                </h3>
                                                <p className={`text-base transition-colors duration-300 ${
                                                    activeTimelineIndex === index 
                                                        ? 'text-gray-700' 
                                                        : 'text-gray-600'
                                                }`}>
                                                    {milestone.description}
                                                </p>
                                            </div>

                                            {/* Animated progress indicator - Blue Theme */}
                                            {activeTimelineIndex === index && (
                                                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                                                    <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-pulse shadow-lg"></div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Empty space for desktop layout */}
                                <div className="hidden sm:block sm:w-5/12"></div>
                            </div>
                        ))}

                        {/* Timeline completion indicator - Blue Theme */}
                        {timelineProgress >= 0.95 && (
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8">
                                <div className="flex flex-col items-center space-y-2 animate-bounce">
                                    <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-lg"></div>
                                    <div className="w-3 h-3 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full shadow-md"></div>
                                    <div className="w-2 h-2 bg-gradient-to-br from-blue-300 to-blue-400 rounded-full shadow-sm"></div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section id="gallery" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`text-center mb-16 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                            Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Gallery</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Moments of joy, creativity, and milkshake magic
                        </p>
                    </div>

                    {/* Gallery Filter */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {galleryCategories.map((category) => (
                            <button
                                key={category.filter}
                                onClick={() => setActiveFilter(category.filter)}
                                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                                    activeFilter === category.filter
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                                }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>

                    {/* Gallery Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredGallery.map((item, index) => (
                            <div
                                key={item.id}
                                className={`group relative bg-gradient-to-br ${item.color} rounded-2xl p-8 h-64 flex flex-col items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                                    loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                }`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <item.icon className="w-16 h-16 mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="text-xl font-bold text-center">{item.title}</h3>
                                <div className="absolute inset-0 bg-black/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Franchise Section */}
            <section id="franchise" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`text-center mb-16 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                            Join Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Franchise</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Be part of the milkshake revolution and bring joy to your community
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        {/* Benefits */}
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-8">Why Choose Our Franchise?</h3>
                            <div className="space-y-6">
                                {benefits.map((benefit, index) => (
                                    <div
                                        key={benefit.title}
                                        className={`flex items-start space-x-4 transition-all duration-1000 ${
                                            loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                                        }`}
                                        style={{ animationDelay: `${index * 0.2}s` }}
                                    >
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <benefit.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h4>
                                            <p className="text-gray-600">{benefit.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className={`bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Get Started Today</h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Full Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="city"
                                        placeholder="Preferred City"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <select
                                    name="investment"
                                    value={formData.investment}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                >
                                    <option value="">Investment Range</option>
                                    <option value="150k-200k">$150k - $200k</option>
                                    <option value="200k-250k">$200k - $250k</option>
                                    <option value="250k-300k">$250k - $300k</option>
                                    <option value="300k+">$300k+</option>
                                </select>
                                <textarea
                                    name="message"
                                    placeholder="Tell us about your background and goals..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                ></textarea>
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-bold hover:from-blue-500 hover:to-purple-500 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    Send Application
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="mt-20">
                        <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h3>
                        <div className="max-w-4xl mx-auto space-y-4">
                            {faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className={`bg-white border border-gray-200 rounded-xl transition-all duration-1000 ${
                                        loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                    }`}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <button
                                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 rounded-xl transition-colors"
                                    >
                                        <span className="font-semibold text-gray-900">{faq.question}</span>
                                        {openFaq === index ? (
                                            <ChevronUp className="w-5 h-5 text-gray-500" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-gray-500" />
                                        )}
                                    </button>
                                    {openFaq === index && (
                                        <div className="px-6 pb-4">
                                            <p className="text-gray-600">{faq.answer}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
