'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Send, MessageCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for contacting us! We will get back to you within 24 hours.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
          {/* Badge with 3D Effect */}
          <div className="inline-flex items-center space-x-2 glass-3d badge-3d px-6 py-3 rounded-full shadow-lg mb-6 border-2 border-blue-200">
            <MessageCircle className="w-5 h-5 text-blue-500" />
            <span className="text-blue-800 font-semibold">We&apos;re Here to Help</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-blue-800 mb-6">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-medium">
            We&apos;d love to hear from you! Whether you have a question, feedback, or just want to say hello,
            we&apos;re here to help.
          </p>
        </div>
      </section>

      {/* Contact Info and Form Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-8">
                  Get in Touch
                </h2>
                <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                  Have a question or need assistance? Our friendly team is here to help you
                  with anything you need. Reach out through any of these channels:
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 md:p-8 flex items-start space-x-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-blue-100">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-800 to-purple-800 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Mail className="w-7 h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-800 mb-2 text-lg md:text-xl">Email Us</h3>
                    <a
                      href="mailto:hello@makersofmilkshakes.com"
                      className="text-gray-700 hover:text-blue-800 transition-colors text-base md:text-lg font-medium"
                    >
                      hello@makersofmilkshakes.com
                    </a>
                    <p className="text-sm md:text-base text-gray-600 mt-2">We&apos;ll respond within 24 hours</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 md:p-8 flex items-start space-x-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-blue-100">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-800 to-purple-800 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Phone className="w-7 h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-800 mb-2 text-lg md:text-xl">Call Us</h3>
                    <a
                      href="tel:+15551234567"
                      className="text-gray-700 hover:text-blue-800 transition-colors text-base md:text-lg font-medium"
                    >
                      +1 (555) 123-4567
                    </a>
                    <p className="text-sm md:text-base text-gray-600 mt-2">Mon-Fri: 9:00 AM - 6:00 PM EST</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 md:p-8 flex items-start space-x-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-blue-100">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-800 to-purple-800 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <MapPin className="w-7 h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-800 mb-2 text-lg md:text-xl">Headquarters</h3>
                    <p className="text-gray-700 text-base md:text-lg">123 Shake Street</p>
                    <p className="text-gray-700 text-base md:text-lg">New York, NY 10001</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border-2 border-blue-100">
                <h3 className="font-bold text-blue-800 mb-4 text-xl md:text-2xl">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-800 to-purple-800 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-md"
                  >
                    <Instagram className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-800 to-purple-800 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-md"
                  >
                    <Facebook className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-6 md:p-10 shadow-2xl border-2 border-blue-100">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6">
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-base md:text-lg">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 md:py-4 rounded-xl border-2 border-gray-200 focus:border-blue-800 focus:outline-none transition-colors text-base md:text-lg"
                    placeholder="Your name"
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
                    className="w-full px-4 py-3 md:py-4 rounded-xl border-2 border-gray-200 focus:border-blue-800 focus:outline-none transition-colors text-base md:text-lg"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-base md:text-lg">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 md:py-4 rounded-xl border-2 border-gray-200 focus:border-blue-800 focus:outline-none transition-colors text-base md:text-lg"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-base md:text-lg">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 md:py-4 rounded-xl border-2 border-gray-200 focus:border-blue-800 focus:outline-none transition-colors text-base md:text-lg"
                    placeholder="Tell us what's on your mind..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-800 to-purple-800 text-white rounded-full font-bold text-lg md:text-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <span>Send Message</span>
                  <Send className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
