'use client';
import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <div className="relative w-full">
      {/* Wave SVG */}
      <div className="w-full">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 320" 
          className="w-full"
        >
          <path 
            fill="#17253c" 
            fillOpacity="1" 
            d="M0,128L48,154.7C96,181,192,235,288,256C384,277,480,267,576,261.3C672,256,768,256,864,261.3C960,267,1056,277,1152,256C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      {/* Footer Content */}
      <footer className="bg-[#17253c] text-white pt-8 pb-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <a href="mailto:contact@skillup.com" className="hover:text-blue-400 transition-colors">
                    contact@skillup.com
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <a href="tel:+1234567890" className="hover:text-blue-400 transition-colors">
                    +123-456-7890
                  </a>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Location</h3>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                  <p className="font-medium">Indian Institute of Information Technology (IIIT), Bhagalpur</p>
                  <p className="text-gray-300">Sabour, Bhagalpur</p>
                  <p className="text-gray-300">Bihar 813210</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-blue-400 transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>© {new Date().getFullYear()} IIIT Bhagalpur. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;