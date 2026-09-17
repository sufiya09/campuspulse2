import React, { useState } from "react";
import {
  CalendarDays,
  User,
  Mail,
  Lock,
  ArrowRight,
} from "lucide-react";

function Register({ onRegister, onLogin, onBack }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!name.trim() || !email.trim() || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5001/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed.");
        return;
      }

      console.log("Registration successful:", data);

      // Send newly registered user to App.jsx
      onRegister(data.user);

    } catch (error) {
      console.error("Registration error:", error);

      setError(
        "Cannot connect to the server. Make sure the backend is running on port 5001."
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

        {/* REGISTER CARD */}

        <div className="auth-card">

          <div className="auth-header">
            <h1>Create your account</h1>

            <p>
              Join your campus community today.
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

            {/* NAME */}

            <div className="form-group">
              <label htmlFor="name">
                Full name
              </label>

              <div className="input-wrapper">
                <User size={18} />

                <input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  autoComplete="name"
                />
              </div>
            </div>

            {/* EMAIL */}

            <div className="form-group">
              <label htmlFor="register-email">
                Email address
              </label>

              <div className="input-wrapper">
                <Mail size={18} />

                <input
                  id="register-email"
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
              <label htmlFor="register-password">
                Password
              </label>

              <div className="input-wrapper">
                <Lock size={18} />

                <input
                  id="register-password"
                  type="password"
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  autoComplete="new-password"
                />
              </div>

              <span className="input-hint">
                Use at least 6 characters.
              </span>
            </div>

            {/* SUBMIT */}

            <button
              type="submit"
              className="btn btn-primary btn-large full-width"
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}

              {!loading && (
                <ArrowRight size={17} />
              )}
            </button>

          </form>

          {/* DIVIDER */}

          <div className="auth-divider">
            OR
          </div>

          {/* LOGIN */}

          <p className="auth-switch">
            Already have an account?

            <button
              type="button"
              onClick={onLogin}
              className="auth-link-button"
            >
              Login
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

export default Register;

