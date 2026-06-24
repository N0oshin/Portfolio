import React from 'react';
import './About.css';

const stats = [
  { value: 'Backend APIs', label: 'Node.js & Express Systems' },
  { value: 'React', label: 'UI Development' },
  { value: 'PostgreSQL', label: 'Database Design' },
  { value: 'AI + Automation', label: 'Integrations & Experiments' },
];

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about__inner">
        {/* HEADING */}
        <div className="about__heading-wrap">
          <span className="about__section-label">01 — Who I Am</span>
          <h2 className="about__heading">
            <span className="about__tag">&lt;/</span>
            About
            <span className="about__tag">&gt;</span>
          </h2>
        </div>

        {/* CONTENT */}
        <div className="about__grid">
          <div className="about__text-col">
            <p>
              I am a <strong>full-stack software developer</strong> focused on building scalable web applications and backend systems. My core strength lies in backend engineering with Node.js, Express, and PostgreSQL, where I design and implement REST APIs, authentication flows, and data-driven application logic.
            </p>
            <p>
              On the frontend side, I work with React to build clean, responsive, and user-friendly interfaces, ensuring smooth interaction between UI and backend systems.
            </p>
          
            <p>
              More recently, I've been expanding into the field of <strong>Applied Machine Learning &amp;
              AI Engineering</strong>, exploring the intersection of intelligent systems with production-ready software.
            </p>
            <p>
              I'm driven by clean code, great collaboration, and the belief that technology should solve real
              problems for real people.
            </p>
          </div>

          <div className="about__stats-col">
            {stats.map(s => (
              <div className="about__stat" key={s.label}>
                <span className="about__stat-value">{s.value}</span>
                <span className="about__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
