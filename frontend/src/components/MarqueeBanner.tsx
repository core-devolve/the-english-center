export default function MarqueeBanner() {
  const items = [
    "🎓 Admissions Open 2025",
    "🗣️ Spoken English — New Batch Starting Soon",
    "📝 IELTS & TOEFL Coaching Available",
    "💼 Business English for Professionals",
    "🏫 School Batches — Class 6 to 12",
    "🎒 Weekend Batches for College Students",
    "⏰ Morning & Evening Slots for Working Pros",
    "📚 Free Demo Class — Book Yours Today",
    "✍️ Grammar & Writing Mastery Course",
    "🎤 Public Speaking & Debate Program",
    "🖥️ Online & Offline Modes Available",
    "🏆 Interview & GD Prep — Enroll Now",
  ];

  const doubled = [...items, ...items];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600&display=swap');

        .mq-wrap {
          background: linear-gradient(90deg, #1a3a5c 0%, #1e5fa8 50%, #1a3a5c 100%);
          padding: 11px 0;
          overflow: hidden;
          display: flex;
          border-bottom: 1px solid rgba(255,255,255,0.12);
          position: relative;
        }

        /* fade edges */
        .mq-wrap::before,
        .mq-wrap::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: 80px;
          z-index: 2;
          pointer-events: none;
        }
        .mq-wrap::before {
          left: 0;
          background: linear-gradient(to right, #1a3a5c, transparent);
        }
        .mq-wrap::after {
          right: 0;
          background: linear-gradient(to left, #1a3a5c, transparent);
        }

        .mq-track {
          display: flex;
          white-space: nowrap;
          animation: marquee 38s linear infinite;
          will-change: transform;
        }
        .mq-track:hover { animation-play-state: paused; }

        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .mq-item {
          color: rgba(255,255,255,0.92);
          font-size: 13px;
          font-weight: 500;
          padding: 0 24px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'Poppins', sans-serif;
          letter-spacing: 0.01em;
        }

        .mq-divider {
          color: rgba(255,255,255,0.25);
          font-size: 16px;
          line-height: 1;
        }
      `}</style>

      <div className="mq-wrap">
        <div className="mq-track">
          {doubled.map((item, i) => (
            <span key={i} className="mq-item">
              {item}
              <span className="mq-divider">|</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}