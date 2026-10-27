import React, { useState } from "react";
import "./AuthPage.css";

function AuthPage() {
  const [showSignup, setShowSignup] = useState(false);

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleLogin(e) {
    e.preventDefault();
    alert("Connect Firebase Authentication to log in.");
  }

  function handleSignup(e) {
    e.preventDefault();

    if (signup.password !== signup.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    alert("Connect Firebase Authentication to create your account.");
  }

  return (
    <div className="auth-page">
      {/* Top navigation bar */}
      <header className="auth-navbar">
        <a href="/" className="auth-logo">
          DEV@Deakin
        </a>

        <input
          className="auth-search"
          type="search"
          placeholder="Search..."
          aria-label="Search"
        />

        <div className="auth-nav-buttons">
          <button type="button" onClick={() => alert("Post feature coming soon")}>
            Post
          </button>

          <button
            type="button"
            onClick={() => setShowSignup(false)}
          >
            Login
          </button>
        </div>
      </header>

      {/* Login and signup forms */}
      <main className="auth-container">
        <section className="auth-box login-box">
          <button
            type="button"
            className="signup-link"
            onClick={() => setShowSignup(!showSignup)}
          >
            {showSignup ? "Login" : "Sign up"}
          </button>

          <h2>Login</h2>

          <form onSubmit={handleLogin}>
            <label htmlFor="login-email">Your email</label>
            <input
              id="login-email"
              type="email"
              required
              value={login.email}
              onChange={(e) =>
                setLogin({ ...login, email: e.target.value })
              }
            />

            <label htmlFor="login-password">Your password</label>
            <input
              id="login-password"
              type="password"
              required
              value={login.password}
              onChange={(e) =>
                setLogin({ ...login, password: e.target.value })
              }
            />

            <button className="auth-submit" type="submit">
              Login
            </button>
          </form>
        </section>

        <section
          className={`auth-box signup-box ${
            showSignup ? "signup-active" : ""
          }`}
        >
          <h3>Create a DEV@Deakin Account</h3>

          <form onSubmit={handleSignup}>
            <label htmlFor="signup-name">Name*</label>
            <input
              id="signup-name"
              type="text"
              required
              value={signup.name}
              onChange={(e) =>
                setSignup({ ...signup, name: e.target.value })
              }
            />

            <label htmlFor="signup-email">Email*</label>
            <input
              id="signup-email"
              type="email"
              required
              value={signup.email}
              onChange={(e) =>
                setSignup({ ...signup, email: e.target.value })
              }
            />

            <label htmlFor="signup-password">Password*</label>
            <input
              id="signup-password"
              type="password"
              minLength={6}
              required
              value={signup.password}
              onChange={(e) =>
                setSignup({ ...signup, password: e.target.value })
              }
            />

            <label htmlFor="confirm-password">
              Confirm password*
            </label>
            <input
              id="confirm-password"
              type="password"
              minLength={6}
              required
              value={signup.confirmPassword}
              onChange={(e) =>
                setSignup({
                  ...signup,
                  confirmPassword: e.target.value,
                })
              }
            />

            <button className="auth-submit" type="submit">
              Create
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default AuthPage;