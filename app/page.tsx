'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Sparkles, Heart, Blend, Users, Award, TrendingUp, Globe, Search, ChevronDown, ChevronUp, DollarSign, Milk, Cookie, IceCream, Cherry, Coffee } from 'lucide-react';

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
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-white">
        {/* Animated Clouds */}
        <div className={`absolute top-20 left-10 w-32 h-20 cloud transition-all duration-1000 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}></div>
        <div className={`absolute top-40 right-20 w-40 h-24 cloud transition-all duration-1000 delay-200 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}></div>
        <div className={`absolute bottom-32 left-20 w-36 h-22 cloud transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}></div>
        <div className={`absolute bottom-40 right-10 w-28 h-18 cloud transition-all duration-1000 delay-400 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative z-10">
          <div className={`transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Sparkle Icon */}
            <div className="flex justify-center mb-6">
              <Sparkles className="w-12 h-12 text-blue-800 animate-pulse" />
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-blue-800 mb-6">
              Sip the Joy.
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Taste the Magic.
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Crafted with love, one shake at a time.
            </p>

            {/* Animated Milkshake */}
            <div className={`my-12 flex justify-center transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
              <div className="relative animate-float">
                {/* Milkshake Cup */}
                <div className="w-64 h-80 bg-gradient-to-b from-blue-600 to-blue-800 rounded-b-[3rem] shadow-2xl relative flex items-center justify-center">
                  <Milk className="w-32 h-32 text-white" />

                  {/* Whipped Cream Top */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-56 h-20">
                    <div className="w-full h-full bg-white rounded-full shadow-lg"></div>
                    <div className="absolute top-2 left-1/4 w-20 h-16 bg-white rounded-full"></div>
                    <div className="absolute top-2 right-1/4 w-20 h-16 bg-white rounded-full"></div>
                  </div>

                  {/* Straw */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 translate-y-[-100%] w-4 h-32 bg-white rounded-full shadow-md"></div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-blue-100 rounded-full opacity-50 animate-pulse"></div>
                <div className="absolute -bottom-8 -left-12 w-32 h-32 bg-blue-100 rounded-full opacity-50 animate-pulse delay-75"></div>
              </div>
            </div>

            {/* CTA Button */}
            <a
              href="#menu"
              className="inline-flex items-center space-x-2 bg-blue-800 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-900 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>View Menu</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-blue-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Milk, title: 'Premium Ingredients', desc: 'Only the finest and freshest ingredients in every shake' },
              { icon: Heart, title: 'Made with Love', desc: 'Each shake is crafted with care and passion' },
              { icon: Sparkles, title: 'Magical Flavors', desc: 'Unique combinations that delight your taste buds' }
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-8 text-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <Icon className="w-16 h-16 text-blue-800 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-blue-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="our-story" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-blue-800 mb-6">Our Story</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every great shake has a story. Here&apos;s ours—a journey of passion, perseverance,
              and a whole lot of deliciousness.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-blue-50 rounded-3xl p-12 text-center mb-20">
            <h3 className="text-3xl font-bold text-blue-800 mb-6">Our Mission</h3>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              To bring joy to every sip and create moments of happiness through our handcrafted milkshakes.
              We believe in using only the finest ingredients, treating every customer like family,
              and making the world a sweeter place, one shake at a time.
            </p>
          </div>

          {/* Timeline */}
          <div className="mb-20">
            <h3 className="text-4xl font-bold text-blue-800 text-center mb-16">Our Journey</h3>

            <div className="relative max-w-5xl mx-auto">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 hidden md:block"></div>

              {/* Timeline Items */}
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon;
                const isEven = index % 2 === 0;

                return (
                  <div key={index} className="relative mb-12 md:mb-20">
                    <div className={`flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                      {/* Content */}
                      <div className={`w-full md:w-5/12 ${isEven ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                          <div className={`flex items-center space-x-3 mb-3 ${isEven ? 'md:justify-end' : 'md:justify-start'} justify-start`}>
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                              <Icon className="w-6 h-6 text-blue-800" />
                            </div>
                            <span className="text-2xl font-bold text-blue-800">{milestone.year}</span>
                          </div>
                          <h4 className="text-xl font-bold text-gray-800 mb-2">{milestone.title}</h4>
                          <p className="text-gray-600">{milestone.description}</p>
                        </div>
                      </div>

                      {/* Center Icon */}
                      <div className="hidden md:flex w-2/12 justify-center">
                        <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center shadow-lg z-10">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                      </div>

                      {/* Spacer */}
                      <div className="hidden md:block w-5/12"></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Values */}
          <div>
            <h3 className="text-4xl font-bold text-blue-800 text-center mb-12">Our Values</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Sparkles, title: 'Quality First', desc: 'Never compromise on ingredients or taste' },
                { icon: Globe, title: 'Sustainability', desc: 'Eco-friendly practices in everything we do' },
                { icon: Users, title: 'Community', desc: 'Supporting local suppliers and giving back' }
              ].map((value, idx) => {
                const Icon = value.icon;
                return (
                  <div key={idx} className="bg-blue-50 rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition-all duration-300">
                    <Icon className="w-12 h-12 text-blue-800 mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-blue-800 mb-2">{value.title}</h4>
                    <p className="text-gray-600">{value.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-blue-800 mb-6">Our Menu</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our delicious selection of handcrafted milkshakes,
              each made with premium ingredients and lots of love.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-12">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for a shake..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-gray-200 focus:border-blue-800 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-blue-800 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-800'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Grid */}
          {filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-600">No shakes found. Try a different search!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-3xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
                  >
                    {/* Icon */}
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-10 h-10 text-blue-800" />
                    </div>

                    {/* Category Badge */}
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full mb-3">
                      {item.category}
                    </span>

                    {/* Name */}
                    <h3 className="text-xl font-bold text-blue-800 mb-2">
                      {item.name}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4">
                      {item.description}
                    </p>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-blue-800">
                        {item.price}
                      </span>
                      <button className="bg-blue-800 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-900 transition-colors">
                        Order
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-blue-800 mb-6">Gallery</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our delicious creations, happy moments, and vibrant outlets through our visual journey.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {galleryCategories.map((category) => (
              <button
                key={category.filter}
                onClick={() => setActiveFilter(category.filter)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  activeFilter === category.filter
                    ? 'bg-blue-800 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-800'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGallery.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="group relative aspect-square rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} transform group-hover:scale-110 transition-transform duration-500`}></div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white">
                    <Icon className="w-20 h-20 mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500" />
                    <h3 className="text-xl font-bold text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.title}
                    </h3>
                  </div>

                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Franchise Section */}
      <section id="franchise" className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-blue-800 mb-6">Start Your Own Franchise</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join the Makers of Milkshakes family and bring joy to your community.
              Be part of our growing success story!
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-800 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>

          {/* Application Form */}
          <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-16">
            <h3 className="text-3xl font-bold text-blue-800 text-center mb-8">
              Apply Now
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-800 focus:outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-800 focus:outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-800 focus:outline-none transition-colors"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
                    Preferred City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-800 focus:outline-none transition-colors"
                    placeholder="New York"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="investment" className="block text-sm font-semibold text-gray-700 mb-2">
                  Investment Capacity *
                </label>
                <select
                  id="investment"
                  name="investment"
                  required
                  value={formData.investment}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-800 focus:outline-none transition-colors"
                >
                  <option value="">Select investment range</option>
                  <option value="150k-200k">$150,000 - $200,000</option>
                  <option value="200k-250k">$200,000 - $250,000</option>
                  <option value="250k-300k">$250,000 - $300,000</option>
                  <option value="300k+">$300,000+</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-800 focus:outline-none transition-colors"
                  placeholder="Tell us about your background and why you want to join us..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-800 text-white py-4 rounded-full text-lg font-semibold hover:bg-blue-900 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Submit Application
              </button>
            </form>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-4xl font-bold text-blue-800 text-center mb-12">
              Frequently Asked Questions
            </h3>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left"
                  >
                    <span className="font-semibold text-blue-800 pr-4">{faq.question}</span>
                    {openFaq === idx ? (
                      <ChevronUp className="w-5 h-5 text-blue-800 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-blue-800 flex-shrink-0" />
                    )}
                  </button>

                  {openFaq === idx && (
                    <div className="px-6 pb-5">
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
