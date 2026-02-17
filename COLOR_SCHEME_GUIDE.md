# Color Scheme Update Guide

## Using the Color Picker Tool

I've created a color picker tool to help you extract the exact colors from your logo. Here's how to use it:

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to: `http://localhost:3000/color-picker`

3. The tool will display:
   - Your logo image (clickable to pick any color)
   - The 10 most dominant colors in your logo
   - A selected color display with hex code

4. Click anywhere on the logo or on the dominant color swatches to select a color
5. Copy the hex code of colors you want to use

## Updating the Color Scheme

Once you've identified the colors from your logo, update them in these files:

### 1. Tailwind Config (`tailwind.config.ts`)

```typescript
colors: {
  'mining-primary': '#YOUR_PRIMARY_COLOR',    // Main brand color (currently deep blue)
  'mining-secondary': '#YOUR_SECONDARY_COLOR', // Accent color (currently amber/gold)
  'mining-accent': '#YOUR_ACCENT_COLOR',       // Highlight color (currently cyan)
},
```

### 2. Global CSS (`app/globals.css`)

```css
@theme {
  --color-mining-primary: #YOUR_PRIMARY_COLOR;
  --color-mining-secondary: #YOUR_SECONDARY_COLOR;
  --color-mining-accent: #YOUR_ACCENT_COLOR;
}
```

## Current Color Usage

- **Primary Color** (`mining-primary`): Used for headers, navigation text, main sections
- **Secondary Color** (`mining-secondary`): Used for buttons, highlights, active states
- **Accent Color** (`mining-accent`): Used for hover states, icons, links

## Recommended Color Selection

For best results, choose:
1. **Primary**: The most dominant/background color in your logo
2. **Secondary**: A contrasting accent color from your logo
3. **Accent**: A complementary color for interactive elements

## Logo Integration

The logo has been integrated in:
- ✅ Hero section (large display)
- ✅ Navigation bar (small icon)
- ✅ Footer (medium display)

The logo file is located at: `public/logo.jpeg`
