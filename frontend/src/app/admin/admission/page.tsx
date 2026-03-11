// src/admin/admission/page.tsx
"use client";

import React, { useState, useEffect } from "react";

interface Admission {
  _id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  level: string;
  schedule: string;
  message: string;
  createdAt: string;
}

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
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState<string | null>(null);
  const [search, setSearch]         = useState("");
  const [selected, setSelected]     = useState<Admission | null>(null);

  useEffect(() => {
    const fetchAdmissions = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/api/enqury");
        const json = await res.json();
        if (!json.success) throw new Error(json.error || "Failed to fetch");
        setAdmissions(json.data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchAdmissions();
  }, []);

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

        .ad-glow{position:fixed;inset:0;pointer-events:none;z-index:0;background:radial-gradient(ellipse 55% 35% at 10% 5%,rgba(99,102,241,0.06) 0%,transparent 65%),radial-gradient(ellipse 45% 30% at 92% 92%,rgba(139,92,246,0.05) 0%,transparent 65%);}
        .ad-grid-bg{position:fixed;inset:0;pointer-events:none;z-index:0;background-image:linear-gradient(rgba(255,255,255,0.011) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.011) 1px,transparent 1px);background-size:48px 48px;}

        .ad-inner{position:relative;z-index:1;max-width:1360px;margin:0 auto;padding:32px 28px 72px;}

        .ad-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:32px;padding-bottom:22px;border-bottom:1px solid var(--bd);flex-wrap:wrap;gap:12px;}
        .ad-header-left{display:flex;align-items:center;gap:14px;}
        .ad-logo{width:42px;height:42px;border-radius:12px;flex-shrink:0;background:linear-gradient(135deg,#4f46e5,#7c3aed);display:flex;align-items:center;justify-content:center;font-size:19px;box-shadow:0 4px 18px rgba(79,70,229,0.35);}
        .ad-crumb{font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:2px;color:var(--mu);text-transform:uppercase;margin-bottom:4px;}
        .ad-title{font-size:22px;font-weight:800;letter-spacing:-0.4px;}
        .ad-title em{font-style:normal;color:var(--ac);}
        .ad-count-badge{font-family:'IBM Plex Mono',monospace;font-size:12px;color:var(--mu);background:var(--s1);border:1px solid var(--bd);padding:6px 16px;border-radius:8px;}
        .ad-count-badge strong{color:var(--tx);font-weight:600;}

        .ad-toolbar{display:flex;gap:10px;margin-bottom:18px;align-items:center;flex-wrap:wrap;}
        .ad-search-wrap{position:relative;flex:1;min-width:220px;}
        .ad-search-ico{position:absolute;left:13px;top:50%;transform:translateY(-50%);font-size:15px;color:var(--mu);pointer-events:none;}
        .ad-search{width:100%;padding:11px 14px 11px 40px;background:var(--s1);border:1px solid var(--bd);border-radius:11px;outline:none;font-family:'Outfit',sans-serif;font-size:14px;color:var(--tx);caret-color:var(--ac);transition:all .15s;}
        .ad-search::placeholder{color:var(--mu2);}
        .ad-search:focus{border-color:rgba(129,140,248,0.4);background:var(--ac-bg);box-shadow:0 0 0 3px rgba(129,140,248,0.08);}
        .ad-shown{font-family:'IBM Plex Mono',monospace;font-size:12px;color:var(--mu);white-space:nowrap;}

        .ad-layout{display:grid;grid-template-columns:1fr 390px;gap:20px;align-items:start;}
        @media(max-width:1080px){.ad-layout{grid-template-columns:1fr;}}

        .ad-card{background:var(--s1);border:1px solid var(--bd);border-radius:16px;overflow:hidden;}

        /* Loading & Error states */
        .ad-state{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:80px 20px;gap:14px;}
        .ad-state-ico{font-size:28px;opacity:0.3;}
        .ad-state-txt{font-family:'IBM Plex Mono',monospace;font-size:13px;color:var(--mu);}
        .ad-state-err{color:#f87171;opacity:1;}
        .ad-spinner{width:28px;height:28px;border:2px solid var(--bd);border-top-color:var(--ac);border-radius:50%;animation:spin .7s linear infinite;}
        @keyframes spin{to{transform:rotate(360deg);}}

        .ad-table{width:100%;border-collapse:collapse;}
        .ad-table th{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--mu);padding:13px 16px;text-align:left;border-bottom:1px solid var(--bd);background:rgba(255,255,255,0.015);white-space:nowrap;}
        .ad-table td{padding:13px 16px;border-bottom:1px solid var(--bd);vertical-align:middle;}
        .ad-table tr:last-child td{border-bottom:none;}
        .ad-row{cursor:pointer;transition:background .12s;}
        .ad-row:hover{background:rgba(255,255,255,0.025);}
        .ad-row.sel{background:rgba(129,140,248,0.06);}
        .ad-row.sel td:first-child{border-left:2px solid var(--ac);}

        .td-name{font-size:14px;font-weight:700;margin-bottom:2px;}
        .td-phone{font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--mu);}
        .td-muted{font-size:13px;color:var(--mu);}
        .td-date{font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--mu);white-space:nowrap;}
        .td-idx{font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--mu);}

        .ad-sched-tag{display:inline-block;font-family:'IBM Plex Mono',monospace;font-size:10px;font-weight:500;padding:3px 10px;border-radius:6px;white-space:nowrap;}

        .ad-empty td{text-align:center;padding:64px 20px;}
        .ad-empty-inner{display:flex;flex-direction:column;align-items:center;gap:10px;}
        .ad-empty-ico{font-size:28px;opacity:0.15;}
        .ad-empty-txt{font-family:'IBM Plex Mono',monospace;font-size:13px;color:var(--mu);}

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

        .ad-detail-body{padding:20px 22px 28px;display:flex;flex-direction:column;gap:18px;}
        .ad-sec-lbl{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--mu);margin-bottom:10px;}
        .ad-field-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
        .ad-field{background:var(--s2);border:1px solid var(--bd);border-radius:10px;padding:11px 14px;}
        .ad-field-lbl{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:var(--mu);margin-bottom:5px;}
        .ad-field-val{font-size:13px;font-weight:600;color:var(--tx);line-height:1.4;word-break:break-all;}
        .ad-field-val.empty{color:var(--mu);font-weight:400;font-style:italic;}

        .ad-msg{background:var(--s2);border:1px solid var(--bd);border-left:3px solid rgba(129,140,248,0.35);border-radius:10px;padding:14px 16px;font-size:13px;color:var(--tx);line-height:1.8;font-style:italic;}
        .ad-msg.empty{color:var(--mu);font-style:normal;}

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
              {loading ? (
                <div className="ad-state">
                  <div className="ad-spinner" />
                  <div className="ad-state-txt">loading enquiries…</div>
                </div>
              ) : error ? (
                <div className="ad-state">
                  <div className="ad-state-ico">⚠️</div>
                  <div className="ad-state-txt ad-state-err">{error}</div>
                </div>
              ) : (
                <table className="ad-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name &amp; Phone</th>
                      <th>City</th>
                      <th>Schedule</th>
                      <th>Submitted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length === 0 ? (
                      <tr className="ad-empty">
                        <td colSpan={5}>
                          <div className="ad-empty-inner">
                            <div className="ad-empty-ico">📭</div>
                            <div className="ad-empty-txt">no enquiries found</div>
                          </div>
                        </td>
                      </tr>
                    ) : filtered.map((a, i) => {
                      const sc = scheduleColor[a.schedule];
                      return (
                        <tr
                          key={a._id}
                          className={`ad-row${selected?._id === a._id ? " sel" : ""}`}
                          onClick={() => setSelected(a)}
                        >
                          <td><span className="td-idx">{i + 1}</span></td>
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
                          <td><span className="td-date">{fmt(a.createdAt)}</span></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
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
                      <div className="ad-detail-hd-meta">{fmt(selected.createdAt)}</div>
                      <div className="ad-detail-hd-name">{selected.name}</div>
                      <div className="ad-detail-hd-phone">{selected.phone}</div>
                    </div>
                    <button className="ad-close-btn" onClick={() => setSelected(null)}>✕</button>
                  </div>

                  <div className="ad-detail-body">

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

                    <div>
                      <div className="ad-sec-lbl">english level</div>
                      <div className="ad-field">
                        <div className="ad-field-lbl">Current Level</div>
                        <div className={`ad-field-val${!selected.level ? " empty" : ""}`}>
                          {selected.level || "Not specified"}
                        </div>
                      </div>
                    </div>

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

                    <div>
                      <div className="ad-sec-lbl">goal / message</div>
                      <div className={`ad-msg${!selected.message ? " empty" : ""}`}>
                        {selected.message || "No message provided."}
                      </div>
                    </div>

                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}