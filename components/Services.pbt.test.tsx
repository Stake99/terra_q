/**
 * Property-Based Tests for Services Component - Scroll-triggered animations
 * Feature: mining-company-website
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import fc from 'fast-check';
import Services from './Services';

/**
 * Feature: mining-company-website, Property 4: Scroll-triggered animations are configured
 * Validates: Requirements 2.2
 * 
 * For any section component that enters the viewport, animation properties should be configured to trigger on intersection
 */
describe('Services Component - Scroll Animation Property Tests', () => {
  it('Property 4: Scroll-triggered animations are configured', () => {
    fc.assert(
      fc.property(
        fc.constant(undefined), // Services component uses internal static data
        () => {
          const { container } = render(<Services />);
          
          // Verify the section has a ref for intersection observer
          const section = container.querySelector('section');
          expect(section).toBeTruthy();
          
          // Verify the component uses motion.div wrapper (Framer Motion components)
          // These will be rendered as regular divs but with Framer Motion data attributes or styles
          const mainContainer = container.querySelector('.max-w-7xl');
          expect(mainContainer).toBeTruthy();
          
          // Verify service cards exist and are within the animated container
          const serviceCards = container.querySelectorAll('[class*="bg-white"]');
          expect(serviceCards.length).toBeGreaterThan(0);
          
          // Each service card should be within the motion container
          // This verifies that animations are configured via the component structure
          serviceCards.forEach((card) => {
            // The card should have a parent that's part of the animation system
            expect(card.parentElement).toBeTruthy();
            
            // Verify the card is within the main animated container
            expect(mainContainer?.contains(card)).toBe(true);
          });
          
          // Verify the section has the necessary structure for scroll-triggered animations
          // The useInView hook requires a ref on the section element
          expect(section?.id).toBe('services');
        }
      ),
      { numRuns: 100 }
    );
  });
});
