import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CalendarDays, Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container navbar-inner">

        <Link to="/" className="logo">
          <span className="logo-icon">
            <CalendarDays size={21} />
          </span>

          Campus Pulse
        </Link>

        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/events">Events</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </nav>

        <div className="nav-actions">
          <Link to="/login" className="btn btn-outline">
            Login
          </Link>

          <Link to="/register" className="btn btn-primary">
            Get Started
          </Link>
        </div>

        <button
          className="mobile-menu"
          onClick={() => setOpen(!open)}
          aria-label="Open menu"
        >
          {open ? <X /> : <Menu />}
        </button>

      </div>

      {open && (
        <div className="mobile-navigation">
          <Link to="/" onClick={() => setOpen(false)}>
            Home
          </Link>

          <Link to="/events" onClick={() => setOpen(false)}>
            Events
          </Link>

          <Link to="/dashboard" onClick={() => setOpen(false)}>
            Dashboard
          </Link>

          <Link to="/login" onClick={() => setOpen(false)}>
            Login
          </Link>

          <Link to="/register" onClick={() => setOpen(false)}>
            Get Started
          </Link>
        </div>
      )}

    </header>
  );
}
