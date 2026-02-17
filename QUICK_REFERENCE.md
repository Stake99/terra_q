# TerraQ Color Scheme - Quick Reference

## Brand Colors

| Color | Hex Code | RGB | Usage |
|-------|----------|-----|-------|
| **Primary (Dark)** | `#1A1A1A` | rgb(26, 26, 26) | Backgrounds, headers, footer |
| **Secondary (Red)** | `#E63946` | rgb(230, 57, 70) | Buttons, icons, accents |
| **Accent (Silver)** | `#C0C0C0` | rgb(192, 192, 192) | Text on dark, hover states |

## Quick Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Update colors (if needed)
./update-colors.sh '#1A1A1A' '#E63946' '#C0C0C0'
```

## File Locations

### Color Definitions
- `tailwind.config.ts` - Tailwind color classes
- `app/globals.css` - CSS variables

### Components Using Colors
- `components/Hero.tsx` - Hero section
- `components/Navigation.tsx` - Navigation bar
- `components/Footer.tsx` - Footer
- `components/Services.tsx` - Services section
- `components/Statistics.tsx` - Statistics section
- `components/About.tsx` - About section
- `components/Contact.tsx` - Contact section

## Color Classes

Use these Tailwind classes in your components:

```tsx
// Backgrounds
className="bg-mining-primary"    // Dark background
className="bg-mining-secondary"  // Red background
className="bg-mining-accent"     // Silver background

// Text
className="text-mining-primary"    // Dark text
className="text-mining-secondary"  // Red text
className="text-mining-accent"     // Silver text

// Borders
className="border-mining-primary"
className="border-mining-secondary"
className="border-mining-accent"

// Hover states
className="hover:bg-mining-secondary"
className="hover:text-mining-accent"
```

## Gradients

```tsx
// Dark gradient (Hero, Statistics)
className="bg-gradient-to-br from-gray-900 via-mining-primary to-gray-800"
```

## Brand Assets

- **Logo**: `public/logo.jpeg`
- **Favicon**: `public/logo.jpeg`
- **Company Name**: TerraQ
- **Tagline**: Intelligence Beneath the Surface.

## Accessibility

All color combinations meet WCAG AA standards:
- White text on dark backgrounds ✅
- Red buttons with white text ✅
- Silver text on dark backgrounds ✅

## Support

For questions or adjustments, refer to:
- `COLOR_UPDATE_COMPLETE.md` - Detailed changes
- `BEFORE_AFTER.md` - Visual comparison
- `COLOR_SCHEME_GUIDE.md` - Usage guidelines
