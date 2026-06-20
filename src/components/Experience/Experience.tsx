import { motion } from 'framer-motion';
import { experiences } from '../../data/resume';
import './Experience.css';

const cardVariantsLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] },
  }),
};

const cardVariantsRight = {
  hidden: { opacity: 0, x: 50 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Experience() {
  return (
    <section className="experience section" id="experience">
      <div className="container">
        <div className="experience__header">
          <h2 className="section-title">The Journey</h2>
        </div>

        <div className="experience__timeline-wrapper">
          {/* Central Line */}
          <div className="experience__center-line"></div>

          <div className="experience__timeline">
            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0;

              return (
                <div key={exp.id} className={`exp-row ${isLeft ? 'exp-row--left' : 'exp-row--right'}`}>
                  {/* Empty space for the opposite side */}
                  <div className="exp-row__spacer"></div>

                  {/* Timeline dot */}
                  <div className="exp-dot-wrapper">
                    <div className="exp-dot"></div>
                  </div>

                  {/* Card Content */}
                  <motion.div
                    className="exp-card"
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                    variants={isLeft ? cardVariantsLeft : cardVariantsRight}
                  >
                    <h3 className="exp-card__role">{exp.role}</h3>
                    <p className="exp-card__company">
                      {exp.company} | {exp.period}
                    </p>

                    <ul className="exp-card__bullets">
                      {exp.description.map((point, j) => (
                        <li key={j} className="exp-card__bullet">{point}</li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
