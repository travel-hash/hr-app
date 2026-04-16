import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { PageHeader, Section, MetricGrid, buttonStyle } from "../components/PageUI"

const defaultSettings = {
  twoFactor: true,
  sslEnforced: true,
  dailyBackup: true,
  multilingual: true,
  customFields: true,
}

function Settings({ onLogout }) {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("hr_settings")
    return saved ? JSON.parse(saved) : defaultSettings
  })

  useEffect(() => {
    localStorage.setItem("hr_settings", JSON.stringify(settings))
  }, [settings])

  const toggle = (key) => {
    setSettings((current) => ({ ...current, [key]: !current[key] }))
  }

  return (
    <Layout onLogout={onLogout}>
      <PageHeader
        title="Employer Settings"
        description="Control security, language support, custom field usage, and access settings for your employer account."
      />

      <MetricGrid
        items={[
          { label: "2FA", value: settings.twoFactor ? "Enabled" : "Disabled", background: "#dcfce7", border: "#86efac", accent: "#15803d" },
          { label: "SSL/TLS", value: settings.sslEnforced ? "Enforced" : "Optional", background: "#eff6ff", border: "#bfdbfe", accent: "#2563eb" },
          { label: "Backups", value: settings.dailyBackup ? "Daily" : "Off", background: "#fef3c7", border: "#fcd34d", accent: "#b45309" },
        ]}
      />

      <Section title="Security & Platform Controls" description="These switches mirror the security posture configured for Number10Sports-HRM.">
        <div style={{ display: "grid", gap: "12px" }}>
          <SettingRow label="Two-Factor Authentication" description="Require an extra verification step during login." enabled={settings.twoFactor} onToggle={() => toggle("twoFactor")} />
          <SettingRow label="Enforce SSL/TLS" description="Keep every employer and employee session encrypted in transit." enabled={settings.sslEnforced} onToggle={() => toggle("sslEnforced")} />
          <SettingRow label="Daily Off-Site Backup" description="Keep encrypted copies of your data for recovery." enabled={settings.dailyBackup} onToggle={() => toggle("dailyBackup")} />
          <SettingRow label="Multi-Lingual Interface" description="Allow teams to work in their preferred supported language." enabled={settings.multilingual} onToggle={() => toggle("multilingual")} />
          <SettingRow label="Custom Fields" description="Allow employer-defined employee and workflow fields." enabled={settings.customFields} onToggle={() => toggle("customFields")} />
        </div>
      </Section>
    </Layout>
  )
}

function SettingRow({ label, description, enabled, onToggle }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", padding: "16px", background: "#f8fafc", borderRadius: "14px", border: "1px solid #e2e8f0", flexWrap: "wrap" }}>
      <div>
        <div style={{ color: "#111827", fontWeight: 600 }}>{label}</div>
        <div style={{ color: "#64748b", marginTop: "4px", fontSize: "14px" }}>{description}</div>
      </div>
      <button type="button" onClick={onToggle} style={{ ...buttonStyle, background: enabled ? "#16a34a" : "#94a3b8" }}>
        {enabled ? "Enabled" : "Disabled"}
      </button>
    </div>
  )
}

export default Settings