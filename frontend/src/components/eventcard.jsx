import { Link } from "react-router-dom";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Users,
  ArrowRight,
} from "lucide-react";

export default function EventCard({ event }) {
  return (
    <article className="event-card">

      <div className="event-image-wrapper">
        <img
          src={
            event.image ||
            "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=80"
          }
          alt={event.title}
          className="event-image"
        />

        <span className="event-category">
          {event.category || "College Event"}
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
              {event.registered || 0} registered
            </span>
          </div>

        </div>

        <div className="event-card-footer">

          <span className="event-organizer">
            {event.organizer || "Campus Pulse"}
          </span>

          <Link
            to={`/events/${event._id || event.id}`}
            className="event-link"
          >
            View Event
            <ArrowRight size={16} />
          </Link>

        </div>

      </div>

    </article>
  );
}
