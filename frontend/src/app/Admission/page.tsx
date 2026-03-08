"use client";

import { useState } from "react";

const scheduleOptions = [
  "Morning (7 AM – 10 AM)",
  "Afternoon (12 PM – 3 PM)",
  "Evening (6 PM – 9 PM)",
  "Weekend Batch (Sat & Sun)",
  "Flexible / Self-paced",
];

const levelOptions = ["Complete Beginner", "Basic", "Intermediate", "Upper Intermediate", "Advanced"];

const steps = [
  { icon: "📝", title: "Fill the Form", desc: "Submit your admission form with your details, course preference and schedule." },
  { icon: "📞", title: "Counselling Call", desc: "Our team will call you within 24 hours to understand your goals and guide you." },
  { icon: "💳", title: "Pay & Confirm", desc: "Complete your payment securely online and get instant confirmation." },
  { icon: "🚀", title: "Start Learning", desc: "Receive your login credentials and begin your first class on the scheduled date." },
];



const faqs = [
  { q: "Are classes fully online?", a: "Yes, 100% of our classes are conducted live online via Zoom / Google Meet. You can attend from anywhere in India or abroad." },
  { q: "Will I get a certificate after completion?", a: "Absolutely! Every paid course comes with a SpeakEdge completion certificate that you can share on LinkedIn or use for job applications." },
  { q: "What if I miss a class?", a: "All live sessions are recorded and uploaded within 24 hours. You'll never miss out on any content." },
  { q: "Is there an EMI option available?", a: "Yes! We offer easy 3-month EMI options for all courses above ₹1,500. No interest, no hidden charges." },
  { q: "Can I switch my batch after joining?", a: "Yes, one batch switch is allowed within the first week of joining at no extra cost." },
  { q: "How do I know which course is right for me?", a: "Our counsellors will call you after you submit the form and recommend the best course based on your current level and goals." },
];

const benefits = [
  { icon: "👩‍🏫", title: "Expert Instructor", desc: "Learn directly from Mrs. Anjali Chatterjee — 10+ years of experience." },
  { icon: "📱", title: "100% Online",        desc: "Attend from home, office or anywhere. No commute needed." },
  { icon: "🎓", title: "Certified Course",   desc: "Receive an industry-recognised certificate upon completion." },
  { icon: "⏺️", title: "Recorded Classes",  desc: "All sessions recorded — rewatch anytime, forever." },
  { icon: "💬", title: "WhatsApp Support",   desc: "Get doubt support via our active WhatsApp community group." },
  { icon: "💳", title: "Easy EMI",           desc: "3-month no-interest EMI available for all premium courses." },
];

interface FormData {
  name: string; phone: string; email: string; city: string;
  course: string; level: string; schedule: string; message: string;
}

export default function AdmissionPage() {
  const [form, setForm] = useState<FormData>({ name:"", phone:"", email:"", city:"", course:"", level:"", schedule:"", message:"" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.course) return;
    setSubmitted(true);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700;800&display=swap');

        .ap-root, .ap-root *, .ap-root *::before, .ap-root *::after { box-sizing:border-box; margin:0; padding:0; }
        .ap-root { font-family:'DM Sans',sans-serif; background:#f8f7ff; min-height:100vh; }

        /* ── HERO ── */
        .ap-hero {
          background: linear-gradient(135deg,#0f0c29 0%,#1e1b4b 45%,#302b63 100%);
          padding:88px 8% 76px; text-align:center; position:relative; overflow:hidden;
        }
        .ap-hero::after {
          content:''; position:absolute; inset:0;
          background-image: linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px);
          background-size:40px 40px; pointer-events:none;
        }
        .ap-blob { position:absolute; border-radius:50%; filter:blur(70px); pointer-events:none; }
        .ap-blob-1 { width:320px; height:320px; background:#7c3aed; opacity:0.13; top:-80px; right:-40px; }
        .ap-blob-2 { width:240px; height:240px; background:#4f46e5; opacity:0.13; bottom:-70px; left:-30px; }
        .ap-blob-3 { width:180px; height:180px; background:#fbbf24; opacity:0.06; top:10px; left:40%; }
        .ap-hero-inner { position:relative; z-index:2; }
        .ap-hero-badge {
          display:inline-flex; align-items:center; gap:7px;
          background:rgba(139,92,246,0.15); border:1px solid rgba(139,92,246,0.35);
          color:#c4b5fd; font-family:'Space Grotesk',sans-serif;
          font-size:10px; font-weight:600; padding:5px 16px;
          border-radius:20px; text-transform:uppercase; letter-spacing:2px; margin-bottom:22px;
        }
        .ap-badge-dot { width:6px; height:6px; border-radius:50%; background:#a78bfa; animation:apPulse 2s ease-in-out infinite; }
        .ap-hero-title { font-family:'Fraunces',serif; font-size:clamp(38px,5.5vw,68px); font-weight:900; color:#fff; line-height:1.05; letter-spacing:-1.5px; margin-bottom:18px; }
        .ap-hero-title .gold { font-style:italic; color:#fbbf24; position:relative; display:inline-block; }
        .ap-hero-title .gold::after { content:''; position:absolute; left:0; bottom:-5px; width:100%; height:3px; border-radius:2px; background:linear-gradient(90deg,#fbbf24,#f59e0b); }
        .ap-hero-sub { font-size:15px; color:rgba(255,255,255,0.52); line-height:1.75; max-width:480px; margin:0 auto 40px; }
        .ap-hero-stats { display:flex; justify-content:center; gap:48px; flex-wrap:wrap; }
        .ap-stat-num { font-family:'Fraunces',serif; font-size:26px; font-weight:900; color:#fff; display:block; letter-spacing:-0.5px; }
        .ap-stat-lbl { font-size:11px; color:rgba(255,255,255,0.45); display:block; margin-top:3px; }

        /* ── STEPS ── */
        .ap-steps { padding:56px 8% 0; }
        .ap-section-eyebrow { display:inline-flex; align-items:center; gap:8px; font-family:'Space Grotesk',sans-serif; font-size:10px; font-weight:700; color:#4f46e5; text-transform:uppercase; letter-spacing:2px; margin-bottom:10px; }
        .ap-section-eyebrow::before, .ap-section-eyebrow::after { content:''; width:22px; height:2px; background:linear-gradient(90deg,#4f46e5,#7c3aed); border-radius:2px; }
        .ap-section-title { font-family:'Fraunces',serif; font-size:clamp(22px,3vw,34px); font-weight:700; color:#0f0c29; letter-spacing:-0.5px; margin-bottom:32px; }
        .ap-section-title span { color:#4f46e5; font-style:italic; }
        .ap-steps-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
        .ap-step {
          background:#fff; border-radius:16px; padding:24px 20px;
          text-align:center; border:1px solid rgba(79,70,229,0.08);
          box-shadow:0 3px 14px rgba(0,0,0,0.06);
          position:relative; transition:transform 0.2s, box-shadow 0.2s;
        }
        .ap-step:hover { transform:translateY(-4px); box-shadow:0 10px 30px rgba(79,70,229,0.12); }
        .ap-step-num {
          position:absolute; top:-14px; left:50%; transform:translateX(-50%);
          width:28px; height:28px; border-radius:50%;
          background:linear-gradient(135deg,#4f46e5,#7c3aed);
          color:#fff; font-family:'Space Grotesk',sans-serif;
          font-size:12px; font-weight:800;
          display:flex; align-items:center; justify-content:center;
          box-shadow:0 4px 12px rgba(79,70,229,0.4);
        }
        .ap-step-icon { font-size:32px; margin:8px 0 12px; }
        .ap-step-title { font-family:'Space Grotesk',sans-serif; font-size:14px; font-weight:800; color:#0f0c29; margin-bottom:6px; }
        .ap-step-desc { font-size:12px; color:#6b7280; line-height:1.6; }
        .ap-step-connector {
          position:absolute; right:-20px; top:50%; transform:translateY(-50%);
          width:24px; height:2px;
          background:linear-gradient(90deg,#c4b5fd,#a78bfa);
          border-radius:2px; z-index:1;
        }

        /* ── MAIN BODY ── */
        .ap-body { display:grid; grid-template-columns:1.1fr 0.9fr; gap:40px; padding:48px 8% 80px; align-items:start; }

        /* ── FORM SIDE ── */
        .ap-form-wrap { background:#fff; border-radius:22px; padding:36px; box-shadow:0 8px 36px rgba(79,70,229,0.1); border:1px solid rgba(79,70,229,0.08); }
        .ap-form-title { font-family:'Fraunces',serif; font-size:22px; font-weight:700; color:#0f0c29; letter-spacing:-0.3px; margin-bottom:6px; }
        .ap-form-sub { font-size:13px; color:#6b7280; margin-bottom:28px; }



        .ap-form-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        .ap-form-full { grid-column:1/-1; }
        .ap-field-label { font-family:'Space Grotesk',sans-serif; font-size:11px; font-weight:700; color:#374151; text-transform:uppercase; letter-spacing:0.8px; margin-bottom:6px; display:block; }
        .ap-field-label span { color:#ef4444; }
        .ap-input, .ap-select, .ap-textarea {
          width:100%; background:#f8f7ff;
          border:1.5px solid #e5e7eb;
          color:#0f0c29; border-radius:10px;
          padding:11px 14px; font-size:13px;
          font-family:'DM Sans',sans-serif;
          outline:none; transition:border-color 0.2s, box-shadow 0.2s;
          -webkit-appearance:none; appearance:none;
        }
        .ap-input:focus, .ap-select:focus, .ap-textarea:focus {
          border-color:#4f46e5;
          box-shadow:0 0 0 3px rgba(79,70,229,0.1);
        }
        .ap-input::placeholder, .ap-textarea::placeholder { color:#9ca3af; }
        .ap-textarea { resize:vertical; min-height:80px; }
        .ap-submit-btn {
          width:100%; background:linear-gradient(135deg,#4f46e5,#6d28d9);
          color:#fff; border:none; padding:14px;
          border-radius:11px; font-family:'Space Grotesk',sans-serif;
          font-size:14px; font-weight:800; cursor:pointer;
          box-shadow:0 6px 20px rgba(79,70,229,0.38);
          transition:all 0.25s; letter-spacing:0.3px; margin-top:6px;
        }
        .ap-submit-btn:hover { opacity:0.9; transform:translateY(-2px); box-shadow:0 10px 28px rgba(79,70,229,0.42); }
        .ap-form-note { font-size:11px; color:#9ca3af; text-align:center; margin-top:10px; }

        /* Success state */
        .ap-success { text-align:center; padding:32px 20px; }
        .ap-success-icon { font-size:64px; margin-bottom:16px; }
        .ap-success-title { font-family:'Fraunces',serif; font-size:24px; font-weight:700; color:#0f0c29; margin-bottom:8px; letter-spacing:-0.3px; }
        .ap-success-sub { font-size:14px; color:#6b7280; line-height:1.6; }



        /* ── RIGHT SIDE ── */
        .ap-right-col { display:flex; flex-direction:column; gap:20px; position:sticky; top:24px; }

        /* Benefits */
        .ap-benefits { background:#fff; border-radius:20px; padding:28px; box-shadow:0 4px 20px rgba(79,70,229,0.08); border:1px solid rgba(79,70,229,0.07); }
        .ap-benefits-title { font-family:'Fraunces',serif; font-size:18px; font-weight:700; color:#0f0c29; letter-spacing:-0.2px; margin-bottom:18px; }
        .ap-benefits-title span { color:#4f46e5; font-style:italic; }
        .ap-benefit-item { display:flex; align-items:flex-start; gap:12px; margin-bottom:14px; }
        .ap-benefit-item:last-child { margin-bottom:0; }
        .ap-benefit-icon { width:36px; height:36px; border-radius:10px; background:linear-gradient(135deg,#ede9fe,#c4b5fd); display:flex; align-items:center; justify-content:center; font-size:18px; flex-shrink:0; }
        .ap-benefit-name { font-family:'Space Grotesk',sans-serif; font-size:13px; font-weight:700; color:#0f0c29; margin-bottom:2px; }
        .ap-benefit-desc { font-size:12px; color:#6b7280; line-height:1.5; }

        /* Contact card */
        .ap-contact-card { background:linear-gradient(135deg,#1e1b4b,#312e81); border-radius:18px; padding:24px; }
        .ap-contact-title { font-family:'Fraunces',serif; font-size:17px; font-weight:700; color:#fff; margin-bottom:6px; }
        .ap-contact-sub { font-size:12px; color:rgba(255,255,255,0.55); margin-bottom:18px; line-height:1.5; }
        .ap-contact-item { display:flex; align-items:center; gap:10px; margin-bottom:12px; }
        .ap-contact-item:last-child { margin-bottom:0; }
        .ap-contact-icon { width:34px; height:34px; border-radius:9px; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); display:flex; align-items:center; justify-content:center; font-size:15px; flex-shrink:0; }
        .ap-contact-text { font-family:'DM Sans',sans-serif; font-size:13px; color:#fff; font-weight:500; }
        .ap-contact-text span { display:block; font-size:10px; color:rgba(255,255,255,0.45); font-weight:400; }

        /* ── FAQ ── */
        .ap-faq-section { padding:0 8% 80px; }
        .ap-faq-list { display:flex; flex-direction:column; gap:10px; max-width:800px; margin:0 auto; }
        .ap-faq-item { background:#fff; border-radius:14px; border:1px solid rgba(79,70,229,0.08); box-shadow:0 2px 10px rgba(0,0,0,0.05); overflow:hidden; transition:box-shadow 0.2s; }
        .ap-faq-item:hover { box-shadow:0 6px 22px rgba(79,70,229,0.1); }
        .ap-faq-q { display:flex; align-items:center; justify-content:space-between; padding:16px 20px; cursor:pointer; gap:12px; }
        .ap-faq-q-text { font-family:'Space Grotesk',sans-serif; font-size:14px; font-weight:700; color:#0f0c29; line-height:1.3; }
        .ap-faq-chevron { font-size:12px; color:#4f46e5; flex-shrink:0; transition:transform 0.25s; font-weight:800; }
        .ap-faq-chevron.open { transform:rotate(180deg); }
        .ap-faq-a { padding:0 20px 16px; font-size:13px; color:#6b7280; line-height:1.7; border-top:1px solid #f1f5f9; padding-top:14px; }

        /* ── ANIMATIONS ── */
        @keyframes apPulse { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:0.5;transform:scale(1.4);} }

        /* ── RESPONSIVE ── */
        @media (max-width:1024px) { .ap-body { grid-template-columns:1fr; } .ap-right-col { position:static; } }
        @media (max-width:768px) {
          .ap-steps-grid { grid-template-columns:repeat(2,1fr); }
          .ap-step-connector { display:none; }
          .ap-hero { padding:60px 6% 56px; }
          .ap-hero-stats { gap:28px; }
          .ap-steps, .ap-body, .ap-faq-section { padding-left:5%; padding-right:5%; }
          .ap-form-grid { grid-template-columns:1fr; }
          .ap-form-full { grid-column:1; }
        }
        @media (max-width:480px) {
          .ap-steps-grid { grid-template-columns:1fr; }
        }
      `}</style>

      <div className="ap-root">

        {/* ── HERO ── */}
        <div className="ap-hero">
          <div className="ap-blob ap-blob-1" /><div className="ap-blob ap-blob-2" /><div className="ap-blob ap-blob-3" />
          <div className="ap-hero-inner">
            <div className="ap-hero-badge"><span className="ap-badge-dot" />Admissions Open 2025</div>
            <h1 className="ap-hero-title">Apply for <span className="gold">Admission</span></h1>
            <p className="ap-hero-sub">
              Take the first step towards English fluency and career success.
              Fill the form below and our team will guide you through the rest.
            </p>
            <div className="ap-hero-stats">
              {[["5,000+","Students Enrolled"],["24 hrs","Response Time"],["₹999","Starting At"],["100%","Online"]].map(([n,l])=>(
                <div key={l} style={{textAlign:"center"}}>
                  <span className="ap-stat-num">{n}</span>
                  <span className="ap-stat-lbl">{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── STEPS ── */}
        <div className="ap-steps">
          <div style={{textAlign:"center",marginBottom:32}}>
            <div className="ap-section-eyebrow">How It Works</div>
            <h2 className="ap-section-title">Simple <span>4-Step</span> Admission Process</h2>
          </div>
          <div className="ap-steps-grid">
            {steps.map((s,i)=>(
              <div key={i} className="ap-step">
                <div className="ap-step-num">{i+1}</div>
                {i < steps.length-1 && <div className="ap-step-connector" />}
                <div className="ap-step-icon">{s.icon}</div>
                <div className="ap-step-title">{s.title}</div>
                <div className="ap-step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── MAIN BODY ── */}
        <div className="ap-body">

          {/* LEFT — Form */}
          <div>
            <div className="ap-form-wrap">
              {!submitted ? (
                <>
                  <div className="ap-form-title">Admission Application Form</div>
                  <div className="ap-form-sub">Fill all required fields — our team will contact you within 24 hours.</div>

                  <div className="ap-form-grid">
                    {/* Name */}
                    <div>
                      <label className="ap-field-label">Full Name <span>*</span></label>
                      <input className="ap-input" name="name" placeholder="e.g. Priya Sharma" value={form.name} onChange={handleChange} />
                    </div>
                    {/* Phone */}
                    <div>
                      <label className="ap-field-label">Phone Number <span>*</span></label>
                      <input className="ap-input" name="phone" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} />
                    </div>
                    {/* Email */}
                    <div>
                      <label className="ap-field-label">Email Address</label>
                      <input className="ap-input" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} />
                    </div>
                    {/* City */}
                    <div>
                      <label className="ap-field-label">City / State</label>
                      <input className="ap-input" name="city" placeholder="e.g. Bengaluru, Karnataka" value={form.city} onChange={handleChange} />
                    </div>
                    {/* Course */}
                    
                    {/* Level */}
                    <div>
                      <label className="ap-field-label">Current English Level</label>
                      <select className="ap-select" name="level" value={form.level} onChange={handleChange}>
                        <option value="">— Select level —</option>
                        {levelOptions.map(l=><option key={l} value={l}>{l}</option>)}
                      </select>
                    </div>
                    {/* Schedule */}
                    <div>
                      <label className="ap-field-label">Preferred Schedule</label>
                      <select className="ap-select" name="schedule" value={form.schedule} onChange={handleChange}>
                        <option value="">— Select time —</option>
                        {scheduleOptions.map(s=><option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    {/* Message */}
                    <div className="ap-form-full">
                      <label className="ap-field-label">Your Goal / Message</label>
                      <textarea className="ap-textarea" name="message" placeholder="Tell us your learning goal or any specific requirement..." value={form.message} onChange={handleChange} />
                    </div>
                    {/* Submit */}
                    <div className="ap-form-full">
                      <button className="ap-submit-btn" onClick={handleSubmit}>Submit Application →</button>
                      <p className="ap-form-note">🔒 Your information is 100% secure and never shared.</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="ap-success">
                  <div className="ap-success-icon">🎉</div>
                  <div className="ap-success-title">Application Submitted!</div>
                  <p className="ap-success-sub">
                    Thank you, <strong>{form.name}</strong>! We&apos;ve received your application for <strong>{form.course}</strong>.<br /><br />
                    Our team will call you on <strong>{form.phone}</strong> within 24 hours to complete your admission.
                  </p>
                  <button
                    onClick={()=>{setSubmitted(false); setForm({name:"",phone:"",email:"",city:"",course:"",level:"",schedule:"",message:""});}}
                    style={{marginTop:20,background:"linear-gradient(135deg,#4f46e5,#7c3aed)",color:"#fff",border:"none",padding:"11px 24px",borderRadius:10,fontFamily:"'Space Grotesk',sans-serif",fontSize:13,fontWeight:700,cursor:"pointer"}}
                  >
                    Submit Another →
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — Benefits + Contact */}
          <div className="ap-right-col">
            <div className="ap-benefits">
              <div className="ap-benefits-title">Why Join <span>The English Center?</span></div>
              {benefits.map((b,i)=>(
                <div key={i} className="ap-benefit-item">
                  <div className="ap-benefit-icon">{b.icon}</div>
                  <div>
                    <div className="ap-benefit-name">{b.title}</div>
                    <div className="ap-benefit-desc">{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="ap-contact-card">
              <div className="ap-contact-title">Need Help? Talk to Us 💬</div>
              <div className="ap-contact-sub">Our counsellors are available Mon–Sat, 9 AM – 7 PM to answer your questions.</div>
              {[
                { icon:"📞", label:"Call Us", val:"+91 98765 43210" },
                { icon:"💬", label:"WhatsApp", val:"+91 98765 43210" },
                { icon:"📧", label:"Email", val:"admissions@speakedge.in" },
              ].map((c,i)=>(
                <div key={i} className="ap-contact-item">
                  <div className="ap-contact-icon">{c.icon}</div>
                  <div className="ap-contact-text">
                    <span>{c.label}</span>
                    {c.val}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── FAQ ── */}
        <div className="ap-faq-section">
          <div style={{textAlign:"center",marginBottom:32}}>
            <div className="ap-section-eyebrow">FAQ</div>
            <h2 className="ap-section-title">Frequently Asked <span>Questions</span></h2>
          </div>
          <div className="ap-faq-list">
            {faqs.map((f,i)=>(
              <div key={i} className="ap-faq-item">
                <div className="ap-faq-q" onClick={()=>setOpenFaq(openFaq===i?null:i)}>
                  <span className="ap-faq-q-text">{f.q}</span>
                  <span className={`ap-faq-chevron ${openFaq===i?"open":""}`}>▼</span>
                </div>
                {openFaq===i && <div className="ap-faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}