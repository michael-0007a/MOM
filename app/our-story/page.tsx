'use client';

import { Heart, Blend, Users, Award, TrendingUp, Globe } from 'lucide-react';

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
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-blue-800 mb-6">
            Our Story
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every great shake has a story. Here&apos;s ours—a journey of passion, perseverance,
            and a whole lot of deliciousness.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              To bring joy to every sip and create moments of happiness through our handcrafted milkshakes.
              We believe in using only the finest ingredients, treating every customer like family,
              and making the world a sweeter place, one shake at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-blue-800 text-center mb-16">
            Our Journey
          </h2>

          <div className="relative">
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
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{milestone.title}</h3>
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
      </section>

      {/* Founders Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-blue-800 text-center mb-12">
            Meet the Founders
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {founders.map((founder, idx) => (
              <div key={idx} className="bg-blue-50 rounded-3xl p-8 text-center hover:shadow-xl transition-all duration-300">
                <div className="text-6xl mb-4">{founder.emoji}</div>
                <h3 className="text-2xl font-bold text-blue-800 mb-2">{founder.name}</h3>
                <p className="text-blue-600 font-semibold mb-3">{founder.role}</p>
                <p className="text-gray-600">{founder.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-blue-800 text-center mb-12">
            Our Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { emoji: '🌟', title: 'Quality First', desc: 'Never compromise on ingredients or taste' },
              { emoji: '💚', title: 'Sustainability', desc: 'Eco-friendly practices in everything we do' },
              { emoji: '🤝', title: 'Community', desc: 'Supporting local suppliers and giving back' }
            ].map((value, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition-all duration-300">
                <div className="text-5xl mb-4">{value.emoji}</div>
                <h3 className="text-xl font-bold text-blue-800 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

