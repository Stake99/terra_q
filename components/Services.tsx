'use client';

import { motion, useInView } from 'framer-motion';
import { HardHat, Gem, Droplets, Mountain, Map, Database, BarChart3, Shield } from 'lucide-react';
import { useRef } from 'react';
import Image from 'next/image';
import AnimatedIcon from './AnimatedIcon';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { Service } from '@/lib/types';

interface ServiceCategory {
  id: string;
  title: string;
  services: Service[];
}

const serviceCategories: ServiceCategory[] = [
  {
    id: 'terraq-geo',
    title: 'TerraQ Geo',
    services: [
      {
        id: 'geology',
        title: 'Geology',
        description: 'Drillhole logging and QA/QC • Geological interpretation and mapping • Resource data preparation',
        icon: Gem,
      },
      {
        id: 'hydrogeology',
        title: 'Hydrogeology',
        description: 'Groundwater monitoring and analysis • Pump testing and aquifer modelling • Dewatering assessments',
        icon: Droplets,
      },
      {
        id: 'geotechnical',
        title: 'Geotechnical Engineering',
        description: 'RQD and rock mass classification • Structural and fracture analysis • Slope stability insights',
        icon: Mountain,
      },
      {
        id: 'gis',
        title: 'GIS & Spatial',
        description: 'GIS database creation • Environmental mapping • Spatial data integration',
        icon: Map,
      },
    ],
  },
  {
    id: 'terraq-digital',
    title: 'TerraQ Digital',
    services: [
      {
        id: 'data-management',
        title: 'Data Management',
        description: 'Geo-database design • Data migration and cleaning • Cloud data systems',
        icon: Database,
      },
      {
        id: 'dashboards',
        title: 'Dashboards',
        description: 'Exploration dashboards • Environmental monitoring dashboards • Executive reporting tools',
        icon: HardHat,
      },
      {
        id: 'analytics',
        title: 'Analytics',
        description: 'Geological and hydro data analysis • Time-series monitoring • Decision-support tools',
        icon: BarChart3,
      },
      {
        id: 'cybersecurity',
        title: 'Cybersecurity & Data Integrity',
        description: 'Secure cloud environments • Controlled user access • Data encryption and backups • Monitoring and audit systems',
        icon: Shield,
      },
    ],
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
          Integrated geoscience and digital solutions for mining and environmental sectors
        </motion.p>

        <div className="space-y-12 sm:space-y-16">
          {serviceCategories.map((category) => (
            <motion.div key={category.id} variants={fadeInUp}>
              <h3 className="text-2xl sm:text-3xl font-bold text-mining-secondary text-center mb-8 sm:mb-10">
                {category.title}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                {category.services.map((service) => (
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
                    
                    <h4 id={`service-${service.id}-title`} className="text-xl sm:text-2xl font-semibold text-mining-primary mb-3">
                      {service.title}
                    </h4>
                    
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
