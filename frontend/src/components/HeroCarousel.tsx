"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import pic from "../../public/pic.jpg";

type SlideVisual =
  | { type: "image"; src: typeof pic }
  | { type: "emoji"; value: string };

const slides = [
  {
    badge: "🔥 Limited Time",
    line1: "Vishwas Diwas",
    line2: "Offers Are Live",
    desc: "Get the Biggest Discounts of the Year — Hurry! Don't miss out",
    cta: "Explore Now",
    visual: { type: "image", src: pic } as SlideVisual,
    bg: "linear-gradient(110deg,#8b0000 0%,#c0392b 40%,#e74c3c 70%,#922b21 100%)",
    showBadge: true,
  },
  {
    badge: "🚀 New Batch",
    line1: "JEE 2025",
    line2: "Arjuna Batch",
    desc: "India's most trusted JEE preparation with top faculties from IITs",
    cta: "Enroll Now",
    visual: { type: "emoji", value: "⚗️" } as SlideVisual,
    bg: "linear-gradient(110deg,#1a1a6e 0%,#2563eb 45%,#3b82f6 70%,#1d4ed8 100%)",
    showBadge: false,
  },
  {
    badge: "📚 NEET 2025",
    line1: "NEET",
    line2: "Lakshya Batch",
    desc: "Comprehensive NEET preparation with proven strategies and expert mentors",
    cta: "Start Learning",
    visual: { type: "emoji", value: "🧬" } as SlideVisual,
    bg: "linear-gradient(110deg,#065f46 0%,#059669 45%,#10b981 70%,#047857 100%)",
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

  useEffect(() => { startAuto(); return () => { if (timer.current) clearInterval(timer.current); }; }, [startAuto]);

  return (
    <>
      <style>{`
        .carousel-wrap { position:relative; overflow:hidden; width:100%; }
        .carousel-track { display:flex; transition:transform 0.6s cubic-bezier(0.77,0,0.18,1); }
        .c-slide {
          min-width:100%; height:380px; display:flex; align-items:center;
          padding:0 8%; position:relative; overflow:hidden;
          font-family:'Poppins',sans-serif;
        }
        .c-deco1 {
          position:absolute; top:-60px; right:-60px; width:300px; height:300px;
          border-radius:50%; background:rgba(255,255,255,0.07); pointer-events:none;
        }
        .c-deco2 {
          position:absolute; bottom:-80px; left:30%; width:200px; height:200px;
          border-radius:50%; background:rgba(255,255,255,0.05); pointer-events:none;
        }
        .c-content { max-width:560px; z-index:2; position:relative; }
        .c-badge {
          display:inline-block; background:rgba(255,255,255,0.2); color:#fff;
          font-size:11px; font-weight:700; padding:5px 14px; border-radius:20px;
          margin-bottom:14px; border:1px solid rgba(255,255,255,0.25);
          letter-spacing:0.5px; text-transform:uppercase;
        }
        .c-h1 {
          font-size:clamp(28px,4vw,54px); font-weight:900; color:#fff;
          line-height:1.1; margin-bottom:12px; text-shadow:0 2px 12px rgba(0,0,0,0.2);
        }
        .c-h1 .hl { color:#fde047; display:block; }
        .c-desc { color:rgba(255,255,255,0.85); font-size:15px; margin-bottom:22px; line-height:1.6; }
        .c-btn {
          background:#fde047; color:#1a1a1a; border:none;
          padding:13px 30px; border-radius:30px; font-size:15px; font-weight:700;
          cursor:pointer; font-family:'Poppins',sans-serif;
          box-shadow:0 4px 16px rgba(0,0,0,0.2); transition:all 0.25s;
        }
        .c-btn:hover { transform:scale(1.05); box-shadow:0 6px 24px rgba(0,0,0,0.25); }
        .c-visual {
          position:absolute; right:6%; bottom:0; width:260px; height:100%;
          display:flex; align-items:flex-end; z-index:1;
        }
        .c-avatar {
          width:260px; height:300px; background:rgba(255,255,255,0.12);
          border-radius:24px 24px 0 0; border:2px solid rgba(255,255,255,0.2);
          display:flex; align-items:center; justify-content:center; font-size:80px;
        }
        .vd-badge {
          position:absolute; top:18px; right:18px; width:68px; height:68px;
          border-radius:50%; background:conic-gradient(#f97316,#ef4444,#f97316);
          display:flex; align-items:center; justify-content:center;
          text-align:center; font-size:9px; font-weight:800; color:#fff;
          line-height:1.2; padding:8px; z-index:10;
          box-shadow:0 0 0 4px rgba(255,255,255,0.25);
          animation:spin-slow 6s linear infinite;
        }
        .c-arr {
          position:absolute; top:50%; transform:translateY(-50%); z-index:20;
          width:44px; height:44px; border-radius:50%;
          background:rgba(255,255,255,0.25); color:#fff;
          border:2px solid rgba(255,255,255,0.4); font-size:20px; cursor:pointer;
          display:flex; align-items:center; justify-content:center;
          transition:all 0.2s; backdrop-filter:blur(6px);
        }
        .c-arr:hover { background:rgba(255,255,255,0.45); transform:translateY(-50%) scale(1.1); }
        .c-prev { left:14px; }
        .c-next { right:14px; }
        .c-dots {
          position:absolute; bottom:14px; left:50%; transform:translateX(-50%);
          display:flex; gap:7px; z-index:20;
        }
        .c-dot {
          height:8px; border-radius:4px; cursor:pointer;
          background:rgba(255,255,255,0.5); transition:all 0.3s;
        }
        .c-dot.active { width:22px; background:#fff; }
        .c-dot:not(.active) { width:8px; }
        @media(max-width:768px){ .c-visual{display:none;} .c-slide{height:300px;padding:0 5%;} }
      `}</style>

      <div className="carousel-wrap"
        onTouchStart={e => { touchX.current = e.changedTouches[0].clientX; }}
        onTouchEnd={e => { const d = touchX.current - e.changedTouches[0].clientX; if (Math.abs(d) > 50) nav(d > 0 ? 1 : -1); }}
      >
        <div className="carousel-track" style={{ transform: `translateX(-${cur * 100}%)` }}>
          {slides.map((s, i) => (
            <div key={i} className="c-slide" style={{ background: s.bg }}>
              <div className="c-deco1" /><div className="c-deco2" />
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
                      alt="Vishwas Diwas"
                      fill
                      style={{ objectFit: "cover", borderRadius: "24px 24px 0 0" }}
                    />
                  ) : (
                    <span style={{ fontSize: 80 }}>{s.visual.value}</span>
                  )}
                </div>
              </div>
              {s.showBadge && <div className="vd-badge">VISHWAS<br />DIWAS</div>}
            </div>
          ))}
        </div>

        <button className="c-arr c-prev" onClick={() => nav(-1)}>‹</button>
        <button className="c-arr c-next" onClick={() => nav(1)}>›</button>
        <div className="c-dots">
          {slides.map((_, i) => (
            <div key={i} className={`c-dot${i === cur ? " active" : ""}`}
              onClick={() => { goTo(i); startAuto(); }} />
          ))}
        </div>
      </div>
    </>
  );
}
