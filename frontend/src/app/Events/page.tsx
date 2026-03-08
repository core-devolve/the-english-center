"use client";

import { useState } from "react";

interface Event {
  id: number;
  type: "Workshop" | "Webinar" | "Mock Test" | "Seminar";
  title: string;
  desc: string;
  date: string;
  time: string;
  speaker: string;
  price: string;
  isFree: boolean;
  seats: number;
  tag: string;
  bgFrom: string;
  bgTo: string;
  icon: string;
}

const events: Event[] = [
  {
    id: 1,
    type: "Workshop",
    title: "Spoken English Bootcamp",
    desc: "An intensive 3-hour workshop focused on building real-time conversational fluency through guided role plays and live feedback.",
    date: "March 15, 2025",
    time: "10:00 AM – 1:00 PM",
    speaker: "Mrs. Anjali Chatterjee",
    price: "₹299",
    isFree: false,
    seats: 30,
    tag: "Popular",
    bgFrom: "#4f46e5",
    bgTo: "#7c3aed",
    icon: "🎙️",
  },
  {
    id: 2,
    type: "Webinar",
    title: "IELTS Band 8+ Strategy",
    desc: "Live webinar covering proven strategies for Reading, Writing, Listening and Speaking to crack IELTS with a Band 8 or above.",
    date: "March 20, 2025",
    time: "6:00 PM – 7:30 PM",
    speaker: "Mrs. Anjali Chatterjee",
    price: "Free",
    isFree: true,
    seats: 100,
    tag: "Free",
    bgFrom: "#0ea5e9",
    bgTo: "#2563eb",
    icon: "🌐",
  },
  {
    id: 3,
    type: "Mock Test",
    title: "IELTS Full Mock Test",
    desc: "A timed, full-length IELTS simulation with all four modules evaluated and detailed score analysis provided after.",
    date: "March 22, 2025",
    time: "9:00 AM – 1:00 PM",
    speaker: "SpeakEdge Faculty",
    price: "₹199",
    isFree: false,
    seats: 20,
    tag: "Limited Seats",
    bgFrom: "#f59e0b",
    bgTo: "#ef4444",
    icon: "📝",
  },
  {
    id: 4,
    type: "Seminar",
    title: "Career English Masterclass",
    desc: "A power-packed seminar on professional English — email writing, presentation skills, and interview communication.",
    date: "March 28, 2025",
    time: "5:00 PM – 7:00 PM",
    speaker: "Mrs. Anjali Chatterjee",
    price: "₹149",
    isFree: false,
    seats: 50,
    tag: "New",
    bgFrom: "#10b981",
    bgTo: "#0d9488",
    icon: "💼",
  },
  {
    id: 5,
    type: "Workshop",
    title: "Grammar Intensive Workshop",
    desc: "Clear up all grammar doubts in one session — from tenses and articles to conditionals and reported speech.",
    date: "April 5, 2025",
    time: "11:00 AM – 2:00 PM",
    speaker: "Mrs. Anjali Chatterjee",
    price: "₹249",
    isFree: false,
    seats: 25,
    tag: "Upcoming",
    bgFrom: "#a78bfa",
    bgTo: "#ec4899",
    icon: "📖",
  },
  {
    id: 6,
    type: "Webinar",
    title: "Vocabulary Building Secrets",
    desc: "Learn memory techniques and context-based strategies to expand your vocabulary rapidly for exams and daily life.",
    date: "April 10, 2025",
    time: "7:00 PM – 8:00 PM",
    speaker: "SpeakEdge Faculty",
    price: "Free",
    isFree: true,
    seats: 200,
    tag: "Free",
    bgFrom: "#f43f5e",
    bgTo: "#db2777",
    icon: "✨",
  },
];

const filters = ["All", "Workshop", "Webinar", "Mock Test", "Seminar"] as const;
type Filter = typeof filters[number];

const typeColors: Record<string, { bg: string; text: string }> = {
  Workshop:  { bg: "#ede9fe", text: "#5b21b6" },
  Webinar:   { bg: "#dbeafe", text: "#1d4ed8" },
  "Mock Test": { bg: "#fef3c7", text: "#b45309" },
  Seminar:   { bg: "#d1fae5", text: "#065f46" },
};

const tagColors: Record<string, { bg: string; color: string }> = {
  Popular:       { bg: "#fbbf24", color: "#1a2340" },
  Free:          { bg: "#10b981", color: "#ffffff" },
  "Limited Seats": { bg: "#ef4444", color: "#ffffff" },
  New:           { bg: "#4f46e5", color: "#ffffff" },
  Upcoming:      { bg: "#6b7280", color: "#ffffff" },
};

function EventCard({ event }: { event: Event }) {
  const [hovered, setHovered] = useState(false);
  const tc = typeColors[event.type];
  const tg = tagColors[event.tag];

  return (
    <div
      className="ec-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 20px 48px rgba(79,70,229,0.15)"
          : "0 4px 20px rgba(0,0,0,0.07)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      {/* Card top gradient */}
      <div
        className="ec-card-top"
        style={{ background: `linear-gradient(135deg, ${event.bgFrom}, ${event.bgTo})` }}
      >
        <span className="ec-card-icon">{event.icon}</span>
        {/* Tag */}
        <span className="ec-card-tag" style={{ background: tg.bg, color: tg.color }}>
          {event.tag}
        </span>
      </div>

      {/* Card body */}
      <div className="ec-card-body">
        {/* Type pill */}
        <span className="ec-type-pill" style={{ background: tc.bg, color: tc.text }}>
          {event.type}
        </span>

        <h3 className="ec-card-title">{event.title}</h3>
        <p className="ec-card-desc">{event.desc}</p>

        {/* Meta info */}
        <div className="ec-meta">
          <div className="ec-meta-item">
            <span className="ec-meta-icon">📅</span>
            <span>{event.date}</span>
          </div>
          <div className="ec-meta-item">
            <span className="ec-meta-icon">⏰</span>
            <span>{event.time}</span>
          </div>
          <div className="ec-meta-item">
            <span className="ec-meta-icon">👩‍🏫</span>
            <span>{event.speaker}</span>
          </div>
          <div className="ec-meta-item">
            <span className="ec-meta-icon">🪑</span>
            <span>{event.seats} seats</span>
          </div>
        </div>

        {/* Footer */}
        <div className="ec-card-footer">
          <div className="ec-price">
            {event.isFree
              ? <span className="ec-price-free">FREE</span>
              : <span className="ec-price-paid">{event.price}</span>
            }
            {!event.isFree && <span className="ec-price-per">/ person</span>}
          </div>
          <button
            className="ec-register-btn"
            style={{ background: `linear-gradient(135deg, ${event.bgFrom}, ${event.bgTo})` }}
          >
            Register Now →
          </button>
        </div>
      </div>
    </div>
  );
}

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filtered = activeFilter === "All"
    ? events
    : events.filter(e => e.type === activeFilter);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700;800&display=swap');

        .ep-root, .ep-root *, .ep-root *::before, .ep-root *::after {
          box-sizing: border-box; margin: 0; padding: 0;
        }
        .ep-root {
          font-family: 'DM Sans', sans-serif;
          background: #f8f7ff;
          min-height: 100vh;
        }

        /* ── HERO ── */
        .ep-hero {
          background: linear-gradient(135deg, #0f0c29 0%, #1e1b4b 45%, #302b63 100%);
          padding: 88px 8% 76px;
          text-align: center;
          position: relative; overflow: hidden;
        }
        .ep-hero::after {
          content: '';
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }
        .ep-blob {
          position: absolute; border-radius: 50%;
          filter: blur(70px); pointer-events: none;
        }
        .ep-blob-1 { width: 320px; height: 320px; background: #7c3aed; opacity: 0.13; top: -80px; right: -40px; }
        .ep-blob-2 { width: 240px; height: 240px; background: #4f46e5; opacity: 0.13; bottom: -70px; left: -30px; }
        .ep-blob-3 { width: 180px; height: 180px; background: #fbbf24; opacity: 0.06; top: 20px; left: 35%; }

        .ep-hero-inner { position: relative; z-index: 2; }

        .ep-hero-badge {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(139,92,246,0.15);
          border: 1px solid rgba(139,92,246,0.35);
          color: #c4b5fd;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 10px; font-weight: 600;
          padding: 5px 16px; border-radius: 20px;
          text-transform: uppercase; letter-spacing: 2px;
          margin-bottom: 22px;
        }
        .ep-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #a78bfa;
          animation: epPulse 2s ease-in-out infinite;
        }
        .ep-hero-title {
          font-family: 'Fraunces', serif;
          font-size: clamp(38px, 5.5vw, 68px);
          font-weight: 900; color: #ffffff;
          line-height: 1.05; letter-spacing: -1.5px;
          margin-bottom: 18px;
        }
        .ep-hero-title .gold {
          font-style: italic; color: #fbbf24;
          position: relative; display: inline-block;
        }
        .ep-hero-title .gold::after {
          content: '';
          position: absolute; left: 0; bottom: -5px;
          width: 100%; height: 3px; border-radius: 2px;
          background: linear-gradient(90deg, #fbbf24, #f59e0b);
        }
        .ep-hero-sub {
          font-size: 15px; color: rgba(255,255,255,0.52);
          line-height: 1.75; max-width: 480px;
          margin: 0 auto 40px;
        }

        /* hero stats */
        .ep-hero-stats {
          display: flex; justify-content: center;
          gap: 48px; flex-wrap: wrap;
        }
        .ep-stat-num {
          font-family: 'Fraunces', serif;
          font-size: 26px; font-weight: 900; color: #fff;
          display: block; letter-spacing: -0.5px;
        }
        .ep-stat-lbl {
          font-size: 11px; color: rgba(255,255,255,0.45);
          display: block; margin-top: 3px;
        }

        /* ── FILTER BAR ── */
        .ep-filters-wrap {
          padding: 36px 8% 0;
          display: flex; align-items: center;
          justify-content: space-between; flex-wrap: wrap; gap: 16px;
        }
        .ep-filters-heading {
          font-family: 'Fraunces', serif;
          font-size: 22px; font-weight: 700; color: #0f0c29;
          letter-spacing: -0.3px;
        }
        .ep-filters-heading span { color: #4f46e5; font-style: italic; }
        .ep-filter-tabs {
          display: flex; gap: 8px; flex-wrap: wrap;
        }
        .ep-filter-btn {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 12px; font-weight: 700;
          padding: 7px 16px; border-radius: 999px;
          border: 2px solid transparent;
          cursor: pointer; transition: all 0.2s ease;
          letter-spacing: 0.2px;
        }
        .ep-filter-btn.active {
          background: #4f46e5; color: #ffffff;
          border-color: #4f46e5;
          box-shadow: 0 4px 14px rgba(79,70,229,0.3);
        }
        .ep-filter-btn.inactive {
          background: #ffffff; color: #6b7280;
          border-color: #e5e7eb;
        }
        .ep-filter-btn.inactive:hover {
          border-color: #4f46e5; color: #4f46e5;
        }

        /* ── GRID ── */
        .ep-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
          padding: 28px 8% 80px;
        }

        /* ── EVENT CARD ── */
        .ec-card {
          background: #ffffff;
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid rgba(79,70,229,0.08);
        }
        .ec-card-top {
          height: 110px;
          display: flex; align-items: center; justify-content: center;
          position: relative;
        }
        .ec-card-icon { font-size: 44px; filter: drop-shadow(0 4px 12px rgba(0,0,0,0.2)); }
        .ec-card-tag {
          position: absolute; top: 12px; right: 12px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 9px; font-weight: 800;
          padding: 3px 10px; border-radius: 20px;
          letter-spacing: 0.5px; text-transform: uppercase;
        }
        .ec-card-body { padding: 20px 20px 22px; }
        .ec-type-pill {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 10px; font-weight: 700;
          padding: 3px 10px; border-radius: 20px;
          text-transform: uppercase; letter-spacing: 0.5px;
          display: inline-block; margin-bottom: 10px;
        }
        .ec-card-title {
          font-family: 'Fraunces', serif;
          font-size: 17px; font-weight: 700;
          color: #0f0c29; line-height: 1.25;
          letter-spacing: -0.2px; margin-bottom: 8px;
        }
        .ec-card-desc {
          font-size: 12.5px; color: #6b7280;
          line-height: 1.68; margin-bottom: 16px;
        }
        .ec-meta {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 7px; margin-bottom: 18px;
        }
        .ec-meta-item {
          display: flex; align-items: center; gap: 6px;
          font-size: 11.5px; color: #4b5563; font-weight: 500;
        }
        .ec-meta-icon { font-size: 13px; flex-shrink: 0; }
        .ec-card-footer {
          display: flex; align-items: center;
          justify-content: space-between;
          padding-top: 16px;
          border-top: 1px solid #f3f4f6;
        }
        .ec-price { display: flex; align-items: baseline; gap: 3px; }
        .ec-price-free {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 18px; font-weight: 800; color: #10b981;
        }
        .ec-price-paid {
          font-family: 'Fraunces', serif;
          font-size: 20px; font-weight: 700; color: #0f0c29;
        }
        .ec-price-per {
          font-size: 11px; color: #9ca3af;
        }
        .ec-register-btn {
          color: #ffffff; border: none;
          padding: 9px 18px; border-radius: 9px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 12px; font-weight: 700;
          cursor: pointer; letter-spacing: 0.2px;
          box-shadow: 0 4px 14px rgba(0,0,0,0.15);
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .ec-register-btn:hover { opacity: 0.88; transform: translateY(-1px); }

        /* ── EMPTY STATE ── */
        .ep-empty {
          grid-column: 1 / -1;
          text-align: center; padding: 60px 20px;
          color: #9ca3af;
        }
        .ep-empty-icon { font-size: 48px; margin-bottom: 12px; }
        .ep-empty-text {
          font-family: 'Fraunces', serif;
          font-size: 20px; color: #6b7280;
        }

        /* ── NEWSLETTER STRIP ── */
        .ep-newsletter {
          background: linear-gradient(135deg, #1e1b4b, #312e81);
          padding: 52px 8%;
          display: flex; align-items: center;
          justify-content: space-between; gap: 32px; flex-wrap: wrap;
        }
        .ep-nl-title {
          font-family: 'Fraunces', serif;
          font-size: 24px; font-weight: 700; color: #ffffff;
          letter-spacing: -0.3px; margin-bottom: 6px;
        }
        .ep-nl-title span { color: #fbbf24; font-style: italic; }
        .ep-nl-sub { font-size: 13px; color: rgba(255,255,255,0.5); }
        .ep-nl-form {
          display: flex; gap: 10px; flex-wrap: wrap;
        }
        .ep-nl-input {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          color: #ffffff; border-radius: 10px;
          padding: 11px 18px; font-size: 13px;
          font-family: 'DM Sans', sans-serif;
          outline: none; width: 260px;
          transition: border-color 0.2s ease;
        }
        .ep-nl-input::placeholder { color: rgba(255,255,255,0.35); }
        .ep-nl-input:focus { border-color: rgba(167,139,250,0.6); }
        .ep-nl-btn {
          background: #fbbf24; color: #1e1b4b;
          border: none; border-radius: 10px;
          padding: 11px 22px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13px; font-weight: 800;
          cursor: pointer; transition: all 0.2s ease;
          white-space: nowrap;
        }
        .ep-nl-btn:hover { background: #f59e0b; transform: translateY(-1px); }

        /* ── ANIMATIONS ── */
        @keyframes epPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(1.4); }
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .ep-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .ep-grid { grid-template-columns: 1fr; padding: 20px 5% 60px; }
          .ep-hero { padding: 60px 6% 56px; }
          .ep-hero-stats { gap: 28px; }
          .ep-filters-wrap { padding: 28px 5% 0; }
          .ep-newsletter { flex-direction: column; padding: 40px 6%; }
          .ep-nl-input { width: 100%; }
        }
      `}</style>

      <div className="ep-root">

        {/* ── HERO ── */}
        <div className="ep-hero">
          <div className="ep-blob ep-blob-1" />
          <div className="ep-blob ep-blob-2" />
          <div className="ep-blob ep-blob-3" />

          <div className="ep-hero-inner">
            <div className="ep-hero-badge">
              <span className="ep-badge-dot" />
              Live · Online · Interactive
            </div>
            <h1 className="ep-hero-title">
              Upcoming <span className="gold">Events</span>
              <br />& Workshops
            </h1>
            <p className="ep-hero-sub">
              Join our live sessions, workshops, mock tests and seminars —
              designed to accelerate your English skills and open new doors.
            </p>
            <div className="ep-hero-stats">
              {[
                ["6+", "Events This Month"],
                ["Free", "Webinars Available"],
                ["Online", "100% Live"],
                ["Expert", "Led Sessions"],
              ].map(([num, lbl]) => (
                <div key={lbl} style={{ textAlign: "center" }}>
                  <span className="ep-stat-num">{num}</span>
                  <span className="ep-stat-lbl">{lbl}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── FILTER BAR ── */}
        <div className="ep-filters-wrap">
          <h2 className="ep-filters-heading">
            Browse <span>Events</span>
          </h2>
          <div className="ep-filter-tabs">
            {filters.map(f => (
              <button
                key={f}
                className={`ep-filter-btn ${activeFilter === f ? "active" : "inactive"}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* ── EVENTS GRID ── */}
        <div className="ep-grid">
          {filtered.length === 0 ? (
            <div className="ep-empty">
              <div className="ep-empty-icon">📭</div>
              <p className="ep-empty-text">No events found for this category.</p>
            </div>
          ) : (
            filtered.map(event => (
              <EventCard key={event.id} event={event} />
            ))
          )}
        </div>

        {/* ── NEWSLETTER STRIP ── */}
        <div className="ep-newsletter">
          <div>
            <div className="ep-nl-title">Never Miss an <span>Event</span> 🔔</div>
            <p className="ep-nl-sub">
              Get notified about upcoming workshops, free webinars and new batches.
            </p>
          </div>
          <div className="ep-nl-form">
            <input
              type="email"
              className="ep-nl-input"
              placeholder="Enter your email address"
            />
            <button className="ep-nl-btn">Notify Me →</button>
          </div>
        </div>

      </div>
    </>
  );
}