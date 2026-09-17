import { Link } from "react-router-dom";
import {
  CalendarDays,
  Clock3,
  MapPin,
  ArrowRight,
  Ticket,
  Users,
  Plus,
} from "lucide-react";

const upcomingEvents = [
  {
    id: 1,
    title: "Tech Fest 2026",
    category: "Technology",
    date: "20 Sep 2026",
    time: "10:00 AM",
    location: "Main Auditorium",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Cultural Night",
    category: "Cultural",
    date: "25 Sep 2026",
    time: "6:00 PM",
    location: "Open Air Theatre",
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Dashboard() {
  const storedUser = localStorage.getItem("campusPulseUser");

  let user = {
    name: "Student",
    email: "",
  };

  if (storedUser) {
    try {
      user = JSON.parse(storedUser);
    } catch {
      // Use default user.
    }
  }

  const firstName = user.name
    ? user.name.split(" ")[0]
    : "Student";

  return (
    <div className="dashboard-page">

      {/* HEADER */}

      <section className="dashboard-header">

        <div className="container dashboard-header-inner">

          <div>

            <span className="section-label">
              STUDENT DASHBOARD
            </span>

            <h1>
              Welcome back, {firstName}! 👋
            </h1>

            <p>
              Here's what's happening around your campus.
            </p>

          </div>

          <Link
            to="/events"
            className="btn btn-primary"
          >
            Explore Events
            <ArrowRight size={17} />
          </Link>

        </div>

      </section>


      {/* STATISTICS */}

      <section className="dashboard-content">

        <div className="container">

          <div className="stats-grid">

            <div className="stat-card">

              <div className="stat-icon purple">
                <Ticket size={21} />
              </div>

              <div>
                <span>Registered Events</span>
                <strong>4</strong>
              </div>

            </div>


            <div className="stat-card">

              <div className="stat-icon blue">
                <CalendarDays size={21} />
              </div>

              <div>
                <span>Upcoming Events</span>
                <strong>2</strong>
              </div>

            </div>


            <div className="stat-card">

              <div className="stat-icon orange">
                <Users size={21} />
              </div>

              <div>
                <span>Communities Joined</span>
                <strong>3</strong>
              </div>

            </div>


            <div className="stat-card">

              <div className="stat-icon green">
                <CalendarDays size={21} />
              </div>

              <div>
                <span>Events Attended</span>
                <strong>7</strong>
              </div>

            </div>

          </div>


          {/* UPCOMING EVENTS */}

          <div className="dashboard-section">

            <div className="section-heading-row">

              <div>

                <span className="section-label">
                  YOUR CALENDAR
                </span>

                <h2>Upcoming Events</h2>

                <p>
                  Events you've registered for.
                </p>

              </div>

              <Link
                to="/my-events"
                className="view-all-link"
              >
                View All
                <ArrowRight size={17} />
              </Link>

            </div>


            <div className="dashboard-event-list">

              {upcomingEvents.map((event) => (

                <div
                  className="dashboard-event-card"
                  key={event.id}
                >

                  <img
                    src={event.image}
                    alt={event.title}
                  />


                  <div className="dashboard-event-info">

                    <span className="event-category-small">
                      {event.category}
                    </span>

                    <h3>{event.title}</h3>

                    <div className="dashboard-event-meta">

                      <span>
                        <CalendarDays size={15} />
                        {event.date}
                      </span>

                      <span>
                        <Clock3 size={15} />
                        {event.time}
                      </span>

                      <span>
                        <MapPin size={15} />
                        {event.location}
                      </span>

                    </div>

                  </div>


                  <Link
                    to={`/events/${event.id}`}
                    className="event-link"
                  >
                    View
                    <ArrowRight size={16} />
                  </Link>

                </div>

              ))}

            </div>

          </div>


          {/* QUICK ACTIONS */}

          <div className="dashboard-section">

            <div className="section-heading">

              <span className="section-label">
                QUICK ACTIONS
              </span>

              <h2>What would you like to do?</h2>

            </div>


            <div className="quick-actions-grid">

              <Link
                to="/events"
                className="quick-action-card"
              >

                <div className="quick-action-icon purple">
                  <CalendarDays size={23} />
                </div>

                <div>

                  <h3>Discover Events</h3>

                  <p>
                    Explore everything happening on campus.
                  </p>

                </div>

                <ArrowRight size={19} />

              </Link>


              <Link
                to="/my-events"
                className="quick-action-card"
              >

                <div className="quick-action-icon blue">
                  <Ticket size={23} />
                </div>

                <div>

                  <h3>My Events</h3>

                  <p>
                    See your registrations and saved events.
                  </p>

                </div>

                <ArrowRight size={19} />

              </Link>


              <Link
                to="/admin/create-event"
                className="quick-action-card"
              >

                <div className="quick-action-icon orange">
                  <Plus size={23} />
                </div>

                <div>

                  <h3>Create an Event</h3>

                  <p>
                    Have something exciting to share?
                  </p>

                </div>

                <ArrowRight size={19} />

              </Link>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}
