import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  MapPin,
  Users,
  Image,
  FileText,
  Save,
  Eye,
} from "lucide-react";

const initialForm = {
  title: "",
  category: "Technology",
  date: "",
  time: "",
  location: "",
  capacity: "",
  description: "",
  image: "",
};

const categories = [
  "Technology",
  "Cultural",
  "Hackathon",
  "Workshop",
  "Sports",
  "Seminar",
  "Competition",
  "Other",
];

export default function CreateEvent() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.title ||
      !form.date ||
      !form.time ||
      !form.location ||
      !form.capacity ||
      !form.description
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (Number(form.capacity) <= 0) {
      setError("Capacity must be greater than zero.");
      return;
    }

    setError("");
    setSaved(true);

    // Temporary frontend behavior.
    // This will be replaced with an API request to MongoDB.

    setTimeout(() => {
      navigate("/admin");
    }, 1200);
  };

  return (
    <div className="create-event-page">

      {/* HEADER */}

      <section className="page-hero">

        <div className="container">

          <Link
            to="/admin"
            className="back-link"
          >
            <ArrowLeft size={17} />
            Back to Admin Dashboard
          </Link>

          <span className="section-label">
            EVENT MANAGEMENT
          </span>

          <h1>Create an Event</h1>

          <p>
            Share your event with students across the campus.
          </p>

        </div>

      </section>


      {/* FORM */}

      <section className="create-event-content">

        <div className="container">

          <form
            className="create-event-form"
            onSubmit={handleSubmit}
          >

            {error && (
              <div className="form-error">
                {error}
              </div>
            )}

            {saved && (
              <div className="form-success">
                Event created successfully! Redirecting...
              </div>
            )}


            {/* BASIC INFORMATION */}

            <div className="form-section">

              <div className="form-section-heading">

                <div className="form-section-icon">
                  <FileText size={20} />
                </div>

                <div>
                  <h2>Basic Information</h2>
                  <p>
                    Tell students what your event is about.
                  </p>
                </div>

              </div>


              <div className="form-grid">

                <div className="form-group form-full">

                  <label htmlFor="title">
                    Event Title *
                  </label>

                  <input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="e.g. Annual Technology Fest"
                    value={form.title}
                    onChange={handleChange}
                  />

                </div>


                <div className="form-group">

                  <label htmlFor="category">
                    Category *
                  </label>

                  <select
                    id="category"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                  >

                    {categories.map((category) => (
                      <option
                        key={category}
                        value={category}
                      >
                        {category}
                      </option>
                    ))}

                  </select>

                </div>


                <div className="form-group">

                  <label htmlFor="capacity">
                    Maximum Capacity *
                  </label>

                  <div className="input-wrapper">

                    <Users size={18} />

                    <input
                      id="capacity"
                      name="capacity"
                      type="number"
                      min="1"
                      placeholder="500"
                      value={form.capacity}
                      onChange={handleChange}
                    />

                  </div>

                </div>


                <div className="form-group">

                  <label htmlFor="description">
                    Description *
                  </label>

                  <textarea
                    id="description"
                    name="description"
                    rows="6"
                    placeholder="Describe your event..."
                    value={form.description}
                    onChange={handleChange}
                  />

                </div>


                <div className="form-group">

                  <label htmlFor="image">
                    Event Image URL
                  </label>

                  <div className="input-wrapper">

                    <Image size={18} />

                    <input
                      id="image"
                      name="image"
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={form.image}
                      onChange={handleChange}
                    />

                  </div>

                </div>

              </div>

            </div>


            {/* DATE AND LOCATION */}

            <div className="form-section">

              <div className="form-section-heading">

                <div className="form-section-icon">
                  <CalendarDays size={20} />
                </div>

                <div>
                  <h2>Date & Location</h2>
                  <p>
                    Tell students when and where the event happens.
                  </p>
                </div>

              </div>


              <div className="form-grid">

                <div className="form-group">

                  <label htmlFor="date">
                    Event Date *
                  </label>

                  <div className="input-wrapper">

                    <CalendarDays size={18} />

                    <input
                      id="date"
                      name="date"
                      type="date"
                      value={form.date}
                      onChange={handleChange}
                    />

                  </div>

                </div>


                <div className="form-group">

                  <label htmlFor="time">
                    Event Time *
                  </label>

                  <div className="input-wrapper">

                    <Clock3 size={18} />

                    <input
                      id="time"
                      name="time"
                      type="time"
                      value={form.time}
                      onChange={handleChange}
                    />

                  </div>

                </div>


                <div className="form-group form-full">

                  <label htmlFor="location">
                    Location *
                  </label>

                  <div className="input-wrapper">

                    <MapPin size={18} />

                    <input
                      id="location"
                      name="location"
                      type="text"
                      placeholder="e.g. Main Auditorium"
                      value={form.location}
                      onChange={handleChange}
                    />

                  </div>

                </div>

              </div>

            </div>


            {/* ACTIONS */}

            <div className="form-actions">

              <Link
                to="/admin"
                className="btn btn-outline"
              >
                Cancel
              </Link>


              <button
                type="button"
                className="btn btn-outline"
                onClick={() =>
                  alert(
                    "Event preview will be available after the backend is connected."
                  )
                }
              >
                <Eye size={17} />
                Preview
              </button>


              <button
                type="submit"
                className="btn btn-primary"
                disabled={saved}
              >
                <Save size={17} />
                {saved ? "Creating..." : "Create Event"}
              </button>

            </div>

          </form>

        </div>

      </section>

    </div>
  );
}
