import Scene from "@/components/Scene";
import Overlay from "@/components/Overlay";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Services from "@/components/Services";
import ExpertiseSection from "@/components/ExpertiseSection";
import AboutSection from "@/components/AboutSection";
import ProcessWorkflow from "@/components/ProcessWorkflow";
import Header from "@/components/Header";
import Industries from "@/components/Industries";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <main style={{ width: '100vw', minHeight: '100vh', position: 'relative', backgroundColor: 'transparent' }}>
      {/* Hero Section with Video Background */}
      <section id="home" style={{
        width: '100%',
        height: 'calc(100vh - var(--header-height))',
        marginTop: 'var(--header-height)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Header />
        <Scene />
        <Overlay />
      </section>
      
      {/* Content Sections */}
      <section id="portfolio" aria-label="Work">
        <Portfolio />
      </section>
      <section id="services" aria-label="Services">
        <ExpertiseSection />
      </section>
      <section id="industries" aria-label="Industries We Serve">
        <Industries />
      </section>
      <section id="about" aria-label="About the Studio">
        <AboutSection />
        <div id="process">
          <ProcessWorkflow />
        </div>
      </section>
      <section id="contact" aria-label="Contact Us">
        <Contact />
      </section>
      
      {/* Footer */}
      <Footer />
      
      {/* WhatsApp Button */}
      <WhatsAppButton />
    </main>
  );
}
