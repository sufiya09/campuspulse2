import { Link } from "react-router-dom";
import {
  CalendarDays,
  Users,
  Ticket,
  Plus,
  ArrowRight,
  Edit3,
  Trash2,
  Eye,
  MoreVertical,
} from "lucide-react";
import { useState } from "react";

const initialEvents = [
  {
    id: 1,
    title: "Tech Fest 2026",
    category: "Technology",
    date: "20 Sep 2026",
    registrations: 245,
    capacity: 500,
    status: "Published",
  },
  {
    id: 2,
    title: "Cultural Night",
    category: "Cultural",
    date: "25 Sep 2026",
    registrations: 180,
    capacity: 400,
    status: "Published",
  },
  {
    id: 3,
    title: "Inter College Hackathon",
    category: "Hackathon",
    date: "02 Oct 2026",
    registrations: 96,
    capacity: 200,
    status: "Published",
  },
  {
    id: 4,
    title: "Photography Workshop",
    category: "Workshop",
    date: "08 Oct 2026",
    registrations: 54,
    capacity: 100,
    status: "Draft",
  },
];

export default function AdminDashboard() {
  const [events, setEvents] = useState(initialEvents);

  const handleDelete = (id) => {
    const event = events.find((item) => item.id === id);

    if (!event) return;

    const confirmed = window.confirm(
      `Delete "${event.title}"?`
    );

    if (!confirmed) return;

    setEvents((currentEvents) =>
      currentEvents.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="admin-page">

      {/* HEADER */}

      <section className="dashboard-header">

        <div className="container dashboard-header-inner">

          <div>

            <span className="section-label">
              ADMINISTRATION
            </span>

            <h1>Admin Dashboard</h1>

            <p>
              Manage campus events, registrations and organizers.
            </p>

          </div>


          <Link
            to="/admin/create-event"
            className="btn btn-primary"
          >
            <Plus size={18} />
            Create Event
          </Link>

        </div>

      </section>


      {/* CONTENT */}

      <section className="dashboard-content">

        <div className="container">

          {/* STATISTICS */}

          <div className="stats-grid">

            <div className="stat-card">

              <div className="stat-icon purple">
                <CalendarDays size={21} />
              </div>

              <div>

                <span>Total Events</span>

                <strong>{events.length}</strong>

              </div>

            </div>


            <div className="stat-card">

              <div className="stat-icon blue">
                <Ticket size={21} />
              </div>

              <div>

                <span>Total Registrations</span>

                <strong>575</strong>

              </div>

            </div>


            <div className="stat-card">

              <div className="stat-icon orange">
                <Users size={21} />
              </div>

              <div>

                <span>Active Students</span>

                <strong>1,284</strong>

              </div>

            </div>


            <div className="stat-card">

              <div className="stat-icon green">
                <CalendarDays size={21} />
              </div>

              <div>

                <span>Published Events</span>

                <strong>
                  {events.filter(
                    (event) => event.status === "Published"
                  ).length}
                </strong>

              </div>

            </div>

          </div>


          {/* EVENT MANAGEMENT */}

          <div className="admin-section">

            <div className="admin-section-header">

              <div>

                <span className="section-label">
                  EVENT MANAGEMENT
                </span>

                <h2>All Events</h2>

                <p>
                  Create, edit and manage campus events.
                </p>

              </div>


              <Link
                to="/admin/create-event"
                className="btn btn-outline"
              >
                <Plus size={17} />
                New Event
              </Link>

            </div>


            <div className="admin-table-wrapper">

              <table className="admin-table">

                <thead>

                  <tr>

                    <th>Event</th>

                    <th>Category</th>

                    <th>Date</th>

                    <th>Registrations</th>

                    <th>Status</th>

                    <th>Actions</th>

                  </tr>

                </thead>


                <tbody>

                  {events.map((event) => {

                    const percentage = Math.round(
                      (event.registrations / event.capacity) * 100
                    );

                    return (
                      <tr key={event.id}>

                        <td>

                          <div className="admin-event-name">

                            <div className="admin-event-icon">
                              <CalendarDays size={18} />
                            </div>

                            <div>

                              <strong>
                                {event.title}
                              </strong>

                              <span>
                                ID: EVT-{event.id
                                  .toString()
                                  .padStart(4, "0")}
                              </span>

                            </div>

                          </div>

                        </td>


                        <td>

                          <span className="table-category">
                            {event.category}
                          </span>

                        </td>


                        <td>
                          {event.date}
                        </td>


                        <td>

                          <div className="registration-cell">

                            <div className="registration-numbers">

                              <strong>
                                {event.registrations}
                              </strong>

                              <span>
                                / {event.capacity}
                              </span>

                            </div>

                            <div className="mini-progress">

                              <div
                                style={{
                                  width: `${percentage}%`,
                                }}
                              />

                            </div>

                          </div>

                        </td>


                        <td>

                          <span
                            className={
                              event.status === "Published"
                                ? "status-badge published"
                                : "status-badge draft"
                            }
                          >
                            {event.status}
                          </span>

                        </td>


                        <td>

                          <div className="table-actions">

                            <Link
                              to={`/events/${event.id}`}
                              className="table-action"
                              title="View"
                            >
                              <Eye size={17} />
                            </Link>


                            <button
                              className="table-action"
                              title="Edit"
                              onClick={() =>
                                alert(
                                  "Edit functionality will be connected to the backend."
                                )
                              }
                            >
                              <Edit3 size={17} />
                            </button>


                            <button
                              className="table-action danger"
                              title="Delete"
                              onClick={() =>
                                handleDelete(event.id)
                              }
                            >
                              <Trash2 size={17} />
                            </button>

                          </div>

                        </td>

                      </tr>
                    );
                  })}

                </tbody>

              </table>


              {events.length === 0 && (

                <div className="empty-state">

                  <div className="empty-state-icon">
                    <CalendarDays size={28} />
                  </div>

                  <h3>No events available</h3>

                  <p>
                    Create your first campus event to get started.
                  </p>

                  <Link
                    to="/admin/create-event"
                    className="btn btn-primary"
                  >
                    <Plus size={17} />
                    Create Event
                  </Link>

                </div>

              )}

            </div>

          </div>


          {/* QUICK ACTIONS */}

          <div className="admin-quick-actions">

            <Link
              to="/admin/create-event"
              className="admin-action-card"
            >

              <div className="admin-action-icon purple">
                <Plus size={22} />
              </div>

              <div>

                <h3>Create Event</h3>

                <p>
                  Add a new event to Campus Pulse.
                </p>

              </div>

              <ArrowRight size={19} />

            </Link>


            <Link
              to="/events"
              className="admin-action-card"
            >

              <div className="admin-action-icon blue">
                <Eye size={22} />
              </div>

              <div>

                <h3>View Public Events</h3>

                <p>
                  See how students view your events.
                </p>

              </div>

              <ArrowRight size={19} />

            </Link>


            <div className="admin-action-card">

              <div className="admin-action-icon orange">
                <Users size={22} />
              </div>

              <div>

                <h3>Manage Students</h3>

                <p>
                  Student management will be connected to the backend.
                </p>

              </div>

              <MoreVertical size={19} />

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}
