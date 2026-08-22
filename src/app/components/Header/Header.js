'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { GraduationCap } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 text-2xl font-bold "
          >
            <GraduationCap className="h-10 w-10 text-zinc-600" />
            <span className="bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-80 transition-opacity">SkillUp</span>
          </Link>


          {/* Desktop Menu */}
<nav className="hidden md:flex items-center space-x-8">
  <Link 
    href="/" 
    className="group text-gray-700 hover:text-blue-600 transition-colors font-medium relative"
  >
    Home
    <span className="absolute bottom-0 left-0 w-0 h-[2.5px] bg-[#2563EB] transition-all group-hover:w-full"></span>
  </Link>
  <Link 
    href="/aboutUs" 
    className="group text-gray-700 hover:text-blue-600 transition-colors font-medium relative"
  >
    About Us
    <span className="absolute bottom-0 left-0 w-0 h-[2.5px] bg-[#2563EB] transition-all group-hover:w-full"></span>
  </Link>
  <Link 
    href="/profile" 
    className="group text-gray-700 hover:text-blue-600 transition-colors font-medium relative"
  >
    Student Profile
    <span className="absolute bottom-0 left-0 w-0 h-[2.5px] bg-[#2563EB] transition-all group-hover:w-full"></span>
  </Link>
  <Link 
    href="/dashboard" 
    className="group text-gray-700 hover:text-blue-600 transition-colors font-medium relative"
  >
    Dashboard
    <span className="absolute bottom-0 left-0 w-0 h-[2.5px] bg-[#2563EB] transition-all group-hover:w-full"></span>
  </Link>

  {/* Auth Buttons */}
  <div className="ml-4">
    <SignedOut>
      <SignInButton mode="modal">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Sign In
        </button>
      </SignInButton>
    </SignedOut>
    <SignedIn>
      <UserButton 
        afterSignOutUrl="/"
        appearance={{
          elements: {
            avatarBox: "w-10 h-10 rounded-full hover:opacity-80 transition-opacity"
          }
        }}
      />
    </SignedIn>
  </div>
</nav>


          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6 text-blue-600" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-blue-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`
            md:hidden 
            fixed left-0 right-0 
            transition-all duration-300 ease-in-out
            bg-white shadow-lg
            ${isOpen ? 'top-16 opacity-100' : '-top-96 opacity-0'}
          `}
        >
          <div className="p-4 space-y-4">
            <Link 
              href="/" 
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/profile" 
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Student Profile
            </Link>
            <Link 
              href="/dashboard" 
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Dashboard
            </Link>
            
            {/* Mobile Auth Buttons */}
            <div className="px-4 py-2">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <div className="flex items-center space-x-2">
                  <UserButton 
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox: "w-10 h-10 rounded-full hover:opacity-80 transition-opacity"
                      }
                    }}
                  />
                  <span className="text-gray-700">Your Account</span>
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;