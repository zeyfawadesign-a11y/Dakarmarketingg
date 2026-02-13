
import { usePageTracking } from '../../hooks/usePageTracking';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Values from './components/Values';
import Team from './components/Team';
import Clients from './components/Clients';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function HomePage() {
  usePageTracking();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Services />
      <Values />
      <Team />
      <Clients />
      <Contact />
      <Footer />
    </div>
  );
}
