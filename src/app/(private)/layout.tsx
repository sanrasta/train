"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Update navbar background when scrolling past 100px
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled ? "bg-gray-800" : "bg-gray-800"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Left Side: Logo and UserButton */}
          <div className="flex items-center space-x-2">
            <UserButton />
            <span className="text-2xl font-bold">
              Your <span className="text-red-500">Coaching</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 text-lg">
            <a href="/events" className="hover:text-red-500">Events</a>
            <a href="/" className="hover:text-red-500">Home</a>
          </nav>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="focus:outline-none text-white"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black text-white flex flex-col items-center justify-center z-50 transform transition-all duration-500 ${
          mobileMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <button 
          onClick={() => setMobileMenuOpen(false)} 
          className="absolute top-5 right-5 text-3xl text-white"
        >
          ✕
        </button>
        <nav className="flex flex-col space-y-6 text-3xl">
          <a href="/events" className="hover:text-red-500 transition-all duration-300" onClick={() => setMobileMenuOpen(false)}>Events</a>
          <a href="/" className="hover:text-red-500 transition-all duration-300" onClick={() => setMobileMenuOpen(false)}>Home</a>
        </nav>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24">{children}</main>
    </>
  );
}
