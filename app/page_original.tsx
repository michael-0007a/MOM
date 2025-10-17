'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Sparkles, Heart, Blend, Users, Award, TrendingUp, Globe, Search, ChevronDown, ChevronUp, DollarSign, Milk, Cookie, IceCream, Cherry, Coffee, Star, Zap, Droplets } from 'lucide-react';

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
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
  }, []);

  // Menu data
  const categories = ['All', 'Classic', 'Premium', 'Chocolate', 'Fruity', 'Seasonal'];

  const menuItems = [
    {
      id: 1,
      name: 'Classic Vanilla',
      category: 'Classic',
      description: 'Rich and creamy vanilla blended to perfection',
      price: '$5.99',
      icon: Milk,
    },
    {
      id: 2,
      name: 'Strawberry Dream',
      category: 'Fruity',
      description: 'Fresh strawberries with a hint of cream',
      price: '$6.49',
      icon: Cherry,
    },
    {
      id: 3,
      name: 'Chocolate Heaven',
      category: 'Chocolate',
      description: 'Triple chocolate indulgence',
      price: '$6.99',
      icon: Coffee,
    },
    {
      id: 4,
      name: 'Cookies & Cream',
      category: 'Classic',
      description: 'Crushed Oreos in vanilla ice cream',
      price: '$6.99',
      icon: Cookie,
    },
    {
      id: 5,
      name: 'Mango Tango',
      category: 'Fruity',
      description: 'Tropical mango with a tangy twist',
      price: '$6.49',
      icon: Cherry,
    },
    {
      id: 6,
      name: 'Salted Caramel',
      category: 'Premium',
      description: 'Sweet and salty perfection',
      price: '$7.49',
      icon: IceCream,
    },
    {
      id: 7,
      name: 'Mint Chocolate Chip',
      category: 'Chocolate',
      description: 'Refreshing mint with chocolate chips',
      price: '$6.99',
      icon: Coffee,
    },
    {
      id: 8,
      name: 'Peanut Butter Cup',
      category: 'Premium',
      description: 'Reese\'s lovers favorite',
      price: '$7.49',
      icon: Cookie,
    },
    {
      id: 9,
      name: 'Banana Split',
      category: 'Classic',
      description: 'Classic banana split in a shake',
      price: '$6.49',
      icon: Cherry,
    },
    {
      id: 10,
      name: 'Berry Blast',
      category: 'Fruity',
      description: 'Mixed berries bursting with flavor',
      price: '$6.49',
      icon: Cherry,
    },
    {
      id: 11,
      name: 'Dark Chocolate Truffle',
      category: 'Premium',
      description: 'Rich dark chocolate with truffle pieces',
      price: '$7.99',
      icon: Coffee,
    },
    {
      id: 12,
      name: 'Pumpkin Spice',
      category: 'Seasonal',
      description: 'Fall favorite with real pumpkin',
      price: '$6.99',
      icon: IceCream,
    },
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Timeline data
  const milestones = [
    {
      year: '2018',
      icon: Heart,
      title: 'The Beginning',
      description: 'Two friends with a passion for milkshakes decided to create something magical in a small kitchen.',
    },
    {
      year: '2019',
      icon: Blend,
      title: 'First Recipe',
      description: 'After 100+ experiments, we perfected our signature blend that customers fell in love with.',
    },
    {
      year: '2020',
      icon: Users,
      title: 'Growing Family',
      description: 'Expanded to 5 locations and grew our team to 50+ passionate shake makers.',
    },
    {
      year: '2021',
      icon: Award,
      title: 'Award Winning',
      description: 'Won Best Milkshake Brand award and featured in major food magazines.',
    },
    {
      year: '2023',
      icon: TrendingUp,
      title: 'Going Viral',
      description: 'Our unique flavors went viral on social media, reaching millions of shake lovers.',
    },
    {
      year: '2025',
      icon: Globe,
      title: 'National Expansion',
      description: 'Now serving happiness in 50+ cities with plans for international expansion.',
    },
  ];

  // Gallery data
  const galleryItems = [
    { id: 1, type: 'milkshake', icon: Milk, title: 'Classic Collection', color: 'from-blue-400 to-blue-600' },
    { id: 2, type: 'customer', icon: Users, title: 'Happy Customers', color: 'from-pink-400 to-pink-600' },
    { id: 3, type: 'milkshake', icon: Cherry, title: 'Berry Delights', color: 'from-red-400 to-red-600' },
    { id: 4, type: 'outlet', icon: Award, title: 'Our Outlets', color: 'from-purple-400 to-purple-600' },
    { id: 5, type: 'milkshake', icon: Coffee, title: 'Chocolate Heaven', color: 'from-amber-600 to-amber-800' },
    { id: 6, type: 'customer', icon: Sparkles, title: 'Celebrations', color: 'from-yellow-400 to-yellow-600' },
    { id: 7, type: 'milkshake', icon: Cherry, title: 'Tropical Paradise', color: 'from-orange-400 to-orange-600' },
    { id: 8, type: 'outlet', icon: TrendingUp, title: 'Store Ambiance', color: 'from-cyan-400 to-cyan-600' },
    { id: 9, type: 'milkshake', icon: Cookie, title: 'Cookie Crunch', color: 'from-stone-400 to-stone-600' },
    { id: 10, type: 'customer', icon: Heart, title: 'Family Time', color: 'from-green-400 to-green-600' },
    { id: 11, type: 'milkshake', icon: IceCream, title: 'Birthday Specials', color: 'from-indigo-400 to-indigo-600' },
    { id: 12, type: 'outlet', icon: Globe, title: 'Grand Opening', color: 'from-violet-400 to-violet-600' },
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
      {/* Milkshake Lab Hero Section - Light Theme */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Light Background with Subtle Grid */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50">
          {/* Subtle Grid Overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(43, 145, 203, 0.15) 1px, transparent 1px),
                linear-gradient(90deg, rgba(43, 145, 203, 0.15) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
          ></div>

          {/* Floating Light Particles */}
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1.5 h-1.5 bg-[#2b91cb]/40 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${4 + Math.random() * 3}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              ></div>
            ))}
          </div>

          {/* Soft Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/40 via-transparent to-indigo-50/40"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left Side - Text Content */}
            <div className={`space-y-8 transition-all duration-1000 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              {/* Lab Badge */}
              <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border border-[#2b91cb]/20 shadow-lg">
                <Zap className="w-5 h-5 text-[#2b91cb]" />
                <span className="text-[#2b91cb] manrope-semibold">Scientific Precision</span>
              </div>

              {/* Main Heading */}
              <div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl notable-regular text-gray-900 mb-6 leading-tight">
                  The #1
                  <span className="block bg-gradient-to-r from-[#2b91cb] via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Milkshake Lab
                  </span>
                  <span className="block text-4xl sm:text-5xl lg:text-6xl syne-regular mt-2 text-gray-700">
                    for Crafting Perfect Flavors
                  </span>
                </h1>

                <p className="text-xl text-gray-600 mb-8 manrope-regular leading-relaxed">
                  Makers of Milkshakes blends science and sweetness — every sip precision-crafted for happiness.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group inline-flex items-center space-x-3 bg-[#2b91cb] text-white px-8 py-4 rounded-full text-lg syne-bold hover:bg-[#2475a3] transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
                  <span>Order a Shake</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>

                <button className="inline-flex items-center space-x-3 bg-white border-2 border-[#2b91cb] text-[#2b91cb] px-8 py-4 rounded-full text-lg syne-bold hover:bg-[#2b91cb] hover:text-white transform hover:scale-105 transition-all duration-300 shadow-lg">
                  <span>Watch the Process</span>
                  <Sparkles className="w-6 h-6" />
                </button>
              </div>

              {/* Lab Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                {[
                  { value: '50+', label: 'Lab Formulas', icon: Droplets },
                  { value: '99.9%', label: 'Precision Rate', icon: Star },
                  { value: '1M+', label: 'Happy Tests', icon: Heart }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#2b91cb] to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 notable-regular">{stat.value}</div>
                    <div className="text-sm text-gray-600 manrope-regular">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Enhanced 3D Floating Lab Interface */}
            <div className="relative h-[700px] perspective-1000">

              {/* Central Shake Glass - Enhanced */}
              <div
                className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
                style={{ transform: 'translateX(-50%) translateY(-50%) translateZ(20px)' }}
              >
                <div className="relative">
                  {/* Glass Container */}
                  <div className="w-36 h-52 bg-gradient-to-b from-white/80 via-blue-50/60 to-[#2b91cb]/20 rounded-3xl border-4 border-[#2b91cb]/30 backdrop-blur-md shadow-2xl">
                    {/* Milkshake Fill Animation */}
                    <div
                      className="absolute bottom-4 left-4 right-4 bg-gradient-to-t from-[#2b91cb] via-blue-400 to-pink-300 rounded-2xl shadow-inner"
                      style={{
                        height: '65%',
                        animation: 'fillShake 4s ease-in-out infinite'
                      }}
                    ></div>
                    {/* Straw */}
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-10 bg-gradient-to-b from-red-400 to-red-500 rounded-full shadow-md"></div>
                    {/* Foam/Bubbles */}
                    <div className="absolute top-8 left-8 w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                    <div className="absolute top-12 right-8 w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce delay-300"></div>
                    <div className="absolute top-16 left-6 w-1 h-1 bg-white/50 rounded-full animate-bounce delay-500"></div>
                  </div>
                  {/* Outer Glow Ring */}
                  <div className="absolute -top-6 -left-6 -right-6 -bottom-6 border-2 border-[#2b91cb]/20 rounded-3xl animate-pulse shadow-lg"></div>
                  {/* Base Shadow */}
                  <div className="absolute -bottom-2 left-2 right-2 h-4 bg-gray-900/10 rounded-full blur-md"></div>
                </div>
              </div>

              {/* Enhanced Recipe Panel - Top Left */}
              <div
                className={`absolute top-8 left-4 w-72 transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 -translate-y-10 -rotate-12'}`}
                style={{
                  transform: 'rotateX(8deg) rotateY(-12deg) translateZ(30px)',
                  transformStyle: 'preserve-3d'
                }}
              >
                <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-[#2b91cb]/20 shadow-2xl hover:shadow-3xl transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-[#2b91cb] rounded-lg flex items-center justify-center">
                      <Blend className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg syne-semibold text-gray-900">Active Recipe</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Vanilla Extract</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="w-4/5 h-full bg-gradient-to-r from-[#2b91cb] to-blue-400 rounded-full animate-pulse"></div>
                        </div>
                        <span className="text-[#2b91cb] syne-medium">80%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Fresh Cream</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="w-3/5 h-full bg-gradient-to-r from-pink-400 to-pink-600 rounded-full animate-pulse delay-300"></div>
                        </div>
                        <span className="text-pink-600 syne-medium">60%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Ice Blend</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse delay-500"></div>
                        </div>
                        <span className="text-cyan-600 syne-medium">100%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Temperature Control - Top Right */}
              <div
                className={`absolute top-12 right-8 transition-all duration-1000 delay-700 ${loaded ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 -translate-y-10 rotate-12'}`}
                style={{
                  transform: 'rotateX(-8deg) rotateY(12deg) translateZ(25px)',
                  transformStyle: 'preserve-3d'
                }}
              >
                <div className="bg-white/90 backdrop-blur-lg rounded-xl p-4 border border-[#2b91cb]/20 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center space-x-2 mb-3">
                    <Zap className="w-5 h-5 text-[#2b91cb]" />
                    <span className="text-sm syne-semibold text-gray-900">Temperature</span>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl syne-bold text-[#2b91cb] mb-1">-2°C</div>
                    <div className="text-xs text-gray-500">Optimal Chill</div>
                  </div>
                </div>
              </div>

              {/* Quality Meter - Bottom Right */}
              <div
                className={`absolute bottom-16 right-12 transition-all duration-1000 delay-900 ${loaded ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-10 -rotate-12'}`}
                style={{
                  transform: 'rotateX(12deg) rotateY(-8deg) translateZ(35px)',
                  transformStyle: 'preserve-3d'
                }}
              >
                <div className="bg-white/90 backdrop-blur-lg rounded-xl p-4 border border-[#2b91cb]/20 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center space-x-2 mb-3">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm syne-semibold text-gray-900">Quality</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full animate-pulse"></div>
                    </div>
                    <span className="text-xs syne-bold text-yellow-600">100%</span>
                  </div>
                </div>
              </div>

              {/* Floating Flavor Molecules */}
              {[
                { icon: Droplets, pos: 'top-1/3 left-8', color: 'from-blue-400 to-cyan-500', delay: 'delay-1000' },
                { icon: Sparkles, pos: 'bottom-1/3 left-16', color: 'from-purple-400 to-pink-500', delay: 'delay-1200' },
                { icon: Heart, pos: 'top-2/3 right-20', color: 'from-red-400 to-rose-500', delay: 'delay-1400' }
              ].map((molecule, idx) => (
                <div
                  key={idx}
                  className={`absolute ${molecule.pos} w-10 h-10 bg-gradient-to-br ${molecule.color} rounded-full flex items-center justify-center shadow-lg hover:scale-125 transition-all duration-300 cursor-pointer ${molecule.delay} ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
                  style={{
                    animation: 'float 6s ease-in-out infinite',
                    animationDelay: `${idx * 0.5}s`
                  }}
                >
                  <molecule.icon className="w-5 h-5 text-white" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CSS for animations */}
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes fillShake {
            0%, 100% { height: 65%; }
            50% { height: 70%; }
          }
        `}</style>
      </section>

      {/* Continue with rest of the sections... */}
    </div>
  );
}
