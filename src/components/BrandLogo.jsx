function BrandLogo({ compact = false, theme = "light" }) {
  const boxShadow = theme === "dark" ? "0 10px 30px rgba(0, 0, 0, 0.28)" : "none"
  const src = "/logo.png"

  if (compact) {
    return (
      <div
        style={{
          width: "42px",
          height: "42px",
          borderRadius: "8px",
          overflow: "hidden",
          flexShrink: 0,
          background: "#ffffff",
          border: "1px solid rgba(255,255,255,0.35)",
        }}
      >
        <img
          src={src}
          alt="Number10 Sports logo"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
        />
      </div>
    )
  }

  return (
    <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      <img
        src={src}
        alt="Number10 Sports logo"
        style={{
          width: "260px",
          maxWidth: "100%",
          height: "auto",
          display: "block",
          filter: boxShadow ? `drop-shadow(${boxShadow.replace("0 ", "")})` : "none",
        }}
      />
    </div>
  )
}

export default BrandLogo