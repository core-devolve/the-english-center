"use client";

interface Stat {
  num: string;
  lbl: string;
}

interface Feature {
  icon: string;
  tag: string;
  title: string;
  sub: string;
}

const stats: Stat[] = [
  { num: "5M+",  lbl: "Students" },
  { num: "300+", lbl: "Educators" },
  { num: "97%",  lbl: "Success Rate" },
  { num: "₹149", lbl: "Starting Price" },
];

const features: Feature[] = [
  { icon: "🎥", tag: "LIVE", title: "Daily Live",   sub: "Interactive classes" },
  { icon: "📝", tag: "",     title: "8 Million +",  sub: "Tests, sample papers & notes" },
  { icon: "🧠", tag: "",     title: "24 x 7",       sub: "Doubt solving sessions" },
  { icon: "🏅", tag: "",     title: "50 +",         sub: "Offline centres" },
];

export default function EnglishCoachingHero() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Poppins:wght@400;500;600;700&display=swap');

        /* ── SCOPED RESET — only inside .ec-root ── */
        .ec-root, .ec-root * , .ec-root *::before, .ec-root *::after {
          box-sizing: border-box;
        }
        .ec-root {
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(160deg, #eef2ff 0%, #f5f0ff 50%, #e8f4ff 100%);
          min-height: 100vh;
          padding: 0;
          margin: 0;
        }

        /* ── HERO GRID ── */
        .ec-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
          padding: 60px 8% 40px 8%;
        }

        /* ── LEFT SIDE ── */
        .ec-left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .ec-tag {
          display: inline-block;
          background: #ede9fe;
          color: #4f46e5;
          font-size: 11px;
          font-weight: 700;
          padding: 5px 14px;
          border-radius: 20px;
          margin-bottom: 16px;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          line-height: 1.4;
        }
        .ec-h1 {
          font-family: 'Nunito', sans-serif;
          font-size: clamp(28px, 3.8vw, 48px);
          font-weight: 900;
          line-height: 1.15;
          color: #1e1b4b;
          margin: 0 0 16px 0;
          padding: 0;
        }
        .ec-h1 .ec-purple { color: #4f46e5; }
        .ec-sub {
          font-size: 15px;
          color: #6b7280;
          line-height: 1.7;
          max-width: 460px;
          margin: 0 0 32px 0;
          padding: 0;
        }

        /* ── STAT CARDS ── */
        .ec-stats-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 32px;
          width: 100%;
        }
        .ec-stat {
          background: #ffffff;
          border-radius: 12px;
          padding: 14px 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          text-align: center;
          flex: 1;
          min-width: 80px;
          border-top: 3px solid #4f46e5;
          border-left: none;
          border-right: none;
          border-bottom: none;
        }
        .ec-stat-num {
          font-family: 'Nunito', sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: #4f46e5;
          line-height: 1.2;
          display: block;
        }
        .ec-stat-lbl {
          font-size: 10px;
          color: #9ca3af;
          font-weight: 600;
          margin-top: 3px;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          display: block;
        }

        /* ── CTA BUTTON ── */
        .ec-cta {
          display: inline-block;
          background: #4f46e5;
          color: #ffffff;
          border: none;
          padding: 14px 32px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          font-family: 'Poppins', sans-serif;
          box-shadow: 0 6px 20px rgba(79, 70, 229, 0.38);
          transition: all 0.25s ease;
          letter-spacing: 0.2px;
          text-decoration: none;
          line-height: 1;
        }
        .ec-cta:hover {
          background: #4338ca;
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(79, 70, 229, 0.42);
        }

        /* ── RIGHT VISUAL ── */
        .ec-vis {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .ec-vis-wrap {
          width: 380px;
          height: 380px;
          position: relative;
        }

        /* Spinning dashed rings */
        .ec-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 300px;
          height: 300px;
          border-radius: 50%;
          border: 2px dashed rgba(79, 70, 229, 0.25);
          animation: ecSlowSpin 18s linear infinite;
        }
        .ec-ring2 {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 210px;
          height: 210px;
          border-radius: 50%;
          border: 1.5px dashed rgba(79, 70, 229, 0.14);
          animation: ecSlowSpin 12s linear infinite reverse;
        }

        /* Teacher big circle — bottom left */
        .ec-teacher {
          position: absolute;
          bottom: 30px;
          left: 30px;
          width: 160px;
          height: 160px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1e1b4b 0%, #312e81 55%, #4f46e5 100%);
          border: 5px solid #ffffff;
          box-shadow: 0 12px 40px rgba(31, 27, 100, 0.30);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 60px;
          line-height: 1;
        }

        /* Student smaller circle — top right */
        .ec-student {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 130px;
          height: 130px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ede9fe 0%, #7c3aed 100%);
          border: 5px solid #ffffff;
          box-shadow: 0 6px 24px rgba(124, 58, 237, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 48px;
          line-height: 1;
        }

        /* Chat bubble — question (top left area) */
        .ec-bubble-q {
          position: absolute;
          top: 30px;
          left: 10px;
          background: #ffffff;
          border-radius: 16px 16px 16px 4px;
          padding: 10px 14px;
          font-size: 12px;
          font-weight: 600;
          color: #1e1b4b;
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.10);
          border: 1.5px solid #e0e7ff;
          max-width: 175px;
          line-height: 1.5;
          animation: ecFloat 4s ease-in-out infinite;
        }

        /* Chat bubble — answer (bottom right area) */
        .ec-bubble-a {
          position: absolute;
          bottom: 80px;
          right: 0px;
          background: #4f46e5;
          color: #ffffff;
          border-radius: 16px 16px 4px 16px;
          padding: 10px 14px;
          font-size: 12px;
          font-weight: 600;
          box-shadow: 0 6px 20px rgba(79, 70, 229, 0.35);
          max-width: 210px;
          line-height: 1.5;
          animation: ecFloat 4s ease-in-out infinite 2s;
        }

        /* Decorative dots */
        .ec-dot {
          position: absolute;
          border-radius: 50%;
        }
        .ec-dot-1 { width: 10px; height: 10px; background: #7c3aed; top: 65px;  left: 65px;  animation: ecFloat 3.0s ease-in-out infinite 0.0s; }
        .ec-dot-2 { width: 8px;  height: 8px;  background: #f59e0b; top: 95px;  right: 65px; animation: ecFloat 3.0s ease-in-out infinite 1.0s; }
        .ec-dot-3 { width: 7px;  height: 7px;  background: #10b981; bottom: 85px; right: 25px; animation: ecFloat 3.0s ease-in-out infinite 0.5s; }
        .ec-dot-4 { width: 6px;  height: 6px;  background: #ef4444; bottom: 45px; left: 85px;  animation: ecFloat 3.0s ease-in-out infinite 1.5s; }

        /* ── FEATURES BAR ── */
        .ec-features {
          margin: 0 5% 40px 5%;
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 6px 30px rgba(0, 0, 0, 0.08);
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          overflow: hidden;
        }
        .ec-feat {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 28px 20px;
          gap: 8px;
          border-right: 1px solid #f1f5f9;
          transition: background 0.2s ease;
          cursor: default;
        }
        .ec-feat:last-child { border-right: none; }
        .ec-feat:hover { background: #f5f3ff; }

        .ec-feat-icon-wrap {
          position: relative;
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ec-feat-emoji {
          font-size: 38px;
          line-height: 1;
        }
        .ec-feat-live-badge {
          position: absolute;
          top: -4px;
          left: -6px;
          background: #ef4444;
          color: #ffffff;
          font-size: 9px;
          font-weight: 700;
          padding: 2px 5px;
          border-radius: 4px;
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
          gap: 3px;
        }
        .ec-feat-live-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #ffffff;
          animation: ecLivePulse 1s ease-in-out infinite;
        }
        .ec-feat-title {
          font-family: 'Nunito', sans-serif;
          font-size: 17px;
          font-weight: 800;
          color: #1e1b4b;
          margin: 0;
          padding: 0;
        }
        .ec-feat-sub {
          font-size: 12px;
          color: #9ca3af;
          font-weight: 500;
          text-align: center;
          margin: 0;
          padding: 0;
        }

        /* ── KEYFRAMES ── */
        @keyframes ecSlowSpin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes ecFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-9px); }
        }
        @keyframes ecLivePulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.25; }
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .ec-hero {
            grid-template-columns: 1fr;
            padding: 40px 6% 20px 6%;
          }
          .ec-vis { display: none; }
          .ec-features {
            grid-template-columns: repeat(2, 1fr);
            margin: 0 4% 32px 4%;
          }
          .ec-feat:nth-child(2) { border-right: none; }
          .ec-feat:nth-child(3) { border-top: 1px solid #f1f5f9; }
        }
        @media (max-width: 480px) {
          .ec-stats-row { gap: 8px; }
          .ec-stat { padding: 10px 10px; }
          .ec-stat-num { font-size: 18px; }
        }
      `}</style>

      <div className="ec-root">

        {/* ── HERO ── */}
        <section className="ec-hero">

          {/* LEFT */}
          <div className="ec-left">
            <span className="ec-tag">India&apos;s #1 English Platform</span>

            <h1 className="ec-h1">
              India&apos;s{" "}
              <span className="ec-purple">Trusted &amp; Affordable</span>
              <br />
              English Coaching Platform
            </h1>

            <p className="ec-sub">
              Unlock your English potential with SpeakEdge — the most affordable spoken &amp;
              written English solution trusted by millions across India.
            </p>

            <div className="ec-stats-row">
              {stats.map((s: Stat) => (
                <div key={s.lbl} className="ec-stat">
                  <span className="ec-stat-num">{s.num}</span>
                  <span className="ec-stat-lbl">{s.lbl}</span>
                </div>
              ))}
            </div>

            <button className="ec-cta">Get Started Free →</button>
          </div>

          {/* RIGHT VISUAL */}
          <div className="ec-vis">
            <div className="ec-vis-wrap">
              <div className="ec-ring" />
              <div className="ec-ring2" />

              <div className="ec-teacher">👨‍🏫</div>
              <div className="ec-student">👩‍🎓</div>

              <div className="ec-bubble-q">
                Sir, how do I improve my spoken English?
              </div>
              <div className="ec-bubble-a">
                Practise daily with SpeakEdge — live classes, real feedback &amp; expert guidance!
              </div>

              <div className="ec-dot ec-dot-1" />
              <div className="ec-dot ec-dot-2" />
              <div className="ec-dot ec-dot-3" />
              <div className="ec-dot ec-dot-4" />
            </div>
          </div>

        </section>

        {/* ── FEATURES BAR ── */}
        <div className="ec-features">
          {features.map((f: Feature, i: number) => (
            <div key={i} className="ec-feat">
              <div className="ec-feat-icon-wrap">
                <span className="ec-feat-emoji">{f.icon}</span>
                {f.tag && (
                  <div className="ec-feat-live-badge">
                    <div className="ec-feat-live-dot" />
                    {f.tag}
                  </div>
                )}
              </div>
              <p className="ec-feat-title">{f.title}</p>
              <p className="ec-feat-sub">{f.sub}</p>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}