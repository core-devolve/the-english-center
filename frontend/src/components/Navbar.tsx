"use client";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{`
        .pw-nav {
          position: sticky; top: 0; z-index: 100;
          background: #fff;
          border-bottom: 1px solid #e8e8e8;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          padding: 0 5%;
          display: flex; align-items: center; justify-content: space-between;
          height: 68px; font-family: 'Poppins', sans-serif;
        }
        .pw-logo {
          display: flex; align-items: center; gap: 10px; text-decoration: none;
        }
        .pw-logo-circle {
          width: 44px; height: 44px; border-radius: 50%;
          background: #1a1a2e; color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-weight: 900; font-size: 15px;
        }
        .pw-nav-links {
          display: flex; align-items: center; gap: 4px;
        }
        .pw-nav-link {
          color: #2d3748; text-decoration: none;
          font-size: 14px; font-weight: 500; padding: 6px 12px;
          border-radius: 7px; transition: all 0.2s; white-space: nowrap;
          font-family: 'Poppins', sans-serif;
        }
        .pw-nav-link:hover { background: #f0ebff; color: #5b2dc4; }
        .pw-courses-btn {
          border: 1.5px solid #5b2dc4; color: #5b2dc4;
          background: transparent; padding: 7px 14px; border-radius: 8px;
          font-size: 14px; font-weight: 600; cursor: pointer;
          font-family: 'Poppins', sans-serif; transition: all 0.2s;
        }
        .pw-courses-btn:hover { background: #5b2dc4; color: #fff; }
        .pw-cta-btn {
          background: #5b2dc4; color: #fff; border: none;
          padding: 10px 22px; border-radius: 9px;
          font-size: 14px; font-weight: 600; cursor: pointer;
          font-family: 'Poppins', sans-serif;
          box-shadow: 0 3px 12px rgba(91,45,196,0.3);
          transition: all 0.2s;
        }
        .pw-cta-btn:hover { background: #4a24a8; transform: translateY(-1px); }
        .pw-hamburger {
          background: none; border: none; cursor: pointer; padding: 6px;
          display: none; flex-direction: column; gap: 4px;
        }
        .pw-hamburger span {
          display: block; width: 22px; height: 2px; background: #2d3748; border-radius: 2px;
        }
        .pw-mobile-menu {
          background: #fff; border-top: 1px solid #e8e8e8;
          padding: 16px 5%; display: flex; flex-direction: column; gap: 8px;
        }
        @media (max-width: 900px) {
          .pw-nav-links { display: none !important; }
          .pw-hamburger { display: flex !important; }
        }
        @media (min-width: 901px) {
          .pw-mobile-menu { display: none !important; }
        }
      `}</style>
      <nav className="pw-nav">
        <a href="/" className="pw-logo">
          <div className="pw-logo-circle">The english center</div>
        </a>
        <div className="pw-nav-links">
          <button className="pw-courses-btn">All Courses ▾</button>
          {["Vidyapeeth","Upskilling","PW Store (Books)","Real Test","Class 1st – 8th","Power Batch"].map(l => (
            <a key={l} href="#" className="pw-nav-link">{l}</a>
          ))}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
          <button className="pw-cta-btn">Login / Register</button>
          <button className="pw-hamburger" onClick={() => setOpen(!open)}>
            <span/><span/><span/>
          </button>
        </div>
      </nav>
      {open && (
        <div className="pw-mobile-menu">
          <button className="pw-courses-btn" style={{width:"fit-content"}}>All Courses ▾</button>
          {["Vidyapeeth","Upskilling","PW Store (Books)","Real Test","Class 1st – 8th","Power Batch"].map(l => (
            <a key={l} href="#" className="pw-nav-link">{l}</a>
          ))}
          <button className="pw-cta-btn" style={{marginTop:"6px"}}>Login / Register</button>
        </div>
      )}
    </>
  );
}
