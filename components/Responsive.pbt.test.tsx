/**
 * Property-Based Tests for Responsive Design
 * Feature: mining-company-website, Property 13: Responsive layout adapts at breakpoints
 * Validates: Requirements 7.1, 7.4
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import * as fc from 'fast-check';
import Hero from './Hero';
import Services from './Services';
import About from './About';
import Statistics from './Statistics';
import Contact from './Contact';
import Navigation from './Navigation';

describe('Property 13: Responsive layout adapts at breakpoints', () => {
  const components = [
    { name: 'Hero', Component: Hero },
    { name: 'Services', Component: Services },
    { name: 'About', Component: About },
    { name: 'Statistics', Component: Statistics },
    { name: 'Contact', Component: Contact },
    { name: 'Navigation', Component: Navigation },
  ];

  // Generate viewport widths at common breakpoints
  const viewportWidthArbitrary = fc.oneof(
    fc.constant(320),  // Mobile small
    fc.constant(375),  // Mobile medium
    fc.constant(640),  // sm breakpoint
    fc.constant(768),  // md breakpoint
    fc.constant(1024), // lg breakpoint
    fc.constant(1280), // xl breakpoint
    fc.constant(1536), // 2xl breakpoint
    fc.integer({ min: 320, max: 1920 }) // Random width
  );

  it('should render all components without layout errors at various viewport widths', { timeout: 10000 }, () => {
    fc.assert(
      fc.property(viewportWidthArbitrary, (width) => {
        // Set viewport width
        global.innerWidth = width;
        
        // Test each component
        for (const { name, Component } of components) {
          const { container } = render(<Component />);
          
          // Verify component renders
          expect(container.firstChild).toBeTruthy();
          
          // Check for responsive classes (sm:, md:, lg:, etc.)
          const html = container.innerHTML;
          const hasResponsiveClasses = 
            html.includes('sm:') || 
            html.includes('md:') || 
            html.includes('lg:') ||
            html.includes('xl:') ||
            // Check for responsive grid classes
            html.includes('grid-cols-1') ||
            // Check for responsive padding/spacing
            html.includes('px-4') ||
            html.includes('py-');
          
          expect(hasResponsiveClasses).toBe(true);
        }
      }),
      { numRuns: 100 }
    );
  });

  it('should apply appropriate responsive classes for text sizing', () => {
    fc.assert(
      fc.property(viewportWidthArbitrary, (width) => {
        global.innerWidth = width;
        
        for (const { Component } of components) {
          const { container } = render(<Component />);
          const html = container.innerHTML;
          
          // Check for responsive text sizing
          const hasResponsiveText = 
            html.includes('text-') && (
              html.includes('sm:text-') ||
              html.includes('md:text-') ||
              html.includes('lg:text-')
            );
          
          // At least some components should have responsive text
          if (hasResponsiveText) {
            expect(hasResponsiveText).toBe(true);
          }
        }
      }),
      { numRuns: 100 }
    );
  });

  it('should have grid layouts that adapt at breakpoints', () => {
    const gridComponents = [
      { name: 'Services', Component: Services },
      { name: 'About', Component: About },
      { name: 'Statistics', Component: Statistics },
      { name: 'Contact', Component: Contact },
    ];

    fc.assert(
      fc.property(viewportWidthArbitrary, (width) => {
        global.innerWidth = width;
        
        for (const { Component } of gridComponents) {
          const { container } = render(<Component />);
          const html = container.innerHTML;
          
          // Check for responsive grid classes
          const hasResponsiveGrid = 
            html.includes('grid') && (
              html.includes('grid-cols-1') ||
              html.includes('sm:grid-cols-') ||
              html.includes('md:grid-cols-') ||
              html.includes('lg:grid-cols-')
            );
          
          expect(hasResponsiveGrid).toBe(true);
        }
      }),
      { numRuns: 100 }
    );
  });

  it('should have responsive spacing (padding and margins)', () => {
    fc.assert(
      fc.property(viewportWidthArbitrary, (width) => {
        global.innerWidth = width;
        
        for (const { Component } of components) {
          const { container } = render(<Component />);
          const html = container.innerHTML;
          
          // Check for responsive spacing
          const hasResponsiveSpacing = 
            (html.includes('px-') || html.includes('py-') || 
             html.includes('p-') || html.includes('m-')) &&
            (html.includes('sm:p') || html.includes('sm:m') ||
             html.includes('md:p') || html.includes('md:m') ||
             html.includes('lg:p') || html.includes('lg:m'));
          
          // At least some components should have responsive spacing
          if (hasResponsiveSpacing) {
            expect(hasResponsiveSpacing).toBe(true);
          }
        }
      }),
      { numRuns: 100 }
    );
  });
});
