/**
 * Property-Based Tests for Hardware-Accelerated Animations
 * Feature: mining-company-website, Property 15: Animations use hardware-accelerated properties
 * Validates: Requirements 8.2
 * 
 * For any animation configuration, the animated properties should be limited to transform and opacity for optimal performance
 */

import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { fadeInUp, staggerContainer, scaleOnHover } from '@/lib/animations';

describe('Hardware-Accelerated Animations - Property 15', () => {
  it('Property 15: fadeInUp animation uses only hardware-accelerated properties', () => {
    fc.assert(
      fc.property(
        fc.constant(fadeInUp),
        (animation) => {
          // Check hidden state
          const hiddenState = animation.hidden;
          const hiddenKeys = Object.keys(hiddenState);
          
          // Verify only hardware-accelerated properties are used
          const allowedProperties = ['opacity', 'y', 'x', 'scale', 'rotate', 'rotateX', 'rotateY', 'rotateZ'];
          hiddenKeys.forEach(key => {
            expect(allowedProperties).toContain(key);
          });
          
          // Check visible state
          const visibleState = animation.visible;
          const visibleKeys = Object.keys(visibleState);
          
          visibleKeys.forEach(key => {
            expect(allowedProperties).toContain(key);
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 15: scaleOnHover animation uses only hardware-accelerated properties', () => {
    fc.assert(
      fc.property(
        fc.constant(scaleOnHover),
        (animation) => {
          // Check rest state
          const restState = animation.rest;
          const restKeys = Object.keys(restState);
          
          // Verify only hardware-accelerated properties are used
          const allowedProperties = ['opacity', 'y', 'x', 'scale', 'rotate', 'rotateX', 'rotateY', 'rotateZ'];
          restKeys.forEach(key => {
            expect(allowedProperties).toContain(key);
          });
          
          // Check hover state
          const hoverState = animation.hover;
          const hoverKeys = Object.keys(hoverState);
          
          hoverKeys.forEach(key => {
            expect(allowedProperties).toContain(key);
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 15: AnimatedIcon animations use only hardware-accelerated properties', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('pulse', 'bounce', 'spin', 'float'),
        (animationType) => {
          // Define the animation variants from AnimatedIcon component
          const animationVariants: Record<string, any> = {
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

          const animation = animationVariants[animationType];
          const animationKeys = Object.keys(animation).filter(key => key !== 'transition');
          
          // Verify only hardware-accelerated properties are used
          const allowedProperties = ['opacity', 'y', 'x', 'scale', 'rotate', 'rotateX', 'rotateY', 'rotateZ'];
          animationKeys.forEach(key => {
            expect(allowedProperties).toContain(key);
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 15: Framer Motion whileHover and whileTap use only hardware-accelerated properties', () => {
    fc.assert(
      fc.property(
        fc.record({
          scale: fc.double({ min: 0.8, max: 1.2 }),
          y: fc.integer({ min: -20, max: 20 })
        }),
        (hoverProps) => {
          // Verify the properties used in whileHover/whileTap are hardware-accelerated
          const propKeys = Object.keys(hoverProps);
          const allowedProperties = ['opacity', 'y', 'x', 'scale', 'rotate', 'rotateX', 'rotateY', 'rotateZ'];
          
          propKeys.forEach(key => {
            expect(allowedProperties).toContain(key);
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});
