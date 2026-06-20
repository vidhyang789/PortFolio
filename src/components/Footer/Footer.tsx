import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';
import { personalInfo } from '../../data/resume';
import './Footer.css';

const links = [
  { icon: <FiGithub size={18} />, href: personalInfo.github, label: 'GitHub' },
  { icon: <FiLinkedin size={18} />, href: personalInfo.linkedin, label: 'LinkedIn' },
  { icon: <FiMail size={18} />, href: `mailto:${personalInfo.email}`, label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer__glow" aria-hidden="true" />
      <div className="container footer__inner">
        {/* Contact CTA */}
        <div className="footer__cta">
          <p className="section-label">Get in Touch</p>
          <h2 className="footer__heading">
            Let's build something <span className="gradient-text">great</span> together
          </h2>
          <p className="footer__sub">
            I'm currently open to full-time roles and freelance projects.
            Drop me a message — I respond within 24 hours.
          </p>
          <a
            href={`mailto:${personalInfo.email}`}
            className="footer__email-btn"
          >
            <FiMail size={16} />
            {personalInfo.email}
          </a>
        </div>

        {/* Divider */}
        <div className="footer__divider" />

        {/* Bottom row */}
        <div className="footer__bottom">
          <p className="footer__copy">
            Designed &amp; built with <FiHeart size={13} className="footer__heart" /> by{' '}
            <span className="gradient-text">{personalInfo.name}</span>
          </p>
          <div className="footer__socials">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social"
                aria-label={l.label}
              >
                {l.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
