"use client";

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { ToastContainer } from 'react-toastify';
import './globals.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

export default function RootLayout({ children }) {
  useEffect(() => {
    AOS.init();
  }, []);
  
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="author" content="IIIT Bhagalpur" />
          <meta name="theme-color" content="#000000" />
          <link rel="canonical" href="https://skillup.iiitbh.ac.in" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <title>skillUp : IIIT Bhagalpur</title>
        </head>
        <body>
          <Header />
          <ToastContainer />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}