const courses = [
  {name:"JEE Arjuna Batch 2025",tag:"JEE",emoji:"⚛️",r:"4.9",s:"2.4M",d:"1 Year",p:"₹2,999",o:"₹8,999",off:"67%",g:"linear-gradient(135deg,#fde68a,#f59e0b)"},
  {name:"NEET Lakshya 2025",tag:"NEET",emoji:"🧬",r:"4.8",s:"1.8M",d:"1 Year",p:"₹2,499",o:"₹7,499",off:"67%",g:"linear-gradient(135deg,#bfdbfe,#3b82f6)"},
  {name:"UPSC Sankalp 2025",tag:"UPSC",emoji:"🏛️",r:"4.7",s:"500K",d:"2 Years",p:"₹4,999",o:"₹12,999",off:"62%",g:"linear-gradient(135deg,#bbf7d0,#22c55e)"},
  {name:"SBI PO / IBPS 2025",tag:"Banking",emoji:"🏦",r:"4.8",s:"700K",d:"6 Months",p:"₹1,999",o:"₹5,999",off:"67%",g:"linear-gradient(135deg,#fecdd3,#f43f5e)"},
  {name:"Full Stack Web Dev",tag:"Coding",emoji:"💻",r:"4.9",s:"300K",d:"6 Months",p:"₹3,499",o:"₹9,999",off:"65%",g:"linear-gradient(135deg,#ddd6fe,#8b5cf6)"},
  {name:"Class 9–10 Foundation",tag:"Foundation",emoji:"📐",r:"4.8",s:"1.2M",d:"1 Year",p:"₹999",o:"₹2,999",off:"67%",g:"linear-gradient(135deg,#fed7aa,#f97316)"},
];

export default function CoursesSection() {
  return (
    <>
      <style>{`
        .cs-sec{background:#fff;padding:72px 8%;font-family:'Poppins',sans-serif;}
        .cs-header{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:40px;flex-wrap:wrap;gap:16px;}
        .cs-tag{display:inline-block;background:#f5f3ff;color:#5b2dc4;font-size:11px;font-weight:700;padding:5px 14px;border-radius:20px;margin-bottom:10px;text-transform:uppercase;letter-spacing:0.5px;}
        .cs-h2{font-size:clamp(24px,3vw,38px);font-weight:800;color:#1a1a2e;}
        .cs-h2 span{color:#5b2dc4;}
        .cs-viewall{color:#5b2dc4;font-weight:600;font-size:13px;text-decoration:none;border:1.5px solid #5b2dc4;padding:8px 18px;border-radius:8px;transition:all 0.2s;white-space:nowrap;}
        .cs-viewall:hover{background:#5b2dc4;color:#fff;}
        .cs-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:20px;}
        .cc{border-radius:16px;overflow:hidden;background:#fff;box-shadow:0 4px 20px rgba(0,0,0,0.08);border:1px solid #f0f0f0;transition:all 0.3s;cursor:pointer;}
        .cc:hover{transform:translateY(-6px);box-shadow:0 12px 40px rgba(0,0,0,0.14);}
        .cc-thumb{height:140px;display:flex;align-items:center;justify-content:center;font-size:52px;position:relative;}
        .cc-tag{position:absolute;top:10px;left:10px;background:rgba(255,255,255,0.92);color:#5b2dc4;font-size:10px;font-weight:700;padding:3px 10px;border-radius:20px;text-transform:uppercase;}
        .cc-body{padding:16px;}
        .cc-name{font-size:15px;font-weight:700;color:#1a1a2e;margin-bottom:7px;}
        .cc-meta{display:flex;gap:6px;align-items:center;font-size:12px;color:#9ca3af;margin-bottom:12px;flex-wrap:wrap;}
        .cc-price{display:flex;align-items:center;gap:8px;}
        .cc-new{font-size:18px;font-weight:800;color:#5b2dc4;}
        .cc-old{font-size:12px;color:#9ca3af;text-decoration:line-through;}
        .cc-off{background:#ecfdf5;color:#059669;font-size:11px;font-weight:700;padding:2px 8px;border-radius:20px;}
        @media(max-width:600px){.cs-sec{padding:50px 5%;}}
      `}</style>
      <section className="cs-sec">
        <div className="cs-header">
          <div>
            <span className="cs-tag">Popular Programs</span>
            <h2 className="cs-h2">Explore Our <span>Top Courses</span></h2>
          </div>
          <a href="#" className="cs-viewall">View All Courses →</a>
        </div>
        <div className="cs-grid">
          {courses.map(c => (
            <div key={c.name} className="cc">
              <div className="cc-thumb" style={{background:c.g}}>
                {c.emoji}
                <span className="cc-tag">{c.tag}</span>
              </div>
              <div className="cc-body">
                <div className="cc-name">{c.name}</div>
                <div className="cc-meta">
                  <span>⭐ {c.r}</span><span>|</span>
                  <span>👤 {c.s}</span><span>|</span>
                  <span>📅 {c.d}</span>
                </div>
                <div className="cc-price">
                  <span className="cc-new">{c.p}</span>
                  <span className="cc-old">{c.o}</span>
                  <span className="cc-off">{c.off} OFF</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
