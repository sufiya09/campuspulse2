import { Link } from "react-router-dom";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Ticket,
  ArrowRight,
  XCircle,
} from "lucide-react";
import { useState } from "react";

const registeredEvents = [
  {
    id: 1,
    title: "Tech Fest 2026",
    category: "Technology",
    date: "20 Sep 2026",
    time: "10:00 AM",
    location: "Main Auditorium",
    status: "Registered",
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
    status: "Registered",
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    title: "Photography Workshop",
    category: "Workshop",
    date: "08 Oct 2026",
    time: "2:00 PM",
    location: "Media Room",
    status: "Registered",
    image:
      "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?auto=format&fit=crop&w=900&q=80",
  },
];

export default function MyEvents() {
  const [events, setEvents] = useState(registeredEvents);
  const [activeTab, setActiveTab] = useState("upcoming");

  const handleCancel = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this registration?"
    );

    if (!confirmed) return;

    setEvents((currentEvents) =>
      currentEvents.filter((event) => event.id !== id)
    );
  };

  return (
    <div className="my-events-page">

      {/* PAGE HEADER */}

      <section className="page-hero">

        <div className="container">

          <span className="section-label">
            YOUR EVENTS
          </span>

          <h1>My Events</h1>

          <p>
            Keep track of events you've registered for and
            manage your campus activities.
          </p>

        </div>

      </section>


      {/* EVENTS CONTENT */}

      <section className="my-events-content">

        <div className="container">

          <div className="events-tabs">

            <button
              className={
                activeTab === "upcoming"
                  ? "events-tab active"
                  : "events-tab"
              }
              onClick={() => setActiveTab("upcoming")}
            >
              <CalendarDays size={17} />
              Upcoming
            </button>


            <button
              className={
                activeTab === "past"
                  ? "events-tab active"
                  : "events-tab"
              }
              onClick={() => setActiveTab("past")}
            >
              <Ticket size={17} />
              Past Events
            </button>

          </div>


          {activeTab === "upcoming" ? (

            events.length > 0 ? (

              <div className="my-events-list">

                {events.map((event) => (

                  <article
                    className="my-event-card"
                    key={event.id}
                  >

                    <img
                      src={event.image}
                      alt={event.title}
                    />


                    <div className="my-event-main">

                      <div className="my-event-title">

                        <span className="event-category-small">
                          {event.category}
                        </span>

                        <span className="registration-status">
                          ✓ {event.status}
                        </span>

                      </div>

                      <h2>{event.title}</h2>


                      <div className="my-event-meta">

                        <span>
                          <CalendarDays size={16} />
                          {event.date}
                        </span>

                        <span>
                          <Clock3 size={16} />
                          {event.time}
                        </span>

                        <span>
                          <MapPin size={16} />
                          {event.location}
                        </span>

                      </div>


                      <div className="my-event-actions">

                        <Link
                          to={`/events/${event.id}`}
                          className="btn btn-primary"
                        >
                          View Event
                          <ArrowRight size={16} />
                        </Link>


                        <button
                          className="btn btn-danger-outline"
                          onClick={() => handleCancel(event.id)}
                        >
                          <XCircle size={16} />
                          Cancel Registration
                        </button>

                      </div>

                    </div>

                  </article>

                ))}

              </div>

            ) : (

              <div className="empty-state">

                <div className="empty-state-icon">
                  <CalendarDays size={28} />
                </div>

                <h3>No upcoming events</h3>

                <p>
                  You haven't registered for any upcoming
                  events yet.
                </p>

                <Link
                  to="/events"
                  className="btn btn-primary"
                >
                  Explore Events
                  <ArrowRight size={17} />
                </Link>

              </div>

            )

          ) : (

            <div className="empty-state">

              <div className="empty-state-icon">
                <Ticket size={28} />
              </div>

              <h3>No past events</h3>

              <p>
                Your attended events will appear here.
              </p>

            </div>

          )}

        </div>

      </section>

    </div>
  );
}

