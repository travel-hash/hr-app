import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { PageHeader, Section, MetricGrid, StatusBadge, buttonStyle, cellStyle, formGridStyle, inputStyle, labelStyle, tableStyle } from "../components/PageUI"

const defaultAttendance = [
  { id: 1, employee: "Aisha Karim", date: "2026-04-16", checkIn: "08:57", location: "HQ Office", status: "On Time" },
  { id: 2, employee: "Daniel Lee", date: "2026-04-16", checkIn: "09:16", location: "Field Check-In", status: "Late" },
]

function Attendance({ onLogout }) {
  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem("hr_attendance")
    return saved ? JSON.parse(saved) : defaultAttendance
  })
  const [form, setForm] = useState({ employee: "", date: "2026-04-16", checkIn: "09:00", location: "HQ Office" })

  useEffect(() => {
    localStorage.setItem("hr_attendance", JSON.stringify(records))
  }, [records])

  const submitRecord = (event) => {
    event.preventDefault()
    if (!form.employee) {
      return
    }

    const status = form.checkIn <= "09:00" ? "On Time" : "Late"
    setRecords((current) => [{ id: Date.now(), ...form, status }, ...current])
    setForm({ employee: "", date: "2026-04-16", checkIn: "09:00", location: "HQ Office" })
  }

  return (
    <Layout onLogout={onLogout}>
      <PageHeader
        title="Time Clock & Attendance"
        description="Track daily attendance, support web clock-in and field check-in, and give managers instant visibility into mobile workforce activity."
      />

      <MetricGrid
        items={[
          { label: "On Time", value: records.filter((record) => record.status === "On Time").length, background: "#dcfce7", border: "#86efac", accent: "#15803d" },
          { label: "Late", value: records.filter((record) => record.status === "Late").length, background: "#fee2e2", border: "#fca5a5", accent: "#b91c1c" },
          { label: "Field Check-In", value: records.filter((record) => record.location === "Field Check-In").length, background: "#cffafe", border: "#67e8f9", accent: "#0f766e" },
        ]}
      />

      <Section title="New Clock-In" description="Capture a web or field check-in event.">
        <form onSubmit={submitRecord}>
          <div style={formGridStyle}>
            <div>
              <label style={labelStyle}>Employee</label>
              <input style={inputStyle} value={form.employee} onChange={(event) => setForm({ ...form, employee: event.target.value })} placeholder="Daniel Lee" />
            </div>
            <div>
              <label style={labelStyle}>Date</label>
              <input style={inputStyle} type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} />
            </div>
            <div>
              <label style={labelStyle}>Check-In Time</label>
              <input style={inputStyle} type="time" value={form.checkIn} onChange={(event) => setForm({ ...form, checkIn: event.target.value })} />
            </div>
            <div>
              <label style={labelStyle}>Location</label>
              <select style={inputStyle} value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })}>
                <option>HQ Office</option>
                <option>Branch Office</option>
                <option>Field Check-In</option>
              </select>
            </div>
          </div>
          <button type="submit" style={{ ...buttonStyle, marginTop: "16px" }}>
            Save Attendance Record
          </button>
        </form>
      </Section>

      <Section title="Attendance Log" description="Use this as a lightweight attendance history view.">
        <div style={{ overflowX: "auto" }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={headerCellStyle}>Employee</th>
                <th style={headerCellStyle}>Date</th>
                <th style={headerCellStyle}>Time</th>
                <th style={headerCellStyle}>Location</th>
                <th style={headerCellStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id}>
                  <td style={cellStyle}>{record.employee}</td>
                  <td style={cellStyle}>{record.date}</td>
                  <td style={cellStyle}>{record.checkIn}</td>
                  <td style={cellStyle}>{record.location}</td>
                  <td style={cellStyle}>
                    <StatusBadge label={record.status} tone={record.status === "On Time" ? "success" : "danger"} />
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

export default Attendance