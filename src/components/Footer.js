import React from 'react';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <span className="footer__brand">
          <span className="footer__tag">&lt;</span>Nooshin Vallanchira<span className="footer__tag">/&gt;</span>
        </span>
        <p className="footer__copy">
          © {year} · Designed &amp; built with care
        </p>
        <div className="footer__socials">
          <a href="https://github.com/N0oshin" aria-label="GitHub" className="footer__social"><i class="fa-brands fa-github"></i></a>
          <a href="www.linkedin.com/in/nooshin-v-ba174623b" aria-label="LinkedIn" className="footer__social"><i class="fa-brands fa-linkedin-in"></i></a>
        </div>
      </div>
    </footer>
  );
}
