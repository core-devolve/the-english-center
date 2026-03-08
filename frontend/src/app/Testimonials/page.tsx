"use client";

import StudentStories from "@/components/Studentstories";
import SuccessStories from "@/components/SuccessStories";
// import StudentStories from "@/components/StudentStories";

export default function TestimonialsPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700;800&display=swap');

        .tp-root, .tp-root *, .tp-root *::before, .tp-root *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        .tp-root {
          font-family: 'DM Sans', sans-serif;
          background: #f8f7ff;
        }

        /* ── HERO ── */
        .tp-hero {
          background: linear-gradient(135deg, #0f0c29 0%, #1e1b4b 45%, #302b63 100%);
          padding: 90px 8% 80px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .tp-hero::after {
          content: '';
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }
        .tp-hero-blob {
          position: absolute; border-radius: 50%;
          filter: blur(70px); opacity: 0.13; pointer-events: none;
        }
        .tp-hero-blob-1 { width: 320px; height: 320px; background: #7c3aed; top: -80px; right: -40px; }
        .tp-hero-blob-2 { width: 240px; height: 240px; background: #4f46e5; bottom: -70px; left: -30px; }
        .tp-hero-blob-3 { width: 200px; height: 200px; background: #fbbf24; top: 20px; left: 30%; opacity: 0.07; }

        .tp-hero-inner { position: relative; z-index: 2; }

        .tp-hero-badge {
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
        .tp-hero-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #a78bfa;
          animation: tpPulse 2s ease-in-out infinite;
        }
        .tp-hero-title {
          font-family: 'Fraunces', serif;
          font-size: clamp(38px, 5.5vw, 68px);
          font-weight: 900; color: #ffffff;
          line-height: 1.05; letter-spacing: -1.5px;
          margin-bottom: 18px;
        }
        .tp-hero-title .gold {
          font-style: italic; color: #fbbf24;
          position: relative; display: inline-block;
        }
        .tp-hero-title .gold::after {
          content: '';
          position: absolute; left: 0; bottom: -5px;
          width: 100%; height: 3px; border-radius: 2px;
          background: linear-gradient(90deg, #fbbf24, #f59e0b);
        }
        .tp-hero-sub {
          font-size: 15px; color: rgba(255,255,255,0.52);
          line-height: 1.75; max-width: 480px; margin: 0 auto 36px;
        }

        /* hero stats */
        .tp-hero-stats {
          display: flex; justify-content: center;
          gap: 48px; flex-wrap: wrap;
        }
        .tp-hero-stat-num {
          font-family: 'Fraunces', serif;
          font-size: 28px; font-weight: 900; color: #ffffff;
          display: block; letter-spacing: -0.5px;
        }
        .tp-hero-stat-lbl {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; color: rgba(255,255,255,0.45);
          display: block; margin-top: 3px;
        }

        /* divider between sections */
        .tp-divider {
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(79,70,229,0.15), transparent);
          margin: 0;
        }

        /* section labels */
        .tp-section-label {
          text-align: center;
          padding: 52px 8% 8px;
          position: relative; z-index: 1;
        }
        .tp-section-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 10px; font-weight: 700; color: #4f46e5;
          text-transform: uppercase; letter-spacing: 2px;
          margin-bottom: 10px;
        }
        .tp-section-eyebrow::before, .tp-section-eyebrow::after {
          content: '';
          width: 28px; height: 2px;
          background: linear-gradient(90deg, #4f46e5, #7c3aed);
          border-radius: 2px;
        }
        .tp-section-heading {
          font-family: 'Fraunces', serif;
          font-size: clamp(22px, 3vw, 36px);
          font-weight: 700; color: #0f0c29;
          letter-spacing: -0.5px; line-height: 1.2;
        }
        .tp-section-heading span { color: #4f46e5; font-style: italic; }

        /* ── ANIMATIONS ── */
        @keyframes tpPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(1.4); }
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 600px) {
          .tp-hero { padding: 60px 6% 56px; }
          .tp-hero-stats { gap: 28px; }
        }
      `}</style>

      <div className="tp-root">

        {/* ── HERO ── */}
        <div className="tp-hero">
          <div className="tp-hero-blob tp-hero-blob-1" />
          <div className="tp-hero-blob tp-hero-blob-2" />
          <div className="tp-hero-blob tp-hero-blob-3" />

          <div className="tp-hero-inner">
            <div className="tp-hero-badge">
              <span className="tp-hero-dot" />
              Real Students · Real Results
            </div>

            <h1 className="tp-hero-title">
              Stories That <br />
              <span className="gold">Inspire</span> & Prove
            </h1>

            <p className="tp-hero-sub">
              Thousands of students have transformed their English skills and careers
              with SpeakEdge. Here&apos;s what they have to say.
            </p>

            <div className="tp-hero-stats">
              {[
                ["5,000+", "Students Trained"],
                ["97%",    "Success Rate"],
                ["10+",    "Years of Excellence"],
                ["500+",   "First Attempters"],
              ].map(([num, lbl]) => (
                <div key={lbl} style={{ textAlign: "center" }}>
                  <span className="tp-hero-stat-num">{num}</span>
                  <span className="tp-hero-stat-lbl">{lbl}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── SECTION 1 LABEL ── */}
        <div className="tp-section-label">
          <div className="tp-section-eyebrow">Hall of Fame</div>
          <h2 className="tp-section-heading">
            First Attempt <span>Success Stories</span>
          </h2>
        </div>

        {/* ── SUCCESS STORIES CAROUSEL ── */}
        <SuccessStories />

        <div className="tp-divider" />

        {/* ── SECTION 2 LABEL ── */}
        <div className="tp-section-label">
          <div className="tp-section-eyebrow">Student Voices</div>
          <h2 className="tp-section-heading">
            Hear From Our <span>Students</span>
          </h2>
        </div>

        {/* ── STUDENT VIDEO STORIES ── */}
        <StudentStories />

      </div>
    </>
  );
}