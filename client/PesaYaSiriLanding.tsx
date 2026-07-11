import { useState, useEffect, useRef } from "react";

const GOLD = "#F4A800";
const GREEN = "#25D366";
const DARK = "#0A0F0A";
const CARD = "#111811";
const BORDER = "#1E2E1E";
const TEXT = "#E8F0E8";
const MUTED = "#6B7F6B";

const ZEC_ICON = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill={GOLD} />
    <text x="12" y="17" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#000">Z</text>
  </svg>
);

const WA_ICON = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill={GREEN}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const GITHUB_ICON = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const SHIELD_ICON = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const USERS_ICON = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="1.5">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const GLOBE_ICON = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const CHAT_MESSAGES = [
  { from: "user", text: "CREATE", time: "9:41 AM" },
  { from: "bot", text: "✅ Wallet created successfully.\nYour shielded address:\nzs1q9x...8m7f\n\nBalance: 0.0000 ZEC", time: "9:41 AM" },
  { from: "user", text: "BALANCE", time: "9:41 AM" },
  { from: "bot", text: "💰 Your Balance\n0.5304 ZEC\n≈ 26,520 TZS", time: "9:41 AM" },
  { from: "user", text: "SEND 0712345678 0.2", time: "9:42 AM" },
  { from: "bot", text: "✅ Transaction complete.\n0.2000 ZEC sent successfully\nto 0712345678.\nShielded. Private. Secure.", time: "9:42 AM" },
  { from: "user", text: "BUY AIRTIME", time: "9:43 AM" },
  { from: "bot", text: "📱 Airtime Purchase\nPhone: 0712••••••\nAmount: 5,000 TZS\n✅ Airtime delivered.", time: "9:43 AM" },
];

const DEMO_RESPONSES = {
  "HELP": "👋 Karibu! Here are the commands you can use:\nCREATE    — Create a new wallet\nBALANCE   — Check your balance\nSEND [phone] [amt] — Send ZEC\nREDEEM [code] — Redeem voucher\nBUY AIRTIME — Buy mobile airtime\nHELP      — Show this menu",
  "CREATE": "✅ Wallet created successfully!\nYour shielded address:\nzs1q9x...8m7f\n\nBalance: 0.0000 ZEC\n\nYou can now receive ZEC from anyone.",
  "BALANCE": "💰 Your Balance\n\n0.5304 ZEC\n≈ 26,520 TZS\n\nWallet: zs1q9x...8m7f",
  "SEND 0712345678 0.2": "✅ Transaction complete.\n0.2000 ZEC sent successfully\nto 0712345678.\n\nShielded. Private. Secure.\nNew balance: 0.3304 ZEC",
  "REDEEM A1B2C3D4": "✅ Voucher redeemed!\n\n0.4000 ZEC credited.\nNew balance: 0.9304 ZEC\n\nThank you for using Pesa Ya Siri.",
  "BUY AIRTIME": "📱 Airtime Purchase\n\nPhone: 0712••••••\nAmount: 5,000 TZS\n\n✅ Airtime delivered successfully.",
};

function WhatsAppMockup({ activeMsg }) {
  return (
    <div style={{ width: 260, background: "#111", borderRadius: 32, padding: "12px 6px", boxShadow: "0 40px 80px rgba(0,0,0,0.6)", border: "1px solid #222", position: "relative" }}>
      <div style={{ background: "#1A2C1A", borderRadius: "24px 24px 0 0", padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg, ${GOLD}, #F4C842)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800 }}>P</div>
        <div>
          <div style={{ color: TEXT, fontSize: 13, fontWeight: 600 }}>Pesa Ya Siri</div>
          <div style={{ color: GREEN, fontSize: 10 }}>online</div>
        </div>
      </div>
      <div style={{ background: "#0B140B", minHeight: 340, padding: "10px 8px", display: "flex", flexDirection: "column", gap: 6, overflowY: "auto", maxHeight: 340 }}>
        {CHAT_MESSAGES.slice(0, activeMsg + 1).map((msg, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: msg.from === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              background: msg.from === "user" ? "#1A3A2A" : "#1E2E1E",
              borderRadius: msg.from === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
              padding: "6px 10px", maxWidth: "80%",
              border: msg.from === "bot" ? `1px solid ${BORDER}` : "none"
            }}>
              <div style={{ color: TEXT, fontSize: 11, lineHeight: 1.5, whiteSpace: "pre-line" }}>{msg.text}</div>
              <div style={{ color: MUTED, fontSize: 9, textAlign: "right", marginTop: 2 }}>{msg.time}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ background: "#1A2C1A", borderRadius: "0 0 24px 24px", padding: "8px 10px", display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{ flex: 1, background: "#0B140B", borderRadius: 20, padding: "6px 12px", color: MUTED, fontSize: 11 }}>Type a message...</div>
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: GREEN, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 20-7z"/></svg>
        </div>
      </div>
    </div>
  );
}

function LiveDemo() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "👋 Karibu! Here are the commands you can use:\nCREATE    — Create a new wallet\nBALANCE   — Check your balance\nSEND [phone] [amt] — Send ZEC\nREDEEM [code] — Redeem voucher\nBUY AIRTIME — Buy mobile airtime\nHELP      — Show this menu", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }
  ]);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    const key = input.trim().toUpperCase();
    const replyText = DEMO_RESPONSES[key] || "Unknown command. Send HELP to see all options.";
    const botMsg = { from: "bot", text: replyText, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    setMessages(m => [...m, userMsg, botMsg]);
    setInput("");
  };

  const QUICK = ["HELP", "CREATE", "BALANCE", "SEND 0712345678 0.2", "REDEEM A1B2C3D4", "BUY AIRTIME"];

  return (
    <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, overflow: "hidden", maxWidth: 560 }}>
      <div style={{ background: "#1A2C1A", padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg, ${GOLD}, #F4C842)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16 }}>P</div>
        <div>
          <div style={{ color: TEXT, fontWeight: 600, fontSize: 14 }}>Pesa Ya Siri</div>
          <div style={{ color: GREEN, fontSize: 11 }}>● online</div>
        </div>
      </div>
      <div style={{ height: 280, overflowY: "auto", padding: "12px 14px", display: "flex", flexDirection: "column", gap: 8, background: "#0B140B" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start" }}>
            <div style={{ background: m.from === "user" ? "#1A3A2A" : "#1E2E1E", borderRadius: m.from === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px", padding: "8px 12px", maxWidth: "75%", border: m.from === "bot" ? `1px solid ${BORDER}` : "none" }}>
              <div style={{ color: TEXT, fontSize: 12, lineHeight: 1.6, whiteSpace: "pre-line" }}>{m.text}</div>
              <div style={{ color: MUTED, fontSize: 10, textAlign: "right", marginTop: 3 }}>{m.time}</div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div style={{ padding: "8px 14px", display: "flex", flexWrap: "wrap", gap: 6, borderTop: `1px solid ${BORDER}` }}>
        {QUICK.map(q => (
          <button key={q} onClick={() => { setInput(q); }} style={{ background: "#1A2C1A", border: `1px solid ${BORDER}`, color: GREEN, borderRadius: 20, padding: "3px 10px", fontSize: 11, cursor: "pointer" }}>{q}</button>
        ))}
      </div>
      <div style={{ padding: "10px 14px", display: "flex", gap: 8, borderTop: `1px solid ${BORDER}` }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Type a command..." style={{ flex: 1, background: "#0B140B", border: `1px solid ${BORDER}`, borderRadius: 20, padding: "8px 14px", color: TEXT, fontSize: 13, outline: "none" }} />
        <button onClick={send} style={{ width: 36, height: 36, borderRadius: "50%", background: GREEN, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 20-7z"/></svg>
        </button>
      </div>
    </div>
  );
}

export default function PesaYaSiriLanding() {
  const [activeMsg, setActiveMsg] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMsg(m => (m + 1) % CHAT_MESSAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const NAV = ["How It Works", "Features", "Roadmap", "Docs", "FAQ"];

  return (
    <div style={{ background: DARK, color: TEXT, fontFamily: "'Inter', system-ui, sans-serif", minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(10,15,10,0.95)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${BORDER}`, padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: `linear-gradient(135deg, ${GOLD}, #F4C842)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, color: "#000" }}>P</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: TEXT }}>PESA YA SIRI</div>
            <div style={{ fontSize: 9, color: MUTED, letterSpacing: "0.1em" }}>Private by default.</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {NAV.map(n => <a key={n} href={`#${n.toLowerCase().replace(/ /g, "-")}`} style={{ color: MUTED, fontSize: 13, textDecoration: "none" }}>{n}</a>)}
          <a href="https://github.com/clemencedouglas/pesa-ya-siri" target="_blank" rel="noreferrer" style={{ color: MUTED }}><GITHUB_ICON /></a>
          <a href="#demo" style={{ background: GOLD, color: "#000", borderRadius: 8, padding: "7px 16px", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>Join Pilot</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 32px 60px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#1A2C1A", border: `1px solid ${GREEN}33`, borderRadius: 20, padding: "4px 12px", fontSize: 11, color: GREEN, marginBottom: 24 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: GREEN, display: "inline-block" }} />
            WhatsApp-native ZCash Wallet for Tanzania
          </div>
          <h1 style={{ fontSize: 52, fontWeight: 800, lineHeight: 1.1, margin: "0 0 20px", letterSpacing: "-1px" }}>
            Private Digital Cash,<br />
            as Simple as <span style={{ color: GREEN }}>WhatsApp.</span>
          </h1>
          <p style={{ color: MUTED, fontSize: 16, lineHeight: 1.7, margin: "0 0 32px" }}>
            Buy ZEC, send money, and buy airtime — all through WhatsApp. No apps. No complexity. Just private money that works.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="#demo" style={{ background: GOLD, color: "#000", borderRadius: 10, padding: "12px 24px", fontSize: 14, fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
              Join the Pilot →
            </a>
            <a href="https://github.com/clemencedouglas/pesa-ya-siri" target="_blank" rel="noreferrer" style={{ background: "transparent", color: TEXT, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "12px 24px", fontSize: 14, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
              <GITHUB_ICON /> View on GitHub
            </a>
          </div>
          <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ display: "flex" }}>
              {["#25D366", "#F4A800", "#60A5FA"].map((c, i) => (
                <div key={i} style={{ width: 28, height: 28, borderRadius: "50%", background: c, border: "2px solid " + DARK, marginLeft: i > 0 ? -8 : 0 }} />
              ))}
            </div>
            <div style={{ fontSize: 12, color: MUTED }}>Built in Tanzania. For Tanzania.<br />Financial privacy for everyone.</div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WhatsAppMockup activeMsg={activeMsg} />
        </div>
      </section>

      {/* WHY */}
      <section style={{ background: CARD, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, padding: "60px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: 28, fontWeight: 700, marginBottom: 40 }}>Why Pesa Ya Siri?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[
              { icon: <SHIELD_ICON />, title: "Private", desc: "ZCash shielded transactions protect your sender, receiver, and amount." },
              { icon: <WA_ICON />, title: "Familiar", desc: "Works entirely through WhatsApp — the app you already know and trust." },
              { icon: <USERS_ICON />, title: "Accessible", desc: "No app installation. No seed phrases. No technical knowledge. Just start." },
            ].map((f, i) => (
              <div key={i} style={{ background: DARK, border: `1px solid ${BORDER}`, borderRadius: 14, padding: "28px 24px" }}>
                <div style={{ marginBottom: 14 }}>{f.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{f.title}</div>
                <div style={{ color: MUTED, fontSize: 13, lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 32px" }}>
        <h2 style={{ textAlign: "center", fontSize: 28, fontWeight: 700, marginBottom: 12 }}>How It Works</h2>
        <p style={{ textAlign: "center", color: MUTED, marginBottom: 48, fontSize: 14 }}>Five steps. No app downloads. No exchange accounts.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8, alignItems: "start" }}>
          {[
            { n: "1", title: "Buy Voucher", desc: "Purchase a Pesa Ya Siri voucher from local vendors.", icon: "🏪" },
            { n: "2", title: "Redeem on WhatsApp", desc: "Scratch the card and send the code on WhatsApp.", icon: "💬" },
            { n: "3", title: "Receive ZEC", desc: "ZEC is credited to your wallet instantly and privately.", icon: "⚡" },
            { n: "4", title: "Send Privately", desc: "Send ZEC to anyone on Pesa Ya Siri instantly.", icon: "🔐" },
            { n: "5", title: "Buy Airtime", desc: "Use your ZEC balance to buy airtime for any network.", icon: "📱" },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", position: "relative" }}>
              {i < 4 && <div style={{ position: "absolute", top: 20, left: "60%", width: "80%", height: 1, background: `linear-gradient(90deg, ${GOLD}44, transparent)`, zIndex: 0 }} />}
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: CARD, border: `2px solid ${GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, marginBottom: 12, position: "relative", zIndex: 1 }}>{s.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 6, color: GREEN }}>{s.title}</div>
              <div style={{ color: MUTED, fontSize: 11, lineHeight: 1.5 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* LIVE DEMO */}
      <section id="demo" style={{ background: CARD, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, padding: "80px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <div style={{ color: GREEN, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>TRY IT</div>
            <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 16, lineHeight: 1.2 }}>Live Demo</h2>
            <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>Experience Pesa Ya Siri in action. Try common commands and see how simple private payments can be.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {["CREATE", "BALANCE", "SEND 0712345678 0.1", "REDEEM A1B2C3D4", "BUY AIRTIME", "HELP"].map(cmd => (
                <div key={cmd} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <code style={{ background: DARK, border: `1px solid ${BORDER}`, borderRadius: 6, padding: "3px 10px", fontSize: 12, color: GREEN, fontFamily: "monospace" }}>{cmd}</code>
                  <span style={{ color: MUTED, fontSize: 12 }}>
                    {cmd === "CREATE" && "— Create a new wallet"}
                    {cmd === "BALANCE" && "— Check your balance"}
                    {cmd.startsWith("SEND") && "— Send ZEC privately"}
                    {cmd.startsWith("REDEEM") && "— Redeem voucher"}
                    {cmd === "BUY AIRTIME" && "— Buy mobile airtime"}
                    {cmd === "HELP" && "— Show this menu"}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <LiveDemo />
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, padding: 28 }}>
            <div style={{ fontSize: 24, marginBottom: 12 }}>🔗</div>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Architecture</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              {["WhatsApp", "→", "Pesa Ya Siri", "→", "ZCash Network"].map((item, i) => (
                <span key={i} style={{ color: item === "→" ? MUTED : item === "Pesa Ya Siri" ? GOLD : TEXT, fontSize: 13, fontWeight: item === "Pesa Ya Siri" ? 700 : 400 }}>{item}</span>
              ))}
            </div>
            <div style={{ marginTop: 12, color: MUTED, fontSize: 12, lineHeight: 1.6 }}>Powered by lightwalletd and ZCash Ironwood shielded transactions.</div>
            <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["Vodacom", "Airtel", "Yas", "Holotel"].map(v => (
                <span key={v} style={{ background: DARK, border: `1px solid ${BORDER}`, borderRadius: 6, padding: "2px 8px", fontSize: 11, color: MUTED }}>{v}</span>
              ))}
            </div>
          </div>
          <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, padding: 28, textAlign: "center" }}>
            <div style={{ fontSize: 48, fontWeight: 900, color: GREEN, marginBottom: 4 }}>100%</div>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Open Source</div>
            <div style={{ color: MUTED, fontSize: 13, lineHeight: 1.6, marginBottom: 20 }}>Transparent. Auditable. Community driven. Because privacy belongs to everyone.</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <a href="https://github.com/clemencedouglas/pesa-ya-siri" target="_blank" rel="noreferrer" style={{ background: DARK, border: `1px solid ${BORDER}`, color: TEXT, borderRadius: 8, padding: "8px 16px", fontSize: 13, textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <GITHUB_ICON /> View on GitHub
              </a>
              <a href="https://web-production-fe8ba0.up.railway.app/health" target="_blank" rel="noreferrer" style={{ background: DARK, border: `1px solid ${BORDER}`, color: TEXT, borderRadius: 8, padding: "8px 16px", fontSize: 13, textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                📄 Read Documentation
              </a>
            </div>
          </div>
          <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, padding: 28 }}>
            <div style={{ fontSize: 24, marginBottom: 12 }}>🗺</div>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Roadmap</div>
            {[
              { label: "MVP Completed", desc: "Backend, WhatsApp bot, database, voucher system", done: true },
              { label: "Production Infrastructure", desc: "Connect to ZCash (Ironwood), lightwalletd, security hardening", done: false, active: true },
              { label: "Pilot Launch", desc: "Dar es Salaam — real users, real transactions", done: false },
              { label: "Expand to Arusha", desc: "More users, more vendors, more use cases", done: false },
              { label: "East Africa", desc: "Bringing private money to the region", done: false },
            ].map((r, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "flex-start" }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: r.done ? GREEN : r.active ? GOLD : BORDER, flexShrink: 0, marginTop: 4 }} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: r.done ? GREEN : r.active ? GOLD : MUTED }}>{r.label}</div>
                  <div style={{ fontSize: 11, color: MUTED, lineHeight: 1.4 }}>{r.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUILT FOR */}
      <section style={{ background: CARD, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, padding: "60px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {[
            { icon: "⚡", title: "Powered by ZCash", desc: "Built on ZCash for strong privacy guarantees and financial freedom.", link: "Learn more about ZCash →" },
            { icon: "🇹🇿", title: "Built for Tanzania", desc: "Local currency, local vendors, local support. Built with the Tanzanian community in mind.", link: "Learn more →" },
            { icon: "📈", title: "Built to Scale", desc: "Designed to onboard millions with reliable infrastructure and real-world partnerships.", link: "See roadmap →" },
          ].map((b, i) => (
            <div key={i} style={{ background: DARK, border: `1px solid ${BORDER}`, borderRadius: 14, padding: 24 }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{b.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{b.title}</div>
              <div style={{ color: MUTED, fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>{b.desc}</div>
              <a href="#" style={{ color: GREEN, fontSize: 12, textDecoration: "none" }}>{b.link}</a>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${BORDER}`, padding: "32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: `linear-gradient(135deg, ${GOLD}, #F4C842)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 12, color: "#000" }}>P</div>
          <div style={{ fontWeight: 700, fontSize: 13 }}>PESA YA SIRI</div>
          <span style={{ color: MUTED, fontSize: 12 }}>© 2025 Pesa Ya Siri. All rights reserved.</span>
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          {["Docs", "FAQ", "Privacy", "Contact"].map(l => (
            <a key={l} href="#" style={{ color: MUTED, fontSize: 12, textDecoration: "none" }}>{l}</a>
          ))}
          <a href="https://github.com/clemencedouglas/pesa-ya-siri" target="_blank" rel="noreferrer" style={{ color: MUTED }}><GITHUB_ICON /></a>
        </div>
      </footer>
    </div>
  );
}


