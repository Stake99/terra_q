import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import Navigation from './Navigation';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
  useInView: () => true,
}));

// Mock Next.js Image
vi.mock('next/image', () => ({
  default: ({ src, alt }: any) => <img src={src} alt={alt} />,
}));

describe('Mobile Navigation - About Section Test', () => {
  beforeEach(() => {
    // Mock scrollIntoView
    Element.prototype.scrollIntoView = vi.fn();
    
    // Mock getElementById for sections
    const mockAboutSection = document.createElement('section');
    mockAboutSection.id = 'about';
    
    const originalGetElementById = document.getElementById.bind(document);
    document.getElementById = vi.fn((id: string) => {
      if (id === 'about') return mockAboutSection;
      return originalGetElementById(id);
    });
  });

  it('MOBILE: Clicking About in hamburger menu navigates to About section', async () => {
    render(<Navigation />);
    
    // Step 1: Find and click hamburger button
    const hamburgerButton = screen.getByLabelText('Toggle menu');
    expect(hamburgerButton).toBeDefined();
    console.log('✓ Hamburger button found');
    
    fireEvent.click(hamburgerButton);
    console.log('✓ Hamburger button clicked');
    
    // Step 2: Wait for mobile menu to appear
    await waitFor(() => {
      const mobileMenu = screen.getByRole('menu');
      expect(mobileMenu).toBeDefined();
    });
    console.log('✓ Mobile menu opened');
    
    // Step 3: Find About link in mobile menu specifically
    const mobileMenu = screen.getByRole('menu');
    const aboutLink = within(mobileMenu).getByRole('menuitem', { name: 'About' });
    expect(aboutLink).toBeDefined();
    console.log('✓ About link found in mobile menu');
    
    // Step 4: Click About link
    fireEvent.click(aboutLink);
    console.log('✓ About link clicked');
    
    // Step 5: Verify scrollIntoView was called
    await waitFor(() => {
      const aboutSection = document.getElementById('about');
      expect(aboutSection?.scrollIntoView).toHaveBeenCalled();
    }, { timeout: 1000 });
    console.log('✓ scrollIntoView called on about section');
    
    // Step 6: Verify it was called with correct parameters
    const aboutSection = document.getElementById('about');
    expect(aboutSection?.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
    console.log('✓ scrollIntoView called with correct parameters');
    
    console.log('\n✅ TEST PASSED: Mobile navigation to About section works correctly!');
  });
});
