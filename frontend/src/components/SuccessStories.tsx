"use client";

import { useRef, useState, useEffect } from "react";

interface Student {
  id: number;
  name: string;
  qualification: string;
  badge: string;
  initials: string;
  bgFrom: string;
  bgTo: string;
}

const students: Student[] = [
  { id: 1, name: "Arjun Reddy",    qualification: "Cost & Management Accountant", badge: "First Attempt", initials: "AR", bgFrom: "#f59e0b", bgTo: "#f97316" },
  { id: 2, name: "Sriraksha KS",   qualification: "Cost & Management Accountant", badge: "First Attempt", initials: "SK", bgFrom: "#f43f5e", bgTo: "#db2777" },
  { id: 3, name: "G Bhamnath",     qualification: "Cost & Management Accountant", badge: "First Attempt", initials: "GB", bgFrom: "#34d399", bgTo: "#0d9488" },
  { id: 4, name: "Sri Harish K P", qualification: "Cost & Management Accountant", badge: "First Attempt", initials: "SH", bgFrom: "#38bdf8", bgTo: "#2563eb" },
  { id: 5, name: "Rajath M P",     qualification: "Cost & Management Accountant", badge: "First Attempt", initials: "RM", bgFrom: "#a78bfa", bgTo: "#7c3aed" },
  { id: 6, name: "Mahmad Moshir",  qualification: "Cost & Management Accountant", badge: "First Attempt", initials: "MM", bgFrom: "#22d3ee", bgTo: "#4f46e5" },
  { id: 7, name: "Priya Sharma",   qualification: "Cost & Management Accountant", badge: "First Attempt", initials: "PS", bgFrom: "#e879f9", bgTo: "#e11d48" },
  { id: 8, name: "Karan Mehta",    qualification: "Cost & Management Accountant", badge: "First Attempt", initials: "KM", bgFrom: "#a3e635", bgTo: "#16a34a" },
];

function StudentCard({ student }: { student: Student }) {
  const [hovered, setHovered] = useState(false);
  const gradient = `linear-gradient(135deg, ${student.bgFrom}, ${student.bgTo})`;

  return (
    <div
      style={{ flexShrink: 0, width: 224, cursor: "pointer" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          position: "relative",
          borderRadius: 16,
          overflow: "hidden",
          backgroundColor: "#ffffff",
          border: "1px solid rgba(255,255,255,0.6)",
          boxShadow: hovered
            ? "0 20px 40px rgba(99,102,241,0.18)"
            : "0 2px 12px rgba(0,0,0,0.08)",
          transform: hovered ? "translateY(-8px)" : "translateY(0)",
          transition: "box-shadow 0.4s ease, transform 0.4s ease",
        }}
      >
        {/* Top accent bar */}
        <div style={{ height: 4, background: gradient }} />

        {/* Avatar */}
        <div
          style={{
            position: "relative",
            height: 220,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: gradient,
          }}
        >
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 52,
              fontWeight: 700,
              color: "rgba(255,255,255,0.85)",
              letterSpacing: "-1px",
              userSelect: "none",
            }}
          >
            {student.initials}
          </span>
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(255,255,255,0.08)",
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}
          />
        </div>

        {/* Info */}
        <div style={{ padding: "16px 16px 20px" }}>
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: 15,
              color: "#1a2340",
              lineHeight: 1.3,
              margin: 0,
            }}
          >
            {student.name}
          </h3>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: "#6b7693",
              marginTop: 4,
              lineHeight: 1.4,
            }}
          >
            {student.qualification}
          </p>

          {/* Badge */}
          <div style={{ marginTop: 12 }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif",
                padding: "6px 12px",
                borderRadius: 999,
                transition: "all 0.3s ease",
                background: hovered ? gradient : "#fef9e7",
                color: hovered ? "#ffffff" : "#b8860b",
                border: hovered ? "1px solid transparent" : "1px solid #f0d060",
                boxShadow: hovered ? "0 4px 12px rgba(0,0,0,0.15)" : "none",
              }}
            >
              <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {student.badge}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SuccessStories() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const positionRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const SPEED = 0.6;

    const animate = () => {
      if (!isPaused && track) {
        positionRef.current += SPEED;
        const half = track.scrollWidth / 2;
        if (positionRef.current >= half) positionRef.current = 0;
        track.style.transform = `translateX(-${positionRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPaused]);

  const doubled = [...students, ...students];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes ss-fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ss-a0 { animation: ss-fadeUp 0.7s 0.00s ease both; }
        .ss-a1 { animation: ss-fadeUp 0.7s 0.15s ease both; }
        .ss-a2 { animation: ss-fadeUp 0.7s 0.28s ease both; }
        .ss-a3 { animation: ss-fadeUp 0.7s 0.42s ease both; }

        .ss-cta-btn {
          position: relative;
          overflow: hidden;
          padding: 14px 32px;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
          background: linear-gradient(135deg, #1a2340, #2d3a6e);
          transition: box-shadow 0.3s ease, background 0.3s ease;
        }
        .ss-cta-btn:hover {
          background: linear-gradient(135deg, #f59e0b, #ef4444);
          box-shadow: 0 12px 32px rgba(245,158,11,0.35);
        }
        .ss-cta-btn:active {
          transform: scale(0.97);
        }
      `}</style>

      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          padding: "80px 0",
          background: "linear-gradient(160deg, #f8f9ff 0%, #eef1fb 40%, #fdfaf0 100%)",
        }}
      >
        {/* Decorative blobs */}
        <div style={{
          position: "absolute", top: 0, left: "25%",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, #c7d2fe, transparent 70%)",
          opacity: 0.25, filter: "blur(80px)", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: 0, right: "20%",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, #fde68a, transparent 70%)",
          opacity: 0.3, filter: "blur(80px)", pointerEvents: "none",
        }} />

        {/* ── Header ── */}
        <div
          className="ss-a0"
          style={{ textAlign: "center", padding: "0 24px", marginBottom: 56, position: "relative", zIndex: 1 }}
        >
          <span style={{
            display: "inline-block",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11, fontWeight: 600,
            letterSpacing: "0.18em", textTransform: "uppercase",
            padding: "6px 16px", borderRadius: 999,
            border: "1px solid #fcd34d", color: "#a16207", background: "#fefce8",
            marginBottom: 16,
          }}>
            🏆 Hall of Fame
          </span>

          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              fontWeight: 900, color: "#1a2340",
              lineHeight: 1.1, margin: "0 0 20px",
            }}
          >
            First Attempt{" "}
            <span style={{ position: "relative", display: "inline-block" }}>
              <span style={{
                position: "relative", zIndex: 1,
                background: "linear-gradient(135deg, #f59e0b, #ef4444)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Success
              </span>
              <span style={{
                position: "absolute", bottom: 4, left: 0, right: 0,
                height: 10, borderRadius: 8, opacity: 0.2,
                background: "linear-gradient(90deg, #f59e0b, #ef4444)",
              }} />
            </span>{" "}
            Stories
          </h1>

          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 17, color: "#6b7693",
            maxWidth: 480, margin: "0 auto 32px", lineHeight: 1.65,
          }}>
            Celebrating our exceptional students who cleared prestigious
            professional exams in their very first attempt
          </p>

          {/* Stats */}
          <div className="ss-a1" style={{ display: "flex", justifyContent: "center", gap: 40 }}>
            {[["500+", "First Attempters"], ["98%", "Pass Rate"], ["15+", "Qualifications"]].map(([val, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 900, color: "#1a2340" }}>
                  {val}
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#9aa3be", marginTop: 2 }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Carousel ── */}
        <div
          className="ss-a2"
          style={{ position: "relative", width: "100%", overflow: "hidden" }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div style={{
            position: "absolute", top: 0, left: 0, bottom: 0, width: 100,
            background: "linear-gradient(to right, #f4f5fb, transparent)",
            zIndex: 10, pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", top: 0, right: 0, bottom: 0, width: 100,
            background: "linear-gradient(to left, #f4f5fb, transparent)",
            zIndex: 10, pointerEvents: "none",
          }} />

          <div
            ref={trackRef}
            style={{
              display: "flex",
              gap: 20,
              padding: "12px 40px 20px",
              width: "max-content",
              willChange: "transform",
            }}
          >
            {doubled.map((student, i) => (
              <StudentCard key={`${student.id}-${i}`} student={student} />
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="ss-a3" style={{ marginTop: 48 }}>
          <button className="ss-cta-btn">
            View All Success Stories →
          </button>
        </div>
      </section>
    </>
  );
}