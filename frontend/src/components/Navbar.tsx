"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const centerLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/About" },
  { name: "Courses", href: "/Darshan" },
  { name: "Events", href: "/Events" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

        .nav-link {
          position: relative;
          font-family: 'Poppins', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255,255,255,0.82);
          padding: 7px 16px;
          border-radius: 12px;
          text-decoration: none;
          transition: color 0.2s, background 0.2s;
          letter-spacing: 0.01em;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 5px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: rgba(255,255,255,0.75);
          border-radius: 99px;
          transition: width 0.3s ease;
        }
        .nav-link:hover {
          color: #fff;
          background: rgba(255,255,255,0.13);
        }
        .nav-link:hover::after {
          width: 18px;
        }

        .admission-btn {
          font-family: 'Poppins', sans-serif;
          font-size: 13.5px;
          font-weight: 600;
          color: #fff;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.32);
          padding: 8px 22px;
          border-radius: 99px;
          text-decoration: none;
          letter-spacing: 0.03em;
          backdrop-filter: blur(8px);
          transition: background 0.22s, border-color 0.22s, box-shadow 0.22s, transform 0.18s;
          white-space: nowrap;
        }
        .admission-btn:hover {
          background: rgba(255,255,255,0.26);
          border-color: rgba(255,255,255,0.55);
          box-shadow: 0 4px 24px rgba(255,255,255,0.10);
          transform: translateY(-1px);
          color: #fff;
        }

        .hamburger-bar {
          display: block;
          width: 20px;
          height: 2px;
          background: #fff;
          border-radius: 99px;
          transition: all 0.3s ease;
        }
        .bar-open-1 { transform: rotate(45deg) translateY(7px); }
        .bar-open-2 { opacity: 0; transform: scaleX(0); }
        .bar-open-3 { transform: rotate(-45deg) translateY(-7px); }

        .mobile-menu {
          overflow: hidden;
          transition: max-height 0.38s cubic-bezier(0.4,0,0.2,1), opacity 0.3s;
        }
        .mobile-menu.open  { max-height: 480px; opacity: 1; }
        .mobile-menu.close { max-height: 0;   opacity: 0; }

        .logo-circle {
          width: 42px; height: 42px;
          border-radius: 50%;
          background: rgba(255,255,255,0.18);
          border: 1px solid rgba(255,255,255,0.32);
          display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(6px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.12);
          transition: background 0.25s, transform 0.25s;
          flex-shrink: 0;
        }
        .logo-wrap:hover .logo-circle {
          background: rgba(255,255,255,0.28);
          transform: scale(1.07);
        }
        .logo-wrap { display: flex; align-items: center; gap: 10px; text-decoration: none; }
      `}</style>

      <nav
        style={{
          position: "fixed",
          top: "16px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 50,
          width: "92%",
          maxWidth: "1280px",
          borderRadius: "9999px",
          border: "1px solid rgba(255,255,255,0.22)",
          background: "rgba(255,255,255,0.09)",
          backdropFilter: "blur(22px) saturate(160%)",
          WebkitBackdropFilter: "blur(22px) saturate(160%)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.22), 0 1px 0 rgba(255,255,255,0.08) inset",
          transition: "all 0.4s ease",
        }}
      >
        {/* ── Main bar: 3-column grid so center is truly centered ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            height: "68px",
            padding: "0 28px",
          }}
        >
          {/* LEFT — Logo */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link href="/" className="logo-wrap">
              <div className="logo-circle">
                <span style={{
                  color: "#fff",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 900,
                  fontSize: "10px",
                  letterSpacing: "-0.3px",
                  textAlign: "center",
                  lineHeight: 1,
                  padding: "0 3px",
                }}>TEC</span>
              </div>
              <div className="hidden sm:block" style={{ lineHeight: 1 }}>
                <p style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: "14.5px",
                  color: "#fff",
                  margin: 0,
                  letterSpacing: "-0.2px",
                }}>The English Center</p>
                <p style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400,
                  fontSize: "10px",
                  color: "rgba(255,255,255,0.55)",
                  margin: 0,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginTop: "2px",
                }}>Language Institute</p>
              </div>
            </Link>
          </div>

          {/* CENTER — 4 nav links (desktop only) */}
          <div
            className="hidden lg:flex"
            style={{ alignItems: "center", gap: "2px" }}
          >
            {centerLinks.map(({ name, href }) => (
              <Link key={name} href={href} className="nav-link">{name}</Link>
            ))}
          </div>

          {/* RIGHT — Admission btn + hamburger */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "12px" }}>
            {/* Admission — desktop */}
            <Link href="/Contact" className="admission-btn hidden lg:inline-flex">
              Admission
            </Link>

            {/* Hamburger — mobile */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                padding: "8px",
                borderRadius: "10px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.13)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              aria-label="Toggle menu"
            >
              <span className={`hamburger-bar ${open ? "bar-open-1" : ""}`} />
              <span className={`hamburger-bar ${open ? "bar-open-2" : ""}`} />
              <span className={`hamburger-bar ${open ? "bar-open-3" : ""}`} />
            </button>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        <div className={`mobile-menu lg:hidden ${open ? "open" : "close"}`}>
          <div style={{
            padding: "8px 20px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}>
            {[...centerLinks, { name: "Admission", href: "/Contact" }].map(({ name, href }) => (
              <Link
                key={name}
                href={href}
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "14px",
                  fontWeight: name === "Admission" ? 600 : 500,
                  color: "rgba(255,255,255,0.88)",
                  padding: "10px 14px",
                  borderRadius: "12px",
                  textDecoration: "none",
                  transition: "background 0.2s, color 0.2s",
                  display: "block",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.13)"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.88)"; }}
              >
                {name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}