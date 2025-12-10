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
import Partnerships from "@/components/Partnerships";
import Industries from "@/components/Industries";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <main style={{ width: '100vw', minHeight: '100vh', position: 'relative', backgroundColor: 'transparent' }}>
      {/* Hero Section with Video Background */}
      <section id="home" style={{
        width: '100%',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Header />
        <Scene />
        <Overlay />
      </section>
      
      {/* Content Sections */}
      <div id="portfolio">
        <Portfolio />
      </div>
      <div id="services">
        <ExpertiseSection />
      </div>
      <div id="clients">
        <Partnerships />
      </div>
      <div id="industries">
        <Industries />
      </div>
      <div id="about">
        <AboutSection />
        <ProcessWorkflow />
      </div>
      <div id="contact">
        <Contact />
      </div>
      
      {/* Footer */}
      <Footer />
      
      {/* WhatsApp Button */}
      <WhatsAppButton />
    </main>
  );
}
