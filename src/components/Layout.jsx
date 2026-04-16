import { Link, useLocation } from "react-router-dom"
import { useState } from "react"
import BrandLogo from "./BrandLogo"

const navItems = [
  { path: "/dashboard",  label: "Dashboard",           icon: "🏠" },
  { path: "/employees",  label: "Employee Management", icon: "👥" },
  { path: "/leave",      label: "e-Leave",             icon: "📅" },
  { path: "/attendance", label: "Attendance",          icon: "⏱️" },
  { path: "/payroll",    label: "Payroll",             icon: "💰" },
  { path: "/claims",     label: "Claims",              icon: "🧾" },
  { path: "/incidents",  label: "Incidents",           icon: "⚠️" },
  { path: "/documents",  label: "Documents",           icon: "📄" },
  { path: "/forum",      label: "Forum",               icon: "💬" },
  { path: "/settings",   label: "Settings",            icon: "⚙️" },
]

function Layout({ children, onLogout }) {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", fontFamily: "'Segoe UI', sans-serif" }}>

      {/* Sidebar */}
      <div style={{
        width: collapsed ? "64px" : "240px",
        background: "#1e293b",
        color: "#cbd5e1",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.2s",
        flexShrink: 0,
        overflowY: "auto"
      }}>
        {/* Logo */}
        <div style={{
          padding: collapsed ? "18px 16px" : "18px 20px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          borderBottom: "1px solid #334155"
        }}>
          <BrandLogo compact />
          {!collapsed && (
            <div style={{ display: "flex", flexDirection: "column", gap: "2px", overflow: "hidden" }}>
              <span style={{ fontWeight: "800", fontSize: "15px", color: "white", lineHeight: 1.1 }}>Number10Sports-HRM</span>
              <span style={{ fontWeight: "600", fontSize: "11px", color: "#94a3b8", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Internal Portal
              </span>
            </div>
          )}
          <div style={{ marginLeft: "auto", cursor: "pointer", color: "#64748b" }}
            onClick={() => setCollapsed(c => !c)}>
            {collapsed ? "→" : "←"}
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "12px 8px" }}>
          {navItems.map(item => {
            const active = location.pathname === item.path
            return (
              <Link key={item.path} to={item.path} style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "10px 12px", borderRadius: "6px", marginBottom: "2px",
                textDecoration: "none",
                background: active ? "#2563eb" : "transparent",
                color: active ? "white" : "#94a3b8",
                fontWeight: active ? "600" : "400",
                fontSize: "14px",
                transition: "all 0.15s",
                whiteSpace: "nowrap",
                overflow: "hidden"
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = "#334155"; e.currentTarget.style.color = "white" }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = active ? "white" : "#94a3b8" }}
              >
                <span style={{ fontSize: "16px", flexShrink: 0 }}>{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div style={{ padding: "12px 8px", borderTop: "1px solid #334155" }}>
          <button
            onClick={onLogout}
            style={{
              display: "flex", alignItems: "center", gap: "10px",
              padding: "10px 12px", borderRadius: "6px", width: "100%",
              background: "transparent", border: "none", cursor: "pointer",
              color: "#94a3b8", fontSize: "14px", textAlign: "left"
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#dc2626"; e.currentTarget.style.color = "white" }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#94a3b8" }}
          >
            <span style={{ fontSize: "16px" }}>🚪</span>
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Topbar */}
        <div style={{
          height: "56px", background: "white", borderBottom: "1px solid #e2e8f0",
          display: "flex", alignItems: "center", padding: "0 24px",
          justifyContent: "space-between", flexShrink: 0
        }}>
          <h2 style={{ margin: 0, fontSize: "16px", color: "#1e293b", fontWeight: "600" }}>
            {navItems.find(n => n.path === location.pathname)?.label ?? "Number10Sports-HRM"}
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <BrandLogo compact />
          </div>
        </div>

        {/* Page content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px", background: "#f1f5f9" }}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout