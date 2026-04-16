import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { PageHeader, Section, MetricGrid, StatusBadge, buttonStyle, cellStyle, formGridStyle, inputStyle, labelStyle, tableStyle } from "../components/PageUI"

const defaultClaims = [
  { id: 1, employee: "Aisha Karim", type: "Mileage", amount: 85, status: "Pending" },
  { id: 2, employee: "Daniel Lee", type: "Receipt", amount: 120, status: "Approved" },
]

function Claims({ onLogout }) {
  const [claims, setClaims] = useState(() => {
    const saved = localStorage.getItem("hr_claims")
    return saved ? JSON.parse(saved) : defaultClaims
  })
  const [form, setForm] = useState({ employee: "", type: "Receipt", amount: 0 })

  useEffect(() => {
    localStorage.setItem("hr_claims", JSON.stringify(claims))
  }, [claims])

  const submitClaim = (event) => {
    event.preventDefault()
    if (!form.employee || Number(form.amount) <= 0) {
      return
    }
    setClaims((current) => [{ id: Date.now(), ...form, status: "Pending" }, ...current])
    setForm({ employee: "", type: "Receipt", amount: 0 })
  }

  const setStatus = (claimId, status) => {
    setClaims((current) => current.map((claim) => (claim.id === claimId ? { ...claim, status } : claim)))
  }

  return (
    <Layout onLogout={onLogout}>
      <PageHeader
        title="Paperless e-Claim Management"
        description="Replace manual expense claim forms with configurable workflows, limits, and approval routing by line manager or custom role."
      />

      <MetricGrid
        items={[
          { label: "Pending Claims", value: claims.filter((claim) => claim.status === "Pending").length, background: "#fef3c7", border: "#fcd34d", accent: "#b45309" },
          { label: "Approved", value: claims.filter((claim) => claim.status === "Approved").length, background: "#dcfce7", border: "#86efac", accent: "#15803d" },
          { label: "Claim Value", value: `$${claims.reduce((total, claim) => total + Number(claim.amount), 0).toLocaleString()}`, background: "#eff6ff", border: "#bfdbfe", accent: "#2563eb" },
        ]}
      />

      <Section title="Submit Claim" description="Create a new expense claim item.">
        <form onSubmit={submitClaim}>
          <div style={formGridStyle}>
            <div>
              <label style={labelStyle}>Employee</label>
              <input style={inputStyle} value={form.employee} onChange={(event) => setForm({ ...form, employee: event.target.value })} placeholder="Aisha Karim" />
            </div>
            <div>
              <label style={labelStyle}>Claim Type</label>
              <select style={inputStyle} value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })}>
                <option>Receipt</option>
                <option>Mileage</option>
                <option>Per Diem</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Amount</label>
              <input style={inputStyle} type="number" value={form.amount} onChange={(event) => setForm({ ...form, amount: Number(event.target.value) })} />
            </div>
          </div>
          <button type="submit" style={{ ...buttonStyle, marginTop: "16px" }}>
            Save Claim
          </button>
        </form>
      </Section>

      <Section title="Claim Workflow Queue" description="Managers can approve or reject claims based on configured policy.">
        <div style={{ overflowX: "auto" }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={headerCellStyle}>Employee</th>
                <th style={headerCellStyle}>Type</th>
                <th style={headerCellStyle}>Amount</th>
                <th style={headerCellStyle}>Status</th>
                <th style={headerCellStyle}>Review</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((claim) => (
                <tr key={claim.id}>
                  <td style={cellStyle}>{claim.employee}</td>
                  <td style={cellStyle}>{claim.type}</td>
                  <td style={cellStyle}>${Number(claim.amount).toLocaleString()}</td>
                  <td style={cellStyle}>
                    <StatusBadge label={claim.status} tone={claim.status === "Approved" ? "success" : "warning"} />
                  </td>
                  <td style={cellStyle}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button type="button" style={{ ...buttonStyle, padding: "8px 10px", background: "#16a34a" }} onClick={() => setStatus(claim.id, "Approved")}>
                        Approve
                      </button>
                      <button type="button" style={{ ...buttonStyle, padding: "8px 10px", background: "#dc2626" }} onClick={() => setStatus(claim.id, "Rejected")}>
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </Layout>
  )
}

const headerCellStyle = {
  ...cellStyle,
  borderTop: "none",
  color: "#64748b",
  fontSize: "12px",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
}

export default Claims