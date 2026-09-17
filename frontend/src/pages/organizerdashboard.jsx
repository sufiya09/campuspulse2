import React, { useEffect, useState } from "react";

const OrganizerDashboard = () => {
  const [events, setEvents] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Technology",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    organizer: "",
    image: "",
  });

  const [message, setMessage] = useState("");

  const loadEvents = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/events");
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error loading events:", error);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const createEvent = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to create event");
        return;
      }

      setMessage("Event published successfully!");

      setForm({
        title: "",
        description: "",
        category: "Technology",
        date: "",
        startTime: "",
        endTime: "",
        location: "",
        organizer: "",
        image: "",
      });

      loadEvents();
    } catch (error) {
      console.error(error);
      setMessage("Backend is not connected.");
    }
  };

  const deleteEvent = async (id) => {
    try {
      await fetch(`http://localhost:5001/api/events/${id}`, {
        method: "DELETE",
      });

      loadEvents();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        <h1 style={styles.heading}>Organizer Dashboard</h1>

        <p style={styles.subtitle}>
          Create and manage your college events
        </p>

        <div style={styles.card}>
          <h2>Create New Event</h2>

          <form onSubmit={createEvent}>

            <input
              style={styles.input}
              name="title"
              placeholder="Event Title"
              value={form.title}
              onChange={handleChange}
              required
            />

            <textarea
              style={styles.textarea}
              name="description"
              placeholder="Event Description"
              value={form.description}
              onChange={handleChange}
              required
            />

            <select
              style={styles.input}
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option>Technology</option>
              <option>Music</option>
              <option>Sports</option>
              <option>Cultural</option>
              <option>Workshop</option>
              <option>Competition</option>
              <option>Other</option>
            </select>

            <input
              style={styles.input}
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />

            <div style={styles.row}>
              <input
                style={styles.input}
                type="time"
                name="startTime"
                value={form.startTime}
                onChange={handleChange}
              />

              <input
                style={styles.input}
                type="time"
                name="endTime"
                value={form.endTime}
                onChange={handleChange}
              />
            </div>

            <input
              style={styles.input}
              name="location"
              placeholder="Event Location"
              value={form.location}
              onChange={handleChange}
              required
            />

            <input
              style={styles.input}
              name="organizer"
              placeholder="Organizer / Department"
              value={form.organizer}
              onChange={handleChange}
              required
            />

            <input
              style={styles.input}
              name="image"
              placeholder="Event Image URL"
              value={form.image}
              onChange={handleChange}
            />

            <button style={styles.button} type="submit">
              Publish Event
            </button>

          </form>

          {message && (
            <p style={styles.message}>{message}</p>
          )}
        </div>

        <div style={styles.card}>
          <h2>Manage Events</h2>

          {events.length === 0 ? (
            <p>No events created yet.</p>
          ) : (
            events.map((event) => (
              <div style={styles.event} key={event.id}>

                {event.image && (
                  <img
                    src={event.image}
                    alt={event.title}
                    style={styles.image}
                  />
                )}

                <div style={{ flex: 1 }}>
                  <h3>{event.title}</h3>

                  <p>{event.description}</p>

                  <p>
                    📅 {event.date}
                    {event.startTime &&
                      ` • ${event.startTime}`}
                  </p>

                  <p>📍 {event.location}</p>

                  <p>🏷️ {event.category}</p>

                  <p>👤 {event.organizer}</p>
                </div>

                <button
                  style={styles.deleteButton}
                  onClick={() => deleteEvent(event.id)}
                >
                  Delete
                </button>

              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f7fb",
    padding: "40px 20px",
  },

  container: {
    maxWidth: "1000px",
    margin: "auto",
  },

  heading: {
    fontSize: "36px",
    marginBottom: "5px",
  },

  subtitle: {
    color: "#666",
    marginBottom: "30px",
  },

  card: {
    background: "white",
    padding: "25px",
    borderRadius: "15px",
    marginBottom: "30px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
  },

  input: {
    width: "100%",
    padding: "13px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    boxSizing: "border-box",
    fontSize: "15px",
  },

  textarea: {
    width: "100%",
    height: "100px",
    padding: "13px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    boxSizing: "border-box",
    fontSize: "15px",
    resize: "vertical",
  },

  row: {
    display: "flex",
    gap: "15px",
  },

  button: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "8px",
    background: "#111827",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
  },

  message: {
    marginTop: "15px",
    fontWeight: "bold",
  },

  event: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    padding: "20px 0",
    borderBottom: "1px solid #eee",
  },

  image: {
    width: "150px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "10px",
  },

  deleteButton: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "7px",
    background: "#dc2626",
    color: "white",
    cursor: "pointer",
  },
};

export default OrganizerDashboard;