"use client";
import React from 'react';
import { ArrowRight, GraduationCap } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white to-blue-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,transparent)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-20 pb-24 md:pt-28 md:pb-32 flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Hero Content */}
          <div 
            className="flex-1 text-center md:text-left space-y-6"
            data-aos="fade-right"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              <span className="block md:inline">Welcome to</span>
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start mt-2 md:mt-0 md:ml-3 space-y-2 sm:space-y-0 sm:space-x-2">
                <GraduationCap className="h-8 w-8 md:h-12 md:w-12 text-gray-600" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  SkillUp
                </span>
              </div>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
              Your ultimate platform for learning and skill development. Transform your career with cutting-edge courses and expert guidance.
            </p>
            
            {/* CTA Button */}
            <div className="pt-4">
              
                <a href="#study-paths"
                className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-200 group"
              >
                View Paths
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </div>
          </div>
          
          {/* Hero Image */}
          <div 
            className="flex-1 relative"
            data-aos="fade-up"
          >
            <div className="relative w-full max-w-lg mx-auto">
              {/* Decorative blobs */}
              <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
              <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
              <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
              
              {/* Main Image */}
              <div className="relative">
                <img
                  src="/hero-image.svg"
                  alt="Hero Image"
                  className="relative z-10 w-full h-auto transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default HeroSection;