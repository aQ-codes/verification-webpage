import React from 'react';

const HomePage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h2>Fast & Secure Identity Verification</h2>
            <p>
              Verify your identity, Aadhaar, PAN, bank account, and more with ease. Trusted by thousands of users.
            </p>
            <a href="#services" className="cta-button">
              Get Started
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <h2>Our Services</h2>
          <div className="service-cards">
            <div className="service-card">
              <h3>Aadhaar Verification</h3>
              <p>Quick and accurate Aadhaar number verification.</p>
            </div>
            <div className="service-card">
              <h3>Bank Account Verification</h3>
              <p>Ensure your bank account details are valid and secure.</p>
            </div>
            <div className="service-card">
              <h3>PAN Card Verification</h3>
              <p>Verify PAN details instantly for compliance.</p>
            </div>
            <div className="service-card">
              <h3>GST Verification</h3>
              <p>Validate your GST number with ease.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="about">
        <div className="container">
          <h2>About Us</h2>
          <p>
            Verify Me is a leading identity verification service provider, dedicated to helping individuals and businesses
            ensure the accuracy and validity of personal and financial information. Our secure platform is trusted by
            thousands of users for its reliability and ease of use.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2>Contact Us</h2>
          <p>If you have any questions or need support, feel free to reach out to us.</p>
          <form action="/submit" method="post">
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <textarea name="message" placeholder="Your Message" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="faq">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <ul>
            <li>
              <strong>How does the verification process work?</strong> Simply select the type of verification, enter the
              required details, and let us handle the rest.
            </li>
            <li>
              <strong>Is my data secure?</strong> Yes, your data is encrypted and handled with the utmost security.
            </li>
            <li>
              <strong>What types of verifications do you offer?</strong> We offer Aadhaar, PAN, bank account, and GST
              verifications, among others.
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default HomePage;
