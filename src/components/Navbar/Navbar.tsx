import { useState, useEffect } from 'react';
import { FiFileText } from 'react-icons/fi';
import { personalInfo } from '../../data/resume';
import './Navbar.css';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Featured Work', href: '#projects' },
  { label: 'Tech Stack', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        
        {/* Left: Terminal text */}
        <div className="navbar__terminal">
          <p className="navbar__term-line">
            <span className="navbar__term-prompt">$&gt;</span> Hello_World
          </p>
          <p className="navbar__term-line navbar__term-name">
            [ {personalInfo.name} ]
          </p>
        </div>

        {/* Middle: Pill Nav */}
        <div className="navbar__pill-container">
          <nav className={`navbar__nav ${menuOpen ? 'navbar__nav--open' : ''}`}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="navbar__link"
                onClick={(e) => handleNav(e, link.href)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="navbar__resume-btn"
            >
              <FiFileText size={14} />
              Resume
            </a>
          </nav>
        </div>

        {/* Right: Route Widget Placeholder */}
        <div className="navbar__route-widget">
          <div className="navbar__route-top">ROUTE</div>
          <div className="navbar__route-mid">
            <span className="navbar__route-speed">24</span> <span className="navbar__route-unit">km/hr</span>
          </div>
          <div className="navbar__route-bot">ABOUT</div>
          <div className="navbar__route-car"></div>
        </div>

        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
