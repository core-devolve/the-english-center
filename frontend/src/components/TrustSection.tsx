const stats = [
  {num:"10M+",lbl:"Students"},{num:"500+",lbl:"Educators"},
  {num:"95%",lbl:"Success Rate"},{num:"₹99",lbl:"Starting Price"},
];

export default function TrustSection() {
  return (
    <>
      <style>{`
        .trust-sec {
          background:linear-gradient(135deg,#fafbff 0%,#f0ebff 100%);
          display:grid; grid-template-columns:1fr 1fr; gap:60px;
          align-items:center; padding:80px 8%; font-family:'Poppins',sans-serif;
        }
        .trust-tag {
          display:inline-block; background:#ede9fe; color:#5b2dc4;
          font-size:11px; font-weight:700; padding:5px 14px; border-radius:20px;
          margin-bottom:12px; text-transform:uppercase; letter-spacing:0.5px;
        }
        .trust-h2 {
          font-size:clamp(24px,3.5vw,42px); font-weight:800; line-height:1.2;
          margin-bottom:12px; color:#1a1a2e;
        }
        .trust-h2 span{color:#5b2dc4;}
        .trust-p{color:#718096;font-size:15px;line-height:1.65;max-width:480px;margin-bottom:32px;}
        .stats-row{display:flex;gap:16px;flex-wrap:wrap;margin-bottom:32px;}
        .stat-card {
          background:#fff; border-radius:12px; padding:16px 20px;
          box-shadow:0 4px 16px rgba(0,0,0,0.08); text-align:center;
          flex:1; min-width:80px; border-top:3px solid #5b2dc4;
        }
        .stat-num{font-size:24px;font-weight:800;color:#5b2dc4;}
        .stat-lbl{font-size:11px;color:#718096;font-weight:500;margin-top:2px;}
        .trust-cta {
          background:#5b2dc4; color:#fff; border:none;
          padding:13px 28px; border-radius:10px; font-size:15px; font-weight:600;
          cursor:pointer; font-family:'Poppins',sans-serif;
          box-shadow:0 4px 16px rgba(91,45,196,0.35); transition:all 0.2s;
        }
        .trust-cta:hover{background:#4a24a8;transform:translateY(-1px);}
        .hero-vis{display:flex;justify-content:center;}
        .hv-wrap{width:320px;height:320px;position:relative;}
        .hv-ring {
          position:absolute; top:50%; left:50%;
          transform:translate(-50%,-50%);
          width:260px; height:260px; border-radius:50%;
          border:2px dashed rgba(91,45,196,0.2);
          animation:deco-rotate 12s linear infinite;
        }
        .hv-teacher {
          position:absolute; bottom:20px; left:24px;
          width:140px; height:140px; border-radius:50%;
          background:linear-gradient(135deg,#1a1a2e,#2563eb);
          border:4px solid #fff; box-shadow:0 8px 32px rgba(0,0,0,0.18);
          display:flex; align-items:center; justify-content:center; font-size:52px;
        }
        .hv-student {
          position:absolute; top:20px; right:10px;
          width:120px; height:120px; border-radius:50%;
          background:linear-gradient(135deg,#ede9fe,#5b2dc4);
          border:4px solid #fff; box-shadow:0 4px 16px rgba(0,0,0,0.12);
          display:flex; align-items:center; justify-content:center; font-size:44px;
        }
        .hv-bq {
          position:absolute; top:36px; left:0;
          background:#fff; border-radius:14px; padding:10px 14px;
          font-size:12px; font-weight:600; box-shadow:0 4px 16px rgba(0,0,0,0.1);
          border:1.5px solid #ede9fe; max-width:180px; line-height:1.4; color:#1a1a2e;
        }
        .hv-ba {
          position:absolute; bottom:70px; right:0;
          background:#5b2dc4; color:#fff; border-radius:14px; padding:10px 14px;
          font-size:12px; font-weight:600; box-shadow:0 4px 16px rgba(91,45,196,0.3);
          max-width:200px; line-height:1.4;
        }
        @media(max-width:768px){
          .trust-sec{grid-template-columns:1fr; padding:50px 5%;}
          .hero-vis{display:none;}
        }
      `}</style>
      <section className="trust-sec">
        <div>
          <span className="trust-tag">Bharat's #1 Platform</span>
          <h2 className="trust-h2">Bharat's <span>Trusted &amp; Affordable</span> Educational Platform</h2>
          <p className="trust-p">Unlock your potential by signing up with Physics Wallah — the most affordable learning solution trusted by millions across India.</p>
          <div className="stats-row">
            {stats.map(s => (
              <div key={s.lbl} className="stat-card">
                <div className="stat-num">{s.num}</div>
                <div className="stat-lbl">{s.lbl}</div>
              </div>
            ))}
          </div>
          <button className="trust-cta">Get Started Free →</button>
        </div>
        <div className="hero-vis">
          <div className="hv-wrap">
            <div className="hv-ring"/>
            <div className="hv-teacher">👨‍🏫</div>
            <div className="hv-student">👩‍🎓</div>
            <div className="hv-bq">Alakh Sir, What is PW?</div>
            <div className="hv-ba">PW is where students learn with love and can grow with guidance</div>
          </div>
        </div>
      </section>
    </>
  );
}
