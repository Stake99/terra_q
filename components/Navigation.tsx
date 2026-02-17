'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface NavLink {
  id: string;
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { id: 'hero', label: 'Home', href: '#hero' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'statistics', label: 'Impact', href: '#statistics' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    const sections = navLinks.map((link) => document.getElementById(link.id)).filter(Boolean);
    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-mining-primary/95 backdrop-blur-sm shadow-md border-b border-mining-secondary/20" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3 flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="relative w-10 h-10 sm:w-12 sm:h-12">
              <Image
                src="/logo.jpeg"
                alt="TerraQ Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-white font-heading text-lg sm:text-xl">TerraQ</span>
          </motion.div>
          <ul className="flex justify-center space-x-4 sm:space-x-6 md:space-x-8 overflow-x-auto flex-1" role="menubar">
          {navLinks.map((link) => (
            <li key={link.id} className="flex-shrink-0" role="none">
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.id)}
                onTouchStart={(e) => e.currentTarget.classList.add('text-mining-accent')}
                onTouchEnd={(e) => {
                  if (activeSection !== link.id) {
                    e.currentTarget.classList.remove('text-mining-accent');
                  }
                }}
                className={`relative text-xs sm:text-sm font-medium transition-colors duration-300 touch-manipulation focus:outline-none focus:ring-2 focus:ring-mining-secondary focus:ring-offset-2 rounded px-2 py-1 ${
                  activeSection === link.id
                    ? 'text-mining-secondary'
                    : 'text-mining-accent hover:text-white'
                }`}
                role="menuitem"
                aria-current={activeSection === link.id ? 'page' : undefined}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-mining-secondary"
                    layoutId="activeIndicator"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    aria-hidden="true"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>
        </div>
      </div>
    </nav>
  );
}
