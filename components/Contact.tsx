'use client';

import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useRef } from 'react';
import AnimatedIcon from './AnimatedIcon';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { ContactMethod } from '@/lib/types';

const contactMethods: ContactMethod[] = [
  {
    id: 'email',
    type: 'email',
    label: 'Email Us',
    value: 'info@terraq.co.za',
    href: 'mailto:info@terraq.co.za',
    icon: Mail,
  },
  {
    id: 'phone',
    type: 'phone',
    label: 'Call Us',
    value: '+27 81 532 9057',
    href: 'tel:+27815329057',
    icon: Phone,
  },
  {
    id: 'address',
    type: 'address',
    label: 'Visit Us',
    value: '106 Hercules Street, Roseville, Pretoria, South Africa',
    icon: MapPin,
  },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section 
      id="contact" 
      className="relative min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 snap-section overflow-hidden"
      ref={ref}
      aria-labelledby="contact-heading"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #E63946 1px, transparent 0)`
,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h2 
          id="contact-heading"
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-mining-primary text-center mb-3 sm:mb-4 px-4"
          variants={fadeInUp}
        >
          Get In Touch
        </motion.h2>
        
        <motion.p 
          className="text-lg sm:text-xl text-gray-600 text-center mb-12 sm:mb-16 max-w-3xl mx-auto px-4"
          variants={fadeInUp}
        >
          Ready to transform your geo-data management? Contact us today
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {contactMethods.map((method) => (
            <motion.article
              key={method.id}
              className="bg-white rounded-lg shadow-lg p-6 sm:p-8 text-center touch-manipulation focus-within:ring-4 focus-within:ring-mining-accent focus-within:ring-offset-2 hover:shadow-2xl border border-gray-100 transition-all duration-300"
              variants={fadeInUp}
              whileHover={{ y: -8, scale: 1.03 }}
              onTouchStart={(e) => e.currentTarget.classList.add('shadow-xl')}
              onTouchEnd={(e) => e.currentTarget.classList.remove('shadow-xl')}
              tabIndex={0}
              role="article"
              aria-labelledby={`contact-${method.id}-label`}
            >
              <motion.div 
                className="mb-4 flex justify-center" 
                aria-hidden="true"
                whileHover={{ 
                  scale: 1.2,
                  rotate: [0, -10, 10, 0]
                }}
                transition={{ duration: 0.5 }}
              >
                <AnimatedIcon 
                  icon={method.icon} 
                  animation="pulse" 
                  size={48} 
                  className="text-mining-secondary w-10 h-10 sm:w-12 sm:h-12"
                  ariaLabel={`${method.label} icon`}
                />
              </motion.div>
              
              <h3 id={`contact-${method.id}-label`} className="text-lg sm:text-xl font-semibold text-mining-primary mb-3">
                {method.label}
              </h3>
              
              {method.href ? (
                <a 
                  href={method.href}
                  className="text-sm sm:text-base text-gray-600 hover:text-mining-accent active:text-mining-primary transition-colors duration-300 break-words focus:outline-none focus:ring-2 focus:ring-mining-accent focus:ring-offset-2 rounded"
                  onTouchStart={(e) => e.currentTarget.classList.add('text-mining-accent')}
                  onTouchEnd={(e) => e.currentTarget.classList.remove('text-mining-accent')}
                  aria-label={`${method.label}: ${method.value}`}
                >
                  {method.value}
                </a>
              ) : (
                <p className="text-sm sm:text-base text-gray-600 break-words">
                  {method.value}
                </p>
              )}
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
