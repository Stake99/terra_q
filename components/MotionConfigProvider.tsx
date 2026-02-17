'use client';

import { MotionConfig } from 'framer-motion';
import { ReactNode } from 'react';

interface MotionConfigProviderProps {
  children: ReactNode;
}

export function MotionConfigProvider({ children }: MotionConfigProviderProps) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  );
}
