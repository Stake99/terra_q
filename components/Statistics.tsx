'use client';

import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { TrendingUp, Users, Calendar, MapPin } from 'lucide-react';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import AnimatedIcon from './AnimatedIcon';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { Statistic } from '@/lib/types';

const statistics: Statistic[] = [
  {
    id: 'projects',
    label: 'Projects Delivered',
    value: 50,
    suffix: '+',
    icon: TrendingUp,
  },
  {
    id: 'clients',
    label: 'Satisfied Clients',
    value: 25,
    suffix: '+',
    icon: Users,
  },
  {
    id: 'data',
    label: 'TB Data Managed',
    value: 100,
    suffix: '+',
    icon: MapPin,
  },
  {
    id: 'uptime',
    label: 'System Uptime',
    value: 99,
    suffix: '%',
    icon: Calendar,
  },
];

interface CounterProps {
  value: number;
  suffix?: string;
  isInView: boolean;
}

function Counter({ value, suffix = '', isInView }: CounterProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration: 2,
        ease: 'easeOut',
      });

      return controls.stop;
    }
  }, [isInView, count, value]);

  useEffect(() => {
    const unsubscribe = rounded.on('change', (latest) => {
      if (nodeRef.current) {
        nodeRef.current.textContent = latest.toString();
      }
    });

    return () => unsubscribe();
  }, [rounded]);

  return (
    <span>
      <span ref={nodeRef}>0</span>
      {suffix}
    </span>
  );
}

export default function Statistics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section 
      id="statistics" 
      className="relative min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden flex items-center scroll-mt-20"
      ref={ref}
      aria-labelledby="statistics-heading"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/background2.png"
          alt="Minerals background"
          fill
          className="object-cover"
          quality={90}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/75" />
      </div>

      {/* Animated crystalline shapes */}
      <motion.div
        className="absolute top-0 left-1/4 w-72 h-72 bg-mining-secondary/10 rounded-full blur-3xl z-10"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-mining-accent/5 rounded-full blur-3xl z-10"
        animate={{
          x: [0, -30, 0],
          y: [0, -50, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="relative z-20 max-w-7xl mx-auto w-full"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h2 
          id="statistics-heading"
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-3 sm:mb-4 px-4"
          variants={fadeInUp}
        >
          Our Impact
        </motion.h2>
        
        <motion.p 
          className="text-lg sm:text-xl text-mining-accent text-center mb-12 sm:mb-16 max-w-3xl mx-auto px-4"
          variants={fadeInUp}
        >
          Delivering excellence in geo-data management and digital mining solutions
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {statistics.map((stat) => (
            <motion.article
              key={stat.id}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 sm:p-8 text-center border border-white/20 touch-manipulation focus-within:ring-4 focus-within:ring-mining-secondary focus-within:ring-offset-2 hover:bg-white/15 transition-all duration-300"
              variants={fadeInUp}
              whileHover={{ scale: 1.05, borderColor: "rgba(230, 57, 70, 0.5)" }}
              onTouchStart={(e) => e.currentTarget.classList.add('bg-white/20')}
              onTouchEnd={(e) => e.currentTarget.classList.remove('bg-white/20')}
              tabIndex={0}
              role="article"
              aria-labelledby={`stat-${stat.id}-label`}
            >
              <motion.div 
                className="mb-4 flex justify-center" 
                aria-hidden="true"
                whileHover={{ 
                  rotate: 360,
                  scale: 1.2
                }}
                transition={{ duration: 0.6 }}
              >
                <AnimatedIcon 
                  icon={stat.icon} 
                  animation="pulse" 
                  size={48} 
                  className="text-mining-secondary w-10 h-10 sm:w-12 sm:h-12"
                  ariaLabel={`${stat.label} icon`}
                />
              </motion.div>
              
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2" aria-live="polite">
                <Counter value={stat.value} suffix={stat.suffix} isInView={isInView} />
              </div>
              
              <p id={`stat-${stat.id}-label`} className="text-mining-accent text-base sm:text-lg">
                {stat.label}
              </p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
