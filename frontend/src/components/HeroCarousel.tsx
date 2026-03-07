"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import pic from "../../public/pic.jpg";

type SlideVisual =
  | { type: "image"; src: typeof pic }
  | { type: "emoji"; value: string };

const slides = [
  {
    badge: "🎉 Special Offer",
    line1: "Admission Open",
    line2: "2025 Batches",
    desc: "Join The English Center and unlock fluent communication, confidence, and a brighter future.",
    cta: "Apply Now",
    visual: { type: "image", src: pic } as SlideVisual,
    bg: "linear-gradient(110deg,#1a3a5c 0%,#1e5fa8 40%,#2980d9 70%,#1a4a8a 100%)",
    showBadge: true,
  },
  {
    badge: "🗣️ Spoken English",
    line1: "Speak With",
    line2: "Confidence",
    desc: "Our Spoken English program builds fluency, accent clarity, and real-world communication skills from day one.",
    cta: "Explore Course",
    visual: { type: "emoji", value: "🎙️" } as SlideVisual,
    bg: "linear-gradient(110deg,#0f3d2e 0%,#1a7a50 45%,#27ae78 70%,#145c3b 100%)",
    showBadge: false,
  },
  {
    badge: "✍️ IELTS / TOEFL",
    line1: "Ace Your",
    line2: "English Exam",
    desc: "Expert-led IELTS & TOEFL coaching with proven study plans, mock tests, and personalised feedback.",
    cta: "Start Preparing",
    visual: { type: "emoji", value: "📝" } as SlideVisual,
    bg: "linear-gradient(110deg,#3b1f6e 0%,#6d3fcb 45%,#9b6ef3 70%,#4e2a9e 100%)",
    showBadge: false,
  },
  {
    badge: "💼 Business English",
    line1: "English for",
    line2: "Professionals",
    desc: "Master business communication, email writing, presentations, and interview skills to accelerate your career.",
    cta: "Learn More",
    visual: { type: "emoji", value: "💼" } as SlideVisual,
    bg: "linear-gradient(110deg,#7a2e00 0%,#c0560e 45%,#e8742a 70%,#a03d00 100%)",
    showBadge: false,
  },
];

export default function HeroCarousel() {
  const [cur, setCur] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchX = useRef(0);

  const goTo = useCallback((n: number) => {
    setCur(((n % slides.length) + slides.length) % slides.length);
  }, []);

  const startAuto = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => setCur(c => (c + 1) % slides.length), 4500);
  }, []);

  const nav = (dir: number) => { goTo(cur + dir); startAuto(); };

  useEffect(() => {
    startAuto();
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [startAuto]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');

        .carousel-wrap { position:relative; overflow:hidden; width:100%; }
        .carousel-track { display:flex; transition:transform 0.6s cubic-bezier(0.77,0,0.18,1); }

        .c-slide {
          min-width:100%; height:500px; display:flex; align-items:center;
          padding:0 8%; position:relative; overflow:hidden;
          font-family:'Poppins',sans-serif;
        }

        /* decorative blobs */
        .c-deco1 {
          position:absolute; top:-80px; right:-80px; width:340px; height:340px;
          border-radius:50%; background:rgba(255,255,255,0.07); pointer-events:none;
        }
        .c-deco2 {
          position:absolute; bottom:-90px; left:28%; width:220px; height:220px;
          border-radius:50%; background:rgba(255,255,255,0.05); pointer-events:none;
        }
        /* subtle letter pattern */
        .c-deco3 {
          position:absolute; top:0; left:0; right:0; bottom:0;
          background-image: repeating-linear-gradient(
            45deg,
            rgba(255,255,255,0.015) 0px,
            rgba(255,255,255,0.015) 1px,
            transparent 1px,
            transparent 40px
          );
          pointer-events:none;
        }

        .c-content { max-width:560px; z-index:2; position:relative; }

        .c-badge {
          display:inline-flex; align-items:center; gap:6px;
          background:rgba(255,255,255,0.18); color:#fff;
          font-size:11px; font-weight:700; padding:5px 14px; border-radius:20px;
          margin-bottom:16px; border:1px solid rgba(255,255,255,0.28);
          letter-spacing:0.6px; text-transform:uppercase;
          backdrop-filter:blur(8px);
        }

        .c-h1 {
          font-size:clamp(30px,4.5vw,58px); font-weight:900; color:#fff;
          line-height:1.08; margin-bottom:14px; text-shadow:0 2px 16px rgba(0,0,0,0.25);
        }
        .c-h1 .hl {
          color:#fde047; display:block;
          text-shadow:0 0 30px rgba(253,224,71,0.35);
        }

        .c-desc {
          color:rgba(255,255,255,0.88); font-size:15px;
          margin-bottom:26px; line-height:1.7; max-width:440px;
        }

        .c-btn {
          background:#fde047; color:#1a1a1a; border:none;
          padding:13px 32px; border-radius:30px; font-size:15px; font-weight:700;
          cursor:pointer; font-family:'Poppins',sans-serif;
          box-shadow:0 4px 20px rgba(0,0,0,0.22); transition:all 0.25s;
          display:inline-flex; align-items:center; gap:8px;
        }
        .c-btn:hover { transform:scale(1.05) translateY(-1px); box-shadow:0 8px 28px rgba(0,0,0,0.28); }

        .c-visual {
          position:absolute; right:6%; bottom:0; width:260px; height:100%;
          display:flex; align-items:flex-end; z-index:1;
        }
        .c-avatar {
          width:260px; height:320px; background:rgba(255,255,255,0.12);
          border-radius:24px 24px 0 0; border:2px solid rgba(255,255,255,0.2);
          display:flex; align-items:center; justify-content:center;
          font-size:90px; position:relative; overflow:hidden;
        }

        /* "Admission Open" spinning badge */
        .vd-badge {
          position:absolute; top:18px; right:18px; width:70px; height:70px;
          border-radius:50%;
          background:conic-gradient(#f59e0b,#ef4444,#f59e0b);
          display:flex; align-items:center; justify-content:center;
          text-align:center; font-size:8.5px; font-weight:800; color:#fff;
          line-height:1.25; padding:8px; z-index:10;
          box-shadow:0 0 0 4px rgba(255,255,255,0.28);
          animation:spin-slow 7s linear infinite;
        }
        @keyframes spin-slow { to { transform:rotate(360deg); } }

        /* arrows */
        .c-arr {
          position:absolute; top:50%; transform:translateY(-50%); z-index:20;
          width:44px; height:44px; border-radius:50%;
          background:rgba(255,255,255,0.22); color:#fff;
          border:2px solid rgba(255,255,255,0.38); font-size:20px; cursor:pointer;
          display:flex; align-items:center; justify-content:center;
          transition:all 0.2s; backdrop-filter:blur(6px);
        }
        .c-arr:hover { background:rgba(255,255,255,0.42); transform:translateY(-50%) scale(1.1); }
        .c-prev { left:14px; }
        .c-next { right:14px; }

        /* dots */
        .c-dots {
          position:absolute; bottom:16px; left:50%; transform:translateX(-50%);
          display:flex; gap:7px; z-index:20;
        }
        .c-dot {
          height:8px; border-radius:4px; cursor:pointer;
          background:rgba(255,255,255,0.45); transition:all 0.3s;
        }
        .c-dot.active { width:24px; background:#fff; }
        .c-dot:not(.active) { width:8px; }

        @media(max-width:768px) {
          .c-visual { display:none; }
          .c-slide { height:320px; padding:0 6%; }
          .c-desc { font-size:14px; margin-bottom:20px; }
        }
        @media(max-width:480px) {
          .c-slide { height:340px; }
          .c-h1 { margin-bottom:10px; }
        }
      `}</style>

      <div
        className="carousel-wrap"
        onTouchStart={e => { touchX.current = e.changedTouches[0].clientX; }}
        onTouchEnd={e => {
          const d = touchX.current - e.changedTouches[0].clientX;
          if (Math.abs(d) > 50) nav(d > 0 ? 1 : -1);
        }}
      >
        <div className="carousel-track" style={{ transform: `translateX(-${cur * 100}%)` }}>
          {slides.map((s, i) => (
            <div key={i} className="c-slide" style={{ background: s.bg }}>
              <div className="c-deco1" />
              <div className="c-deco2" />
              <div className="c-deco3" />

              <div className="c-content">
                <span className="c-badge">{s.badge}</span>
                <h1 className="c-h1">
                  <span>{s.line1}</span>
                  <span className="hl">{s.line2}</span>
                </h1>
                <p className="c-desc">{s.desc}</p>
                <button className="c-btn">{s.cta} →</button>
              </div>

              <div className="c-visual">
                <div className="c-avatar">
                  {s.visual.type === "image" ? (
                    <Image
                      src={s.visual.src}
                      alt="The English Center"
                      fill
                      style={{ objectFit: "cover", borderRadius: "24px 24px 0 0" }}
                    />
                  ) : (
                    <span style={{ fontSize: 90 }}>{s.visual.value}</span>
                  )}
                </div>
              </div>

              {s.showBadge && (
                <div className="vd-badge">ADMISSION<br />OPEN</div>
              )}
            </div>
          ))}
        </div>

        <button className="c-arr c-prev" onClick={() => nav(-1)}>‹</button>
        <button className="c-arr c-next" onClick={() => nav(1)}>›</button>

        <div className="c-dots">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`c-dot${i === cur ? " active" : ""}`}
              onClick={() => { goTo(i); startAuto(); }}
            />
          ))}
        </div>
      </div>
    </>
  );
}