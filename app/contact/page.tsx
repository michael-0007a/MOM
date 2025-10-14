'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Send } from 'lucide-react';

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
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-blue-800 mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We&apos;d love to hear from you! Whether you have a question, feedback, or just want to say hello,
            we&apos;re here to help.
          </p>
        </div>
      </section>

      {/* Contact Info and Form Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-blue-800 mb-8">
                  Get in Touch
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Have a question or need assistance? Our friendly team is here to help you
                  with anything you need. Reach out through any of these channels:
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-2xl p-6 flex items-start space-x-4 hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-800 mb-1">Email Us</h3>
                    <a
                      href="mailto:hello@makersofmilkshakes.com"
                      className="text-gray-600 hover:text-blue-800 transition-colors"
                    >
                      hello@makersofmilkshakes.com
                    </a>
                    <p className="text-sm text-gray-500 mt-1">We&apos;ll respond within 24 hours</p>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-2xl p-6 flex items-start space-x-4 hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-800 mb-1">Call Us</h3>
                    <a
                      href="tel:+15551234567"
                      className="text-gray-600 hover:text-blue-800 transition-colors"
                    >
                      +1 (555) 123-4567
                    </a>
                    <p className="text-sm text-gray-500 mt-1">Mon-Fri: 9:00 AM - 6:00 PM EST</p>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-2xl p-6 flex items-start space-x-4 hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-800 mb-1">Headquarters</h3>
                    <p className="text-gray-600">123 Shake Street</p>
                    <p className="text-gray-600">New York, NY 10001</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="font-semibold text-blue-800 mb-4 text-lg">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg"
                  >
                    <Instagram className="w-7 h-7 text-white" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg"
                  >
                    <Facebook className="w-7 h-7 text-white" />
                  </a>
                </div>
                <p className="text-sm text-gray-500 mt-3">@makersofmilkshakes</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-8 md:p-10 shadow-xl">
              <h2 className="text-2xl font-bold text-blue-800 mb-6">
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name *
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

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-800 focus:outline-none transition-colors"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-800 focus:outline-none transition-colors resize-none"
                    placeholder="Tell us what's on your mind..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-800 text-white py-4 rounded-full text-lg font-semibold hover:bg-blue-900 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <span>Send Message</span>
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-blue-800 text-center mb-8">
            Visit Our Headquarters
          </h2>

          <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl shadow-lg overflow-hidden h-96 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-blue-800 mx-auto mb-4" />
                <p className="text-xl font-bold text-blue-800 mb-2">Interactive Map</p>
                <p className="text-gray-600">123 Shake Street, New York, NY 10001</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Support Hours */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-blue-800 text-center mb-12">
            Customer Support Hours
          </h2>

          <div className="max-w-2xl mx-auto bg-blue-50 rounded-3xl p-8">
            <div className="space-y-4">
              {[
                { days: 'Monday - Friday', hours: '9:00 AM - 6:00 PM EST' },
                { days: 'Saturday', hours: '10:00 AM - 4:00 PM EST' },
                { days: 'Sunday', hours: 'Closed' },
              ].map((schedule, idx) => (
                <div key={idx} className="flex justify-between items-center py-3 border-b border-blue-200 last:border-0">
                  <span className="font-semibold text-gray-700">{schedule.days}</span>
                  <span className="text-blue-800 font-medium">{schedule.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
