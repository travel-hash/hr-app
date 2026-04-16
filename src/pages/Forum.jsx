import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { PageHeader, Section, MetricGrid, buttonStyle, inputStyle, labelStyle } from "../components/PageUI"

const defaultPosts = [
  { id: 1, author: "Aisha Karim", title: "Best way to roll out the new leave workflow?", message: "Looking for a clear communication plan for managers.", replies: 4 },
  { id: 2, author: "Daniel Lee", title: "Payslip wording for allowance changes", message: "Do we include the note directly in the payslip or as a payroll memo?", replies: 2 },
]

function Forum({ onLogout }) {
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem("hr_forum_posts")
    return saved ? JSON.parse(saved) : defaultPosts
  })
  const [form, setForm] = useState({ author: "", title: "", message: "" })

  useEffect(() => {
    localStorage.setItem("hr_forum_posts", JSON.stringify(posts))
  }, [posts])

  const createPost = (event) => {
    event.preventDefault()
    if (!form.author || !form.title || !form.message) {
      return
    }
    setPosts((current) => [{ id: Date.now(), ...form, replies: 0 }, ...current])
    setForm({ author: "", title: "", message: "" })
  }

  return (
    <Layout onLogout={onLogout}>
      <PageHeader
        title="HR Forum"
        description="Encourage collaboration, answer onboarding questions, and share practical HR knowledge securely with employees and managers."
      />

      <MetricGrid
        items={[
          { label: "Topics", value: posts.length, background: "#eff6ff", border: "#bfdbfe", accent: "#2563eb" },
          { label: "Replies", value: posts.reduce((total, post) => total + post.replies, 0), background: "#ffedd5", border: "#fdba74", accent: "#c2410c" },
          { label: "Knowledge Sharing", value: "Open", background: "#dcfce7", border: "#86efac", accent: "#15803d" },
        ]}
      />

      <Section title="Start Discussion" description="Post a question, suggestion, or update for the HR community.">
        <form onSubmit={createPost}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "14px" }}>
            <div>
              <label style={labelStyle}>Author</label>
              <input style={inputStyle} value={form.author} onChange={(event) => setForm({ ...form, author: event.target.value })} placeholder="Aisha Karim" />
            </div>
            <div>
              <label style={labelStyle}>Topic</label>
              <input style={inputStyle} value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="Leave policy communication" />
            </div>
          </div>
          <div style={{ marginTop: "14px" }}>
            <label style={labelStyle}>Message</label>
            <textarea style={{ ...inputStyle, minHeight: "120px", resize: "vertical" }} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="Share context or ask the team a question." />
          </div>
          <button type="submit" style={{ ...buttonStyle, marginTop: "16px" }}>
            Publish Topic
          </button>
        </form>
      </Section>

      <div style={{ display: "grid", gap: "16px" }}>
        {posts.map((post) => (
          <div key={post.id} style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "20px", boxShadow: "0 1px 3px rgba(15, 23, 42, 0.08)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
              <div>
                <h2 style={{ margin: 0, fontSize: "18px", color: "#111827", fontWeight: 600 }}>{post.title}</h2>
                <p style={{ color: "#64748b", marginTop: "6px", fontSize: "14px" }}>Posted by {post.author}</p>
              </div>
              <div style={{ background: "#eff6ff", color: "#1d4ed8", borderRadius: "999px", padding: "6px 10px", fontSize: "12px", fontWeight: 700 }}>
                {post.replies} replies
              </div>
            </div>
            <p style={{ color: "#334155", marginTop: "14px" }}>{post.message}</p>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default Forum