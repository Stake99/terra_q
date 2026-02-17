import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Statistics from '@/components/Statistics';
import Contact from '@/components/Contact';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SkipToContent from '@/components/SkipToContent';

export default function Home() {
  return (
    <>
      <SkipToContent />
      <Navigation />
      <main id="main-content" className="scroll-smooth" tabIndex={-1}>
        <Hero />
        <Services />
        <About />
        <Statistics />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
