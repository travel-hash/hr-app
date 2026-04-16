import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { PageHeader, Section, MetricGrid, StatusBadge, buttonStyle, cellStyle, formGridStyle, inputStyle, labelStyle, tableStyle } from "../components/PageUI"

const defaultIncidents = [
  { id: 1, subject: "Clock-out adjustment request", category: "Attendance", severity: "Low", status: "Open" },
  { id: 2, subject: "Customer complaint escalation", category: "Misconduct", severity: "High", status: "Under Review" },
]

function Incidents({ onLogout }) {
  const [incidents, setIncidents] = useState(() => {
    const saved = localStorage.getItem("hr_incidents")
    return saved ? JSON.parse(saved) : defaultIncidents
  })
  const [form, setForm] = useState({ subject: "", category: "Misconduct", severity: "Medium" })

  useEffect(() => {
    localStorage.setItem("hr_incidents", JSON.stringify(incidents))
  }, [incidents])

  const reportIncident = (event) => {
    event.preventDefault()
    if (!form.subject) {
      return
    }
    setIncidents((current) => [{ id: Date.now(), ...form, status: "Open" }, ...current])
    setForm({ subject: "", category: "Misconduct", severity: "Medium" })
  }

  const setStatus = (incidentId, status) => {
    setIncidents((current) => current.map((incident) => (incident.id === incidentId ? { ...incident, status } : incident)))
  }

  return (
    <Layout onLogout={onLogout}>
      <PageHeader
        title="Incident Management"
        description="Track misconduct, merits, safety issues, complaints, and attendance adjustments in a single incident register."
      />

      <MetricGrid
        items={[
          { label: "Open Cases", value: incidents.filter((incident) => incident.status === "Open").length, background: "#fee2e2", border: "#fca5a5", accent: "#b91c1c" },
          { label: "Under Review", value: incidents.filter((incident) => incident.status === "Under Review").length, background: "#fef3c7", border: "#fcd34d", accent: "#b45309" },
          { label: "Closed", value: incidents.filter((incident) => incident.status === "Closed").length, background: "#dcfce7", border: "#86efac", accent: "#15803d" },
        ]}
      />

      <Section title="Report Incident" description="Log a new issue, complaint, merit, or adjustment request.">
        <form onSubmit={reportIncident}>
          <div style={formGridStyle}>
            <div>
              <label style={labelStyle}>Subject</label>
              <input style={inputStyle} value={form.subject} onChange={(event) => setForm({ ...form, subject: event.target.value })} placeholder="Unsafe storage room condition" />
            </div>
            <div>
              <label style={labelStyle}>Category</label>
              <select style={inputStyle} value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}>
                <option>Misconduct</option>
                <option>Safety</option>
                <option>Merit</option>
                <option>Attendance</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Severity</label>
              <select style={inputStyle} value={form.severity} onChange={(event) => setForm({ ...form, severity: event.target.value })}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>
          <button type="submit" style={{ ...buttonStyle, marginTop: "16px" }}>
            Create Incident
          </button>
        </form>
      </Section>

      <Section title="Incident Register" description="Investigate and progress each case.">
        <div style={{ overflowX: "auto" }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={headerCellStyle}>Subject</th>
                <th style={headerCellStyle}>Category</th>
                <th style={headerCellStyle}>Severity</th>
                <th style={headerCellStyle}>Status</th>
                <th style={headerCellStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {incidents.map((incident) => (
                <tr key={incident.id}>
                  <td style={cellStyle}>{incident.subject}</td>
                  <td style={cellStyle}>{incident.category}</td>
                  <td style={cellStyle}>{incident.severity}</td>
                  <td style={cellStyle}>
                    <StatusBadge label={incident.status} tone={incident.status === "Closed" ? "success" : incident.status === "Under Review" ? "warning" : "danger"} />
                  </td>
                  <td style={cellStyle}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button type="button" style={{ ...buttonStyle, padding: "8px 10px" }} onClick={() => setStatus(incident.id, "Under Review")}>
                        Review
                      </button>
                      <button type="button" style={{ ...buttonStyle, padding: "8px 10px", background: "#16a34a" }} onClick={() => setStatus(incident.id, "Closed")}>
                        Close
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

export default Incidents