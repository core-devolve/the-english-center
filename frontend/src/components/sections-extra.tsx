// FeaturesSection
const features = [
  {icon:"🎯",title:"Live Interactive Classes",desc:"Learn directly from India's best educators with real-time doubt solving and live interactions.",bg:"rgba(241,196,15,0.2)"},
  {icon:"📖",title:"Complete Study Material",desc:"Curated notes, DPPs, and PYQs designed by IIT & AIIMS toppers for maximum output.",bg:"rgba(37,99,235,0.2)"},
  {icon:"✅",title:"Mock Tests & Analysis",desc:"National-level mock tests with detailed performance analytics to track your progress.",bg:"rgba(16,185,129,0.2)"},
  {icon:"💬",title:"Doubt Resolution",desc:"24/7 doubt clearing via chat and community forums with fast expert responses.",bg:"rgba(244,63,94,0.2)"},
  {icon:"📱",title:"Learn Anywhere",desc:"Access all content on mobile, tablet, or web — even offline with downloaded videos.",bg:"rgba(139,92,246,0.2)"},
  {icon:"💰",title:"Most Affordable",desc:"Premium quality education starting at just ₹99 — because knowledge should reach every student.",bg:"rgba(249,115,22,0.2)"},
];

export function FeaturesSection() {
  return (
    <>
      <style>{`
        .fs-sec{background:linear-gradient(135deg,#1a1a2e 0%,#16213e 100%);padding:72px 8%;font-family:'Poppins',sans-serif;}
        .fs-tag{display:inline-block;background:rgba(255,255,255,0.15);color:#fff;font-size:11px;font-weight:700;padding:5px 14px;border-radius:20px;margin-bottom:12px;text-transform:uppercase;letter-spacing:0.5px;}
        .fs-h2{font-size:clamp(24px,3.5vw,40px);font-weight:800;color:#fff;line-height:1.2;margin-bottom:10px;}
        .fs-h2 span{color:#fde047;}
        .fs-p{color:rgba(255,255,255,0.6);font-size:14px;max-width:500px;margin-bottom:48px;line-height:1.65;}
        .fs-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:20px;}
        .fc{background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);border-radius:16px;padding:28px 24px;transition:all 0.3s;cursor:default;}
        .fc:hover{background:rgba(91,45,196,0.3);border-color:rgba(91,45,196,0.5);transform:translateY(-4px);}
        .fc-icon{width:54px;height:54px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:24px;margin-bottom:16px;}
        .fc-title{color:#fff;font-size:15px;font-weight:700;margin-bottom:8px;}
        .fc-desc{color:rgba(255,255,255,0.6);font-size:13px;line-height:1.65;}
      `}</style>
      <section className="fs-sec">
        <span className="fs-tag">Why Choose PW?</span>
        <h2 className="fs-h2">Everything You Need to<br/><span>Crack Any Exam</span></h2>
        <p className="fs-p">From live classes to test series, PW has a complete ecosystem built to make you succeed.</p>
        <div className="fs-grid">
          {features.map(f => (
            <div key={f.title} className="fc">
              <div className="fc-icon" style={{background:f.bg}}>{f.icon}</div>
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
  {name:"Alakh Pandey",sub:"Physics | IIT Kanpur",emoji:"⚛️",g:"linear-gradient(135deg,#fde68a,#f59e0b)",s:"10M+"},
  {name:"Sachin Sir",sub:"Chemistry | IIT Delhi",emoji:"🧪",g:"linear-gradient(135deg,#bfdbfe,#3b82f6)",s:"5M+"},
  {name:"Neeraj Sir",sub:"Biology | AIIMS Alumni",emoji:"🧬",g:"linear-gradient(135deg,#bbf7d0,#22c55e)",s:"4M+"},
  {name:"Pankaj Sir",sub:"Maths | IIT Bombay",emoji:"📐",g:"linear-gradient(135deg,#fecdd3,#f43f5e)",s:"6M+"},
  {name:"Bhanwar Sir",sub:"History | UPSC Expert",emoji:"🏛️",g:"linear-gradient(135deg,#ddd6fe,#7c3aed)",s:"3M+"},
];

export function TeachersSection() {
  return (
    <>
      <style>{`
        .ts-sec{background:#fff;padding:72px 8%;font-family:'Poppins',sans-serif;}
        .ts-tag{display:inline-block;background:#f5f3ff;color:#5b2dc4;font-size:11px;font-weight:700;padding:5px 14px;border-radius:20px;margin-bottom:10px;text-transform:uppercase;letter-spacing:0.5px;}
        .ts-h2{font-size:clamp(24px,3.5vw,38px);font-weight:800;color:#1a1a2e;margin-bottom:8px;}
        .ts-h2 span{color:#5b2dc4;}
        .ts-p{color:#9ca3af;font-size:14px;max-width:480px;margin-bottom:36px;line-height:1.65;}
        .ts-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:20px;}
        .tc{text-align:center;padding:28px 16px;border-radius:16px;background:#fff;box-shadow:0 4px 20px rgba(0,0,0,0.08);border:1px solid #f0f0f0;transition:all 0.3s;cursor:pointer;}
        .tc:hover{transform:translateY(-6px);box-shadow:0 12px 40px rgba(0,0,0,0.12);border-color:#ddd6fe;}
        .tc-pic{width:88px;height:88px;border-radius:50%;margin:0 auto 14px;display:flex;align-items:center;justify-content:center;font-size:36px;border:3px solid #5b2dc4;box-shadow:0 0 0 4px #f5f3ff;}
        .tc-name{font-size:15px;font-weight:700;color:#1a1a2e;margin-bottom:4px;}
        .tc-sub{font-size:12px;color:#9ca3af;margin-bottom:10px;}
        .tc-tag{display:inline-block;background:#f5f3ff;color:#5b2dc4;font-size:11px;font-weight:600;padding:3px 10px;border-radius:20px;}
      `}</style>
      <section className="ts-sec">
        <span className="ts-tag">Expert Faculty</span>
        <h2 className="ts-h2">Learn From the <span>Best Teachers</span></h2>
        <p className="ts-p">Our educators are IITians, doctors, and subject experts who make even complex topics easy.</p>
        <div className="ts-grid">
          {teachers.map(t => (
            <div key={t.name} className="tc">
              <div className="tc-pic" style={{background:t.g}}>{t.emoji}</div>
              <div className="tc-name">{t.name}</div>
              <div className="tc-sub">{t.sub}</div>
              <span className="tc-tag">{t.s} Students</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

// TestimonialsSection
const testimonials = [
  {i:"R",name:"Rohan Sharma",course:"JEE Advanced AIR 47",text:"PW's Arjuna Batch completely transformed my preparation. Alakh Sir's teaching style makes physics feel intuitive. Couldn't have cracked JEE without PW!",g:"linear-gradient(135deg,#5b2dc4,#8b5cf6)"},
  {i:"P",name:"Priya Verma",course:"NEET Rank 312",text:"The biology videos by Neeraj Sir are phenomenal. At ₹2,499 for a year-long course, PW is truly a blessing for students from small towns like mine.",g:"linear-gradient(135deg,#2563eb,#3b82f6)"},
  {i:"A",name:"Arjun Patel",course:"IIT Bombay – CSE",text:"From a Tier-3 city with no coaching nearby, PW was my only hope. The mock tests and doubt sessions helped me secure my seat at IIT Bombay.",g:"linear-gradient(135deg,#059669,#34d399)"},
  {i:"S",name:"Sneha Mishra",course:"UPSC Prelims Cleared",text:"The UPSC Sankalp batch is incredibly well-structured. Current affairs, static GK, answer writing — everything covered. Best investment of my prep journey!",g:"linear-gradient(135deg,#dc2626,#f87171)"},
];

export function TestimonialsSection() {
  return (
    <>
      <style>{`
        .tst-sec{background:#f8f9fa;padding:72px 8%;font-family:'Poppins',sans-serif;}
        .tst-tag{display:inline-block;background:#f5f3ff;color:#5b2dc4;font-size:11px;font-weight:700;padding:5px 14px;border-radius:20px;margin-bottom:10px;text-transform:uppercase;letter-spacing:0.5px;}
        .tst-h2{font-size:clamp(24px,3.5vw,38px);font-weight:800;color:#1a1a2e;margin-bottom:36px;}
        .tst-h2 span{color:#5b2dc4;}
        .tst-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:20px;}
        .tcard{background:#fff;border-radius:16px;padding:24px;box-shadow:0 4px 20px rgba(0,0,0,0.07);border-left:4px solid #5b2dc4;transition:all 0.3s;}
        .tcard:hover{transform:translateY(-4px);box-shadow:0 12px 36px rgba(0,0,0,0.12);}
        .tcard-hdr{display:flex;align-items:center;gap:12px;margin-bottom:12px;}
        .tcard-av{width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;font-weight:700;flex-shrink:0;}
        .tcard-name{font-weight:700;font-size:14px;color:#1a1a2e;}
        .tcard-course{font-size:11px;color:#9ca3af;}
        .tcard-stars{color:#f59e0b;font-size:12px;letter-spacing:2px;margin-bottom:8px;}
        .tcard-text{font-size:13px;color:#718096;line-height:1.65;}
      `}</style>
      <section className="tst-sec">
        <span className="tst-tag">Student Stories</span>
        <h2 className="tst-h2">What Our <span>Students Say</span></h2>
        <div className="tst-grid">
          {testimonials.map(t => (
            <div key={t.name} className="tcard">
              <div className="tcard-hdr">
                <div className="tcard-av" style={{background:t.g}}>{t.i}</div>
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
