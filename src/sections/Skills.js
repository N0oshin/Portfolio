import React, { useState } from 'react';
import './Skills.css';

const categories = [
  {
    label: 'Frontend',
    tag: '</Frontend>',
    skills: ['React', 'Next.js', , 'CSS','HTML' , 'Figma',],
  },
  {
    label: 'Backend',
    tag: '</Backend>',
    skills: ['Node.js', 'Express', 'Python / FastAPI', 'PostgreSQL',  'REST APIs'],
  },
  {
    label: 'AI / ML',
    tag: '</AI_ML>',
    skills: ['Machine Learning (scikit-learn)', 'Deep Learning (PyTorch)', 'LLM Fine-Tuning', 'Prompt Engineering', 'LangChain', 'Hugging Face', 'RAG Pipelines', 'MLOps'],
  },
  {
    label: 'DevOps & Cloud',
    tag: '</DevOps>',
    skills: ['AWS (EC2, S3, Lambda)', 'Docker', 'CI/CD (GitHub Actions)', 'Terraform', 'Linux', 'Nginx', 'Kubernetes (basics)', 'Vercel / Netlify'],
  },
];

export default function Skills() {
  const [active, setActive] = useState(0);

  return (
    <section className="skills" id="skills">
      <div className="skills__inner">
        <div className="skills__heading-wrap">
          <span className="skills__section-label">02 — What I Know</span>
          <h2 className="skills__heading">
            <span className="skills__tag">&lt;/</span>Skills<span className="skills__tag">&gt;</span>
          </h2>
        </div>

        <div className="skills__layout">
          {/* TABS */}
          <div className="skills__tabs">
            {categories.map((c, i) => (
              <button
                key={c.label}
                className={`skills__tab${active === i ? ' skills__tab--active' : ''}`}
                onClick={() => setActive(i)}
              >
                <span className="skills__tab-tag">{c.tag}</span>
                <span className="skills__tab-label">{c.label}</span>
              </button>
            ))}
          </div>

          {/* PANEL */}
          <div className="skills__panel">
            <ul className="skills__list">
              {categories[active].skills.map(s => (
                <li className="skills__item" key={s}>
                  <span className="skills__bullet">▸</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
