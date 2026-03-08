"use client";

import { useState } from "react";

type Category = "All" | "Events" | "Workshops" | "Achievements" | "Certificates";

interface GalleryItem {
  id: number;
  category: Exclude<Category, "All">;
  title: string;
  subtitle: string;
  emoji: string;
  height: number; // px — each card has its own unique height
  bgFrom: string;
  bgTo: string;
  date: string;
}

const items: GalleryItem[] = [
  { id: 1,  category: "Events",       title: "IELTS Seminar 2024",           subtitle: "80+ students attended a full-day seminar on IELTS strategy and band improvement.",  emoji: "🎤", height: 340, bgFrom: "#1e1b4b", bgTo: "#4f46e5", date: "Dec 2024" },
  { id: 2,  category: "Workshops",    title: "Spoken English Bootcamp",      subtitle: "3-hour intensive session with live role plays.",                                      emoji: "🗣️", height: 260, bgFrom: "#0f4c81", bgTo: "#0ea5e9", date: "Nov 2024" },
  { id: 3,  category: "Achievements", title: "Band 8.5 IELTS",               subtitle: "Priya Sharma cracked IELTS Band 8.5 on her very first attempt.",                    emoji: "🏆", height: 200, bgFrom: "#78350f", bgTo: "#f59e0b", date: "Oct 2024" },
  { id: 4,  category: "Certificates", title: "Batch 12 Graduation",          subtitle: "32 students received their spoken English certificates at a beautiful ceremony.",    emoji: "🎓", height: 300, bgFrom: "#14532d", bgTo: "#10b981", date: "Sep 2024" },
  { id: 5,  category: "Events",       title: "Vocabulary Webinar",           subtitle: "200+ live attendees joined our free vocabulary webinar.",                            emoji: "✨", height: 220, bgFrom: "#4a1942", bgTo: "#a855f7", date: "Sep 2024" },
  { id: 6,  category: "Workshops",    title: "Grammar Masterclass",          subtitle: "Advanced tenses, reported speech, conditionals and more — in one power-packed day.", emoji: "📖", height: 360, bgFrom: "#1e3a5f", bgTo: "#3b82f6", date: "Aug 2024" },
  { id: 7,  category: "Achievements", title: "Perfect Band 9",               subtitle: "Rahul Verma achieved a perfect Band 9 — a historic milestone for SpeakEdge.",       emoji: "⭐", height: 240, bgFrom: "#7f1d1d", bgTo: "#ef4444", date: "Aug 2024" },
  { id: 8,  category: "Events",       title: "Career English Night",         subtitle: "Industry speakers joined us for an evening of English for the workplace.",           emoji: "💼", height: 200, bgFrom: "#134e4a", bgTo: "#0d9488", date: "Jul 2024" },
  { id: 9,  category: "Certificates", title: "Spoken English Certificate",   subtitle: "Batch 11 graduated with 28 proud students receiving their certificates.",            emoji: "📜", height: 280, bgFrom: "#1e1b4b", bgTo: "#7c3aed", date: "Jul 2024" },
  { id: 10, category: "Workshops",    title: "Interview Prep Workshop",      subtitle: "Mock interviews, grooming tips and live feedback for job-seekers.",                  emoji: "🤝", height: 230, bgFrom: "#0c4a6e", bgTo: "#0284c7", date: "Jun 2024" },
  { id: 11, category: "Achievements", title: "Top Scorer — June",            subtitle: "Anjali Rao scored 98% in our monthly English proficiency test.",                    emoji: "🥇", height: 200, bgFrom: "#365314", bgTo: "#84cc16", date: "Jun 2024" },
  { id: 12, category: "Events",       title: "Open Day 2024",                subtitle: "Students, parents and faculty came together for a wonderful open house.",            emoji: "🏫", height: 320, bgFrom: "#312e81", bgTo: "#8b5cf6", date: "May 2024" },
  { id: 13, category: "Workshops",    title: "PTE Exam Strategy Session",    subtitle: "Deep dive into PTE Academic with timed practice and scoring tips.",                  emoji: "📊", height: 250, bgFrom: "#1c1917", bgTo: "#78716c", date: "May 2024" },
  { id: 14, category: "Certificates", title: "Advanced English Batch 9",     subtitle: "Top performers from Batch 9 received advanced English certificates.",                emoji: "🏅", height: 200, bgFrom: "#0c0a3e", bgTo: "#4338ca", date: "Apr 2024" },
  { id: 15, category: "Achievements", title: "Student of the Year",          subtitle: "Meera Pillai was awarded Student of the Year for her outstanding consistency.",      emoji: "👑", height: 310, bgFrom: "#4c0519", bgTo: "#be185d", date: "Apr 2024" },
];

const filters: Category[] = ["All", "Events", "Workshops", "Achievements", "Certificates"];

const categoryColors: Record<Exclude<Category, "All">, { bg: string; text: string }> = {
  Events:       { bg: "#ede9fe", text: "#5b21b6" },
  Workshops:    { bg: "#dbeafe", text: "#1d4ed8" },
  Achievements: { bg: "#fef3c7", text: "#b45309" },
  Certificates: { bg: "#d1fae5", text: "#065f46" },
};

// Split items into N columns, distributing by shortest column
function buildColumns(items: GalleryItem[], count: number): GalleryItem[][] {
  const cols: GalleryItem[][] = Array.from({ length: count }, () => []);
  const heights = new Array(count).fill(0);
  for (const item of items) {
    const shortest = heights.indexOf(Math.min(...heights));
    cols[shortest].push(item);
    heights[shortest] += item.height + 220; // visual + caption approx
  }
  return cols;
}

function GalleryCard({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const cc = categoryColors[item.category];

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 16,
        overflow: "hidden",
        cursor: "pointer",
        marginBottom: 16,
        background: "#ffffff",
        border: "1px solid rgba(79,70,229,0.08)",
        boxShadow: hovered ? "0 20px 50px rgba(79,70,229,0.18)" : "0 3px 16px rgba(0,0,0,0.07)",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        transition: "box-shadow 0.35s ease, transform 0.35s ease",
      }}
    >
      {/* Visual area */}
      <div
        style={{
          height: item.height,
          background: `linear-gradient(145deg, ${item.bgFrom}, ${item.bgTo})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", overflow: "hidden",
        }}
      >
        {/* shimmer */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(160deg, rgba(255,255,255,0.09) 0%, transparent 55%)",
          pointerEvents: "none",
        }} />

        {/* emoji */}
        <span style={{
          fontSize: item.height > 300 ? 80 : item.height > 220 ? 64 : 52,
          filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.25))",
          transform: hovered ? "scale(1.1)" : "scale(1)",
          transition: "transform 0.35s ease",
          position: "relative", zIndex: 1,
          userSelect: "none",
        }}>
          {item.emoji}
        </span>

        {/* hover overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(10,8,30,0.60)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 8,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
          zIndex: 2,
        }}>
          <div style={{
            width: 42, height: 42, borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            border: "2px solid rgba(255,255,255,0.5)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, backdropFilter: "blur(4px)",
          }}>🔍</div>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 10, fontWeight: 700,
            color: "rgba(255,255,255,0.8)",
            letterSpacing: "1.5px", textTransform: "uppercase",
          }}>View</span>
        </div>
      </div>

      {/* Caption */}
      <div style={{ padding: "13px 15px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 7 }}>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 9, fontWeight: 800,
            padding: "3px 9px", borderRadius: 20,
            textTransform: "uppercase", letterSpacing: "0.5px",
            background: cc.bg, color: cc.text,
          }}>
            {item.category}
          </span>
          <span style={{ fontSize: 10, color: "#9ca3af", fontFamily: "'DM Sans', sans-serif" }}>
            {item.date}
          </span>
        </div>
        <div style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 14, fontWeight: 700,
          color: "#0f0c29", letterSpacing: "-0.1px",
          lineHeight: 1.3, marginBottom: 5,
        }}>
          {item.title}
        </div>
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 12, color: "#6b7280", lineHeight: 1.6,
        }}>
          {item.subtitle}
        </div>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const [active, setActive] = useState<Category>("All");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const filtered = active === "All" ? items : items.filter(i => i.category === active);
  const columns = buildColumns(filtered, 3);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700;800&display=swap');

        .gp-root, .gp-root *, .gp-root *::before, .gp-root *::after {
          box-sizing: border-box; margin: 0; padding: 0;
        }
        .gp-root { font-family: 'DM Sans', sans-serif; background: #f8f7ff; min-height: 100vh; }

        /* ── HERO ── */
        .gp-hero {
          background: linear-gradient(135deg, #0f0c29 0%, #1e1b4b 45%, #302b63 100%);
          padding: 88px 8% 76px;
          text-align: center; position: relative; overflow: hidden;
        }
        .gp-hero::after {
          content: ''; position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 40px 40px; pointer-events: none;
        }
        .gp-blob { position: absolute; border-radius: 50%; filter: blur(70px); pointer-events: none; }
        .gp-blob-1 { width: 320px; height: 320px; background: #7c3aed; opacity: 0.13; top: -80px; right: -40px; }
        .gp-blob-2 { width: 240px; height: 240px; background: #4f46e5; opacity: 0.13; bottom: -70px; left: -30px; }
        .gp-blob-3 { width: 180px; height: 180px; background: #fbbf24; opacity: 0.06; top: 10px; left: 40%; }

        .gp-hero-inner { position: relative; z-index: 2; }
        .gp-hero-badge {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(139,92,246,0.15); border: 1px solid rgba(139,92,246,0.35);
          color: #c4b5fd; font-family: 'Space Grotesk', sans-serif;
          font-size: 10px; font-weight: 600; padding: 5px 16px;
          border-radius: 20px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 22px;
        }
        .gp-badge-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #a78bfa;
          animation: gpPulse 2s ease-in-out infinite;
        }
        .gp-hero-title {
          font-family: 'Fraunces', serif;
          font-size: clamp(40px, 5.5vw, 72px);
          font-weight: 900; color: #fff;
          line-height: 1.05; letter-spacing: -2px; margin-bottom: 18px;
        }
        .gp-hero-title .gold {
          font-style: italic; color: #fbbf24; position: relative; display: inline-block;
        }
        .gp-hero-title .gold::after {
          content: ''; position: absolute; left: 0; bottom: -5px;
          width: 100%; height: 3px; border-radius: 2px;
          background: linear-gradient(90deg, #fbbf24, #f59e0b);
        }
        .gp-hero-sub {
          font-size: 15px; color: rgba(255,255,255,0.52);
          line-height: 1.75; max-width: 440px; margin: 0 auto 40px;
        }
        .gp-hero-stats { display: flex; justify-content: center; gap: 48px; flex-wrap: wrap; }
        .gp-stat-num {
          font-family: 'Fraunces', serif; font-size: 28px;
          font-weight: 900; color: #fff; display: block; letter-spacing: -0.5px;
        }
        .gp-stat-lbl { font-size: 11px; color: rgba(255,255,255,0.45); display: block; margin-top: 3px; }

        /* ── FILTER BAR ── */
        .gp-filter-bar {
          padding: 36px 8% 28px;
          display: flex; align-items: center;
          justify-content: space-between; flex-wrap: wrap; gap: 16px;
        }
        .gp-filter-heading {
          font-family: 'Fraunces', serif; font-size: 22px;
          font-weight: 700; color: #0f0c29; letter-spacing: -0.3px;
        }
        .gp-filter-heading span { color: #4f46e5; font-style: italic; }
        .gp-filter-tabs { display: flex; gap: 8px; flex-wrap: wrap; }
        .gp-filter-btn {
          font-family: 'Space Grotesk', sans-serif; font-size: 12px; font-weight: 700;
          padding: 7px 18px; border-radius: 999px; border: 2px solid transparent;
          cursor: pointer; transition: all 0.2s ease; letter-spacing: 0.2px;
        }
        .gp-filter-btn.on  { background: #4f46e5; color: #fff; border-color: #4f46e5; box-shadow: 0 4px 14px rgba(79,70,229,0.3); }
        .gp-filter-btn.off { background: #fff; color: #6b7280; border-color: #e5e7eb; }
        .gp-filter-btn.off:hover { border-color: #4f46e5; color: #4f46e5; }

        /* ── MASONRY ── */
        .gp-masonry {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          padding: 0 8% 80px;
          align-items: start;
        }
        .gp-col { display: flex; flex-direction: column; }

        /* ── LIGHTBOX ── */
        .gp-lb-bg {
          position: fixed; inset: 0; z-index: 1000;
          background: rgba(10,8,30,0.92);
          backdrop-filter: blur(12px);
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
          animation: gpFadeIn 0.22s ease;
        }
        .gp-lb-box {
          background: #ffffff; border-radius: 22px; overflow: hidden;
          max-width: 500px; width: 100%;
          box-shadow: 0 40px 100px rgba(0,0,0,0.55);
          animation: gpSlideUp 0.3s ease; position: relative;
        }
        .gp-lb-visual {
          width: 100%; height: 260px;
          display: flex; align-items: center; justify-content: center;
        }
        .gp-lb-emoji { font-size: 96px; filter: drop-shadow(0 8px 32px rgba(0,0,0,0.3)); }
        .gp-lb-body { padding: 22px 26px 26px; }
        .gp-lb-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
        .gp-lb-title {
          font-family: 'Fraunces', serif; font-size: 22px;
          font-weight: 700; color: #0f0c29; letter-spacing: -0.3px; margin-bottom: 8px;
        }
        .gp-lb-sub { font-size: 13.5px; color: #6b7280; line-height: 1.68; margin-bottom: 18px; }
        .gp-lb-meta {
          display: flex; gap: 16px; flex-wrap: wrap;
          padding-top: 16px; border-top: 1px solid #f1f5f9;
        }
        .gp-lb-meta-item { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #4b5563; }
        .gp-lb-close {
          position: absolute; top: 12px; right: 12px;
          width: 34px; height: 34px; border-radius: 50%;
          background: rgba(255,255,255,0.18); border: 2px solid rgba(255,255,255,0.45);
          color: #fff; font-size: 16px; cursor: pointer; z-index: 10;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
        }
        .gp-lb-close:hover { background: rgba(255,255,255,0.32); }

        /* ── KEYFRAMES ── */
        @keyframes gpPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(1.4); }
        }
        @keyframes gpFadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes gpSlideUp {
          from { opacity: 0; transform: translateY(28px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .gp-masonry { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .gp-masonry { grid-template-columns: 1fr; padding: 0 5% 60px; }
          .gp-hero { padding: 60px 6% 56px; }
          .gp-hero-stats { gap: 28px; }
          .gp-filter-bar { padding: 28px 5% 20px; }
        }
      `}</style>

      <div className="gp-root">

        {/* HERO */}
        <div className="gp-hero">
          <div className="gp-blob gp-blob-1" />
          <div className="gp-blob gp-blob-2" />
          <div className="gp-blob gp-blob-3" />
          <div className="gp-hero-inner">
            <div className="gp-hero-badge">
              <span className="gp-badge-dot" /> Memories &amp; Milestones
            </div>
            <h1 className="gp-hero-title">Our <span className="gold">Gallery</span></h1>
            <p className="gp-hero-sub">
              A glimpse into the events, workshops, achievements and ceremonies
              that make SpeakEdge special.
            </p>
            <div className="gp-hero-stats">
              {[["50+","Events Hosted"],["500+","Photos"],["32+","Batches"],["5000+","Students"]].map(([n,l]) => (
                <div key={l} style={{ textAlign: "center" }}>
                  <span className="gp-stat-num">{n}</span>
                  <span className="gp-stat-lbl">{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="gp-filter-bar">
          <h2 className="gp-filter-heading">Browse <span>Moments</span></h2>
          <div className="gp-filter-tabs">
            {filters.map(f => (
              <button
                key={f}
                className={`gp-filter-btn ${active === f ? "on" : "off"}`}
                onClick={() => setActive(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* MASONRY */}
        <div className="gp-masonry">
          {columns.map((col, ci) => (
            <div key={ci} className="gp-col">
              {col.map(item => (
                <GalleryCard key={item.id} item={item} onClick={() => setLightbox(item)} />
              ))}
            </div>
          ))}
        </div>

        {/* LIGHTBOX */}
        {lightbox && (
          <div className="gp-lb-bg" onClick={() => setLightbox(null)}>
            <div className="gp-lb-box" onClick={e => e.stopPropagation()}>
              <button className="gp-lb-close" onClick={() => setLightbox(null)}>✕</button>
              <div
                className="gp-lb-visual"
                style={{ background: `linear-gradient(145deg, ${lightbox.bgFrom}, ${lightbox.bgTo})` }}
              >
                <span className="gp-lb-emoji">{lightbox.emoji}</span>
              </div>
              <div className="gp-lb-body">
                <div className="gp-lb-row">
                  <span style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 10, fontWeight: 800,
                    padding: "4px 12px", borderRadius: 20,
                    textTransform: "uppercase", letterSpacing: "0.5px",
                    background: categoryColors[lightbox.category].bg,
                    color: categoryColors[lightbox.category].text,
                  }}>{lightbox.category}</span>
                  <span style={{ fontSize: 12, color: "#9ca3af" }}>{lightbox.date}</span>
                </div>
                <div className="gp-lb-title">{lightbox.title}</div>
                <p className="gp-lb-sub">{lightbox.subtitle}</p>
                <div className="gp-lb-meta">
                  <div className="gp-lb-meta-item">📅 {lightbox.date}</div>
                  <div className="gp-lb-meta-item">🏷️ {lightbox.category}</div>
                  <div className="gp-lb-meta-item">📍 SpeakEdge Academy</div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}