import React, { useEffect, useState } from 'react';
import './Hero.css';

const roles = [
  'Frontend Developer',
  'Backend Engineer',
  'AI/ML Practitioner',
  'Full-Stack Builder',
];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setRoleIdx(i => (i + 1) % roles.length);
        setFade(true);
      }, 350);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="hero" id="hero">
      {/* LEFT PANEL */}
      <div className="hero__left">
        <div className="hero__photo-wrap">
          {/* Replace with your actual photo */}
          <div className="hero__photo-placeholder" aria-label="Profile photo">
            <img
              src="/profile.jpeg"
              alt="Profile"
              className="hero__photo"
            />
              <circle cx="60" cy="45" r="26" fill="#ccc"/>
              <ellipse cx="60" cy="105" rx="42" ry="28" fill="#ccc"/>
       
          </div>
        </div>

        <h1 className="hero__name">
          <span className="hero__tag">&lt;</span>
          NOOSHIN VALLANCHIRA
          <span className="hero__tag">&gt;</span>
        </h1>

        <p className="hero__title">
          Software Engineer&nbsp;<span className="hero__pronouns">(she/her)</span>
        </p>

        <a className="hero__btn hero__btn--primary" href="mailto:nooshin250030@gmail.com">
          Email me
        </a>

        <div className="hero__socials">
          
          {/* LinkedIn */}
          <a href="https://www.linkedin.com/in/nooshin-v-ba174623b" aria-label="LinkedIn" className="hero__social-link">
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a href="https://github.com/N0oshin" aria-label="Github" className="hero__social-link">
            <i className="fa-brands fa-square-github"></i>
          </a>
          
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="hero__right">
        <div className="hero__right-inner">
          <h2 className="hero__about-heading">
            <span className="hero__tag">&lt;/</span>About Me<span className="hero__tag">&gt;</span>
          </h2>

        <div >
          <p className="hero__about-text">
            I am a Software developer focused on <strong>full-stack web development and backend systems.</strong>
            Skilled in React, Node.js, Express, FastAPI, PostgreSQL, and building REST APIs for scalable applications.
            Worked on an e-commerce platforms implementing authentication, OTP verification, and order management.
            Experienced in integrating automation tools like Voiceflow and Make.com with APIs and Google Sheets.
            Focused on building efficient, data-driven applications and continuously improving technical skills.
          </p>
        </div>
          

          <div className="hero__role-badge">
            <span className="hero__role-label">Currently:</span>
            <span className={`hero__role-value${fade ? ' hero__role-value--visible' : ''}`}>
              {roles[roleIdx]}
            </span>
          </div>

          <div className="hero__cta-row">
            <a className="hero__btn hero__btn--primary" href="#" target="_blank" rel="noopener noreferrer">Resume</a>
            <button className="hero__btn hero__btn--primary" onClick={() => scrollTo('projects')}>Portfolio</button>
          </div>
        </div>
      </div>
    </section>
  );
}
