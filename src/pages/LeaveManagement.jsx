import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import {
  PageHeader,
  Section,
  MetricGrid,
  StatusBadge,
  buttonStyle,
  cellStyle,
  formGridStyle,
  inputStyle,
  labelStyle,
  tableStyle,
} from "../components/PageUI"

const defaultLeaves = [
  { id: 1, employee: "Aisha Karim", type: "Annual Leave", days: 3, period: "Apr 20 - Apr 22", status: "Pending" },
  { id: 2, employee: "Daniel Lee", type: "Medical Leave", days: 1, period: "Apr 16", status: "Approved" },
]

function LeaveManagement({ onLogout }) {
  const [leaves, setLeaves] = useState(() => {
    const saved = localStorage.getItem("hr_leaves")
    return saved ? JSON.parse(saved) : defaultLeaves
  })
  const [form, setForm] = useState({ employee: "", type: "Annual Leave", days: 1, period: "" })

  useEffect(() => {
    localStorage.setItem("hr_leaves", JSON.stringify(leaves))
  }, [leaves])

  const submitLeave = (event) => {
    event.preventDefault()
    if (!form.employee || !form.period) {
      return
    }

    setLeaves((current) => [
      { id: Date.now(), ...form, status: "Pending" },
      ...current,
    ])
    setForm({ employee: "", type: "Annual Leave", days: 1, period: "" })
  }

  const setStatus = (leaveId, status) => {
    setLeaves((current) => current.map((leave) => (leave.id === leaveId ? { ...leave, status } : leave)))
  }

  return (
    <Layout onLogout={onLogout}>
      <PageHeader
        title="Paperless e-Leave"
        description="Manage leave applications, approval workflow, balance visibility, and multi-scheme planning for different workdays and holiday arrangements."
      />

      <MetricGrid
        items={[
          { label: "Pending Requests", value: leaves.filter((leave) => leave.status === "Pending").length, background: "#fef3c7", border: "#fcd34d", accent: "#b45309" },
          { label: "Approved", value: leaves.filter((leave) => leave.status === "Approved").length, background: "#dcfce7", border: "#86efac", accent: "#15803d" },
          { label: "Rejected", value: leaves.filter((leave) => leave.status === "Rejected").length, background: "#fee2e2", border: "#fca5a5", accent: "#b91c1c" },
        ]}
      />

      <Section title="New Leave Application" description="Submit a paperless leave request into the approval workflow.">
        <form onSubmit={submitLeave}>
          <div style={formGridStyle}>
            <div>
              <label style={labelStyle}>Employee</label>
              <input style={inputStyle} value={form.employee} onChange={(event) => setForm({ ...form, employee: event.target.value })} placeholder="Aisha Karim" />
            </div>
            <div>
              <label style={labelStyle}>Leave Type</label>
              <select style={inputStyle} value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })}>
                <option>Annual Leave</option>
                <option>Medical Leave</option>
                <option>Emergency Leave</option>
                <option>Unpaid Leave</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Days</label>
              <input style={inputStyle} type="number" min="1" value={form.days} onChange={(event) => setForm({ ...form, days: Number(event.target.value) })} />
            </div>
            <div>
              <label style={labelStyle}>Period</label>
              <input style={inputStyle} value={form.period} onChange={(event) => setForm({ ...form, period: event.target.value })} placeholder="Apr 18 - Apr 20" />
            </div>
          </div>
          <button type="submit" style={{ ...buttonStyle, marginTop: "16px" }}>
            Submit Leave Request
          </button>
        </form>
      </Section>

      <Section title="Approval Queue" description="Line managers, heads of department, and custom roles can review requests here.">
        <div style={{ overflowX: "auto" }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={headerCellStyle}>Employee</th>
                <th style={headerCellStyle}>Leave Type</th>
                <th style={headerCellStyle}>Days</th>
                <th style={headerCellStyle}>Period</th>
                <th style={headerCellStyle}>Status</th>
                <th style={headerCellStyle}>Review</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr key={leave.id}>
                  <td style={cellStyle}>{leave.employee}</td>
                  <td style={cellStyle}>{leave.type}</td>
                  <td style={cellStyle}>{leave.days}</td>
                  <td style={cellStyle}>{leave.period}</td>
                  <td style={cellStyle}>
                    <StatusBadge label={leave.status} tone={statusTone[leave.status]} />
                  </td>
                  <td style={cellStyle}>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      <button type="button" style={miniApproveStyle} onClick={() => setStatus(leave.id, "Approved")}>
                        Approve
                      </button>
                      <button type="button" style={miniRejectStyle} onClick={() => setStatus(leave.id, "Rejected")}>
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

const statusTone = {
  Pending: "warning",
  Approved: "success",
  Rejected: "danger",
}

const headerCellStyle = {
  ...cellStyle,
  borderTop: "none",
  color: "#64748b",
  fontSize: "12px",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
}

const miniApproveStyle = {
  ...buttonStyle,
  padding: "8px 10px",
  background: "#16a34a",
}

const miniRejectStyle = {
  ...buttonStyle,
  padding: "8px 10px",
  background: "#dc2626",
}

export default LeaveManagement