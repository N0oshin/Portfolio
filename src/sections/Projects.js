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
  {
    id: '02',
    title: 'DocuMind AI',
    category: 'AI / ML',
    tags: ['Python', 'LangChain', 'FastAPI', 'RAG'],
    desc: 'An AI-powered document intelligence platform that ingests enterprise PDFs, builds a vector knowledge base, and exposes a natural-language Q&A interface backed by a fine-tuned LLM.',
    link: '#',
    github: '#',
  },
  {
    id: '03',
    title: 'PulseUI Design System',
    category: 'Frontend',
    tags: ['React', 'TypeScript', 'Storybook'],
    desc: 'An open-source component library with 80+ accessible, customizable components. Used internally at 3 companies to ship consistent product UIs at speed.',
    link: '#',
    github: '#',
  },
  {
    id: '04',
    title: 'StreamOps Pipeline',
    category: 'Backend',
    tags: ['Node.js', 'Kafka', 'Docker', 'Redis'],
    desc: 'A high-throughput event-streaming microservice architecture processing 500k+ events per day for a regional logistics company, with real-time alerting and dead-letter queue recovery.',
    link: '#',
    github: '#',
  },
  {
    id: '05',
    title: 'SentimentScope',
    category: 'AI / ML',
    tags: ['Python', 'PyTorch', 'Hugging Face'],
    desc: 'Fine-tuned a multilingual BERT model on 50k customer reviews to classify brand sentiment with 94% accuracy. Integrated into a live dashboard for marketing stakeholders.',
    link: '#',
    github: '#',
  },
  {
    id: '06',
    title: 'OpenBudget',
    category: 'Full-Stack',
    tags: ['Next.js', 'Supabase', 'Tailwind'],
    desc: 'A personal finance tracker with AI-powered categorisation, subscription detection, and monthly insight reports — deployed to 1,200+ active users.',
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
