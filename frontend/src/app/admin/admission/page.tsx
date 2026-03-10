"use client";

import React, { useState } from "react";

interface Admission {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  schedule: string;
  message: string;
  appliedAt: string;
}

const SEED: Admission[] = [
  { id: "ADM-001", name: "Priya Sharma",   phone: "+91 98765 43210", email: "priya@gmail.com",        city: "Bengaluru, Karnataka", schedule: "Evening (6 PM – 9 PM)",      message: "I want to improve my spoken English for job interviews.",               appliedAt: "2025-01-10T09:14:00" },
  { id: "ADM-002", name: "Rohit Verma",    phone: "+91 91234 56789", email: "rohit.v@outlook.com",    city: "Delhi",                schedule: "Morning (7 AM – 10 AM)",     message: "Need to prepare for IELTS exam this year.",                             appliedAt: "2025-01-09T14:32:00" },
  { id: "ADM-003", name: "Sneha Nair",     phone: "+91 87654 32100", email: "",                       city: "Kochi, Kerala",        schedule: "Weekend Batch (Sat & Sun)",  message: "Looking for a patient instructor to help me build confidence.",         appliedAt: "2025-01-08T11:05:00" },
  { id: "ADM-004", name: "Aakash Patel",   phone: "+91 99887 76655", email: "aakash@company.com",     city: "Ahmedabad, Gujarat",   schedule: "Afternoon (12 PM – 3 PM)",   message: "Business English for corporate presentations and client calls.",        appliedAt: "2025-01-11T07:50:00" },
  { id: "ADM-005", name: "Meera Joshi",    phone: "+91 93456 12345", email: "meera.j@gmail.com",      city: "Pune, Maharashtra",    schedule: "Evening (6 PM – 9 PM)",      message: "Want to refine my accent and master idiomatic expressions.",            appliedAt: "2025-01-07T16:20:00" },
  { id: "ADM-006", name: "Karan Singh",    phone: "+91 88001 23456", email: "karan@yahoo.com",        city: "Chandigarh",           schedule: "Weekend Batch (Sat & Sun)",  message: "Just started learning, need a full foundation course from scratch.",    appliedAt: "2025-01-11T10:00:00" },
  { id: "ADM-007", name: "Divya Reddy",    phone: "+91 70001 99887", email: "divya.r@gmail.com",      city: "Hyderabad, Telangana", schedule: "Flexible / Self-paced",      message: "Looking for spoken and grammar combo batch. Flexible on timings.",      appliedAt: "2025-01-12T08:15:00" },
  { id: "ADM-008", name: "Tanveer Ahmed",  phone: "+91 96001 55432", email: "tanveer.a@gmail.com",    city: "Lucknow, UP",          schedule: "Morning (7 AM – 10 AM)",     message: "I am a school teacher and want to improve my classroom English.",       appliedAt: "2025-01-06T09:45:00" },
  { id: "ADM-009", name: "Pooja Iyer",     phone: "+91 84321 00987", email: "pooja.iyer@hotmail.com", city: "Chennai, Tamil Nadu",  schedule: "Afternoon (12 PM – 3 PM)",   message: "Preparing for a US visa interview and want to sound more confident.",   appliedAt: "2025-01-13T13:20:00" },
  { id: "ADM-010", name: "Arjun Malhotra", phone: "+91 77005 66312", email: "",                       city: "Mumbai, Maharashtra",  schedule: "Flexible / Self-paced",      message: "Working professional. Need advanced writing and communication skills.", appliedAt: "2025-01-14T08:00:00" },
];

const scheduleShort: Record<string, string> = {
  "Morning (7 AM – 10 AM)":    "Morning",
  "Afternoon (12 PM – 3 PM)":  "Afternoon",
  "Evening (6 PM – 9 PM)":     "Evening",
  "Weekend Batch (Sat & Sun)": "Weekend",
  "Flexible / Self-paced":     "Flexible",
};

const scheduleColor: Record<string, { bg: string; color: string }> = {
  "Morning (7 AM – 10 AM)":    { bg: "rgba(251,191,36,0.1)",  color: "#fbbf24" },
  "Afternoon (12 PM – 3 PM)":  { bg: "rgba(96,165,250,0.1)",  color: "#60a5fa" },
  "Evening (6 PM – 9 PM)":     { bg: "rgba(167,139,250,0.1)", color: "#a78bfa" },
  "Weekend Batch (Sat & Sun)": { bg: "rgba(52,211,153,0.1)",  color: "#34d399" },
  "Flexible / Self-paced":     { bg: "rgba(248,113,113,0.1)", color: "#f87171" },
};

function fmt(iso: string) {
  const d = new Date(iso);
  return (
    d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) +
    " · " +
    d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
  );
}

export default function AdminAdmissions() {
  const [admissions, setAdmissions] = useState<Admission[]>(SEED);
  const [search, setSearch]         = useState("");
  const [selected, setSelected]     = useState<Admission | null>(null);
  const [deleteId, setDeleteId]     = useState<string | null>(null);
  const [toast, setToast]           = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleDelete = (id: string) => {
    setAdmissions(p => p.filter(a => a.id !== id));
    if (selected?.id === id) setSelected(null);
    setDeleteId(null);
    showToast("Application deleted");
  };

  const filtered = admissions.filter(a => {
    const q = search.toLowerCase();
    return (
      a.name.toLowerCase().includes(q) ||
      a.phone.includes(q) ||
      a.email.toLowerCase().includes(q) ||
      a.city.toLowerCase().includes(q) ||
      a.schedule.toLowerCase().includes(q) ||
      a.message.toLowerCase().includes(q)
    );
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

        :root {
          --bg:#080b12; --s1:#0d1117; --s2:#111827;
          --bd:rgba(255,255,255,0.07); --bd2:rgba(255,255,255,0.13);
          --tx:#e2e8f0; --mu:rgba(226,232,240,0.38); --mu2:rgba(226,232,240,0.16);
          --ac:#818cf8; --ac-bg:rgba(129,140,248,0.08);
        }

        .ad *{box-sizing:border-box;margin:0;padding:0;}
        .ad{min-height:100vh;background:var(--bg);font-family:'Outfit',sans-serif;color:var(--tx);}

        .ad-glow{
          position:fixed;inset:0;pointer-events:none;z-index:0;
          background:
            radial-gradient(ellipse 55% 35% at 10% 5%,rgba(99,102,241,0.06) 0%,transparent 65%),
            radial-gradient(ellipse 45% 30% at 92% 92%,rgba(139,92,246,0.05) 0%,transparent 65%);
        }
        .ad-grid-bg{
          position:fixed;inset:0;pointer-events:none;z-index:0;
          background-image:
            linear-gradient(rgba(255,255,255,0.011) 1px,transparent 1px),
            linear-gradient(90deg,rgba(255,255,255,0.011) 1px,transparent 1px);
          background-size:48px 48px;
        }

        .ad-inner{position:relative;z-index:1;max-width:1360px;margin:0 auto;padding:32px 28px 72px;}

        /* Header */
        .ad-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:32px;padding-bottom:22px;border-bottom:1px solid var(--bd);flex-wrap:wrap;gap:12px;}
        .ad-header-left{display:flex;align-items:center;gap:14px;}
        .ad-logo{width:42px;height:42px;border-radius:12px;flex-shrink:0;background:linear-gradient(135deg,#4f46e5,#7c3aed);display:flex;align-items:center;justify-content:center;font-size:19px;box-shadow:0 4px 18px rgba(79,70,229,0.35);}
        .ad-crumb{font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:2px;color:var(--mu);text-transform:uppercase;margin-bottom:4px;}
        .ad-title{font-size:22px;font-weight:800;letter-spacing:-0.4px;}
        .ad-title em{font-style:normal;color:var(--ac);}
        .ad-count-badge{font-family:'IBM Plex Mono',monospace;font-size:12px;color:var(--mu);background:var(--s1);border:1px solid var(--bd);padding:6px 16px;border-radius:8px;}
        .ad-count-badge strong{color:var(--tx);font-weight:600;}

        /* Toolbar */
        .ad-toolbar{display:flex;gap:10px;margin-bottom:18px;align-items:center;flex-wrap:wrap;}
        .ad-search-wrap{position:relative;flex:1;min-width:220px;}
        .ad-search-ico{position:absolute;left:13px;top:50%;transform:translateY(-50%);font-size:15px;color:var(--mu);pointer-events:none;}
        .ad-search{width:100%;padding:11px 14px 11px 40px;background:var(--s1);border:1px solid var(--bd);border-radius:11px;outline:none;font-family:'Outfit',sans-serif;font-size:14px;color:var(--tx);caret-color:var(--ac);transition:all .15s;}
        .ad-search::placeholder{color:var(--mu2);}
        .ad-search:focus{border-color:rgba(129,140,248,0.4);background:var(--ac-bg);box-shadow:0 0 0 3px rgba(129,140,248,0.08);}
        .ad-shown{font-family:'IBM Plex Mono',monospace;font-size:12px;color:var(--mu);white-space:nowrap;}

        /* Layout */
        .ad-layout{display:grid;grid-template-columns:1fr 390px;gap:20px;align-items:start;}
        @media(max-width:1080px){.ad-layout{grid-template-columns:1fr;}}

        /* Table */
        .ad-card{background:var(--s1);border:1px solid var(--bd);border-radius:16px;overflow:hidden;}
        .ad-table{width:100%;border-collapse:collapse;}
        .ad-table th{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--mu);padding:13px 16px;text-align:left;border-bottom:1px solid var(--bd);background:rgba(255,255,255,0.015);white-space:nowrap;}
        .ad-table td{padding:13px 16px;border-bottom:1px solid var(--bd);vertical-align:middle;}
        .ad-table tr:last-child td{border-bottom:none;}
        .ad-row{cursor:pointer;transition:background .12s;}
        .ad-row:hover{background:rgba(255,255,255,0.025);}
        .ad-row.sel{background:rgba(129,140,248,0.06);}
        .ad-row.sel td:first-child{border-left:2px solid var(--ac);}

        .td-id{font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--mu);}
        .td-name{font-size:14px;font-weight:700;margin-bottom:2px;}
        .td-phone{font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--mu);}
        .td-muted{font-size:13px;color:var(--mu);}
        .td-date{font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--mu);white-space:nowrap;}

        .ad-sched-tag{display:inline-block;font-family:'IBM Plex Mono',monospace;font-size:10px;font-weight:500;padding:3px 10px;border-radius:6px;white-space:nowrap;}

        .td-del-btn{width:28px;height:28px;border-radius:7px;background:var(--s2);border:1px solid var(--bd);display:flex;align-items:center;justify-content:center;font-size:12px;cursor:pointer;color:var(--mu);transition:all .15s;opacity:0;}
        .ad-row:hover .td-del-btn{opacity:1;}
        .td-del-btn:hover{color:#f87171;border-color:rgba(248,113,113,0.3);background:rgba(248,113,113,0.06);}

        .ad-empty td{text-align:center;padding:64px 20px;}
        .ad-empty-inner{display:flex;flex-direction:column;align-items:center;gap:10px;}
        .ad-empty-ico{font-size:28px;opacity:0.15;}
        .ad-empty-txt{font-family:'IBM Plex Mono',monospace;font-size:13px;color:var(--mu);}

        /* Detail Panel */
        .ad-detail{background:var(--s1);border:1px solid var(--bd);border-radius:16px;overflow:hidden;position:sticky;top:24px;}
        .ad-detail-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:72px 24px;color:var(--mu);text-align:center;gap:14px;}
        .ad-detail-empty-ico{width:60px;height:60px;border-radius:18px;background:var(--s2);border:1px solid var(--bd);display:flex;align-items:center;justify-content:center;font-size:26px;opacity:0.35;}
        .ad-detail-empty-txt{font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:1px;}

        .ad-detail-hd{padding:20px 22px;border-bottom:1px solid var(--bd);display:flex;align-items:flex-start;justify-content:space-between;gap:12px;}
        .ad-detail-hd-meta{font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--mu);margin-bottom:5px;}
        .ad-detail-hd-name{font-size:20px;font-weight:800;letter-spacing:-0.3px;}
        .ad-detail-hd-phone{font-family:'IBM Plex Mono',monospace;font-size:12px;color:var(--mu);margin-top:4px;}
        .ad-close-btn{width:30px;height:30px;border-radius:8px;flex-shrink:0;background:var(--s2);border:1px solid var(--bd);display:flex;align-items:center;justify-content:center;font-size:12px;cursor:pointer;color:var(--mu);transition:all .15s;}
        .ad-close-btn:hover{color:var(--tx);border-color:var(--bd2);}

        .ad-detail-body{padding:20px 22px;display:flex;flex-direction:column;gap:18px;}
        .ad-sec-lbl{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--mu);margin-bottom:10px;}
        .ad-field-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
        .ad-field{background:var(--s2);border:1px solid var(--bd);border-radius:10px;padding:11px 14px;}
        .ad-field-lbl{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:var(--mu);margin-bottom:5px;}
        .ad-field-val{font-size:13px;font-weight:600;color:var(--tx);line-height:1.4;word-break:break-all;}
        .ad-field-val.empty{color:var(--mu);font-weight:400;font-style:italic;}

        .ad-msg{background:var(--s2);border:1px solid var(--bd);border-left:3px solid rgba(129,140,248,0.35);border-radius:10px;padding:14px 16px;font-size:13px;color:var(--tx);line-height:1.8;font-style:italic;}
        .ad-msg.empty{color:var(--mu);font-style:normal;}

        .ad-detail-del{margin:0 22px 20px;padding:12px;background:rgba(248,113,113,0.06);border:1px solid rgba(248,113,113,0.18);border-radius:10px;color:#f87171;font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:0.5px;cursor:pointer;text-align:center;transition:all .15s;width:calc(100% - 44px);}
        .ad-detail-del:hover{background:rgba(248,113,113,0.12);border-color:rgba(248,113,113,0.32);}

        /* Modal */
        .ad-overlay{position:fixed;inset:0;z-index:200;background:rgba(0,0,0,0.78);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:24px;}
        .ad-modal{background:#0d1117;border:1px solid var(--bd2);border-radius:18px;padding:32px;width:100%;max-width:370px;}
        .ad-modal-ico{font-size:30px;margin-bottom:14px;}
        .ad-modal-title{font-size:18px;font-weight:800;margin-bottom:8px;letter-spacing:-0.3px;}
        .ad-modal-desc{font-size:14px;color:var(--mu);margin-bottom:26px;line-height:1.65;}
        .ad-modal-desc strong{color:var(--tx);}
        .ad-modal-row{display:flex;gap:10px;}
        .ad-btn-del{flex:1;padding:13px;border-radius:11px;background:rgba(248,113,113,0.09);border:1px solid rgba(248,113,113,0.25);color:#f87171;font-family:'Outfit',sans-serif;font-size:14px;font-weight:700;cursor:pointer;transition:all .15s;}
        .ad-btn-del:hover{background:rgba(248,113,113,0.16);}
        .ad-btn-can{flex:1;padding:13px;border-radius:11px;background:transparent;border:1px solid var(--bd);color:var(--mu);font-family:'IBM Plex Mono',monospace;font-size:13px;cursor:pointer;transition:all .15s;}
        .ad-btn-can:hover{border-color:var(--bd2);color:var(--tx);}

        /* Toast */
        .ad-toast{position:fixed;bottom:28px;left:50%;transform:translateX(-50%);z-index:300;background:#0d1117;border:1px solid rgba(52,211,153,0.3);padding:11px 24px;border-radius:99px;font-family:'IBM Plex Mono',monospace;font-size:12px;color:#34d399;letter-spacing:0.5px;display:flex;align-items:center;gap:10px;white-space:nowrap;box-shadow:0 8px 32px rgba(0,0,0,0.55);animation:toastIn .25s cubic-bezier(0.34,1.56,0.64,1);}
        .ad-toast-dot{width:6px;height:6px;border-radius:50%;background:#34d399;box-shadow:0 0 6px #34d399;flex-shrink:0;}
        @keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(10px);}to{opacity:1;transform:translateX(-50%) translateY(0);}}

        @media(max-width:768px){
          .ad-inner{padding:20px 14px 48px;}
          .ad-table th:nth-child(4),.ad-table td:nth-child(4),
          .ad-table th:nth-child(5),.ad-table td:nth-child(5){display:none;}
        }
        @media(max-width:480px){
          .ad-table th:nth-child(3),.ad-table td:nth-child(3){display:none;}
        }
      `}</style>

      <div className="ad">
        <div className="ad-glow" />
        <div className="ad-grid-bg" />

        <div className="ad-inner">

          {/* Header */}
          <div className="ad-header">
            <div className="ad-header-left">
              <div className="ad-logo">🎓</div>
              <div>
                <div className="ad-crumb">SpeakEdge / admin / enquiries</div>
                <div className="ad-title">Enquiry <em>Applications</em></div>
              </div>
            </div>
            <div className="ad-count-badge">
              <strong>{admissions.length}</strong> total submissions
            </div>
          </div>

          {/* Toolbar */}
          <div className="ad-toolbar">
            <div className="ad-search-wrap">
              <span className="ad-search-ico">🔍</span>
              <input
                className="ad-search"
                placeholder="Search by name, phone, email, city, schedule or message…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="ad-shown">{filtered.length} shown</div>
          </div>

          {/* Layout */}
          <div className="ad-layout">

            {/* Table */}
            <div className="ad-card">
              <table className="ad-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name &amp; Phone</th>
                    <th>City</th>
                    <th>Schedule</th>
                    <th>Submitted</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr className="ad-empty">
                      <td colSpan={6}>
                        <div className="ad-empty-inner">
                          <div className="ad-empty-ico">📭</div>
                          <div className="ad-empty-txt">no enquiries found</div>
                        </div>
                      </td>
                    </tr>
                  ) : filtered.map(a => {
                    const sc = scheduleColor[a.schedule];
                    return (
                      <tr
                        key={a.id}
                        className={`ad-row${selected?.id === a.id ? " sel" : ""}`}
                        onClick={() => setSelected(a)}
                      >
                        <td><span className="td-id">{a.id}</span></td>
                        <td>
                          <div className="td-name">{a.name}</div>
                          <div className="td-phone">{a.phone}</div>
                        </td>
                        <td><span className="td-muted">{a.city || "—"}</span></td>
                        <td>
                          {a.schedule
                            ? <span className="ad-sched-tag" style={{ background: sc?.bg, color: sc?.color }}>{scheduleShort[a.schedule] ?? a.schedule}</span>
                            : <span className="td-muted">—</span>
                          }
                        </td>
                        <td><span className="td-date">{fmt(a.appliedAt)}</span></td>
                        <td onClick={e => e.stopPropagation()}>
                          <button className="td-del-btn" title="Delete" onClick={() => setDeleteId(a.id)}>✕</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Detail Panel */}
            <div className="ad-detail">
              {!selected ? (
                <div className="ad-detail-empty">
                  <div className="ad-detail-empty-ico">📋</div>
                  <div className="ad-detail-empty-txt">click a row to view</div>
                </div>
              ) : (
                <>
                  <div className="ad-detail-hd">
                    <div>
                      <div className="ad-detail-hd-meta">{selected.id} · {fmt(selected.appliedAt)}</div>
                      <div className="ad-detail-hd-name">{selected.name}</div>
                      <div className="ad-detail-hd-phone">{selected.phone}</div>
                    </div>
                    <button className="ad-close-btn" onClick={() => setSelected(null)}>✕</button>
                  </div>

                  <div className="ad-detail-body">

                    {/* name + phone — form fields 1 & 2 */}
                    <div>
                      <div className="ad-sec-lbl">basic info</div>
                      <div className="ad-field-grid">
                        <div className="ad-field">
                          <div className="ad-field-lbl">Full Name</div>
                          <div className="ad-field-val">{selected.name}</div>
                        </div>
                        <div className="ad-field">
                          <div className="ad-field-lbl">Phone Number</div>
                          <div className="ad-field-val">{selected.phone}</div>
                        </div>
                      </div>
                    </div>

                    {/* email + city — form fields 3 & 4 */}
                    <div>
                      <div className="ad-sec-lbl">contact details</div>
                      <div className="ad-field-grid">
                        <div className="ad-field">
                          <div className="ad-field-lbl">Email Address</div>
                          <div className={`ad-field-val${!selected.email ? " empty" : ""}`}>
                            {selected.email || "Not provided"}
                          </div>
                        </div>
                        <div className="ad-field">
                          <div className="ad-field-lbl">City / State</div>
                          <div className={`ad-field-val${!selected.city ? " empty" : ""}`}>
                            {selected.city || "Not provided"}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* schedule — form field 5 */}
                    <div>
                      <div className="ad-sec-lbl">preferred schedule</div>
                      <div className="ad-field">
                        <div className="ad-field-lbl">Schedule</div>
                        {selected.schedule
                          ? (() => {
                              const sc = scheduleColor[selected.schedule];
                              return (
                                <span className="ad-sched-tag" style={{ background: sc?.bg, color: sc?.color, marginTop: 4, display: "inline-block" }}>
                                  {selected.schedule}
                                </span>
                              );
                            })()
                          : <div className="ad-field-val empty">Not specified</div>
                        }
                      </div>
                    </div>

                    {/* message — form field 6 */}
                    <div>
                      <div className="ad-sec-lbl">goal / message</div>
                      <div className={`ad-msg${!selected.message ? " empty" : ""}`}>
                        {selected.message || "No message provided."}
                      </div>
                    </div>

                  </div>

                  <button className="ad-detail-del" onClick={() => setDeleteId(selected.id)}>
                    ✕ &nbsp; Delete this application
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {deleteId && (() => {
        const target = admissions.find(a => a.id === deleteId);
        return (
          <div className="ad-overlay">
            <div className="ad-modal">
              <div className="ad-modal-ico">⚠️</div>
              <div className="ad-modal-title">Delete application?</div>
              <div className="ad-modal-desc">
                This will permanently remove <strong>{target?.name}</strong>'s enquiry ({deleteId}). This cannot be undone.
              </div>
              <div className="ad-modal-row">
                <button className="ad-btn-del" onClick={() => handleDelete(deleteId)}>Yes, Delete</button>
                <button className="ad-btn-can" onClick={() => setDeleteId(null)}>Cancel</button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Toast */}
      {toast && (
        <div className="ad-toast">
          <div className="ad-toast-dot" />
          {toast}
        </div>
      )}
    </>
  );
}