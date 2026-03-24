import { useState } from "react";

const SECTIONS = ["Overview", "Build", "Acquisition", "Economics", "Notes"];

const buildSteps = [
  { id: "site", label: "Site Live", sublabel: "migratio.com.au", done: true, category: "Frontend" },
  { id: "form", label: "Quote Form", sublabel: "/get-quotes — 11 steps", done: true, category: "Frontend" },
  { id: "database", label: "Database", sublabel: "briefs, brief_agents, admin_log", done: true, category: "Backend" },
  { id: "edge", label: "Edge Functions", sublabel: "submit-brief, create-checkout, stripe-webhook", done: false, category: "Backend" },
  { id: "secrets", label: "Secret Keys", sublabel: "Stripe, Resend, Anthropic", done: false, category: "Backend" },
  { id: "stripe", label: "Stripe Webhook", sublabel: "checkout.session.completed", done: false, category: "Payments" },
  { id: "emails", label: "Email Domain", sublabel: "hello@migratio.com.au via Resend", done: false, category: "Email" },
  { id: "ads", label: "Google Ads", sublabel: "1,199 keywords · 4 campaigns", done: false, category: "Traffic" },
  { id: "first", label: "First Lead Purchased", sublabel: "$75 AUD", done: false, category: "Revenue" },
];

const acquisitionSteps = [
  { label: "Ad Click", who: "Applicant", status: "pending" },
  { label: "Homepage", who: "Applicant", status: "live" },
  { label: "Quote Form", who: "Applicant", status: "live" },
  { label: "Brief Created + Claude Summary", who: "System", status: "pending" },
  { label: "Applicant Email (pathway + docs)", who: "System", status: "pending" },
  { label: "Agent Notified (3 matched)", who: "System", status: "pending" },
  { label: "Agent Pays $75", who: "Agent", status: "pending" },
  { label: "Full Brief Unlocked", who: "System", status: "pending" },
  { label: "Applicant Chooses Agent", who: "Applicant", status: "pending" },
];

const economics = [
  { label: "CPC (target)", value: "$1.00–1.50", note: "Agent name intercept ~$0.75" },
  { label: "Form conversion", value: "7%", note: "Est. — validate with real traffic" },
  { label: "Cost per applicant", value: "~$21", note: "$1 CPC ÷ 7% conversion" },
  { label: "Revenue per applicant", value: "$75–225", note: "1–3 agents purchasing" },
  { label: "Target leads/month", value: "40", note: "To hit $6k Migratio revenue" },
  { label: "Ad spend needed", value: "~$840/mo", note: "40 leads × $21 CAC" },
  { label: "Combined target", value: "$13,920/mo", note: "CaseDraft $7,920 + Migratio $6,000" },
];

const notes = [
  { date: "Mar 24", text: "SQL migration run — database tables live in Supabase.", tag: "Backend" },
  { date: "Mar 24", text: "New React build deployed to Netlify from skylanternmedia01-a11y/migratio. Build errors fixed (vite-env.d.ts, generateSitemap.ts).", tag: "Frontend" },
  { date: "Mar 24", text: "Agent email copy fixed — urgency is '3 spots available' not 'first in wins'. Applicant chooses agent.", tag: "Product" },
  { date: "Mar 23", text: "72 SEO articles merged into build. Blog live at /blog.", tag: "SEO" },
  { date: "Mar 22", text: "MARA register scrape complete. 5,081 agents. Agent Name Intercept campaign built.", tag: "Ads" },
];

const tagColors = {
  Backend: "#3b82f6", Frontend: "#22c55e", Product: "#C4623A",
  SEO: "#a855f7", Ads: "#f97316", Revenue: "#ef4444",
};

const whoColors = { Applicant: "#3b82f6", System: "#a855f7", Agent: "#22c55e" };

const T = "#C4623A";

export default function Dashboard() {
  const [section, setSection] = useState("Overview");
  const [expandNote, setExpandNote] = useState(null);

  const doneBuild = buildSteps.filter(s => s.done).length;
  const pct = Math.round((doneBuild / buildSteps.length) * 100);

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: "#FAF7F2", minHeight: "100vh" }}>

      {/* Top bar */}
      <div style={{ background: "#1a1a1a", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: T, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, color: "white" }}>M</div>
          <span style={{ fontWeight: 700, fontSize: 16, color: "white", letterSpacing: "-0.3px" }}>Migratio</span>
          <span style={{ fontSize: 12, color: "#666", marginLeft: 4 }}>Dashboard</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e" }} />
          <span style={{ fontSize: 12, color: "#aaa" }}>migratio.com.au live</span>
        </div>
      </div>

      {/* Nav */}
      <div style={{ background: "white", borderBottom: "1px solid #ece7df", padding: "0 24px", display: "flex", gap: 0, overflowX: "auto" }}>
        {SECTIONS.map(s => (
          <button key={s} onClick={() => setSection(s)} style={{
            background: "none", border: "none", padding: "14px 16px",
            fontSize: 13, fontWeight: section === s ? 700 : 500,
            color: section === s ? T : "#888",
            borderBottom: section === s ? `2px solid ${T}` : "2px solid transparent",
            cursor: "pointer", whiteSpace: "nowrap",
          }}>{s}</button>
        ))}
      </div>

      <div style={{ padding: "24px 16px", maxWidth: 720, margin: "0 auto" }}>

        {/* OVERVIEW */}
        {section === "Overview" && (
          <div>
            {/* Stat cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 24 }}>
              {[
                { label: "Build Progress", value: `${pct}%`, sub: `${doneBuild}/${buildSteps.length} steps`, color: T },
                { label: "Site Status", value: "Live", sub: "migratio.com.au", color: "#22c55e" },
                { label: "Leads Captured", value: "0", sub: "Form not wired yet", color: "#aaa" },
              ].map(c => (
                <div key={c.label} style={{ background: "white", border: "1.5px solid #ece7df", borderRadius: 12, padding: "16px" }}>
                  <div style={{ fontSize: 11, color: "#aaa", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 6 }}>{c.label}</div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: c.color, letterSpacing: "-1px" }}>{c.value}</div>
                  <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>{c.sub}</div>
                </div>
              ))}
            </div>

            {/* Next actions */}
            <div style={{ background: "white", border: "1.5px solid #ece7df", borderRadius: 12, padding: "20px", marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 14, color: "#1a1a1a" }}>🎯 Next 3 Actions</div>
              {[
                { n: 1, action: "Deploy Edge Functions", how: "Cowork: paste 1 instruction", tag: "Backend" },
                { n: 2, action: "Set Secret Keys", how: "Chat with Claude — 5 min", tag: "Backend" },
                { n: 3, action: "Set up Stripe Webhook", how: "Stripe dashboard — 2 clicks", tag: "Payments" },
              ].map(a => (
                <div key={a.n} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: a.n < 3 ? "1px solid #f0ece6" : "none" }}>
                  <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#fef3ee", border: `1.5px solid ${T}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: T, flexShrink: 0 }}>{a.n}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a" }}>{a.action}</div>
                    <div style={{ fontSize: 12, color: "#999" }}>{a.how}</div>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 99, background: "#fef3ee", color: T }}>{a.tag}</span>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div style={{ background: "white", border: "1.5px solid #ece7df", borderRadius: 12, padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}>Build Progress</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: T }}>{pct}%</span>
              </div>
              <div style={{ background: "#f0ece6", borderRadius: 99, height: 10, overflow: "hidden" }}>
                <div style={{ width: `${pct}%`, height: "100%", background: T, borderRadius: 99 }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                <span style={{ fontSize: 11, color: "#bbb" }}>Started</span>
                <span style={{ fontSize: 11, color: "#bbb" }}>First Revenue</span>
              </div>
            </div>
          </div>
        )}

        {/* BUILD */}
        {section === "Build" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {buildSteps.map((s, i) => (
              <div key={s.id} style={{ background: "white", border: `1.5px solid ${s.done ? "#C4623A33" : "#ece7df"}`, borderRadius: 12, padding: "14px 18px", display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: s.done ? T : "white", border: `2px solid ${s.done ? T : "#ddd"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {s.done ? <span style={{ color: "white", fontSize: 14 }}>✓</span> : <span style={{ color: "#bbb", fontSize: 12, fontWeight: 600 }}>{i + 1}</span>}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a" }}>{s.label}</div>
                  <div style={{ fontSize: 12, color: "#aaa" }}>{s.sublabel}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 99, background: s.done ? "#fef3ee" : "#f5f5f5", color: s.done ? T : "#aaa" }}>{s.done ? "Done" : "Pending"}</span>
                  <span style={{ fontSize: 11, color: "#ccc" }}>{s.category}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ACQUISITION */}
        {section === "Acquisition" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {acquisitionSteps.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 0 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 40, flexShrink: 0 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: s.status === "live" ? T : "white", border: `2px solid ${s.status === "live" ? T : "#ddd"}`, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
                    {s.status === "live" ? <span style={{ color: "white", fontSize: 13 }}>✓</span> : <span style={{ color: "#bbb", fontSize: 12, fontWeight: 600 }}>{i + 1}</span>}
                  </div>
                  {i < acquisitionSteps.length - 1 && <div style={{ width: 2, flex: 1, background: s.status === "live" ? T : "#e5e0d8", minHeight: 20 }} />}
                </div>
                <div style={{ flex: 1, marginLeft: 12, marginBottom: i < acquisitionSteps.length - 1 ? 8 : 0, background: "white", border: "1.5px solid #ece7df", borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a" }}>{s.label}</div>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: whoColors[s.who] || "#888", background: `${whoColors[s.who]}18`, padding: "2px 8px", borderRadius: 99 }}>{s.who}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ECONOMICS */}
        {section === "Economics" && (
          <div>
            <div style={{ background: "white", border: "1.5px solid #ece7df", borderRadius: 12, overflow: "hidden", marginBottom: 16 }}>
              <div style={{ padding: "14px 18px", background: "#f5f2ee", borderBottom: "1px solid #ece7df", fontSize: 12, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: "0.5px" }}>Unit Economics</div>
              {economics.map((e, i) => (
                <div key={i} style={{ padding: "14px 18px", borderBottom: i < economics.length - 1 ? "1px solid #f0ece6" : "none", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a" }}>{e.label}</div>
                    <div style={{ fontSize: 12, color: "#aaa" }}>{e.note}</div>
                  </div>
                  <span style={{ fontSize: 16, fontWeight: 700, color: T }}>{e.value}</span>
                </div>
              ))}
            </div>
            <div style={{ background: "#fef3ee", border: `1.5px solid ${T}33`, borderRadius: 12, padding: "16px 18px" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: T, marginBottom: 4 }}>90-day target</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#1a1a1a", letterSpacing: "-0.5px" }}>$13,920/month</div>
              <div style={{ fontSize: 12, color: "#999", marginTop: 4 }}>CaseDraft 80 subs ($7,920) + Migratio 40 leads ($6,000)</div>
            </div>
          </div>
        )}

        {/* NOTES */}
        {section === "Notes" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {notes.map((n, i) => (
              <div key={i} style={{ background: "white", border: "1.5px solid #ece7df", borderRadius: 12, padding: "14px 18px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 11, color: "#aaa", fontWeight: 600 }}>{n.date}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 99, background: `${tagColors[n.tag]}18`, color: tagColors[n.tag] || "#888" }}>{n.tag}</span>
                </div>
                <div style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>{n.text}</div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
