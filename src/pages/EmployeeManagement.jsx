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
  secondaryButtonStyle,
  tableStyle,
} from "../components/PageUI"

const defaultEmployees = [
  {
    id: 1001,
    name: "Aisha Karim",
    email: "aisha@number10sports-hrm.com",
    department: "Human Resources",
    role: "HR Manager",
    status: "Active",
  },
  {
    id: 1002,
    name: "Daniel Lee",
    email: "daniel@number10sports-hrm.com",
    department: "Finance",
    role: "Payroll Executive",
    status: "Onboarding",
  },
]

function EmployeeManagement({ onLogout }) {
  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem("employees")
    return saved ? JSON.parse(saved) : defaultEmployees
  })
  const [search, setSearch] = useState("")
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    role: "",
    status: "Active",
  })

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees))
  }, [employees])

  const visibleEmployees = employees.filter((employee) => {
    const query = search.toLowerCase()
    return (
      employee.name.toLowerCase().includes(query) ||
      employee.email.toLowerCase().includes(query) ||
      employee.department.toLowerCase().includes(query) ||
      employee.role.toLowerCase().includes(query)
    )
  })

  const statusTone = {
    Active: "success",
    Onboarding: "info",
    Archived: "neutral",
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.name || !form.email || !form.department || !form.role) {
      return
    }

    setEmployees((current) => [
      {
        id: Date.now(),
        ...form,
      },
      ...current,
    ])

    setForm({
      name: "",
      email: "",
      department: "",
      role: "",
      status: "Active",
    })
  }

  const archiveEmployee = (employeeId) => {
    setEmployees((current) =>
      current.map((employee) =>
        employee.id === employeeId ? { ...employee, status: "Archived" } : employee
      )
    )
  }

  return (
    <Layout onLogout={onLogout}>
      <PageHeader
        title="Employee Management"
        description="Manage core employee records, employment status changes, and onboarding data. This is the foundation for leave, payroll, workflow, and reporting across the HR platform."
      />

      <MetricGrid
        items={[
          {
            label: "Total Employees",
            value: employees.length,
            detail: "Unlimited employee records",
            background: "#eff6ff",
            border: "#bfdbfe",
            accent: "#2563eb",
          },
          {
            label: "Active Staff",
            value: employees.filter((employee) => employee.status === "Active").length,
            detail: "Available in all workflows",
            background: "#ecfdf5",
            border: "#bbf7d0",
            accent: "#15803d",
          },
          {
            label: "Onboarding",
            value: employees.filter((employee) => employee.status === "Onboarding").length,
            detail: "Pending setup tasks",
            background: "#fefce8",
            border: "#fde68a",
            accent: "#b45309",
          },
        ]}
      />

      <Section title="Add Employee" description="Capture personal and job details for a new employee web account.">
        <form onSubmit={handleSubmit}>
          <div style={formGridStyle}>
            <div>
              <label style={labelStyle}>Full Name</label>
              <input
                style={inputStyle}
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                placeholder="Maria Johnson"
              />
            </div>
            <div>
              <label style={labelStyle}>Email</label>
              <input
                style={inputStyle}
                type="email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                placeholder="maria@company.com"
              />
            </div>
            <div>
              <label style={labelStyle}>Department</label>
              <input
                style={inputStyle}
                value={form.department}
                onChange={(event) => setForm({ ...form, department: event.target.value })}
                placeholder="Operations"
              />
            </div>
            <div>
              <label style={labelStyle}>Role</label>
              <input
                style={inputStyle}
                value={form.role}
                onChange={(event) => setForm({ ...form, role: event.target.value })}
                placeholder="Branch Manager"
              />
            </div>
            <div>
              <label style={labelStyle}>Employment Status</label>
              <select
                style={inputStyle}
                value={form.status}
                onChange={(event) => setForm({ ...form, status: event.target.value })}
              >
                <option>Active</option>
                <option>Onboarding</option>
              </select>
            </div>
          </div>
          <div style={{ marginTop: "16px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button type="submit" style={buttonStyle}>
              Save Employee
            </button>
            <button
              type="button"
              style={secondaryButtonStyle}
              onClick={() =>
                setForm({
                  name: "",
                  email: "",
                  department: "",
                  role: "",
                  status: "Active",
                })
              }
            >
              Clear Form
            </button>
          </div>
        </form>
      </Section>

      <Section title="Employee Directory" description="Search, review, and archive employee records without deleting historical data.">
        <div style={{ marginBottom: "16px" }}>
          <input
            style={inputStyle}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name, email, department, or role"
          />
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={headerCellStyle}>Employee</th>
                <th style={headerCellStyle}>Department</th>
                <th style={headerCellStyle}>Role</th>
                <th style={headerCellStyle}>Status</th>
                <th style={headerCellStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {visibleEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td style={cellStyle}>
                    <div style={{ color: "#111827", fontWeight: 600 }}>{employee.name}</div>
                    <div style={{ color: "#64748b", fontSize: "13px" }}>{employee.email}</div>
                  </td>
                  <td style={cellStyle}>{employee.department}</td>
                  <td style={cellStyle}>{employee.role}</td>
                  <td style={cellStyle}>
                    <StatusBadge label={employee.status} tone={statusTone[employee.status]} />
                  </td>
                  <td style={cellStyle}>
                    <button
                      type="button"
                      disabled={employee.status === "Archived"}
                      onClick={() => archiveEmployee(employee.id)}
                      style={{
                        ...secondaryButtonStyle,
                        padding: "8px 12px",
                        opacity: employee.status === "Archived" ? 0.5 : 1,
                      }}
                    >
                      Archive
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

export default EmployeeManagement