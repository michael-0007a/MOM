'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, DollarSign, Users, TrendingUp, Award } from 'lucide-react';

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
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-blue-800 mb-6">
            Start Your Own Franchise
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join the Makers of Milkshakes family and bring joy to your community.
            Be part of our growing success story!
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-blue-800 text-center mb-12">
            Why Choose Our Franchise?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={idx}
                  className="bg-blue-50 rounded-3xl p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
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
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-blue-800 text-center mb-8">
              Apply Now
            </h2>

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
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-blue-800 text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-blue-50 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
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
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join our successful franchise family and build your future today!
          </p>
          <a
            href="mailto:franchise@makersofmilkshakes.com"
            className="inline-block bg-white text-blue-800 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors shadow-xl"
          >
            Contact Franchise Team
          </a>
        </div>
      </section>
    </div>
  );
}

