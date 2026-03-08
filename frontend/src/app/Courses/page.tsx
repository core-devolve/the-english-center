"use client";

import { useState } from "react";

type Category = "All" | "Spoken English" | "IELTS / PTE / TOEFL" | "Grammar & Writing" | "Business English" | "Personality Development";

interface Course {
  id: number;
  category: Exclude<Category, "All">;
  title: string;
  tagline: string;
  desc: string;
  duration: string;
  schedule: string;
  price: string;
  originalPrice?: string;
  isFree: boolean;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  lessons: number;
  students: string;
  rating: number;
  language: string;
  certificate: boolean;
  icon: string;
  bgFrom: string;
  bgTo: string;
  tag?: string;
  features: string[];
}

const courses: Course[] = [
  {
    id: 1,
    category: "Spoken English",
    title: "Spoken English Foundation",
    tagline: "Start speaking English with confidence",
    desc: "Build real conversational fluency from zero with guided daily practice, role plays, pronunciation drills and live instructor feedback.",
    duration: "8 Weeks",
    schedule: "5 Days/Week · 1 hr",
    price: "₹1,999",
    originalPrice: "₹3,500",
    isFree: false,
    level: "Beginner",
    lessons: 32,
    students: "1,200+",
    rating: 4.9,
    language: "Hindi + English",
    certificate: true,
    icon: "🗣️",
    bgFrom: "#4f46e5",
    bgTo: "#7c3aed",
    tag: "Most Popular",
    features: ["Daily live sessions", "Pronunciation training", "Role play exercises", "Doubt clearing calls", "Study material included"],
  },
  {
    id: 2,
    category: "Spoken English",
    title: "Advanced Spoken English",
    tagline: "Speak like a native — fluid & confident",
    desc: "Master fluency, idioms, storytelling and presentation skills for corporate, social and academic environments.",
    duration: "6 Weeks",
    schedule: "4 Days/Week · 1.5 hr",
    price: "₹2,499",
    isFree: false,
    level: "Advanced",
    lessons: 24,
    students: "800+",
    rating: 4.8,
    language: "English Only",
    certificate: true,
    icon: "🎙️",
    bgFrom: "#0ea5e9",
    bgTo: "#2563eb",
    tag: "Bestseller",
    features: ["Idioms & phrases", "Public speaking", "Debate & discussions", "Personality grooming", "Mock presentations"],
  },
  {
    id: 3,
    category: "Spoken English",
    title: "Free Spoken English Trial",
    tagline: "Try before you commit — 100% free",
    desc: "Experience SpeakEdge quality with 5 days of live classes, study resources and community access. No card required.",
    duration: "5 Days",
    schedule: "Daily · 45 min",
    price: "Free",
    isFree: true,
    level: "All Levels",
    lessons: 5,
    students: "5,000+",
    rating: 4.7,
    language: "Hindi + English",
    certificate: false,
    icon: "🎁",
    bgFrom: "#be185d",
    bgTo: "#f43f5e",
    tag: "Free",
    features: ["5 live classes", "Study material PDF", "WhatsApp community", "No registration fee", "Instant access"],
  },
  {
    id: 4,
    category: "IELTS / PTE / TOEFL",
    title: "IELTS Band 7+ Complete Course",
    tagline: "Your fast track to Band 7 and beyond",
    desc: "Comprehensive IELTS prep covering all 4 modules — Reading, Writing, Listening & Speaking — with timed mock tests and detailed score analysis.",
    duration: "10 Weeks",
    schedule: "5 Days/Week · 1.5 hr",
    price: "₹3,999",
    originalPrice: "₹6,000",
    isFree: false,
    level: "Intermediate",
    lessons: 40,
    students: "2,000+",
    rating: 4.9,
    language: "English Only",
    certificate: true,
    icon: "🌐",
    bgFrom: "#0f766e",
    bgTo: "#10b981",
    tag: "Top Rated",
    features: ["All 4 modules covered", "6 full mock tests", "Score analysis reports", "Writing task correction", "Speaking mock interviews"],
  },
  {
    id: 5,
    category: "IELTS / PTE / TOEFL",
    title: "IELTS Band 8+ Masterclass",
    tagline: "For those who aim for the very top",
    desc: "Advanced strategies and intensive practice sessions designed exclusively for students targeting Band 8 or above in IELTS Academic.",
    duration: "8 Weeks",
    schedule: "5 Days/Week · 2 hr",
    price: "₹4,999",
    isFree: false,
    level: "Advanced",
    lessons: 36,
    students: "500+",
    rating: 5.0,
    language: "English Only",
    certificate: true,
    icon: "🏆",
    bgFrom: "#78350f",
    bgTo: "#f59e0b",
    tag: "Premium",
    features: ["Band 8+ techniques", "Academic writing depth", "Complex reading strategies", "1-on-1 speaking sessions", "Personalised feedback"],
  },
  {
    id: 6,
    category: "IELTS / PTE / TOEFL",
    title: "PTE Academic Preparation",
    tagline: "Ace PTE with AI-scored practice",
    desc: "Targeted PTE prep with AI-scored practice tests, time management techniques and strategies for all PTE task types.",
    duration: "6 Weeks",
    schedule: "4 Days/Week · 1.5 hr",
    price: "₹2,999",
    originalPrice: "₹4,500",
    isFree: false,
    level: "Intermediate",
    lessons: 28,
    students: "700+",
    rating: 4.8,
    language: "English Only",
    certificate: true,
    icon: "💻",
    bgFrom: "#1e3a5f",
    bgTo: "#3b82f6",
    tag: "New",
    features: ["AI-scored mock tests", "Speak & write tasks", "Reading & listening", "Time management", "Sectional strategies"],
  },
  {
    id: 7,
    category: "Grammar & Writing",
    title: "English Grammar Complete",
    tagline: "Fix your grammar — once and forever",
    desc: "Master every grammar rule from tenses and articles to conditionals and reported speech in a structured, easy-to-follow course.",
    duration: "6 Weeks",
    schedule: "5 Days/Week · 1 hr",
    price: "₹1,499",
    originalPrice: "₹2,500",
    isFree: false,
    level: "Beginner",
    lessons: 28,
    students: "3,000+",
    rating: 4.9,
    language: "Hindi + English",
    certificate: true,
    icon: "📖",
    bgFrom: "#4338ca",
    bgTo: "#a78bfa",
    tag: "Most Enrolled",
    features: ["All 12 tenses", "Articles & prepositions", "Error correction exercises", "Weekly grammar quizzes", "Downloadable notes"],
  },
  {
    id: 8,
    category: "Grammar & Writing",
    title: "Professional Writing Skills",
    tagline: "Write with clarity, impact and style",
    desc: "Learn to write professional emails, structured essays and formal reports for academic and corporate success.",
    duration: "4 Weeks",
    schedule: "4 Days/Week · 1 hr",
    price: "₹999",
    isFree: false,
    level: "Intermediate",
    lessons: 16,
    students: "900+",
    rating: 4.7,
    language: "English Only",
    certificate: true,
    icon: "✍️",
    bgFrom: "#166534",
    bgTo: "#16a34a",
    features: ["Professional email writing", "Essay structure & flow", "Formal report writing", "Editing & proofreading", "Templates included"],
  },
  {
    id: 9,
    category: "Business English",
    title: "Business English Essentials",
    tagline: "Speak the language of the boardroom",
    desc: "Communicate confidently in meetings, presentations and professional settings with polished business English skills.",
    duration: "6 Weeks",
    schedule: "4 Days/Week · 1.5 hr",
    price: "₹2,999",
    originalPrice: "₹4,500",
    isFree: false,
    level: "Intermediate",
    lessons: 24,
    students: "600+",
    rating: 4.8,
    language: "English Only",
    certificate: true,
    icon: "💼",
    bgFrom: "#0c4a6e",
    bgTo: "#0284c7",
    tag: "New",
    features: ["Meeting & conference language", "Presentation skills", "Business negotiation", "Corporate email etiquette", "Video call communication"],
  },
  {
    id: 10,
    category: "Business English",
    title: "Interview & Career English",
    tagline: "Land the job with powerful English",
    desc: "Ace job interviews with mock sessions, HR question preparation, salary negotiation language and professional grooming.",
    duration: "3 Weeks",
    schedule: "5 Days/Week · 1 hr",
    price: "₹1,299",
    isFree: false,
    level: "Intermediate",
    lessons: 15,
    students: "1,100+",
    rating: 4.9,
    language: "Hindi + English",
    certificate: true,
    icon: "🤝",
    bgFrom: "#134e4a",
    bgTo: "#0d9488",
    tag: "Most Popular",
    features: ["Mock HR interviews", "Common interview Q&A", "Body language coaching", "Salary negotiation tips", "LinkedIn profile English"],
  },
  {
    id: 11,
    category: "Personality Development",
    title: "Personality & Confidence Boost",
    tagline: "Transform your presence inside and out",
    desc: "Develop a magnetic personality, overcome stage fear, master body language and build the confidence to lead any room.",
    duration: "5 Weeks",
    schedule: "4 Days/Week · 1 hr",
    price: "₹1,799",
    originalPrice: "₹3,000",
    isFree: false,
    level: "All Levels",
    lessons: 20,
    students: "850+",
    rating: 4.8,
    language: "Hindi + English",
    certificate: true,
    icon: "🌟",
    bgFrom: "#7c3aed",
    bgTo: "#ec4899",
    tag: "Trending",
    features: ["Stage fear elimination", "Body language mastery", "Leadership communication", "Positive mindset training", "Group activity sessions"],
  },
  {
    id: 12,
    category: "Personality Development",
    title: "Public Speaking Mastery",
    tagline: "Speak to any audience with authority",
    desc: "From classroom anxiety to TED-talk confidence — this course gives you the tools to captivate any audience with your words.",
    duration: "4 Weeks",
    schedule: "3 Days/Week · 1.5 hr",
    price: "₹1,499",
    isFree: false,
    level: "Beginner",
    lessons: 16,
    students: "600+",
    rating: 4.9,
    language: "English Only",
    certificate: true,
    icon: "🎤",
    bgFrom: "#312e81",
    bgTo: "#8b5cf6",
    features: ["Speech structuring", "Voice modulation", "Storytelling techniques", "Live speech practice", "Video feedback sessions"],
  },
];

const filters: Category[] = ["All", "Spoken English", "IELTS / PTE / TOEFL", "Grammar & Writing", "Business English", "Personality Development"];

const categoryColors: Record<Exclude<Category, "All">, { bg: string; text: string }> = {
  "Spoken English":          { bg: "#ede9fe", text: "#5b21b6" },
  "IELTS / PTE / TOEFL":    { bg: "#d1fae5", text: "#065f46" },
  "Grammar & Writing":       { bg: "#dbeafe", text: "#1d4ed8" },
  "Business English":        { bg: "#fef3c7", text: "#b45309" },
  "Personality Development": { bg: "#fce7f3", text: "#9d174d" },
};

const levelColors: Record<string, { bg: string; text: string }> = {
  Beginner:     { bg: "#dcfce7", text: "#166534" },
  Intermediate: { bg: "#fef9c3", text: "#854d0e" },
  Advanced:     { bg: "#fee2e2", text: "#991b1b" },
  "All Levels": { bg: "#f1f5f9", text: "#475569" },
};

const tagColors: Record<string, { bg: string; color: string }> = {
  "Most Popular":  { bg: "#fbbf24", color: "#1a2340" },
  "Bestseller":    { bg: "#4f46e5", color: "#ffffff" },
  "Top Rated":     { bg: "#10b981", color: "#ffffff" },
  "Premium":       { bg: "#f59e0b", color: "#1a2340" },
  "Most Enrolled": { bg: "#8b5cf6", color: "#ffffff" },
  "New":           { bg: "#0ea5e9", color: "#ffffff" },
  "Free":          { bg: "#ef4444", color: "#ffffff" },
  "Trending":      { bg: "#ec4899", color: "#ffffff" },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <div style={{ display: "flex", gap: 1 }}>
        {[1,2,3,4,5].map(s => (
          <span key={s} style={{ fontSize: 11, color: s <= Math.floor(rating) ? "#fbbf24" : s - 0.5 <= rating ? "#fbbf24" : "#d1d5db" }}>★</span>
        ))}
      </div>
      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, color: "#0f0c29" }}>{rating.toFixed(1)}</span>
    </div>
  );
}

function CourseCard({ course }: { course: Course }) {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const cc = categoryColors[course.category];
  const lc = levelColors[course.level];
  const tg = course.tag ? tagColors[course.tag] : null;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#ffffff",
        borderRadius: 20,
        overflow: "hidden",
        border: "1px solid rgba(79,70,229,0.08)",
        boxShadow: hovered ? "0 24px 56px rgba(79,70,229,0.15)" : "0 3px 16px rgba(0,0,0,0.07)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
        display: "flex", flexDirection: "column",
      }}
    >
      {/* ── TOP GRADIENT ── */}
      <div style={{
        height: 120, position: "relative",
        background: `linear-gradient(135deg, ${course.bgFrom}, ${course.bgTo})`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(160deg, rgba(255,255,255,0.1) 0%, transparent 55%)",
          pointerEvents: "none",
        }} />
        <span style={{
          fontSize: 52, filter: "drop-shadow(0 4px 14px rgba(0,0,0,0.22))",
          transform: hovered ? "scale(1.1)" : "scale(1)",
          transition: "transform 0.3s ease",
          position: "relative", zIndex: 1,
        }}>
          {course.icon}
        </span>
        {/* Tag */}
        {tg && (
          <span style={{
            position: "absolute", top: 12, right: 12,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 9, fontWeight: 800,
            padding: "3px 10px", borderRadius: 20,
            letterSpacing: "0.6px", textTransform: "uppercase",
            background: tg.bg, color: tg.color,
          }}>{course.tag}</span>
        )}
        {/* Certificate badge */}
        {course.certificate && (
          <span style={{
            position: "absolute", bottom: 10, left: 12,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 9, fontWeight: 700,
            padding: "3px 9px", borderRadius: 20,
            background: "rgba(255,255,255,0.2)",
            border: "1px solid rgba(255,255,255,0.4)",
            color: "#ffffff", letterSpacing: "0.4px",
          }}>🏅 Certificate</span>
        )}
      </div>

      {/* ── BODY ── */}
      <div style={{ padding: "18px 20px 22px", display: "flex", flexDirection: "column", flex: 1 }}>

        {/* Category + Level */}
        <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap", alignItems: "center" }}>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 9, fontWeight: 800,
            padding: "3px 9px", borderRadius: 20,
            textTransform: "uppercase", letterSpacing: "0.5px",
            background: cc.bg, color: cc.text,
          }}>{course.category}</span>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 9, fontWeight: 700,
            padding: "3px 9px", borderRadius: 20,
            background: lc.bg, color: lc.text,
          }}>{course.level}</span>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 10, color: "#9ca3af", marginLeft: "auto",
          }}>🌐 {course.language}</span>
        </div>

        {/* Title + tagline */}
        <h3 style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 17, fontWeight: 700,
          color: "#0f0c29", lineHeight: 1.22,
          letterSpacing: "-0.2px", marginBottom: 4,
        }}>
          {course.title}
        </h3>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 12, color: "#4f46e5", fontWeight: 600,
          fontStyle: "italic", marginBottom: 8,
        }}>
          {course.tagline}
        </p>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 12.5, color: "#6b7280",
          lineHeight: 1.68, marginBottom: 14,
        }}>
          {course.desc}
        </p>

        {/* Rating + students */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <StarRating rating={course.rating} />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#9ca3af" }}>
            ({course.students} students)
          </span>
        </div>

        {/* Meta grid */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "7px 10px", marginBottom: 14,
          padding: "12px 14px",
          background: "#f8f7ff",
          borderRadius: 10,
          border: "1px solid rgba(79,70,229,0.07)",
        }}>
          {[
            { icon: "⏱️", label: "Duration", val: course.duration },
            { icon: "📅", label: "Schedule", val: course.schedule },
            { icon: "📚", label: "Lessons", val: `${course.lessons} classes` },
            { icon: "👥", label: "Enrolled", val: course.students },
          ].map(m => (
            <div key={m.label}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 9, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 2 }}>
                {m.icon} {m.label}
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#0f0c29", fontWeight: 600 }}>
                {m.val}
              </div>
            </div>
          ))}
        </div>

        {/* Features — expandable */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, fontWeight: 700, color: "#4f46e5", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 8 }}>
            What you&apos;ll learn
          </div>
          {(expanded ? course.features : course.features.slice(0, 3)).map((f, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 7,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12, color: "#374151",
              marginBottom: 5, lineHeight: 1.4,
            }}>
              <span style={{ color: "#4f46e5", fontWeight: 700, marginTop: 1, flexShrink: 0 }}>✓</span>
              {f}
            </div>
          ))}
          {course.features.length > 3 && (
            <button
              onClick={() => setExpanded(!expanded)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 11, fontWeight: 700, color: "#4f46e5",
                padding: "2px 0", marginTop: 2,
              }}
            >
              {expanded ? "▲ Show less" : `▼ +${course.features.length - 3} more`}
            </button>
          )}
        </div>

        {/* ── FOOTER ── */}
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 14,
          borderTop: "1px solid #f1f5f9",
          marginTop: "auto",
        }}>
          <div>
            {course.isFree ? (
              <span style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 900, color: "#10b981" }}>FREE</span>
            ) : (
              <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                <span style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 900, color: "#0f0c29" }}>{course.price}</span>
                {course.originalPrice && (
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#9ca3af", textDecoration: "line-through" }}>
                    {course.originalPrice}
                  </span>
                )}
              </div>
            )}
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#9ca3af", marginTop: 1 }}>per person · online</div>
          </div>
          <button style={{
            background: `linear-gradient(135deg, ${course.bgFrom}, ${course.bgTo})`,
            color: "#ffffff", border: "none",
            padding: "10px 20px", borderRadius: 10,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 12, fontWeight: 700,
            cursor: "pointer", letterSpacing: "0.2px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            transition: "opacity 0.2s, transform 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Enroll Now →
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CoursesPage() {
  const [activeFilter, setActiveFilter] = useState<Category>("All");

  const filtered = activeFilter === "All" ? courses : courses.filter(c => c.category === activeFilter);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700;800&display=swap');

        .cp-root, .cp-root *, .cp-root *::before, .cp-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .cp-root { font-family: 'DM Sans', sans-serif; background: #f8f7ff; min-height: 100vh; }

        /* HERO */
        .cp-hero {
          background: linear-gradient(135deg, #0f0c29 0%, #1e1b4b 45%, #302b63 100%);
          padding: 88px 8% 76px; text-align: center; position: relative; overflow: hidden;
        }
        .cp-hero::after {
          content: ''; position: absolute; inset: 0;
          background-image: linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px);
          background-size: 40px 40px; pointer-events: none;
        }
        .cp-blob { position: absolute; border-radius: 50%; filter: blur(70px); pointer-events: none; }
        .cp-blob-1 { width:320px; height:320px; background:#7c3aed; opacity:0.13; top:-80px; right:-40px; }
        .cp-blob-2 { width:240px; height:240px; background:#4f46e5; opacity:0.13; bottom:-70px; left:-30px; }
        .cp-blob-3 { width:180px; height:180px; background:#fbbf24; opacity:0.06; top:10px; left:40%; }
        .cp-hero-inner { position: relative; z-index: 2; }
        .cp-hero-badge {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(139,92,246,0.15); border: 1px solid rgba(139,92,246,0.35);
          color: #c4b5fd; font-family: 'Space Grotesk', sans-serif;
          font-size: 10px; font-weight: 600; padding: 5px 16px;
          border-radius: 20px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 22px;
        }
        .cp-badge-dot { width:6px; height:6px; border-radius:50%; background:#a78bfa; animation: cpPulse 2s ease-in-out infinite; }
        .cp-hero-title {
          font-family: 'Fraunces', serif; font-size: clamp(38px,5.5vw,68px);
          font-weight: 900; color: #fff; line-height: 1.05; letter-spacing: -1.5px; margin-bottom: 18px;
        }
        .cp-hero-title .gold { font-style:italic; color:#fbbf24; position:relative; display:inline-block; }
        .cp-hero-title .gold::after { content:''; position:absolute; left:0; bottom:-5px; width:100%; height:3px; border-radius:2px; background:linear-gradient(90deg,#fbbf24,#f59e0b); }
        .cp-hero-sub { font-size:15px; color:rgba(255,255,255,0.52); line-height:1.75; max-width:480px; margin:0 auto 40px; }
        .cp-hero-stats { display:flex; justify-content:center; gap:48px; flex-wrap:wrap; }
        .cp-stat-num { font-family:'Fraunces',serif; font-size:26px; font-weight:900; color:#fff; display:block; letter-spacing:-0.5px; }
        .cp-stat-lbl { font-size:11px; color:rgba(255,255,255,0.45); display:block; margin-top:3px; }

        /* FILTER BAR */
        .cp-filter-bar {
          padding: 36px 8% 28px;
          display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;
        }
        .cp-filter-heading { font-family:'Fraunces',serif; font-size:22px; font-weight:700; color:#0f0c29; letter-spacing:-0.3px; }
        .cp-filter-heading span { color:#4f46e5; font-style:italic; }
        .cp-filter-tabs { display:flex; gap:8px; flex-wrap:wrap; }
        .cp-filter-btn {
          font-family:'Space Grotesk',sans-serif; font-size:12px; font-weight:700;
          padding:7px 18px; border-radius:999px; border:2px solid transparent;
          cursor:pointer; transition:all 0.2s ease; letter-spacing:0.2px;
        }
        .cp-filter-btn.on  { background:#4f46e5; color:#fff; border-color:#4f46e5; box-shadow:0 4px 14px rgba(79,70,229,0.3); }
        .cp-filter-btn.off { background:#fff; color:#6b7280; border-color:#e5e7eb; }
        .cp-filter-btn.off:hover { border-color:#4f46e5; color:#4f46e5; }

        /* GRID */
        .cp-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:22px; padding:0 8% 80px; }

        /* BOTTOM STRIP */
        .cp-strip {
          background: linear-gradient(135deg,#1e1b4b,#312e81);
          padding:52px 8%; display:flex; align-items:center; justify-content:space-between; gap:32px; flex-wrap:wrap;
        }
        .cp-strip-title { font-family:'Fraunces',serif; font-size:24px; font-weight:700; color:#fff; letter-spacing:-0.3px; margin-bottom:6px; }
        .cp-strip-title span { color:#fbbf24; font-style:italic; }
        .cp-strip-sub { font-size:13px; color:rgba(255,255,255,0.5); }
        .cp-strip-form { display:flex; gap:10px; flex-wrap:wrap; }
        .cp-strip-input {
          background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2);
          color:#fff; border-radius:10px; padding:11px 18px; font-size:13px;
          font-family:'DM Sans',sans-serif; outline:none; width:260px; transition:border-color 0.2s;
        }
        .cp-strip-input::placeholder { color:rgba(255,255,255,0.35); }
        .cp-strip-input:focus { border-color:rgba(167,139,250,0.6); }
        .cp-strip-btn {
          background:#fbbf24; color:#1e1b4b; border:none; border-radius:10px;
          padding:11px 22px; font-family:'Space Grotesk',sans-serif;
          font-size:13px; font-weight:800; cursor:pointer; transition:all 0.2s; white-space:nowrap;
        }
        .cp-strip-btn:hover { background:#f59e0b; transform:translateY(-1px); }

        @keyframes cpPulse { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:0.5;transform:scale(1.4);} }

        @media (max-width:1024px) { .cp-grid { grid-template-columns:repeat(2,1fr); } }
        @media (max-width:640px) {
          .cp-grid { grid-template-columns:1fr; padding:0 5% 60px; }
          .cp-hero { padding:60px 6% 56px; }
          .cp-hero-stats { gap:28px; }
          .cp-filter-bar { padding:28px 5% 20px; }
          .cp-strip { flex-direction:column; padding:40px 6%; }
          .cp-strip-input { width:100%; }
        }
      `}</style>

      <div className="cp-root">

        {/* HERO */}
        <div className="cp-hero">
          <div className="cp-blob cp-blob-1" /><div className="cp-blob cp-blob-2" /><div className="cp-blob cp-blob-3" />
          <div className="cp-hero-inner">
            <div className="cp-hero-badge"><span className="cp-badge-dot" />Learn · Speak · Succeed</div>
            <h1 className="cp-hero-title">Our <span className="gold">Courses</span></h1>
            <p className="cp-hero-sub">
              Expert-led English courses designed to boost your fluency, confidence and career — at the most affordable price in India.
            </p>
            <div className="cp-hero-stats">
              {[["12+","Courses"],["5,000+","Students"],["97%","Success Rate"],["₹999","Starting At"]].map(([n,l])=>(
                <div key={l} style={{textAlign:"center"}}>
                  <span className="cp-stat-num">{n}</span>
                  <span className="cp-stat-lbl">{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="cp-filter-bar">
          <h2 className="cp-filter-heading">Browse <span>Courses</span></h2>
          <div className="cp-filter-tabs">
            {filters.map(f => (
              <button key={f} className={`cp-filter-btn ${activeFilter===f?"on":"off"}`} onClick={()=>setActiveFilter(f)}>{f}</button>
            ))}
          </div>
        </div>

        {/* GRID */}
        <div className="cp-grid">
          {filtered.map(course => <CourseCard key={course.id} course={course} />)}
        </div>

        {/* BOTTOM STRIP */}
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