// src/app/admin/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

const stats = [
  { label: "Total Users",   value: "2,841",  delta: "+12%",  up: true,  icon: "◈" },
  { label: "Orders",        value: "1,204",  delta: "+8%",   up: true,  icon: "◫" },
  { label: "Revenue",       value: "₹80.2k", delta: "+21%",  up: true,  icon: "⬡" },
  { label: "Bounce Rate",   value: "24.6%",  delta: "-3%",   up: false, icon: "⌇" },
];


export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any)?.role !== "admin") {
    redirect(`/${process.env.ADMIN_SECRET_PATH}/login`);
  }

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400;500&display=swap');

        :root {
          --bg:      #07070f;
          --surface: rgba(255,255,255,0.03);
          --border:  rgba(255,255,255,0.07);
          --text:    #d4d2e0;
          --muted:   rgba(212,210,224,0.38);
          --accent:  #6ee7f7;
          --green:   #4ade80;
          --red:     #f87171;
          --yellow:  #fbbf24;
        }

        .dash {
          padding: 36px 40px;
          font-family: 'Syne', sans-serif;
          color: var(--text);
          min-height: 100vh;
          background: var(--bg);
        }

        /* noise */
        .dash::before {
          content: '';
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.018;
        }

        .dash-inner { position: relative; z-index: 1; max-width: 1100px; }

        /* header */
        .dash-header { margin-bottom: 36px; }
        .dash-greeting {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px; color: var(--accent); letter-spacing: 2px;
          text-transform: uppercase; margin-bottom: 8px;
          display: flex; align-items: center; gap: 8px;
        }
        .dash-greeting::before {
          content: ''; width: 20px; height: 1px;
          background: var(--accent); display: inline-block;
        }
        .dash-title {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(28px, 3vw, 38px);
          font-style: italic; font-weight: 400;
          color: #fff; letter-spacing: -0.5px; line-height: 1.1;
        }
        .dash-title span { color: var(--accent); font-style: normal; }
        .dash-sub {
          font-size: 13px; color: var(--muted); margin-top: 6px;
          font-family: 'JetBrains Mono', monospace;
        }

        /* stat cards */
        .dash-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px; margin-bottom: 28px;
        }
        @media (max-width: 900px) { .dash-stats { grid-template-columns: repeat(2,1fr); } }

        .stat-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px; padding: 22px 22px 18px;
          position: relative; overflow: hidden;
          transition: border-color 0.2s, transform 0.2s;
        }
        .stat-card:hover {
          border-color: rgba(110,231,247,0.2);
          transform: translateY(-2px);
        }
        .stat-card::after {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(110,231,247,0.2), transparent);
        }
        .stat-top {
          display: flex; justify-content: space-between;
          align-items: flex-start; margin-bottom: 14px;
        }
        .stat-icon {
          width: 36px; height: 36px; border-radius: 10px;
          background: rgba(110,231,247,0.07);
          border: 1px solid rgba(110,231,247,0.12);
          display: flex; align-items: center; justify-content: center;
          font-size: 16px; color: var(--accent);
        }
        .stat-delta {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; font-weight: 500; padding: 3px 8px;
          border-radius: 99px;
        }
        .stat-delta.up   { background: rgba(74,222,128,0.1);  color: var(--green); border: 1px solid rgba(74,222,128,0.2); }
        .stat-delta.down { background: rgba(248,113,113,0.1); color: var(--red);   border: 1px solid rgba(248,113,113,0.2); }
        .stat-value {
          font-family: 'Instrument Serif', serif;
          font-size: 32px; font-style: italic; color: #fff;
          line-height: 1; letter-spacing: -1px; margin-bottom: 4px;
        }
        .stat-label {
          font-size: 11px; color: var(--muted); font-weight: 600;
          letter-spacing: 0.3px; text-transform: uppercase;
          font-family: 'JetBrains Mono', monospace;
        }

        /* bottom grid */
        .dash-grid {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 20px;
        }
        @media (max-width: 900px) { .dash-grid { grid-template-columns: 1fr; } }

        .dash-panel {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px; overflow: hidden;
        }
        .panel-head {
          padding: 20px 24px 14px;
          border-bottom: 1px solid var(--border);
          display: flex; justify-content: space-between; align-items: center;
        }
        .panel-title {
          font-size: 13px; font-weight: 700; color: var(--text); letter-spacing: 0.2px;
        }
        .panel-badge {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px; color: var(--muted);
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--border);
          padding: 3px 10px; border-radius: 99px;
        }

        /* orders table */
        .orders-table { width: 100%; }
        .orders-row {
          display: grid;
          grid-template-columns: 90px 1fr 80px 90px 70px;
          padding: 13px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          font-size: 12px; align-items: center;
          transition: background 0.12s;
        }
        .orders-row:hover { background: rgba(255,255,255,0.02); }
        .orders-row:last-child { border-bottom: none; }
        .orders-row.head {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px; color: var(--muted); letter-spacing: 1px;
          text-transform: uppercase; padding-top: 16px; padding-bottom: 10px;
        }
        .orders-row.head:hover { background: transparent; }
        .ord-id {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; color: var(--accent);
        }
        .ord-user { color: var(--text); font-weight: 600; }
        .ord-amt {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px; color: var(--text);
        }
        .ord-status {
          display: inline-flex; padding: 3px 10px; border-radius: 99px;
          font-size: 10px; font-weight: 600; font-family: 'JetBrains Mono', monospace;
          width: fit-content;
        }
        .ord-status.Completed { background: rgba(74,222,128,0.1);  color: var(--green); border: 1px solid rgba(74,222,128,0.2); }
        .ord-status.Pending   { background: rgba(251,191,36,0.1);  color: var(--yellow);border: 1px solid rgba(251,191,36,0.2); }
        .ord-status.Failed    { background: rgba(248,113,113,0.1); color: var(--red);   border: 1px solid rgba(248,113,113,0.2); }
        .ord-time { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--muted); text-align: right; }

        /* activity panel */
        .activity-list { padding: 8px 0; }
        .activity-item {
          display: flex; gap: 14px; align-items: flex-start;
          padding: 12px 22px; border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .activity-item:last-child { border-bottom: none; }
        .act-dot {
          width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
          margin-top: 4px;
        }
        .act-dot.green  { background: var(--green);  box-shadow: 0 0 6px var(--green); }
        .act-dot.yellow { background: var(--yellow); box-shadow: 0 0 6px var(--yellow); }
        .act-dot.red    { background: var(--red);    box-shadow: 0 0 6px var(--red); }
        .act-dot.cyan   { background: var(--accent); box-shadow: 0 0 6px var(--accent); }
        .act-body { flex: 1; }
        .act-text { font-size: 12px; color: var(--text); font-weight: 500; line-height: 1.5; }
        .act-time { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--muted); margin-top: 2px; }
      `}</style>

      <div className="dash">
        <div className="dash-inner">

          {/* Header */}
          <div className="dash-header">
            <div className="dash-greeting">{greeting}</div>
            <h1 className="dash-title">
              Welcome back, <span>{session.user?.email?.split("@")[0]}</span>
            </h1>
            <p className="dash-sub">
              {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>

          {/* Stats */}
          <div className="dash-stats">
            {stats.map((s) => (
              <div key={s.label} className="stat-card">
                <div className="stat-top">
                  <div className="stat-icon">{s.icon}</div>
                  <span className={`stat-delta ${s.up ? "up" : "down"}`}>{s.delta}</span>
                </div>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Bottom grid */}
          <div className="dash-grid">

            {/* Orders table */}
            

            

          </div>
        </div>
      </div>
    </>
  );
}