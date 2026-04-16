import { useNavigate } from "react-router-dom"
import Layout from "../components/Layout"

const quickLinks = [
  { label: "Employee Management", path: "/employees", icon: "👥", color: "#2563eb", bg: "#eff6ff" },
  { label: "e-Leave",             path: "/leave",      icon: "📅", color: "#16a34a", bg: "#dcfce7" },
  { label: "Attendance",          path: "/attendance", icon: "⏱️", color: "#d97706", bg: "#fef3c7" },
  { label: "Payroll",             path: "/payroll",    icon: "💰", color: "#7c3aed", bg: "#ede9fe" },
  { label: "Claims",              path: "/claims",     icon: "🧾", color: "#0891b2", bg: "#cffafe" },
  { label: "Incidents",           path: "/incidents",  icon: "⚠️", color: "#dc2626", bg: "#fee2e2" },
  { label: "Documents",           path: "/documents",  icon: "📄", color: "#059669", bg: "#d1fae5" },
  { label: "Forum",               path: "/forum",      icon: "💬", color: "#c2410c", bg: "#ffedd5" },
]

function StatCard({ icon, label, value, color }) {
  return (
    <div style={{
      background: "white", borderRadius: "12px", padding: "20px 24px",
      display: "flex", alignItems: "center", gap: "16px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.08)"
    }}>
      <div style={{
        width: "48px", height: "48px", borderRadius: "10px",
        background: color + "20", display: "flex", alignItems: "center",
        justifyContent: "center", fontSize: "22px", flexShrink: 0
      }}>{icon}</div>
      <div>
        <div style={{ fontSize: "24px", fontWeight: "700", color: "#1e293b" }}>{value}</div>
        <div style={{ fontSize: "13px", color: "#64748b" }}>{label}</div>
      </div>
    </div>
  )
}

function Dashboard({ user, onLogout }) {
  const navigate = useNavigate()
  const employees = JSON.parse(localStorage.getItem("employees") || "[]")
  const leaves    = JSON.parse(localStorage.getItem("hr_leaves") || "[]")
  const claims    = JSON.parse(localStorage.getItem("hr_claims") || "[]")
  const incidents = JSON.parse(localStorage.getItem("hr_incidents") || "[]")

  const pendingLeaves  = leaves.filter(l => l.status === "Pending").length
  const pendingClaims  = claims.filter(c => c.status === "Pending").length
  const openIncidents  = incidents.filter(i => i.status === "Open").length

  const today = new Date()
  const greetHour = today.getHours()
  const greet = greetHour < 12 ? "Good morning" : greetHour < 17 ? "Good afternoon" : "Good evening"

  return (
    <Layout onLogout={onLogout}>
      <div style={{
        background: "linear-gradient(135deg, #1e293b 0%, #2563eb 100%)",
        borderRadius: "16px", padding: "28px 32px", color: "white", marginBottom: "24px"
      }}>
        <div style={{ fontSize: "22px", fontWeight: "700" }}>
          {greet}, {user?.name || "Admin"} 👋
        </div>
        <div style={{ color: "#bfdbfe", fontSize: "14px", marginTop: "4px" }}>
          {today.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </div>
        <div style={{ display: "flex", gap: "20px", marginTop: "20px", flexWrap: "wrap" }}>
          {pendingLeaves > 0 && <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: "8px", padding: "8px 16px", fontSize: "13px" }}>
            📅 {pendingLeaves} pending leave{pendingLeaves > 1 ? "s" : ""}
          </div>}
          {pendingClaims > 0 && <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: "8px", padding: "8px 16px", fontSize: "13px" }}>
            🧾 {pendingClaims} pending claim{pendingClaims > 1 ? "s" : ""}
          </div>}
          {openIncidents > 0 && <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: "8px", padding: "8px 16px", fontSize: "13px" }}>
            ⚠️ {openIncidents} open incident{openIncidents > 1 ? "s" : ""}
          </div>}
          {pendingLeaves === 0 && pendingClaims === 0 && openIncidents === 0 && (
            <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: "8px", padding: "8px 16px", fontSize: "13px" }}>
              ✅ All caught up!
            </div>
          )}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "24px" }}>
        <StatCard icon="👥" label="Total Employees" value={employees.length || 0} color="#2563eb" />
        <StatCard icon="📅" label="Pending Leaves"  value={pendingLeaves}         color="#16a34a" />
        <StatCard icon="🧾" label="Pending Claims"  value={pendingClaims}         color="#d97706" />
        <StatCard icon="⚠️" label="Open Incidents"  value={openIncidents}         color="#dc2626" />
      </div>

      <div style={{ marginBottom: "24px" }}>
        <h3 style={{ margin: "0 0 16px", color: "#1e293b", fontWeight: "600", fontSize: "16px" }}>Quick Access</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "12px" }}>
          {quickLinks.map(link => (
            <div key={link.path}
              onClick={() => navigate(link.path)}
              style={{
                background: "white", borderRadius: "12px", padding: "20px",
                cursor: "pointer", display: "flex", flexDirection: "column",
                alignItems: "center", gap: "10px", textAlign: "center",
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)", transition: "all 0.15s",
                border: "1px solid #f1f5f9"
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)" }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.08)" }}
            >
              <div style={{
                width: "48px", height: "48px", borderRadius: "12px",
                background: link.bg, display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "22px"
              }}>{link.icon}</div>
              <div style={{ fontSize: "13px", fontWeight: "500", color: "#374151" }}>{link.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: "white", borderRadius: "12px", padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
        <div style={{ fontWeight: "600", color: "#1e293b", marginBottom: "8px", fontSize: "14px" }}>🔒 Data Security</div>
        <div style={{ color: "#64748b", fontSize: "13px", lineHeight: "1.6" }}>
          Your HR data is protected with AES-256 encryption at rest and SSL/TLS in transit.
          Daily off-site backups ensure your data is never lost. Number10Sports-HRM is built for secure HR operations.
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
