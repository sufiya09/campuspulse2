import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  Search,
  SlidersHorizontal,
  MapPin,
  Clock3,
  Users,
  ArrowRight,
} from "lucide-react";

const events = [
  {
    id: 1,
    title: "Tech Fest 2026",
    category: "Technology",
    date: "20 Sep 2026",
    time: "10:00 AM",
    location: "Main Auditorium",
    registered: 245,
    description:
      "A celebration of technology, innovation and student ideas.",
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
    description:
      "An evening of music, dance, performances and campus culture.",
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
    description:
      "Build innovative solutions and compete with talented developers.",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    title: "Photography Workshop",
    category: "Workshop",
    date: "08 Oct 2026",
    time: "2:00 PM",
    location: "Media Room",
    registered: 54,
    description:
      "Learn practical photography techniques from experienced creators.",
    image:
      "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    title: "Annual Sports Meet",
    category: "Sports",
    date: "15 Oct 2026",
    time: "8:00 AM",
    location: "College Ground",
    registered: 320,
    description:
      "Compete, support your teams and celebrate campus sports.",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    title: "AI & Future Technology",
    category: "Seminar",
    date: "20 Oct 2026",
    time: "11:00 AM",
    location: "Seminar Hall",
    registered: 145,
    description:
      "Explore emerging technologies and the future of artificial intelligence.",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80",
  },
];

const categories = [
  "All",
  "Technology",
  "Cultural",
  "Hackathon",
  "Workshop",
  "Sports",
  "Seminar",
];

export default function Events() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.description.toLowerCase().includes(search.toLowerCase()) ||
        event.location.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || event.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <div className="events-page">

      <section className="page-hero">
        <div className="container">

          <span className="section-label">
            CAMPUS EVENTS
          </span>

          <h1>Discover Events</h1>

          <p>
            Find workshops, competitions, fests, seminars and
            activities happening around your campus.
          </p>

        </div>
      </section>


      <section className="events-list-section">

        <div className="container">

          <div className="event-toolbar">

            <div className="search-input-wrapper">
              <Search size={20} />

              <input
                type="text"
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>


            <div className="filter-wrapper">
              <SlidersHorizontal size={18} />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

          </div>


          <div className="category-tabs">

            {categories.map((item) => (
              <button
                key={item}
                className={
                  category === item
                    ? "category-tab active"
                    : "category-tab"
                }
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}

          </div>


          <div className="events-result-header">

            <div>
              <h2>Upcoming Events</h2>

              <p>
                {filteredEvents.length} events found
              </p>
            </div>

            <div className="result-date">
              <CalendarDays size={17} />
              September - October 2026
            </div>

          </div>


          {filteredEvents.length > 0 ? (

            <div className="event-grid">

              {filteredEvents.map((event) => (

                <article
                  className="event-card"
                  key={event.id}
                >

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
                      {event.description}
                    </p>


                    <div className="event-info">

                      <div>
                        <CalendarDays size={16} />
                        <span>{event.date}</span>
                      </div>

                      <div>
                        <Clock3 size={16} />
                        <span>{event.time}</span>
                      </div>

                      <div>
                        <MapPin size={16} />
                        <span>{event.location}</span>
                      </div>

                      <div>
                        <Users size={16} />
                        <span>
                          {event.registered} registered
                        </span>
                      </div>

                    </div>


                    <div className="event-card-footer">

                      <span className="event-organizer">
                        Campus Pulse
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

                </article>

              ))}

            </div>

          ) : (

            <div className="empty-state">

              <div className="empty-state-icon">
                <Search size={28} />
              </div>

              <h3>No events found</h3>

              <p>
                Try changing your search or selecting another
                category.
              </p>

              <button
                className="btn btn-primary"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
              >
                Clear Filters
              </button>

            </div>

          )}

        </div>

      </section>

    </div>
  );
}
