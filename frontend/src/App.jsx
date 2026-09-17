import React, { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Users,
  Search,
  ArrowRight,
  MapPin,
  Clock3,
  Menu,
  X,
  Sparkles,
  Laptop,
  Music,
  Trophy,
  BookOpen,
  Home,
  LayoutDashboard,
  UserPlus,
  LogIn,
  ChevronRight,
  Filter,
  CalendarCheck,
  Building2,
  Star,
  Heart,
  Share2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import "./App.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import CampusAI from "./components/CampusAI";
import OrganizerDashboard from "./pages/OrganizerDashboard";

/* =========================================================
   CAMPUS PULSE
   Main Application
========================================================= */

const API_URL = "https://campuspulse2.onrender.com";

/* =========================================================
   DEFAULT EVENTS
========================================================= */

const defaultEvents = [
  {
    id: 1,
    title: "Tech Fest 2026",
    description:
      "Innovation, technology and ideas come together in an exciting campus technology festival.",
    category: "Technology",
    date: "20 Sep 2026",
    startTime: "10:00 AM",
    endTime: "5:00 PM",
    location: "Main Auditorium",
    organizer: "Computer Science Club",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    title: "Campus Music Night",
    description:
      "An evening filled with music, performances, creativity and unforgettable campus memories.",
    category: "Cultural",
    date: "24 Sep 2026",
    startTime: "6:00 PM",
    endTime: "9:00 PM",
    location: "Open Air Theatre",
    organizer: "Music Club",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    title: "Inter College Sports Meet",
    description:
      "Compete, connect and celebrate campus sports with students from different colleges.",
    category: "Sports",
    date: "28 Sep 2026",
    startTime: "8:00 AM",
    endTime: "4:00 PM",
    location: "University Stadium",
    organizer: "Sports Committee",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    title: "AI & Machine Learning Workshop",
    description:
      "Learn the fundamentals of AI and machine learning through practical demonstrations.",
    category: "Technology",
    date: "02 Oct 2026",
    startTime: "10:00 AM",
    endTime: "1:00 PM",
    location: "Innovation Lab",
    organizer: "AI Club",
    image:
      "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 5,
    title: "Campus Debate Championship",
    description:
      "Showcase your communication, reasoning and public speaking skills in the campus debate.",
    category: "Academic",
    date: "06 Oct 2026",
    startTime: "11:00 AM",
    endTime: "3:00 PM",
    location: "Seminar Hall",
    organizer: "Literary Club",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 6,
    title: "Cultural Heritage Day",
    description:
      "Celebrate traditions, creativity, food, art and cultural diversity across the campus.",
    category: "Cultural",
    date: "10 Oct 2026",
    startTime: "9:00 AM",
    endTime: "6:00 PM",
    location: "Central Ground",
    organizer: "Cultural Committee",
    image:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80",
  },
];

/* =========================================================
   CATEGORY DATA
========================================================= */

const categories = [
  {
    name: "All",
    icon: Sparkles,
  },
  {
    name: "Technology",
    icon: Laptop,
  },
  {
    name: "Cultural",
    icon: Music,
  },
  {
    name: "Sports",
    icon: Trophy,
  },
  {
    name: "Academic",
    icon: BookOpen,
  },
];

/* =========================================================
   CATEGORY ICON
========================================================= */

function CategoryIcon({ category, size = 18 }) {
  const Icon =
    category === "Technology"
      ? Laptop
      : category === "Cultural"
      ? Music
      : category === "Sports"
      ? Trophy
      : category === "Academic"
      ? BookOpen
      : Sparkles;

  return <Icon size={size} />;
}

/* =========================================================
   EVENT CARD
========================================================= */

function EventCard({
  event,
  onRegister,
  onViewDetails,
  isRegistered,
}) {
  return (
    <article className="event-card">
      <div className="event-image-wrapper">
        <img
          className="event-image"
          src={event.image}
          alt={event.title}
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1200&q=80";
          }}
        />

        <div className="event-image-overlay">
          <span className="event-category">
            <CategoryIcon category={event.category} size={14} />
            {event.category}
          </span>

          <button
            className="event-favorite"
            type="button"
            aria-label="Save event"
          >
            <Heart size={17} />
          </button>
        </div>
      </div>

      <div className="event-card-content">
        <h3>{event.title}</h3>

        <p>{event.description}</p>

        <div className="event-info">
          <div className="event-info-item">
            <CalendarDays size={17} />
            <span>{event.date}</span>
          </div>

          <div className="event-info-item">
            <Clock3 size={17} />
            <span>
              {event.startTime}
              {event.endTime ? ` - ${event.endTime}` : ""}
            </span>
          </div>

          <div className="event-info-item">
            <MapPin size={17} />
            <span>{event.location}</span>
          </div>

          <div className="event-info-item">
            <Users size={17} />
            <span>{event.organizer}</span>
          </div>
        </div>

        <div className="event-card-actions">
          <button
            className="btn btn-outline"
            type="button"
            onClick={() => onViewDetails(event)}
          >
            View Details
          </button>

          <button
            className="btn btn-primary"
            type="button"
            onClick={() => onRegister(event)}
            disabled={isRegistered}
          >
            {isRegistered ? (
              <>
                <CheckCircle size={15} />
                Registered
              </>
            ) : (
              <>
                Register
                <ArrowRight size={15} />
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   NAVBAR
========================================================= */

function Navbar({
  currentPage,
  navigate,
  user,
  onLogout,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const goTo = (page) => {
    navigate(page);
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button
          className="brand-button"
          onClick={() => goTo("home")}
          type="button"
        >
          <div className="brand-icon">
            <Sparkles size={20} />
          </div>

          <div className="logo">
            Campus <span>Pulse</span>
          </div>
        </button>
      </div>

      <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
        <button
          className={currentPage === "home" ? "active" : ""}
          onClick={() => goTo("home")}
          type="button"
        >
          <Home size={16} />
          Home
        </button>

        <button
          className={currentPage === "events" ? "active" : ""}
          onClick={() => goTo("events")}
          type="button"
        >
          <CalendarDays size={16} />
          Events
        </button>

        <button
          className={currentPage === "dashboard" ? "active" : ""}
          onClick={() => goTo("dashboard")}
          type="button"
        >
          <LayoutDashboard size={16} />
          Dashboard
        </button>

        <button
          className={currentPage === "organizer" ? "active" : ""}
          onClick={() => goTo("organizer")}
          type="button"
        >
          <Building2 size={16} />
          Organizer
        </button>
      </nav>

      <div className="nav-buttons">
        {user ? (
          <>
            <span className="nav-user">
              Hi, {user.name?.split(" ")[0] || "User"}
            </span>

            <button
              className="btn btn-outline"
              onClick={onLogout}
              type="button"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              className="btn btn-outline"
              onClick={() => goTo("login")}
              type="button"
            >
              <LogIn size={15} />
              Login
            </button>

            <button
              className="btn btn-primary"
              onClick={() => goTo("register")}
              type="button"
            >
              <UserPlus size={15} />
              Sign Up
            </button>
          </>
        )}
      </div>

      <button
        className="mobile-menu-button"
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={23} /> : <Menu size={23} />}
      </button>
    </header>
  );
}

/* =========================================================
   HERO SECTION
========================================================= */

function Hero({ navigate }) {
  return (
    <section className="hero">
      <div className="hero-background-circle circle-one"></div>
      <div className="hero-background-circle circle-two"></div>

      <div className="hero-content">
        <div className="hero-badge">
          <Sparkles size={16} />
          Your Campus. Your Events. Your Community.
        </div>

        <h1>
          Discover What's Happening
          <br />
          <span>On Your Campus</span>
        </h1>

        <p>
          Find workshops, competitions, cultural events, sports,
          technology events and more — all in one place.
        </p>

        <div className="hero-buttons">
          <button
            className="btn btn-primary hero-main-button"
            type="button"
            onClick={() => navigate("events")}
          >
            Explore Events
            <ArrowRight size={18} />
          </button>

          <button
            className="btn btn-outline hero-secondary-button"
            type="button"
            onClick={() => navigate("register")}
          >
            Join Campus Pulse
          </button>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <CalendarCheck size={20} />
            <div>
              <strong>100+</strong>
              <span>Campus Events</span>
            </div>
          </div>

          <div className="hero-stat">
            <Users size={20} />
            <div>
              <strong>5K+</strong>
              <span>Students</span>
            </div>
          </div>

          <div className="hero-stat">
            <Building2 size={20} />
            <div>
              <strong>50+</strong>
              <span>Organizers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   CATEGORY SECTION
========================================================= */

function CategorySection({
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <section className="category-section">
      <div className="section-container">
        <div className="section-header category-header">
          <div>
            <span className="section-eyebrow">
              <Filter size={15} />
              Explore by category
            </span>

            <h2 className="section-title">
              Find Events You Love
            </h2>

            <p className="section-subtitle">
              Browse campus activities based on your interests.
            </p>
          </div>
        </div>

        <div className="category-list">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <button
                key={category.name}
                type="button"
                className={`category-button ${
                  selectedCategory === category.name
                    ? "category-selected"
                    : ""
                }`}
                onClick={() =>
                  setSelectedCategory(category.name)
                }
              >
                <span className="category-button-icon">
                  <Icon size={19} />
                </span>

                <span>{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   FEATURED EVENTS
========================================================= */

function FeaturedEvents({
  events,
  selectedCategory,
  searchQuery,
  setSearchQuery,
  onRegister,
  onViewDetails,
  registeredEvents,
  navigate,
}) {
  const filteredEvents = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return events.filter((event) => {
      const matchesCategory =
        selectedCategory === "All" ||
        event.category === selectedCategory;

      const matchesSearch =
        !query ||
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.category.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query) ||
        event.organizer.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [events, selectedCategory, searchQuery]);

  const visibleEvents = filteredEvents.slice(0, 6);

  return (
    <section className="section events-section" id="events">
      <div className="section-container">
        <div className="section-header">
          <div>
            <span className="section-eyebrow">
              <Star size={15} />
              Featured Events
            </span>

            <h2 className="section-title">
              Explore What's Happening
            </h2>

            <p className="section-subtitle">
              Discover the latest events happening on campus.
            </p>
          </div>

          <button
            className="view-all-button"
            type="button"
            onClick={() => navigate("events")}
          >
            View All Events
            <ChevronRight size={17} />
          </button>
        </div>

        <div className="event-search">
          <div className="search-icon">
            <Search size={19} />
          </div>

          <input
            type="text"
            placeholder="Search events, clubs, locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {searchQuery && (
            <button
              className="clear-search"
              type="button"
              onClick={() => setSearchQuery("")}
            >
              <X size={17} />
            </button>
          )}
        </div>

        {visibleEvents.length > 0 ? (
          <div className="events-grid">
            {visibleEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onRegister={onRegister}
                onViewDetails={onViewDetails}
                isRegistered={registeredEvents.includes(event.id)}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Search size={42} />
            <h3>No events found</h3>
            <p>
              Try another search term or choose a different category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

/* =========================================================
   WHY CAMPUS PULSE
========================================================= */

function WhyCampusPulse() {
  const features = [
    {
      icon: Search,
      title: "Discover Easily",
      text: "Find campus events without searching through multiple groups and messages.",
    },
    {
      icon: CalendarDays,
      title: "Stay Updated",
      text: "Keep track of upcoming workshops, competitions, cultural programs and more.",
    },
    {
      icon: Users,
      title: "Connect",
      text: "Discover clubs, organizers and activities that match your interests.",
    },
    {
      icon: Sparkles,
      title: "AI Assistance",
      text: "Get quick help from Campus Pulse AI while exploring events.",
    },
  ];

  return (
    <section className="section why-section">
      <div className="section-container">
        <div className="why-heading">
          <span className="section-eyebrow">
            <Sparkles size={15} />
            Why Campus Pulse?
          </span>

          <h2 className="section-title">
            Everything Your Campus Needs
          </h2>

          <p className="section-subtitle">
            One simple platform to discover, manage and participate
            in campus activities.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div className="feature-card" key={feature.title}>
                <div className="feature-icon">
                  <Icon size={25} />
                </div>

                <h3>{feature.title}</h3>

                <p>{feature.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   CTA
========================================================= */

function CTASection({ navigate }) {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <div className="cta-icon">
          <Sparkles size={28} />
        </div>

        <div className="cta-content">
          <h2>Ready to discover your next campus experience?</h2>

          <p>
            Join Campus Pulse and never miss an event that matters
            to you.
          </p>
        </div>

        <button
          className="btn btn-primary cta-button"
          type="button"
          onClick={() => navigate("register")}
        >
          Get Started
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}

/* =========================================================
   FOOTER
========================================================= */

function Footer({ navigate }) {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <button
            className="footer-logo-button"
            type="button"
            onClick={() => navigate("home")}
          >
            <div className="footer-logo-icon">
              <Sparkles size={19} />
            </div>

            <h3>
              Campus <span>Pulse</span>
            </h3>
          </button>

          <p>
            Your one-stop platform for discovering and managing
            campus events.
          </p>

          <div className="footer-socials">
            <span>Campus Events</span>
            <span>•</span>
            <span>Community</span>
            <span>•</span>
            <span>Innovation</span>
          </div>
        </div>

        <div className="footer-column">
          <h4>Quick Links</h4>

          <button type="button" onClick={() => navigate("home")}>
            Home
          </button>

          <button type="button" onClick={() => navigate("events")}>
            Events
          </button>

          <button
            type="button"
            onClick={() => navigate("dashboard")}
          >
            Dashboard
          </button>

          <button
            type="button"
            onClick={() => navigate("organizer")}
          >
            Organizer
          </button>
        </div>

        <div className="footer-column">
          <h4>Categories</h4>

          <button type="button" onClick={() => navigate("events")}>
            Technology
          </button>

          <button type="button" onClick={() => navigate("events")}>
            Cultural
          </button>

          <button type="button" onClick={() => navigate("events")}>
            Sports
          </button>

          <button type="button" onClick={() => navigate("events")}>
            Academic
          </button>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © 2026 Campus Pulse. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

/* =========================================================
   HOME PAGE
========================================================= */

function HomePage({
  events,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  onRegister,
  onViewDetails,
  registeredEvents,
  navigate,
}) {
  return (
    <>
      <Hero navigate={navigate} />

      <CategorySection
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <FeaturedEvents
        events={events}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onRegister={onRegister}
        onViewDetails={onViewDetails}
        registeredEvents={registeredEvents}
        navigate={navigate}
      />

      <WhyCampusPulse />

      <CTASection navigate={navigate} />
    </>
  );
}

/* =========================================================
   EVENTS PAGE
========================================================= */

function EventsPage({
  events,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  onRegister,
  onViewDetails,
  registeredEvents,
}) {
  const filteredEvents = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return events.filter((event) => {
      const matchesCategory =
        selectedCategory === "All" ||
        event.category === selectedCategory;

      const matchesSearch =
        !query ||
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.category.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query) ||
        event.organizer.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [events, selectedCategory, searchQuery]);

  return (
    <main className="page-container events-page">
      <div className="page-heading">
        <span className="section-eyebrow">
          <CalendarDays size={16} />
          Campus Events
        </span>

        <h1>Explore All Events</h1>

        <p>
          Find workshops, competitions, cultural events, sports
          meets and technology programs happening on campus.
        </p>
      </div>

      <div className="events-toolbar">
        <div className="event-search">
          <Search size={19} />

          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="category-list compact">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <button
                key={category.name}
                type="button"
                className={`category-button ${
                  selectedCategory === category.name
                    ? "category-selected"
                    : ""
                }`}
                onClick={() =>
                  setSelectedCategory(category.name)
                }
              >
                <Icon size={16} />
                {category.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="events-result-count">
        <span>
          Showing <strong>{filteredEvents.length}</strong> events
        </span>
      </div>

      {filteredEvents.length > 0 ? (
        <div className="events-grid all-events-grid">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onRegister={onRegister}
              onViewDetails={onViewDetails}
              isRegistered={registeredEvents.includes(event.id)}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state large-empty">
          <CalendarDays size={50} />
          <h3>No events available</h3>
          <p>
            Try changing your search or selecting another category.
          </p>
        </div>
      )}
    </main>
  );
}

/* =========================================================
   EVENT DETAILS PAGE
========================================================= */

function EventDetailsPage({
  event,
  onRegister,
  isRegistered,
  navigate,
}) {
  if (!event) {
    return (
      <main className="page-container">
        <div className="empty-state large-empty">
          <AlertCircle size={48} />
          <h2>Event not found</h2>

          <button
            className="btn btn-primary"
            type="button"
            onClick={() => navigate("events")}
          >
            Back to Events
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="event-details">
      <div className="event-details-card">
        <img
          className="event-details-image"
          src={event.image}
          alt={event.title}
        />

        <div className="event-details-content">
          <div className="event-details-category">
            <CategoryIcon category={event.category} size={16} />
            {event.category}
          </div>

          <h1>{event.title}</h1>

          <p className="event-details-description">
            {event.description}
          </p>

          <div className="event-details-grid">
            <div className="detail-box">
              <CalendarDays size={21} />
              <div>
                <span>Date</span>
                <strong>{event.date}</strong>
              </div>
            </div>

            <div className="detail-box">
              <Clock3 size={21} />
              <div>
                <span>Time</span>
                <strong>
                  {event.startTime}
                  {event.endTime
                    ? ` - ${event.endTime}`
                    : ""}
                </strong>
              </div>
            </div>

            <div className="detail-box">
              <MapPin size={21} />
              <div>
                <span>Location</span>
                <strong>{event.location}</strong>
              </div>
            </div>

            <div className="detail-box">
              <Users size={21} />
              <div>
                <span>Organizer</span>
                <strong>{event.organizer}</strong>
              </div>
            </div>
          </div>

          <div className="event-details-actions">
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => onRegister(event)}
              disabled={isRegistered}
            >
              {isRegistered ? (
                <>
                  <CheckCircle size={17} />
                  You Are Registered
                </>
              ) : (
                <>
                  Register for Event
                  <ArrowRight size={17} />
                </>
              )}
            </button>

            <button
              className="btn btn-outline"
              type="button"
            >
              <Share2 size={17} />
              Share
            </button>

            <button
              className="btn btn-outline"
              type="button"
              onClick={() => navigate("events")}
            >
              Back to Events
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   STUDENT DASHBOARD
========================================================= */

function StudentDashboard({
  user,
  events,
  registeredEvents,
  navigate,
}) {
  const registeredEventObjects = events.filter((event) =>
    registeredEvents.includes(event.id)
  );

  return (
    <main className="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <span className="section-eyebrow">
            <LayoutDashboard size={16} />
            Student Dashboard
          </span>

          <h1>
            Welcome back, {user?.name || "Student"}!
          </h1>

          <p>
            Keep track of your campus activities and registered
            events.
          </p>
        </div>

        <div className="dashboard-stat-grid">
          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon">
              <CalendarDays size={22} />
            </div>

            <div>
              <strong>{events.length}</strong>
              <span>Available Events</span>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon">
              <CheckCircle size={22} />
            </div>

            <div>
              <strong>{registeredEvents.length}</strong>
              <span>Registered Events</span>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon">
              <Users size={22} />
            </div>

            <div>
              <strong>5K+</strong>
              <span>Campus Members</span>
            </div>
          </div>
        </div>

        <section className="dashboard-section">
          <div className="dashboard-section-header">
            <div>
              <h2>Your Registered Events</h2>
              <p>
                Events you have registered for will appear here.
              </p>
            </div>

            <button
              className="btn btn-outline"
              type="button"
              onClick={() => navigate("events")}
            >
              Explore Events
            </button>
          </div>

          {registeredEventObjects.length > 0 ? (
            <div className="dashboard-event-list">
              {registeredEventObjects.map((event) => (
                <div
                  className="dashboard-event-card"
                  key={event.id}
                >
                  <img
                    src={event.image}
                    alt={event.title}
                  />

                  <div className="dashboard-event-info">
                    <span className="event-category">
                      {event.category}
                    </span>

                    <h3>{event.title}</h3>

                    <p>
                      <CalendarDays size={15} />
                      {event.date}
                    </p>

                    <p>
                      <MapPin size={15} />
                      {event.location}
                    </p>
                  </div>

                  <div className="dashboard-event-status">
                    <CheckCircle size={18} />
                    Registered
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state dashboard-empty">
              <CalendarDays size={42} />

              <h3>No registered events yet</h3>

              <p>
                Explore the events and register for something
                interesting.
              </p>

              <button
                className="btn btn-primary"
                type="button"
                onClick={() => navigate("events")}
              >
                Explore Events
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

/* =========================================================
   MAIN APP
========================================================= */

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const [events, setEvents] = useState(defaultEvents);

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [searchQuery, setSearchQuery] = useState("");

  const [selectedEvent, setSelectedEvent] =
    useState(null);

  const [registeredEvents, setRegisteredEvents] =
    useState([]);

  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem(
        "campusPulseUser"
      );

      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [notification, setNotification] =
    useState(null);

  /* =======================================================
     NAVIGATION
  ======================================================= */

  const navigate = (page) => {
    setCurrentPage(page);

    if (page !== "details") {
      setSelectedEvent(null);
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =======================================================
     FETCH EVENTS
  ======================================================= */

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/events`
        );

        if (!response.ok) {
          return;
        }

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          setEvents(data);
        }
      } catch (error) {
        console.log(
          "Using default events because backend events are unavailable."
        );
      }
    };

    loadEvents();
  }, []);

  /* =======================================================
     REGISTER EVENT
  ======================================================= */

  const handleRegister = (event) => {
    if (!user) {
      setNotification({
        type: "info",
        message:
          "Please login or create an account before registering for an event.",
      });

      setTimeout(() => {
        setNotification(null);
        navigate("login");
      }, 1500);

      return;
    }

    if (registeredEvents.includes(event.id)) {
      return;
    }

    setRegisteredEvents((previous) => [
      ...previous,
      event.id,
    ]);

    setNotification({
      type: "success",
      message: `You are registered for ${event.title}!`,
    });

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  /* =======================================================
     VIEW EVENT DETAILS
  ======================================================= */

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
    setCurrentPage("details");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =======================================================
     LOGIN SUCCESS
  ======================================================= */

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);

    try {
      localStorage.setItem(
        "campusPulseUser",
        JSON.stringify(loggedInUser)
      );
    } catch {
      // Ignore localStorage errors.
    }

    setNotification({
      type: "success",
      message: "Welcome back to Campus Pulse!",
    });

    setTimeout(() => {
      setNotification(null);
      navigate("dashboard");
    }, 800);
  };

  /* =======================================================
     REGISTER SUCCESS
  ======================================================= */

  const handleRegisterSuccess = (newUser) => {
    setUser(newUser);

    try {
      localStorage.setItem(
        "campusPulseUser",
        JSON.stringify(newUser)
      );
    } catch {
      // Ignore localStorage errors.
    }

    setNotification({
      type: "success",
      message:
        "Your Campus Pulse account has been created!",
    });

    setTimeout(() => {
      setNotification(null);
      navigate("dashboard");
    }, 800);
  };

  /* =======================================================
     LOGOUT
  ======================================================= */

  const handleLogout = () => {
    setUser(null);

    try {
      localStorage.removeItem("campusPulseUser");
    } catch {
      // Ignore localStorage errors.
    }

    setNotification({
      type: "success",
      message: "You have been logged out.",
    });

    setTimeout(() => {
      setNotification(null);
    }, 2500);

    navigate("home");
  };

  /* =======================================================
     RENDER PAGE
  ======================================================= */

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <HomePage
            events={events}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onRegister={handleRegister}
            onViewDetails={handleViewDetails}
            registeredEvents={registeredEvents}
            navigate={navigate}
          />
        );

      case "events":
        return (
          <EventsPage
            events={events}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onRegister={handleRegister}
            onViewDetails={handleViewDetails}
            registeredEvents={registeredEvents}
          />
        );

      case "details":
        return (
          <EventDetailsPage
            event={selectedEvent}
            onRegister={handleRegister}
            isRegistered={
              selectedEvent
                ? registeredEvents.includes(
                    selectedEvent.id
                  )
                : false
            }
            navigate={navigate}
          />
        );

         case "login":
  return (
    <Login
      onLogin={handleLoginSuccess}
      onRegister={() => navigate("register")}
      onBack={() => navigate("home")}
    />
  );
      case "register":
        return (
          <Register
            onRegisterSuccess={handleRegisterSuccess}
            navigate={navigate}
          />
        );

      case "dashboard":
        if (!user) {
          return (
            <main className="page-container">
              <div className="empty-state large-empty">
                <LogIn size={48} />

                <h2>Login Required</h2>

                <p>
                  Please login to access your student
                  dashboard.
                </p>

                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => navigate("login")}
                >
                  Login
                </button>
              </div>
            </main>
          );
        }

        return (
          <StudentDashboard
            user={user}
            events={events}
            registeredEvents={registeredEvents}
            navigate={navigate}
          />
        );

      case "organizer":
        return (
          <OrganizerDashboard
            events={events}
            setEvents={setEvents}
            user={user}
            navigate={navigate}
          />
        );

      default:
        return (
          <HomePage
            events={events}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onRegister={handleRegister}
            onViewDetails={handleViewDetails}
            registeredEvents={registeredEvents}
            navigate={navigate}
          />
        );
    }
  };

  /* =======================================================
     RETURN
  ======================================================= */

  return (
    <div className="app">
      <Navbar
        currentPage={currentPage}
        navigate={navigate}
        user={user}
        onLogout={handleLogout}
      />

      {notification && (
        <div
          className={`notification notification-${notification.type}`}
        >
          {notification.type === "success" ? (
            <CheckCircle size={19} />
          ) : (
            <AlertCircle size={19} />
          )}

          <span>{notification.message}</span>

          <button
            type="button"
            onClick={() => setNotification(null)}
          >
            <X size={17} />
          </button>
        </div>
      )}

      <div className="main-content">
        {renderPage()}
      </div>

      <Footer navigate={navigate} />

      <CampusAI />
    </div>
  );
}

export default App;

 