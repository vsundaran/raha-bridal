import Navbar from './components/Navbar'
import WhatsAppButton from './components/WhatsAppButton'
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import ServicesSection from './sections/ServicesSection'
import PortfolioSection from './sections/PortfolioSection'
import TestimonialsSection from './sections/TestimonialsSection'
import InstagramSection from './sections/InstagramSection'
import ContactSection from './sections/ContactSection'
import FooterSection from './sections/FooterSection'

export default function App() {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <TestimonialsSection />
      <InstagramSection />
      <ContactSection />
      <FooterSection />
      <WhatsAppButton />
    </div>
  )
}
