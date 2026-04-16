import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useState } from "react"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import EmployeeManagement from "./pages/EmployeeManagement"
import LeaveManagement from "./pages/LeaveManagement"
import Attendance from "./pages/Attendance"
import Payroll from "./pages/Payroll"
import Claims from "./pages/Claims"
import Incidents from "./pages/Incidents"
import Documents from "./pages/Documents"
import Forum from "./pages/Forum"
import Settings from "./pages/Settings"

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("hr_current_user")
    return savedUser ? JSON.parse(savedUser) : null
  })
  const [isLoggedIn, setIsLoggedIn] = useState(() => Boolean(localStorage.getItem("hr_current_user")))

  const handleLogin = (user) => {
    localStorage.setItem("hr_current_user", JSON.stringify(user))
    setIsLoggedIn(true)
    setCurrentUser(user)
  }

  const handleLogout = () => {
    localStorage.removeItem("hr_current_user")
    setIsLoggedIn(false)
    setCurrentUser(null)
  }

  const ProtectedRoute = ({ element }) =>
    isLoggedIn ? element : <Navigate to="/" />

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/dashboard"        element={<ProtectedRoute element={<Dashboard user={currentUser} onLogout={handleLogout} />} />} />
        <Route path="/employees"        element={<ProtectedRoute element={<EmployeeManagement onLogout={handleLogout} />} />} />
        <Route path="/leave"            element={<ProtectedRoute element={<LeaveManagement onLogout={handleLogout} />} />} />
        <Route path="/attendance"       element={<ProtectedRoute element={<Attendance onLogout={handleLogout} />} />} />
        <Route path="/payroll"          element={<ProtectedRoute element={<Payroll onLogout={handleLogout} />} />} />
        <Route path="/claims"           element={<ProtectedRoute element={<Claims onLogout={handleLogout} />} />} />
        <Route path="/incidents"        element={<ProtectedRoute element={<Incidents onLogout={handleLogout} />} />} />
        <Route path="/documents"        element={<ProtectedRoute element={<Documents onLogout={handleLogout} />} />} />
        <Route path="/forum"            element={<ProtectedRoute element={<Forum onLogout={handleLogout} />} />} />
        <Route path="/settings"         element={<ProtectedRoute element={<Settings onLogout={handleLogout} />} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App