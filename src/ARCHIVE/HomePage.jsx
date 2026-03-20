import { useState, useEffect } from "react";

// ── Inline styles / design tokens ──────────────────────────────────────────
const COLORS = {
  primary: "#0A1628",
  accent: "#C9A84C",
  accentLight: "#E8C96A",
  white: "#FFFFFF",
  offWhite: "#F8F6F1",
  gray: "#6B7280",
  grayLight: "#E5E7EB",
  grayMid: "#9CA3AF",
  dark: "#1F2937",
  cardBg: "#FFFFFF",
};

const G = {
  headerHeight: "80px",
};

// ── Mock Data ──────────────────────────────────────────────────────────────
const listings = [
  {
    id: 1,
    address: "12 Riverside Drive",
    suburb: "North Adelaide SA 5006",
    price: "$1,250,000",
    beds: 4,
    baths: 2,
    parking: 2,
    type: "House",
    tag: "For Sale",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
    agent: "Rachel Lawrie",
    date: "March 14, 2026",
  },
  {
    id: 2,
    address: "7/45 Garden Terrace",
    suburb: "Prospect SA 5082",
    price: "$620,000",
    beds: 3,
    baths: 2,
    parking: 1,
    type: "Apartment",
    tag: "New",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
    agent: "James Cooper",
    date: "March 10, 2026",
  },
  {
    id: 3,
    address: "88 Grandview Avenue",
    suburb: "Burnside SA 5066",
    price: "$2,100,000",
    beds: 5,
    baths: 3,
    parking: 3,
    type: "Villa",
    tag: "For Sale",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    agent: "Sarah Mitchell",
    date: "March 5, 2026",
  },
  {
    id: 4,
    address: "3 Willow Court",
    suburb: "Willaston SA 5118",
    price: "$485,000",
    beds: 3,
    baths: 1,
    parking: 2,
    type: "House",
    tag: "Open Soon",
    img: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=600&q=80",
    agent: "Rachel Lawrie",
    date: "February 28, 2026",
  },
  {
    id: 5,
    address: "101 Seafront Boulevard",
    suburb: "Glenelg SA 5045",
    price: "$3,400,000",
    beds: 5,
    baths: 4,
    parking: 4,
    type: "Villa",
    tag: "For Sale",
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80",
    agent: "James Cooper",
    date: "February 20, 2026",
  },
  {
    id: 6,
    address: "22 Parklands Close",
    suburb: "Tranmere SA 5073",
    price: "$765,000",
    beds: 4,
    baths: 2,
    parking: 2,
    type: "House",
    tag: "For Sale",
    img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80",
    agent: "Sarah Mitchell",
    date: "January 30, 2026",
  },
];

const testimonials = [
  {
    name: "Michael T.",
    role: "Residential Vendor",
    text: "Rachel was an absolute pleasure to deal with. Her market knowledge is unmatched, and the entire process was smooth and stress-free. I couldn't recommend her more highly.",
    rating: 5,
  },
  {
    name: "Gregory P.",
    role: "Residential Vendor",
    text: "Rachel is the ultimate professional. She listened, communicated frequently, and kept us informed every step of the way. We felt supported throughout the entire sale.",
    rating: 5,
  },
  {
    name: "Amanda L.",
    role: "Property Buyer",
    text: "From our first meeting to settlement, Stadium Real Estate exceeded every expectation. Their community focus and genuine care sets them apart from every other agency.",
    rating: 5,
  },
];

const stats = [
  { label: "Properties Listed", value: "1,200+" },
  { label: "Properties Sold", value: "980+" },
  { label: "Satisfied Clients", value: "850+" },
  { label: "Realtor Awards", value: "24+" },
];

const navLinks = [
  {
    label: "Buy",
    sub: ["Latest Listings", "Commercial", "Land", "Open for Inspection"],
  },
  {
    label: "Rent",
    sub: ["Available Rentals", "Open Inspections", "Leased Properties"],
  },
  { label: "Sell", sub: ["Sold Properties", "Property Appraisal"] },
  { label: "Auctions" },
  { label: "Community" },
  { label: "About", sub: ["About Us", "Team"] },
  { label: "Contact" },
];

// ── Reusable Components ────────────────────────────────────────────────────

function BedIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 9V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3" />
      <path d="M2 11v7a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-7" />
      <path d="M7 11v-4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v4" />
    </svg>
  );
}

function BathIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 6 L9 2 M5 10 L19 10 L19 19 A2 2 0 0 1 17 21 L7 21 A2 2 0 0 1 5 19 Z" />
      <path d="M5 10 A4 4 0 0 1 9 6" />
    </svg>
  );
}

function CarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="1" y="11" width="22" height="9" rx="2" />
      <path d="M5 11L7 6h10l2 5" />
      <circle cx="7" cy="20" r="1" />
      <circle cx="17" cy="20" r="1" />
    </svg>
  );
}

function StarIcon({ filled }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? COLORS.accent : "none"} stroke={COLORS.accent} strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function PropertyCard({ p, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: COLORS.cardBg,
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: hovered
          ? "0 20px 60px rgba(0,0,0,0.15)"
          : "0 4px 24px rgba(0,0,0,0.07)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        cursor: "pointer",
        animationDelay: `${index * 0.08}s`,
      }}
    >
      <div style={{ position: "relative", height: "220px", overflow: "hidden" }}>
        <img
          src={p.img}
          alt={p.address}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.4s ease",
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "14px",
            left: "14px",
            background: p.tag === "New" ? COLORS.accent : COLORS.primary,
            color: p.tag === "New" ? COLORS.primary : COLORS.white,
            fontSize: "11px",
            fontWeight: "700",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "4px 10px",
            borderRadius: "4px",
          }}
        >
          {p.tag}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "14px",
            right: "14px",
            background: "rgba(10,22,40,0.85)",
            color: COLORS.accent,
            fontSize: "16px",
            fontWeight: "700",
            padding: "6px 14px",
            borderRadius: "6px",
            backdropFilter: "blur(4px)",
          }}
        >
          {p.price}
        </div>
      </div>

      <div style={{ padding: "18px 20px 20px" }}>
        <div style={{ fontSize: "15px", fontWeight: "700", color: COLORS.primary, marginBottom: "4px" }}>
          {p.address}
        </div>
        <div style={{ fontSize: "13px", color: COLORS.gray, marginBottom: "14px" }}>{p.suburb}</div>

        <div style={{ display: "flex", gap: "18px", color: COLORS.gray, fontSize: "13px", marginBottom: "14px", paddingBottom: "14px", borderBottom: `1px solid ${COLORS.grayLight}` }}>
          <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <BedIcon /> {p.beds} Beds
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <BathIcon /> {p.baths} Baths
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <CarIcon /> {p.parking}
          </span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{
              width: "30px", height: "30px", borderRadius: "50%",
              background: COLORS.accent,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "11px", fontWeight: "700", color: COLORS.primary,
            }}>
              {p.agent.split(" ").map(n => n[0]).join("")}
            </div>
            <span style={{ fontSize: "12px", color: COLORS.gray }}>{p.agent}</span>
          </div>
          <span style={{ fontSize: "11px", color: COLORS.grayMid }}>{p.date}</span>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeNav, setActiveNav] = useState(null);
  const [searchType, setSearchType] = useState("Buy");
  const [filterType, setFilterType] = useState("All");
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(i => (i + 1) % testimonials.length), 4500);
    return () => clearInterval(t);
  }, []);

  const propertyTypes = ["All", "House", "Apartment", "Villa"];
  const filteredListings = filterType === "All" ? listings : listings.filter(l => l.type === filterType);

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", color: COLORS.primary, background: COLORS.white, minHeight: "100vh" }}>

      {/* ── NAVBAR ── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "rgba(10,22,40,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid rgba(201,168,76,0.2)` : "none",
        height: G.headerHeight,
        display: "flex", alignItems: "center",
        transition: "all 0.35s ease",
        padding: "0 5%",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "36px", height: "36px", background: COLORS.accent, borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: COLORS.primary, fontWeight: "900", fontSize: "16px" }}>PA</span>
            </div>
            <span style={{ color: COLORS.white, fontWeight: "700", fontSize: "18px", letterSpacing: "0.04em" }}>
              Pratap <span style={{ color: COLORS.accent }}>ASSOCIATES</span>
            </span>
          </div>

          {/* Nav Links */}
          <nav style={{ display: "flex", gap: "28px", alignItems: "center" }}>
            {navLinks.map(link => (
              <div key={link.label} style={{ position: "relative" }}
                onMouseEnter={() => setActiveNav(link.label)}
                onMouseLeave={() => setActiveNav(null)}>
                <span style={{
                  color: COLORS.white, fontSize: "13px", fontWeight: "500",
                  cursor: "pointer", letterSpacing: "0.04em",
                  fontFamily: "'Helvetica Neue', Arial, sans-serif",
                  opacity: 0.9,
                  transition: "color 0.2s",
                }}>
                  {link.label} {link.sub && "▾"}
                </span>
                {link.sub && activeNav === link.label && (
                  <div style={{
                    position: "absolute", top: "28px", left: "50%", transform: "translateX(-50%)",
                    background: COLORS.white, borderRadius: "8px",
                    boxShadow: "0 16px 48px rgba(0,0,0,0.18)",
                    padding: "8px 0", minWidth: "180px", zIndex: 100,
                  }}>
                    {link.sub.map(s => (
                      <div key={s} style={{
                        padding: "9px 18px", fontSize: "13px",
                        fontFamily: "'Helvetica Neue', Arial, sans-serif",
                        color: COLORS.dark, cursor: "pointer",
                        transition: "background 0.15s",
                      }}
                        onMouseEnter={e => e.currentTarget.style.background = COLORS.offWhite}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                      >{s}</div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <button style={{
            background: COLORS.accent, color: COLORS.primary,
            border: "none", padding: "10px 22px", borderRadius: "6px",
            fontWeight: "700", fontSize: "13px", cursor: "pointer",
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            letterSpacing: "0.04em",
            transition: "background 0.2s",
          }}>
            Book Appraisal
          </button>
        </div>
      </header>

      {/* ── HERO ── */}
      <section style={{
        minHeight: "100vh", position: "relative",
        display: "flex", alignItems: "center",
        background: COLORS.primary,
        overflow: "hidden",
      }}>
        {/* Background image */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=80')",
          backgroundSize: "cover", backgroundPosition: "center",
          opacity: 0.3,
        }} />
        {/* Gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, rgba(10,22,40,0.95) 0%, rgba(10,22,40,0.7) 60%, rgba(10,22,40,0.5) 100%)",
        }} />

        {/* Gold decorative line */}
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0,
          width: "4px", background: `linear-gradient(180deg, transparent, ${COLORS.accent}, transparent)`,
        }} />

        <div style={{ position: "relative", zIndex: 1, padding: "0 5%", maxWidth: "900px", paddingTop: G.headerHeight }}>
          <div style={{
            fontSize: "12px", fontWeight: "600", letterSpacing: "0.2em",
            color: COLORS.accent, textTransform: "uppercase",
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            marginBottom: "20px",
          }}>
            Stadium is built on community and connection
          </div>

          <h1 style={{
            fontSize: "clamp(40px, 6vw, 80px)", fontWeight: "400",
            color: COLORS.white, lineHeight: "1.1",
            marginBottom: "28px", margin: "0 0 28px",
          }}>
            Setting a Higher Standard in{" "}
            <span style={{ color: COLORS.accent, fontStyle: "italic" }}>
              Real Estate
            </span>{" "}
            Services
          </h1>

          <p style={{
            fontSize: "18px", color: "rgba(255,255,255,0.7)",
            lineHeight: "1.7", maxWidth: "560px",
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            fontWeight: "300", marginBottom: "48px",
          }}>
            Where our community spirit underpins your real estate success. Serving Adelaide and surrounding suburbs with integrity and expertise.
          </p>

          <div style={{ display: "flex", gap: "14px", marginBottom: "60px" }}>
            <button style={{
              background: COLORS.accent, color: COLORS.primary,
              border: "none", padding: "16px 36px", borderRadius: "6px",
              fontWeight: "700", fontSize: "15px", cursor: "pointer",
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
              letterSpacing: "0.04em",
            }}>
              Browse Properties
            </button>
            <button style={{
              background: "transparent", color: COLORS.white,
              border: `1.5px solid rgba(255,255,255,0.4)`, padding: "16px 36px", borderRadius: "6px",
              fontWeight: "500", fontSize: "15px", cursor: "pointer",
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
            }}>
              Find a Rental
            </button>
          </div>

          {/* ── Search Box ── */}
          <div style={{
            background: "rgba(255,255,255,0.06)", backdropFilter: "blur(20px)",
            borderRadius: "12px", padding: "24px 28px",
            border: "1px solid rgba(255,255,255,0.12)",
          }}>
            {/* Tabs */}
            <div style={{ display: "flex", gap: "6px", marginBottom: "20px" }}>
              {["Buy", "Rent", "Sell"].map(t => (
                <button
                  key={t}
                  onClick={() => setSearchType(t)}
                  style={{
                    padding: "8px 22px", borderRadius: "6px", border: "none",
                    background: searchType === t ? COLORS.accent : "rgba(255,255,255,0.1)",
                    color: searchType === t ? COLORS.primary : COLORS.white,
                    fontWeight: "600", fontSize: "13px", cursor: "pointer",
                    fontFamily: "'Helvetica Neue', Arial, sans-serif",
                    transition: "all 0.2s",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Search Inputs */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <input
                placeholder="Suburb, city or postcode..."
                style={{
                  flex: "2", minWidth: "200px", padding: "12px 16px",
                  borderRadius: "8px", border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.08)", color: COLORS.white,
                  fontSize: "14px", outline: "none",
                  fontFamily: "'Helvetica Neue', Arial, sans-serif",
                }}
              />
              <select style={{
                flex: "1", minWidth: "140px", padding: "12px 16px",
                borderRadius: "8px", border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.08)", color: COLORS.white,
                fontSize: "14px", outline: "none",
                fontFamily: "'Helvetica Neue', Arial, sans-serif",
              }}>
                <option value="">Property Type</option>
                <option>House</option>
                <option>Apartment</option>
                <option>Villa</option>
                <option>Land</option>
              </select>
              <button style={{
                padding: "12px 28px", background: COLORS.accent,
                color: COLORS.primary, border: "none", borderRadius: "8px",
                fontWeight: "700", fontSize: "14px", cursor: "pointer",
                fontFamily: "'Helvetica Neue', Arial, sans-serif",
                letterSpacing: "0.04em",
              }}>
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROPERTY TYPE MARQUEE ── */}
      <section style={{
        background: COLORS.primary, padding: "0",
        borderBottom: `1px solid rgba(201,168,76,0.2)`,
        overflow: "hidden",
      }}>
        <div style={{
          display: "flex", gap: "0",
          animation: "marquee 18s linear infinite",
        }}>
          {[...["Apartment", "Condo", "House", "Villa", "Office", "Land", "Commercial", "Apartment", "Condo", "House", "Villa", "Office", "Land", "Commercial"].map((t, i) => (
            <div key={i} style={{
              padding: "14px 36px",
              fontSize: "13px", fontWeight: "600",
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: i % 2 === 0 ? COLORS.white : COLORS.accent,
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
              whiteSpace: "nowrap",
              borderRight: `1px solid rgba(201,168,76,0.15)`,
            }}>{t}</div>
          ))]}
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: COLORS.accent, padding: "40px 5%" }}>
        <div style={{
          maxWidth: "1200px", margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px",
          textAlign: "center",
        }}>
          {stats.map(s => (
            <div key={s.label}>
              <div style={{ fontSize: "clamp(28px, 3vw, 42px)", fontWeight: "700", color: COLORS.primary }}>{s.value}</div>
              <div style={{ fontSize: "13px", color: "rgba(10,22,40,0.7)", fontFamily: "'Helvetica Neue', Arial, sans-serif", fontWeight: "500", letterSpacing: "0.06em", textTransform: "uppercase", marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── LATEST LISTINGS ── */}
      <section style={{ padding: "90px 5%", background: COLORS.offWhite }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px", flexWrap: "wrap", gap: "20px" }}>
            <div>
              <div style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.18em", color: COLORS.accent, textTransform: "uppercase", fontFamily: "'Helvetica Neue', Arial, sans-serif", marginBottom: "10px" }}>Properties</div>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: "400", margin: 0, color: COLORS.primary }}>Latest Listings</h2>
            </div>

            {/* Filter Pills */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {propertyTypes.map(t => (
                <button key={t} onClick={() => setFilterType(t)} style={{
                  padding: "8px 20px", borderRadius: "50px",
                  border: `1.5px solid ${filterType === t ? COLORS.primary : COLORS.grayLight}`,
                  background: filterType === t ? COLORS.primary : "transparent",
                  color: filterType === t ? COLORS.white : COLORS.gray,
                  fontSize: "13px", fontWeight: "500", cursor: "pointer",
                  fontFamily: "'Helvetica Neue', Arial, sans-serif",
                  transition: "all 0.2s",
                }}>{t}</button>
              ))}
            </div>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "28px",
          }}>
            {filteredListings.map((p, i) => <PropertyCard key={p.id} p={p} index={i} />)}
          </div>

          <div style={{ textAlign: "center", marginTop: "52px" }}>
            <button style={{
              background: "transparent", color: COLORS.primary,
              border: `2px solid ${COLORS.primary}`, padding: "14px 40px",
              borderRadius: "6px", fontWeight: "600", fontSize: "14px",
              cursor: "pointer", fontFamily: "'Helvetica Neue', Arial, sans-serif",
              letterSpacing: "0.04em", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = COLORS.primary; e.currentTarget.style.color = COLORS.white; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = COLORS.primary; }}
            >
              Explore All Properties →
            </button>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section style={{ padding: "100px 5%", background: COLORS.white }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.18em", color: COLORS.accent, textTransform: "uppercase", fontFamily: "'Helvetica Neue', Arial, sans-serif", marginBottom: "12px" }}>About Us</div>
            <h2 style={{ fontSize: "clamp(26px, 3vw, 44px)", fontWeight: "400", margin: "0 0 28px", color: COLORS.primary, lineHeight: "1.2" }}>
              Stadium <em>Real Estate</em>
            </h2>

            {[
              "As a real estate business, our values are at the heart of what we do — family, community, and connections come first.",
              "We contributed more than $57,000 to players, clubs, charities and foundations through our Community Program in the past 12 months.",
              "We celebrated 10 years of our Community Program in 2024, with more than $700,000 in total contributions.",
              "Ranked in the top 3% of auction agents in Australia and top 1% of female agents nationally.",
            ].map((point, i) => (
              <div key={i} style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: COLORS.accent, marginTop: "9px", flexShrink: 0 }} />
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.7", color: COLORS.gray, fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>{point}</p>
              </div>
            ))}

            <div style={{ marginTop: "36px", display: "flex", gap: "14px" }}>
              <button style={{
                background: COLORS.primary, color: COLORS.white,
                border: "none", padding: "14px 30px", borderRadius: "6px",
                fontWeight: "600", fontSize: "14px", cursor: "pointer",
                fontFamily: "'Helvetica Neue', Arial, sans-serif",
              }}>Our Story</button>
              <button style={{
                background: "transparent", color: COLORS.primary,
                border: `1.5px solid ${COLORS.grayLight}`, padding: "14px 30px", borderRadius: "6px",
                fontWeight: "500", fontSize: "14px", cursor: "pointer",
                fontFamily: "'Helvetica Neue', Arial, sans-serif",
              }}>Meet the Team</button>
            </div>
          </div>

          {/* Image Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <img src="https://images.unsplash.com/photo-1600607687939-ce8a6d30c7e3?w=400&q=80" alt="team" style={{ width: "100%", height: "220px", objectFit: "cover", borderRadius: "10px" }} />
            <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80" alt="property" style={{ width: "100%", height: "220px", objectFit: "cover", borderRadius: "10px", marginTop: "28px" }} />
            <img src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&q=80" alt="community" style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "10px" }} />
            <img src="https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=400&q=80" alt="award" style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "10px", marginTop: "-28px" }} />
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: "90px 5%", background: COLORS.primary }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.18em", color: COLORS.accent, textTransform: "uppercase", fontFamily: "'Helvetica Neue', Arial, sans-serif", marginBottom: "12px" }}>Our Process</div>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 48px)", fontWeight: "400", color: COLORS.white, margin: 0 }}>How it Works</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "40px" }}>
            {[
              { step: "01", title: "Sign Up & Subscribe", desc: "Create your account and set your property preferences to receive personalised alerts the moment new listings match your criteria." },
              { step: "02", title: "Explore Listings", desc: "Browse our curated portfolio of homes, apartments, villas and commercial properties across Adelaide and surrounds." },
              { step: "03", title: "Submit or List", desc: "Ready to buy, sell, or lease? Our expert agents guide you through every step from appraisal to settlement." },
            ].map(s => (
              <div key={s.step} style={{
                padding: "36px 32px", borderRadius: "12px",
                border: "1px solid rgba(201,168,76,0.2)",
                background: "rgba(255,255,255,0.04)",
              }}>
                <div style={{ fontSize: "48px", fontWeight: "700", color: "rgba(201,168,76,0.25)", fontFamily: "'Helvetica Neue', Arial, sans-serif", lineHeight: "1", marginBottom: "20px" }}>{s.step}</div>
                <h3 style={{ fontSize: "20px", fontWeight: "500", color: COLORS.white, margin: "0 0 14px" }}>{s.title}</h3>
                <p style={{ fontSize: "14px", lineHeight: "1.8", color: "rgba(255,255,255,0.55)", margin: 0, fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: "90px 5%", background: COLORS.offWhite }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.18em", color: COLORS.accent, textTransform: "uppercase", fontFamily: "'Helvetica Neue', Arial, sans-serif", marginBottom: "12px" }}>Testimonials</div>
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 46px)", fontWeight: "400", color: COLORS.primary, margin: "0 0 52px" }}>Clients Feedback</h2>

          <div style={{
            background: COLORS.white, borderRadius: "16px", padding: "52px 60px",
            boxShadow: "0 8px 40px rgba(0,0,0,0.08)", transition: "all 0.4s ease",
          }}>
            <div style={{ display: "flex", justifyContent: "center", gap: "4px", marginBottom: "28px" }}>
              {[1, 2, 3, 4, 5].map(i => <StarIcon key={i} filled />)}
            </div>
            <p style={{
              fontSize: "18px", lineHeight: "1.8", color: COLORS.dark,
              fontStyle: "italic", margin: "0 0 32px",
            }}>
              "{testimonials[activeTestimonial].text}"
            </p>
            <div>
              <div style={{ fontWeight: "700", fontSize: "16px", color: COLORS.primary, fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>{testimonials[activeTestimonial].name}</div>
              <div style={{ fontSize: "13px", color: COLORS.gray, fontFamily: "'Helvetica Neue', Arial, sans-serif", marginTop: "4px" }}>{testimonials[activeTestimonial].role}</div>
            </div>
          </div>

          {/* Dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "28px" }}>
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)} style={{
                width: i === activeTestimonial ? "28px" : "8px",
                height: "8px", borderRadius: "4px",
                background: i === activeTestimonial ? COLORS.accent : COLORS.grayLight,
                border: "none", cursor: "pointer",
                transition: "all 0.3s ease",
              }} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{
        padding: "80px 5%", background: COLORS.accent,
        textAlign: "center",
      }}>
        <h2 style={{ fontSize: "clamp(26px, 3.5vw, 50px)", fontWeight: "400", color: COLORS.primary, margin: "0 0 16px" }}>
          Ready to sell your property?
        </h2>
        <p style={{ fontSize: "16px", color: "rgba(10,22,40,0.7)", margin: "0 0 36px", fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
          Trust Stadium Real Estate to guide you through a seamless process, getting you the best value.
        </p>
        <button style={{
          background: COLORS.primary, color: COLORS.white,
          border: "none", padding: "16px 44px", borderRadius: "8px",
          fontWeight: "700", fontSize: "15px", cursor: "pointer",
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          letterSpacing: "0.06em",
        }}>
          List Your Property
        </button>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: COLORS.primary, padding: "60px 5% 30px", color: "rgba(255,255,255,0.6)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "50px", marginBottom: "50px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
                <div style={{ width: "32px", height: "32px", background: COLORS.accent, borderRadius: "5px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: COLORS.primary, fontWeight: "900", fontSize: "14px" }}>S</span>
                </div>
                <span style={{ color: COLORS.white, fontWeight: "700", fontSize: "17px" }}>Stadium <span style={{ color: COLORS.accent }}>RE</span></span>
              </div>
              <p style={{ fontSize: "14px", lineHeight: "1.8", fontFamily: "'Helvetica Neue', Arial, sans-serif", maxWidth: "280px" }}>
                Setting a higher standard in Adelaide real estate. Community, integrity, and results — every time.
              </p>
            </div>
            {[
              { heading: "Buy", links: ["Latest Listings", "Commercial", "Land", "Open Inspections"] },
              { heading: "Company", links: ["About Us", "Our Team", "Community Program", "Contact"] },
              { heading: "Services", links: ["Property Appraisal", "Rental Appraisal", "Live Auctions", "Property Management"] },
            ].map(col => (
              <div key={col.heading}>
                <h4 style={{ color: COLORS.white, fontWeight: "600", fontSize: "14px", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'Helvetica Neue', Arial, sans-serif", marginBottom: "16px" }}>{col.heading}</h4>
                {col.links.map(l => (
                  <div key={l} style={{ fontSize: "14px", marginBottom: "10px", cursor: "pointer", fontFamily: "'Helvetica Neue', Arial, sans-serif", transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = COLORS.accent}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}
                  >{l}</div>
                ))}
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px" }}>
            <span style={{ fontSize: "13px", fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>© 2026 Stadium Real Estate. All rights reserved.</span>
            <span style={{ fontSize: "13px", fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>Privacy Policy · Terms of Service</span>
          </div>
        </div>
      </footer>

      {/* ── CSS Animations ── */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::placeholder { color: rgba(255,255,255,0.4); }
        select option { background: #0A1628; color: white; }
      `}</style>
    </div>
  );
}