import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  Search,
  Sparkles,
  Users,
} from "lucide-react";

const featuredEvents = [
  {
    id: 1,
    title: "Tech Fest 2026",
    category: "Technology",
    date: "20 Sep 2026",
    time: "10:00 AM",
    location: "Main Auditorium",
    registered: 245,
    organizer: "Tech Club",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    title: "Cultural Night",
    category: "Cultural",
    date: "25 Sep 2026",
    time: "6:00 PM",
    location: "Open Air Theatre",
    registered: 180,
    organizer: "Cultural Committee",
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    title: "Inter College Hackathon",
    category: "Hackathon",
    date: "02 Oct 2026",
    time: "9:00 AM",
    location: "Innovation Lab",
    registered: 96,
    organizer: "Coding Club",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
  },
];

export default function Home() {
  return (
    <div className="home-page">

      {/* HERO */}

      <section className="hero">
        <div className="container hero-content">

          <div className="hero-text">

            <div className="hero-badge">
              <Sparkles size={16} />
              Your campus. Your events. Your community.
            </div>

            <h1>
              Discover What's
              <span> Happening </span>
              On Campus
            </h1>

            <p>
              Find exciting college events, connect with your community,
              and never miss what's happening around campus.
            </p>

            <div className="hero-buttons">

              <Link to="/events" className="btn btn-primary btn-large">
                Explore Events
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/register"
                className="btn btn-outline btn-large"
              >
                Join Campus Pulse
              </Link>

            </div>

          </div>

          <div className="hero-visual">

            <div className="hero-card">

              <div className="hero-card-top">
                <span>Upcoming</span>
                <CalendarDays size={20} />
              </div>

              <div className="hero-event-date">
                <strong>20</strong>
                <span>SEP</span>
              </div>

              <h3>Tech Fest 2026</h3>

              <p>
                Innovation, technology and ideas come together.
              </p>

              <div className="hero-card-bottom">
                <span>
                  <Users size={15} />
                  245 registered
                </span>

                <span>
                  Main Auditorium
                </span>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* SEARCH */}

      <section className="search-section">
        <div className="container">

          <div className="search-box">

            <Search size={21} />

            <input
              type="text"
              placeholder="Search events, clubs, workshops..."
            />

            <Link to="/events" className="btn btn-primary">
              Search
            </Link>

          </div>

        </div>
      </section>


      {/* FEATURES */}

      <section className="features-section">
        <div className="container">

          <div className="section-heading">
            <span className="section-label">WHY CAMPUS PULSE</span>

            <h2>
              Everything happening on campus,
              <span> in one place.</span>
            </h2>

            <p>
              Discover events, meet people and make the most
              of your college experience.
            </p>
          </div>


          <div className="feature-grid">

            <div className="feature-card">
              <div className="feature-icon purple">
                <CalendarDays />
              </div>

              <h3>Discover Events</h3>

              <p>
                Find workshops, fests, competitions, seminars
                and activities happening around your campus.
              </p>
            </div>


            <div className="feature-card">
              <div className="feature-icon blue">
                <Users />
              </div>

              <h3>Connect With Students</h3>

              <p>
                Meet students who share your interests and
                become part of exciting campus communities.
              </p>
            </div>


            <div className="feature-card">
              <div className="feature-icon orange">
                <Sparkles />
              </div>

              <h3>Create Experiences</h3>

              <p>
                Clubs and organizers can create events and
                bring their ideas to the entire campus.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* FEATURED EVENTS */}

      <section className="events-section">
        <div className="container">

          <div className="section-heading-row">

            <div>
              <span className="section-label">
                DON'T MISS OUT
              </span>

              <h2>Featured Events</h2>

              <p>
                Explore some of the most exciting upcoming
                events on campus.
              </p>
            </div>

            <Link to="/events" className="view-all-link">
              View All Events
              <ArrowRight size={17} />
            </Link>

          </div>


          <div className="event-grid">

            {featuredEvents.map((event) => (
              <div key={event.id} className="event-card">

                <div className="event-image-wrapper">

                  <img
                    src={event.image}
                    alt={event.title}
                    className="event-image"
                  />

                  <span className="event-category">
                    {event.category}
                  </span>

                </div>


                <div className="event-card-content">

                  <h3>{event.title}</h3>

                  <p className="event-description">
                    Join us for an exciting campus experience
                    filled with learning, creativity and fun.
                  </p>

                  <div className="event-info">

                    <div>
                      <CalendarDays size={16} />
                      <span>{event.date}</span>
                    </div>

                    <div>
                      <Users size={16} />
                      <span>{event.registered} registered</span>
                    </div>

                  </div>


                  <div className="event-card-footer">

                    <span className="event-organizer">
                      {event.organizer}
                    </span>

                    <Link
                      to={`/events/${event.id}`}
                      className="event-link"
                    >
                      View Event
                      <ArrowRight size={16} />
                    </Link>

                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>
      </section>


      {/* CTA */}

      <section className="cta-section">

        <div className="container">

          <div className="cta-box">

            <div>

              <span className="section-label">
                ARE YOU AN ORGANIZER?
              </span>

              <h2>
                Have an event to share?
              </h2>

              <p>
                Create an event and reach students across
                your campus.
              </p>

            </div>

            <Link
              to="/admin/create-event"
              className="btn btn-light btn-large"
            >
              Create an Event
              <ArrowRight size={18} />
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
}
