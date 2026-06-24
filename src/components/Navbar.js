import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Add these hooks
import './Navbar.css';

const links = ['About', 'Skills', 'Projects', 'Experience', 'Contact', 'Blog'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (linkName) => {
    setOpen(false);

    if (linkName === 'Blog') {
      // Navigate to the separate blog page
      navigate('/blog');
    } else {
      // If the user is currently on the Blog page, navigate back to Home first
      if (location.pathname !== '/') {
        navigate('/');
        // Small timeout gives the Home page a moment to mount before scrolling
        setTimeout(() => {
          document.getElementById(linkName.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        // If already on Home page, just smooth scroll immediately
        document.getElementById(linkName.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__brand" onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
        <span className="navbar__brand-tag">&lt;</span>
        <span className="navbar__brand-name">Nooshin Vallanchira</span>
        <span className="navbar__brand-tag">/&gt;</span>
      </div>

      <ul className={`navbar__links${open ? ' navbar__links--open' : ''}`}>
        {links.map(l => (
          <li key={l}>
            <button className="navbar__link" onClick={() => handleNav(l)}>{l}</button>
          </li>
        ))}
        <li>
          <a className="navbar__cta" href="mailto:nooshin250030@gmail.com">Hire Me</a>
        </li>
      </ul>

      <button className="navbar__burger" onClick={() => setOpen(!open)} aria-label="Toggle menu">
        <span className={`burger-line${open ? ' burger-line--top-open' : ''}`} />
        <span className={`burger-line${open ? ' burger-line--mid-open' : ''}`} />
        <span className={`burger-line${open ? ' burger-line--bot-open' : ''}`} />
      </button>
    </nav>
  );
}