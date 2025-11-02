'use client';

import { Mail, Phone, MapPin, Instagram, Facebook, MessageCircle, Twitter } from 'lucide-react';
import { CONTACT, SOCIAL, LINKS } from '@/lib/siteConfig';

export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#e6f3fb] via-[#eef2ff] to-[#fdeaf2] py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#2b91cb] rounded-full blur-3xl"></div>
          <div className="absolute bottom-16 right-10 w-60 h-60 bg-pink-500 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full shadow-sm mb-4 border-2 border-[#bfe1f5] bg-white/70 backdrop-blur">
            <MessageCircle className="w-5 h-5 text-[#2b91cb]" />
            <span className="text-[#1e7bb8] font-semibold">We&apos;re here to help</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#1e3a5f] mb-3">Contact Us</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl md:max-w-3xl mx-auto">
            Questions, feedback, or franchise enquiries—reach us anytime. We typically respond within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact Info + Quick Actions */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-white to-[#f0f7fc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left: Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a5f] mb-3">Get in Touch</h2>
                <p className="text-gray-700 leading-relaxed">
                  Our friendly team is happy to help with anything you need. Choose the channel that suits you best:
                </p>
              </div>

              {/* Cards */}
              <div className="space-y-5">
                <div className="bg-white rounded-2xl p-5 md:p-6 flex items-start gap-4 shadow-sm hover:shadow-md transition-all border border-[#d9ecf8]">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-[#2b91cb] rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                    <Mail className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-[#1e3a5f] mb-1.5 text-lg">Email Us</h3>
                    <a href={LINKS.mailtoHref} className="text-[#1e7bb8] hover:underline font-medium break-all inline-block">
                      {CONTACT.email}
                    </a>
                    <p className="text-sm text-gray-600 mt-1">We&apos;ll reply within 24 hours</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 md:p-6 flex items-start gap-4 shadow-sm hover:shadow-md transition-all border border-[#d9ecf8]">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-[#2b91cb] rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                    <Phone className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-[#1e3a5f] mb-1.5 text-lg">Call Us</h3>
                    <a href={LINKS.telHref} className="text-[#1e7bb8] hover:underline font-medium">
                      {CONTACT.phoneDisplay}
                    </a>
                    <p className="text-sm text-gray-600 mt-1">Mon–Fri · 9:00 AM – 6:00 PM</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 md:p-6 flex items-start gap-4 shadow-sm hover:shadow-md transition-all border border-[#d9ecf8]">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-[#2b91cb] rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                    <MapPin className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-[#1e3a5f] mb-1.5 text-lg">Head Office</h3>
                    <p className="text-gray-700">{CONTACT.addressLines[0]}</p>
                    <p className="text-gray-700">{CONTACT.addressLines[1]}</p>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-[#d9ecf8]">
                <h3 className="font-bold text-[#1e3a5f] mb-3 text-lg">Follow us</h3>
                <div className="flex gap-3">
                  <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="w-11 h-11 md:w-12 md:h-12 bg-[#2b91cb] rounded-full flex items-center justify-center hover:opacity-90 transition-opacity shadow">
                    <Instagram className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </a>
                  <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" className="w-11 h-11 md:w-12 md:h-12 bg-[#2b91cb] rounded-full flex items-center justify-center hover:opacity-90 transition-opacity shadow">
                    <Facebook className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </a>
                  <a href={SOCIAL.twitter} target="_blank" rel="noopener noreferrer" className="w-11 h-11 md:w-12 md:h-12 bg-[#2b91cb] rounded-full flex items-center justify-center hover:opacity-90 transition-opacity shadow">
                    <Twitter className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Quick Actions & Support */}
            <aside className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-md border border-[#d9ecf8]">
                <h2 className="text-xl md:text-2xl font-bold text-[#1e3a5f] mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <a href={LINKS.telHref} className="group flex items-center gap-2 px-4 py-3 rounded-xl border border-[#2b91cb] text-[#2b91cb] hover:bg-[#2b91cb]/10 transition-colors font-semibold justify-center">
                    <Phone className="w-5 h-5" />
                    <span>Call</span>
                  </a>
                  <a href={LINKS.mailtoHref} className="group flex items-center gap-2 px-4 py-3 rounded-xl border border-[#2b91cb] text-[#2b91cb] hover:bg-[#2b91cb]/10 transition-colors font-semibold justify-center">
                    <Mail className="w-5 h-5" />
                    <span>Email</span>
                  </a>
                  <a href={LINKS.whatsappHref} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 px-4 py-3 rounded-xl border border-[#2b91cb] text-[#2b91cb] hover:bg-[#2b91cb]/10 transition-colors font-semibold justify-center col-span-2">
                    <MessageCircle className="w-5 h-5" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                <div className="mt-5">
                  <a href="/store-locator" className="w-full inline-flex items-center justify-center px-5 py-3 rounded-full bg-[#2b91cb] text-white font-semibold hover:bg-[#1e7bb8] transition-colors">
                    Find a Store Near You
                  </a>
                </div>
              </div>

              {/* Support Hours */}
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-md border border-[#d9ecf8]">
                <h3 className="text-lg md:text-xl font-bold text-[#1e3a5f] mb-2">Support Hours</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>Mon–Fri: 9:00 AM – 6:00 PM</li>
                  <li>Sat: 10:00 AM – 4:00 PM</li>
                  <li>Sun: Closed</li>
                </ul>
                <p className="text-sm text-gray-500 mt-3">Expect a response within 24 hours on business days.</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
