'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

export default function ColorPicker() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedColor, setSelectedColor] = useState<string>('#000000');
  const [colorPalette, setColorPalette] = useState<string[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.src = '/logo.jpeg';

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Extract dominant colors
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const colors = extractDominantColors(imageData);
      setColorPalette(colors);
    };
  }, []);

  const extractDominantColors = (imageData: ImageData) => {
    const colorMap = new Map<string, number>();
    const data = imageData.data;

    // Sample every 10th pixel for performance
    for (let i = 0; i < data.length; i += 40) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
      colorMap.set(hex, (colorMap.get(hex) || 0) + 1);
    }

    // Sort by frequency and get top 10
    return Array.from(colorMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([color]) => color);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const imageData = ctx.getImageData(x, y, 1, 1);
    const [r, g, b] = imageData.data;
    const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    setSelectedColor(hex);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Logo Color Picker</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Click on the logo to pick a color:</h2>
          <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            className="border border-gray-300 cursor-crosshair max-w-full"
          />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Selected Color:</h2>
          <div className="flex items-center gap-4">
            <div
              className="w-24 h-24 rounded-lg border-2 border-gray-300"
              style={{ backgroundColor: selectedColor }}
            />
            <div>
              <p className="text-2xl font-mono font-bold">{selectedColor}</p>
              <button
                onClick={() => navigator.clipboard.writeText(selectedColor)}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Copy to Clipboard
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Dominant Colors in Logo:</h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {colorPalette.map((color, index) => (
              <div key={index} className="text-center">
                <div
                  className="w-full h-20 rounded-lg border-2 border-gray-300 mb-2 cursor-pointer hover:scale-105 transition-transform"
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
                <p className="text-sm font-mono">{color}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Instructions:</strong> Click anywhere on the logo image to pick that exact color, 
            or choose from the dominant colors extracted from the logo. Use these colors to update your 
            website's color scheme in the Tailwind config.
          </p>
        </div>
      </div>
    </div>
  );
}
