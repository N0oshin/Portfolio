import React, { useState } from 'react';
import './Experience.css';

const jobs = [
  {
    company: 'Nexus Blue',
    role: 'Frontend/Backend developer',
    period: '2026 — Present',
    location: 'Dubai',
    bullets: [
      'Developed and maintained 6 Node.js microservices for scalable backend applications.',
      'Deployed and managed applications on Ubuntu VPS using PM2, Nginx, and SSH.',
      'Configured domains, SSL certificates, reverse proxies, and production server environments.',
      'Collaborated with developers to troubleshoot production issues, deploy updates, and maintain application reliability.',
      'Tested and integrated REST APIs using Postman and supported frontend-backend connectivity.',
      'Managed Git-based deployment workflows for multiple client projects.',
      'Technologies: Node.js, Express.js, Ubuntu Linux, Nginx, PM2, Git, GitHub, REST APIs, Postman, SSH',
    ],
  },
  {
    company: 'Aitrich Technologies',
    role: 'AI web developer',
    period: '2025 — 2026',
    location: 'India(remote)',
    bullets: [
      'Researched and prototyped autonomous AI workflows utilising CrewAi to orchestrate collaborative multi-agent sysytems.',
      'Designed and optimised context-aware system prompts,implementing structured engineering techniques to enhance LLM reliabilicity, reduce hallucination, and ensure predictable application outputs.',
      'Designed and deployed a full stack e-commerce solution.Architected with node.js,express.js and postgreSQL as database',
      'Developed and delivered a full stack Tour Booking Applicationutilising FAST API backend, react frontend, and PostgreSQL.Integrated a robust three-tier Role Based Access control(RBAC) system with secure JWT authentication.',
      'Led internal React.js training sessions, mentoring team members on component architecture,hooks, state management, and modern frontend development best practices.'
    ],
  },
  {
    company: 'Febno Technologies',
    role: 'Python  Developer',
    period: '2024 — 2025',
    location: 'Calicut, India',
    bullets: [
      'Developed and Integrated Custom APIs to fetch real-time data, improving chatbot responsiveness and user experience.',
      'Developed AI powered customer service chatbotusing voiceflow, contributing to core company product.',
      'Supported backend development team with Django, contributing to companies main web platform.',
    ],
  },
];

export default function Experience() {
  const [active, setActive] = useState(0);
  const job = jobs[active];

  return (
    <section className="experience" id="experience">
      <div className="experience__inner">
        <div className="experience__heading-wrap">
          <span className="experience__section-label">04 — Where I've Worked</span>
          <h2 className="experience__heading">
            <span className="experience__tag">&lt;/</span>Experience<span className="experience__tag">&gt;</span>
          </h2>
        </div>

        <div className="experience__layout">
          {/* COMPANY TABS */}
          <div className="experience__tabs">
            {jobs.map((j, i) => (
              <button
                key={j.company}
                className={`experience__tab${active === i ? ' experience__tab--active' : ''}`}
                onClick={() => setActive(i)}
              >
                <span className="experience__tab-co">{j.company}</span>
                <span className="experience__tab-period">{j.period}</span>
              </button>
            ))}
          </div>

          {/* DETAIL */}
          <div className="experience__detail">
            <div className="experience__role-row">
              <h3 className="experience__role">{job.role}</h3>
              <span className="experience__at">@ {job.company}</span>
            </div>
            <p className="experience__meta">{job.period} · {job.location}</p>
            <ul className="experience__bullets">
              {job.bullets.map((b, i) => (
                <li key={i} className="experience__bullet-item">
                  <span className="experience__bullet-arrow">▸</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
