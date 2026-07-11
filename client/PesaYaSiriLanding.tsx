import { useState, useEffect, useRef } from "react";

const GOLD = "#F4A800";
const GREEN = "#25D366";
const DARK = "#0A0F0A";
const CARD = "#111811";
const BORDER = "#1E2E1E";
const TEXT = "#E8F0E8";
const MUTED = "#6B7F6B";
const GITHUB = "https://github.com/clemencedouglas/pesa-ya-siri";

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

const CHAT_MESSAGES = [
  { from: "user", text: "CREATE", time: "9:41 AM" },
  { from: "bot", text: "Wallet created!\nAddress: zs1q9x...8m7f\nBalance: 0.0000 ZEC", time: "9:41 AM" },
  { from: "user", text: "BALANCE", time: "9:41 AM" },
  { from: "bot", text: "Your Balance\n0.5304 ZEC\n26,520 TZS", time: "9:41 AM" },
  { from: "user", text: "SEND 0712345678 0.2", time: "9:42 AM" },
  { from: "bot", text: "Sent! 0.2 ZEC to 0712345678.\nShielded. Private. Secure.", time: "9:42 AM" },
  { from: "user", text: "BUY AIRTIME", time: "9:43 AM" },
  { from: "bot", text: "Airtime: 5,000 TZS\nDelivered to 0712.\nDone!", time: "9:43 AM" },
];

const DEMO_RESPONSES = {
  "HELP": "Karibu! Commands:\nCREATE - Create wallet\nBALANCE - Check balance\nSEND [phone] [amt] - Send ZEC\nREDEEM [code] - Redeem voucher\nBUY AIRTIME - Buy airtime\nHELP - Show this menu",
  "CREATE": "Wallet created!\nAddress: zs1q9x...8m7f\nBalance: 0.0000 ZEC\nYou can now receive ZEC.",
  "BALANCE": "Your Balance\n0.5304 ZEC\n26,520 TZS\nWallet: zs1q9x...8m7f",
  "SEND 0712345678 0.2": "Sent! 0.2000 ZEC to 0712345678.\nShielded. Private. Secure.\nNew balance: 0.3304 ZEC",
  "REDEEM A1B2C3D4": "Voucher redeemed!\n0.4000 ZEC credited.\nNew balance: 0.9304 ZEC",
  "BUY AIRTIME": "Airtime Purchase\nPhone: 0712\nAmount: 5,000 TZS\nDelivered successfully.",
};

const NAV_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Docs", href: GITHUB + "#readme" },
  { label: "FAQ", href: "#faq" },
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

function WhatsAppMockup({ activeMsg }) {
  return (
    <div style={{ width: 240, background: "#111", borderRadius: 32, padding: "10px 5px", boxShadow: "0 40px 80px rgba(0,0,0,0.6)", border: "1px solid #222" }}>
      <div style={{ background: "#1A2C1A", borderRadius: "24px 24px 0 0", padding: "8px 12px", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #F4A800, #F4C842)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800 }}>P</div>
        <div>
          <div style={{ color: TEXT, fontSize: 12, fontWeight: 600 }}>Pesa Ya Siri</div>
          <div style={{ color: GREEN, fontSize: 9 }}>online</div>
        </div>
      </div>
      <div style={{ background: "#0B140B", minHeight: 280, padding: "8px 6px", display: "flex", flexDirection: "column", gap: 5, overflowY: "auto", maxHeight: 280 }}>
        {CHAT_MESSAGES.slice(0, activeMsg + 1).map((msg, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: msg.from === "user" ? "flex-end" : "flex-start" }}>
            <div style={{ background: msg.from === "user" ? "#1A3A2A" : "#1E2E1E", borderRadius: msg.from === "user" ? "10px 10px 2px 10px" : "10px 10px 10px 2px", padding: "5px 8px", maxWidth: "82%", border: msg.from === "bot" ? "1px solid " + BORDER : "none" }}>
              <div style={{ color: TEXT, fontSize: 10, lineHeight: 1.5, whiteSpace: "pre-line" }}>{msg.text}</div>
              <div style={{ color: MUTED, fontSize: 8, textAlign: "right", marginTop: 2 }}>{msg.time}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ background: "#1A2C1A", borderRadius: "0 0 24px 24px", padding: "6px 8px", display: "flex", alignItems: "center", gap: 5 }}>
        <div style={{ flex: 1, background: "#0B140B", borderRadius: 20, padding: "5px 10px", color: MUTED, fontSize: 10 }}>Message...</div>
        <div style={{ width: 24, height: 24, borderRadius: "50%", background: GREEN, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="white"><path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 20-7z"/></svg>
        </div>
      </div>
    </div>
  );
}

function LiveDemo() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Karibu! Type HELP to see all commands.", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }
  ]);
  const bottomRef = useRef(null);
  const isMobile = useIsMobile();

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
    <div style={{ background: CARD, border: "1px solid " + BORDER, borderRadius: 16, overflow: "hidden", width: "100%" }}>
      <div style={{ background: "#1A2C1A", padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #F4A800, #F4C842)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 15 }}>P</div>
        <div>
          <div style={{ color: TEXT, fontWeight: 600, fontSize: 13 }}>Pesa Ya Siri</div>
          <div style={{ color: GREEN, fontSize: 10 }}>online</div>
        </div>
      </div>
      <div style={{ height: 220, overflowY: "auto", padding: "10px 12px", display: "flex", flexDirection: "column", gap: 7, background: "#0B140B" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start" }}>
            <div style={{ background: m.from === "user" ? "#1A3A2A" : "#1E2E1E", borderRadius: m.from === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px", padding: "7px 10px", maxWidth: "80%", border: m.from === "bot" ? "1px solid " + BORDER : "none" }}>
              <div style={{ color: TEXT, fontSize: 12, lineHeight: 1.6, whiteSpace: "pre-line" }}>{m.text}</div>
              <div style={{ color: MUTED, fontSize: 9, textAlign: "right", marginTop: 2 }}>{m.time}</div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div style={{ padding: "7px 12px", display: "flex", flexWrap: "wrap", gap: 5, borderTop: "1px solid " + BORDER }}>
        {QUICK.map(q => (
          <button key={q} onClick={() => setInput(q)} style={{ background: "#1A2C1A", border: "1px solid " + BORDER, color: GREEN, borderRadius: 20, padding: "3px 9px", fontSize: 10, cursor: "pointer" }}>{q}</button>
        ))}
      </div>
      <div style={{ padding: "9px 12px", display: "flex", gap: 7, borderTop: "1px solid " + BORDER }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Type a command..." style={{ flex: 1, background: "#0B140B", border: "1px solid " + BORDER, borderRadius: 20, padding: "7px 12px", color: TEXT, fontSize: 12, outline: "none" }} />
        <button onClick={send} style={{ width: 34, height: 34, borderRadius: "50%", background: GREEN, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 20-7z"/></svg>
        </button>
      </div>
    </div>
  );
}

export default function PesaYaSiriLanding() {
  const [activeMsg, setActiveMsg] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [pilotClicked, setPilotClicked] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMsg(m => (m + 1) % CHAT_MESSAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ background: DARK, color: TEXT, fontFamily: "'Inter', system-ui, sans-serif", minHeight: "100vh" }}>

      {/* GLOBAL MOBILE STYLES */}
      <style>{`
        * { box-sizing: border-box; }
        @media (max-width: 768px) {
          .grid-2 { grid-template-columns: 1fr !important; }
          .grid-3 { grid-template-columns: 1fr !important; }
          .grid-5 { grid-template-columns: repeat(2, 1fr) !important; }
          .hero-title { font-size: 32px !important; }
          .nav-links { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
          .hide-mobile { display: none !important; }
          .section-pad { padding: 40px 16px !important; }
          .hero-pad { padding: 40px 16px 32px !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(10,15,10,0.97)", backdropFilter: "blur(12px)", borderBottom: "1px solid " + BORDER, padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 52 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 26, height: 26, borderRadius: 7, background: "linear-gradient(135deg, #F4A800, #F4C842)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13, color: "#000" }}>P</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13, color: TEXT }}>PESA YA SIRI</div>
            <div style={{ fontSize: 8, color: MUTED, letterSpacing: "0.1em" }}>Private by default.</div>
          </div>
        </div>
        <div className="nav-links" style={{ display: "flex", gap: 20, alignItems: "center" }}>
          {NAV_LINKS.map(n => (
            <a key={n.label} href={n.href} target={n.href.startsWith("http") ? "_blank" : "_self"} rel="noreferrer" style={{ color: MUTED, fontSize: 12, textDecoration: "none" }}>{n.label}</a>
          ))}
          <a href={GITHUB} target="_blank" rel="noreferrer" style={{ color: MUTED }}><GITHUB_ICON /></a>
          <button onClick={() => window.location.href = '/waitlist'} style={{ background: GOLD, color: "#000", borderRadius: 7, padding: "6px 14px", fontSize: 12, fontWeight: 600, border: "none", cursor: "pointer" }}>
  Join Pilot
</button>
        </div>
        <button className="nav-mobile-btn" onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", color: TEXT, cursor: "pointer", fontSize: 22, padding: 4 }}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div style={{ position: "fixed", top: 52, left: 0, right: 0, background: CARD, borderBottom: "1px solid " + BORDER, zIndex: 99, padding: "16px" }}>
          {NAV_LINKS.map(n => (
            <a key={n.label} href={n.href} onClick={() => setMenuOpen(false)} target={n.href.startsWith("http") ? "_blank" : "_self"} rel="noreferrer" style={{ display: "block", color: TEXT, fontSize: 15, textDecoration: "none", padding: "10px 0", borderBottom: "1px solid " + BORDER }}>{n.label}</a>
          ))}
          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            <a href={GITHUB} target="_blank" rel="noreferrer" style={{ color: MUTED }}><GITHUB_ICON /></a>
            <button onClick={() => window.location.href = '/waitlist'} style={{ background: GOLD, color: "#000", borderRadius: 7, padding: "6px 14px", fontSize: 12, fontWeight: 600, border: "none", cursor: "pointer" }}>
  Join Pilot
</button>
          </div>
        </div>
      )}

      {/* HERO */}
      <section className="hero-pad" style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#1A2C1A", border: "1px solid " + GREEN + "33", borderRadius: 20, padding: "4px 12px", fontSize: 11, color: GREEN, marginBottom: 20 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: GREEN, display: "inline-block" }} />
            WhatsApp-native ZCash Wallet for Tanzania
          </div>
          <h1 className="hero-title" style={{ fontSize: 44, fontWeight: 800, lineHeight: 1.15, margin: "0 0 16px", letterSpacing: "-0.5px" }}>
            Private Digital Cash,<br />
            as Simple as <span style={{ color: GREEN }}>WhatsApp.</span>
          </h1>
          <p style={{ color: MUTED, fontSize: 15, lineHeight: 1.7, margin: "0 0 28px" }}>
            Buy ZEC, send money, and buy airtime — all through WhatsApp. No apps. No complexity. Just private money that works.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button onClick={() => window.location.href = '/waitlist'} style={{ background: GOLD, color: "#000", borderRadius: 10, padding: "11px 22px", fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer" }}>
              Join the Pilot
            </button>
            <a href={GITHUB} target="_blank" rel="noreferrer" style={{ background: "transparent", color: TEXT, border: "1px solid " + BORDER, borderRadius: 10, padding: "11px 20px", fontSize: 13, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 7 }}>
              <GITHUB_ICON /> View on GitHub
            </a>
          </div>
        </div>
        <div className="hide-mobile" style={{ display: "flex", justifyContent: "center" }}>
          <WhatsAppMockup activeMsg={activeMsg} />
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ background: CARD, borderTop: "1px solid " + BORDER, borderBottom: "1px solid " + BORDER, padding: "48px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: 24, fontWeight: 700, marginBottom: 32 }}>Why Pesa Ya Siri?</h2>
          <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {[
              { icon: <SHIELD_ICON />, title: "Private", desc: "ZCash shielded transactions protect your sender, receiver, and amount." },
              { icon: <WA_ICON />, title: "Familiar", desc: "Works entirely through WhatsApp — the app you already know and trust." },
              { icon: <USERS_ICON />, title: "Accessible", desc: "No app installation. No seed phrases. No technical knowledge. Just start." },
            ].map((f, i) => (
              <div key={i} style={{ background: DARK, border: "1px solid " + BORDER, borderRadius: 14, padding: "22px 20px" }}>
                <div style={{ marginBottom: 12 }}>{f.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{f.title}</div>
                <div style={{ color: MUTED, fontSize: 13, lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px" }}>
        <h2 style={{ textAlign: "center", fontSize: 24, fontWeight: 700, marginBottom: 10 }}>How It Works</h2>
        <p style={{ textAlign: "center", color: MUTED, marginBottom: 40, fontSize: 13 }}>Five steps. No app downloads. No exchange accounts.</p>
        <div className="grid-5" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
          {[
            { title: "Buy Voucher", desc: "Purchase from local vendors.", icon: "🏪" },
            { title: "Redeem on WhatsApp", desc: "Scratch and send the code.", icon: "💬" },
            { title: "Receive ZEC", desc: "Credited instantly and privately.", icon: "⚡" },
            { title: "Send Privately", desc: "Send ZEC to any phone number.", icon: "🔐" },
            { title: "Buy Airtime", desc: "Use ZEC to buy airtime.", icon: "📱" },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: CARD, border: "2px solid " + GOLD, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, marginBottom: 10 }}>{s.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 4, color: GREEN }}>{s.title}</div>
              <div style={{ color: MUTED, fontSize: 11, lineHeight: 1.5 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* LIVE DEMO */}
      <section id="demo" style={{ background: CARD, borderTop: "1px solid " + BORDER, borderBottom: "1px solid " + BORDER, padding: "60px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ color: GREEN, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>TRY IT</div>
            <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 10 }}>Live Demo</h2>
            <p style={{ color: MUTED, fontSize: 13, lineHeight: 1.6 }}>Experience Pesa Ya Siri in action. Tap a command or type your own.</p>
          </div>
          <div style={{ maxWidth: 560, margin: "0 auto" }}>
            <LiveDemo />
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section id="roadmap" style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px" }}>
        <h2 style={{ textAlign: "center", fontSize: 24, fontWeight: 700, marginBottom: 32 }}>Roadmap</h2>
        <div style={{ maxWidth: 600, margin: "0 auto", background: CARD, border: "1px solid " + BORDER, borderRadius: 14, padding: 28 }}>
          {[
            { label: "MVP Completed", desc: "Backend, WhatsApp bot, database, voucher system", done: true },
            { label: "Production Infrastructure", desc: "Connect to ZCash (Ironwood), lightwalletd, security hardening", done: false, active: true },
            { label: "Pilot Launch", desc: "Dar es Salaam — real users, real transactions", done: false },
            { label: "Expand to Arusha", desc: "More users, more vendors, more use cases", done: false },
            { label: "East Africa", desc: "Bringing private money to the region", done: false },
          ].map((r, i) => (
            <div key={i} style={{ display: "flex", gap: 12, marginBottom: 16, alignItems: "flex-start" }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: r.done ? GREEN : r.active ? GOLD : BORDER, flexShrink: 0, marginTop: 5 }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: r.done ? GREEN : r.active ? GOLD : MUTED }}>{r.label}</div>
                <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.5 }}>{r.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* OPEN SOURCE */}
      <section style={{ background: CARD, borderTop: "1px solid " + BORDER, borderBottom: "1px solid " + BORDER, padding: "48px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 500, margin: "0 auto" }}>
          <div style={{ fontSize: 52, fontWeight: 900, color: GREEN, marginBottom: 6 }}>100%</div>
          <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 10 }}>Open Source</div>
          <div style={{ color: MUTED, fontSize: 13, lineHeight: 1.7, marginBottom: 24 }}>Transparent. Auditable. Community driven. Because privacy belongs to everyone.</div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={GITHUB} target="_blank" rel="noreferrer" style={{ background: DARK, border: "1px solid " + BORDER, color: TEXT, borderRadius: 8, padding: "9px 18px", fontSize: 13, textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
              <GITHUB_ICON /> View on GitHub
            </a>
            <a href={GITHUB + "#readme"} target="_blank" rel="noreferrer" style={{ background: DARK, border: "1px solid " + BORDER, color: TEXT, borderRadius: 8, padding: "9px 18px", fontSize: 13, textDecoration: "none" }}>
              Read Docs
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ maxWidth: 700, margin: "0 auto", padding: "60px 24px" }}>
        <h2 style={{ textAlign: "center", fontSize: 24, fontWeight: 700, marginBottom: 32 }}>Frequently Asked Questions</h2>
        {[
          { q: "Do I need to download an app?", a: "No. Pesa Ya Siri works entirely through WhatsApp. If you have WhatsApp, you are ready." },
          { q: "How do I get ZEC?", a: "Buy a Pesa Ya Siri recharge card from a local vendor, scratch it, and send the code on WhatsApp. ZEC is credited instantly." },
          { q: "Is my transaction history private?", a: "Yes. Every transaction uses ZCash shielded addresses, which encrypt the sender, receiver, and amount on the blockchain." },
          { q: "Which networks can I buy airtime for?", a: "Vodacom, Airtel, Yas, and Holotel are supported in the pilot. More networks will be added." },
          { q: "When is the pilot launching?", a: "The pilot is launching in Dar es Salaam soon. Click Join Pilot to be notified." },
        ].map((item, i) => (
          <div key={i} style={{ borderBottom: "1px solid " + BORDER, padding: "18px 0" }}>
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 7 }}>{item.q}</div>
            <div style={{ color: MUTED, fontSize: 13, lineHeight: 1.7 }}>{item.a}</div>
          </div>
        ))}
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid " + BORDER, padding: "24px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 22, height: 22, borderRadius: 6, background: "linear-gradient(135deg, #F4A800, #F4C842)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 11, color: "#000" }}>P</div>
          <span style={{ color: MUTED, fontSize: 11 }}>2025 Pesa Ya Siri. All rights reserved.</span>
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
          <a href={GITHUB + "#readme"} target="_blank" rel="noreferrer" style={{ color: MUTED, fontSize: 12, textDecoration: "none" }}>Docs</a>
          <a href="#faq" style={{ color: MUTED, fontSize: 12, textDecoration: "none" }}>FAQ</a>
          <a href="#" style={{ color: MUTED, fontSize: 12, textDecoration: "none" }}>Privacy</a>
          <a href={GITHUB} target="_blank" rel="noreferrer" style={{ color: MUTED }}><GITHUB_ICON /></a>
        </div>
      </footer>
    </div>
  );
}

