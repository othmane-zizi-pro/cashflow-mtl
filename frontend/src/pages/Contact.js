import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LegalPage.css';

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div className="legal-page">
      <button onClick={() => navigate('/')} className="back-btn">
        ← Back to Dashboard
      </button>

      <div className="legal-content">
        <h1>Contact Us</h1>
        <p className="contact-intro">
          Have a question, feedback, or need support? We're here to help!
        </p>

        <div className="contact-container">
          <div className="contact-info">
            <h2>Get in Touch</h2>

            <div className="contact-method">
              <h3>📧 Email</h3>
              <p>
                <a href="mailto:othmane.zizi.pro@gmail.com">othmane.zizi.pro@gmail.com</a>
              </p>
              <p className="response-time">Response time: 24-48 hours</p>
            </div>

            <div className="contact-method">
              <h3>📍 Location</h3>
              <p>Montreal, Quebec<br />Canada</p>
            </div>
          </div>
        </div>

        <section className="faq-section">
          <h2>Quick Answers</h2>
          <p>Looking for immediate answers? Check out our <a href="/about#faq">FAQ section</a>.</p>
        </section>
      </div>
    </div>
  );
};

export default Contact;
