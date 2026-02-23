import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-mining-primary text-white py-8 px-4 sm:px-6 lg:px-8 border-t border-mining-secondary/20 overflow-hidden" role="contentinfo">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="footer-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1.5" fill="#E63946" />
              <circle cx="0" cy="0" r="1" fill="#C0C0C0" />
              <circle cx="60" cy="60" r="1" fill="#C0C0C0" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-pattern)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <div className="flex justify-center mb-4">
          <div className="relative w-16 h-16">
            <Image
              src="/logo.jpeg"
              alt="TerraQ Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <p className="text-sm sm:text-base text-mining-accent mb-2">
          &copy; {currentYear} TerraQ. All rights reserved.
        </p>
        <p className="text-xs sm:text-sm text-gray-400 mb-3">
          Intelligence Beneath the Surface.
        </p>
        <a 
          href="https://www.terraq.co.za" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-mining-secondary hover:text-red-400 transition-colors inline-block hover:scale-105 transform duration-200 mb-4"
        >
          www.terraq.co.za
        </a>
        <p className="text-xs text-gray-500 mt-4">
          Developed by{' '}
          <a 
            href="https://smartmacmane.co.za/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-mining-accent hover:text-mining-secondary transition-colors underline"
          >
            Smart Macmane
          </a>
        </p>
      </div>
    </footer>
  );
}
