"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { upload } from "@imagekit/next";

// ── Types ─────────────────────────────────────────────────────────────────────
type Category = "Events" | "Workshops" | "Achievements" | "Certificates";

interface MomentEntry {
  _id: string;
  category: Category;
  title: string;
  description: string;
  date: string;
  url: string;
}

// ── Constants ─────────────────────────────────────────────────────────────────
const CATEGORIES: Category[] = ["Events", "Workshops", "Achievements", "Certificates"];

const categoryMeta: Record<Category, { dot: string; badge: string; glow: string }> = {
  Events:       { dot: "#a78bfa", badge: "rgba(167,139,250,0.12)", glow: "rgba(167,139,250,0.25)" },
  Workshops:    { dot: "#6ee7f7", badge: "rgba(110,231,247,0.10)", glow: "rgba(110,231,247,0.25)" },
  Achievements: { dot: "#fbbf24", badge: "rgba(251,191,36,0.10)",  glow: "rgba(251,191,36,0.25)"  },
  Certificates: { dot: "#34d399", badge: "rgba(52,211,153,0.10)",  glow: "rgba(52,211,153,0.25)"  },
};

const emptyForm = () => ({
  category: "Events" as Category,
  title: "",
  description: "",
  date: "",
  imagePreview: null as string | null,
  imageUrl: "",
});

// ── Component ─────────────────────────────────────────────────────────────────
export default function AdminMoments() {
  const [form, setForm]                     = useState(emptyForm());
  const [entries, setEntries]               = useState<MomentEntry[]>([]);
  const [loading, setLoading]               = useState(true);
  const [dragOver, setDragOver]             = useState(false);
  const [errors, setErrors]                 = useState<Record<string, string>>({});
  const [toast, setToast]                   = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm]   = useState<string | null>(null);
  const [uploading, setUploading]           = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [saving, setSaving]                 = useState(false);

  const fileRef  = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // ── Toast ─────────────────────────────────────────────────────────────────
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  };

  // ── Fetch all moments on mount ────────────────────────────────────────────
  useEffect(() => { fetchMoments(); }, []);

  const fetchMoments = async () => {
    try {
      setLoading(true);
      const res  = await fetch("/api/gallery");
      const json = await res.json();
      if (json.success) setEntries(json.data);
    } catch {
      showToast("Failed to load moments");
    } finally {
      setLoading(false);
    }
  };

  // ── Upload to ImageKit ────────────────────────────────────────────────────
  const uploadToImageKit = async (file: File) => {
    setUploading(true);
    setUploadProgress(0);
    try {
      const auth = await fetch("/api/imagekit-auth").then((r) => r.json());
      abortRef.current = new AbortController();

      const result = await upload({
        file,
        fileName:        file.name,
        folder:          "/admin/gallery",
        useUniqueFileName: true,
        token:           auth.token,
        expire:          auth.expire,
        signature:       auth.signature,
        publicKey:       auth.publicKey,
        abortSignal:     abortRef.current.signal,
        onProgress: (e) => {
          if (e.lengthComputable)
            setUploadProgress(Math.round((e.loaded / e.total) * 100));
        },
      });

      setForm((f) => ({ ...f, imageUrl: result.url ?? "" }));
      setErrors((e) => { const n = { ...e }; delete n.imageUrl; return n; });
    } catch (err: any) {
      if (err?.name !== "AbortError") {
        showToast(`Upload failed: ${err?.message ?? "unknown error"}`);
        setForm((f) => ({ ...f, imageUrl: "", imagePreview: null }));
      }
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  // ── Handle file pick ──────────────────────────────────────────────────────
  const handleImageFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) =>
      setForm((f) => ({ ...f, imagePreview: e.target?.result as string, imageUrl: "" }));
    reader.readAsDataURL(file);
    uploadToImageKit(file);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleImageFile(file);
  }, []);

  // ── Validate ──────────────────────────────────────────────────────────────
  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim())       e.title       = "Title is required";
    if (!form.description.trim()) e.description = "Description is required";
    if (!form.date)               e.date        = "Date is required";
    if (!form.imageUrl)           e.imageUrl    = uploading
      ? "Please wait — image is still uploading"
      : "Please upload an image";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Submit (POST only) ────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      const res  = await fetch("/api/gallery", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url:         form.imageUrl,
          title:       form.title,
          description: form.description,
          category:    form.category,
          date:        form.date,
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      setEntries((prev) => [json.data, ...prev]);
      setForm(emptyForm());
      setErrors({});
      showToast("Moment published");
    } catch (err: any) {
      showToast(err.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  // ── Delete ────────────────────────────────────────────────────────────────
  const handleDelete = async (id: string) => {
    try {
      const res  = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      setEntries((prev) => prev.filter((e) => e._id !== id));
      setDeleteConfirm(null);
      showToast("Moment deleted");
    } catch (err: any) {
      showToast(err.message || "Delete failed");
    }
  };

  // ── Cancel upload ─────────────────────────────────────────────────────────
  const handleCancel = () => {
    abortRef.current?.abort();
    setForm(emptyForm());
    setErrors({});
    setUploading(false);
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap');
        :root {
          --bg: #07070f; --surface: rgba(255,255,255,0.03); --surface2: rgba(255,255,255,0.055);
          --border: rgba(255,255,255,0.07); --border2: rgba(255,255,255,0.11);
          --text: #d4d2e0; --muted: rgba(212,210,224,0.38); --accent: #6ee7f7;
        }
        .am * { box-sizing: border-box; }
        .am { min-height: 100vh; background: var(--bg); font-family: 'Syne', sans-serif; color: var(--text); position: relative; }
        .am::before {
          content: ''; position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background: radial-gradient(ellipse 60% 40% at 70% 10%, rgba(110,231,247,0.04) 0%, transparent 70%),
                      radial-gradient(ellipse 40% 30% at 20% 80%, rgba(167,139,250,0.04) 0%, transparent 70%);
        }
        .am-inner { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; padding: 36px 28px; }

        .am-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 32px; padding-bottom: 24px; border-bottom: 1px solid var(--border); }
        .am-breadcrumb { font-family: 'JetBrains Mono', monospace; font-size: 9px; font-weight: 500; letter-spacing: 2.5px; color: var(--muted); text-transform: uppercase; margin-bottom: 6px; }
        .am-page-title { font-size: 22px; font-weight: 800; color: var(--text); letter-spacing: -0.3px; line-height: 1; }
        .am-page-title span { color: var(--accent); }
        .am-count-chip { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--muted); background: var(--surface); border: 1px solid var(--border); padding: 5px 12px; border-radius: 8px; }

        .am-grid { display: grid; grid-template-columns: 1fr 380px; gap: 24px; align-items: start; }
        @media (max-width: 900px) { .am-grid { grid-template-columns: 1fr; } }

        .am-sec-label { font-family: 'JetBrains Mono', monospace; font-size: 9px; font-weight: 500; letter-spacing: 2px; color: var(--muted); text-transform: uppercase; margin-bottom: 14px; }

        .am-empty { border: 1px dashed var(--border2); border-radius: 16px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 64px 24px; color: var(--muted); text-align: center; gap: 10px; }
        .am-empty-icon { font-size: 28px; opacity: 0.3; }
        .am-empty-text { font-family: 'JetBrains Mono', monospace; font-size: 11px; }

        .am-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 12px; }
        .am-card { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; transition: all 0.2s; position: relative; }
        .am-card:hover { border-color: var(--border2); background: var(--surface2); transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,0,0,0.45); }
        .am-card-img { height: 130px; position: relative; overflow: hidden; background: rgba(255,255,255,0.025); display: flex; align-items: center; justify-content: center; }
        .am-card-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
        .am-card:hover .am-card-img img { transform: scale(1.05); }
        .am-card-actions { position: absolute; top: 8px; right: 8px; display: flex; gap: 5px; opacity: 0; transition: opacity 0.15s; }
        .am-card:hover .am-card-actions { opacity: 1; }
        .am-card-btn { width: 26px; height: 26px; background: rgba(7,7,15,0.85); backdrop-filter: blur(8px); border: 1px solid var(--border2); border-radius: 7px; display: flex; align-items: center; justify-content: center; font-size: 11px; cursor: pointer; color: var(--muted); transition: all 0.15s; }
        .am-card-btn.del:hover { color: #f87171; border-color: rgba(248,113,113,0.3); }
        .am-card-body { padding: 11px 13px; }
        .am-card-meta { display: flex; align-items: center; justify-content: space-between; margin-bottom: 7px; }
        .am-card-badge { font-family: 'JetBrains Mono', monospace; font-size: 8px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; padding: 3px 8px; border-radius: 5px; }
        .am-card-date { font-family: 'JetBrains Mono', monospace; font-size: 9px; color: var(--muted); }
        .am-card-title { font-size: 12px; font-weight: 700; color: var(--text); line-height: 1.3; margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .am-card-desc { font-size: 11px; color: var(--muted); line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

        .am-form-panel { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; position: sticky; top: 24px; }
        .am-form-head { padding: 18px 20px 16px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
        .am-form-head-label { font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 2px; color: var(--muted); text-transform: uppercase; margin-bottom: 3px; }
        .am-form-head-title { font-size: 14px; font-weight: 700; color: var(--text); }
        .am-form-status { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 8px var(--accent); animation: sbpulse 2s infinite; }
        @keyframes sbpulse { 0%,100% { opacity: 1; } 50% { opacity: 0.35; } }

        .am-form-body { padding: 20px; display: flex; flex-direction: column; gap: 17px; }

        .am-upload-zone { height: 155px; border-radius: 12px; border: 1px dashed var(--border2); display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; overflow: hidden; position: relative; background: rgba(255,255,255,0.015); }
        .am-upload-zone:hover, .am-upload-zone.drag { border-color: rgba(110,231,247,0.35); background: rgba(110,231,247,0.04); }
        .am-upload-zone.error { border-color: rgba(248,113,113,0.35); background: rgba(248,113,113,0.03); }
        .am-upload-zone.uploading { border-color: rgba(110,231,247,0.35); cursor: default; }
        .am-upload-zone img { width: 100%; height: 100%; object-fit: cover; }
        .am-upload-overlay { position: absolute; inset: 0; background: rgba(7,7,15,0.7); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.2s; }
        .am-upload-zone:not(.uploading):hover .am-upload-overlay { opacity: 1; }
        .am-upload-overlay-text { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--accent); letter-spacing: 1.5px; }
        .am-upload-icon { font-size: 22px; margin-bottom: 8px; opacity: 0.4; }
        .am-upload-hint { font-size: 11px; color: var(--muted); text-align: center; line-height: 1.7; }
        .am-upload-hint em { color: var(--accent); font-style: normal; }
        .am-progress-bar-wrap { position: absolute; bottom: 0; left: 0; right: 0; height: 3px; background: rgba(255,255,255,0.06); }
        .am-progress-bar { height: 100%; background: linear-gradient(90deg, #6ee7f7, #a78bfa); transition: width 0.3s ease; }

        .am-field-label { font-family: 'JetBrains Mono', monospace; font-size: 9px; font-weight: 500; letter-spacing: 2px; color: var(--muted); text-transform: uppercase; display: block; margin-bottom: 8px; }
        .am-error { font-family: 'JetBrains Mono', monospace; font-size: 9px; color: #f87171; margin-top: 5px; letter-spacing: 0.5px; }

        .am-cat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
        .am-cat-btn { display: flex; align-items: center; gap: 8px; padding: 9px 12px; border-radius: 9px; border: 1px solid var(--border); background: transparent; cursor: pointer; font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 600; color: var(--muted); transition: all 0.15s; text-align: left; }
        .am-cat-btn:hover { border-color: var(--border2); color: var(--text); background: var(--surface2); }
        .am-cat-btn.active { color: var(--text); }
        .am-cat-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }

        .am-input, .am-textarea { width: 100%; padding: 10px 13px; background: rgba(255,255,255,0.025); border: 1px solid var(--border); border-radius: 10px; outline: none; font-family: 'Syne', sans-serif; font-size: 12px; color: var(--text); transition: all 0.15s; caret-color: var(--accent); }
        .am-input::placeholder, .am-textarea::placeholder { color: rgba(212,210,224,0.2); }
        .am-input:focus, .am-textarea:focus { border-color: rgba(110,231,247,0.3); background: rgba(110,231,247,0.03); box-shadow: 0 0 0 3px rgba(110,231,247,0.06); }
        .am-input.err, .am-textarea.err { border-color: rgba(248,113,113,0.35); }
        .am-textarea { resize: none; line-height: 1.6; }
        .am-input[type="month"]::-webkit-calendar-picker-indicator { filter: invert(0.45); cursor: pointer; }

        .am-actions { display: flex; gap: 8px; }
        .am-btn-primary { flex: 1; padding: 11px; background: rgba(110,231,247,0.08); border: 1px solid rgba(110,231,247,0.22); border-radius: 10px; cursor: pointer; font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 700; color: var(--accent); letter-spacing: 0.3px; transition: all 0.15s; }
        .am-btn-primary:hover:not(:disabled) { background: rgba(110,231,247,0.14); border-color: rgba(110,231,247,0.38); box-shadow: 0 0 20px rgba(110,231,247,0.08); }
        .am-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
        .am-btn-cancel { padding: 11px 14px; background: transparent; border: 1px solid var(--border); border-radius: 10px; cursor: pointer; font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--muted); transition: all 0.15s; }
        .am-btn-cancel:hover { border-color: var(--border2); color: var(--text); background: var(--surface2); }

        .am-modal-bg { position: fixed; inset: 0; z-index: 100; background: rgba(0,0,0,0.72); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; padding: 24px; }
        .am-modal { background: #0c0b18; border: 1px solid var(--border2); border-radius: 16px; padding: 28px; width: 100%; max-width: 340px; }
        .am-modal-icon { font-size: 26px; margin-bottom: 12px; opacity: 0.8; }
        .am-modal-title { font-size: 15px; font-weight: 700; color: var(--text); margin-bottom: 6px; }
        .am-modal-desc { font-size: 12px; color: var(--muted); margin-bottom: 22px; line-height: 1.6; }
        .am-modal-actions { display: flex; gap: 8px; }
        .am-btn-danger { flex: 1; padding: 10px; background: rgba(248,113,113,0.09); border: 1px solid rgba(248,113,113,0.22); border-radius: 9px; cursor: pointer; font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 700; color: #f87171; transition: all 0.15s; }
        .am-btn-danger:hover { background: rgba(248,113,113,0.16); }

        .am-toast { position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%); z-index: 200; background: #0c0b18; border: 1px solid var(--border2); padding: 10px 20px; border-radius: 99px; font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--accent); letter-spacing: 0.5px; box-shadow: 0 8px 32px rgba(0,0,0,0.5), 0 0 16px rgba(110,231,247,0.08); display: flex; align-items: center; gap: 8px; white-space: nowrap; }
        .am-toast-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 6px var(--accent); }

        .am-skeleton { background: linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.03) 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; border-radius: 14px; height: 200px; }
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
      `}</style>

      <div className="am">
        <div className="am-inner">

          {/* ── Header ── */}
          <div className="am-header">
            <div className="am-header-left">
              <div className="am-breadcrumb">manage / gallery</div>
              <div className="am-page-title">Browse <span>Moments</span></div>
            </div>
            <div className="am-count-chip">{entries.length} moment{entries.length !== 1 ? "s" : ""}</div>
          </div>

          <div className="am-grid">

            {/* ── LEFT — Cards ── */}
            <div>
              <div className="am-sec-label">uploaded moments</div>

              {loading ? (
                <div className="am-cards">
                  {[1, 2, 3].map((i) => <div key={i} className="am-skeleton" />)}
                </div>
              ) : entries.length === 0 ? (
                <div className="am-empty">
                  <div className="am-empty-icon">◈</div>
                  <div className="am-empty-text">no moments yet — use the form to publish one</div>
                </div>
              ) : (
                <div className="am-cards">
                  {entries.map((entry) => {
                    const m = categoryMeta[entry.category];
                    return (
                      <div key={entry._id} className="am-card">
                        <div className="am-card-img">
                          {entry.url
                            ? <img src={entry.url} alt={entry.title} />
                            : <span style={{ color: "var(--muted)", fontSize: 22, opacity: 0.4 }}>◈</span>
                          }
                          {/* ✅ Delete only — no edit button */}
                          <div className="am-card-actions">
                            <button
                              className="am-card-btn del"
                              onClick={() => setDeleteConfirm(entry._id)}
                            >✕</button>
                          </div>
                        </div>
                        <div className="am-card-body">
                          <div className="am-card-meta">
                            <span className="am-card-badge" style={{ background: m.badge, color: m.dot }}>{entry.category}</span>
                            <span className="am-card-date">{entry.date}</span>
                          </div>
                          <div className="am-card-title">{entry.title}</div>
                          <div className="am-card-desc">{entry.description}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ── RIGHT — Form (create only) ── */}
            <div className="am-form-panel">
              <div className="am-form-head">
                <div>
                  <div className="am-form-head-label">new moment</div>
                  <div className="am-form-head-title">Upload & Publish</div>
                </div>
                <div className="am-form-status" />
              </div>

              <div className="am-form-body">

                {/* Image Upload */}
                <div>
                  <label className="am-field-label">
                    cover image
                    {uploading && <span style={{ color: "var(--accent)", marginLeft: 8 }}>uploading {uploadProgress}%…</span>}
                    {!uploading && form.imageUrl && <span style={{ color: "#34d399", marginLeft: 8 }}>✓ ready</span>}
                  </label>
                  <div
                    className={[
                      "am-upload-zone",
                      dragOver        ? "drag"      : "",
                      errors.imageUrl ? "error"     : "",
                      uploading       ? "uploading" : "",
                    ].join(" ")}
                    onClick={() => !uploading && fileRef.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={onDrop}
                  >
                    {form.imagePreview ? (
                      <>
                        <img src={form.imagePreview} alt="preview" />
                        {!uploading && (
                          <div className="am-upload-overlay">
                            <span className="am-upload-overlay-text">CHANGE IMAGE</span>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="am-upload-icon">⬡</div>
                        <div className="am-upload-hint">Drop image here or <em>browse</em><br />PNG · JPG · WEBP</div>
                      </>
                    )}
                    {uploading && (
                      <div className="am-progress-bar-wrap">
                        <div className="am-progress-bar" style={{ width: `${uploadProgress}%` }} />
                      </div>
                    )}
                  </div>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => e.target.files?.[0] && handleImageFile(e.target.files[0])}
                  />
                  {errors.imageUrl && <div className="am-error">⚠ {errors.imageUrl}</div>}
                </div>

                {/* Category */}
                <div>
                  <label className="am-field-label">category</label>
                  <div className="am-cat-grid">
                    {CATEGORIES.map((cat) => {
                      const m = categoryMeta[cat];
                      const active = form.category === cat;
                      return (
                        <button key={cat} type="button"
                          className={`am-cat-btn${active ? " active" : ""}`}
                          style={active ? { background: m.badge, borderColor: m.glow } : {}}
                          onClick={() => setForm((f) => ({ ...f, category: cat }))}
                        >
                          <span className="am-cat-dot" style={{ background: m.dot, boxShadow: active ? `0 0 6px ${m.dot}` : "none" }} />
                          {cat}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="am-field-label">title</label>
                  <input type="text"
                    className={`am-input${errors.title ? " err" : ""}`}
                    placeholder="e.g. IELTS Seminar 2024"
                    value={form.title}
                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  />
                  {errors.title && <div className="am-error">⚠ {errors.title}</div>}
                </div>

                {/* Description */}
                <div>
                  <label className="am-field-label">description</label>
                  <textarea rows={3}
                    className={`am-textarea${errors.description ? " err" : ""}`}
                    placeholder="Short description of this moment..."
                    value={form.description}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  />
                  {errors.description && <div className="am-error">⚠ {errors.description}</div>}
                </div>

                {/* Date */}
                <div>
                  <label className="am-field-label">date</label>
                  <input type="month"
                    className={`am-input${errors.date ? " err" : ""}`}
                    value={form.date}
                    onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  />
                  {errors.date && <div className="am-error">⚠ {errors.date}</div>}
                </div>

                {/* Actions */}
                <div className="am-actions">
                  <button
                    className="am-btn-primary"
                    onClick={handleSubmit}
                    disabled={uploading || saving}
                  >
                    {saving ? "Saving…" : "⬡  Publish Moment"}
                  </button>
                  {(form.title || form.description || form.imagePreview) && (
                    <button className="am-btn-cancel" onClick={handleCancel}>✕</button>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Delete Modal ── */}
      {deleteConfirm && (
        <div className="am-modal-bg">
          <div className="am-modal">
            <div className="am-modal-icon">⚠</div>
            <div className="am-modal-title">Delete this moment?</div>
            <div className="am-modal-desc">This cannot be undone. The entry will be permanently removed from the gallery.</div>
            <div className="am-modal-actions">
              <button className="am-btn-danger" onClick={() => handleDelete(deleteConfirm)}>Delete</button>
              <button className="am-btn-cancel" style={{ flex: 1 }} onClick={() => setDeleteConfirm(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Toast ── */}
      {toast && (
        <div className="am-toast">
          <div className="am-toast-dot" />
          {toast}
        </div>
      )}
    </>
  );
}