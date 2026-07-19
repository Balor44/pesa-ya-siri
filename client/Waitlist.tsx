import { useState } from "react";

const GOLD = "#F4A800";
const GREEN = "#25D366";
const DARK = "#0A0F0A";
const CARD = "#111811";
const BORDER = "#1E2E1E";
const TEXT = "#E8F0E8";
const MUTED = "#6B7F6B";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [number, setNumber] = useState<number | null>(null);

  const submit = async () => {
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setNumber(data.number);
        setMessage(data.message);
      } else {
        setStatus("error");
        setMessage(data.error);
        if (data.number) setNumber(data.number);
      }
    } catch (err) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={{ background: DARK, minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 16px" }}>

      {/* Back link */}
      <a href="/" style={{ position: "absolute", top: 20, left: 20, color: MUTED, fontSize: 13, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
        ← Back
      </a>

      <div style={{ maxWidth: 480, width: "100%", textAlign: "center" }}>

        {/* Logo */}
        <div style={{ width: 56, height: 56, borderRadius: 16, background: "linear-gradient(135deg, #F4A800, #F4C842)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 28, color: "#000", margin: "0 auto 24px" }}>P</div>

        {status === "success" ? (
          /* SUCCESS STATE */
          <div>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: TEXT, marginBottom: 10 }}>You are on the list!</h1>
            <div style={{ background: CARD, border: "1px solid " + GREEN + "44", borderRadius: 16, padding: "24px", marginBottom: 24 }}>
              <div style={{ fontSize: 13, color: MUTED, marginBottom: 8 }}>Your waitlist number</div>
              <div style={{ fontSize: 64, fontWeight: 900, color: GREEN, lineHeight: 1 }}>#{number}</div>
              <div style={{ fontSize: 13, color: MUTED, marginTop: 8 }}>{email}</div>
            </div>
            <p style={{ color: MUTED, fontSize: 13, lineHeight: 1.7 }}>
              We will notify you at this email address when the Pesa Ya Siri pilot launches in Dar es Salaam. Tell your friends — the earlier they sign up, the lower their number.
            </p>
            <a href="/" style={{ display: "inline-block", marginTop: 24, background: GOLD, color: "#000", borderRadius: 10, padding: "11px 28px", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
              Back to Home
            </a>
          </div>
        ) : (
          /* FORM STATE */
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#1A2C1A", border: "1px solid " + GREEN + "33", borderRadius: 20, padding: "4px 12px", fontSize: 11, color: GREEN, marginBottom: 20 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: GREEN, display: "inline-block" }} />
              Pilot launching in Dar es Salaam
            </div>
            <h1 style={{ fontSize: 32, fontWeight: 800, color: TEXT, marginBottom: 12, lineHeight: 1.2 }}>
              Join the Pesa Ya Siri Waitlist
            </h1>
            <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.7, marginBottom: 32 }}>
              Be among the first to use private ZCash payments over WhatsApp in Tanzania. Enter your email and we will notify you when the pilot goes live.
            </p>

            <div style={{ background: CARD, border: "1px solid " + BORDER, borderRadius: 16, padding: "28px 24px" }}>
              <label style={{ display: "block", fontSize: 12, color: MUTED, textAlign: "left", marginBottom: 8 }}>Email address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && submit()}
                placeholder="you@email.com"
                style={{ width: "100%", background: DARK, border: "1px solid " + BORDER, borderRadius: 10, padding: "11px 14px", color: TEXT, fontSize: 14, outline: "none", marginBottom: 16, boxSizing: "border-box" }}
              />

              {status === "error" && (
                <div style={{ background: "#2A1A1A", border: "1px solid #FF444444", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#FF8888", marginBottom: 14, textAlign: "left" }}>
                  {message}
                  {number && <span style={{ color: GREEN }}> Your number is #{number}.</span>}
                </div>
              )}

              <button
                onClick={submit}
                disabled={status === "loading"}
                style={{ width: "100%", background: status === "loading" ? MUTED : GOLD, color: "#000", borderRadius: 10, padding: "12px", fontSize: 14, fontWeight: 700, border: "none", cursor: status === "loading" ? "not-allowed" : "pointer" }}
              >
                {status === "loading" ? "Joining..." : "Join Waitlist"}
              </button>
            </div>

            <p style={{ color: MUTED, fontSize: 11, marginTop: 16, lineHeight: 1.6 }}>
              No spam. No sharing. We only contact you when the pilot is ready.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

