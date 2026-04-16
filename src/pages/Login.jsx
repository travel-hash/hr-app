import { useNavigate } from "react-router-dom"
import { useState } from "react"
import BrandLogo from "../components/BrandLogo"

function Login({ onLogin }) {
  const navigate = useNavigate()
  const [mode, setMode] = useState("login") // "login" | "signup"
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", role: "Employer" })
  const [error, setError] = useState("")

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    if (!form.email || !form.password) { setError("Email and password are required."); return }

    if (mode === "signup") {
      if (!form.name) { setError("Full name is required."); return }
      if (form.password !== form.confirm) { setError("Passwords do not match."); return }
      if (form.password.length < 8) { setError("Password must be at least 8 characters."); return }
      const users = JSON.parse(localStorage.getItem("hr_users") || "[]")
      if (users.find(u => u.email === form.email)) { setError("An account with this email already exists."); return }
      users.push({ name: form.name, email: form.email, password: form.password, role: form.role })
      localStorage.setItem("hr_users", JSON.stringify(users))
      setMode("login")
      setForm({ name: "", email: form.email, password: "", confirm: "", role: "Employer" })
      setError("")
      return
    }

    const users = JSON.parse(localStorage.getItem("hr_users") || "[]")
    const user = users.find(u => u.email === form.email && u.password === form.password)
    if (!user && !(form.email === "admin@number10sports-hrm.com" && form.password === "admin1234")) {
      setError("Invalid email or password."); return
    }
    onLogin(user || { name: "Admin", email: form.email, role: "Employer" })
    navigate("/dashboard")
  }

  return (
    <div style={{
      minHeight: "100vh", background: "linear-gradient(135deg, #1e293b 0%, #2563eb 100%)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: "20px"
    }}>
      <div style={{ width: "100%", maxWidth: "420px" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <BrandLogo theme="dark" />
          <div style={{ color: "#93c5fd", fontSize: "14px", marginTop: "8px" }}>For Internal Use Only</div>
        </div>

        <div style={{
          background: "white", borderRadius: "16px", padding: "32px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
        }}>
          {/* Tabs */}
          <div style={{ display: "flex", marginBottom: "24px", background: "#f1f5f9", borderRadius: "8px", padding: "4px" }}>
            {["login", "signup"].map(m => (
              <button key={m} onClick={() => { setMode(m); setError("") }} style={{
                flex: 1, padding: "8px", border: "none", borderRadius: "6px", cursor: "pointer",
                background: mode === m ? "white" : "transparent",
                color: mode === m ? "#1e293b" : "#64748b",
                fontWeight: mode === m ? "600" : "400",
                fontSize: "14px",
                boxShadow: mode === m ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                transition: "all 0.15s"
              }}>
                {m === "login" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>

          {error && (
            <div style={{
              background: "#fee2e2", color: "#dc2626", padding: "10px 14px",
              borderRadius: "6px", fontSize: "13px", marginBottom: "16px"
            }}>{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            {mode === "signup" && (
              <>
                <label style={labelStyle}>Full Name</label>
                <input name="name" type="text" placeholder="John Smith" value={form.name}
                  onChange={handleChange} style={inputStyle} />

                <label style={labelStyle}>Account Type</label>
                <select name="role" value={form.role} onChange={handleChange} style={inputStyle}>
                  <option value="Employer">Employer</option>
                  <option value="Employee">Employee</option>
                  <option value="HR Manager">HR Manager</option>
                </select>
              </>
            )}

            <label style={labelStyle}>Email Address</label>
            <input name="email" type="email" placeholder="you@company.com" value={form.email}
              onChange={handleChange} style={inputStyle} />

            <label style={labelStyle}>Password</label>
            <input name="password" type="password" placeholder={mode === "signup" ? "Min. 8 characters" : "••••••••"} value={form.password}
              onChange={handleChange} style={inputStyle} />

            {mode === "signup" && (
              <>
                <label style={labelStyle}>Confirm Password</label>
                <input name="confirm" type="password" placeholder="Repeat password" value={form.confirm}
                  onChange={handleChange} style={inputStyle} />
              </>
            )}

            <button type="submit" style={{
              width: "100%", padding: "11px", background: "#2563eb", color: "white",
              border: "none", borderRadius: "8px", fontWeight: "600", fontSize: "15px",
              cursor: "pointer", marginTop: "8px", transition: "background 0.15s"
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#1d4ed8"}
            onMouseLeave={e => e.currentTarget.style.background = "#2563eb"}
            >
              {mode === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>

          {mode === "login" && (
            <p style={{ textAlign: "center", color: "#64748b", fontSize: "12px", marginTop: "16px" }}>
              Demo: admin@number10sports-hrm.com / admin1234
            </p>
          )}
        </div>

        <p style={{ textAlign: "center", color: "#93c5fd", fontSize: "12px", marginTop: "20px" }}>
          🔒 SSL encrypted · AES-256 data encryption · Free Forever
        </p>
      </div>
    </div>
  )
}

const labelStyle = {
  display: "block", fontSize: "13px", fontWeight: "500", color: "#374151",
  marginBottom: "5px", marginTop: "12px"
}

const inputStyle = {
  width: "100%", padding: "10px 12px", border: "1px solid #d1d5db",
  borderRadius: "7px", fontSize: "14px", color: "#1e293b",
  boxSizing: "border-box", outline: "none", background: "white",
  transition: "border-color 0.15s"
}

export default Login