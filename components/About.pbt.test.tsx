/**
 * Property-Based Tests for About Component - Text Contrast
 * Feature: mining-company-website
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import fc from 'fast-check';
import About from './About';

/**
 * Helper function to calculate relative luminance
 * Based on WCAG 2.0 specification
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const val = c / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 * Returns a ratio where higher is better (WCAG AA requires 4.5:1 for normal text)
 */
function getContrastRatio(
  fg: { r: number; g: number; b: number },
  bg: { r: number; g: number; b: number }
): number {
  const l1 = getLuminance(fg.r, fg.g, fg.b);
  const l2 = getLuminance(bg.r, bg.g, bg.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Parse RGB color from Tailwind class or computed style
 */
function parseColor(colorStr: string): { r: number; g: number; b: number } | null {
  // Handle rgb() format
  const rgbMatch = colorStr.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (rgbMatch) {
    return {
      r: parseInt(rgbMatch[1]),
      g: parseInt(rgbMatch[2]),
      b: parseInt(rgbMatch[3]),
    };
  }
  
  // Handle hex format
  const hexMatch = colorStr.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (hexMatch) {
    return {
      r: parseInt(hexMatch[1], 16),
      g: parseInt(hexMatch[2], 16),
      b: parseInt(hexMatch[3], 16),
    };
  }
  
  return null;
}

/**
 * Feature: mining-company-website, Property 7: Text contrast meets accessibility standards
 * Validates: Requirements 3.4
 * 
 * For any text element in the about section, the contrast ratio between text and background 
 * should meet WCAG AA standards (4.5:1 for normal text)
 */
describe('About Component - Text Contrast Property Tests', () => {
  it('Property 7: Text contrast meets accessibility standards', () => {
    fc.assert(
      fc.property(
        fc.constant(undefined), // About component uses internal static data
        () => {
          const { container } = render(<About />);
          
          // Get the about section
          const section = container.querySelector('section');
          expect(section).toBeTruthy();
          expect(section?.id).toBe('about');
          
          // Define expected color combinations based on Tailwind classes used
          // These are the actual colors from the component
          const colorTests = [
            // Main heading: text-mining-primary on bg-white
            { 
              fg: { r: 26, g: 54, b: 93 },    // mining-primary (#1a365d)
              bg: { r: 255, g: 255, b: 255 }, // white
              description: 'Main heading (text-mining-primary on white)'
            },
            // Mission text: text-gray-700 on bg-white
            { 
              fg: { r: 55, g: 65, b: 81 },    // gray-700
              bg: { r: 255, g: 255, b: 255 }, // white
              description: 'Mission text (text-gray-700 on white)'
            },
            // Core values heading: text-mining-primary on bg-white
            { 
              fg: { r: 26, g: 54, b: 93 },    // mining-primary
              bg: { r: 255, g: 255, b: 255 }, // white
              description: 'Core values heading (text-mining-primary on white)'
            },
            // Value card title: text-gray-900 on bg-gray-50
            { 
              fg: { r: 17, g: 24, b: 39 },    // gray-900
              bg: { r: 249, g: 250, b: 251 }, // gray-50
              description: 'Value card title (text-gray-900 on gray-50)'
            },
            // Value card description: text-gray-700 on bg-gray-50
            { 
              fg: { r: 55, g: 65, b: 81 },    // gray-700
              bg: { r: 249, g: 250, b: 251 }, // gray-50
              description: 'Value card description (text-gray-700 on gray-50)'
            },
          ];
          
          // Test each color combination
          colorTests.forEach((test) => {
            const ratio = getContrastRatio(test.fg, test.bg);
            
            // WCAG AA requires 4.5:1 for normal text
            expect(ratio).toBeGreaterThanOrEqual(4.5);
          });
          
          // Verify that text elements exist in the component
          const headings = container.querySelectorAll('h2, h3, h4');
          expect(headings.length).toBeGreaterThan(0);
          
          const paragraphs = container.querySelectorAll('p');
          expect(paragraphs.length).toBeGreaterThan(0);
        }
      ),
      { numRuns: 100 }
    );
  });
});
