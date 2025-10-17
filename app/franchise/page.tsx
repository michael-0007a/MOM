'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, DollarSign, Users, TrendingUp, Award, Rocket } from 'lucide-react';

export default function Franchise() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    investment: '',
    message: '',
  });

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
      answer: 'You\'ll receive full support including site selection, outlet design, staff training, marketing materials, ongoing operational support, and access to our supply chain.',
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
    // Handle form submission
    alert('Thank you for your interest! We will contact you within 24 hours.');
    setFormData({ name: '', email: '', phone: '', city: '', investment: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-500 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-blue-800 mb-6">
            Start Your Own Franchise
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-medium">
            Join the Makers of Milkshakes family and bring joy to your community.
            Be part of our growing success story!
          </p>

          {/* Badge with 3D Effect */}
          <div className="inline-flex items-center space-x-2 glass-3d badge-3d px-6 py-3 rounded-full shadow-lg mb-6 border-2 border-blue-200">
            <Rocket className="w-5 h-5 text-blue-500" />
            <span className="text-blue-800 font-semibold">50+ Successful Locations</span>
          </div>

          {/* Quick Stats with 3D Cards */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 perspective-1000">
            <div className="card-3d card-3d-shadow glass-3d px-6 py-3 rounded-full border border-blue-100">
              <span className="text-blue-600 font-bold text-lg">18-24 months</span>
              <span className="text-gray-600 text-sm ml-2">ROI</span>
            </div>
            <div className="card-3d card-3d-shadow glass-3d px-6 py-3 rounded-full border border-blue-100">
              <span className="text-blue-600 font-bold text-lg">$150K+</span>
              <span className="text-gray-600 text-sm ml-2">Investment</span>
            </div>
            <div className="card-3d card-3d-shadow glass-3d px-6 py-3 rounded-full border border-blue-100">
              <span className="text-blue-600 font-bold text-lg">Full Support</span>
              <span className="text-gray-600 text-sm ml-2">Training</span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-800 text-center mb-12">
            Why Choose Our Franchise?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div key={idx} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-6 md:p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-blue-100">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-800 to-purple-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                    <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-blue-800 mb-3">{benefit.title}</h3>
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Investment Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-purple-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-800 text-center mb-12">
            Investment Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border-2 border-blue-100">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-2xl md:text-3xl font-bold text-blue-800 mb-3">Initial Investment</h3>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
                Starting from <span className="font-bold text-blue-800 text-xl md:text-2xl">$150,000</span>
              </p>
              <p className="text-gray-600 text-sm md:text-base">
                Includes franchise fee, equipment, inventory, and setup
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border-2 border-blue-100">
              <div className="text-5xl mb-4">📈</div>
              <h3 className="text-2xl md:text-3xl font-bold text-blue-800 mb-3">Expected ROI</h3>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
                Return in <span className="font-bold text-blue-800 text-xl md:text-2xl">18-24 months</span>
              </p>
              <p className="text-gray-600 text-sm md:text-base">
                Based on average performance across all outlets
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border-2 border-blue-100">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-2xl md:text-3xl font-bold text-blue-800 mb-3">Royalty Fee</h3>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
                Only <span className="font-bold text-blue-800 text-xl md:text-2xl">5%</span> of gross sales
              </p>
              <p className="text-gray-600 text-sm md:text-base">
                Competitive rates in the industry
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border-2 border-blue-100">
              <div className="text-5xl mb-4">📢</div>
              <h3 className="text-2xl md:text-3xl font-bold text-blue-800 mb-3">Marketing Fee</h3>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
                Just <span className="font-bold text-blue-800 text-xl md:text-2xl">2%</span> contribution
              </p>
              <p className="text-gray-600 text-sm md:text-base">
                National campaigns to boost your sales
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-800 text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-blue-100">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 md:px-8 py-5 md:py-6 text-left flex items-center justify-between"
                >
                  <span className="text-lg md:text-xl font-bold text-blue-800 pr-4">{faq.question}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-6 h-6 md:w-7 md:h-7 text-blue-800 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-6 h-6 md:w-7 md:h-7 text-blue-800 flex-shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-6 md:px-8 pb-5 md:pb-6">
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-purple-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-800 text-center mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg md:text-xl text-gray-700 text-center mb-12 font-medium">
            Fill out the form below and we&apos;ll contact you within 24 hours
          </p>

          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 md:p-10 shadow-2xl border-2 border-blue-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-base md:text-lg">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-800 focus:outline-none transition-colors text-base md:text-lg"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-base md:text-lg">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-800 focus:outline-none transition-colors text-base md:text-lg"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-base md:text-lg">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-800 focus:outline-none transition-colors text-base md:text-lg"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-base md:text-lg">City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-800 focus:outline-none transition-colors text-base md:text-lg"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2 text-base md:text-lg">Investment Capacity *</label>
                <select
                  name="investment"
                  value={formData.investment}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-800 focus:outline-none transition-colors text-base md:text-lg"
                >
                  <option value="">Select range</option>
                  <option value="150k-250k">$150,000 - $250,000</option>
                  <option value="250k-350k">$250,000 - $350,000</option>
                  <option value="350k+">$350,000+</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2 text-base md:text-lg">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-800 focus:outline-none transition-colors text-base md:text-lg"
                  placeholder="Tell us about your franchise plans..."
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-8 px-8 py-4 bg-gradient-to-r from-blue-800 to-purple-800 text-white rounded-full font-bold text-lg md:text-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              Submit Application
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
