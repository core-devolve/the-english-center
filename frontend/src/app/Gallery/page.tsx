"use client";

import { useState, useEffect } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
type Category = "All" | "Events" | "Workshops" | "Achievements" | "Certificates";

interface GalleryItem {
  _id: string;
  category: Exclude<Category, "All">;
  title: string;
  description: string;
  date: string;
  url: string; // ImageKit CDN URL
}

// ── Constants ─────────────────────────────────────────────────────────────────
const filters: Category[] = ["All", "Events", "Workshops", "Achievements", "Certificates"];

const categoryColors: Record<Exclude<Category, "All">, { bg: string; text: string }> = {
  Events:       { bg: "#ede9fe", text: "#5b21b6" },
  Workshops:    { bg: "#dbeafe", text: "#1d4ed8" },
  Achievements: { bg: "#fef3c7", text: "#b45309" },
  Certificates: { bg: "#d1fae5", text: "#065f46" },
};

// ── Masonry column builder ────────────────────────────────────────────────────
function buildColumns<T>(items: T[], count: number): T[][] {
  const cols: T[][] = Array.from({ length: count }, () => []);
  items.forEach((item, i) => cols[i % count].push(item));
  return cols;
}

// ── Card component ────────────────────────────────────────────────────────────
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
      {/* Image area */}
      <div style={{ position: "relative", overflow: "hidden", aspectRatio: "4/3" }}>
        <img
          src={item.url}
          alt={item.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.4s ease",
          }}
        />
        {/* Hover overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(10,8,30,0.60)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 8,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
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
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>
          {item.description}
        </div>
      </div>
    </div>
  );
}

// ── Skeleton card ─────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div style={{ borderRadius: 16, overflow: "hidden", marginBottom: 16, background: "#fff", border: "1px solid rgba(79,70,229,0.08)" }}>
      <div style={{ aspectRatio: "4/3", background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)", backgroundSize: "200% 100%", animation: "gpShimmer 1.5s infinite" }} />
      <div style={{ padding: "13px 15px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ height: 12, width: "40%", borderRadius: 6, background: "#f0f0f0" }} />
        <div style={{ height: 16, width: "80%", borderRadius: 6, background: "#f0f0f0" }} />
        <div style={{ height: 12, width: "65%", borderRadius: 6, background: "#f0f0f0" }} />
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function GalleryPage() {
  const [active, setActive]       = useState<Category>("All");
  const [lightbox, setLightbox]   = useState<GalleryItem | null>(null);
  const [items, setItems]         = useState<GalleryItem[]>([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(false);

  // ── Fetch from your API ───────────────────────────────────────────────────
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const res  = await fetch("/api/gallery");
        const json = await res.json();
        if (json.success) setItems(json.data);
        else setError(true);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const filtered = active === "All" ? items : items.filter(i => i.category === active);
  const columns  = buildColumns(filtered, 3); // always 3, CSS handles responsive

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
          padding: 88px 8% 76px; text-align: center; position: relative; overflow: hidden;
        }
        .gp-hero::after {
          content: ''; position: absolute; inset: 0;
          background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
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
        .gp-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #a78bfa; animation: gpPulse 2s ease-in-out infinite; }
        .gp-hero-title { font-family: 'Fraunces', serif; font-size: clamp(40px, 5.5vw, 72px); font-weight: 900; color: #fff; line-height: 1.05; letter-spacing: -2px; margin-bottom: 18px; }
        .gp-hero-title .gold { font-style: italic; color: #fbbf24; position: relative; display: inline-block; }
        .gp-hero-title .gold::after { content: ''; position: absolute; left: 0; bottom: -5px; width: 100%; height: 3px; border-radius: 2px; background: linear-gradient(90deg, #fbbf24, #f59e0b); }
        .gp-hero-sub { font-size: 15px; color: rgba(255,255,255,0.52); line-height: 1.75; max-width: 440px; margin: 0 auto 40px; }
        .gp-hero-stats { display: flex; justify-content: center; gap: 48px; flex-wrap: wrap; }
        .gp-stat-num { font-family: 'Fraunces', serif; font-size: 28px; font-weight: 900; color: #fff; display: block; letter-spacing: -0.5px; }
        .gp-stat-lbl { font-size: 11px; color: rgba(255,255,255,0.45); display: block; margin-top: 3px; }

        /* ── FILTER BAR ── */
        .gp-filter-bar { padding: 36px 8% 28px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
        .gp-filter-heading { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 700; color: #0f0c29; letter-spacing: -0.3px; }
        .gp-filter-heading span { color: #4f46e5; font-style: italic; }
        .gp-filter-tabs { display: flex; gap: 8px; flex-wrap: wrap; }
        .gp-filter-btn { font-family: 'Space Grotesk', sans-serif; font-size: 12px; font-weight: 700; padding: 7px 18px; border-radius: 999px; border: 2px solid transparent; cursor: pointer; transition: all 0.2s ease; letter-spacing: 0.2px; }
        .gp-filter-btn.on  { background: #4f46e5; color: #fff; border-color: #4f46e5; box-shadow: 0 4px 14px rgba(79,70,229,0.3); }
        .gp-filter-btn.off { background: #fff; color: #6b7280; border-color: #e5e7eb; }
        .gp-filter-btn.off:hover { border-color: #4f46e5; color: #4f46e5; }

        /* ── MASONRY ── */
        .gp-masonry { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; padding: 0 8% 80px; align-items: start; }
        .gp-col { display: flex; flex-direction: column; }

        /* ── EMPTY / ERROR ── */
        .gp-empty { grid-column: 1/-1; text-align: center; padding: 80px 20px; color: #9ca3af; }
        .gp-empty-icon { font-size: 40px; margin-bottom: 12px; }
        .gp-empty-text { font-family: 'DM Sans', sans-serif; font-size: 14px; }

        /* ── LIGHTBOX ── */
        .gp-lb-bg { position: fixed; inset: 0; z-index: 1000; background: rgba(10,8,30,0.92); backdrop-filter: blur(12px); display: flex; align-items: center; justify-content: center; padding: 24px; animation: gpFadeIn 0.22s ease; }
        .gp-lb-box { background: #ffffff; border-radius: 22px; overflow: hidden; max-width: 500px; width: 100%; box-shadow: 0 40px 100px rgba(0,0,0,0.55); animation: gpSlideUp 0.3s ease; position: relative; }
        .gp-lb-visual { width: 100%; height: 260px; overflow: hidden; }
        .gp-lb-visual img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .gp-lb-body { padding: 22px 26px 26px; }
        .gp-lb-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
        .gp-lb-title { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 700; color: #0f0c29; letter-spacing: -0.3px; margin-bottom: 8px; }
        .gp-lb-sub { font-size: 13.5px; color: #6b7280; line-height: 1.68; margin-bottom: 18px; }
        .gp-lb-meta { display: flex; gap: 16px; flex-wrap: wrap; padding-top: 16px; border-top: 1px solid #f1f5f9; }
        .gp-lb-meta-item { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #4b5563; }
        .gp-lb-close { position: absolute; top: 12px; right: 12px; width: 34px; height: 34px; border-radius: 50%; background: rgba(0,0,0,0.35); border: 2px solid rgba(255,255,255,0.45); color: #fff; font-size: 16px; cursor: pointer; z-index: 10; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
        .gp-lb-close:hover { background: rgba(0,0,0,0.6); }

        /* ── KEYFRAMES ── */
        @keyframes gpPulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.4); } }
        @keyframes gpFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes gpSlideUp { from { opacity: 0; transform: translateY(28px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes gpShimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) { .gp-masonry { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) {
          .gp-masonry { grid-template-columns: 1fr; padding: 0 5% 60px; }
          .gp-hero { padding: 60px 6% 56px; }
          .gp-hero-stats { gap: 28px; }
          .gp-filter-bar { padding: 28px 5% 20px; }
        }
      `}</style>

      <div className="gp-root">

        {/* ── HERO ── */}
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
              {[["5+","Events Hosted"],["50+","Photos"],["12+","Batches"],["100+","Students"]].map(([n,l]) => (
                <div key={l} style={{ textAlign: "center" }}>
                  <span className="gp-stat-num">{n}</span>
                  <span className="gp-stat-lbl">{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── FILTER BAR ── */}
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
                {/* show count per category */}
                {!loading && (
                  <span style={{ marginLeft: 5, opacity: 0.6, fontWeight: 500 }}>
                    {f === "All" ? items.length : items.filter(i => i.category === f).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── MASONRY ── */}
        <div className="gp-masonry">
          {loading ? (
            // Skeleton placeholders
            [0, 1, 2].map(ci => (
              <div key={ci} className="gp-col">
                {[0, 1].map(ri => <SkeletonCard key={ri} />)}
              </div>
            ))
          ) : error ? (
            <div className="gp-empty">
              <div className="gp-empty-icon">⚠️</div>
              <div className="gp-empty-text">Failed to load gallery. Please try again later.</div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="gp-empty">
              <div className="gp-empty-icon">🖼</div>
              <div className="gp-empty-text">No moments in this category yet.</div>
            </div>
          ) : (
            columns.map((col, ci) => (
              <div key={ci} className="gp-col">
                {col.map(item => (
                  <GalleryCard key={item._id} item={item} onClick={() => setLightbox(item)} />
                ))}
              </div>
            ))
          )}
        </div>

        {/* ── LIGHTBOX ── */}
        {lightbox && (
          <div className="gp-lb-bg" onClick={() => setLightbox(null)}>
            <div className="gp-lb-box" onClick={e => e.stopPropagation()}>
              <button className="gp-lb-close" onClick={() => setLightbox(null)}>✕</button>
              <div className="gp-lb-visual">
                <img src={lightbox.url} alt={lightbox.title} />
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
                <p className="gp-lb-sub">{lightbox.description}</p>
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