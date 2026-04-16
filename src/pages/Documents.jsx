import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { PageHeader, Section, MetricGrid, StatusBadge, buttonStyle, cellStyle, formGridStyle, inputStyle, labelStyle, tableStyle } from "../components/PageUI"

const defaultDocuments = [
  { id: 1, title: "Monthly Timesheet", workflow: "Line Manager Approval", owner: "Operations", status: "Active" },
  { id: 2, title: "Equipment Request", workflow: "Head of Department Approval", owner: "IT", status: "Draft" },
]

function Documents({ onLogout }) {
  const [documents, setDocuments] = useState(() => {
    const saved = localStorage.getItem("hr_documents")
    return saved ? JSON.parse(saved) : defaultDocuments
  })
  const [form, setForm] = useState({ title: "", workflow: "Line Manager Approval", owner: "" })

  useEffect(() => {
    localStorage.setItem("hr_documents", JSON.stringify(documents))
  }, [documents])

  const createDocument = (event) => {
    event.preventDefault()
    if (!form.title || !form.owner) {
      return
    }
    setDocuments((current) => [{ id: Date.now(), ...form, status: "Draft" }, ...current])
    setForm({ title: "", workflow: "Line Manager Approval", owner: "" })
  }

  const publishDocument = (documentId) => {
    setDocuments((current) => current.map((document) => (document.id === documentId ? { ...document, status: "Active" } : document)))
  }

  return (
    <Layout onLogout={onLogout}>
      <PageHeader
        title="Document Workflow"
        description="Digitize internal form submissions and route approvals using custom forms, fields, and secure document sharing."
      />

      <MetricGrid
        items={[
          { label: "Templates", value: documents.length, background: "#eff6ff", border: "#bfdbfe", accent: "#2563eb" },
          { label: "Active Workflows", value: documents.filter((document) => document.status === "Active").length, background: "#dcfce7", border: "#86efac", accent: "#15803d" },
          { label: "Draft Forms", value: documents.filter((document) => document.status === "Draft").length, background: "#fef3c7", border: "#fcd34d", accent: "#b45309" },
        ]}
      />

      <Section title="Create Workflow Form" description="Set up a paperless document template and approval route.">
        <form onSubmit={createDocument}>
          <div style={formGridStyle}>
            <div>
              <label style={labelStyle}>Form Title</label>
              <input style={inputStyle} value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="Travel Authorization" />
            </div>
            <div>
              <label style={labelStyle}>Approval Workflow</label>
              <select style={inputStyle} value={form.workflow} onChange={(event) => setForm({ ...form, workflow: event.target.value })}>
                <option>Line Manager Approval</option>
                <option>Head of Department Approval</option>
                <option>Custom Role Approval</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Owner Team</label>
              <input style={inputStyle} value={form.owner} onChange={(event) => setForm({ ...form, owner: event.target.value })} placeholder="Finance" />
            </div>
          </div>
          <button type="submit" style={{ ...buttonStyle, marginTop: "16px" }}>
            Save Form Template
          </button>
        </form>
      </Section>

      <Section title="Workflow Library" description="Maintain reusable forms and approval templates.">
        <div style={{ overflowX: "auto" }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={headerCellStyle}>Title</th>
                <th style={headerCellStyle}>Workflow</th>
                <th style={headerCellStyle}>Owner</th>
                <th style={headerCellStyle}>Status</th>
                <th style={headerCellStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((document) => (
                <tr key={document.id}>
                  <td style={cellStyle}>{document.title}</td>
                  <td style={cellStyle}>{document.workflow}</td>
                  <td style={cellStyle}>{document.owner}</td>
                  <td style={cellStyle}>
                    <StatusBadge label={document.status} tone={document.status === "Active" ? "success" : "warning"} />
                  </td>
                  <td style={cellStyle}>
                    <button type="button" style={{ ...buttonStyle, padding: "8px 12px" }} onClick={() => publishDocument(document.id)}>
                      Publish
                    </button>
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

export default Documents