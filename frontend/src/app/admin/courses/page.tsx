"use client";

import React, { useState, useEffect } from "react";

type CourseCategory = "Spoken English" | "IELTS / PTE / TOEFL" | "Grammar & Writing" | "Business English" | "Personality Development";
type Level = "Beginner" | "Intermediate" | "Advanced" | "All Levels";

interface Course {
  _id: string;
  category: CourseCategory;
  title: string;
  tagline: string;
  desc: string;
  level: Level;
  rating: number;
  language: string;
  certificate: boolean;
  icon: string;
  bgFrom: string;
  bgTo: string;
  tag?: string;
  features: string[];
}

const CATEGORIES: CourseCategory[] = [
  "Spoken English", "IELTS / PTE / TOEFL", "Grammar & Writing",
  "Business English", "Personality Development",
];
const LEVELS: Level[]  = ["Beginner", "Intermediate", "Advanced", "All Levels"];
const LANGUAGES        = ["Hindi + English", "English Only", "Hindi Only"];
const TAGS             = ["", "Most Popular", "Bestseller", "Top Rated", "Premium", "Most Enrolled", "New", "Free", "Trending"];
const EMOJIS           = ["🗣️","🎙️","🎁","🤝","🌟","🎤","📚","🏆","📜","🎓","💬","🧠","✍️","🌐","⭐","🎯"];
const GRADIENTS        = [
  { from: "#4f46e5", to: "#7c3aed" }, { from: "#0ea5e9", to: "#2563eb" },
  { from: "#be185d", to: "#f43f5e" }, { from: "#134e4a", to: "#0d9488" },
  { from: "#7c3aed", to: "#ec4899" }, { from: "#312e81", to: "#8b5cf6" },
  { from: "#b45309", to: "#f59e0b" }, { from: "#065f46", to: "#10b981" },
];

const tagColors: Record<string, { bg: string; color: string }> = {
  "Most Popular":  { bg: "#fbbf24", color: "#1a2340" },
  "Bestseller":    { bg: "#4f46e5", color: "#ffffff" },
  "Top Rated":     { bg: "#10b981", color: "#ffffff" },
  "Premium":       { bg: "#f59e0b", color: "#1a2340" },
  "Most Enrolled": { bg: "#8b5cf6", color: "#ffffff" },
  "New":           { bg: "#0ea5e9", color: "#ffffff" },
  "Free":          { bg: "#ef4444", color: "#ffffff" },
  "Trending":      { bg: "#ec4899", color: "#ffffff" },
};
const levelColors: Record<Level, { bg: string; color: string }> = {
  Beginner:     { bg: "rgba(52,211,153,0.15)",  color: "#34d399" },
  Intermediate: { bg: "rgba(251,191,36,0.15)",  color: "#fbbf24" },
  Advanced:     { bg: "rgba(248,113,113,0.15)", color: "#f87171" },
  "All Levels": { bg: "rgba(110,231,247,0.12)", color: "#6ee7f7" },
};
const categoryColors: Record<CourseCategory, { bg: string; color: string }> = {
  "Spoken English":          { bg: "rgba(139,92,246,0.15)",  color: "#a78bfa" },
  "IELTS / PTE / TOEFL":    { bg: "rgba(52,211,153,0.15)",  color: "#34d399" },
  "Grammar & Writing":       { bg: "rgba(96,165,250,0.15)",  color: "#60a5fa" },
  "Business English":        { bg: "rgba(251,191,36,0.15)",  color: "#fbbf24" },
  "Personality Development": { bg: "rgba(244,114,182,0.15)", color: "#f472b6" },
};

const emptyForm = () => ({
  category:    "Spoken English" as CourseCategory,
  title:       "",
  tagline:     "",
  desc:        "",
  level:       "Beginner" as Level,
  rating:      4.8,
  language:    "Hindi + English",
  certificate: true,
  icon:        "🗣️",
  bgFrom:      "#4f46e5",
  bgTo:        "#7c3aed",
  tag:         "",
  features:    [] as string[],
});

export default function AdminCourses() {
  const [courses, setCourses]             = useState<Course[]>([]);
  const [loading, setLoading]             = useState(true);
  const [saving, setSaving]               = useState(false);
  const [form, setForm]                   = useState(emptyForm());
  const [tab, setTab]                     = useState<"basic" | "details">("basic");
  const [errors, setErrors]               = useState<Record<string, string>>({});
  const [featureInput, setFeatureInput]   = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [toast, setToast]                 = useState<string | null>(null);
  const [filterCat, setFilterCat]         = useState<CourseCategory | "All">("All");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2800); };

  // ── Fetch ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        const res  = await fetch("/api/courses");
        const json = await res.json();
        if (json.success) setCourses(json.data);
        else showToast("Failed to load courses");
      } catch { showToast("Failed to load courses"); }
      finally  { setLoading(false); }
    })();
  }, []);

  // ── Create ────────────────────────────────────────────────────────────────
  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim())   e.title   = "Title required";
    if (!form.tagline.trim()) e.tagline = "Tagline required";
    if (!form.desc.trim())    e.desc    = "Description required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      const res  = await fetch("/api/courses", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ ...form, tag: form.tag || undefined }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      setCourses(prev => [json.data, ...prev]);
      setForm(emptyForm());
      setErrors({});
      setTab("basic");
      setFeatureInput("");
      showToast("Course published");
    } catch (err: any) {
      showToast(err.message || "Something went wrong");
    } finally { setSaving(false); }
  };

  // ── Delete ────────────────────────────────────────────────────────────────
  const handleDelete = async (id: string) => {
    try {
      const res  = await fetch(`/api/courses/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      setCourses(prev => prev.filter(c => c._id !== id));
      setDeleteConfirm(null);
      showToast("Course deleted");
    } catch (err: any) { showToast(err.message || "Delete failed"); }
  };

  const handleCancel  = () => { setForm(emptyForm()); setErrors({}); setTab("basic"); setFeatureInput(""); };
  const addFeature    = () => { if (featureInput.trim()) { setForm(f => ({ ...f, features: [...f.features, featureInput.trim()] })); setFeatureInput(""); } };
  const removeFeature = (i: number) => setForm(f => ({ ...f, features: f.features.filter((_, idx) => idx !== i) }));

  const filtered = filterCat === "All" ? courses : courses.filter(c => c.category === filterCat);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap');
        :root{--bg:#07070f;--sf:rgba(255,255,255,0.03);--sf2:rgba(255,255,255,0.055);--bd:rgba(255,255,255,0.07);--bd2:rgba(255,255,255,0.11);--tx:#d4d2e0;--mu:rgba(212,210,224,0.38);--ac:#6ee7f7;}
        .ac*{box-sizing:border-box;}
        .ac{min-height:100vh;background:var(--bg);font-family:'Syne',sans-serif;color:var(--tx);position:relative;}
        .ac::before{content:'';position:fixed;inset:0;pointer-events:none;z-index:0;background:radial-gradient(ellipse 60% 40% at 75% 5%,rgba(110,231,247,0.04) 0%,transparent 70%),radial-gradient(ellipse 40% 30% at 15% 85%,rgba(167,139,250,0.04) 0%,transparent 70%);}
        .ac-inner{position:relative;z-index:1;max-width:1280px;margin:0 auto;padding:36px 28px;}
        .ac-header{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:28px;padding-bottom:24px;border-bottom:1px solid var(--bd);}
        .ac-crumb{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:2.5px;color:var(--mu);text-transform:uppercase;margin-bottom:6px;}
        .ac-title{font-size:22px;font-weight:800;color:var(--tx);letter-spacing:-0.3px;}
        .ac-title span{color:var(--ac);}
        .ac-chip{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--mu);background:var(--sf);border:1px solid var(--bd);padding:5px 12px;border-radius:8px;}
        .ac-filters{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:18px;}
        .ac-filter-btn{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:1px;padding:5px 12px;border-radius:7px;border:1px solid var(--bd);background:transparent;color:var(--mu);cursor:pointer;transition:all 0.15s;text-transform:uppercase;}
        .ac-filter-btn:hover{border-color:var(--bd2);color:var(--tx);}
        .ac-filter-btn.active{background:rgba(110,231,247,0.08);border-color:rgba(110,231,247,0.25);color:var(--ac);}
        .ac-layout{display:grid;grid-template-columns:1fr 400px;gap:24px;align-items:start;}
        @media(max-width:960px){.ac-layout{grid-template-columns:1fr;}}
        .ac-sec-label{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:2px;color:var(--mu);text-transform:uppercase;margin-bottom:14px;}
        .ac-skeleton{background:linear-gradient(90deg,rgba(255,255,255,0.03) 25%,rgba(255,255,255,0.06) 50%,rgba(255,255,255,0.03) 75%);background-size:200% 100%;animation:acShimmer 1.5s infinite;border-radius:14px;height:88px;}
        @keyframes acShimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
        .ac-empty{border:1px dashed var(--bd2);border-radius:16px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:64px 24px;color:var(--mu);text-align:center;gap:10px;}
        .ac-empty-icon{font-size:28px;opacity:0.3;}
        .ac-empty-txt{font-family:'JetBrains Mono',monospace;font-size:11px;}
        .ac-cards{display:flex;flex-direction:column;gap:10px;}
        .ac-card{background:var(--sf);border:1px solid var(--bd);border-radius:14px;overflow:hidden;display:grid;grid-template-columns:150px 1fr auto;transition:all 0.2s;}
        .ac-card:hover{border-color:var(--bd2);background:var(--sf2);transform:translateY(-1px);box-shadow:0 8px 28px rgba(0,0,0,0.4);}
        .ac-card-thumb{position:relative;display:flex;align-items:center;justify-content:center;font-size:34px;flex-shrink:0;}
        .ac-card-thumb-tag{position:absolute;top:7px;left:7px;font-family:'JetBrains Mono',monospace;font-size:7px;font-weight:700;letter-spacing:0.8px;padding:2px 6px;border-radius:4px;text-transform:uppercase;}
        .ac-card-thumb-cert{position:absolute;bottom:7px;left:7px;font-family:'JetBrains Mono',monospace;font-size:7px;background:rgba(110,231,247,0.15);color:var(--ac);border:1px solid rgba(110,231,247,0.2);padding:2px 6px;border-radius:4px;}
        .ac-card-body{padding:12px 14px;display:flex;flex-direction:column;gap:5px;min-width:0;}
        .ac-card-tags{display:flex;align-items:center;gap:5px;flex-wrap:wrap;}
        .ac-card-cat{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:1px;font-weight:500;padding:2px 7px;border-radius:4px;}
        .ac-card-lvl{font-family:'JetBrains Mono',monospace;font-size:8px;font-weight:500;padding:2px 7px;border-radius:4px;}
        .ac-card-lang{font-family:'JetBrains Mono',monospace;font-size:8px;color:var(--mu);}
        .ac-card-title{font-size:13px;font-weight:700;color:var(--tx);line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
        .ac-card-tagline{font-size:11px;font-style:italic;color:var(--ac);opacity:0.7;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
        .ac-card-meta{display:flex;gap:10px;flex-wrap:wrap;}
        .ac-card-meta-i{font-family:'JetBrains Mono',monospace;font-size:9px;color:var(--mu);}
        .ac-card-actions{padding:12px 10px;display:flex;flex-direction:column;gap:5px;align-items:center;justify-content:center;}
        .ac-card-btn{width:27px;height:27px;background:var(--sf2);border:1px solid var(--bd);border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:11px;cursor:pointer;color:var(--mu);transition:all 0.15s;}
        .ac-card-btn.del:hover{color:#f87171;border-color:rgba(248,113,113,0.3);}
        .ac-panel{background:var(--sf);border:1px solid var(--bd);border-radius:16px;overflow:hidden;position:sticky;top:24px;}
        .ac-panel-head{padding:16px 20px 0;border-bottom:1px solid var(--bd);}
        .ac-panel-head-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;}
        .ac-panel-label{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:2px;color:var(--mu);text-transform:uppercase;margin-bottom:3px;}
        .ac-panel-title{font-size:14px;font-weight:700;color:var(--tx);}
        .ac-dot{width:8px;height:8px;border-radius:50%;background:var(--ac);box-shadow:0 0 8px var(--ac);animation:dp 2s infinite;}
        @keyframes dp{0%,100%{opacity:1}50%{opacity:0.3}}
        .ac-tabs{display:flex;}
        .ac-tab{flex:1;padding:9px 6px;font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:1.5px;text-transform:uppercase;border:none;background:transparent;color:var(--mu);cursor:pointer;border-bottom:2px solid transparent;transition:all 0.15s;}
        .ac-tab.on{color:var(--ac);border-bottom-color:var(--ac);}
        .ac-tab:hover:not(.on){color:var(--tx);}
        .ac-fbody{padding:18px 20px;display:flex;flex-direction:column;gap:14px;max-height:68vh;overflow-y:auto;}
        .ac-fbody::-webkit-scrollbar{width:3px;}
        .ac-fbody::-webkit-scrollbar-thumb{background:var(--bd2);border-radius:4px;}
        .ac-lbl{font-family:'JetBrains Mono',monospace;font-size:9px;font-weight:500;letter-spacing:2px;color:var(--mu);text-transform:uppercase;display:block;margin-bottom:7px;}
        .ac-inp,.ac-ta,.ac-sel{width:100%;padding:9px 12px;background:rgba(255,255,255,0.025);border:1px solid var(--bd);border-radius:9px;outline:none;font-family:'Syne',sans-serif;font-size:12px;color:var(--tx);transition:all 0.15s;caret-color:var(--ac);}
        .ac-inp::placeholder,.ac-ta::placeholder{color:rgba(212,210,224,0.2);}
        .ac-inp:focus,.ac-ta:focus,.ac-sel:focus{border-color:rgba(110,231,247,0.3);background:rgba(110,231,247,0.03);box-shadow:0 0 0 3px rgba(110,231,247,0.06);}
        .ac-inp.err,.ac-ta.err{border-color:rgba(248,113,113,0.35);}
        .ac-sel{appearance:none;cursor:pointer;}
        .ac-sel option{background:#0e0d1a;color:var(--tx);}
        .ac-ta{resize:none;line-height:1.6;}
        .ac-err{font-family:'JetBrains Mono',monospace;font-size:9px;color:#f87171;margin-top:4px;}
        .ac-row2{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
        .ac-grad-row{display:grid;grid-template-columns:repeat(8,1fr);gap:5px;}
        .ac-grad-sw{height:24px;border-radius:6px;cursor:pointer;border:2px solid transparent;transition:all 0.15s;}
        .ac-grad-sw.on{border-color:var(--ac);box-shadow:0 0 0 2px rgba(110,231,247,0.2);}
        .ac-emoji-row{display:flex;flex-wrap:wrap;gap:5px;}
        .ac-emo{width:32px;height:32px;border-radius:7px;border:1px solid var(--bd);background:transparent;font-size:15px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.15s;}
        .ac-emo:hover,.ac-emo.on{background:rgba(110,231,247,0.08);border-color:rgba(110,231,247,0.3);}
        .ac-tag-row{display:flex;flex-wrap:wrap;gap:5px;}
        .ac-tag-pill{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:0.8px;padding:4px 10px;border-radius:6px;border:1px solid var(--bd);background:transparent;color:var(--mu);cursor:pointer;transition:all 0.15s;text-transform:uppercase;}
        .ac-tag-pill:hover{border-color:var(--bd2);color:var(--tx);}
        .ac-tog-row{display:flex;align-items:center;justify-content:space-between;}
        .ac-tog-name{font-size:12px;font-weight:600;color:var(--tx);}
        .ac-tog-sub{font-family:'JetBrains Mono',monospace;font-size:9px;color:var(--mu);margin-top:2px;}
        .ac-tog{position:relative;width:36px;height:20px;cursor:pointer;flex-shrink:0;}
        .ac-tog input{opacity:0;width:0;height:0;position:absolute;}
        .ac-tog-track{position:absolute;inset:0;background:var(--sf2);border:1px solid var(--bd);border-radius:99px;transition:all 0.2s;}
        .ac-tog input:checked+.ac-tog-track{background:rgba(110,231,247,0.18);border-color:rgba(110,231,247,0.4);}
        .ac-tog-thumb{position:absolute;top:3px;left:3px;width:12px;height:12px;border-radius:50%;background:var(--mu);transition:all 0.2s;pointer-events:none;}
        .ac-tog input:checked~.ac-tog-thumb{left:19px;background:var(--ac);box-shadow:0 0 6px var(--ac);}
        .ac-feat-list{display:flex;flex-direction:column;gap:4px;margin-bottom:7px;}
        .ac-feat-item{display:flex;align-items:center;justify-content:space-between;padding:6px 10px;background:var(--sf2);border:1px solid var(--bd);border-radius:7px;font-size:11px;color:var(--tx);}
        .ac-feat-rm{background:none;border:none;cursor:pointer;color:var(--mu);font-size:12px;line-height:1;transition:color 0.15s;padding:0;}
        .ac-feat-rm:hover{color:#f87171;}
        .ac-feat-add{display:flex;gap:6px;}
        .ac-feat-add-btn{padding:9px 12px;background:rgba(110,231,247,0.07);border:1px solid rgba(110,231,247,0.18);border-radius:8px;color:var(--ac);font-family:'JetBrains Mono',monospace;font-size:9px;cursor:pointer;white-space:nowrap;transition:all 0.15s;letter-spacing:0.5px;}
        .ac-feat-add-btn:hover{background:rgba(110,231,247,0.13);}
        .ac-preview{background:var(--sf2);border:1px solid var(--bd);border-radius:12px;overflow:hidden;}
        .ac-preview-thumb{height:100px;display:flex;align-items:center;justify-content:center;font-size:38px;position:relative;}
        .ac-preview-body{padding:12px;}
        .ac-preview-title{font-size:13px;font-weight:700;color:var(--tx);margin-bottom:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
        .ac-preview-tagline{font-size:11px;font-style:italic;color:var(--ac);opacity:0.7;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
        .ac-footer{padding:14px 20px;border-top:1px solid var(--bd);display:flex;gap:8px;}
        .ac-btn-pub{flex:1;padding:11px;background:rgba(110,231,247,0.08);border:1px solid rgba(110,231,247,0.22);border-radius:10px;cursor:pointer;font-family:'Syne',sans-serif;font-size:12px;font-weight:700;color:var(--ac);transition:all 0.15s;}
        .ac-btn-pub:hover:not(:disabled){background:rgba(110,231,247,0.14);border-color:rgba(110,231,247,0.38);}
        .ac-btn-pub:disabled{opacity:0.5;cursor:not-allowed;}
        .ac-btn-can{padding:11px 14px;background:transparent;border:1px solid var(--bd);border-radius:10px;cursor:pointer;font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--mu);transition:all 0.15s;}
        .ac-btn-can:hover{border-color:var(--bd2);color:var(--tx);}
        .ac-modal-bg{position:fixed;inset:0;z-index:100;background:rgba(0,0,0,0.72);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:24px;}
        .ac-modal{background:#0c0b18;border:1px solid var(--bd2);border-radius:16px;padding:28px;width:100%;max-width:340px;}
        .ac-modal-icon{font-size:26px;margin-bottom:12px;}
        .ac-modal-title{font-size:15px;font-weight:700;color:var(--tx);margin-bottom:6px;}
        .ac-modal-desc{font-size:12px;color:var(--mu);margin-bottom:22px;line-height:1.6;}
        .ac-modal-row{display:flex;gap:8px;}
        .ac-btn-del{flex:1;padding:10px;background:rgba(248,113,113,0.09);border:1px solid rgba(248,113,113,0.22);border-radius:9px;cursor:pointer;font-family:'Syne',sans-serif;font-size:12px;font-weight:700;color:#f87171;transition:all 0.15s;}
        .ac-btn-del:hover{background:rgba(248,113,113,0.16);}
        .ac-toast{position:fixed;bottom:28px;left:50%;transform:translateX(-50%);z-index:200;background:#0c0b18;border:1px solid var(--bd2);padding:10px 20px;border-radius:99px;font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--ac);letter-spacing:0.5px;box-shadow:0 8px 32px rgba(0,0,0,0.5);display:flex;align-items:center;gap:8px;white-space:nowrap;}
        .ac-toast-dot{width:5px;height:5px;border-radius:50%;background:var(--ac);box-shadow:0 0 6px var(--ac);}
      `}</style>

      <div className="ac">
        <div className="ac-inner">

          <div className="ac-header">
            <div>
              <div className="ac-crumb">manage / courses</div>
              <div className="ac-title">Course <span>Manager</span></div>
            </div>
            <div className="ac-chip">{courses.length} course{courses.length !== 1 ? "s" : ""}</div>
          </div>

          <div className="ac-filters">
            {(["All", ...CATEGORIES] as const).map(cat => (
              <button key={cat} className={`ac-filter-btn${filterCat === cat ? " active" : ""}`}
                onClick={() => setFilterCat(cat as CourseCategory | "All")}>{cat}</button>
            ))}
          </div>

          <div className="ac-layout">

            {/* ── LEFT ── */}
            <div>
              <div className="ac-sec-label">published courses ({filtered.length})</div>
              {loading ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[1,2,3].map(i => <div key={i} className="ac-skeleton" />)}
                </div>
              ) : filtered.length === 0 ? (
                <div className="ac-empty">
                  <div className="ac-empty-icon">⬡</div>
                  <div className="ac-empty-txt">{courses.length === 0 ? "no courses yet — add one using the form" : "no courses in this category"}</div>
                </div>
              ) : (
                <div className="ac-cards">
                  {filtered.map(c => {
                    const lc = levelColors[c.level];
                    const cc = categoryColors[c.category];
                    const tc = c.tag && tagColors[c.tag] ? tagColors[c.tag] : null;
                    return (
                      <div key={c._id} className="ac-card">
                        <div className="ac-card-thumb" style={{ background: `linear-gradient(135deg,${c.bgFrom},${c.bgTo})` }}>
                          <span style={{ filter: "drop-shadow(0 3px 8px rgba(0,0,0,0.35))" }}>{c.icon}</span>
                          {c.tag && tc && <div className="ac-card-thumb-tag" style={{ background: tc.bg, color: tc.color }}>{c.tag}</div>}
                          {c.certificate && <div className="ac-card-thumb-cert">🏅 Cert</div>}
                        </div>
                        <div className="ac-card-body">
                          <div className="ac-card-tags">
                            <span className="ac-card-cat" style={{ background: cc.bg, color: cc.color }}>{c.category}</span>
                            <span className="ac-card-lvl" style={{ background: lc.bg, color: lc.color }}>{c.level}</span>
                            <span className="ac-card-lang">🌐 {c.language}</span>
                          </div>
                          <div className="ac-card-title">{c.title}</div>
                          <div className="ac-card-tagline">{c.tagline}</div>
                          <div className="ac-card-meta">
                            <span className="ac-card-meta-i">⭐ {c.rating}</span>
                            <span className="ac-card-meta-i">📚 {c.features.length} features</span>
                          </div>
                        </div>
                        <div className="ac-card-actions">
                          <button className="ac-card-btn del" onClick={() => setDeleteConfirm(c._id)} title="Delete">✕</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ── RIGHT: form ── */}
            <div className="ac-panel">
              <div className="ac-panel-head">
                <div className="ac-panel-head-row">
                  <div>
                    <div className="ac-panel-label">new course</div>
                    <div className="ac-panel-title">Create &amp; Publish</div>
                  </div>
                  <div className="ac-dot" />
                </div>
                <div className="ac-tabs">
                  {(["basic", "details"] as const).map(t => (
                    <button key={t} className={`ac-tab${tab === t ? " on" : ""}`} onClick={() => setTab(t)}>
                      {t === "basic" ? "Basic" : "Details"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="ac-fbody">
                {tab === "basic" && <>
                  <div>
                    <label className="ac-lbl">card gradient</label>
                    <div className="ac-grad-row">
                      {GRADIENTS.map((g, i) => (
                        <div key={i} className={`ac-grad-sw${form.bgFrom === g.from ? " on" : ""}`}
                          style={{ background: `linear-gradient(135deg,${g.from},${g.to})` }}
                          onClick={() => setForm(f => ({ ...f, bgFrom: g.from, bgTo: g.to }))} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="ac-lbl">icon emoji</label>
                    <div className="ac-emoji-row">
                      {EMOJIS.map(e => (
                        <button key={e} type="button" className={`ac-emo${form.icon === e ? " on" : ""}`}
                          onClick={() => setForm(f => ({ ...f, icon: e }))}>{e}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="ac-lbl">badge tag</label>
                    <div className="ac-tag-row">
                      {TAGS.map(t => {
                        const tc = t && tagColors[t];
                        const isOn = form.tag === t;
                        return (
                          <button key={t} type="button" className="ac-tag-pill"
                            style={isOn && tc ? { background: `${tc.bg}22`, borderColor: tc.bg, color: tc.bg } :
                              isOn ? { background: "var(--sf2)", borderColor: "var(--bd2)", color: "var(--tx)" } : {}}
                            onClick={() => setForm(f => ({ ...f, tag: t }))}>{t || "None"}</button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <label className="ac-lbl">category</label>
                    <select className="ac-sel" value={form.category}
                      onChange={e => setForm(f => ({ ...f, category: e.target.value as CourseCategory }))}>
                      {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="ac-row2">
                    <div>
                      <label className="ac-lbl">level</label>
                      <select className="ac-sel" value={form.level}
                        onChange={e => setForm(f => ({ ...f, level: e.target.value as Level }))}>
                        {LEVELS.map(l => <option key={l}>{l}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="ac-lbl">language</label>
                      <select className="ac-sel" value={form.language}
                        onChange={e => setForm(f => ({ ...f, language: e.target.value }))}>
                        {LANGUAGES.map(l => <option key={l}>{l}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="ac-lbl">title</label>
                    <input type="text" className={`ac-inp${errors.title ? " err" : ""}`}
                      placeholder="e.g. Spoken English Foundation"
                      value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
                    {errors.title && <div className="ac-err">⚠ {errors.title}</div>}
                  </div>
                  <div>
                    <label className="ac-lbl">tagline</label>
                    <input type="text" className={`ac-inp${errors.tagline ? " err" : ""}`}
                      placeholder="e.g. Start speaking with confidence"
                      value={form.tagline} onChange={e => setForm(f => ({ ...f, tagline: e.target.value }))} />
                    {errors.tagline && <div className="ac-err">⚠ {errors.tagline}</div>}
                  </div>
                  <div>
                    <label className="ac-lbl">description</label>
                    <textarea rows={3} className={`ac-ta${errors.desc ? " err" : ""}`}
                      placeholder="Short course description..."
                      value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} />
                    {errors.desc && <div className="ac-err">⚠ {errors.desc}</div>}
                  </div>
                  <div className="ac-tog-row">
                    <div>
                      <div className="ac-tog-name">Certificate</div>
                      <div className="ac-tog-sub">Show certificate badge on card</div>
                    </div>
                    <label className="ac-tog">
                      <input type="checkbox" checked={form.certificate}
                        onChange={e => setForm(f => ({ ...f, certificate: e.target.checked }))} />
                      <div className="ac-tog-track" /><div className="ac-tog-thumb" />
                    </label>
                  </div>

                  {/* Live preview in Basic tab */}
                  <div>
                    <label className="ac-lbl">live preview</label>
                    <div className="ac-preview">
                      <div className="ac-preview-thumb" style={{ background: `linear-gradient(135deg,${form.bgFrom},${form.bgTo})` }}>
                        <span style={{ filter: "drop-shadow(0 3px 8px rgba(0,0,0,0.3))" }}>{form.icon}</span>
                        {form.tag && tagColors[form.tag] && (
                          <div style={{ position: "absolute", top: 7, right: 7, background: tagColors[form.tag].bg, color: tagColors[form.tag].color, fontFamily: "'JetBrains Mono',monospace", fontSize: 7, fontWeight: 700, padding: "2px 6px", borderRadius: 4, textTransform: "uppercase" }}>{form.tag}</div>
                        )}
                        {form.certificate && (
                          <div style={{ position: "absolute", bottom: 7, left: 7, fontFamily: "'JetBrains Mono',monospace", fontSize: 7, background: "rgba(110,231,247,0.15)", color: "var(--ac)", border: "1px solid rgba(110,231,247,0.2)", padding: "2px 6px", borderRadius: 4 }}>🏅 Certificate</div>
                        )}
                      </div>
                      <div className="ac-preview-body">
                        <div className="ac-preview-title">{form.title || "Course Title"}</div>
                        <div className="ac-preview-tagline">{form.tagline || "Tagline goes here"}</div>
                      </div>
                    </div>
                  </div>
                </>}

                {tab === "details" && <>
                  <div>
                    <label className="ac-lbl">rating</label>
                    <div className="ac-emoji-row">
                      {[4.0, 4.5, 4.6, 4.7, 4.8, 4.9, 5.0].map(r => (
                        <button key={r} type="button" className="ac-emo"
                          style={form.rating === r ? { background: "rgba(251,191,36,0.15)", borderColor: "rgba(251,191,36,0.4)" } : {}}
                          onClick={() => setForm(f => ({ ...f, rating: r }))}>
                          <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono',monospace", color: form.rating === r ? "#fbbf24" : "var(--mu)" }}>{r}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="ac-lbl">features (what you'll learn)</label>
                    {form.features.length > 0 && (
                      <div className="ac-feat-list">
                        {form.features.map((feat, i) => (
                          <div key={i} className="ac-feat-item">
                            <span>✓ {feat}</span>
                            <button className="ac-feat-rm" onClick={() => removeFeature(i)}>✕</button>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="ac-feat-add">
                      <input type="text" className="ac-inp" placeholder="e.g. Daily live sessions"
                        value={featureInput} onChange={e => setFeatureInput(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && addFeature()} />
                      <button className="ac-feat-add-btn" onClick={addFeature}>+ Add</button>
                    </div>
                  </div>
                </>}
              </div>

              <div className="ac-footer">
                <button className="ac-btn-pub" onClick={handleSubmit} disabled={saving}>
                  {saving ? "Saving…" : "⬡  Publish Course"}
                </button>
                {form.title && <button className="ac-btn-can" onClick={handleCancel}>✕</button>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {deleteConfirm && (
        <div className="ac-modal-bg">
          <div className="ac-modal">
            <div className="ac-modal-icon">⚠</div>
            <div className="ac-modal-title">Delete this course?</div>
            <div className="ac-modal-desc">This cannot be undone. The course will be permanently removed.</div>
            <div className="ac-modal-row">
              <button className="ac-btn-del" onClick={() => handleDelete(deleteConfirm)}>Delete</button>
              <button className="ac-btn-can" style={{ flex: 1 }} onClick={() => setDeleteConfirm(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="ac-toast">
          <div className="ac-toast-dot" />{toast}
        </div>
      )}
    </>
  );
}