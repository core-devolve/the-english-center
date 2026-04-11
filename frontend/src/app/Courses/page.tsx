"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// ── Types (match mongoose model) ──────────────────────────────────────────────
interface Course {
  _id: string;
  category: "Spoken English" | "IELTS / PTE / TOEFL" | "Grammar & Writing" | "Business English" | "Personality Development";
  title: string;
  tagline: string;
  desc: string;
  price: string;
  originalPrice?: string;
  isFree: boolean;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  rating: number;
  language: string;
  certificate: boolean;
  icon: string;
  bgFrom: string;
  bgTo: string;
  tag?: string;
  features: string[];
}

// ── Color maps ────────────────────────────────────────────────────────────────
const categoryColors: Record<Course["category"], { bg: string; text: string }> = {
  "Spoken English": { bg: "#ede9fe", text: "#5b21b6" },
  "IELTS / PTE / TOEFL": { bg: "#d1fae5", text: "#065f46" },
  "Grammar & Writing": { bg: "#dbeafe", text: "#1d4ed8" },
  "Business English": { bg: "#fef3c7", text: "#b45309" },
  "Personality Development": { bg: "#fce7f3", text: "#9d174d" },
};
const levelColors: Record<string, { bg: string; text: string }> = {
  Beginner: { bg: "#dcfce7", text: "#166534" },
  Intermediate: { bg: "#fef9c3", text: "#854d0e" },
  Advanced: { bg: "#fee2e2", text: "#991b1b" },
  "All Levels": { bg: "#f1f5f9", text: "#475569" },
};
const tagColors: Record<string, { bg: string; color: string }> = {
  "Most Popular": { bg: "#fbbf24", color: "#1a2340" },
  "Bestseller": { bg: "#4f46e5", color: "#ffffff" },
  "Top Rated": { bg: "#10b981", color: "#ffffff" },
  "Premium": { bg: "#f59e0b", color: "#1a2340" },
  "Most Enrolled": { bg: "#8b5cf6", color: "#ffffff" },
  "New": { bg: "#0ea5e9", color: "#ffffff" },
  "Free": { bg: "#ef4444", color: "#ffffff" },
  "Trending": { bg: "#ec4899", color: "#ffffff" },
};



// ── Star rating ───────────────────────────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <div style={{ display: "flex", gap: 1 }}>
        {[1, 2, 3, 4, 5].map(s => (
          <span key={s} style={{ fontSize: 11, color: s <= Math.floor(rating) ? "#fbbf24" : "#d1d5db" }}>★</span>
        ))}
      </div>
      <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 11, fontWeight: 700, color: "#0f0c29" }}>
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

// ── Skeleton card ─────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(79,70,229,0.08)" }}>
      <div style={{ height: 120, background: "linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%)", backgroundSize: "200% 100%", animation: "cpShimmer 1.5s infinite" }} />
      <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ height: 12, width: "50%", borderRadius: 6, background: "#f0f0f0" }} />
        <div style={{ height: 20, width: "80%", borderRadius: 6, background: "#f0f0f0" }} />
        <div style={{ height: 12, width: "100%", borderRadius: 6, background: "#f0f0f0" }} />
        <div style={{ height: 12, width: "70%", borderRadius: 6, background: "#f0f0f0" }} />
      </div>
    </div>
  );
}

// ── Course card ───────────────────────────────────────────────────────────────
function CourseCard({ course }: { course: Course }) {
  const [hovered, setHovered] = useState(false);
  const cc = categoryColors[course.category];
  const lc = levelColors[course.level];
  const tg = course.tag ? tagColors[course.tag] : null;
  const router = useRouter();

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#ffffff", borderRadius: 20, overflow: "hidden",
        border: "1px solid rgba(79,70,229,0.08)",
        boxShadow: hovered ? "0 24px 56px rgba(79,70,229,0.15)" : "0 3px 16px rgba(0,0,0,0.07)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
        display: "flex", flexDirection: "column",
      }}
    >
      {/* Gradient header */}
      <div style={{
        height: 120, position: "relative",
        background: `linear-gradient(135deg,${course.bgFrom},${course.bgTo})`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,rgba(255,255,255,0.1) 0%,transparent 55%)", pointerEvents: "none" }} />
        <span style={{
          fontSize: 52, filter: "drop-shadow(0 4px 14px rgba(0,0,0,0.22))",
          transform: hovered ? "scale(1.1)" : "scale(1)",
          transition: "transform 0.3s ease", position: "relative", zIndex: 1,
        }}>{course.icon}</span>
        {tg && (
          <span style={{
            position: "absolute", top: 12, right: 12,
            fontFamily: "'Space Grotesk',sans-serif", fontSize: 9, fontWeight: 800,
            padding: "3px 10px", borderRadius: 20, letterSpacing: "0.6px", textTransform: "uppercase",
            background: tg.bg, color: tg.color,
          }}>{course.tag}</span>
        )}
        {course.certificate && (
          <span style={{
            position: "absolute", bottom: 10, left: 12,
            fontFamily: "'Space Grotesk',sans-serif", fontSize: 9, fontWeight: 700,
            padding: "3px 9px", borderRadius: 20,
            background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.4)",
            color: "#ffffff", letterSpacing: "0.4px",
          }}>🏅 Certificate</span>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: "18px 20px 22px", display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 9, fontWeight: 800, padding: "3px 9px", borderRadius: 20, textTransform: "uppercase", letterSpacing: "0.5px", background: cc.bg, color: cc.text }}>{course.category}</span>
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 9, fontWeight: 700, padding: "3px 9px", borderRadius: 20, background: lc.bg, color: lc.text }}>{course.level}</span>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: "#9ca3af", marginLeft: "auto" }}>🌐 {course.language}</span>
        </div>

        <h3 style={{ fontFamily: "'Fraunces',serif", fontSize: 17, fontWeight: 700, color: "#0f0c29", lineHeight: 1.22, letterSpacing: "-0.2px", marginBottom: 4 }}>
          {course.title}
        </h3>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#4f46e5", fontWeight: 600, fontStyle: "italic", marginBottom: 8 }}>
          {course.tagline}
        </p>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12.5, color: "#6b7280", lineHeight: 1.68, marginBottom: 14 }}>
          {course.desc}
        </p>

        <div style={{ marginBottom: 14 }}>
          <StarRating rating={course.rating} />
        </div>

        {course.features.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 10, fontWeight: 700, color: "#4f46e5", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 8 }}>
              What you&apos;ll learn
            </div>
            {course.features.map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 7, fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#374151", marginBottom: 5, lineHeight: 1.4 }}>
                <span style={{ color: "#4f46e5", fontWeight: 700, marginTop: 1, flexShrink: 0 }}>✓</span>
                {f}
              </div>
            ))}
          </div>
        )}


        {/* Footer */}
        <div style={{ paddingTop: 14, borderTop: "1px solid #f1f5f9", marginTop: "auto", display: "flex", gap: 8 }}>
          <button
            onClick={() => router.push("/Admission")}
            style={{
              flex: 1,
              background: `linear-gradient(135deg,${course.bgFrom},${course.bgTo})`,
              color: "#ffffff", border: "none", padding: "12px 16px", borderRadius: 10,
              fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 700,
              cursor: "pointer", letterSpacing: "0.2px", boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
              transition: "opacity 0.2s, transform 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Enroll Now →
          </button>
          <button
            onClick={() => router.push("/Demo-vid")}
            style={{
              flex: 1,
              background: "transparent",
              color: "#4f46e5", border: "1.5px solid #4f46e5", padding: "12px 16px", borderRadius: 10,
              fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 700,
              cursor: "pointer", letterSpacing: "0.2px",
              transition: "background 0.2s, color 0.2s, transform 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#4f46e5"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#4f46e5"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            View Demo ▶
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/courses");
        const json = await res.json();
        if (json.success) setCourses(json.data);
        else setError(true);
      } catch { setError(true); }
      finally { setLoading(false); }
    })();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700;800&display=swap');
        .cp-root,.cp-root *,.cp-root *::before,.cp-root *::after{box-sizing:border-box;margin:0;padding:0;}
        .cp-root{font-family:'DM Sans',sans-serif;background:#f8f7ff;min-height:100vh;}
        .cp-hero{background:linear-gradient(135deg,#0f0c29 0%,#1e1b4b 45%,#302b63 100%);padding:88px 8% 76px;text-align:center;position:relative;overflow:hidden;}
        .cp-hero::after{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px);background-size:40px 40px;pointer-events:none;}
        .cp-blob{position:absolute;border-radius:50%;filter:blur(70px);pointer-events:none;}
        .cp-blob-1{width:320px;height:320px;background:#7c3aed;opacity:0.13;top:-80px;right:-40px;}
        .cp-blob-2{width:240px;height:240px;background:#4f46e5;opacity:0.13;bottom:-70px;left:-30px;}
        .cp-blob-3{width:180px;height:180px;background:#fbbf24;opacity:0.06;top:10px;left:40%;}
        .cp-hero-inner{position:relative;z-index:2;}
        .cp-hero-badge{display:inline-flex;align-items:center;gap:7px;background:rgba(139,92,246,0.15);border:1px solid rgba(139,92,246,0.35);color:#c4b5fd;font-family:'Space Grotesk',sans-serif;font-size:10px;font-weight:600;padding:5px 16px;border-radius:20px;text-transform:uppercase;letter-spacing:2px;margin-bottom:22px;}
        .cp-badge-dot{width:6px;height:6px;border-radius:50%;background:#a78bfa;animation:cpPulse 2s ease-in-out infinite;}
        .cp-hero-title{font-family:'Fraunces',serif;font-size:clamp(38px,5.5vw,68px);font-weight:900;color:#fff;line-height:1.05;letter-spacing:-1.5px;margin-bottom:18px;}
        .cp-hero-title .gold{font-style:italic;color:#fbbf24;position:relative;display:inline-block;}
        .cp-hero-title .gold::after{content:'';position:absolute;left:0;bottom:-5px;width:100%;height:3px;border-radius:2px;background:linear-gradient(90deg,#fbbf24,#f59e0b);}
        .cp-hero-sub{font-size:15px;color:rgba(255,255,255,0.52);line-height:1.75;max-width:480px;margin:0 auto 40px;}
        .cp-hero-stats{display:flex;justify-content:center;gap:48px;flex-wrap:wrap;}
        .cp-stat-num{font-family:'Fraunces',serif;font-size:26px;font-weight:900;color:#fff;display:block;letter-spacing:-0.5px;}
        .cp-stat-lbl{font-size:11px;color:rgba(255,255,255,0.45);display:block;margin-top:3px;}
        .cp-section-heading{font-family:'Fraunces',serif;font-size:22px;font-weight:700;color:#0f0c29;letter-spacing:-0.3px;padding:36px 8% 28px;}
        .cp-section-heading span{color:#4f46e5;font-style:italic;}
        .cp-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;padding:0 8% 80px;}
        .cp-empty{grid-column:1/-1;text-align:center;padding:80px 20px;color:#9ca3af;}
        .cp-empty-icon{font-size:36px;margin-bottom:12px;}
        .cp-empty-text{font-family:'DM Sans',sans-serif;font-size:14px;}
        .cp-strip{background:linear-gradient(135deg,#1e1b4b,#312e81);padding:52px 8%;display:flex;align-items:center;justify-content:space-between;gap:32px;flex-wrap:wrap;}
        .cp-strip-title{font-family:'Fraunces',serif;font-size:24px;font-weight:700;color:#fff;letter-spacing:-0.3px;margin-bottom:6px;}
        .cp-strip-title span{color:#fbbf24;font-style:italic;}
        .cp-strip-sub{font-size:13px;color:rgba(255,255,255,0.5);}
        .cp-strip-form{display:flex;gap:10px;flex-wrap:wrap;}
        .cp-strip-input{background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);color:#fff;border-radius:10px;padding:11px 18px;font-size:13px;font-family:'DM Sans',sans-serif;outline:none;width:260px;transition:border-color 0.2s;}
        .cp-strip-input::placeholder{color:rgba(255,255,255,0.35);}
        .cp-strip-input:focus{border-color:rgba(167,139,250,0.6);}
        .cp-strip-btn{background:#fbbf24;color:#1e1b4b;border:none;border-radius:10px;padding:11px 22px;font-family:'Space Grotesk',sans-serif;font-size:13px;font-weight:800;cursor:pointer;transition:all 0.2s;white-space:nowrap;}
        .cp-strip-btn:hover{background:#f59e0b;transform:translateY(-1px);}
        @keyframes cpPulse{0%,100%{opacity:1;transform:scale(1);}50%{opacity:0.5;transform:scale(1.4);}}
        @keyframes cpShimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
        @media(max-width:1024px){.cp-grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:640px){.cp-grid{grid-template-columns:1fr;padding:0 5% 60px;}.cp-hero{padding:60px 6% 56px;}.cp-hero-stats{gap:28px;}.cp-strip{flex-direction:column;padding:40px 6%;}.cp-strip-input{width:100%;}}
      `}</style>

      <div className="cp-root">

        {/* Hero */}
        <div className="cp-hero">
          <div className="cp-blob cp-blob-1" /><div className="cp-blob cp-blob-2" /><div className="cp-blob cp-blob-3" />
          <div className="cp-hero-inner">
            <div className="cp-hero-badge"><span className="cp-badge-dot" />Learn · Speak · Succeed</div>
            <h1 className="cp-hero-title">Our <span className="gold">Courses</span></h1>
            <p className="cp-hero-sub">Expert-led English courses designed to boost your fluency, confidence and career — at the most affordable price in India.</p>
            <div className="cp-hero-stats">
              {[["12+", "Courses"], ["5,000+", "Students"], ["97%", "Success Rate"], ["₹999", "Starting At"]].map(([n, l]) => (
                <div key={l} style={{ textAlign: "center" }}>
                  <span className="cp-stat-num">{n}</span>
                  <span className="cp-stat-lbl">{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section heading */}
        <h2 className="cp-section-heading">Browse <span>Courses</span></h2>

        {/* Grid */}
        <div className="cp-grid">
          {loading ? (
            [1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)
          ) : error ? (
            <div className="cp-empty">
              <div className="cp-empty-icon">⚠️</div>
              <div className="cp-empty-text">Failed to load courses. Please try again later.</div>
            </div>
          ) : courses.length === 0 ? (
            <div className="cp-empty">
              <div className="cp-empty-icon">📚</div>
              <div className="cp-empty-text">No courses available yet. Check back soon!</div>
            </div>
          ) : (
            courses.map(course => <CourseCard key={course._id} course={course} />)
          )}
        </div>

        {/* Bottom strip */}
        <div className="cp-strip">
          <div>
            <div className="cp-strip-title">Not Sure Which <span>Course?</span> 🤔</div>
            <p className="cp-strip-sub">Drop your email and we&apos;ll help you pick the right one for your goals.</p>
          </div>
          <div className="cp-strip-form">
            <input type="email" className="cp-strip-input" placeholder="Enter your email address" />
            <button className="cp-strip-btn">Get Guidance →</button>
          </div>
        </div>

      </div>
    </>
  );
}