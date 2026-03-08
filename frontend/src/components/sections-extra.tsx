// FeaturesSection
const features = [
  {
    icon: "🎙️",
    title: "Live Speaking Sessions",
    desc: "Practice real-time spoken English with certified trainers. Build fluency, pronunciation, and confidence through interactive live classes.",
    bg: "rgba(16,185,129,0.18)",
  },
  {
    icon: "💼",
    title: "Interview Mastery",
    desc: "HR rounds, technical interviews, group discussions — get trained for every stage with mock sessions and expert feedback.",
    bg: "rgba(59,130,246,0.18)",
  },
  {
    icon: "✍️",
    title: "Business Writing Skills",
    desc: "Craft professional emails, reports, and presentations. Master workplace communication that makes you stand out.",
    bg: "rgba(245,158,11,0.18)",
  },
  {
    icon: "🧠",
    title: "Grammar & Vocabulary",
    desc: "Structured lessons covering grammar rules, idioms, and vocabulary — designed for adults with zero jargon.",
    bg: "rgba(244,63,94,0.18)",
  },
  {
    icon: "📱",
    title: "Learn at Your Pace",
    desc: "Access recorded sessions, practice drills, and worksheets anytime — on mobile, tablet, or desktop, even offline.",
    bg: "rgba(139,92,246,0.18)",
  },
  {
    icon: "💰",
    title: "Flexible & Affordable",
    desc: "Premium English coaching starting at just ₹199/month — designed for working professionals and students alike.",
    bg: "rgba(249,115,22,0.18)",
  },
];

export function FeaturesSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        .fs-sec {
          background: linear-gradient(145deg, #0f172a 0%, #1e293b 60%, #0f2027 100%);
          padding: 88px 8%;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }
        .fs-sec::before {
          content: '';
          position: absolute;
          top: -120px;
          right: -80px;
          width: 420px;
          height: 420px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .fs-tag {
          display: inline-block;
          background: rgba(16,185,129,0.15);
          color: #34d399;
          font-size: 11px;
          font-weight: 600;
          padding: 5px 16px;
          border-radius: 30px;
          margin-bottom: 14px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          border: 1px solid rgba(52,211,153,0.3);
        }
        .fs-h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(26px, 3.5vw, 44px);
          font-weight: 800;
          color: #f1f5f9;
          line-height: 1.2;
          margin-bottom: 14px;
        }
        .fs-h2 span { color: #34d399; }
        .fs-p {
          color: rgba(255,255,255,0.5);
          font-size: 15px;
          max-width: 520px;
          margin-bottom: 52px;
          line-height: 1.75;
        }
        .fs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 20px;
        }
        .fc {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 18px;
          padding: 30px 24px;
          transition: all 0.35s ease;
          cursor: default;
        }
        .fc:hover {
          background: rgba(16,185,129,0.12);
          border-color: rgba(52,211,153,0.35);
          transform: translateY(-5px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.3);
        }
        .fc-icon {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          margin-bottom: 18px;
        }
        .fc-title {
          color: #f1f5f9;
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 10px;
        }
        .fc-desc {
          color: rgba(255,255,255,0.52);
          font-size: 13.5px;
          line-height: 1.7;
        }
      `}</style>
      <section className="fs-sec">
        <span className="fs-tag">Why SpeakPro English?</span>
        <h2 className="fs-h2">
          Everything You Need to<br />
          <span>Speak, Write & Succeed</span>
        </h2>
        <p className="fs-p">
          Whether you're a student, a fresher, or a working professional — our platform gives you
          a complete English communication toolkit to grow with confidence.
        </p>
        <div className="fs-grid">
          {features.map((f) => (
            <div key={f.title} className="fc">
              <div className="fc-icon" style={{ background: f.bg }}>
                {f.icon}
              </div>
              <div className="fc-title">{f.title}</div>
              <div className="fc-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

// TeachersSection
const teachers = [
  {
    name: "Meera Kapoor",
    sub: "Spoken English | 12 yrs exp",
    emoji: "🎙️",
    g: "linear-gradient(135deg,#d1fae5,#10b981)",
    s: "80K+",
  },
  {
    name: "Rahul Verma",
    sub: "Interview Coach | Ex-HR Lead",
    emoji: "💼",
    g: "linear-gradient(135deg,#bfdbfe,#3b82f6)",
    s: "60K+",
  },
  {
    name: "Anjali Singh",
    sub: "Business English | MBA",
    emoji: "✍️",
    g: "linear-gradient(135deg,#fde68a,#f59e0b)",
    s: "45K+",
  },
  {
    name: "David Mathew",
    sub: "IELTS & TOEFL Expert",
    emoji: "🌍",
    g: "linear-gradient(135deg,#fecdd3,#f43f5e)",
    s: "55K+",
  },
  {
    name: "Pooja Nair",
    sub: "Grammar & Writing Coach",
    emoji: "📚",
    g: "linear-gradient(135deg,#ddd6fe,#7c3aed)",
    s: "40K+",
  },
];

export function TeachersSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        .ts-sec {
          background: #f8fffe;
          padding: 88px 8%;
          font-family: 'DM Sans', sans-serif;
        }
        .ts-tag {
          display: inline-block;
          background: #ecfdf5;
          color: #059669;
          font-size: 11px;
          font-weight: 600;
          padding: 5px 16px;
          border-radius: 30px;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          border: 1px solid rgba(5,150,105,0.2);
        }
        .ts-h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(26px, 3.5vw, 42px);
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 10px;
        }
        .ts-h2 span { color: #059669; }
        .ts-p {
          color: #94a3b8;
          font-size: 15px;
          max-width: 500px;
          margin-bottom: 40px;
          line-height: 1.75;
        }
        .ts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
          gap: 20px;
        }
        .tc {
          text-align: center;
          padding: 32px 18px;
          border-radius: 20px;
          background: #fff;
          box-shadow: 0 4px 24px rgba(0,0,0,0.07);
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .tc:hover {
          transform: translateY(-7px);
          box-shadow: 0 16px 48px rgba(5,150,105,0.15);
          border-color: #6ee7b7;
        }
        .tc-pic {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          margin: 0 auto 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 38px;
          border: 3px solid #10b981;
          box-shadow: 0 0 0 5px #ecfdf5;
        }
        .tc-name {
          font-size: 15px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 4px;
        }
        .tc-sub {
          font-size: 12px;
          color: #94a3b8;
          margin-bottom: 12px;
          line-height: 1.5;
        }
        .tc-tag {
          display: inline-block;
          background: #ecfdf5;
          color: #059669;
          font-size: 11px;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: 30px;
          border: 1px solid rgba(5,150,105,0.2);
        }
      `}</style>
      <section className="ts-sec">
        <span className="ts-tag">Expert Trainers</span>
        <h2 className="ts-h2">
          Learn From <span>Real Experts</span>
        </h2>
        <p className="ts-p">
          Our trainers are seasoned professionals — HR managers, corporate trainers, IELTS experts,
          and communication coaches — who bring real-world experience to every class.
        </p>
        <div className="ts-grid">
          {teachers.map((t) => (
            <div key={t.name} className="tc">
              <div className="tc-pic" style={{ background: t.g }}>
                {t.emoji}
              </div>
              <div className="tc-name">{t.name}</div>
              <div className="tc-sub">{t.sub}</div>
              <span className="tc-tag">{t.s} Learners</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

// TestimonialsSection
const testimonials = [
  {
    i: "R",
    name: "Ravi Shankar",
    course: "Placed at TCS | Fresher",
    text: "After 3 failed HR rounds, I joined SpeakPro's Interview Mastery course. Within 6 weeks, I cracked my TCS interview. The mock sessions are incredibly realistic!",
    g: "linear-gradient(135deg,#059669,#34d399)",
  },
  {
    i: "N",
    name: "Neha Gupta",
    course: "Team Lead | IT Company",
    text: "My team used to joke about my 'Hinglish' in meetings. Now I lead client calls with confidence. The Business English batch literally changed my career trajectory.",
    g: "linear-gradient(135deg,#2563eb,#60a5fa)",
  },
  {
    i: "A",
    name: "Aakash Mehta",
    course: "IELTS 7.5 Band | Canada PR",
    text: "David Sir's IELTS strategies are unmatched. From 5.5 to 7.5 bands in just 2 months. The speaking and writing modules especially made all the difference.",
    g: "linear-gradient(135deg,#d97706,#fbbf24)",
  },
  {
    i: "S",
    name: "Sana Mirza",
    course: "HR Executive | MNC",
    text: "As someone from a vernacular medium background, English always felt like a barrier. SpeakPro made it approachable, fun, and practical. Zero judgment, full support!",
    g: "linear-gradient(135deg,#dc2626,#f87171)",
  },
];

export function TestimonialsSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        .tst-sec {
          background: #f1f5f9;
          padding: 88px 8%;
          font-family: 'DM Sans', sans-serif;
        }
        .tst-tag {
          display: inline-block;
          background: #ecfdf5;
          color: #059669;
          font-size: 11px;
          font-weight: 600;
          padding: 5px 16px;
          border-radius: 30px;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          border: 1px solid rgba(5,150,105,0.2);
        }
        .tst-h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(26px, 3.5vw, 42px);
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 40px;
        }
        .tst-h2 span { color: #059669; }
        .tst-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
          gap: 22px;
        }
        .tcard {
          background: #fff;
          border-radius: 18px;
          padding: 26px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          border-left: 4px solid #10b981;
          transition: all 0.3s ease;
          position: relative;
        }
        .tcard::before {
          content: '"';
          font-family: 'Playfair Display', serif;
          font-size: 72px;
          color: #d1fae5;
          position: absolute;
          top: 10px;
          right: 20px;
          line-height: 1;
          pointer-events: none;
        }
        .tcard:hover {
          transform: translateY(-5px);
          box-shadow: 0 14px 40px rgba(16,185,129,0.15);
        }
        .tcard-hdr {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 14px;
        }
        .tcard-av {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 18px;
          font-weight: 700;
          flex-shrink: 0;
        }
        .tcard-name {
          font-weight: 700;
          font-size: 14px;
          color: #0f172a;
        }
        .tcard-course {
          font-size: 12px;
          color: #059669;
          font-weight: 500;
          margin-top: 2px;
        }
        .tcard-stars {
          color: #f59e0b;
          font-size: 13px;
          letter-spacing: 2px;
          margin-bottom: 10px;
        }
        .tcard-text {
          font-size: 13.5px;
          color: #64748b;
          line-height: 1.75;
        }
      `}</style>
      <section className="tst-sec">
        <span className="tst-tag">Success Stories</span>
        <h2 className="tst-h2">
          Real People, <span>Real Results</span>
        </h2>
        <div className="tst-grid">
          {testimonials.map((t) => (
            <div key={t.name} className="tcard">
              <div className="tcard-hdr">
                <div className="tcard-av" style={{ background: t.g }}>
                  {t.i}
                </div>
                <div>
                  <div className="tcard-name">{t.name}</div>
                  <div className="tcard-course">{t.course}</div>
                </div>
              </div>
              <div className="tcard-stars">★★★★★</div>
              <p className="tcard-text">{t.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}