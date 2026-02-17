#!/bin/bash

# Color Scheme Update Script
# Usage: ./update-colors.sh PRIMARY SECONDARY ACCENT
# Example: ./update-colors.sh "#1a365d" "#d97706" "#0891b2"

if [ "$#" -ne 3 ]; then
    echo "Usage: $0 PRIMARY_COLOR SECONDARY_COLOR ACCENT_COLOR"
    echo "Example: $0 '#1a365d' '#d97706' '#0891b2'"
    exit 1
fi

PRIMARY=$1
SECONDARY=$2
ACCENT=$3

echo "Updating color scheme..."
echo "Primary: $PRIMARY"
echo "Secondary: $SECONDARY"
echo "Accent: $ACCENT"

# Update tailwind.config.ts
sed -i.bak "s/'mining-primary': '#[0-9a-fA-F]*'/'mining-primary': '$PRIMARY'/g" tailwind.config.ts
sed -i.bak "s/'mining-secondary': '#[0-9a-fA-F]*'/'mining-secondary': '$SECONDARY'/g" tailwind.config.ts
sed -i.bak "s/'mining-accent': '#[0-9a-fA-F]*'/'mining-accent': '$ACCENT'/g" tailwind.config.ts

# Update app/globals.css
sed -i.bak "s/--color-mining-primary: #[0-9a-fA-F]*/--color-mining-primary: $PRIMARY/g" app/globals.css
sed -i.bak "s/--color-mining-secondary: #[0-9a-fA-F]*/--color-mining-secondary: $SECONDARY/g" app/globals.css
sed -i.bak "s/--color-mining-accent: #[0-9a-fA-F]*/--color-mining-accent: $ACCENT/g" app/globals.css

# Clean up backup files
rm -f tailwind.config.ts.bak app/globals.css.bak

echo "✅ Color scheme updated successfully!"
echo "Restart your dev server to see the changes."
