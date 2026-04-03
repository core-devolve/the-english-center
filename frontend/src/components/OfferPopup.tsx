"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function OfferPopup() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  function handleClose() {
    setClosing(true);
    setTimeout(() => { setVisible(false); setClosing(false); }, 400);
  }

  function handleEnquire() {
    handleClose();
    setTimeout(() => router.push("/Admission"), 420);
  }

  if (!visible) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Outfit:wght@300;400;500;600;700;800&display=swap');

        /* ── Backdrop ── */
        .op-backdrop {
          position: fixed; inset: 0; z-index: 9998;
          background: rgba(10, 15, 40, 0.65);
          backdrop-filter: blur(6px);
          animation: opFadeIn 0.35s ease forwards;
        }
        .op-backdrop.closing {
          animation: opFadeOut 0.38s ease forwards;
        }

        /* ── Card wrapper ── */
        .op-wrap {
          position: fixed; inset: 0; z-index: 9999;
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
          pointer-events: none;
        }

        /* ── Card ── */
        .op-card {
          pointer-events: all;
          width: 100%; max-width: 480px;
          background: #0d1b3e;
          border-radius: 24px;
          overflow: hidden;
          box-shadow:
            0 0 0 1px rgba(201,168,76,0.2),
            0 40px 100px rgba(0,0,0,0.55),
            0 0 80px rgba(201,168,76,0.06);
          animation: opSlideUp 0.42s cubic-bezier(0.34,1.56,0.64,1) forwards;
          position: relative;
        }
        .op-card.closing {
          animation: opSlideDown 0.36s cubic-bezier(0.4,0,1,1) forwards;
        }

        /* ── Top ribbon ── */
        .op-ribbon {
          background: linear-gradient(90deg, #b8860b, #c9a84c, #e8c97a, #c9a84c, #b8860b);
          background-size: 200% 100%;
          animation: opShimmer 3s linear infinite;
          height: 4px;
          width: 100%;
        }

        /* ── Inner grid lines ── */
        .op-card-inner {
          position: relative;
          padding: 32px 32px 36px;
          overflow: hidden;
        }
        .op-card-inner::before {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px);
          background-size: 36px 36px;
        }

        /* Glow orbs */
        .op-orb-1 {
          position: absolute; border-radius: 50%; pointer-events: none;
          width: 280px; height: 280px;
          background: radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%);
          top: -80px; right: -60px;
        }
        .op-orb-2 {
          position: absolute; border-radius: 50%; pointer-events: none;
          width: 180px; height: 180px;
          background: radial-gradient(circle, rgba(79,70,229,0.08) 0%, transparent 70%);
          bottom: -60px; left: -40px;
        }

        /* ── Close btn ── */
        .op-close {
          position: absolute; top: 16px; right: 16px; z-index: 10;
          width: 32px; height: 32px; border-radius: 50%;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.5);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 16px; line-height: 1;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
        }
        .op-close:hover {
          background: rgba(255,255,255,0.14);
          border-color: rgba(255,255,255,0.25);
          color: #fff;
        }

        /* ── Content ── */
        .op-content { position: relative; z-index: 2; }

        /* Limited time badge */
        .op-badge {
          display: inline-flex; align-items: center; gap: 8px;
          border: 1px solid rgba(201,168,76,0.35);
          background: rgba(201,168,76,0.08);
          padding: 5px 14px; border-radius: 3px;
          margin-bottom: 22px;
        }
        .op-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #c9a84c;
          animation: opPulse 1.6s ease-in-out infinite;
        }
        .op-badge-text {
          font-family: 'Outfit', sans-serif;
          font-size: 10px; font-weight: 700; color: #c9a84c;
          letter-spacing: 2.5px; text-transform: uppercase;
        }

        /* Big 50% */
        .op-headline {
          display: flex; align-items: flex-start; gap: 0;
          margin-bottom: 6px;
          line-height: 1;
        }
        .op-pct {
          font-family: 'Playfair Display', serif;
          font-size: 96px; font-weight: 900;
          background: linear-gradient(135deg, #c9a84c 0%, #e8c97a 50%, #c9a84c 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: opShimmer 3s linear infinite;
          letter-spacing: -4px;
          line-height: 0.9;
        }
        .op-off-stack {
          display: flex; flex-direction: column; justify-content: flex-end;
          padding-bottom: 14px; padding-left: 6px;
        }
        .op-off {
          font-family: 'Playfair Display', serif;
          font-size: 32px; font-weight: 700; font-style: italic;
          color: rgba(255,255,255,0.85);
          line-height: 1;
        }
        .op-off-sub {
          font-family: 'Outfit', sans-serif;
          font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.35);
          text-transform: uppercase; letter-spacing: 2px;
          margin-top: 4px;
        }

        /* Subheading */
        .op-subtitle {
          font-family: 'Playfair Display', serif;
          font-size: 22px; font-weight: 700; color: #fff;
          line-height: 1.3; margin-bottom: 10px; letter-spacing: -0.3px;
        }
        .op-subtitle em { font-style: italic; color: #c9a84c; }

        .op-desc {
          font-family: 'Outfit', sans-serif;
          font-size: 13.5px; color: rgba(255,255,255,0.45);
          line-height: 1.72; margin-bottom: 26px; font-weight: 300;
        }
        .op-desc strong { color: rgba(255,255,255,0.7); font-weight: 600; }

        /* Course chips */
        .op-courses {
          display: flex; flex-wrap: wrap; gap: 7px;
          margin-bottom: 28px;
        }
        .op-course {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(201,168,76,0.18);
          border-radius: 4px;
          padding: 5px 12px;
          font-family: 'Outfit', sans-serif;
          font-size: 11px; font-weight: 600;
          color: rgba(255,255,255,0.6);
          letter-spacing: 0.3px;
        }

        /* Divider */
        .op-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent);
          margin-bottom: 24px;
        }

        /* CTA */
        .op-cta-row {
          display: flex; gap: 10px; align-items: center;
        }
        .op-btn-main {
          flex: 1;
          background: linear-gradient(135deg, #b8860b, #c9a84c, #e8c97a);
          background-size: 200% 100%;
          color: #0d1b3e;
          border: none; border-radius: 10px;
          padding: 15px 24px;
          font-family: 'Outfit', sans-serif;
          font-size: 14px; font-weight: 800;
          cursor: pointer; letter-spacing: 0.3px;
          box-shadow: 0 8px 28px rgba(201,168,76,0.35);
          transition: all 0.25s;
          position: relative; overflow: hidden;
        }
        .op-btn-main::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%);
          transform: translateX(-100%);
          transition: transform 0.5s;
        }
        .op-btn-main:hover { transform: translateY(-2px); box-shadow: 0 12px 36px rgba(201,168,76,0.45); }
        .op-btn-main:hover::after { transform: translateX(100%); }

        .op-btn-skip {
          background: transparent;
          border: none;
          font-family: 'Outfit', sans-serif;
          font-size: 12px; font-weight: 500;
          color: rgba(255,255,255,0.3);
          cursor: pointer; padding: 6px;
          transition: color 0.2s;
          white-space: nowrap;
        }
        .op-btn-skip:hover { color: rgba(255,255,255,0.6); }

        /* Countdown timer strip */
        .op-timer {
          display: flex; align-items: center; justify-content: center;
          gap: 8px; margin-top: 18px;
        }
        .op-timer-icon { font-size: 13px; }
        .op-timer-text {
          font-family: 'Outfit', sans-serif;
          font-size: 11px; color: rgba(255,255,255,0.3); font-weight: 500;
        }
        .op-timer-text strong { color: #c9a84c; font-weight: 700; }

        /* ── Keyframes ── */
        @keyframes opFadeIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes opFadeOut { from { opacity: 1; } to { opacity: 0; } }
        @keyframes opSlideUp {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        @keyframes opSlideDown {
          from { opacity: 1; transform: translateY(0)   scale(1); }
          to   { opacity: 0; transform: translateY(40px) scale(0.95); }
        }
        @keyframes opShimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes opPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(1.6); }
        }

        /* ── Responsive ── */
        @media (max-width: 520px) {
          .op-card-inner { padding: 24px 22px 28px; }
          .op-pct { font-size: 72px; }
          .op-off { font-size: 26px; }
          .op-subtitle { font-size: 18px; }
        }
      `}</style>

      {/* Backdrop */}
      <div
        className={`op-backdrop${closing ? " closing" : ""}`}
        onClick={handleClose}
      />

      {/* Card */}
      <div className="op-wrap">
        <div className={`op-card${closing ? " closing" : ""}`}>
          {/* Gold ribbon */}
          <div className="op-ribbon" />

          <div className="op-card-inner">
            {/* Decorative orbs */}
            <div className="op-orb-1" />
            <div className="op-orb-2" />

            {/* Close */}
            <button className="op-close" onClick={handleClose} aria-label="Close">✕</button>

            <div className="op-content">

              {/* Badge */}
              <div className="op-badge">
                <span className="op-badge-dot" />
                <span className="op-badge-text">Limited Time Offer</span>
              </div>

              {/* Big 50% */}
              <div className="op-headline">
                <span className="op-pct">50%</span>
                <div className="op-off-stack">
                  <span className="op-off">Off</span>
                  <span className="op-off-sub">All Courses</span>
                </div>
              </div>

              {/* Subtitle */}
              <h2 className="op-subtitle">
                Speak English with <em>Confidence</em><br />— at Half the Price
              </h2>

              <p className="op-desc">
                Enrol in any of our courses today and unlock a{" "}
                <strong>massive 50% discount</strong>. IELTS prep, Spoken English,
                Vocabulary &amp; more — all now within reach.
              </p>

              {/* Course chips */}
              <div className="op-courses">
                {["IELTS Preparation", "Spoken English", "Vocabulary Building", "Personality Development", "Career Counselling"].map((c) => (
                  <span key={c} className="op-course">✦ {c}</span>
                ))}
              </div>

              <div className="op-divider" />

              {/* CTAs */}
              <div className="op-cta-row">
                <button className="op-btn-main" onClick={handleEnquire}>
                  Enquire Now &amp; Claim Offer →
                </button>
                <button className="op-btn-skip" onClick={handleClose}>
                  Maybe later
                </button>
              </div>

              {/* Timer note */}
              <div className="op-timer">
                <span className="op-timer-icon">⏳</span>
                <span className="op-timer-text">
                  Offer valid for <strong>today only</strong> — don&apos;t miss out
                </span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}