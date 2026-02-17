'use client';

export default function SkipToContent() {
  const handleSkip = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a
      href="#main-content"
      onClick={handleSkip}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-mining-secondary focus:text-white focus:px-4 focus:py-2 focus:rounded focus:outline-none focus:ring-4 focus:ring-amber-400"
    >
      Skip to main content
    </a>
  );
}
