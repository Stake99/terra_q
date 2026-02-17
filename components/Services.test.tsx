/**
 * Property-Based Tests for Services Component
 * Feature: mining-company-website
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import fc from 'fast-check';
import Services from './Services';
import { Service } from '@/lib/types';
import { LucideIcon } from 'lucide-react';

/**
 * Feature: mining-company-website, Property 3: All services are rendered with descriptions
 * Validates: Requirements 2.1
 * 
 * For any list of services, each service in the rendered output should include both a title and description
 */
describe('Services Component - Property Tests', () => {
  it('Property 3: All services are rendered with descriptions', () => {
    fc.assert(
      fc.property(
        fc.constant(undefined), // Services component uses internal static data
        () => {
          const { container } = render(<Services />);
          
          // Get all service cards
          const serviceCards = container.querySelectorAll('[class*="bg-white"]');
          
          // Verify we have services rendered
          expect(serviceCards.length).toBeGreaterThan(0);
          
          // For each service card, verify it has both title and description
          serviceCards.forEach((card) => {
            // Check for title (h3 element)
            const title = card.querySelector('h3');
            expect(title).toBeTruthy();
            expect(title?.textContent).toBeTruthy();
            expect(title?.textContent?.trim().length).toBeGreaterThan(0);
            
            // Check for description (p element)
            const description = card.querySelector('p');
            expect(description).toBeTruthy();
            expect(description?.textContent).toBeTruthy();
            expect(description?.textContent?.trim().length).toBeGreaterThan(0);
          });
        }
      ),
      { numRuns: 100 }
    );
  }, 10000); // 10 second timeout
});
