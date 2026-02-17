# Quick Start: Logo & Color Scheme Update

## ✅ What's Been Done

1. **Logo Integration**
   - Logo copied to `public/logo.jpeg` for web use
   - Added to Navigation bar (top-left)
   - Added to Hero section (center, large)
   - Added to Footer (center, medium)
   - Set as favicon and social media preview image

2. **Color Picker Tool Created**
   - New page at `/color-picker` to extract colors from your logo
   - Interactive tool to click and pick exact colors
   - Shows 10 dominant colors from the logo

## 🎨 Next Steps: Update Your Color Scheme

### Step 1: Extract Colors from Your Logo

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and go to:
   ```
   http://localhost:3000/color-picker
   ```

3. Click on different parts of your logo to pick colors
4. Copy the hex codes of 3 colors you want to use:
   - **Primary Color**: Main brand color (for headers, backgrounds)
   - **Secondary Color**: Accent color (for buttons, highlights)
   - **Accent Color**: Interactive elements (hover states, links)

### Step 2: Update Tailwind Config

**Option A: Manual Update**

Edit `tailwind.config.ts` and replace the color values:

```typescript
colors: {
  'mining-primary': '#YOUR_PRIMARY_COLOR',
  'mining-secondary': '#YOUR_SECONDARY_COLOR',
  'mining-accent': '#YOUR_ACCENT_COLOR',
},
```

**Option B: Use the Update Script**

Run the provided script with your three colors:

```bash
./update-colors.sh '#PRIMARY' '#SECONDARY' '#ACCENT'
```

Example:
```bash
./update-colors.sh '#2c5f8d' '#f59e0b' '#10b981'
```

### Step 3: Update Global CSS (if using Option A)

Edit `app/globals.css` and replace the color values:

```css
@theme {
  --color-mining-primary: #YOUR_PRIMARY_COLOR;
  --color-mining-secondary: #YOUR_SECONDARY_COLOR;
  --color-mining-accent: #YOUR_ACCENT_COLOR;
}
```

(Skip this step if you used the update script in Step 2)

### Step 4: Save and Refresh

Save both files and refresh your browser. The entire website will now use your logo's color scheme!

## 📁 Files Modified

- ✅ `components/Hero.tsx` - Logo in hero section
- ✅ `components/Navigation.tsx` - Logo in navbar
- ✅ `components/Footer.tsx` - Logo in footer
- ✅ `app/layout.tsx` - Logo as favicon
- ✅ `app/color-picker/page.tsx` - New color picker tool
- ✅ `public/logo.jpeg` - Your logo file

## 🎯 Current Color Scheme

The site currently uses these placeholder colors:
- Primary: `#1a365d` (Deep blue)
- Secondary: `#d97706` (Amber/gold)
- Accent: `#0891b2` (Cyan)

Replace these with colors from your logo for a cohesive brand experience!
