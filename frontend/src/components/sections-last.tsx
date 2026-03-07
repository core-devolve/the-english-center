export function AppDownloadSection() {
  return (
    <>
      <style>{`
        .app-sec{background:linear-gradient(135deg,#5b2dc4 0%,#7c3aed 50%,#4c1d95 100%);padding:72px 8%;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;font-family:'Poppins',sans-serif;}
        .app-tag{display:inline-block;background:rgba(255,255,255,0.18);color:#fff;font-size:11px;font-weight:700;padding:5px 14px;border-radius:20px;margin-bottom:12px;text-transform:uppercase;letter-spacing:0.5px;}
        .app-h2{font-size:clamp(24px,3.5vw,40px);font-weight:800;color:#fff;line-height:1.2;margin-bottom:12px;}
        .app-h2 span{color:#fde047;}
        .app-p{color:rgba(255,255,255,0.75);font-size:14px;line-height:1.65;max-width:460px;margin-bottom:28px;}
        .app-btns{display:flex;gap:14px;flex-wrap:wrap;}
        .app-btn{background:#fff;color:#1a1a2e;border:none;padding:12px 20px;border-radius:12px;cursor:pointer;font-family:'Poppins',sans-serif;display:flex;align-items:center;gap:10px;box-shadow:0 4px 20px rgba(0,0,0,0.15);transition:all 0.2s;}
        .app-btn:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(0,0,0,0.2);}
        .app-btn .btn-icon{font-size:24px;}
        .app-btn .btn-pre{font-size:10px;opacity:0.6;display:block;}
        .app-btn .btn-name{font-size:14px;font-weight:700;display:block;}
        .app-mockup{display:flex;justify-content:center;}
        .phone-mock{width:180px;height:340px;background:rgba(255,255,255,0.15);border-radius:28px;border:2px solid rgba(255,255,255,0.3);box-shadow:0 20px 60px rgba(0,0,0,0.25);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;backdrop-filter:blur(8px);}
        .phone-mock span:first-child{font-size:48px;}
        .phone-mock p{color:rgba(255,255,255,0.8);font-size:12px;font-weight:600;font-family:'Poppins',sans-serif;}
        @media(max-width:768px){.app-sec{grid-template-columns:1fr;padding:50px 5%;}.app-mockup{display:none;}}
      `}</style>
      <section className="app-sec">
        <div>
          <span className="app-tag">Download Now</span>
          <h2 className="app-h2">Study Smarter with the<br/><span>PW App</span></h2>
          <p className="app-p">Get instant access to 10,000+ video lectures, live classes, and mock tests on the go. Available for iOS and Android.</p>
          <div className="app-btns">
            {[{icon:"🍎",pre:"Download on the",name:"App Store"},{icon:"🤖",pre:"Get it on",name:"Google Play"}].map(a => (
              <button key={a.name} className="app-btn">
                <span className="btn-icon">{a.icon}</span>
                <div><span className="btn-pre">{a.pre}</span><span className="btn-name">{a.name}</span></div>
              </button>
            ))}
          </div>
        </div>
        <div className="app-mockup">
          <div className="phone-mock">
            <span>📱</span>
            <p>PW App</p>
          </div>
        </div>
      </section>
    </>
  );
}

const fLinks = {
  Courses:["JEE Main & Advanced","NEET UG","UPSC CSE","SSC & Banking","Class 9–12","Foundation 6–8"],
  Company:["About Us","Careers","Blog","Press","Investors","Contact Us"],
  Support:["Help Center","Privacy Policy","Terms of Service","Refund Policy","Report an Issue"],
};

export function Footer() {
  return (
    <>
      <style>{`
        .ft{background:#1a1a2e;color:rgba(255,255,255,0.7);padding:56px 8% 28px;font-family:'Poppins',sans-serif;}
        .ft-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:36px;margin-bottom:48px;}
        .ft-logo{width:48px;height:48px;border-radius:50%;background:#fff;color:#1a1a2e;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:16px;margin-bottom:14px;user-select:none;}
        .ft-brand-p{font-size:13px;opacity:.6;line-height:1.7;max-width:260px;}
        .ft-social{display:flex;gap:10px;margin-top:18px;}
        .ft-soc-btn{width:36px;height:36px;border-radius:8px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.15);display:flex;align-items:center;justify-content:center;font-size:14px;cursor:pointer;transition:all 0.2s;}
        .ft-soc-btn:hover{background:#5b2dc4;border-color:transparent;}
        .ft-col h4{color:#fff;font-size:13px;font-weight:700;margin-bottom:14px;}
        .ft-col a{display:block;color:rgba(255,255,255,0.55);text-decoration:none;font-size:12px;margin-bottom:10px;transition:color 0.2s;}
        .ft-col a:hover{color:#fff;}
        .ft-bottom{border-top:1px solid rgba(255,255,255,0.1);padding-top:20px;display:flex;justify-content:space-between;align-items:center;font-size:11px;color:rgba(255,255,255,0.35);flex-wrap:wrap;gap:8px;}
        @media(max-width:768px){.ft-grid{grid-template-columns:1fr 1fr;}.ft-bottom{flex-direction:column;text-align:center;}}
        @media(max-width:480px){.ft-grid{grid-template-columns:1fr;}}
      `}</style>
      <footer className="ft">
        <div className="ft-grid">
          <div>
            <div className="ft-logo">PW</div>
            <p className="ft-brand-p">Physics Wallah is Bharat's most trusted and affordable educational platform. We believe every student deserves quality education.</p>
            <div className="ft-social">
              {["📘","🐦","📸","▶️","💼"].map(s => <div key={s} className="ft-soc-btn">{s}</div>)}
            </div>
          </div>
          {Object.entries(fLinks).map(([title,links]) => (
            <div key={title} className="ft-col">
              <h4>{title}</h4>
              {links.map(l => <a key={l} href="#">{l}</a>)}
            </div>
          ))}
        </div>
        <div className="ft-bottom">
          <span>© 2024 Physics Wallah Pvt. Ltd. All rights reserved.</span>
          <span>Made with ❤️ for Bharat's Students</span>
        </div>
      </footer>
    </>
  );
}

export function FloatingCallBtn() {
  return (
    <>
      <style>{`
        .fcall{position:fixed;bottom:28px;right:28px;width:54px;height:54px;border-radius:50%;background:#5b2dc4;color:#fff;display:flex;align-items:center;justify-content:center;font-size:22px;cursor:pointer;z-index:999;border:none;box-shadow:0 4px 20px rgba(91,45,196,0.5);animation:pulse2 2s ease-in-out infinite;transition:all 0.2s;}
        .fcall:hover{background:#4a24a8;transform:scale(1.1);}
      `}</style>
      <button className="fcall" title="Call Us">📞</button>
    </>
  );
}
