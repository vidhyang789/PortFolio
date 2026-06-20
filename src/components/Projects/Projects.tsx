import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { projects } from '../../data/resume';
import './Projects.css';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section className="projects section" id="projects">
      <div className="container">
        <div className="projects__header">
          <p className="section-label">Portfolio</p>
          <h2 className="section-title">
            Things I've <span className="gradient-text">built</span>
          </h2>
          <p className="section-subtitle">
            A selection of projects that showcase my skills in full-stack development,
            real-time systems, and AI integration.
          </p>
        </div>

        {/* Featured — large cards */}
        <div className="projects__featured">
          {featured.map((project, i) => (
            <motion.div
              key={project.id}
              className="proj-card proj-card--featured"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <div className="proj-card__accent-bar" />
              <div className="proj-card__inner">
                <div className="proj-card__top">
                  <div>
                    <p className="proj-card__subtitle">{project.subtitle}</p>
                    <h3 className="proj-card__title">{project.title}</h3>
                  </div>
                  <div className="proj-card__links">
                    {project.links.github && (
                      <a href={project.links.github} target="_blank" rel="noopener noreferrer"
                        className="proj-card__link" aria-label="GitHub">
                        <FiGithub size={18} />
                      </a>
                    )}
                    {project.links.live && (
                      <a href={project.links.live} target="_blank" rel="noopener noreferrer"
                        className="proj-card__link" aria-label="Live Demo">
                        <FiExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>
                <p className="proj-card__desc">{project.description}</p>
                <div className="proj-card__tech">
                  {project.tech.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Others — smaller grid */}
        <div className="projects__grid">
          {others.map((project, i) => (
            <motion.div
              key={project.id}
              className="proj-card"
              custom={featured.length + i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <div className="proj-card__inner">
                <div className="proj-card__top">
                  <div>
                    <p className="proj-card__subtitle">{project.subtitle}</p>
                    <h3 className="proj-card__title">{project.title}</h3>
                  </div>
                  <div className="proj-card__links">
                    {project.links.github && (
                      <a href={project.links.github} target="_blank" rel="noopener noreferrer"
                        className="proj-card__link" aria-label="GitHub">
                        <FiGithub size={17} />
                      </a>
                    )}
                  </div>
                </div>
                <p className="proj-card__desc">{project.description}</p>
                <div className="proj-card__tech">
                  {project.tech.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
