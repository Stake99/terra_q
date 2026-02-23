'use client';

import { motion } from 'framer-motion';
import { Database } from 'lucide-react';
import Image from 'next/image';
import AnimatedIcon from './AnimatedIcon';
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
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/background.png"
          alt="Mining background"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>
      
      {/* Animated red accent shapes */}
      <motion.div
        className="absolute top-20 right-20 w-64 h-64 bg-mining-secondary/10 rounded-full blur-3xl z-10"
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
        className="absolute bottom-20 left-20 w-96 h-96 bg-mining-secondary/10 rounded-full blur-3xl z-10"
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

      <motion.div
        className="relative z-20 text-center max-w-4xl w-full"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="mb-6 sm:mb-8 flex justify-center"
          variants={fadeInUp}
          aria-hidden="true"
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <AnimatedIcon 
              icon={Database} 
              animation="pulse" 
              size={96} 
              className="text-mining-secondary w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 drop-shadow-2xl"
              ariaLabel="Geo-data management icon"
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
