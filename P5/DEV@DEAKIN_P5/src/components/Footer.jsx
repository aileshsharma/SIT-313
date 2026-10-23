
import { useState } from "react";

function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (event) => {
    event.preventDefault();

    if (loading) return;

    setMessage("");
    setMessageType("");

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setMessage("Please enter your email address.");
      setMessageType("error");
      return;
    }

    if (trimmedEmail.length > 254) {
      setMessage("Your email address is too long.");
      setMessageType("error");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || `Request failed with status ${response.status}.`
        );
      }

      setMessage(data.message || "Successfully subscribed!");
      setMessageType("success");
      setEmail("");
    } catch (error) {
      console.error("Newsletter subscription error:", error);

      setMessage(
        error.message === "Failed to fetch"
          ? "Cannot connect to the server. Please try again."
          : error.message || "Something went wrong. Please try again."
      );

      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer id="contact">
      <div className="newsletter">
        <strong>SIGN UP FOR OUR DAILY INSIDER</strong>

        <div>
          <form className="subscribe" onSubmit={handleSubscribe}>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              aria-label="Email address"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              maxLength={254}
              required
              disabled={loading}
            />

            <button type="submit" disabled={loading}>
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>

          {message && (
            <p
              className={`newsletter-message ${messageType}`}
              role="status"
              aria-live="polite"
            >
              {message}
            </p>
          )}
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
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
            >
              f
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
            >
              X
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
            >
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
