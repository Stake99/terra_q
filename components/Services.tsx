'use client';

import { motion, useInView } from 'framer-motion';
import { HardHat, Gem, Factory, Shield } from 'lucide-react';
import { useRef } from 'react';
import Image from 'next/image';
import AnimatedIcon from './AnimatedIcon';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { Service } from '@/lib/types';

const services: Service[] = [
  {
    id: 'data-management',
    title: 'Geological Data Management & Governance',
    description: 'Structuring, validation, quality control, and lifecycle management of geological and exploration datasets.',
    icon: Gem,
  },
  {
    id: 'digital-integration',
    title: 'Digital Mining & Data Integration',
    description: 'Integration of geological, operational, and monitoring data to support informed decision-making.',
    icon: Factory,
  },
  {
    id: 'platform-implementation',
    title: 'Geo-Data Platform Implementation & Support',
    description: 'Deployment, configuration, data migration, and user training for geological data management systems.',
    icon: HardHat,
  },
  {
    id: 'secure-systems',
    title: 'Secure Data Systems & Access Control',
    description: 'Role-based access, audit trails, version control, and secure data sharing for sensitive project data.',
    icon: Shield,
  },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section 
      id="services" 
      className="relative min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden flex items-center snap-section scroll-mt-20"
      ref={ref}
      aria-labelledby="services-heading"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/background2.png"
          alt="Geological background"
          fill
          className="object-cover"
          quality={85}
        />
        {/* Light overlay for clean look */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/85 to-white/90" />
      </div>

      <motion.div
        className="relative z-20 max-w-7xl mx-auto w-full"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h2 
          id="services-heading"
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-mining-primary text-center mb-3 sm:mb-4 px-4"
          variants={fadeInUp}
        >
          Our Services
        </motion.h2>
        
        <motion.p 
          className="text-lg sm:text-xl text-gray-600 text-center mb-12 sm:mb-16 max-w-3xl mx-auto px-4"
          variants={fadeInUp}
        >
          Geo-data management and digital solutions designed to support exploration and mining projects throughout their lifecycle
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {services.map((service) => (
            <motion.article
              key={service.id}
              className="bg-white rounded-lg shadow-lg p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 touch-manipulation focus-within:ring-4 focus-within:ring-mining-accent focus-within:ring-offset-2 border border-gray-100"
              variants={fadeInUp}
              whileHover={{ y: -8, scale: 1.02 }}
              onTouchStart={(e) => e.currentTarget.classList.add('shadow-xl')}
              onTouchEnd={(e) => e.currentTarget.classList.remove('shadow-xl')}
              tabIndex={0}
              role="article"
              aria-labelledby={`service-${service.id}-title`}
            >
              <motion.div 
                className="mb-4"
                aria-hidden="true"
                whileHover={{ 
                  rotate: [0, -10, 10, -10, 0],
                  scale: [1, 1.1, 1.1, 1.1, 1]
                }}
                transition={{ duration: 0.5 }}
              >
                <AnimatedIcon 
                  icon={service.icon} 
                  animation="pulse" 
                  size={48} 
                  className="text-mining-secondary w-10 h-10 sm:w-12 sm:h-12"
                  ariaLabel={`${service.title} icon`}
                />
              </motion.div>
              
              <h3 id={`service-${service.id}-title`} className="text-xl sm:text-2xl font-semibold text-mining-primary mb-3">
                {service.title}
              </h3>
              
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
