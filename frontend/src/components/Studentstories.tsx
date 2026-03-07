"use client";

import { useState } from "react";

interface Story {
  id: number;
  name: string;
  label: string;
  bgFrom: string;
  bgTo: string;
  initials: string;
  progress: number;
}

const stories: Story[] = [
  { id: 1, name: "Ananya Rao",    label: "Student Success Story", bgFrom: "#1a2340", bgTo: "#2d3a6e", initials: "AR", progress: 30 },
  { id: 2, name: "Vikram Nair",   label: "Student Success Story", bgFrom: "#14532d", bgTo: "#166534", initials: "VN", progress: 55 },
  { id: 3, name: "Karthik S",     label: "Student Success Story", bgFrom: "#1e3a5f", bgTo: "#1d4ed8", initials: "KS", progress: 80 },
  { id: 4, name: "Meera Pillai",  label: "Student Success Story", bgFrom: "#4a1942", bgTo: "#7e22ce", initials: "MP", progress: 100 },
];

function PhoneCard({ story }: { story: Story }) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  return (
    <div
      style={{
        flexShrink: 0,
        width: 220,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Phone shell */}
      <div
        style={{
          width: 220,
          height: 390,
          borderRadius: 28,
          overflow: "hidden",
          position: "relative",
          background: `linear-gradient(160deg, ${story.bgFrom}, ${story.bgTo})`,
          boxShadow: "0 20px 50px rgba(0,0,0,0.22)",
          border: "3px solid #1a2340",
          cursor: "pointer",
        }}
        onClick={() => setPlaying(!playing)}
      >
        {/* Top label bar */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0,
          background: "#1a2340",
          padding: "8px 12px",
          display: "flex", alignItems: "center", gap: 6,
          zIndex: 5,
        }}>
          <span style={{
            width: 8, height: 8, borderRadius: "50%",
            background: "#f5c800",
            display: "inline-block",
          }} />
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 10, fontWeight: 700,
            letterSpacing: "0.12em", color: "#f5c800",
            textTransform: "uppercase",
          }}>
            ▶ {story.label}
          </span>
        </div>

        {/* Placeholder "video" content */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          background: `linear-gradient(160deg, ${story.bgFrom}cc, ${story.bgTo}cc)`,
        }}>
          {/* Avatar circle */}
          <div style={{
            width: 80, height: 80, borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            border: "2px solid rgba(255,255,255,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 12,
          }}>
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 28, fontWeight: 700,
              color: "rgba(255,255,255,0.9)",
            }}>
              {story.initials}
            </span>
          </div>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13, color: "rgba(255,255,255,0.85)", fontWeight: 500,
          }}>
            {story.name}
          </span>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11, color: "rgba(255,255,255,0.5)",
            marginTop: 4,
          }}>
            Tap to play
          </span>

          {/* Big play button */}
          {!playing && (
            <div style={{
              position: "absolute",
              width: 52, height: 52, borderRadius: "50%",
              background: "rgba(255,255,255,0.2)",
              border: "2px solid rgba(255,255,255,0.5)",
              display: "flex", alignItems: "center", justifyContent: "center",
              backdropFilter: "blur(4px)",
              bottom: 80,
            }}>
              <svg width={20} height={20} viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          )}
          {playing && (
            <div style={{
              position: "absolute",
              width: 52, height: 52, borderRadius: "50%",
              background: "rgba(255,255,255,0.2)",
              border: "2px solid rgba(255,255,255,0.5)",
              display: "flex", alignItems: "center", justifyContent: "center",
              backdropFilter: "blur(4px)",
              bottom: 80,
            }}>
              <svg width={18} height={18} viewBox="0 0 24 24" fill="white">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            </div>
          )}
        </div>

        {/* Bottom controls bar */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(4px)",
          padding: "8px 12px",
          zIndex: 5,
        }}>
          {/* Progress bar */}
          <div style={{
            height: 3, borderRadius: 2,
            background: "rgba(255,255,255,0.2)",
            marginBottom: 8, position: "relative",
          }}>
            <div style={{
              position: "absolute", top: 0, left: 0,
              height: "100%", borderRadius: 2,
              width: `${story.progress}%`,
              background: "#f5c800",
              transition: "width 0.3s ease",
            }} />
          </div>

          {/* Controls row */}
          <div style={{
            display: "flex", alignItems: "center",
            justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              {/* Play/Pause */}
              <button
                onClick={e => { e.stopPropagation(); setPlaying(!playing); }}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 0, lineHeight: 1 }}
              >
                {playing
                  ? <svg width={14} height={14} viewBox="0 0 24 24" fill="white"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                  : <svg width={14} height={14} viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                }
              </button>
              {/* Mute */}
              <button
                onClick={e => { e.stopPropagation(); setMuted(!muted); }}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 0, lineHeight: 1 }}
              >
                {muted
                  ? <svg width={14} height={14} viewBox="0 0 24 24" fill="white"><path d="M16.5 12A4.5 4.5 0 0 0 14 7.97V10.18L16.45 12.63C16.48 12.43 16.5 12.22 16.5 12ZM19 12C19 12.94 18.8 13.82 18.46 14.64L19.97 16.15C20.62 14.91 21 13.5 21 12C21 7.72 18.01 4.14 14 3.23V5.29C16.89 6.15 19 8.83 19 12ZM4.27 3L3 4.27 7.73 9H3V15H7L12 20V13.27L16.25 17.52C15.58 18.04 14.83 18.45 14 18.7V20.76C15.38 20.45 16.63 19.82 17.68 18.96L19.73 21 21 19.73 12 10.73 4.27 3ZM12 4L9.91 6.09 12 8.18V4Z"/></svg>
                  : <svg width={14} height={14} viewBox="0 0 24 24" fill="white"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
                }
              </button>
              {/* Fullscreen */}
              <svg width={13} height={13} viewBox="0 0 24 24" fill="white" style={{ cursor: "pointer" }}>
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
              </svg>
            </div>
            {/* Number badge */}
            <div style={{
              width: 22, height: 22, borderRadius: "50%",
              background: "#f5c800",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11, fontWeight: 700, color: "#1a2340",
            }}>
              {story.id}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StudentStories() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600;700&display=swap');

        @keyframes ss2-fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ss2-a0 { animation: ss2-fadeUp 0.65s 0.00s ease both; }
        .ss2-a1 { animation: ss2-fadeUp 0.65s 0.12s ease both; }
        .ss2-a2 { animation: ss2-fadeUp 0.65s 0.25s ease both; }
      `}</style>

      <section style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "80px 24px",
        background: "linear-gradient(160deg, #eef1f7 0%, #e8ecf5 50%, #f0f4ff 100%)",
      }}>
        {/* Decorative blobs */}
        <div style={{
          position: "absolute", top: "10%", right: "5%",
          width: 350, height: 350, borderRadius: "50%",
          background: "radial-gradient(circle, #bfdbfe, transparent 70%)",
          opacity: 0.4, filter: "blur(70px)", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "5%", left: "5%",
          width: 300, height: 300, borderRadius: "50%",
          background: "radial-gradient(circle, #fde68a, transparent 70%)",
          opacity: 0.35, filter: "blur(70px)", pointerEvents: "none",
        }} />

        {/* ── Header ── */}
        <div className="ss2-a0" style={{ textAlign: "center", marginBottom: 56, position: "relative", zIndex: 1 }}>
          {/* Pill */}
          <div style={{ marginBottom: 20 }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11, fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase",
              padding: "8px 20px", borderRadius: 999,
              background: "#f5c800", color: "#1a2340",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1a2340", display: "inline-block" }} />
              Student Stories
            </span>
          </div>

          <h1 style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 900, color: "#1a2340",
            lineHeight: 1.15, margin: "0 0 16px",
          }}>
            Hear From Our{" "}
            <span style={{ position: "relative", display: "inline-block" }}>
              Students
              <span style={{
                position: "absolute", bottom: -4, left: 0, right: 0,
                height: 4, borderRadius: 2,
                background: "#f5c800",
              }} />
            </span>
          </h1>

          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16, color: "#6b7693",
            margin: "0 auto", maxWidth: 420, lineHeight: 1.6,
          }}>
            Real voices. Real journeys. Real SuccessEdge.
          </p>
        </div>

        {/* ── Phone grid ── */}
        <div
          className="ss2-a1"
          style={{
            display: "flex",
            gap: 24,
            flexWrap: "wrap",
            justifyContent: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          {stories.map(story => (
            <PhoneCard key={story.id} story={story} />
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="ss2-a2" style={{ marginTop: 52 }}>
          <button
            style={{
              padding: "14px 36px",
              borderRadius: 999,
              border: "2px solid #1a2340",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14, fontWeight: 700,
              color: "#1a2340",
              background: "transparent",
              letterSpacing: "0.04em",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={e => {
              const b = e.currentTarget;
              b.style.background = "#1a2340";
              b.style.color = "#f5c800";
            }}
            onMouseLeave={e => {
              const b = e.currentTarget;
              b.style.background = "transparent";
              b.style.color = "#1a2340";
            }}
          >
            View All Student Stories →
          </button>
        </div>
      </section>
    </>
  );
}