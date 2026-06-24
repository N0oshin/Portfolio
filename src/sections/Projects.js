import React, { useState } from 'react';
import './Projects.css';

const projects = [
  {
    id: '01',
    title: 'RegioDesk CRM',
    category: 'Full-Stack',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    desc: 'A business-grade CRM tailored for regional SMEs. Features real-time dashboards, automated pipeline reporting, and role-based access control across multi-tenant accounts.',
    link: '#',
    github: '#',
  },
];

const filters = ['All', 'Full-Stack', 'Frontend', 'Backend', 'AI / ML'];

export default function Projects() {
  const [filter, setFilter] = useState('All');

  const visible = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <section className="projects" id="projects">
      <div className="projects__inner">
        <div className="projects__heading-wrap">
          <span className="projects__section-label">03 — What I've Built</span>
          <h2 className="projects__heading">
            <span className="projects__tag">&lt;/</span>Projects<span className="projects__tag">&gt;</span>
          </h2>
        </div>

        {/* FILTERS */}
        <div className="projects__filters">
          {filters.map(f => (
            <button
              key={f}
              className={`projects__filter${filter === f ? ' projects__filter--active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="projects__grid">
          {visible.map(p => (
            <div className="projects__card" key={p.id}>
              <div className="projects__card-header">
                <span className="projects__card-id">{p.id}</span>
                <span className="projects__card-cat">{p.category}</span>
              </div>
              <h3 className="projects__card-title">{p.title}</h3>
              <p className="projects__card-desc">{p.desc}</p>
              <div className="projects__card-tags">
                {p.tags.map(t => <span className="projects__tag-pill" key={t}>{t}</span>)}
              </div>
              <div className="projects__card-links">
                <a href={p.link} className="projects__card-link projects__card-link--live" target="_blank" rel="noopener noreferrer">Live ↗</a>
                <a href={p.github} className="projects__card-link" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
