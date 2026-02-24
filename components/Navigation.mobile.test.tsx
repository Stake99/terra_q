import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Navigation from './Navigation';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
  useInView: () => true,
}));

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}));

describe('Navigation - Mobile View', () => {
  let originalInnerWidth: number;
  
  beforeEach(() => {
    // Store original window width
    originalInnerWidth = window.innerWidth;
    
    // Set mobile viewport (less than 768px for md: breakpoint)
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375, // iPhone size
    });
    
    // Trigger resize event
    window.dispatchEvent(new Event('resize'));
    
    // Mock scrollIntoView
    Element.prototype.scrollIntoView = vi.fn();
    
    // Mock getElementById to return mock sections
    const mockSections: { [key: string]: HTMLElement } = {
      hero: document.createElement('section'),
      services: document.createElement('section'),
      about: document.createElement('section'),
      statistics: document.createElement('section'),
      contact: document.createElement('section'),
    };
    
    Object.keys(mockSections).forEach((id) => {
      mockSections[id].id = id;
    });
    
    const originalGetElementById = document.getElementById.bind(document);
    document.getElementById = vi.fn((id: string) => {
      return mockSections[id] || originalGetElementById(id);
    });
  });
  
  afterEach(() => {
    // Restore original window width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
    
    vi.clearAllMocks();
  });

  it('should show hamburger menu button in mobile view', () => {
    render(<Navigation />);
    
    const hamburgerButton = screen.getByLabelText('Toggle menu');
    expect(hamburgerButton).toBeDefined();
  });

  it('should open mobile menu when hamburger is clicked', async () => {
    render(<Navigation />);
    
    const hamburgerButton = screen.getByLabelText('Toggle menu');
    fireEvent.click(hamburgerButton);
    
    await waitFor(() => {
      const aboutLink = screen.getByRole('menuitem', { name: 'About' });
      expect(aboutLink).toBeDefined();
    });
  });

  it('should navigate to About section when About link is clicked in mobile menu', async () => {
    render(<Navigation />);
    
    // Open mobile menu
    const hamburgerButton = screen.getByLabelText('Toggle menu');
    fireEvent.click(hamburgerButton);
    
    // Wait for menu to open and get all About links
    await waitFor(() => {
      const aboutLinks = screen.getAllByRole('menuitem', { name: 'About' });
      expect(aboutLinks.length).toBeGreaterThan(0);
    });
    
    // Get the mobile menu About link (second one, inside role="menu")
    const mobileMenu = screen.getByRole('menu');
    const aboutLink = mobileMenu.querySelector('a[href="#about"]') as HTMLElement;
    expect(aboutLink).toBeDefined();
    
    // Click About link
    fireEvent.click(aboutLink);
    
    // Wait for menu to close and scroll to happen
    await waitFor(() => {
      const aboutSection = document.getElementById('about');
      expect(aboutSection?.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }, { timeout: 1000 });
  });

  it('should close mobile menu after clicking a navigation link', async () => {
    render(<Navigation />);
    
    // Open mobile menu
    const hamburgerButton = screen.getByLabelText('Toggle menu');
    fireEvent.click(hamburgerButton);
    
    // Wait for menu to open
    await waitFor(() => {
      expect(screen.getByRole('menuitem', { name: 'About' })).toBeDefined();
    });
    
    // Click About link
    const aboutLink = screen.getByRole('menuitem', { name: 'About' });
    fireEvent.click(aboutLink);
    
    // Menu should close (hamburger button should show Menu icon, not X)
    await waitFor(() => {
      expect(hamburgerButton.getAttribute('aria-expanded')).toBe('false');
    });
  });

  it('should navigate to all sections from mobile menu', async () => {
    render(<Navigation />);
    
    const sections = ['Home', 'Services', 'About', 'Impact', 'Contact'];
    const sectionIds = ['hero', 'services', 'about', 'statistics', 'contact'];
    
    for (let i = 0; i < sections.length; i++) {
      const sectionName = sections[i];
      const sectionId = sectionIds[i];
      
      // Open mobile menu
      const hamburgerButton = screen.getByLabelText('Toggle menu');
      fireEvent.click(hamburgerButton);
      
      // Wait for menu to open
      await waitFor(() => {
        expect(screen.getByRole('menuitem', { name: sectionName })).toBeDefined();
      });
      
      // Click section link
      const sectionLink = screen.getByRole('menuitem', { name: sectionName });
      fireEvent.click(sectionLink);
      
      // Verify scrollIntoView was called for the correct section
      await waitFor(() => {
        const section = document.getElementById(sectionId);
        expect(section?.scrollIntoView).toHaveBeenCalled();
      });
      
      // Clear mocks for next iteration
      vi.clearAllMocks();
    }
  });

  it('should prevent default anchor behavior when clicking navigation links', async () => {
    render(<Navigation />);
    
    // Open mobile menu
    const hamburgerButton = screen.getByLabelText('Toggle menu');
    fireEvent.click(hamburgerButton);
    
    await waitFor(() => {
      expect(screen.getByRole('menuitem', { name: 'About' })).toBeDefined();
    });
    
    // Create a mock event
    const aboutLink = screen.getByRole('menuitem', { name: 'About' });
    const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
    const preventDefaultSpy = vi.spyOn(clickEvent, 'preventDefault');
    
    aboutLink.dispatchEvent(clickEvent);
    
    expect(preventDefaultSpy).toHaveBeenCalled();
  });
});
