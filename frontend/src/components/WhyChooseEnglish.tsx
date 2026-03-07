"use client";

interface Feature {
  icon: string;
  title: string;
  desc: string;
}

const features: Feature[] = [
  {
    icon: "🗣️",
    title: "Spoken English Classes",
    desc: "Build fluency and confidence through daily practice sessions, role plays, and real conversation drills.",
  },
  {
    icon: "📖",
    title: "Grammar Mastery Notes",
    desc: "Handcrafted notes covering every grammar rule — from basics to advanced — for clear and correct English.",
  },
  {
    icon: "🎤",
    title: "Public Speaking Training",
    desc: "Overcome stage fear and develop powerful presentation skills through guided speaking exercises.",
  },
  {
    icon: "✍️",
    title: "Writing Skills Workshop",
    desc: "Master essay writing, email drafting, and formal communication for academic and professional success.",
  },
  {
    icon: "🏆",
    title: "Exam Preparation",
    desc: "Targeted coaching for IELTS, TOEFL, PTE and other English proficiency exams with mock test practice.",
  },
  {
    icon: "💼",
    title: "Interview & Career Coaching",
    desc: "Prepare for job interviews with mock sessions, personality grooming, and professional English training.",
  },
];

export default function WhyChooseEnglish() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Poppins:wght@400;500;600;700&display=swap');

        .wce-root, .wce-root *, .wce-root *::before, .wce-root *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .wce-root {
          font-family: 'Poppins', sans-serif;
          background: radial-gradient(ellipse at 65% 0%, #1a1f6e 0%, #0f1550 40%, #080e38 100%);
          min-height: 100vh;
          padding: 52px 6% 60px;
          position: relative;
          overflow: hidden;
        }

        .wce-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(circle at 15% 85%, rgba(99, 102, 241, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 85% 15%, rgba(251, 191, 36, 0.06) 0%, transparent 50%);
          pointer-events: none;
        }

        /* ── HEADER ── */
        .wce-header {
          text-align: center;
          margin-bottom: 36px;
          position: relative;
          z-index: 1;
        }
        .wce-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          font-weight: 700;
          color: #818cf8;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .wce-badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #818cf8;
          display: inline-block;
          animation: wcePulse 2s ease-in-out infinite;
        }
        .wce-h2 {
          font-family: 'Nunito', sans-serif;
          font-size: clamp(22px, 3.2vw, 40px);
          font-weight: 900;
          color: #ffffff;
          line-height: 1.15;
          margin-bottom: 10px;
        }
        .wce-h2 span {
          color: #fbbf24;
          text-decoration: underline;
          text-decoration-color: rgba(251,191,36,0.6);
          text-underline-offset: 5px;
        }
        .wce-sub {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.50);
          line-height: 1.6;
          max-width: 460px;
          margin: 0 auto;
        }

        /* ── GRID ── */
        .wce-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          position: relative;
          z-index: 1;
        }

        /* ── CARD ── */
        .wce-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          padding: 22px 20px 20px;
          transition: background 0.25s ease, transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
          cursor: default;
          backdrop-filter: blur(8px);
        }
        .wce-card:hover {
          background: rgba(99, 102, 241, 0.10);
          border-color: rgba(99, 102, 241, 0.35);
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
        }

        .wce-icon-box {
          width: 42px; height: 42px;
          border-radius: 11px;
          background: rgba(99, 102, 241, 0.15);
          border: 1px solid rgba(99, 102, 241, 0.25);
          display: flex; align-items: center; justify-content: center;
          font-size: 20px;
          margin-bottom: 16px;
          line-height: 1;
          transition: background 0.25s ease, border-color 0.25s ease;
        }
        .wce-card:hover .wce-icon-box {
          background: rgba(99, 102, 241, 0.25);
          border-color: rgba(99, 102, 241, 0.5);
        }

        .wce-card-title {
          font-family: 'Nunito', sans-serif;
          font-size: 14px;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 7px;
          line-height: 1.3;
        }
        .wce-card-desc {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.48);
          line-height: 1.65;
          font-weight: 400;
        }

        /* ── ANIMATIONS ── */
        @keyframes wcePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(1.3); }
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .wce-grid { grid-template-columns: repeat(2, 1fr); }
          .wce-root { padding: 40px 5% 48px; }
        }
        @media (max-width: 560px) {
          .wce-grid { grid-template-columns: 1fr; }
          .wce-root { padding: 32px 5% 40px; }
        }
      `}</style>

      <div className="wce-root">
        <div className="wce-header">
          <div className="wce-badge">
            <span className="wce-badge-dot" />
            India&apos;s #1 English Coaching Centre
          </div>
          <h2 className="wce-h2">
            Why Choose <span>The English Center</span>
          </h2>
          <p className="wce-sub">
            Empowering thousands of students with the confidence, skills, and fluency
            to succeed in English — personally and professionally.
          </p>
        </div>

        <div className="wce-grid">
          {features.map((f: Feature, i: number) => (
            <div key={i} className="wce-card">
              <div className="wce-icon-box">{f.icon}</div>
              <p className="wce-card-title">{f.title}</p>
              <p className="wce-card-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}