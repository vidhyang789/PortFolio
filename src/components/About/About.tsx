import { motion } from 'framer-motion';
import { skills } from '../../data/resume';
import './About.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function About() {
  return (
    <section className="about section" id="about">
      <div className="container">
        <div className="about__grid">
          {/* Left — text */}
          <div className="about__text">
            <p className="section-label">About Me</p>
            <h2 className="section-title">
              Passionate about <span className="gradient-text">crafting</span> digital experiences
            </h2>
            <p className="about__bio">
              I am a passionate Full-Stack Software Engineer dedicated to crafting digital experiences that are not only visually stunning but also highly performant. I thrive on translating complex concepts into clean, intuitive, and robust web applications.
            </p>
            <p className="about__bio">
              My journey has led me to work on everything from real-time drone video streaming using WebRTC to intelligent, AI-powered recruitment platforms. I am deeply committed to continuous learning, always seeking to push the boundaries of modern web technologies to build products that make a real difference.
            </p>
            <div className="about__quick-facts">
              {[
                { label: 'Location', value: '🇮🇳 India' },
                { label: 'Focus', value: 'Full-Stack & Systems' },
                { label: 'Stack', value: 'MERN + TypeScript' },
              ].map((f) => (
                <div key={f.label} className="about__fact">
                  <span className="about__fact-label">{f.label}</span>
                  <span className="about__fact-value">{f.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — skills */}
          <div className="about__skills">
            {Object.entries(skills).map(([category, items], ci) => (
              <div key={category} className="about__skill-group">
                <p className="about__skill-category">{category}</p>
                <div className="about__skill-tags">
                  {items.map((skill, i) => (
                    <motion.span
                      key={skill}
                      className="tag"
                      custom={ci * 4 + i}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeUp}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
