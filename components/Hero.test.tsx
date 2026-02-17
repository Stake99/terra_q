import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Hero from './Hero';

/**
 * Unit test for Hero component
 * Validates: Requirements 1.1
 */
describe('Hero Component', () => {
  it('should render hero section with required elements', () => {
    render(<Hero />);

    // Check for company name
    const companyName = screen.getByText(/TerraCore Mining/i);
    expect(companyName).toBeInTheDocument();

    // Check for tagline
    const tagline = screen.getByText(/Excellence in Resource Extraction/i);
    expect(tagline).toBeInTheDocument();

    // Check for call-to-action button
    const ctaButton = screen.getByRole('button', { name: /Explore Our Services/i });
    expect(ctaButton).toBeInTheDocument();
  });
});
