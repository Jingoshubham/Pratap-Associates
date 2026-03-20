import { useState, useEffect, useRef } from "react";
import bgImage from "./assets/high-angle-shot-beautiful-scenery-victoria-peak-hong-kong.jpg";

// ── Design Tokens ──────────────────────────────────────────────────────────
const COLORS = {
  primary: "#0A1628",
  accent: "#C9A84C",
  white: "#FFFFFF",
  offWhite: "#F8F6F1",
  gray: "#6B7280",
  grayLight: "#E5E7EB",
  grayMid: "#9CA3AF",
  dark: "#1F2937",
};

// ── Responsive Hook ────────────────────────────────────────────────────────
function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const handle = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);
  return width;
}

// ── Mock Data ──────────────────────────────────────────────────────────────
const listings = [
  { id: 1, address: "12 Riverside Drive",    suburb: "North Adelaide SA 5006", price: "$1,250,000", beds: 4, baths: 2, parking: 2, type: "House",     tag: "For Sale",  img: "https://picsum.photos/seed/house1/600/400",  agent: "Rachel Lawrie",  date: "March 14, 2026"    },
  { id: 2, address: "7/45 Garden Terrace",    suburb: "Prospect SA 5082",       price: "$620,000",   beds: 3, baths: 2, parking: 1, type: "Apartment", tag: "New",       img: "https://picsum.photos/seed/apt2/600/400",    agent: "James Cooper",   date: "March 10, 2026"    },
  { id: 3, address: "88 Grandview Avenue",    suburb: "Burnside SA 5066",       price: "$2,100,000", beds: 5, baths: 3, parking: 3, type: "Villa",     tag: "For Sale",  img: "https://picsum.photos/seed/villa3/600/400",  agent: "Sarah Mitchell", date: "March 5, 2026"     },
  { id: 4, address: "3 Willow Court",         suburb: "Willaston SA 5118",      price: "$485,000",   beds: 3, baths: 1, parking: 2, type: "House",     tag: "Open Soon", img: "https://picsum.photos/seed/house4/600/400",  agent: "Rachel Lawrie",  date: "February 28, 2026" },
  { id: 5, address: "101 Seafront Boulevard", suburb: "Glenelg SA 5045",        price: "$3,400,000", beds: 5, baths: 4, parking: 4, type: "Villa",     tag: "For Sale",  img: "https://picsum.photos/seed/villa5/600/400",  agent: "James Cooper",   date: "February 20, 2026" },
  { id: 6, address: "22 Parklands Close",     suburb: "Tranmere SA 5073",       price: "$765,000",   beds: 4, baths: 2, parking: 2, type: "House",     tag: "For Sale",  img: "https://picsum.photos/seed/house6/600/400",  agent: "Sarah Mitchell", date: "January 30, 2026"  },
];

const testimonials = [
  { name: "Michael T.", role: "Residential Vendor", text: "Rachel was an absolute pleasure to deal with. Her market knowledge is unmatched, and the entire process was smooth and stress-free. I couldn't recommend her more highly." },
  { name: "Gregory P.", role: "Residential Vendor", text: "Rachel is the ultimate professional. She listened, communicated frequently, and kept us informed every step of the way. We felt supported throughout the entire sale." },
  { name: "Amanda L.", role: "Property Buyer",      text: "From our first meeting to settlement, Stadium Real Estate exceeded every expectation. Their community focus and genuine care sets them apart from every other agency." },
];

const stats = [
  { label: "Properties Listed", value: "10++" },
  { label: "Properties Sold",   value: "10++"   },
  { label: "Satisfied Clients", value: "10++"   },
  { label: "Realtor Awards",    value: "10++"    },
];

const navLinks = [
  { label: "SERVICES",       sub: ["Latest Listings", "Commercial", "Land", "Open for Inspection"] },
  { label: "Rent",      sub: ["Available Rentals", "Open Inspections", "Leased Properties"]   },
  { label: "Sell",      sub: ["Sold Properties", "Property Appraisal"]                        },
  { label: "About",     sub: ["About Us", "Team"]                                             },
  { label: "Contact"   },
];

const rentalPlans = [
  { type: "1RK / 1BHK", price: "₹3,000", icon: "🏠", desc: "Studio & compact apartments", highlight: false },
  { type: "2 BHK",       price: "₹3,500", icon: "🏡", desc: "2-bedroom family homes",      highlight: false },
  { type: "2.5 BHK",     price: "₹4,000", icon: "🏘", desc: "Spacious 2.5-bedroom units",  highlight: true  },
  { type: "3 BHK",       price: "₹4,500", icon: "🏢", desc: "Premium 3-bedroom homes",     highlight: false },
  { type: "3 BHK + 1",   price: "₹5,000", icon: "🏰", desc: "Luxury large family homes",   highlight: false },
];

const rentalBenefits = [
  { icon: "🔄", title: "Free Re-Renting",    desc: "If the apartment becomes vacant during the tenure, we assist in re-renting at zero additional service fee."    },
  { icon: "🤝", title: "Renewal Discount",   desc: "Renewal with the same tenant is charged at just ₹2,500 + applicable taxes — saving you significantly."         },
  { icon: "💰", title: "Charges Reimbursed", desc: "For properties continuously managed by our team, rental service charges will be fully reimbursed."              },
  { icon: "📋", title: "11-Month Validity",  desc: "All service charges are valid for a full period of 11 months from the date of agreement."                      },
];

// ── Icons ──────────────────────────────────────────────────────────────────
function BedIcon()  { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 9V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3"/><path d="M2 11v7a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-7"/><path d="M7 11v-4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v4"/></svg>; }
function BathIcon() { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6 L9 2 M5 10 L19 10 L19 19 A2 2 0 0 1 17 21 L7 21 A2 2 0 0 1 5 19 Z"/><path d="M5 10 A4 4 0 0 1 9 6"/></svg>; }
function CarIcon()  { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="11" width="22" height="9" rx="2"/><path d="M5 11L7 6h10l2 5"/><circle cx="7" cy="20" r="1"/><circle cx="17" cy="20" r="1"/></svg>; }
function StarIcon() { return <svg width="15" height="15" viewBox="0 0 24 24" fill={COLORS.accent} stroke={COLORS.accent} strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>; }

// ── Desktop NavItem ────────────────────────────────────────────────────────
function NavItem({ link }) {
  const [open, setOpen] = useState(false);
  const timer = useRef(null);
  const show = () => { clearTimeout(timer.current); setOpen(true); };
  const hide = () => { timer.current = setTimeout(() => setOpen(false), 120); };

  return (
    <div style={{ position: "relative" }} onMouseEnter={show} onMouseLeave={hide}>
      <span style={{ color: COLORS.white, fontSize: "13px", fontWeight: "500", cursor: "pointer", letterSpacing: "0.04em", fontFamily: "sans-serif", userSelect: "none" }}>
        {link.label} {link.sub && "▾"}
      </span>
      {link.sub && open && (
        <div onMouseEnter={show} onMouseLeave={hide} style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", paddingTop: "10px", zIndex: 300, minWidth: "190px" }}>
          <div style={{ background: COLORS.white, borderRadius: "10px", boxShadow: "0 16px 48px rgba(0,0,0,0.18)", padding: "6px 0", border: `1px solid ${COLORS.grayLight}` }}>
            {link.sub.map(s => (
              <div key={s} onClick={() => setOpen(false)}
                style={{ padding: "10px 18px", fontSize: "13px", fontFamily: "sans-serif", color: COLORS.dark, cursor: "pointer", margin: "2px 6px", borderRadius: "6px" }}
                onMouseEnter={e => e.currentTarget.style.background = COLORS.offWhite}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >{s}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Property Card ──────────────────────────────────────────────────────────
function PropertyCard({ p }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: COLORS.white, borderRadius: "12px", overflow: "hidden", boxShadow: hov ? "0 20px 60px rgba(0,0,0,0.14)" : "0 4px 24px rgba(0,0,0,0.07)", transition: "transform 0.3s, box-shadow 0.3s", transform: hov ? "translateY(-6px)" : "none", cursor: "pointer" }}>
      <div style={{ position: "relative", height: "210px", overflow: "hidden" }}>
        <img src={p.img} alt={p.address}
          onError={e => { e.currentTarget.src = `https://picsum.photos/seed/fb${p.id}/600/400`; }}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s", transform: hov ? "scale(1.06)" : "scale(1)" }} />
        <div style={{ position: "absolute", top: 12, left: 12, background: p.tag === "New" ? COLORS.accent : COLORS.primary, color: p.tag === "New" ? COLORS.primary : COLORS.white, fontSize: "10px", fontWeight: "700", letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 10px", borderRadius: "4px" }}>{p.tag}</div>
        <div style={{ position: "absolute", bottom: 12, right: 12, background: "rgba(10,22,40,0.85)", color: COLORS.accent, fontSize: "15px", fontWeight: "700", padding: "5px 12px", borderRadius: "6px" }}>{p.price}</div>
      </div>
      <div style={{ padding: "16px 18px 18px" }}>
        <div style={{ fontSize: "14px", fontWeight: "700", color: COLORS.primary, marginBottom: "3px" }}>{p.address}</div>
        <div style={{ fontSize: "12px", color: COLORS.gray, marginBottom: "12px" }}>{p.suburb}</div>
        <div style={{ display: "flex", gap: "14px", color: COLORS.gray, fontSize: "12px", marginBottom: "12px", paddingBottom: "12px", borderBottom: `1px solid ${COLORS.grayLight}` }}>
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><BedIcon /> {p.beds}</span>
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><BathIcon /> {p.baths}</span>
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><CarIcon /> {p.parking}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: COLORS.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "700", color: COLORS.primary }}>{p.agent.split(" ").map(n => n[0]).join("")}</div>
            <span style={{ fontSize: "11px", color: COLORS.gray }}>{p.agent}</span>
          </div>
          <span style={{ fontSize: "10px", color: COLORS.grayMid }}>{p.date}</span>
        </div>
      </div>
    </div>
  );
}

// ── Rental Proposal ────────────────────────────────────────────────────────
function RentalProposal({ isMobile, isTablet }) {
  const [hovPlan, setHovPlan] = useState(null);
  const [hovBenefit, setHovBenefit] = useState(null);

  return (
    <section style={{ background: COLORS.primary, padding: isMobile ? "60px 5%" : "90px 5%", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "4px", background: "linear-gradient(180deg,transparent,#C9A84C,transparent)" }} />
      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: isMobile ? "40px" : "64px" }}>
          <div style={{ display: "inline-block", background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.3)", borderRadius: "50px", padding: "6px 20px", fontSize: "11px", fontWeight: "700", letterSpacing: "0.2em", color: COLORS.accent, textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: "16px" }}>
            Rental Service Proposal
          </div>
          <h2 style={{ fontSize: isMobile ? "26px" : "clamp(28px,4vw,52px)", fontWeight: "400", color: COLORS.white, margin: "0 0 14px", lineHeight: "1.2", fontFamily: "Georgia, serif" }}>
            Transparent Pricing, <span style={{ color: COLORS.accent, fontStyle: "italic" }}>Trusted Service</span>
          </h2>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", maxWidth: "500px", margin: "0 auto", lineHeight: "1.8", fontFamily: "sans-serif" }}>
            We don't charge too much value
          </p>
        </div>

        {/* Pricing Grid */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "repeat(3,1fr)" : "repeat(5,1fr)", gap: "12px", marginBottom: isMobile ? "48px" : "72px" }}>
          {rentalPlans.map((plan, i) => {
            const isHL = plan.highlight;
            const isH = hovPlan === i;
            return (
              <div key={i} onMouseEnter={() => setHovPlan(i)} onMouseLeave={() => setHovPlan(null)}
                style={{ position: "relative", background: isHL ? COLORS.accent : isH ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)", border: isHL ? "none" : `1px solid rgba(201,168,76,${isH ? "0.4" : "0.15"})`, borderRadius: "14px", padding: isMobile ? "22px 14px 18px" : "28px 20px 24px", textAlign: "center", cursor: "pointer", transition: "all 0.3s", transform: isHL ? "translateY(-8px)" : isH ? "translateY(-4px)" : "none", boxShadow: isHL ? "0 20px 50px rgba(201,168,76,0.22)" : "none" }}>
                {isHL && <div style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", background: COLORS.primary, color: COLORS.accent, fontSize: "9px", fontWeight: "800", letterSpacing: "0.12em", textTransform: "uppercase", padding: "4px 12px", borderRadius: "50px", fontFamily: "sans-serif", whiteSpace: "nowrap", border: "1px solid rgba(201,168,76,0.4)" }}>★ Popular</div>}
                <div style={{ fontSize: isMobile ? "22px" : "28px", marginBottom: "8px" }}>{plan.icon}</div>
                <div style={{ fontSize: "10px", fontWeight: "700", color: isHL ? COLORS.primary : COLORS.accent, marginBottom: "6px", fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: "0.05em" }}>{plan.type}</div>
                <div style={{ fontSize: isMobile ? "24px" : "30px", fontWeight: "700", color: isHL ? COLORS.primary : COLORS.white, lineHeight: "1", marginBottom: "4px", fontFamily: "sans-serif" }}>{plan.price}</div>
                <div style={{ fontSize: "9px", color: isHL ? "rgba(10,22,40,0.6)" : "rgba(255,255,255,0.4)", fontFamily: "sans-serif" }}>per apt / 11 months</div>
                {!isMobile && <div style={{ fontSize: "11px", color: isHL ? "rgba(10,22,40,0.65)" : "rgba(255,255,255,0.45)", fontFamily: "sans-serif", marginTop: "8px" }}>{plan.desc}</div>}
              </div>
            );
          })}
        </div>

        {/* Benefits */}
        <div style={{ marginBottom: isMobile ? "40px" : "64px" }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.18em", color: COLORS.accent, textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: "8px" }}>Why Choose Us</div>
            <h3 style={{ fontSize: isMobile ? "22px" : "clamp(22px,3vw,36px)", fontWeight: "400", color: COLORS.white, margin: 0, fontFamily: "Georgia, serif" }}>Key Benefits</h3>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", gap: "14px" }}>
            {rentalBenefits.map((b, i) => {
              const isH = hovBenefit === i;
              return (
                <div key={i} onMouseEnter={() => setHovBenefit(i)} onMouseLeave={() => setHovBenefit(null)}
                  style={{ background: isH ? "rgba(201,168,76,0.08)" : "rgba(255,255,255,0.03)", border: `1px solid rgba(201,168,76,${isH ? "0.3" : "0.1"})`, borderRadius: "12px", padding: "22px", transition: "all 0.3s", transform: isH ? "translateY(-3px)" : "none", display: "flex", gap: "14px", alignItems: "flex-start" }}>
                  <div style={{ width: "42px", height: "42px", background: "rgba(201,168,76,0.12)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>{b.icon}</div>
                  <div>
                    <h4 style={{ fontSize: "14px", fontWeight: "600", color: COLORS.white, margin: "0 0 5px", fontFamily: "sans-serif" }}>{b.title}</h4>
                    <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: "1.7", fontFamily: "sans-serif" }}>{b.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Notes + Offer */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "16px", marginBottom: isMobile ? "36px" : "56px" }}>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "14px", padding: isMobile ? "22px 18px" : "32px 28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
              <div style={{ width: "3px", height: "24px", background: COLORS.accent, borderRadius: "2px" }} />
              <h4 style={{ fontSize: "15px", fontWeight: "600", color: COLORS.white, margin: 0, fontFamily: "sans-serif" }}>Important Notes</h4>
            </div>
            {["Charges valid for 11 months", "Government taxes applicable", "Same-tenant renewal at ₹2,500 + taxes"].map((note, i) => (
              <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "12px", alignItems: "flex-start" }}>
                <div style={{ width: "17px", height: "17px", borderRadius: "50%", background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                  <span style={{ color: COLORS.accent, fontSize: "9px", fontWeight: "700" }}>✓</span>
                </div>
                <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", fontFamily: "sans-serif", lineHeight: "1.6" }}>{note}</span>
              </div>
            ))}
          </div>
          <div style={{ background: "linear-gradient(135deg,#C9A84C,#a8872e)", borderRadius: "14px", padding: isMobile ? "22px 18px" : "32px 28px", overflow: "hidden", position: "relative" }}>
            <div style={{ display: "inline-block", background: "rgba(10,22,40,0.15)", borderRadius: "50px", padding: "4px 14px", fontSize: "10px", fontWeight: "800", letterSpacing: "0.12em", color: COLORS.primary, textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: "14px" }}>⚡ Special Offer</div>
            <h4 style={{ fontSize: isMobile ? "17px" : "20px", fontWeight: "700", color: COLORS.primary, margin: "0 0 10px", fontFamily: "sans-serif" }}>Charges Fully Reimbursed</h4>
            <p style={{ fontSize: "13px", color: "rgba(10,22,40,0.7)", margin: "0 0 20px", lineHeight: "1.7", fontFamily: "sans-serif" }}>For properties <strong>continuously managed</strong> by our team, rental service charges will be completely reimbursed.</p>
            <button style={{ background: COLORS.primary, color: COLORS.accent, border: "none", padding: "10px 22px", borderRadius: "7px", fontWeight: "700", fontSize: "13px", cursor: "pointer", fontFamily: "sans-serif" }}>Claim This Offer →</button>
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: "center", padding: isMobile ? "30px 16px" : "48px 40px", border: "1px solid rgba(201,168,76,0.18)", borderRadius: "16px", background: "rgba(201,168,76,0.04)" }}>
          <div style={{ fontSize: "26px", marginBottom: "12px" }}>🤝</div>
          <h3 style={{ fontSize: isMobile ? "18px" : "clamp(18px,2.5vw,30px)", fontWeight: "400", color: COLORS.white, margin: "0 0 10px", fontFamily: "Georgia, serif" }}>
            Let's Build a Long-Term <span style={{ color: COLORS.accent, fontStyle: "italic" }}>Trustworthy Relationship</span>
          </h3>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", margin: "0 auto 24px", maxWidth: "460px", lineHeight: "1.8", fontFamily: "sans-serif" }}>Transparent pricing, zero hidden fees, and complete peace of mind.</p>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
            <button style={{ background: COLORS.accent, color: COLORS.primary, border: "none", padding: "12px 26px", borderRadius: "8px", fontWeight: "700", fontSize: "13px", cursor: "pointer", fontFamily: "sans-serif" }}>Get a Free Appraisal</button>
            <button style={{ background: "transparent", color: COLORS.white, border: "1.5px solid rgba(255,255,255,0.2)", padding: "12px 26px", borderRadius: "8px", fontWeight: "500", fontSize: "13px", cursor: "pointer", fontFamily: "sans-serif" }}>Contact Us</button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Main HomePage ──────────────────────────────────────────────────────────
export default function HomePage() {
  const [scrolled, setScrolled]             = useState(false);
  const [menuOpen, setMenuOpen]             = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [searchType, setSearchType]         = useState("Buy");
  const [filterType, setFilterType]         = useState("All");
  const [activeTesti, setActiveTesti]       = useState(0);

  const w        = useWindowWidth();
  const isMobile = w < 768;
  const isTablet = w >= 768 && w < 1024;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveTesti(i => (i + 1) % testimonials.length), 4500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => { if (!isMobile && !isTablet) setMenuOpen(false); }, [isMobile, isTablet]);

  const filtered = filterType === "All" ? listings : listings.filter(l => l.type === filterType);
  const showHamburger = isMobile || isTablet;

  return (
    <div style={{ fontFamily: "Georgia, serif", color: COLORS.primary, background: COLORS.white, minHeight: "100vh", overflowX: "hidden" }}>

      {/* ─────────────────── NAVBAR ─────────────────── */}
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: scrolled || menuOpen ? "rgba(10,22,40,0.97)" : "transparent", backdropFilter: scrolled ? "blur(16px)" : "none", borderBottom: scrolled ? "1px solid rgba(201,168,76,0.2)" : "none", transition: "all 0.3s" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 5%", height: "68px" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
            <div style={{ width: "32px", height: "32px", background: COLORS.accent, borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: COLORS.primary, fontWeight: "900", fontSize: "15px" }}>PA</span>
            </div>
            <span style={{ color: COLORS.white, fontWeight: "700", fontSize: "16px", letterSpacing: "0.04em" }}>Pratap <span style={{ color: COLORS.accent }}>ASSOCIATES</span></span>
          </div>

          {/* Desktop nav */}
          {!showHamburger && (
            <nav style={{ display: "flex", gap: "26px", alignItems: "center" }}>
              {navLinks.map(link => <NavItem key={link.label} link={link} />)}
            </nav>
          )}

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {!showHamburger && (
              <button style={{ background: COLORS.accent, color: COLORS.primary, border: "none", padding: "9px 18px", borderRadius: "6px", fontWeight: "700", fontSize: "12px", cursor: "pointer", fontFamily: "sans-serif" }}>
                Book Appraisal
              </button>
            )}
            {showHamburger && (
              <button onClick={() => setMenuOpen(o => !o)}
                style={{ background: "transparent", border: "none", cursor: "pointer", padding: "4px", display: "flex", flexDirection: "column", gap: "5px" }}>
                {[0, 1, 2].map(i => (
                  <span key={i} style={{
                    display: "block", width: "22px", height: "2px", background: COLORS.white, borderRadius: "2px", transition: "all 0.3s",
                    transform: menuOpen && i === 0 ? "rotate(45deg) translate(5px,5px)" : menuOpen && i === 2 ? "rotate(-45deg) translate(5px,-5px)" : "none",
                    opacity: menuOpen && i === 1 ? 0 : 1,
                  }} />
                ))}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Drawer */}
        {showHamburger && menuOpen && (
          <div style={{ background: "rgba(10,22,40,0.98)", borderTop: "1px solid rgba(201,168,76,0.12)", padding: "12px 5% 20px", maxHeight: "75vh", overflowY: "auto" }}>
            {navLinks.map(link => (
              <div key={link.label}>
                <div onClick={() => setMobileExpanded(mobileExpanded === link.label ? null : link.label)}
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", cursor: "pointer" }}>
                  <span style={{ color: COLORS.white, fontSize: "14px", fontWeight: "500", fontFamily: "sans-serif" }}>{link.label}</span>
                  {link.sub && <span style={{ color: COLORS.accent, fontSize: "11px" }}>{mobileExpanded === link.label ? "▲" : "▼"}</span>}
                </div>
                {link.sub && mobileExpanded === link.label && (
                  <div style={{ paddingLeft: "14px", paddingBottom: "4px" }}>
                    {link.sub.map(s => (
                      <div key={s} onClick={() => setMenuOpen(false)}
                        style={{ padding: "9px 0", fontSize: "13px", color: "rgba(255,255,255,0.55)", fontFamily: "sans-serif", cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        {s}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button onClick={() => setMenuOpen(false)} style={{ marginTop: "18px", width: "100%", background: COLORS.accent, color: COLORS.primary, border: "none", padding: "13px", borderRadius: "8px", fontWeight: "700", fontSize: "14px", cursor: "pointer", fontFamily: "sans-serif" }}>
              Book Appraisal
            </button>
          </div>
        )}
      </header>

      {/* ─────────────────── HERO ─────────────────── */}
      <section style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", background: COLORS.primary, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage:  `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.8 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(10,22,40,0.95) 0%,rgba(10,22,40,0.65) 60%,rgba(10,22,40,0.45) 100%)" }} />
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "4px", background: `linear-gradient(180deg,transparent,${COLORS.accent},transparent)` }} />

        <div style={{ position: "relative", zIndex: 1, padding: isMobile ? "90px 5% 60px" : "0 5%", maxWidth: "860px", width: "100%", paddingTop: isMobile ? "90px" : "68px" }}>
          <div style={{ fontSize: "20px", fontWeight: "600", letterSpacing: "0.22em", color: COLORS.accent, textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: "14px" }}>
            NOIDA'S PREMIER REAL ESTATE EXPERTS
          </div>
          <h1 style={{ fontSize: isMobile ? "30px" : "clamp(38px,6vw,76px)", fontWeight: "400", color: COLORS.white, lineHeight: "1.1", margin: "0 0 20px" }}>
            Welcome to Pratap Associates{" "} 
            <br></br>
            <span style={{ color: COLORS.accent, fontStyle: "italic" }}>Real Estate</span> Services
          </h1>
          <p style={{ fontSize: isMobile ? "14px" : "17px", color: "rgba(255,255,255,0.65)", lineHeight: "1.7", maxWidth: "520px", fontFamily: "sans-serif", fontWeight: "300", marginBottom: "32px" }}>
            Your trusted partner for residental and commercia real estate in Noida. Honest pricing, verified listings, and complete end to end support.
          </p>

          <div style={{ display: "flex", gap: "10px", marginBottom: "36px", flexWrap: "wrap" }}>
            <button style={{ background: COLORS.accent, color: COLORS.primary, border: "none", padding: isMobile ? "12px 22px" : "14px 32px", borderRadius: "6px", fontWeight: "700", fontSize: isMobile ? "13px" : "14px", cursor: "pointer", fontFamily: "sans-serif" }}>Explore Properties</button>
          </div>
        </div>
      </section>

      {/* ─────────────────── MARQUEE ─────────────────── */}
      <section style={{ background: COLORS.primary, overflow: "hidden", borderBottom: "1px solid rgba(10, 67, 154, 0.64)",height: "40px" }}>
        <div style={{ display: "flex", animation: "marquee 18s linear infinite" }}>
          {[...Array(2)].flatMap(() => ["We don't charge too much value","1 BHK/1RK ~ @3000","2 BHK ~ @3500","3 BHK ~ @4000"," 2% Brokerage charge Extra"]).map((t, i) => (
            <div key={i} style={{ padding: "14px 28px", fontSize: "14px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: i % 2 === 0 ? COLORS.white : COLORS.accent, fontFamily: "sans-serif", whiteSpace: "nowrap", borderRight: "1px solid rgba(201,168,76,0.12)" }}>{t}</div>
          ))}
        </div>
      </section>
      {/* <section style={{ background: COLORS.primary, overflow: "hidden", borderBottom: "1px solid rgba(201,168,76,0.18)" }}>
        <div style={{ display: "flex", animation: "marquee 18s linear infinite" }}>
          {[...Array(2)].flatMap(() => ["Apartment","Condo","House","Villa","Office","Land","Commercial"]).map((t, i) => (
            <div key={i} style={{ padding: "12px 28px", fontSize: "11px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: i % 2 === 0 ? COLORS.white : COLORS.accent, fontFamily: "sans-serif", whiteSpace: "nowrap", borderRight: "1px solid rgba(201,168,76,0.12)" }}>{t}</div>
          ))}
        </div>
      </section> */}

      {/* ─────────────────── STATS ─────────────────── */}
      <section style={{ background: COLORS.accent, padding: isMobile ? "28px 5%" : "38px 5%" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: "16px", textAlign: "center" }}>
          {stats.map(s => (
            <div key={s.label}>
              <div style={{ fontSize: isMobile ? "24px" : "clamp(26px,3vw,40px)", fontWeight: "700", color: COLORS.primary }}>{s.value}</div>
              <div style={{ fontSize: "10px", color: "rgba(10,22,40,0.65)", fontFamily: "sans-serif", fontWeight: "600", letterSpacing: "0.06em", textTransform: "uppercase", marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────── LISTINGS ─────────────────── */}
      <section style={{ padding: isMobile ? "56px 5%" : "88px 5%", background: COLORS.offWhite }} id="listing">
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "flex-end", marginBottom: "36px", flexDirection: isMobile ? "column" : "row", gap: "14px" }}>
            <div>
              <div style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.18em", color: COLORS.accent, textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: "7px" }}>Properties</div>
              <h2 style={{ fontSize: isMobile ? "24px" : "clamp(26px,3.5vw,44px)", fontWeight: "400", margin: 0, color: COLORS.primary }}>Latest Listings</h2>
            </div>
            <div style={{ display: "flex", gap: "7px", flexWrap: "wrap" }}>
              {["All","House","Apartment","Villa"].map(t => (
                <button key={t} onClick={() => setFilterType(t)}
                  style={{ padding: "6px 14px", borderRadius: "50px", border: `1.5px solid ${filterType === t ? COLORS.primary : COLORS.grayLight}`, background: filterType === t ? COLORS.primary : "transparent", color: filterType === t ? COLORS.white : COLORS.gray, fontSize: "12px", fontWeight: "500", cursor: "pointer", fontFamily: "sans-serif", transition: "all 0.2s" }}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3,1fr)", gap: "20px" }}>
            {filtered.map(p => <PropertyCard key={p.id} p={p} />)}
          </div>
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <button style={{ background: "transparent", color: COLORS.primary, border: `2px solid ${COLORS.primary}`, padding: "12px 32px", borderRadius: "6px", fontWeight: "600", fontSize: "13px", cursor: "pointer", fontFamily: "sans-serif" }}
              onMouseEnter={e => { e.currentTarget.style.background = COLORS.primary; e.currentTarget.style.color = COLORS.white; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = COLORS.primary; }}>
              Explore All Properties →
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────── ABOUT ─────────────────── */}
      <section style={{ padding: isMobile ? "56px 5%" : "96px 5%", background: COLORS.white }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "36px" : "72px", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.18em", color: COLORS.accent, textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: "10px" }}>About Us</div>
            <h2 style={{ fontSize: isMobile ? "24px" : "clamp(24px,3vw,42px)", fontWeight: "400", margin: "0 0 22px", color: COLORS.primary, lineHeight: "1.2" }}><em>Real Estate</em></h2>
            {[
              "Our values — family, community, and connections — are at the heart of everything we do.",
              "We contributed over $57,000 to clubs, charities and foundations through our Community Program last year.",
              "We celebrated 10 years of community impact in 2024, with $700,000+ in total contributions.",
              "Ranked in the top 3% of auction agents in Australia and top 1% of female agents nationally.",
            ].map((pt, i) => (
              <div key={i} style={{ display: "flex", gap: "12px", marginBottom: "14px" }}>
                <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: COLORS.accent, marginTop: "9px", flexShrink: 0 }} />
                <p style={{ margin: 0, fontSize: "13px", lineHeight: "1.7", color: COLORS.gray, fontFamily: "sans-serif" }}>{pt}</p>
              </div>
            ))}
            <div style={{ marginTop: "24px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button style={{ background: COLORS.primary, color: COLORS.white, border: "none", padding: "12px 24px", borderRadius: "6px", fontWeight: "600", fontSize: "13px", cursor: "pointer", fontFamily: "sans-serif" }}>Our Story</button>
              <button style={{ background: "transparent", color: COLORS.primary, border: `1.5px solid ${COLORS.grayLight}`, padding: "12px 24px", borderRadius: "6px", fontWeight: "500", fontSize: "13px", cursor: "pointer", fontFamily: "sans-serif" }}>Meet the Team</button>
            </div>
          </div>
          {isMobile ? (
            <img src="https://picsum.photos/seed/team1/800/400" alt="team" style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "10px" }} />
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <img src="https://picsum.photos/seed/team1/400/220" alt="team"      style={{ width: "100%", height: "190px", objectFit: "cover", borderRadius: "10px" }} />
              <img src="https://picsum.photos/seed/prop2/400/220" alt="property"  style={{ width: "100%", height: "190px", objectFit: "cover", borderRadius: "10px", marginTop: "26px" }} />
              <img src="https://picsum.photos/seed/comm3/400/200" alt="community" style={{ width: "100%", height: "175px", objectFit: "cover", borderRadius: "10px" }} />
              <img src="https://picsum.photos/seed/award4/400/200" alt="award"    style={{ width: "100%", height: "175px", objectFit: "cover", borderRadius: "10px", marginTop: "-26px" }} />
            </div>
          )}
        </div>
      </section>

      {/* ─────────────────── HOW IT WORKS ─────────────────── */}
      <section style={{ padding: isMobile ? "56px 5%" : "88px 5%", background: COLORS.primary }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: isMobile ? "32px" : "56px" }}>
            <div style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.18em", color: COLORS.accent, textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: "8px" }}>Our Process</div>
            <h2 style={{ fontSize: isMobile ? "24px" : "clamp(24px,3.5vw,44px)", fontWeight: "400", color: COLORS.white, margin: 0 }}>How it Works</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: isMobile ? "14px" : "36px" }}>
            {[
              { step: "01", title: "Sign Up & Subscribe", desc: "Set your property preferences to receive personalised alerts the moment new listings match your criteria." },
              { step: "02", title: "Explore Listings",    desc: "Browse homes, apartments, villas and commercial properties across Adelaide and surrounds." },
              { step: "03", title: "Submit or List",      desc: "Ready to buy, sell, or lease? Our expert agents guide you from appraisal to settlement." },
            ].map(s => (
              <div key={s.step} style={{ padding: isMobile ? "22px 18px" : "32px 28px", borderRadius: "12px", border: "1px solid rgba(201,168,76,0.18)", background: "rgba(255,255,255,0.04)" }}>
                <div style={{ fontSize: "38px", fontWeight: "700", color: "rgba(201,168,76,0.22)", fontFamily: "sans-serif", lineHeight: "1", marginBottom: "14px" }}>{s.step}</div>
                <h3 style={{ fontSize: "16px", fontWeight: "500", color: COLORS.white, margin: "0 0 9px" }}>{s.title}</h3>
                <p style={{ fontSize: "13px", lineHeight: "1.8", color: "rgba(255,255,255,0.5)", margin: 0, fontFamily: "sans-serif" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── RENTAL PROPOSAL ─────────────────── */}
      <RentalProposal isMobile={isMobile} isTablet={isTablet} />

      {/* ─────────────────── TESTIMONIALS ─────────────────── */}
      <section style={{ padding: isMobile ? "56px 5%" : "88px 5%", background: COLORS.offWhite }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.18em", color: COLORS.accent, textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: "8px" }}>Testimonials</div>
          <h2 style={{ fontSize: isMobile ? "24px" : "clamp(24px,3.5vw,42px)", fontWeight: "400", color: COLORS.primary, margin: "0 0 36px" }}>Clients Feedback</h2>
          <div style={{ background: COLORS.white, borderRadius: "16px", padding: isMobile ? "28px 20px" : "48px 56px", boxShadow: "0 8px 40px rgba(0,0,0,0.08)" }}>
            <div style={{ display: "flex", justifyContent: "center", gap: "3px", marginBottom: "20px" }}>
              {[1,2,3,4,5].map(i => <StarIcon key={i} />)}
            </div>
            <p style={{ fontSize: isMobile ? "14px" : "17px", lineHeight: "1.85", color: COLORS.dark, fontStyle: "italic", margin: "0 0 22px" }}>
              "{testimonials[activeTesti].text}"
            </p>
            <div style={{ fontWeight: "700", fontSize: "14px", color: COLORS.primary, fontFamily: "sans-serif" }}>{testimonials[activeTesti].name}</div>
            <div style={{ fontSize: "12px", color: COLORS.gray, fontFamily: "sans-serif", marginTop: "3px" }}>{testimonials[activeTesti].role}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: "7px", marginTop: "22px" }}>
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActiveTesti(i)}
                style={{ width: i === activeTesti ? "26px" : "8px", height: "8px", borderRadius: "4px", background: i === activeTesti ? COLORS.accent : COLORS.grayLight, border: "none", cursor: "pointer", transition: "all 0.3s" }} />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── CTA ─────────────────── */}
      <section style={{ padding: isMobile ? "56px 5%" : "76px 5%", background: COLORS.accent, textAlign: "center" }}>
        <h2 style={{ fontSize: isMobile ? "22px" : "clamp(24px,3.5vw,46px)", fontWeight: "400", color: COLORS.primary, margin: "0 0 12px" }}>Ready to sell your property?</h2>
        <p style={{ fontSize: "14px", color: "rgba(10,22,40,0.7)", margin: "0 0 28px", fontFamily: "sans-serif" }}>Trust Pratap Real Estate to get you the best value.</p>
        <button style={{ background: COLORS.primary, color: COLORS.white, border: "none", padding: isMobile ? "13px 32px" : "14px 40px", borderRadius: "8px", fontWeight: "700", fontSize: "14px", cursor: "pointer", fontFamily: "sans-serif" }}>List Your Property</button>
      </section>

      {/* ─────────────────── FOOTER ─────────────────── */}
      <footer style={{ background: COLORS.primary, padding: isMobile ? "44px 5% 22px" : "56px 5% 28px", color: "rgba(255,255,255,0.55)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "1fr 1fr 1fr" : "2fr 1fr 1fr 1fr", gap: isMobile ? "28px" : "44px", marginBottom: "36px" }}>
            <div style={{ gridColumn: isMobile ? "1 / -1" : "auto" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <div style={{ width: "28px", height: "28px", background: COLORS.accent, borderRadius: "5px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: COLORS.primary, fontWeight: "900", fontSize: "12px" }}>PA</span>
                </div>
                <span style={{ color: COLORS.white, fontWeight: "700", fontSize: "15px" }}>Pratap <span style={{ color: COLORS.accent }}>Associates</span></span>
              </div>
              <p style={{ fontSize: "12px", lineHeight: "1.8", fontFamily: "sans-serif", maxWidth: "240px" }}>
                Setting a higher standard in real estate. Community, integrity, results.
              </p>
            </div>
            {[
              { heading: "Buy",      links: ["Latest Listings","Commercial","Land","Open Inspections"]           },
              { heading: "Company",  links: ["About Us","Our Team","Community Program","Contact"]                },
              { heading: "Services", links: ["Property Appraisal","Rental Appraisal","Live Auctions","Management"] },
            ].map(col => (
              <div key={col.heading}>
                <h4 style={{ color: COLORS.white, fontWeight: "600", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: "12px" }}>{col.heading}</h4>
                {col.links.map(l => (
                  <div key={l} style={{ fontSize: "12px", marginBottom: "8px", cursor: "pointer", fontFamily: "sans-serif", transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = COLORS.accent}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.55)"}
                  >{l}</div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "18px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
            <span style={{ fontSize: "11px", fontFamily: "sans-serif" }}>© 2026 Pratap Real Estate. All rights reserved.</span>
            <span style={{ fontSize: "11px", fontFamily: "sans-serif" }}>Privacy Policy · Terms of Service</span>
          </div>
        </div>
      </footer>

      {/* ─────────────────── Global CSS ─────────────────── */}
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        ::placeholder { color: rgba(255,255,255,0.38); }
        select option { background: #0A1628; color: white; }
        @media (max-width: 480px) {
          input, select { font-size: 16px !important; }
        }
      `}</style>
    </div>
  );
}