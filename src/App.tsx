import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import ParticleNetwork from './components/Hero/ParticleNetwork';
import About from './components/About/About';
import Experience from './components/Experience/Experience';
import Projects from './components/Projects/Projects';
import Footer from './components/Footer/Footer';
import CustomCursor from './components/Cursor/CustomCursor';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const vh = window.innerHeight;
      const progress = window.scrollY / vh;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app">
      <CustomCursor />
      <ParticleNetwork />
      <Navbar />
      
      {/* 300vh Scroll Runway for 3D Graph Narrative */}
      <div className="scroll-runway" style={{ height: '300vh', width: '100%', position: 'relative', zIndex: 1, pointerEvents: 'none' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 10vw' }}>
          
          <div style={{
            position: 'absolute', opacity: scrollProgress < 0.8 ? 1 : 0, transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
            transform: `translateY(${(0.4 - scrollProgress) * 50}px)`,
            pointerEvents: scrollProgress < 0.8 ? 'auto' : 'none'
          }}>
            <p style={{ color: '#bcfb2b', letterSpacing: '0.1em', fontWeight: 600, margin: '0 0 10px 0', fontSize: '0.9rem' }}>01 // OVERVIEW</p>
            <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', color: '#fff', margin: 0, lineHeight: 1, letterSpacing: '-0.02em' }}>SYSTEM CORE</h2>
            <p style={{ color: '#a1a1aa', fontSize: 'clamp(1rem, 2vw, 1.2rem)', maxWidth: '500px', marginTop: '20px', lineHeight: 1.6 }}>
              The central architecture that ties all subsystems together. Hover over or click on any node in the graph to inspect the specific technologies and my proficiency.
            </p>
          </div>

          <div style={{
            position: 'absolute', opacity: (scrollProgress >= 0.8 && scrollProgress < 1.8) ? 1 : 0, transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
            transform: `translateY(${(1.4 - scrollProgress) * 50}px)`,
            pointerEvents: (scrollProgress >= 0.8 && scrollProgress < 1.8) ? 'auto' : 'none'
          }}>
            <p style={{ color: '#b060ff', letterSpacing: '0.1em', fontWeight: 600, margin: '0 0 10px 0', fontSize: '0.9rem' }}>02 // BACKEND</p>
            <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', color: '#fff', margin: 0, lineHeight: 1, letterSpacing: '-0.02em' }}>DISTRIBUTED SYSTEMS</h2>
            <p style={{ color: '#a1a1aa', fontSize: 'clamp(1rem, 2vw, 1.2rem)', maxWidth: '500px', marginTop: '20px', lineHeight: 1.6 }}>
              High-performance, scalable backend services. Microservices, relational data modeling, and ultra-fast caching layers to support heavy loads.
            </p>
          </div>

          <div style={{
            position: 'absolute', opacity: (scrollProgress >= 1.8 && scrollProgress < 2.8) ? 1 : 0, transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
            transform: `translateY(${(2.4 - scrollProgress) * 50}px)`,
            pointerEvents: (scrollProgress >= 1.8 && scrollProgress < 2.8) ? 'auto' : 'none'
          }}>
            <p style={{ color: '#6080ff', letterSpacing: '0.1em', fontWeight: 600, margin: '0 0 10px 0', fontSize: '0.9rem' }}>03 // FRONTEND</p>
            <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', color: '#fff', margin: 0, lineHeight: 1, letterSpacing: '-0.02em' }}>IMMERSIVE INTERFACES</h2>
            <p style={{ color: '#a1a1aa', fontSize: 'clamp(1rem, 2vw, 1.2rem)', maxWidth: '500px', marginTop: '20px', lineHeight: 1.6 }}>
              Bringing raw data to life through interactive, WebGL-powered React applications. Focus on micro-interactions and intentional design.
            </p>
          </div>

        </div>
      </div>

      <main className="main-content" style={{ position: 'relative', zIndex: 10, background: 'transparent' }}>
        <Hero />
        <About />
        <Experience />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}

export default App;
