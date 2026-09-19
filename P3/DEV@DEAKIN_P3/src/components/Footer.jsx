function Footer() {
  return (
    <footer id="contact">
      <div className="newsletter">
        <strong>SIGN UP FOR OUR DAILY INSIDER</strong>

        <div className="subscribe">
          <input
            type="email"
            placeholder="Enter your email"
          />

          <button>Subscribe</button>
        </div>
      </div>

      <div className="footer-main">
        <div>
          <h3>Explore</h3>
          <a href="#about">Home</a>
          <a href="#projects">Questions</a>
          <a href="#articles">Articles</a>
          <a href="#tutorials">Tutorials</a>
        </div>

        <div>
          <h3>Support</h3>
          <a href="#contact">FAQs</a>
          <a href="#contact">Help</a>
          <a href="#contact">Contact Us</a>
        </div>

        <div>
          <h3>Stay connected</h3>

          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              f
            </a>

            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              X
            </a>

            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              ◎
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <h3>DEV@Deakin</h3>

        <div>
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms</a>
          <a href="#conduct">Code of Conduct</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;