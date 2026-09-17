import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">

        <div className="footer-grid">

          <div>
            <h3>Campus Pulse</h3>

            <p>
              Discover, create and participate in exciting college
              events. Connect with your campus community.
            </p>
          </div>

          <div>
            <h3>Explore</h3>

            <div className="footer-links">
              <Link to="/events">All Events</Link>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/register">Register</Link>
            </div>
          </div>

          <div>
            <h3>Account</h3>

            <div className="footer-links">
              <Link to="/login">Login</Link>
              <Link to="/register">Create Account</Link>
              <Link to="/admin">Admin</Link>
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Campus Pulse. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
