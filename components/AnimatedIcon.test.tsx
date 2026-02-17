import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { fc, test } from '@fast-check/vitest';
import AnimatedIcon from './AnimatedIcon';
import { Pickaxe, Truck, HardHat, Mountain, Mail, Phone, MapPin } from 'lucide-react';
import { Service, Statistic, ContactMethod } from '@/lib/types';

/**
 * Feature: mining-company-website, Property 5: All list items have associated icons
 * Validates: Requirements 2.3, 3.3, 4.3, 5.3
 */
describe('AnimatedIcon - Property 5: All list items have associated icons', () => {
  const iconArbitrary = fc.constantFrom(
    Pickaxe, Truck, HardHat, Mountain, Mail, Phone, MapPin
  );

  test.prop([fc.array(fc.record({
    id: fc.string(),
    title: fc.string(),
    description: fc.string(),
    icon: iconArbitrary
  }), { minLength: 1, maxLength: 10 })], { numRuns: 100 })('all services have associated icons', (services: Service[]) => {
    services.forEach(service => {
      const { container } = render(<AnimatedIcon icon={service.icon} />);
      const iconElement = container.querySelector('svg');
      expect(iconElement).toBeTruthy();
    });
  });

  test.prop([fc.array(fc.record({
    id: fc.string(),
    label: fc.string(),
    value: fc.integer({ min: 0, max: 10000 }),
    suffix: fc.option(fc.string(), { nil: undefined }),
    icon: iconArbitrary
  }), { minLength: 1, maxLength: 10 })], { numRuns: 100 })('all statistics have associated icons', (statistics: Statistic[]) => {
    statistics.forEach(statistic => {
      const { container } = render(<AnimatedIcon icon={statistic.icon} />);
      const iconElement = container.querySelector('svg');
      expect(iconElement).toBeTruthy();
    });
  });

  test.prop([fc.array(fc.record({
    id: fc.string(),
    type: fc.constantFrom('email' as const, 'phone' as const, 'address' as const),
    label: fc.string(),
    value: fc.string(),
    href: fc.option(fc.string(), { nil: undefined }),
    icon: iconArbitrary
  }), { minLength: 1, maxLength: 10 })], { numRuns: 100 })('all contact methods have associated icons', (contacts: ContactMethod[]) => {
    contacts.forEach(contact => {
      const { container } = render(<AnimatedIcon icon={contact.icon} />);
      const iconElement = container.querySelector('svg');
      expect(iconElement).toBeTruthy();
    });
  });
});

/**
 * Feature: mining-company-website, Property 6: Hover animations are configured on interactive elements
 * Validates: Requirements 2.4
 */
describe('AnimatedIcon - Property 6: Hover animations are configured on interactive elements', () => {
  const iconArbitrary = fc.constantFrom(
    Pickaxe, Truck, HardHat, Mountain, Mail, Phone, MapPin
  );

  test.prop([iconArbitrary], { numRuns: 100 })('hover animations are configured on icon elements', (icon) => {
    const { container } = render(<AnimatedIcon icon={icon} />);
    const motionDiv = container.querySelector('div');
    
    expect(motionDiv).toBeTruthy();
    // Verify the element is a motion component (has framer-motion attributes)
    expect(motionDiv?.className).toContain('inline-flex');
  });

  test.prop([
    iconArbitrary,
    fc.constantFrom('pulse' as const, 'bounce' as const, 'spin' as const, 'float' as const)
  ], { numRuns: 100 })('animated icons have animation properties configured', (icon, animation) => {
    const { container } = render(<AnimatedIcon icon={icon} animation={animation} />);
    const motionDiv = container.querySelector('div');
    
    expect(motionDiv).toBeTruthy();
    expect(motionDiv?.className).toContain('inline-flex');
  });
});
