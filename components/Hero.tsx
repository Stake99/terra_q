'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export default function Hero() {
  const handleScrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 snap-section" aria-label="Hero section">
      {/* Mineral-inspired background with geometric patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-mining-primary to-gray-800">
        {/* Crystalline pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="mineral-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <polygon points="50,0 100,25 100,75 50,100 0,75 0,25" fill="none" stroke="#E63946" strokeWidth="0.5" opacity="0.3"/>
                <polygon points="50,20 80,35 80,65 50,80 20,65 20,35" fill="none" stroke="#C0C0C0" strokeWidth="0.5" opacity="0.2"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mineral-pattern)" />
          </svg>
        </div>
        
        {/* Animated red accent shapes */}
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-mining-secondary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-mining-secondary/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <motion.div
        className="relative z-10 text-center max-w-4xl w-full"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="mb-6 sm:mb-8 flex justify-center"
          variants={fadeInUp}
        >
          <motion.div 
            className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Image
              src="/logo.jpeg"
              alt="TerraQ Logo"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </motion.div>
        </motion.div>

        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading text-white mb-4 sm:mb-6 px-4"
          variants={fadeInUp}
        >
          TerraQ
        </motion.h1>

        <motion.p 
          className="text-lg sm:text-xl md:text-2xl font-heading text-mining-accent mb-6 sm:mb-8 px-4"
          variants={fadeInUp}
        >
          Intelligence Beneath the Surface.
        </motion.p>

        <motion.p 
          className="text-base sm:text-lg text-gray-300 mb-8 sm:mb-10 px-4 max-w-3xl mx-auto"
          variants={fadeInUp}
        >
          South African geo-data management and digital mining solutions company helping exploration and mining organisations secure, structure, and manage geological data effectively.
        </motion.p>

        <motion.button
          className="bg-mining-secondary hover:bg-red-600 active:bg-red-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg transition-all duration-300 touch-manipulation focus:outline-none focus:ring-4 focus:ring-mining-secondary focus:ring-offset-2 shadow-lg hover:shadow-xl"
          variants={fadeInUp}
          onClick={handleScrollToServices}
          onTouchStart={(e) => e.currentTarget.classList.add('scale-95')}
          onTouchEnd={(e) => e.currentTarget.classList.remove('scale-95')}
          whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(230, 57, 70, 0.3)" }}
          whileTap={{ scale: 0.95 }}
        >
          Explore Our Services
        </motion.button>
      </motion.div>
    </section>
  );
}
