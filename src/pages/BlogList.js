import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../sections/Projects.css'; 

const blogPosts = [
  {
    id: '01',
    title: 'NGINX Explained: The Missing Piece Between Your Application and Production',
    category: 'Backend',
    tags: ['NGINX', 'Node.js', 'Docker', 'DevOps'],
    desc: 'An in-depth guide covering reverse proxies, load balancing schemes, static file delivery rules, caching optimizations, and architectural blueprints for production infrastructure.',
    link: '/blog/nginx-explained',
  },
  {
    id: '02',
    title: 'Microservices Made Simple: From Monoliths to Scalable Distributed Systems',
    category: 'Backend',
    tags: ['Microservices',
    'REST API',
    'Event-Driven Architecture',
    'API Gateway',
    'Distributed Systems'],
    desc: 'A practical deep dive into microservice architecture covering service boundaries, REST vs event-driven communication, API gateways, service discovery, resilience patterns, distributed transactions, observability, and real-world production design principles.',
    link: '/blog/microservice-architecture',
  },
  {
    id: '03',
    title: 'Deploying to a Real Server: DNS, Reverse Proxies, and the SSL Layer Nobody Explains',
    category: 'Backend',
    tags: ['DevOps',
    'NGINX',
    'DNS',
    'SSL/TLS',
    'Process Management'],
    desc: 'A practical deep dive into what actually happens when an app goes from localhost to production — DNS resolution, reverse proxy routing, the difference between static and server-rendered deployments, process managers like PM2, SSL certificate issuance, and the proxy layer that quietly breaks all of it if you don\'t understand how it works.',
    link: '/blog/deploying-to-a-real-server',
  }
];

const categories = ['All', 'Full-Stack', 'Frontend', 'Backend', 'AI / ML'];

export default function BlogList() {
  const [filter, setFilter] = useState('All');

  const visible = filter === 'All' ? blogPosts : blogPosts.filter(p => p.category === filter);

  return (
    <section className="projects" id="projects">
      <div className="projects__inner">
        <div className="projects__heading-wrap">
          <span className="projects__section-label">06 — Articles & Insights</span>
          <h2 className="projects__heading">
            <span className="projects__tag">&lt;/</span>Blog<span className="projects__tag">&gt;</span>
          </h2>
        </div>

        <div className="projects__filters">
          {categories.map(f => (
            <button
              key={f}
              className={`projects__filter${filter === f ? ' projects__filter--active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

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
                <Link to={p.link} className="projects__card-link projects__card-link--live">
                  Read Article ↗
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}