import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  MapPin,
  Users,
  Share2,
  CheckCircle2,
  UserRound,
} from "lucide-react";

const eventData = {
  1: {
    title: "Tech Fest 2026",
    category: "Technology",
    date: "20 September 2026",
    time: "10:00 AM - 5:00 PM",
    location: "Main Auditorium",
    registered: 245,
    capacity: 500,
    organizer: "Tech Club",
    organizerEmail: "techclub@campuspulse.edu",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=85",
    description:
      "Tech Fest 2026 brings together students, developers, innovators and technology enthusiasts for a full day of learning, collaboration and competition.",
    about:
      "Experience exciting technology showcases, technical workshops, student projects, coding activities and expert sessions. Whether you are an experienced developer or simply curious about technology, there is something for everyone.",
    highlights: [
      "Technology workshops",
      "Student project showcase",
      "Coding challenges",
      "Expert sessions",
      "Networking opportunities",
    ],
  },

  2: {
    title: "Cultural Night",
    category: "Cultural",
    date: "25 September 2026",
    time: "6:00 PM - 9:30 PM",
    location: "Open Air Theatre",
    registered: 180,
    capacity: 400,
    organizer: "Cultural Committee",
    organizerEmail: "culture@campuspulse.edu",
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1400&q=85",
    description:
      "An unforgettable evening celebrating music, dance, theatre and the diverse culture of our campus.",
    about:
      "Cultural Night brings students together for an evening of performances, creativity and celebration. Come support your friends and enjoy the talent across campus.",
    highlights: [
      "Live performances",
      "Dance showcases",
      "Music performances",
      "Student theatre",
      "Food and refreshments",
    ],
  },

  3: {
    title: "Inter College Hackathon",
    category: "Hackathon",
    date: "02 October 2026",
    time: "9:00 AM - 9:00 PM",
    location: "Innovation Lab",
    registered: 96,
    capacity: 200,
    organizer: "Coding Club",
    organizerEmail: "coding@campuspulse.edu",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=85",
    description:
      "Build innovative solutions, work with a team and compete with talented students from different colleges.",
    about:
      "The Inter College Hackathon is a collaborative coding event designed for students who want to solve real-world problems using technology.",
    highlights: [
      "12-hour coding challenge",
      "Team collaboration",
      "Mentor sessions",
      "Industry judges",
      "Prizes and certificates",
    ],
  },
};

export default function EventDetails() {
  const { id } = useParams();

  const event = eventData[id] || eventData[1];

  const [registered, setRegistered] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleRegister = () => {
    setRegistered(true);
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  const handleShare = async () => {
    const shareData = {
      title: event.title,
      text: `Check out ${event.title} on Campus Pulse!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Event link copied to clipboard!");
      }
    } catch (error) {
      console.log("Share cancelled");
    }
  };

  const percentage =
    Math.round((event.registered / event.capacity) * 100);

  return (
    <div className="event-details-page">

      {showMessage && (
        <div className="registration-toast">
          <CheckCircle2 size={20} />
          You have successfully registered for this event!
        </div>
      )}

      <section className="event-details-hero">

        <div className="container">

          <Link to="/events" className="back-link">
            <ArrowLeft size={17} />
            Back to Events
          </Link>

          <div className="event-details-image-wrapper">

            <img
              src={event.image}
              alt={event.title}
              className="event-details-image"
            />

            <span className="event-details-category">
              {event.category}
            </span>

          </div>

        </div>

      </section>


      <section className="event-details-content">

        <div className="container event-details-grid">

          <main>

            <div className="event-title-row">

              <div>

                <span className="section-label">
                  {event.category}
                </span>

                <h1>{event.title}</h1>

              </div>

              <button
                className="share-button"
                onClick={handleShare}
                aria-label="Share event"
              >
                <Share2 size={20} />
              </button>

            </div>


            <p className="event-large-description">
              {event.description}
            </p>


            <div className="event-meta-grid">

              <div className="event-meta-card">
                <div className="event-meta-icon">
                  <CalendarDays size={21} />
                </div>

                <div>
                  <span>Date</span>
                  <strong>{event.date}</strong>
                </div>
              </div>


              <div className="event-meta-card">
                <div className="event-meta-icon">
                  <Clock3 size={21} />
                </div>

                <div>
                  <span>Time</span>
                  <strong>{event.time}</strong>
                </div>
              </div>


              <div className="event-meta-card">
                <div className="event-meta-icon">
                  <MapPin size={21} />
                </div>

                <div>
                  <span>Location</span>
                  <strong>{event.location}</strong>
                </div>
              </div>


              <div className="event-meta-card">
                <div className="event-meta-icon">
                  <Users size={21} />
                </div>

                <div>
                  <span>Registered</span>
                  <strong>
                    {event.registered} students
                  </strong>
                </div>
              </div>

            </div>


            <div className="event-about">

              <h2>About This Event</h2>

              <p>{event.about}</p>

              <h3>Event Highlights</h3>

              <ul className="highlight-list">

                {event.highlights.map((item) => (
                  <li key={item}>
                    <CheckCircle2 size={18} />
                    {item}
                  </li>
                ))}

              </ul>

            </div>


            <div className="organizer-section">

              <h2>Organized By</h2>

              <div className="organizer-card">

                <div className="organizer-avatar">
                  <UserRound size={25} />
                </div>

                <div>
                  <h3>{event.organizer}</h3>
                  <p>{event.organizerEmail}</p>
                </div>

              </div>

            </div>

          </main>


          <aside className="registration-card">

            <div className="registration-card-header">

              <span>EVENT REGISTRATION</span>

              <h2>Reserve Your Spot</h2>

              <p>
                Join this event and be part of the
                campus experience.
              </p>

            </div>


            <div className="registration-progress">

              <div className="progress-header">

                <span>
                  {event.registered} registered
                </span>

                <span>
                  {event.capacity} capacity
                </span>

              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <small>
                {event.capacity - event.registered} spots remaining
              </small>

            </div>


            <button
              className={
                registered
                  ? "btn btn-success btn-large full-width"
                  : "btn btn-primary btn-large full-width"
              }
              onClick={handleRegister}
              disabled={registered}
            >
              {registered ? (
                <>
                  <CheckCircle2 size={18} />
                  Registered
                </>
              ) : (
                <>
                  Register for Event
                  <ArrowRightIcon />
                </>
              )}
            </button>


            <p className="registration-note">
              Free registration for all eligible students.
            </p>

          </aside>

        </div>

      </section>

    </div>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
