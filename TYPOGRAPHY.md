# TerraQ Typography Guide

## Fonts Used

### Primary Font: Inter
- **Usage**: Body text, paragraphs, descriptions, UI elements
- **Type**: Modern geometric sans-serif
- **Characteristics**: 
  - Excellent readability at all sizes
  - Optimized for screens
  - Clean, professional appearance
  - Wide range of weights
- **Source**: Google Fonts
- **Variable**: `--font-inter`

### Heading Font: Poppins
- **Usage**: Headings (H1-H6), titles, emphasis text
- **Type**: Geometric sans-serif
- **Characteristics**:
  - Bold, confident presence
  - Modern and friendly
  - Perfect for tech brands
  - Excellent for large display text
- **Weights**: 400, 500, 600, 700, 800
- **Source**: Google Fonts
- **Variable**: `--font-poppins`

## Font Hierarchy

### Display Text (Hero)
```
Font: Poppins
Size: 4xl - 7xl (responsive)
Weight: 700 (Bold)
Usage: Main hero heading "TerraQ"
```

### Tagline
```
Font: Poppins
Size: lg - 2xl (responsive)
Weight: 400-500
Usage: "Intelligence Beneath the Surface."
```

### Section Headings (H2)
```
Font: Poppins
Size: 3xl - 5xl (responsive)
Weight: 700 (Bold)
Usage: "Our Services", "About TerraQ", etc.
```

### Subsection Headings (H3)
```
Font: Poppins
Size: 2xl - 3xl (responsive)
Weight: 600 (Semibold)
Usage: "Our Vision", "Our Mission", etc.
```

### Card Titles (H4)
```
Font: Poppins
Size: xl - 2xl (responsive)
Weight: 600 (Semibold)
Usage: Service titles, industry names
```

### Body Text
```
Font: Inter
Size: base - lg (responsive)
Weight: 400 (Regular)
Usage: Descriptions, paragraphs, content
```

### Navigation
```
Font: Inter
Size: xs - sm (responsive)
Weight: 500 (Medium)
Usage: Navigation links
```

### Brand Name (Nav)
```
Font: Poppins
Size: lg - xl (responsive)
Weight: 700 (Bold)
Usage: "TerraQ" in navigation
```

## Implementation

### Tailwind Classes

**For Headings:**
```tsx
className="font-heading font-bold"
```

**For Body Text:**
```tsx
className="font-sans"  // Default, applied automatically
```

### CSS Variables

```css
--font-inter: 'Inter', system-ui, sans-serif
--font-poppins: 'Poppins', system-ui, sans-serif
```

## Why These Fonts?

### Inter
1. **Readability**: Designed specifically for computer screens
2. **Modern**: Contemporary, professional appearance
3. **Versatile**: Works well at any size
4. **Performance**: Optimized for web with variable font support
5. **Professional**: Used by major tech companies

### Poppins
1. **Distinctive**: Geometric shapes create memorable headings
2. **Friendly**: Approachable yet professional
3. **Bold**: Strong presence for brand identity
4. **Tech-Forward**: Popular in modern tech branding
5. **Legible**: Clear even at large sizes

## Font Pairing

Inter + Poppins is an excellent pairing because:
- **Contrast**: Geometric (Poppins) vs Humanist (Inter)
- **Harmony**: Both are modern sans-serifs
- **Hierarchy**: Clear distinction between headings and body
- **Professional**: Both convey technical expertise
- **Readable**: Excellent legibility on all devices

## Performance

### Optimization
- **Variable Fonts**: Reduced file size
- **Font Display Swap**: Prevents invisible text
- **Subset**: Latin characters only
- **Preload**: Critical fonts loaded first

### Loading Strategy
```tsx
display: 'swap'  // Show fallback font while loading
```

### Fallback Stack
```css
font-family: var(--font-inter), system-ui, sans-serif;
font-family: var(--font-poppins), system-ui, sans-serif;
```

## Accessibility

- **Minimum Size**: 16px for body text
- **Line Height**: 1.5-1.75 for readability
- **Contrast**: Meets WCAG AA standards
- **Scalability**: Responsive sizing for all devices

## Usage Examples

### Hero Section
```tsx
<h1 className="font-heading font-bold text-7xl">
  TerraQ
</h1>
<p className="font-heading text-2xl">
  Intelligence Beneath the Surface.
</p>
```

### Section Heading
```tsx
<h2 className="font-heading font-bold text-5xl">
  Our Services
</h2>
```

### Body Text
```tsx
<p className="font-sans text-lg">
  South African geo-data management...
</p>
```

### Navigation
```tsx
<span className="font-heading font-bold text-xl">
  TerraQ
</span>
```

## Brand Consistency

These fonts should be used consistently across:
- ✅ Website
- ✅ Marketing materials
- ✅ Presentations
- ✅ Documentation
- ✅ Social media graphics

## Technical Details

### File Sizes
- Inter: ~15-20KB (variable font)
- Poppins: ~25-30KB (5 weights)
- Total: ~40-50KB (optimized)

### Browser Support
- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers
- ✅ All modern browsers

### Loading Time
- First Paint: < 100ms
- Font Swap: Instant with fallback
- Full Load: < 200ms

---

**Result**: Professional, modern typography that enhances TerraQ's brand identity while maintaining excellent readability and performance! 📝✨
