// src/app/enquiry/page.tsx

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

const faqs = [
  { q: "Are classes fully online?", a: "Yes, 100% live online via Zoom / Google Meet. Attend from anywhere in India or abroad." },
  { q: "Will I get a certificate?", a: "Every paid course comes with a The English Center completion certificate you can share on LinkedIn." },
  { q: "What if I miss a class?", a: "All sessions are recorded and uploaded within 24 hours so you never miss content." },
  { q: "Is there an EMI option?", a: "Yes — easy 3-month EMI for courses above ₹1,500. No interest, no hidden charges." },
  { q: "Can I switch my batch?", a: "One free batch switch is allowed within the first week of joining." },
  { q: "How do I choose the right course?", a: "Our counsellors recommend the best course after your first call, based on your level and goals." },
];

const benefits = [
  { icon: "👩‍🏫", title: "Expert Instructor", desc: "10+ years of experience with Mrs. Anjali Chatterjee." },
  { icon: "📱", title: "100% Online", desc: "Attend from home, office, or anywhere — no commute." },
  { icon: "🎓", title: "Certified Course", desc: "Industry-recognised certificate on completion." },
  { icon: "⏺️", title: "Recorded Classes", desc: "Rewatch any session anytime, forever." },
  { icon: "💬", title: "WhatsApp Support", desc: "Instant doubt support via active WhatsApp community." },
  { icon: "💳", title: "Easy EMI", desc: "3-month no-interest EMI for all premium courses." },
];

interface FormData {
  name: string; phone: string; email: string; city: string;
  level: string; schedule: string; message: string;
}

const EMPTY: FormData = { name: "", phone: "", email: "", city: "", level: "", schedule: "", message: "" };

export default function EnquiryPage() {
  const [form, setForm] = useState<FormData>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      setError("Name and phone number are required.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/enqury", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const text = await res.text();
      let json: any;
      try {
        json = JSON.parse(text);
      } catch {
        throw new Error(`Server error (${res.status}): API route not found or returned HTML.`);
      }

      if (!res.ok || !json.success) throw new Error(json.error || "Submission failed");
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@400;500;600;700&family=Syne:wght@600;700;800&display=swap');

        .ap-root, .ap-root *, .ap-root *::before, .ap-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .ap-root {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          line-height: 1.75;
          color: #374151;
          background: #f8f7ff;
          min-height: 100vh;
        }

        /* ── HERO ── */
        .ap-hero {
          background: linear-gradient(135deg, #0f0c29 0%, #1e1b4b 45%, #302b63 100%);
          padding: 72px 8% 60px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .ap-hero::after {
          content: ''; position: absolute; inset: 0;
          background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 40px 40px; pointer-events: none;
        }
        .ap-blob { position: absolute; border-radius: 50%; filter: blur(70px); pointer-events: none; }
        .ap-blob-1 { width: 320px; height: 320px; background: #7c3aed; opacity: 0.13; top: -80px; right: -40px; }
        .ap-blob-2 { width: 240px; height: 240px; background: #4f46e5; opacity: 0.13; bottom: -70px; left: -30px; }
        .ap-blob-3 { width: 180px; height: 180px; background: #fbbf24; opacity: 0.06; top: 10px; left: 40%; }
        .ap-hero-inner { position: relative; z-index: 2; }
        .ap-hero-badge {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(139,92,246,0.15); border: 1px solid rgba(139,92,246,0.35);
          color: #c4b5fd; font-family: 'Syne', sans-serif;
          font-size: 10px; font-weight: 700; padding: 5px 16px;
          border-radius: 20px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 22px;
        }
        .ap-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #a78bfa; animation: apPulse 2s ease-in-out infinite; }
        .ap-hero-title {
          font-family: 'Fraunces', serif;
          font-size: clamp(36px, 5.5vw, 64px);
          font-weight: 900; color: #fff; line-height: 1.08;
          letter-spacing: -1.5px; margin-bottom: 18px;
        }
        .ap-hero-title .gold { font-style: italic; color: #fbbf24; position: relative; display: inline-block; }
        .ap-hero-title .gold::after {
          content: ''; position: absolute; left: 0; bottom: -4px;
          width: 100%; height: 3px; border-radius: 2px;
          background: linear-gradient(90deg, #fbbf24, #f59e0b);
        }
        .ap-hero-sub {
          font-size: 16px; color: rgba(255,255,255,0.62);
          line-height: 1.8; max-width: 480px; margin: 0 auto 36px;
        }
        .ap-hero-stats {
          display: inline-flex; border: 1px solid rgba(255,255,255,0.12);
          border-radius: 14px; overflow: hidden; background: rgba(255,255,255,0.04);
        }
        .ap-stat {
          padding: 14px 28px; text-align: center;
          border-right: 1px solid rgba(255,255,255,0.10);
        }
        .ap-stat:last-child { border-right: none; }
        .ap-stat-num { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 900; color: #fff; display: block; letter-spacing: -0.5px; }
        .ap-stat-lbl { font-size: 11px; color: rgba(255,255,255,0.45); display: block; margin-top: 3px; }

        /* ── BODY ── */
        .ap-body { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 36px; padding: 48px 8% 80px; align-items: start; }

        /* ── FORM ── */
        .ap-form-wrap {
          background: #fff; border-radius: 20px; padding: 36px;
          box-shadow: 0 6px 30px rgba(79,70,229,0.09);
          border: 1px solid rgba(79,70,229,0.08);
        }
        .ap-form-title { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 700; color: #0f0c29; letter-spacing: -0.3px; margin-bottom: 6px; }
        .ap-form-sub { font-size: 14px; color: #6b7280; line-height: 1.65; margin-bottom: 28px; }
        .ap-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .ap-form-full { grid-column: 1 / -1; }
        .ap-field-label {
          font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 700;
          color: #374151; text-transform: uppercase; letter-spacing: 0.8px;
          margin-bottom: 6px; display: block;
        }
        .ap-field-label span { color: #ef4444; }
        .ap-input, .ap-select, .ap-textarea {
          width: 100%; background: #f8f7ff; border: 1.5px solid #e5e7eb;
          color: #0f0c29; border-radius: 10px; padding: 11px 14px;
          font-size: 14px; font-family: 'DM Sans', sans-serif; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          -webkit-appearance: none; appearance: none;
        }
        .ap-input:focus, .ap-select:focus, .ap-textarea:focus {
          border-color: #4f46e5;
          box-shadow: 0 0 0 3px rgba(79,70,229,0.1);
        }
        .ap-input::placeholder, .ap-textarea::placeholder { color: #9ca3af; }
        .ap-input:disabled, .ap-select:disabled, .ap-textarea:disabled { opacity: 0.6; cursor: not-allowed; }
        .ap-textarea { resize: vertical; min-height: 88px; line-height: 1.65; }

        .ap-error {
          font-size: 13px; color: #ef4444;
          background: rgba(239,68,68,0.06); border: 1px solid rgba(239,68,68,0.2);
          border-radius: 8px; padding: 11px 14px; line-height: 1.5;
        }
        .ap-submit-btn {
          width: 100%; background: linear-gradient(135deg, #4f46e5, #6d28d9);
          color: #fff; border: none; padding: 14px; border-radius: 11px;
          font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 800;
          cursor: pointer; box-shadow: 0 6px 20px rgba(79,70,229,0.35);
          transition: all 0.25s; letter-spacing: 0.3px; margin-top: 6px;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .ap-submit-btn:hover:not(:disabled) { opacity: 0.9; transform: translateY(-2px); box-shadow: 0 10px 28px rgba(79,70,229,0.42); }
        .ap-submit-btn:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }
        .ap-spinner-sm { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite; }
        .ap-form-note { font-size: 12px; color: #9ca3af; text-align: center; margin-top: 10px; line-height: 1.5; }

        /* Success */
        .ap-success { text-align: center; padding: 32px 16px; }
        .ap-success-icon { font-size: 60px; margin-bottom: 16px; }
        .ap-success-title { font-family: 'Fraunces', serif; font-size: 24px; font-weight: 700; color: #0f0c29; margin-bottom: 10px; letter-spacing: -0.3px; }
        .ap-success-sub { font-size: 15px; color: #6b7280; line-height: 1.75; }
        .ap-success-btn {
          margin-top: 20px; background: linear-gradient(135deg, #4f46e5, #7c3aed);
          color: #fff; border: none; padding: 11px 24px; border-radius: 10px;
          font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700;
          cursor: pointer; transition: opacity 0.2s;
        }
        .ap-success-btn:hover { opacity: 0.88; }

        /* ── RIGHT COLUMN ── */
        .ap-right-col { display: flex; flex-direction: column; gap: 18px; position: sticky; top: 24px; }
        .ap-benefits {
          background: #fff; border-radius: 18px; padding: 26px;
          box-shadow: 0 4px 18px rgba(79,70,229,0.07);
          border: 1px solid rgba(79,70,229,0.07);
        }
        .ap-benefits-title { font-family: 'Fraunces', serif; font-size: 17px; font-weight: 700; color: #0f0c29; letter-spacing: -0.2px; margin-bottom: 18px; }
        .ap-benefits-title span { color: #4f46e5; font-style: italic; }
        .ap-benefit-item { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 14px; }
        .ap-benefit-item:last-child { margin-bottom: 0; }
        .ap-benefit-icon { width: 36px; height: 36px; border-radius: 9px; background: linear-gradient(135deg, #ede9fe, #c4b5fd); display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; }
        .ap-benefit-name { font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 700; color: #0f0c29; margin-bottom: 2px; }
        .ap-benefit-desc { font-size: 12px; color: #6b7280; line-height: 1.55; }

        .ap-contact-card { background: linear-gradient(135deg, #1e1b4b, #312e81); border-radius: 16px; padding: 24px; }
        .ap-contact-title { font-family: 'Fraunces', serif; font-size: 17px; font-weight: 700; color: #fff; margin-bottom: 6px; }
        .ap-contact-sub { font-size: 13px; color: rgba(255,255,255,0.55); margin-bottom: 18px; line-height: 1.6; }
        .ap-contact-item { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
        .ap-contact-item:last-child { margin-bottom: 0; }
        .ap-contact-icon { width: 34px; height: 34px; border-radius: 9px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.18); display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; }
        .ap-contact-text { font-size: 13px; color: #fff; font-weight: 500; }
        .ap-contact-text span { display: block; font-size: 11px; color: rgba(255,255,255,0.48); font-weight: 400; margin-bottom: 1px; }

        /* ── FAQ ── */
        .ap-faq-section { padding: 0 8% 80px; }
        .ap-faq-heading { font-family: 'Fraunces', serif; font-size: clamp(20px, 2.5vw, 30px); font-weight: 700; color: #0f0c29; letter-spacing: -0.4px; margin-bottom: 4px; }
        .ap-faq-heading span { color: #4f46e5; font-style: italic; }
        .ap-faq-sub { font-size: 14px; color: #6b7280; margin-bottom: 20px; }
        .ap-faq-list { display: flex; flex-direction: column; gap: 8px; max-width: 780px; margin: 0 auto; }
        .ap-faq-item { background: #fff; border-radius: 12px; border: 1px solid rgba(79,70,229,0.08); box-shadow: 0 2px 8px rgba(0,0,0,0.04); overflow: hidden; transition: box-shadow 0.2s; }
        .ap-faq-item:hover { box-shadow: 0 5px 20px rgba(79,70,229,0.09); }
        .ap-faq-q { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; cursor: pointer; gap: 12px; }
        .ap-faq-q-text { font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700; color: #0f0c29; line-height: 1.4; }
        .ap-faq-chevron { font-size: 11px; color: #4f46e5; flex-shrink: 0; transition: transform 0.25s; font-weight: 800; }
        .ap-faq-chevron.open { transform: rotate(180deg); }
        .ap-faq-a { padding: 0 20px 16px; font-size: 14px; color: #6b7280; line-height: 1.75; border-top: 1px solid #f1f5f9; padding-top: 12px; }

        @keyframes apPulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.4); } }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .ap-body { grid-template-columns: 1fr; }
          .ap-right-col { position: static; }
        }
        @media (max-width: 768px) {
          .ap-hero { padding: 52px 5% 48px; }
          .ap-hero-stats { display: grid; grid-template-columns: 1fr 1fr; border-radius: 12px; }
          .ap-stat { padding: 12px 16px; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.10); }
          .ap-stat:nth-child(odd) { border-right: 1px solid rgba(255,255,255,0.10); }
          .ap-stat:nth-last-child(-n+2) { border-bottom: none; }
          .ap-body { padding: 20px 5% 60px; gap: 20px; }
          .ap-faq-section { padding: 0 5% 60px; }
          .ap-faq-heading, .ap-faq-sub { text-align: center; }
          .ap-form-grid { grid-template-columns: 1fr; }
          .ap-form-full { grid-column: 1; }
          .ap-form-wrap { padding: 24px 18px; border-radius: 16px; }
          .ap-benefits { padding: 22px 18px; }
          .ap-contact-card { padding: 20px 18px; }
        }
        @media (max-width: 420px) {
          .ap-hero-title { letter-spacing: -0.8px; }
          .ap-hero-stats { width: 100%; }
        }
      `}</style>

      <div className="ap-root">

        {/* HERO */}
        <div className="ap-hero">
          <div className="ap-blob ap-blob-1" />
          <div className="ap-blob ap-blob-2" />
          <div className="ap-blob ap-blob-3" />
          <div className="ap-hero-inner">
            <div className="ap-hero-badge"><span className="ap-badge-dot" />Enquiries Open 2025</div>
            <h1 className="ap-hero-title">Send an <span className="gold">Enquiry</span></h1>
            <p className="ap-hero-sub">Interested in our courses? Fill the form and our team will get back to you within 24 hours.</p>
            <div className="ap-hero-stats">
              {[["100+", "Students Enrolled"], ["24 hrs", "Response Time"], ["₹499", "Starting At"], ["100%", "Online"]].map(([n, l]) => (
                <div key={l} className="ap-stat">
                  <span className="ap-stat-num">{n}</span>
                  <span className="ap-stat-lbl">{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="ap-body">

          {/* LEFT — Form */}
          <div>
            <div className="ap-form-wrap">
              {!submitted ? (
                <>
                  <div className="ap-form-title">Enquiry Form</div>
                  <div className="ap-form-sub">Fill in the required fields — our counsellor will call you within 24 hours.</div>

                  <div className="ap-form-grid">
                    <div>
                      <label className="ap-field-label">Full Name <span>*</span></label>
                      <input className="ap-input" name="name" placeholder="e.g. Priya Sharma" value={form.name} onChange={handleChange} disabled={loading} />
                    </div>
                    <div>
                      <label className="ap-field-label">Phone Number <span>*</span></label>
                      <input className="ap-input" name="phone" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} disabled={loading} />
                    </div>
                    <div>
                      <label className="ap-field-label">Email Address</label>
                      <input className="ap-input" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} disabled={loading} />
                    </div>
                    <div>
                      <label className="ap-field-label">City / State</label>
                      <input className="ap-input" name="city" placeholder="e.g. Bengaluru, Karnataka" value={form.city} onChange={handleChange} disabled={loading} />
                    </div>
                    <div>
                      <label className="ap-field-label">Current English Level</label>
                      <select className="ap-select" name="level" value={form.level} onChange={handleChange} disabled={loading}>
                        <option value="">— Select level —</option>
                        {levelOptions.map(l => <option key={l} value={l}>{l}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="ap-field-label">Preferred Schedule</label>
                      <select className="ap-select" name="schedule" value={form.schedule} onChange={handleChange} disabled={loading}>
                        <option value="">— Select time —</option>
                        {scheduleOptions.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="ap-form-full">
                      <label className="ap-field-label">Your Goal / Message</label>
                      <textarea className="ap-textarea" name="message" placeholder="Tell us your learning goal or any specific requirement..." value={form.message} onChange={handleChange} disabled={loading} />
                    </div>
                    {error && (
                      <div className="ap-form-full">
                        <div className="ap-error">⚠️ {error}</div>
                      </div>
                    )}
                    <div className="ap-form-full">
                      <button className="ap-submit-btn" onClick={handleSubmit} disabled={loading}>
                        {loading ? <><div className="ap-spinner-sm" /> Submitting…</> : "Send Enquiry →"}
                      </button>
                      <p className="ap-form-note">🔒 Your information is 100% secure and never shared.</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="ap-success">
                  <div className="ap-success-icon">🎉</div>
                  <div className="ap-success-title">Enquiry Submitted!</div>
                  <p className="ap-success-sub">
                    Thank you, <strong>{form.name}</strong>!<br /><br />
                    Our team will call you on <strong>{form.phone}</strong> within 24 hours to guide you through the next steps.
                  </p>
                  <button className="ap-success-btn" onClick={() => { setSubmitted(false); setForm(EMPTY); }}>
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
              {benefits.map((b, i) => (
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
              <div className="ap-contact-sub">Our counsellors are available Mon–Sat, 9 AM – 7 PM.</div>
              {[
                { icon: "📞", label: "Call Us", val: "+91 98765 43210" },
                { icon: "💬", label: "WhatsApp", val: "+91 98765 43210" },
                { icon: "📧", label: "Email", val: "admissions@TheEnglishCenter.in" },
              ].map((c, i) => (
                <div key={i} className="ap-contact-item">
                  <div className="ap-contact-icon">{c.icon}</div>
                  <div className="ap-contact-text"><span>{c.label}</span>{c.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="ap-faq-section">
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <h2 className="ap-faq-heading">Frequently Asked <span>Questions</span></h2>
            <p className="ap-faq-sub">Everything you need to know before enrolling.</p>
          </div>
          <div className="ap-faq-list">
            {faqs.map((f, i) => (
              <div key={i} className="ap-faq-item">
                <div className="ap-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <div className="ap-faq-q-text">{f.q}</div>
                  <div className={`ap-faq-chevron${openFaq === i ? " open" : ""}`}>▼</div>
                </div>
                {openFaq === i && <div className="ap-faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}