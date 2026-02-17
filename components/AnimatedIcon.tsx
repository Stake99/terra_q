'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface AnimatedIconProps {
  icon: LucideIcon;
  animation?: 'pulse' | 'bounce' | 'spin' | 'float';
  size?: number;
  className?: string;
  ariaLabel?: string;
}

const animationVariants = {
  pulse: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  },
  bounce: {
    y: [0, -10, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  },
  spin: {
    rotate: 360,
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'linear'
    }
  },
  float: {
    y: [0, -15, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

const hoverVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.1, transition: { duration: 0.2 } }
};

export default function AnimatedIcon({ 
  icon: Icon, 
  animation, 
  size = 24, 
  className = '',
  ariaLabel
}: AnimatedIconProps) {
  const animationProps = animation ? animationVariants[animation] : {};

  return (
    <motion.div
      className={`inline-flex ${className}`}
      animate={animationProps}
      initial="rest"
      whileHover="hover"
      variants={hoverVariants}
      role="img"
      aria-label={ariaLabel}
    >
      <Icon size={size} aria-hidden="true" />
    </motion.div>
  );
}
