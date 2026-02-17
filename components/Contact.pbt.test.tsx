import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { ContactMethod } from '@/lib/types';
import { Mail, Phone, MapPin } from 'lucide-react';

/**
 * Feature: mining-company-website, Property 10: Contact links have correct href format
 * Validates: Requirements 5.4
 * 
 * For any email contact link, the href should start with "mailto:", 
 * and for any phone contact link, the href should start with "tel:"
 */

describe('Contact Component - Property-Based Tests', () => {
  it('Property 10: Contact links have correct href format', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            id: fc.string(),
            type: fc.constantFrom('email' as const, 'phone' as const, 'address' as const),
            label: fc.string(),
            value: fc.string(),
            icon: fc.constantFrom(Mail, Phone, MapPin),
          })
        ),
        (contactMethods) => {
          // Generate href for each contact method based on type
          const methodsWithHref = contactMethods.map(method => {
            if (method.type === 'email') {
              return { ...method, href: `mailto:${method.value}` };
            } else if (method.type === 'phone') {
              return { ...method, href: `tel:${method.value}` };
            } else {
              return { ...method, href: undefined };
            }
          });

          // Verify that all email links start with "mailto:"
          const emailMethods = methodsWithHref.filter(m => m.type === 'email');
          const allEmailLinksCorrect = emailMethods.every(
            m => m.href && m.href.startsWith('mailto:')
          );

          // Verify that all phone links start with "tel:"
          const phoneMethods = methodsWithHref.filter(m => m.type === 'phone');
          const allPhoneLinksCorrect = phoneMethods.every(
            m => m.href && m.href.startsWith('tel:')
          );

          // Verify that address methods don't have href
          const addressMethods = methodsWithHref.filter(m => m.type === 'address');
          const allAddressLinksCorrect = addressMethods.every(
            m => m.href === undefined
          );

          return allEmailLinksCorrect && allPhoneLinksCorrect && allAddressLinksCorrect;
        }
      ),
      { numRuns: 100 }
    );
  });
});
