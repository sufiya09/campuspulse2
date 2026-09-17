import React, { useState } from "react";
import {
  CalendarDays,
  Mail,
  Lock,
  ArrowRight,
} from "lucide-react";

function Login({ onLogin, onRegister, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5001/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed.");
        return;
      }

      // Send logged-in user to App.jsx
      onLogin(data.user);
    } catch (err) {
      console.error("Login error:", err);

      setError(
        "Cannot connect to the server. Make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-container">

        {/* BRAND */}

        <div className="auth-brand">
          <button
            type="button"
            className="logo logo-button"
            onClick={onBack}
          >
            <span className="logo-icon">
              <CalendarDays size={20} />
            </span>

            Campus Pulse
          </button>
        </div>

        {/* LOGIN CARD */}

        <div className="auth-card">

          <div className="auth-header">
            <h1>Welcome back</h1>

            <p>
              Login to your Campus Pulse account.
            </p>
          </div>

          {/* ERROR */}

          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

          {/* FORM */}

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >

            {/* EMAIL */}

            <div className="form-group">
              <label htmlFor="login-email">
                Email address
              </label>

              <div className="input-wrapper">
                <Mail size={18} />

                <input
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  autoComplete="email"
                />
              </div>
            </div>

            {/* PASSWORD */}

            <div className="form-group">
              <label htmlFor="login-password">
                Password
              </label>

              <div className="input-wrapper">
                <Lock size={18} />

                <input
                  id="login-password"
                  type="password"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  autoComplete="current-password"
                />
              </div>
            </div>

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="btn btn-primary btn-large full-width"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}

              {!loading && (
                <ArrowRight size={17} />
              )}
            </button>

          </form>

          {/* DIVIDER */}

          <div className="auth-divider">
            OR
          </div>

          {/* REGISTER */}

          <p className="auth-switch">
            Don't have an account?

            <button
              type="button"
              onClick={onRegister}
              className="auth-link-button"
            >
              Create Account
            </button>
          </p>

        </div>

        {/* FOOTER */}

        <p className="auth-footer">
          Campus Pulse · Your campus. Your events. Your community.
        </p>

      </div>
    </main>
  );
}

export default Login;







