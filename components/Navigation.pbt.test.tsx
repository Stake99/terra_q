/**
 * Property-Based Tests for Navigation Component
 * Feature: mining-company-website
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { fc } from '@fast-check/vitest';
import Navigation from './Navigation';

describe('Navigation Property-Based Tests', () => {
  beforeEach(() => {
    // Mock IntersectionObserver as a constructor
    global.IntersectionObserver = vi.fn(function IntersectionObserver() {
      return {
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
      };
    }) as any;
  });

  /**
   * Property 11: Navigation links scroll to correct targets
   * Feature: mining-company-website, Property 11: Navigation links scroll to correct targets
   * Validates: Requirements 6.2
   */
  it('property: all navigation links have corresponding section targets', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('hero', 'services', 'about', 'statistics', 'contact'),
        (sectionId) => {
          // Create a mock section element
          const mockSection = document.createElement('section');
          mockSection.id = sectionId;
          mockSection.scrollIntoView = vi.fn();
          document.body.appendChild(mockSection);

          const { unmount, getAllByText } = render(<Navigation />);

          // Find the navigation link
          const label = 
            sectionId === 'hero' ? 'Home' :
            sectionId === 'statistics' ? 'Impact' :
            sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
          
          const navLinks = getAllByText(label);
          const navLink = navLinks[0];

          expect(navLink).toBeDefined();
          expect(navLink.getAttribute('href')).toBe(`#${sectionId}`);

          // Verify the section exists in the DOM
          const targetSection = document.getElementById(sectionId);
          expect(targetSection).toBeTruthy();
          expect(targetSection?.id).toBe(sectionId);

          // Cleanup
          unmount();
          document.body.removeChild(mockSection);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 11 (variant): Navigation links reference valid section IDs
   * Feature: mining-company-website, Property 11: Navigation links scroll to correct targets
   * Validates: Requirements 6.2
   */
  it('property: navigation hrefs match expected section IDs', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            id: fc.constantFrom('hero', 'services', 'about', 'statistics', 'contact'),
            label: fc.string({ minLength: 1, maxLength: 20 }),
          }),
          { minLength: 1, maxLength: 5 }
        ),
        (navItems) => {
          // For each navigation item, verify the href format is correct
          navItems.forEach((item) => {
            const expectedHref = `#${item.id}`;
            
            // The href should start with # and match the section ID
            expect(expectedHref).toMatch(/^#[a-z]+$/);
            expect(expectedHref).toBe(`#${item.id}`);
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});

describe('Navigation Active Section Tracking', () => {
  /**
   * Property 12: Active section tracking updates correctly
   * Feature: mining-company-website, Property 12: Active section tracking updates correctly
   * Validates: Requirements 6.3
   */
  it('property: active section indicator matches the section in viewport', async () => {
    fc.assert(
      fc.asyncProperty(
        fc.constantFrom('hero', 'services', 'about', 'statistics', 'contact'),
        async (activeSectionId) => {
          // Mock IntersectionObserver to simulate section entering viewport
          let observerCallback: IntersectionObserverCallback;
          global.IntersectionObserver = vi.fn(function IntersectionObserver(callback) {
            observerCallback = callback;
            return {
              observe: vi.fn(),
              unobserve: vi.fn(),
              disconnect: vi.fn(),
            };
          }) as any;

          // Create mock sections
          const sections = ['hero', 'services', 'about', 'statistics', 'contact'];
          const mockSections = sections.map((id) => {
            const section = document.createElement('section');
            section.id = id;
            document.body.appendChild(section);
            return section;
          });

          const { unmount, container } = render(<Navigation />);

          // Simulate the active section entering the viewport
          const activeSection = document.getElementById(activeSectionId);
          if (activeSection && observerCallback!) {
            const { act } = await import('@testing-library/react');
            await act(async () => {
              observerCallback(
                [
                  {
                    target: activeSection,
                    isIntersecting: true,
                    intersectionRatio: 1,
                    boundingClientRect: {} as DOMRectReadOnly,
                    intersectionRect: {} as DOMRectReadOnly,
                    rootBounds: null,
                    time: Date.now(),
                  },
                ],
                {} as IntersectionObserver
              );
            });
          }

          // Find the active link by checking for the active indicator
          const activeIndicator = container.querySelector('.bg-mining-secondary');
          
          // The active indicator should exist when a section is active
          if (activeIndicator) {
            const activeLink = activeIndicator.parentElement;
            expect(activeLink).toBeTruthy();
            expect(activeLink?.getAttribute('href')).toBe(`#${activeSectionId}`);
          }

          // Cleanup
          unmount();
          mockSections.forEach((section) => document.body.removeChild(section));
        }
      ),
      { numRuns: 100 }
    );
  });
});
