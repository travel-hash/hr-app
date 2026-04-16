import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { PageHeader, Section, MetricGrid, StatusBadge, buttonStyle, cellStyle, formGridStyle, inputStyle, labelStyle, tableStyle } from "../components/PageUI"

const defaultPayroll = [
  { id: 1, employee: "Aisha Karim", basic: 4200, allowance: 300, deduction: 120, payDate: "2026-04-30", status: "Processed" },
  { id: 2, employee: "Daniel Lee", basic: 3600, allowance: 200, deduction: 0, payDate: "2026-04-30", status: "Draft" },
]

function Payroll({ onLogout }) {
  const [runs, setRuns] = useState(() => {
    const saved = localStorage.getItem("hr_payroll")
    return saved ? JSON.parse(saved) : defaultPayroll
  })
  const [form, setForm] = useState({ employee: "", basic: 0, allowance: 0, deduction: 0, payDate: "2026-04-30" })

  useEffect(() => {
    localStorage.setItem("hr_payroll", JSON.stringify(runs))
  }, [runs])

  const submitPayroll = (event) => {
    event.preventDefault()
    if (!form.employee) {
      return
    }
    setRuns((current) => [{ id: Date.now(), ...form, status: "Draft" }, ...current])
    setForm({ employee: "", basic: 0, allowance: 0, deduction: 0, payDate: "2026-04-30" })
  }

  const processPayroll = (runId) => {
    setRuns((current) => current.map((run) => (run.id === runId ? { ...run, status: "Processed" } : run)))
  }

  const totalGross = runs.reduce((total, run) => total + Number(run.basic) + Number(run.allowance), 0)

  return (
    <Layout onLogout={onLogout}>
      <PageHeader
        title="Payroll & Salary Management"
        description="Run monthly payroll, manage deductions and allowances, and keep salary history aligned with payslip generation."
      />

      <MetricGrid
        items={[
          { label: "Payroll Runs", value: runs.length, background: "#eff6ff", border: "#bfdbfe", accent: "#2563eb" },
          { label: "Processed", value: runs.filter((run) => run.status === "Processed").length, background: "#dcfce7", border: "#86efac", accent: "#15803d" },
          { label: "Gross Payroll", value: `$${totalGross.toLocaleString()}`, background: "#ede9fe", border: "#c4b5fd", accent: "#7c3aed" },
        ]}
      />

      <Section title="Create Payroll Item" description="Prepare a payroll draft for an employee before processing.">
        <form onSubmit={submitPayroll}>
          <div style={formGridStyle}>
            <div>
              <label style={labelStyle}>Employee</label>
              <input style={inputStyle} value={form.employee} onChange={(event) => setForm({ ...form, employee: event.target.value })} placeholder="Aisha Karim" />
            </div>
            <div>
              <label style={labelStyle}>Basic Salary</label>
              <input style={inputStyle} type="number" value={form.basic} onChange={(event) => setForm({ ...form, basic: Number(event.target.value) })} />
            </div>
            <div>
              <label style={labelStyle}>Allowance</label>
              <input style={inputStyle} type="number" value={form.allowance} onChange={(event) => setForm({ ...form, allowance: Number(event.target.value) })} />
            </div>
            <div>
              <label style={labelStyle}>Deduction</label>
              <input style={inputStyle} type="number" value={form.deduction} onChange={(event) => setForm({ ...form, deduction: Number(event.target.value) })} />
            </div>
            <div>
              <label style={labelStyle}>Pay Date</label>
              <input style={inputStyle} type="date" value={form.payDate} onChange={(event) => setForm({ ...form, payDate: event.target.value })} />
            </div>
          </div>
          <button type="submit" style={{ ...buttonStyle, marginTop: "16px" }}>
            Add Payroll Draft
          </button>
        </form>
      </Section>

      <Section title="Payroll Register" description="Track processed and draft salary runs.">
        <div style={{ overflowX: "auto" }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={headerCellStyle}>Employee</th>
                <th style={headerCellStyle}>Gross</th>
                <th style={headerCellStyle}>Deduction</th>
                <th style={headerCellStyle}>Net Pay</th>
                <th style={headerCellStyle}>Pay Date</th>
                <th style={headerCellStyle}>Status</th>
                <th style={headerCellStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {runs.map((run) => {
                const netPay = Number(run.basic) + Number(run.allowance) - Number(run.deduction)
                return (
                  <tr key={run.id}>
                    <td style={cellStyle}>{run.employee}</td>
                    <td style={cellStyle}>${(Number(run.basic) + Number(run.allowance)).toLocaleString()}</td>
                    <td style={cellStyle}>${Number(run.deduction).toLocaleString()}</td>
                    <td style={{ ...cellStyle, color: "#111827", fontWeight: 700 }}>${netPay.toLocaleString()}</td>
                    <td style={cellStyle}>{run.payDate}</td>
                    <td style={cellStyle}>
                      <StatusBadge label={run.status} tone={run.status === "Processed" ? "success" : "warning"} />
                    </td>
                    <td style={cellStyle}>
                      <button type="button" style={{ ...buttonStyle, padding: "8px 12px" }} onClick={() => processPayroll(run.id)}>
                        Process
                      </button>
                    </td>
                  </tr>
                )
              })}
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

export default Payroll