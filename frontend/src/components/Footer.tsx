"use client";
import Image from "next/image";
const footerLinks = {
  Courses: [
    "Spoken English Foundation",
    "Advanced Spoken English",
    "IELTS Band 7+ Course",
    "IELTS Band 8+ Masterclass",
    "PTE Academic Preparation",
    "Business English Essentials",
    "Public Speaking Mastery",
  ],
  Company: [
    "About Us",
    "Our Faculty",
    "Gallery",
    "Events",
    "Careers",
    "Contact Us",
  ],
  Support: [
    "Help Center",
    "Privacy Policy",
    "Terms of Service",
    "Refund Policy",
    "Student Login",
    "Report an Issue",
  ],
};

const socials = [
  { icon: "📘", label: "Facebook" },
  { icon: "📸", label: "Instagram" },
  { icon: "▶️", label: "YouTube" },
  { icon: "🐦", label: "Twitter" },
  { icon: "💼", label: "LinkedIn" },
];


export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700;800&display=swap');

        .tec-ft *, .tec-ft *::before, .tec-ft *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .tec-ft { font-family: 'DM Sans', sans-serif; background: #0a0818; color: rgba(255,255,255,0.65); }

        /* ── ACHIEVEMENT STRIP ── */
        .tec-ft-strip {
          background: linear-gradient(135deg, #1e1b4b, #312e81);
          padding: 36px 8%;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .tec-ft-strip-item { text-align: center; }
        .tec-ft-strip-num {
          font-family: 'Fraunces', serif;
          font-size: 28px; font-weight: 900;
          color: #fff; display: block;
          letter-spacing: -0.5px;
        }
        .tec-ft-strip-lbl {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 11px; font-weight: 600;
          color: rgba(255,255,255,0.45);
          text-transform: uppercase; letter-spacing: 1px;
          display: block; margin-top: 3px;
        }

        /* ── MAIN FOOTER ── */
        .tec-ft-main {
          padding: 60px 8% 0;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 40px;
          position: relative;
        }
        .tec-ft-main::before {
          content: '';
          position: absolute; top: 0; left: 8%; right: 8%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(139,92,246,0.4), rgba(79,70,229,0.4), transparent);
        }

        /* Brand col */
        .tec-ft-brand { padding-top: 4px; text-align: left; }
        .tec-ft-logo {
          display: block;
          margin-bottom: 18px;
        }
        .tec-ft-logo img {
          height: 52px; width: auto;
          object-fit: contain;
          display: block;
        }
        .tec-ft-tagline {
          font-size: 13px; color: rgba(255,255,255,0.45);
          line-height: 1.75; max-width: 280px; margin-bottom: 24px;
        }
        .tec-ft-tagline strong { color: rgba(255,255,255,0.75); font-weight: 600; }

        /* Contact quick links */
        .tec-ft-contact { display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; }
        .tec-ft-contact-item {
          display: flex; align-items: center; gap: 10px;
          font-size: 12.5px; color: rgba(255,255,255,0.55);
          transition: color 0.2s;
        }
        .tec-ft-contact-item:hover { color: rgba(255,255,255,0.9); }
        .tec-ft-contact-icon {
          width: 30px; height: 30px; border-radius: 8px;
          background: rgba(79,70,229,0.18);
          border: 1px solid rgba(79,70,229,0.25);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; flex-shrink: 0;
        }

        /* Socials */
        .tec-ft-socials { display: flex; gap: 9px; flex-wrap: wrap; }
        .tec-ft-soc {
          width: 36px; height: 36px; border-radius: 9px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          font-size: 15px; cursor: pointer;
          transition: all 0.2s ease;
        }
        .tec-ft-soc:hover { background: #4f46e5; border-color: #4f46e5; transform: translateY(-2px); box-shadow: 0 6px 16px rgba(79,70,229,0.4); }

        /* Link columns */
        .tec-ft-col h4 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 12px; font-weight: 800;
          color: #fff; text-transform: uppercase;
          letter-spacing: 1.2px; margin-bottom: 18px;
          padding-bottom: 10px;
          border-bottom: 2px solid rgba(79,70,229,0.3);
          display: inline-block;
        }
        .tec-ft-col a {
          display: flex; align-items: center; gap: 6px;
          color: rgba(255,255,255,0.45);
          text-decoration: none; font-size: 13px;
          margin-bottom: 11px; transition: all 0.2s;
          line-height: 1.3;
        }
        .tec-ft-col a::before {
          content: '›'; color: #4f46e5; font-size: 16px;
          font-weight: 700; line-height: 1; flex-shrink: 0;
          opacity: 0; transform: translateX(-4px); transition: all 0.2s;
        }
        .tec-ft-col a:hover { color: rgba(255,255,255,0.9); padding-left: 4px; }
        .tec-ft-col a:hover::before { opacity: 1; transform: translateX(0); }

        /* ── NEWSLETTER BAND ── */
        .tec-ft-nl {
          margin: 48px 8% 0;
          background: linear-gradient(135deg, rgba(79,70,229,0.12), rgba(124,58,237,0.12));
          border: 1px solid rgba(79,70,229,0.2);
          border-radius: 16px;
          padding: 28px 32px;
          display: flex; align-items: center;
          justify-content: space-between; gap: 24px; flex-wrap: wrap;
        }
        .tec-ft-nl-title {
          font-family: 'Fraunces', serif;
          font-size: 18px; font-weight: 700; color: #fff;
          letter-spacing: -0.2px; margin-bottom: 4px;
        }
        .tec-ft-nl-title span { color: #fbbf24; font-style: italic; }
        .tec-ft-nl-sub { font-size: 12px; color: rgba(255,255,255,0.4); }
        .tec-ft-nl-form { display: flex; gap: 10px; }
        .tec-ft-nl-input {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.15);
          color: #fff; border-radius: 9px;
          padding: 10px 16px; font-size: 13px;
          font-family: 'DM Sans', sans-serif;
          outline: none; width: 220px;
          transition: border-color 0.2s;
        }
        .tec-ft-nl-input::placeholder { color: rgba(255,255,255,0.3); }
        .tec-ft-nl-input:focus { border-color: rgba(139,92,246,0.6); }
        .tec-ft-nl-btn {
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          color: #fff; border: none; border-radius: 9px;
          padding: 10px 20px; font-family: 'Space Grotesk', sans-serif;
          font-size: 12px; font-weight: 800; cursor: pointer;
          transition: all 0.2s; white-space: nowrap;
          box-shadow: 0 4px 14px rgba(79,70,229,0.35);
        }
        .tec-ft-nl-btn:hover { opacity: 0.9; transform: translateY(-1px); }

        /* ── BOTTOM BAR ── */
        .tec-ft-bottom {
          margin: 32px 0 0;
          padding: 20px 8%;
          border-top: 1px solid rgba(255,255,255,0.07);
          display: flex; align-items: center;
          justify-content: space-between; flex-wrap: wrap; gap: 10px;
        }
        .tec-ft-copy {
          font-size: 12px; color: rgba(255,255,255,0.28);
        }
        .tec-ft-copy strong { color: rgba(255,255,255,0.5); font-weight: 600; }
        .tec-ft-bottom-links { display: flex; gap: 20px; }
        .tec-ft-bottom-links a {
          font-size: 11px; color: rgba(255,255,255,0.28);
          text-decoration: none; transition: color 0.2s;
        }
        .tec-ft-bottom-links a:hover { color: rgba(255,255,255,0.7); }
        .tec-ft-made {
          font-size: 11px; color: rgba(255,255,255,0.22);
        }
        .tec-ft-made span { color: #ef4444; }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .tec-ft-main { grid-template-columns: 1fr 1fr 1fr; }
          .tec-ft-brand { grid-column: 1 / -1; display: grid; grid-template-columns: auto 1fr; gap: 32px; align-items: start; }
        }
        @media (max-width: 768px) {
          .tec-ft-strip { grid-template-columns: repeat(2,1fr); }
          .tec-ft-main { grid-template-columns: 1fr 1fr; }
          .tec-ft-brand { grid-column: 1/-1; grid-template-columns: 1fr; text-align: left; }
          .tec-ft-brand > div { text-align: left; }
          .tec-ft-logo { text-align: left; }
          .tec-ft-nl { flex-direction: column; padding: 24px; }
          .tec-ft-nl-input { width: 100%; }
          .tec-ft-nl-form { width: 100%; flex-direction: column; }
          .tec-ft-bottom { flex-direction: column; text-align: center; }
          .tec-ft-bottom-links { flex-wrap: wrap; justify-content: center; }
        }
        @media (max-width: 480px) {
          .tec-ft-main { grid-template-columns: 1fr; }
          .tec-ft-strip { grid-template-columns: repeat(2,1fr); padding: 28px 6%; }
          .tec-ft-brand { text-align: left; }
          .tec-ft-brand > div { text-align: left; }
          .tec-ft-logo { text-align: left; }
        }
      `}</style>

      <footer className="tec-ft">



        {/* ── MAIN GRID ── */}
        <div className="tec-ft-main">

          {/* Brand */}
          <div className="tec-ft-brand">
            <div>
              <div className="tec-ft-logo">
                <Image src="/logo_landscape.png" alt="The English Center Logo" width={180} height={52} style={{ height: '52px', width: 'auto', objectFit: 'contain' }} />
              </div>
              <p className="tec-ft-tagline">
                Bharat's most trusted English coaching institute.
                We believe <strong>every student deserves fluency</strong> — and we make it affordable, accessible and effective.
              </p>
            </div>
            <div>
              <div className="tec-ft-contact">
                {[
                  { icon: "📞", text: "+91 98765 43210" },
                  { icon: "📧", text: "hello@theenglishcenter.in" },
                  { icon: "📍", text: "Online · Pan India" },
                ].map(c => (
                  <div key={c.text} className="tec-ft-contact-item">
                    <div className="tec-ft-contact-icon">{c.icon}</div>
                    {c.text}
                  </div>
                ))}
              </div>
              <div className="tec-ft-socials">
                {socials.map(s => (
                  <div key={s.label} className="tec-ft-soc" title={s.label}>{s.icon}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="tec-ft-col">
              <h4>{title}</h4>
              {links.map(l => <a key={l} href="#">{l}</a>)}
            </div>
          ))}
        </div>


        {/* ── BOTTOM BAR ── */}
        <div className="tec-ft-bottom">
          <div className="tec-ft-copy">
            © 2025 <strong>The English Center</strong>. All rights reserved.
          </div>
          <div className="tec-ft-bottom-links">
            {["Privacy Policy", "Terms of Service", "Refund Policy", "Sitemap"].map(l => (
              <a key={l} href="#">{l}</a>
            ))}
          </div>
          <div className="tec-ft-made">Made with <span>♥</span> for India's English Learners</div>
        </div>

      </footer>
    </>
  );
}

export function FloatingCallBtn() {
  return (
    <>
      <style>{`
        .tec-fcall {
          position: fixed; bottom: 28px; right: 28px;
          width: 54px; height: 54px; border-radius: 50%;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          color: #fff; display: flex; align-items: center;
          justify-content: center; font-size: 22px;
          cursor: pointer; z-index: 999; border: none;
          box-shadow: 0 4px 20px rgba(79,70,229,0.55);
          animation: tecPulse 2.2s ease-in-out infinite;
          transition: all 0.2s;
        }
        .tec-fcall:hover { transform: scale(1.1); box-shadow: 0 8px 28px rgba(79,70,229,0.65); }
        @keyframes tecPulse {
          0%, 100% { box-shadow: 0 4px 20px rgba(79,70,229,0.55); }
          50%       { box-shadow: 0 4px 32px rgba(79,70,229,0.85), 0 0 0 8px rgba(79,70,229,0.12); }
        }
      `}</style>
      <button className="tec-fcall" title="Call Us Now">📞</button>
    </>
  );
}