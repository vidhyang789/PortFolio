import { FiFileText } from 'react-icons/fi';
import { personalInfo } from '../../data/resume';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="container hero__content">
        <div className="hero__layout">
          
          {/* Left Side */}
          <div className="hero__left">
            <p className="hero__eyebrow">NOT ANOTHER DEV PORTFOLIO</p>
            <h1 className="hero__name-huge">Vidhyang Jain.</h1>
            <h2 className="hero__subtitle">I build systems that feel sharp, calm, and real.</h2>
            <p className="hero__bio">
              Full-Stack Developer based in {personalInfo.location}. I engineer elegant, high-performance web experiences. 
              Merging robust backend architectures with pixel-perfect, interactive frontends to build digital products that truly matter.
            </p>
            
            <div className="hero__tags">
              <span className="hero__tag">9.8 CGPA</span>
              <span className="hero__tag">1000+ DSA Problems</span>
              <span className="hero__tag">Systems + Full-Stack</span>
            </div>

            <div className="hero__cta-group">
              <a href="#projects" className="hero__btn-primary">My Work</a>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="hero__btn-secondary">
                <FiFileText /> Download Resume
              </a>
            </div>

            {/* Large Faded Background Text */}
            <div className="hero__bg-text" aria-hidden="true">VIDHYANG</div>
          </div>

          {/* Right Side */}
          <div className="hero__right">
            <div className="hero__image-wrapper">
              <div className="hero__image-placeholder">
                <p>Profile Image</p>
              </div>
              <div className="hero__image-caption">SYSTEMS / FULL-STACK / BACKEND</div>
            </div>

            <div className="hero__currently-into">
              <span className="hero__currently-label">CURRENTLY INTO</span>
              <p>real-time apps, scaling backend flows, and things that feel fast and intentional.</p>
            </div>
          </div>

        </div>
      </div>

      <button className="hero__sound-btn">
        Sound on
      </button>
    </section>
  );
}
