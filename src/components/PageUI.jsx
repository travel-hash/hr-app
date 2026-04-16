export function PageHeader({ title, description, action }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "16px",
        marginBottom: "24px",
        flexWrap: "wrap",
      }}
    >
      <div>
        <h1
          style={{
            margin: 0,
            color: "#111827",
            fontSize: "28px",
            fontWeight: 700,
          }}
        >
          {title}
        </h1>
        <p style={{ marginTop: "8px", color: "#6b7280", maxWidth: "760px" }}>
          {description}
        </p>
      </div>
      {action}
    </div>
  )
}

export function Section({ title, description, children }) {
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "16px",
        padding: "20px",
        boxShadow: "0 1px 3px rgba(15, 23, 42, 0.08)",
        marginBottom: "20px",
      }}
    >
      {(title || description) && (
        <div style={{ marginBottom: "16px" }}>
          {title && (
            <h2
              style={{
                margin: 0,
                color: "#111827",
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              {title}
            </h2>
          )}
          {description && (
            <p style={{ marginTop: "6px", color: "#6b7280", fontSize: "14px" }}>
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  )
}

export function MetricGrid({ items }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "16px",
        marginBottom: "20px",
      }}
    >
      {items.map((item) => (
        <div
          key={item.label}
          style={{
            background: item.background || "#ffffff",
            border: `1px solid ${item.border || "#e2e8f0"}`,
            borderRadius: "16px",
            padding: "18px",
          }}
        >
          <div style={{ color: item.accent || "#2563eb", fontSize: "13px", fontWeight: 600 }}>
            {item.label}
          </div>
          <div style={{ color: "#111827", fontSize: "30px", fontWeight: 700, marginTop: "6px" }}>
            {item.value}
          </div>
          {item.detail && (
            <div style={{ color: "#6b7280", fontSize: "13px", marginTop: "6px" }}>
              {item.detail}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export const formGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "14px",
}

export const inputStyle = {
  width: "100%",
  padding: "11px 12px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
  background: "#ffffff",
  fontSize: "14px",
  color: "#111827",
  boxSizing: "border-box",
}

export const labelStyle = {
  display: "block",
  marginBottom: "6px",
  color: "#334155",
  fontSize: "13px",
  fontWeight: 600,
}

export const buttonStyle = {
  padding: "11px 16px",
  background: "#2563eb",
  color: "#ffffff",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: 600,
}

export const secondaryButtonStyle = {
  ...buttonStyle,
  background: "#e2e8f0",
  color: "#0f172a",
}

export const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
}

export const cellStyle = {
  padding: "12px 10px",
  borderTop: "1px solid #e2e8f0",
  textAlign: "left",
  fontSize: "14px",
  color: "#334155",
  verticalAlign: "top",
}

export function StatusBadge({ label, tone = "info" }) {
  const tones = {
    info: { background: "#dbeafe", color: "#1d4ed8" },
    success: { background: "#dcfce7", color: "#15803d" },
    warning: { background: "#fef3c7", color: "#b45309" },
    danger: { background: "#fee2e2", color: "#b91c1c" },
    neutral: { background: "#e2e8f0", color: "#334155" },
  }

  const colors = tones[tone] || tones.info

  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 10px",
        borderRadius: "999px",
        background: colors.background,
        color: colors.color,
        fontSize: "12px",
        fontWeight: 700,
      }}
    >
      {label}
    </span>
  )
}