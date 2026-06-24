import React, { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    // Replace with your actual form submission logic (e.g. Formspree, EmailJS)
    console.log('Form submitted:', form);
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section className="contact" id="contact">
      <div className="contact__inner">
        {/* HEADING */}
        <div className="contact__heading-wrap">
          <span className="contact__section-label">05 — Get In Touch</span>
          <h2 className="contact__heading">
            <span className="contact__tag">&lt;/</span>Contact<span className="contact__tag">&gt;</span>
          </h2>
        </div>

        <div className="contact__grid">
          {/* INFO */}
          <div className="contact__info">
            <p className="contact__intro">
              I'm always open to interesting projects, collaborations, and conversations.
              Whether you have a role in mind, an idea to explore, or just want to say hello, my inbox is open.
            </p>

            <div className="contact__detail">
              <span className="contact__detail-label">// email</span>
              <a href="mailto:nooshin250030@gmail.com" className="contact__detail-value">nooshin250030@gmail.com</a>
            </div>
            <div className="contact__detail">
              <span className="contact__detail-label">// location</span>
              <span className="contact__detail-value">Dubai,UAE · Open to Remote</span>
            </div>
            <div className="contact__detail">
              <span className="contact__detail-label">// availability</span>
              <span className="contact__detail-value contact__available">
                <span className="contact__pulse" />
                Available for Opportunities
              </span>
            </div>

            <a className="contact__resume-btn" href="#" target="_blank" rel="noopener noreferrer">
              Download Resume
            </a>
          </div>

          {/* FORM */}
          <form className="contact__form" onSubmit={handleSubmit}>
            <div className="contact__field">
              <label className="contact__label" htmlFor="name">// name</label>
              <input
                id="name" name="name" type="text"
                className="contact__input"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="contact__field">
              <label className="contact__label" htmlFor="email">// email</label>
              <input
                id="email" name="email" type="email"
                className="contact__input"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="contact__field">
              <label className="contact__label" htmlFor="message">// message</label>
              <textarea
                id="message" name="message"
                className="contact__input contact__textarea"
                placeholder="What's on your mind?"
                rows="5"
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="contact__submit">
              {sent ? 'Message Sent ✓' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
