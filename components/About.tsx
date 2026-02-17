'use client';

import { motion, useInView } from 'framer-motion';
import { Target, Users, Leaf, Award, TrendingUp, Heart } from 'lucide-react';
import { useRef } from 'react';
import AnimatedIcon from './AnimatedIcon';
import { fadeInUp, staggerContainer } from '@/lib/animations';

interface CoreValue {
  id: string;
  title: string;
  description: string;
  icon: typeof Target;
}

const coreValues: CoreValue[] = [
  {
    id: 'exploration',
    title: 'Mineral Exploration Companies',
    description: 'Supporting exploration teams with robust data management and governance solutions.',
    icon: Target,
  },
  {
    id: 'mining',
    title: 'Junior & Mid-Tier Mining',
    description: 'Scalable digital solutions for growing mining operations and project portfolios.',
    icon: TrendingUp,
  },
  {
    id: 'consultancies',
    title: 'Geological Consultancies',
    description: 'Data integration and platform support for consulting firms managing multiple projects.',
    icon: Users,
  },
  {
    id: 'environmental',
    title: 'Environmental Services',
    description: 'Secure data systems for environmental and geotechnical service providers.',
    icon: Leaf,
  },
  {
    id: 'contract',
    title: 'Contract Exploration Teams',
    description: 'Flexible, technical expertise for project-based exploration operations.',
    icon: Award,
  },
  {
    id: 'digital',
    title: 'Digital Transformation',
    description: 'Helping mining organizations transition to modern, data-driven operations.',
    icon: Heart,
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section 
      id="about" 
      className="min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white snap-section"
      ref={ref}
      aria-labelledby="about-heading"
    >
      <motion.div
        className="max-w-7xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h2 
          id="about-heading"
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-mining-primary text-center mb-3 sm:mb-4 px-4"
          variants={fadeInUp}
        >
          About TerraQ
        </motion.h2>
        
        <motion.p 
          className="text-lg sm:text-xl text-gray-700 text-center mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4"
          variants={fadeInUp}
        >
          TerraQ operates at the intersection of geology, data governance, and digital technology, 
          delivering practical, scalable solutions that improve data integrity, accessibility, and 
          decision-making across the mining value chain.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <motion.div
            className="bg-gray-50 rounded-lg p-6 sm:p-8 border border-gray-200"
            variants={fadeInUp}
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-mining-secondary mb-4">Our Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              To architect secure, scalable geo-data systems that unlock the full potential of geological 
              information through intelligent platforms and digital innovation.
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-50 rounded-lg p-6 sm:p-8 border border-gray-200"
            variants={fadeInUp}
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-mining-secondary mb-4">Our Mission</h3>
            <ul className="text-gray-700 leading-relaxed space-y-2">
              <li>• Geology-led digital solutions aligned with real industry workflows</li>
              <li>• Secure, structured data environments built on best-practice governance</li>
              <li>• Reduced data risk and improved data accessibility</li>
              <li>• Scalable digital foundations prepared for future analytics and AI integration</li>
              <li>• Local expertise with global industry standards</li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="bg-gradient-to-br from-gray-900 via-mining-primary to-gray-800 rounded-lg p-8 sm:p-12 mb-12 sm:mb-16 text-center"
          variants={fadeInUp}
        >
          <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-4">Leadership</h3>
          <div className="max-w-2xl mx-auto">
            <p className="text-xl sm:text-2xl font-bold text-mining-secondary mb-2">Mothae Namane</p>
            <p className="text-lg text-mining-accent mb-4">Founder & CEO</p>
            <p className="text-gray-300 leading-relaxed">
              Leading TerraQ's mission to transform geo-data management in the mining industry through 
              innovative digital solutions and geology-led expertise.
            </p>
          </div>
        </motion.div>

        <motion.h3 
          id="core-values-heading"
          className="text-2xl sm:text-3xl font-semibold text-mining-primary text-center mb-8 sm:mb-12 px-4"
          variants={fadeInUp}
        >
          Industries We Serve
        </motion.h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" role="list" aria-labelledby="core-values-heading">
          {coreValues.map((value) => (
            <motion.article
              key={value.id}
              className="bg-gray-50 rounded-lg p-5 sm:p-6 border border-gray-200 touch-manipulation focus-within:ring-4 focus-within:ring-mining-accent focus-within:ring-offset-2 hover:border-mining-secondary/30 hover:shadow-lg transition-all duration-300"
              variants={fadeInUp}
              whileHover={{ y: -5, scale: 1.02 }}
              onTouchStart={(e) => e.currentTarget.classList.add('bg-gray-100')}
              onTouchEnd={(e) => e.currentTarget.classList.remove('bg-gray-100')}
              tabIndex={0}
              role="listitem"
              aria-labelledby={`value-${value.id}-title`}
            >
              <motion.div 
                className="mb-4" 
                aria-hidden="true"
                whileHover={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 0.5 }}
              >
                <AnimatedIcon 
                  icon={value.icon} 
                  animation="pulse" 
                  size={40} 
                  className="text-mining-secondary w-8 h-8 sm:w-10 sm:h-10"
                  ariaLabel={`${value.title} icon`}
                />
              </motion.div>
              
              <h4 id={`value-${value.id}-title`} className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                {value.title}
              </h4>
              
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {value.description}
              </p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
