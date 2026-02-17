import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { fc, test } from '@fast-check/vitest';
import Hero from './Hero';

/**
 * Property-based test for Hero component
 * Feature: mining-company-website, Property 2: Call-to-action triggers scroll
 * Validates: Requirements 1.4
 */
describe('Hero Component - Property Tests', () => {
  let servicesSection: HTMLElement;

  beforeEach(() => {
    // Mock scrollIntoView
    Element.prototype.scrollIntoView = vi.fn();
    // Clean up any existing sections before each test
    cleanup();
    const sections = document.querySelectorAll('#services');
    sections.forEach(section => section.remove());
  });

  afterEach(() => {
    cleanup();
    // Clean up any services sections
    const sections = document.querySelectorAll('#services');
    sections.forEach(section => section.remove());
  });

  test.prop([fc.constant('services')], { numRuns: 100, timeout: 10000 })('CTA button triggers scroll to valid section target', (sectionId) => {
    // Clean up before this iteration
    cleanup();
    const existingSections = document.querySelectorAll('#services');
    existingSections.forEach(section => section.remove());
    
    // Create a mock services section
    servicesSection = document.createElement('div');
    servicesSection.id = sectionId;
    servicesSection.scrollIntoView = vi.fn();
    document.body.appendChild(servicesSection);

    render(<Hero />);

    const ctaButton = screen.getByRole('button', { name: /Explore Our Services/i });
    
    // Click the CTA button
    fireEvent.click(ctaButton);

    // Verify scrollIntoView was called on the services section
    expect(servicesSection.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

    // Cleanup for this iteration
    cleanup();
    document.body.removeChild(servicesSection);
  });
});
