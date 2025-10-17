'use client';

import { Heart, Blend, Users, Award, TrendingUp, Globe, Sparkles } from 'lucide-react';

export default function OurStory() {
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

  const founders = [
    {
      name: 'Sarah Johnson',
      role: 'Co-Founder & Chief Shake Officer',
      description: 'With a background in culinary arts, Sarah brings creativity and innovation to every recipe.',
      emoji: '👩‍🍳'
    },
    {
      name: 'Mike Chen',
      role: 'Co-Founder & Operations Director',
      description: 'Mike brings business expertise and passion for milkshakes to make this dream a reality.',
      emoji: '👨‍💼'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-pink-50 to-purple-50 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-500 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge with 3D Effect */}
          <div className="inline-flex items-center space-x-2 glass-3d badge-3d px-6 py-3 rounded-full shadow-lg mb-6 border-2 border-blue-200">
            <Sparkles className="w-5 h-5 text-pink-500" />
            <span className="text-blue-800 font-semibold">Since 2018</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-blue-800 mb-6">
            Our Story
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-medium">
            Every great shake has a story. Here&apos;s ours—a journey of passion, perseverance,
            and a whole lot of deliciousness.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-8 md:p-16 text-center shadow-xl border-4 border-blue-100">
            <div className="text-6xl mb-6">🎯</div>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6">Our Mission</h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
              To bring joy to every sip and create moments of happiness through our handcrafted milkshakes.
              We believe in using only the finest ingredients, treating every customer like family,
              and making the world a sweeter place, one shake at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-800 text-center mb-16">
            Our Journey
          </h2>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 hidden lg:block"></div>

            {/* Timeline Items */}
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              const isEven = index % 2 === 0;

              return (
                <div key={index} className="relative mb-12 md:mb-20">
                  <div className={`flex flex-col lg:flex-row items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                    {/* Content */}
                    <div className={`w-full lg:w-5/12 ${isEven ? 'lg:text-right lg:pr-12' : 'lg:text-left lg:pl-12'}`}>
                      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-blue-100">
                        <div className={`flex items-center space-x-3 mb-4 ${isEven ? 'lg:justify-end' : 'lg:justify-start'} justify-start`}>
                          <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center shadow-md">
                            <Icon className="w-7 h-7 md:w-8 md:h-8 text-blue-800" />
                          </div>
                          <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-800 to-purple-800 bg-clip-text text-transparent">{milestone.year}</span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-blue-800 mb-3">{milestone.title}</h3>
                        <p className="text-gray-600 text-base md:text-lg leading-relaxed">{milestone.description}</p>
                      </div>
                    </div>

                    {/* Center Icon */}
                    <div className="hidden lg:flex w-2/12 justify-center">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-800 to-purple-800 rounded-full flex items-center justify-center shadow-xl z-10 ring-4 ring-white">
                        <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                      </div>
                    </div>

                    {/* Spacer */}
                    <div className="hidden lg:block w-5/12"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-800 text-center mb-12">
            Meet the Founders
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {founders.map((founder, idx) => (
              <div key={idx} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 md:p-10 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-blue-100">
                <div className="text-7xl md:text-8xl mb-6">{founder.emoji}</div>
                <h3 className="text-2xl md:text-3xl font-bold text-blue-800 mb-3">{founder.name}</h3>
                <p className="text-blue-600 font-bold mb-4 text-base md:text-lg">{founder.role}</p>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">{founder.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-800 text-center mb-12">
            Our Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { emoji: '🌟', title: 'Quality First', desc: 'Never compromise on ingredients or taste' },
              { emoji: '💚', title: 'Sustainability', desc: 'Eco-friendly practices in everything we do' },
              { emoji: '🤝', title: 'Community', desc: 'Supporting local suppliers and giving back' }
            ].map((value, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-8 md:p-10 text-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-blue-100">
                <div className="text-6xl md:text-7xl mb-6">{value.emoji}</div>
                <h3 className="text-xl md:text-2xl font-bold text-blue-800 mb-3">{value.title}</h3>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
