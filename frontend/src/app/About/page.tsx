"use client";

export default function AboutUs() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700;800&display=swap');

        .ab-root, .ab-root *, .ab-root *::before, .ab-root *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .ab-root {
          font-family: 'DM Sans', sans-serif;
          background: #f8f7ff;
          min-height: 100vh;
        }

        /* ── HERO BANNER ── */
        .ab-hero {
          background: linear-gradient(135deg, #0f0c29 0%, #1e1b4b 45%, #302b63 100%);
          padding: 90px 8% 80px;
          position: relative;
          overflow: hidden;
          text-align: center;
        }
        .ab-hero::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            radial-gradient(ellipse at 25% 60%, rgba(139,92,246,0.15) 0%, transparent 55%),
            radial-gradient(ellipse at 80% 20%, rgba(251,191,36,0.08) 0%, transparent 50%);
          pointer-events: none;
        }

        /* grid texture */
        .ab-hero::after {
          content: '';
          position: absolute; inset: 0;
          background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        .ab-hero-inner { position: relative; z-index: 2; }

        .ab-hero-badge {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(139,92,246,0.15);
          border: 1px solid rgba(139,92,246,0.35);
          color: #c4b5fd;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 10px; font-weight: 600;
          padding: 5px 14px; border-radius: 20px;
          text-transform: uppercase; letter-spacing: 2px;
          margin-bottom: 24px;
        }
        .ab-hero-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #a78bfa;
          animation: abPulse 2s ease-in-out infinite;
        }
        .ab-hero-title {
          font-family: 'Fraunces', serif;
          font-size: clamp(40px, 5.5vw, 72px);
          font-weight: 900;
          color: #ffffff;
          line-height: 1.05;
          margin-bottom: 20px;
          letter-spacing: -1px;
        }
        .ab-hero-title .yellow {
          color: #fbbf24;
          font-style: italic;
        }
        .ab-hero-title .underline-yellow {
          position: relative; display: inline-block;
        }
        .ab-hero-title .underline-yellow::after {
          content: '';
          position: absolute; left: 0; bottom: -4px;
          width: 100%; height: 3px;
          background: linear-gradient(90deg, #fbbf24, #f59e0b);
          border-radius: 2px;
        }
        .ab-hero-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px; color: rgba(255,255,255,0.55);
          line-height: 1.75; max-width: 480px; margin: 0 auto;
        }

        /* Decorative blobs */
        .ab-blob {
          position: absolute; border-radius: 50%;
          filter: blur(60px); opacity: 0.12; pointer-events: none;
        }
        .ab-blob-1 { width: 280px; height: 280px; background: #7c3aed; top: -80px; right: -40px; }
        .ab-blob-2 { width: 200px; height: 200px; background: #4f46e5; bottom: -60px; left: -30px; }

        /* ── MAIN CONTENT ── */
        .ab-body {
          padding: 64px 8% 80px;
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 56px;
          align-items: start;
        }

        /* ── LEFT COL ── */
        .ab-instructor-col {
          display: flex; flex-direction: column; gap: 18px;
          position: sticky; top: 24px;
        }

        /* Logo card */
        .ab-logo-card {
          background: #ffffff;
          border-radius: 18px;
          padding: 18px 22px;
          box-shadow: 0 4px 20px rgba(79,70,229,0.09);
          border: 1px solid rgba(79,70,229,0.09);
          display: flex; align-items: center; gap: 14px;
        }
        .ab-logo-icon {
          width: 50px; height: 50px; border-radius: 13px; flex-shrink: 0;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          display: flex; align-items: center; justify-content: center;
          font-size: 24px;
          box-shadow: 0 4px 14px rgba(79,70,229,0.3);
        }
        .ab-logo-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 18px; font-weight: 800; color: #0f0c29;
          letter-spacing: -0.3px;
        }
        .ab-logo-name span { color: #4f46e5; }
        .ab-logo-sub {
          font-size: 11px; color: #9ca3af; font-weight: 500; margin-top: 2px;
        }

        /* Instructor card */
        .ab-instructor-card {
          background: #ffffff;
          border-radius: 20px; overflow: hidden;
          box-shadow: 0 8px 36px rgba(79,70,229,0.11);
          border: 1px solid rgba(79,70,229,0.08);
        }
        .ab-photo-wrap {
          width: 100%; aspect-ratio: 4/3;
          background: linear-gradient(135deg, #1e1b4b 0%, #4f46e5 60%, #7c3aed 100%);
          display: flex; align-items: center; justify-content: center;
          position: relative; overflow: hidden;
        }
        .ab-photo-wrap::after {
          content: '';
          position: absolute; bottom: 0; left: 0; right: 0; height: 45%;
          background: linear-gradient(to top, rgba(15,12,41,0.65), transparent);
        }
        .ab-photo-avatar { font-size: 96px; filter: drop-shadow(0 6px 20px rgba(0,0,0,0.3)); }
        .ab-photo-label {
          position: absolute; bottom: 14px; left: 0; right: 0; z-index: 1;
          text-align: center; font-size: 10px; font-weight: 600;
          color: rgba(255,255,255,0.6); letter-spacing: 1.2px; text-transform: uppercase;
          font-family: 'Space Grotesk', sans-serif;
        }

        .ab-instructor-info { padding: 22px 22px 24px; }
        .ab-instructor-name {
          font-family: 'Fraunces', serif;
          font-size: 20px; font-weight: 700; color: #0f0c29; margin-bottom: 3px;
          letter-spacing: -0.3px;
        }
        .ab-instructor-role {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 11px; color: #6d28d9; font-weight: 600;
          text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 13px;
        }
        .ab-instructor-bio {
          font-size: 13px; color: #6b7280; line-height: 1.72; margin-bottom: 16px;
        }
        .ab-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .ab-tag {
          background: #f3f0ff; color: #5b21b6;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 10px; font-weight: 700;
          padding: 4px 10px; border-radius: 20px;
          letter-spacing: 0.3px;
        }

        /* ── RIGHT COL ── */
        .ab-content-col { display: flex; flex-direction: column; gap: 30px; }

        .ab-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 10px; font-weight: 700; color: #4f46e5;
          text-transform: uppercase; letter-spacing: 2px;
          margin-bottom: 10px;
        }
        .ab-eyebrow::before {
          content: '';
          width: 22px; height: 2px;
          background: linear-gradient(90deg, #4f46e5, #7c3aed);
          border-radius: 2px;
        }

        .ab-main-heading {
          font-family: 'Fraunces', serif;
          font-size: clamp(24px, 3vw, 38px);
          font-weight: 700; color: #0f0c29;
          line-height: 1.2; margin-bottom: 10px;
          letter-spacing: -0.5px;
        }
        .ab-main-heading span { color: #4f46e5; font-style: italic; }

        .ab-intro-text {
          font-size: 14px; color: #6b7280; line-height: 1.78;
        }

        /* Point cards */
        .ab-points { display: flex; flex-direction: column; gap: 12px; }
        .ab-point {
          background: #ffffff;
          border-radius: 14px; padding: 16px 18px;
          display: flex; gap: 14px; align-items: flex-start;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
          border: 1px solid #f0eeff;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .ab-point:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(79,70,229,0.11);
          border-color: #c4b5fd;
        }
        .ab-point-icon {
          width: 40px; height: 40px; border-radius: 11px; flex-shrink: 0;
          background: linear-gradient(135deg, #ede9fe, #c4b5fd);
          display: flex; align-items: center; justify-content: center;
          font-size: 19px;
        }
        .ab-point-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 14px; font-weight: 700; color: #0f0c29;
          margin-bottom: 3px; letter-spacing: -0.1px;
        }
        .ab-point-desc { font-size: 12.5px; color: #6b7280; line-height: 1.65; }

        /* Stats */
        .ab-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        .ab-stat-box {
          background: linear-gradient(135deg, #0f0c29 0%, #312e81 100%);
          border-radius: 14px; padding: 18px 14px; text-align: center;
          box-shadow: 0 6px 20px rgba(79,70,229,0.22);
          border: 1px solid rgba(139,92,246,0.2);
          position: relative; overflow: hidden;
        }
        .ab-stat-box::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, #818cf8, #a78bfa);
        }
        .ab-stat-num {
          font-family: 'Fraunces', serif;
          font-size: 28px; font-weight: 900; color: #ffffff;
          display: block; letter-spacing: -0.5px;
        }
        .ab-stat-lbl {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; color: rgba(255,255,255,0.55);
          font-weight: 500; margin-top: 4px; display: block;
        }

        /* CTAs */
        .ab-cta-row { display: flex; gap: 10px; flex-wrap: wrap; }
        .ab-cta-primary {
          background: linear-gradient(135deg, #4f46e5, #6d28d9);
          color: #fff; border: none;
          padding: 12px 26px; border-radius: 10px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13px; font-weight: 700;
          cursor: pointer; letter-spacing: 0.2px;
          box-shadow: 0 5px 18px rgba(79,70,229,0.38);
          transition: all 0.2s ease;
        }
        .ab-cta-primary:hover { opacity: 0.9; transform: translateY(-2px); }
        .ab-cta-secondary {
          background: transparent; color: #4f46e5;
          border: 2px solid #c4b5fd;
          padding: 12px 26px; border-radius: 10px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13px; font-weight: 700;
          cursor: pointer; transition: all 0.2s ease;
        }
        .ab-cta-secondary:hover { background: #f3f0ff; border-color: #4f46e5; }

        /* ── ONLINE STRIP ── */
        .ab-online-strip {
          background: linear-gradient(135deg, #fffbeb, #fef3c7);
          border-top: 1px solid rgba(251,191,36,0.25);
          padding: 40px 8%;
          display: flex; gap: 40px; align-items: center; flex-wrap: wrap;
        }
        .ab-online-left { flex: 1; min-width: 220px; }
        .ab-online-title {
          font-family: 'Fraunces', serif;
          font-size: 22px; font-weight: 700; color: #1e1b4b;
          margin-bottom: 8px; letter-spacing: -0.3px;
        }
        .ab-online-title span { color: #d97706; font-style: italic; }
        .ab-online-desc { font-size: 13px; color: #78350f; line-height: 1.68; }
        .ab-online-right { display: flex; gap: 12px; flex-wrap: wrap; }
        .ab-online-chip {
          background: #ffffff;
          border: 1px solid rgba(217,119,6,0.2);
          border-radius: 10px; padding: 9px 14px;
          display: flex; align-items: center; gap: 7px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 12px; font-weight: 600; color: #92400e;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        /* ── ANIMATIONS ── */
        @keyframes abPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(1.4); }
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .ab-body { grid-template-columns: 1fr; gap: 36px; padding: 40px 6% 60px; }
          .ab-instructor-col { position: static; }
          .ab-stats { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 560px) {
          .ab-hero { padding: 52px 6% 56px; }
          .ab-stats { grid-template-columns: 1fr 1fr; }
          .ab-online-strip { flex-direction: column; gap: 24px; }
        }
      `}</style>

      <div className="ab-root">

        {/* ── HERO ── */}
        <div className="ab-hero">
          <div className="ab-blob ab-blob-1" />
          <div className="ab-blob ab-blob-2" />
          <div className="ab-hero-inner">
            <div className="ab-hero-badge">
              <span className="ab-hero-dot" />
              The English Centre
            </div>
            <h1 className="ab-hero-title">
              About{" "}
              <span className="yellow underline-yellow">SpeakEdge</span>
              <br />Academy
            </h1>
            <p className="ab-hero-sub">
              Transforming the way India learns English — one student at a time,
              with heart, expertise, and unwavering dedication.
            </p>
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="ab-body">

          {/* LEFT */}
          <div className="ab-instructor-col">
            <div className="ab-logo-card">
              <div className="ab-logo-icon">📖</div>
              <div>
                <div className="ab-logo-name">Speak<span>Edge</span></div>
                <div className="ab-logo-sub">India&apos;s Trusted English Platform</div>
              </div>
            </div>

            <div className="ab-instructor-card">
              <div className="ab-photo-wrap">
                <span className="ab-photo-avatar">👩‍🏫</span>
                <span className="ab-photo-label">Replace with instructor photo</span>
              </div>
              <div className="ab-instructor-info">
                <div className="ab-instructor-name">Mrs. Anjali Chatterjee</div>
                <div className="ab-instructor-role">Lead Instructor &amp; Founder</div>
                <p className="ab-instructor-bio">
                  With over a decade of experience in English language training,
                  Mrs. Chatterjee has helped thousands of students master spoken English,
                  ace IELTS, and unlock career opportunities through confident communication.
                </p>
                <div className="ab-tags">
                  <span className="ab-tag">10+ Years Exp.</span>
                  <span className="ab-tag">IELTS Expert</span>
                  <span className="ab-tag">Career Counsellor</span>
                  <span className="ab-tag">Spoken English</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="ab-content-col">
            <div>
              <div className="ab-eyebrow">Who We Are</div>
              <h2 className="ab-main-heading">
                A Language Institute Built on{" "}
                <span>Passion &amp; Purpose</span>
              </h2>
              <p className="ab-intro-text">
                SpeakEdge is a premier English language coaching centre dedicated to helping individuals
                communicate with clarity, confidence, and professionalism. We offer programmes covering
                IELTS preparation, vocabulary building, spoken English, and personality development —
                all designed to unlock your true potential.
              </p>
            </div>

            <div className="ab-points">
              {[
                { icon: "🎓", title: "Comprehensive English Training", desc: "From IELTS and vocabulary to spoken English and personality development — we train individuals across every dimension of the language." },
                { icon: "👩‍🏫", title: "Expert-Led with Personal Attention", desc: "Mrs. Anjali Chatterjee brings over a decade of expertise and also offers personalised career counselling to those who need direction." },
                { icon: "💻", title: "100% Online — Learn from Home", desc: "All our courses are conducted entirely online. No commute, no hassle — just quality learning from the comfort of your own space." },
                { icon: "🚀", title: "Career-Focused Outcomes", desc: "We don't just teach English — we prepare you for interviews, presentations, corporate environments, and global opportunities." },
              ].map((p, i) => (
                <div key={i} className="ab-point">
                  <div className="ab-point-icon">{p.icon}</div>
                  <div>
                    <div className="ab-point-title">{p.title}</div>
                    <p className="ab-point-desc">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="ab-stats">
              {[
                { num: "10+", lbl: "Years of Experience" },
                { num: "5000+", lbl: "Students Trained" },
                { num: "97%", lbl: "Success Rate" },
              ].map((s, i) => (
                <div key={i} className="ab-stat-box">
                  <span className="ab-stat-num">{s.num}</span>
                  <span className="ab-stat-lbl">{s.lbl}</span>
                </div>
              ))}
            </div>

            <div className="ab-cta-row">
              <button className="ab-cta-primary">Start Learning Today →</button>
              <button className="ab-cta-secondary">View Our Courses</button>
            </div>
          </div>
        </div>

        {/* ── ONLINE STRIP ── */}
        <div className="ab-online-strip">
          <div className="ab-online-left">
            <div className="ab-online-title">Learn from <span>Anywhere</span> 🌐</div>
            <p className="ab-online-desc">
              All lessons are conducted online — take classes from your home, office, or anywhere
              you feel comfortable. Flexible timings, live sessions, and recorded backups included.
            </p>
          </div>
          <div className="ab-online-right">
            {["📱 Mobile Friendly", "🎥 Live Sessions", "⏺️ Recorded Backups", "📅 Flexible Timing"].map((c, i) => (
              <div key={i} className="ab-online-chip">{c}</div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}