"use client";

import { Heart, Blend, Users, Award, TrendingUp, Globe, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

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

  // Mobile timeline (vertical) active tracking
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const root = timelineRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>('[data-ml="true"]'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = items.indexOf(entry.target as HTMLElement);
            if (idx !== -1) setActiveIdx(idx);
          }
        });
      },
      { root: null, threshold: 0.35 }
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-pink-50 to-purple-50 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full blur-xl will-change-transform"></div>
          <div className="absolute bottom-10 right-10 w-56 h-56 bg-pink-500 rounded-full blur-xl will-change-transform"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge with optimized 3D Effect */}
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-6 border border-blue-200 will-change-transform">
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
          <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-8 md:p-16 text-center shadow-lg border border-blue-100">
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
      <section className="py-4 sm:py-8 lg:py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-800 text-center mb-5 lg:mb-16">
             Our Journey
           </h2>

          {/* Mobile/Tablet Timeline (up to lg) - Polished vertical center-line timeline */}
          <div className="lg:hidden relative">
            <div ref={timelineRef} className="relative">
              {/* Center line */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-200 via-blue-300 to-blue-200" />

              <div className="space-y-5 sm:space-y-6">
                {milestones.map((milestone, index) => {
                  const Icon = milestone.icon;
                  const isActive = index === activeIdx;

                  return (
                    <div
                      key={index}
                      data-ml="true"
                      className="relative flex flex-col items-center"
                      aria-current={isActive ? 'true' : undefined}
                    >
                      {/* Marker */}
                      <div
                        className={`z-10 w-8 h-8 rounded-full flex items-center justify-center ring-2 transition-all duration-300 ${
                          isActive
                            ? 'scale-105 ring-blue-300 bg-gradient-to-br from-blue-600 to-indigo-600 shadow'
                            : 'scale-100 ring-blue-100 bg-gradient-to-br from-blue-500 to-indigo-500 shadow-sm'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 text-white" />
                      </div>

                      {/* Connector segment to card */}
                      <div className={`w-[2px] h-1.5 rounded-full mt-1 ${isActive ? 'bg-blue-400' : 'bg-blue-300'}`} />

                      {/* Card with gradient border glow + tinted shadow */}
                      <div className={`relative w-full max-w-[84%] transition-transform duration-200`}>
                        <div
                          className={`rounded-xl p-[1px] transition-colors duration-200 ${
                            isActive
                              ? 'bg-gradient-to-b from-blue-200/60 via-blue-100/40 to-transparent'
                              : 'bg-transparent'
                          }`}
                        >
                          <article
                            className={`rounded-xl bg-white p-3 border ${
                               isActive
                                ? 'border-blue-200 shadow'
                                : 'border-blue-100 shadow-sm'
                             }`}
                             aria-label={`${milestone.year}: ${milestone.title}`}
                           >
                             {/* top notch to line */}
                            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-5 h-[2px] rounded-full bg-blue-300" />

                            <div className="text-center">
                              <div className="text-xl font-extrabold tracking-tight text-blue-700">
                                {milestone.year}
                              </div>
                              <div className="mt-0.5 text-xs font-semibold text-gray-900">{milestone.title}</div>
                              <p className="mt-1 text-gray-600 text-[11px] leading-snug">
                                {milestone.description}
                              </p>
                            </div>
                          </article>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
             </div>
           </div>

          {/* Desktop Timeline (lg and up) */}
          <div className="hidden lg:block relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>

            {/* Timeline Items */}
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              const isEven = index % 2 === 0;

              return (
                <div key={index} className="relative mb-8">
                  <div className={`flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
                    {/* Content */}
                    <div className={`w-5/12 ${isEven ? 'text-right pr-8' : 'text-left pl-8'}`}>
                      <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-blue-100 hover:-translate-y-1 relative z-10">
                        <div className={`flex items-center space-x-3 mb-4 ${isEven ? 'justify-end' : 'justify-start'}`}>
                          <div className="w-3 h-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center shadow-sm">
                            <Icon className="w-1.5 h-1.5 text-blue-800" />
                          </div>
                          <span className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-purple-800 bg-clip-text text-transparent">{milestone.year}</span>
                        </div>
                        <h3 className="text-xl font-bold text-blue-800 mb-3">{milestone.title}</h3>
                        <p className="text-gray-600 text-lg leading-relaxed">{milestone.description}</p>
                      </div>
                    </div>

                    {/* Center Icon */}
                    <div className="w-2/12 flex justify-center relative z-20">
                      <div className="w-2.5 h-2.5 bg-gradient-to-br from-blue-800 to-purple-800 rounded-full flex items-center justify-center shadow-lg ring-1 ring-white">
                        <Icon className="w-1.5 h-1.5 text-white" />
                      </div>
                    </div>

                    {/* Spacer */}
                    <div className="w-5/12"></div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 max-w-5xl mx-auto">
            {founders.map((founder, idx) => (
              <div key={idx} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 md:p-10 text-center hover:shadow-lg transition-shadow duration-300 border border-blue-100 will-change-transform hover:will-change-transform hover:-translate-y-1">
                <div className="text-3xl sm:text-5xl md:text-8xl mb-3 sm:mb-4 md:mb-6">{founder.emoji}</div>
                <h3 className="text-lg sm:text-xl md:text-3xl font-bold text-blue-800 mb-1 sm:mb-2 md:mb-3">{founder.name}</h3>
                <p className="text-blue-600 font-bold mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm md:text-lg">{founder.role}</p>
                <p className="text-gray-700 text-xs sm:text-sm md:text-lg leading-relaxed">{founder.description}</p>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
            {[
              { emoji: '🌟', title: 'Quality First', desc: 'Never compromise on ingredients or taste' },
              { emoji: '💚', title: 'Sustainability', desc: 'Eco-friendly practices in everything we do' },
              { emoji: '🤝', title: 'Community', desc: 'Supporting local suppliers and giving back' }
            ].map((value, idx) => (
              <div key={idx} className="bg-white rounded-lg sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 md:p-10 text-center shadow-md hover:shadow-lg transition-shadow duration-300 border border-blue-100 will-change-transform hover:will-change-transform hover:-translate-y-1">
                <div className="text-3xl sm:text-4xl md:text-7xl mb-3 sm:mb-4 md:mb-6">{value.emoji}</div>
                <h3 className="text-base sm:text-lg md:text-2xl font-bold text-blue-800 mb-1 sm:mb-2 md:mb-3">{value.title}</h3>
                <p className="text-gray-700 text-xs sm:text-sm md:text-lg leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}