"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [router]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg:       #080810;
          --surface:  rgba(255,255,255,0.03);
          --border:   rgba(255,255,255,0.07);
          --border-hi: rgba(255,255,255,0.13);
          --text:     #e8e6f0;
          --muted:    rgba(232,230,240,0.38);
          --accent:   #6ee7f7;
          --accent2:  #b794f4;
          --glow:     rgba(110,231,247,0.15);
        }

        .p-root {
          min-height: 100vh;
          background: var(--bg);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif;
          position: relative; overflow: hidden; padding: 24px;
        }

        /* ── noise grain overlay ── */
        .p-root::after {
          content: '';
          position: fixed; inset: 0; z-index: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.028; pointer-events: none;
        }

        /* ── radial glow spots ── */
        .p-glow-a {
          position: absolute;
          width: 600px; height: 600px; border-radius: 50%;
          background: radial-gradient(circle, rgba(110,231,247,0.07) 0%, transparent 70%);
          top: -150px; right: -150px; pointer-events: none;
        }
        .p-glow-b {
          position: absolute;
          width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(183,148,244,0.07) 0%, transparent 70%);
          bottom: -150px; left: -100px; pointer-events: none;
        }

        /* ── horizontal scan lines ── */
        .p-scanlines {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(255,255,255,0.008) 3px,
            rgba(255,255,255,0.008) 4px
          );
        }

        /* ── card ── */
        .p-card {
          position: relative; z-index: 2;
          width: 100%; max-width: 540px;
          background: rgba(255,255,255,0.025);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 52px 48px 44px;
          backdrop-filter: blur(20px);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.04) inset,
            0 32px 80px rgba(0,0,0,0.6),
            0 0 60px var(--glow);
          animation: cardIn 0.7s cubic-bezier(0.16,1,0.3,1) both;
          text-align: center;
        }

        /* ── top mono tag ── */
        .p-tag {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; font-weight: 400; letter-spacing: 2px;
          color: var(--accent);
          background: rgba(110,231,247,0.07);
          border: 1px solid rgba(110,231,247,0.18);
          padding: 5px 14px; border-radius: 99px;
          margin-bottom: 32px;
          text-transform: uppercase;
        }
        .p-tag-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 6px var(--accent);
          animation: blink 1.6s ease-in-out infinite;
        }

        /* ── 404 ── */
        .p-num {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(96px, 18vw, 148px);
          font-style: italic;
          line-height: 0.9;
          letter-spacing: -4px;
          background: linear-gradient(160deg, #fff 20%, rgba(110,231,247,0.7) 60%, rgba(183,148,244,0.6) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: block;
          margin-bottom: 28px;
          user-select: none;
          animation: numIn 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s both;
          filter: drop-shadow(0 0 48px rgba(110,231,247,0.2));
        }

        /* ── divider ── */
        .p-divider {
          width: 48px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--accent), transparent);
          margin: 0 auto 24px;
          opacity: 0.6;
        }

        /* ── heading ── */
        .p-title {
          font-size: 22px; font-weight: 700;
          color: var(--text); letter-spacing: -0.4px;
          line-height: 1.3; margin-bottom: 12px;
          animation: fadeUp 0.6s ease 0.25s both;
        }

        /* ── sub ── */
        .p-sub {
          font-size: 13.5px; color: var(--muted);
          line-height: 1.8; max-width: 360px;
          margin: 0 auto 36px;
          animation: fadeUp 0.6s ease 0.35s both;
        }

        /* ── countdown ── */
        .p-bar-wrap {
          margin-bottom: 32px;
          animation: fadeUp 0.6s ease 0.4s both;
        }
        .p-bar-track {
          height: 2px;
          background: rgba(255,255,255,0.06);
          border-radius: 99px; overflow: hidden;
          margin-bottom: 10px;
          position: relative;
        }
        .p-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--accent2), var(--accent));
          border-radius: 99px;
          transition: width 1s linear;
          box-shadow: 0 0 8px var(--accent);
        }
        .p-bar-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; color: var(--muted);
          letter-spacing: 0.5px;
        }
        .p-bar-label em { color: var(--accent); font-style: normal; font-weight: 500; }

        /* ── buttons ── */
        .p-btns {
          display: flex; gap: 10px; justify-content: center;
          flex-wrap: wrap;
          animation: fadeUp 0.6s ease 0.45s both;
        }
        .p-btn-ghost {
          padding: 11px 22px; border-radius: 10px;
          background: transparent;
          border: 1px solid var(--border-hi);
          color: rgba(232,230,240,0.55);
          font-family: 'Syne', sans-serif;
          font-size: 12px; font-weight: 600;
          letter-spacing: 0.3px;
          cursor: pointer; transition: all 0.18s ease;
        }
        .p-btn-ghost:hover {
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.22);
          color: var(--text);
          transform: translateY(-2px);
        }
        .p-btn-primary {
          padding: 11px 26px; border-radius: 10px;
          background: linear-gradient(135deg, rgba(110,231,247,0.15), rgba(183,148,244,0.15));
          border: 1px solid rgba(110,231,247,0.25);
          color: var(--accent);
          font-family: 'Syne', sans-serif;
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.3px;
          cursor: pointer; transition: all 0.18s ease;
          box-shadow: 0 0 20px rgba(110,231,247,0.08);
        }
        .p-btn-primary:hover {
          background: linear-gradient(135deg, rgba(110,231,247,0.22), rgba(183,148,244,0.22));
          border-color: rgba(110,231,247,0.45);
          box-shadow: 0 0 28px rgba(110,231,247,0.18);
          transform: translateY(-2px);
        }

        /* ── bottom meta ── */
        .p-meta {
          margin-top: 32px; padding-top: 24px;
          border-top: 1px solid var(--border);
          display: flex; justify-content: center; gap: 6px;
          flex-wrap: wrap;
          animation: fadeUp 0.6s ease 0.5s both;
        }
        .p-chip {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; color: rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          padding: 4px 12px; border-radius: 99px;
          cursor: pointer; transition: all 0.15s;
          text-decoration: none; display: inline-block;
        }
        .p-chip:hover {
          color: var(--accent);
          border-color: rgba(110,231,247,0.2);
          background: rgba(110,231,247,0.05);
        }

        /* ── animations ── */
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes numIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
      `}</style>

      <div className="p-root">
        <div className="p-glow-a" />
        <div className="p-glow-b" />
        <div className="p-scanlines" />

        <div className="p-card">

          <div className="p-tag">
            <span className="p-tag-dot" />
            error · 404
          </div>

          <span className="p-num">404</span>

          <div className="p-divider" />

          <h1 className="p-title">Page not found</h1>
          <p className="p-sub">
            This page doesn't exist.
          </p>

          <div className="p-bar-wrap">
            <div className="p-bar-track">
              <div className="p-bar-fill" style={{ width: `${(countdown / 5) * 100}%` }} />
            </div>
            <p className="p-bar-label">
              Redirecting home in <em>{countdown}s</em>
            </p>
          </div>

          <div className="p-btns">
            <button className="p-btn-ghost" onClick={() => router.back()}>← Go back</button>
            <button className="p-btn-primary" onClick={() => router.push("/")}>Go home</button>
          </div>

          <div className="p-meta">
            {[
              { label: "/courses",   href: "/courses"   },
              { label: "/about",     href: "/about"     },
              { label: "/gallery",   href: "/gallery"   },
              { label: "/admission", href: "/admission" },
              { label: "/contact",   href: "/contact"   },
            ].map(l => (
              <a key={l.label} className="p-chip" href={l.href}>{l.label}</a>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}