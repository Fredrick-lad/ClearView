import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function ClearViewLanding() {
  // State for active dynamic controls (if expanded later)
  const [activeTab, setActiveTab] = useState<string>("all");

  // React Implementation of the Intersection Observer for Fade-In animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    const hiddenElements = document.querySelectorAll(".fade-in");
    hiddenElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div style={styles.appContainer}>
      {/* Dynamic Injector for Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        
        html { scroll-behavior: smooth; }
        
        .fade-in { 
          opacity: 0; 
          transform: translateY(18px); 
          transition: opacity 0.65s cubic-bezier(0.25, 1, 0.5, 1), transform 0.65s cubic-bezier(0.25, 1, 0.5, 1); 
        }
        .fade-in.visible { 
          opacity: 1; 
          transform: translateY(0); 
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.7); }
        }

        @keyframes floatUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .responsive-hero { grid-template-columns: 1fr !important; gap: 3rem !important; padding: 4rem 1.5rem 3rem !important; }
          .responsive-hero-visual { order: -1 !important; }
          .responsive-grid-2 { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .responsive-grid-3 { grid-template-columns: 1fr !important; }
          .responsive-nav-links { display: none !important; }
          .responsive-method { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .responsive-sticky { position: static !important; }
        }
      `}</style>
      {/* NAVBAR SECTION */}
      <nav style={styles.nav}>
        <Link to="/" style={styles.navLogo}>
          <span style={styles.logoDot}></span>Clear View
        </Link>
        <ul className="responsive-nav-links" style={styles.navLinks}>
          <li>
            <a href="#features" style={styles.navLinkItem}>
              Features
            </a>
          </li>
          <li>
            <a href="#tech" style={styles.navLinkItem}>
              Technologies
            </a>
          </li>
        </ul>
        <Link to="onboarding" style={styles.navCta}>
          Get started
        </Link>
      </nav>

      {/* HERO SECTION */}
      <section style={{ padding: 0 }}>
        <div className="responsive-hero" style={styles.hero}>
          <div style={styles.heroContent}>
            <div style={styles.heroBadge}>
              <span style={styles.pulseDot}></span>Kabarak University · BBIT
              Final Year Project
            </div>
            <h1 style={styles.heroTitle}>
              Budget <em>before</em> you overspend, not after.
            </h1>
            <p style={styles.heroDescription}>
              A cross-platform digital envelope budgeting system purpose-built
              for university students managing semester disbursements on mobile
              money.
            </p>
            <div style={styles.heroActions}>
              <Link to="/login" style={styles.btnPrimary}>
                Log in
              </Link>
              <Link to="/register" style={styles.btnSecondary}>
                Register
              </Link>
            </div>
          </div>

          <div className="responsive-hero-visual" style={styles.heroVisual}>
            <div style={styles.floatingBadge}>
              <div style={styles.badgeIcon}>✓</div>
              <div style={styles.badgeText}>
                <strong
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#18181A",
                    lineHeight: 1.2,
                  }}
                >
                  UAT Passed
                </strong>
                <span style={{ color: "#8A8A94", fontSize: "11px" }}>
                  30 student testers
                </span>
              </div>
            </div>

            <div style={styles.appMockup}>
              <div style={styles.mockupHeader}>
                <span style={styles.mockupHeaderTitle}>My Budget</span>
                <span style={styles.mockupHeaderPeriod}>Semester 2</span>
              </div>

              <div style={styles.budgetTotal}>
                <div>
                  <div style={styles.budgetTotalLabel}>Total Budget</div>
                  <div style={styles.budgetTotalAmount}>KES 18,000</div>
                </div>
                <div style={styles.budgetTotalUnalloc}>
                  <strong
                    style={{
                      display: "block",
                      color: "#fff",
                      fontSize: "14px",
                    }}
                  >
                    KES 1,400
                  </strong>
                  unallocated
                </div>
              </div>

              <div style={styles.envelopesContainer}>
                {/* Envelope 1 */}
                <div style={styles.envelopeRow}>
                  <div style={{ ...styles.envIcon, background: "#E1F5EE" }}>
                    🍽️
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={styles.envName}>Food &amp; Groceries</div>
                    <div style={styles.envTrack}>
                      <div
                        style={{
                          ...styles.envTrackFill,
                          width: "62%",
                          background: "#1D9E75",
                        }}
                      ></div>
                    </div>
                  </div>
                  <div style={styles.envAmount}>KES 3,720 left</div>
                </div>

                {/* Envelope 2 */}
                <div style={styles.envelopeRow}>
                  <div style={{ ...styles.envIcon, background: "#FAEEDA" }}>
                    📚
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={styles.envName}>Academic Materials</div>
                    <div style={styles.envTrack}>
                      <div
                        style={{
                          ...styles.envTrackFill,
                          width: "35%",
                          background: "#EF9F27",
                        }}
                      ></div>
                    </div>
                  </div>
                  <div style={styles.envAmount}>KES 875 left</div>
                </div>

                {/* Envelope 3 */}
                <div style={styles.envelopeRow}>
                  <div style={{ ...styles.envIcon, background: "#FCEBEB" }}>
                    🚌
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={styles.envName}>Transport</div>
                    <div style={styles.envTrack}>
                      <div
                        style={{
                          ...styles.envTrackFill,
                          width: "18%",
                          background: "#E24B4A",
                        }}
                      ></div>
                    </div>
                  </div>
                  <div style={styles.envAmount}>KES 360 left</div>
                </div>

                {/* Envelope 4 */}
                <div style={styles.envelopeRow}>
                  <div style={{ ...styles.envIcon, background: "#EEEDFE" }}>
                    💆
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={styles.envName}>Personal &amp; Self-Care</div>
                    <div style={styles.envTrack}>
                      <div
                        style={{
                          ...styles.envTrackFill,
                          width: "80%",
                          background: "#7F77DD",
                        }}
                      ></div>
                    </div>
                  </div>
                  <div style={styles.envAmount}>KES 2,400 left</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <div style={styles.statsStrip}>
        <div style={styles.statsInner}>
          <div className="fade-in" style={styles.stat}>
            <div style={styles.statNumber}>5</div>
            <div style={styles.statLabel}>Core system modules</div>
          </div>
          <div className="fade-in" style={styles.stat}>
            <div style={styles.statNumber}>30+</div>
            <div style={styles.statLabel}>Students surveyed</div>
          </div>
          <div className="fade-in" style={styles.stat}>
            <div style={styles.statNumber}>6</div>
            <div style={styles.statLabel}>Agile sprint cycles</div>
          </div>
          <div className="fade-in" style={styles.stat}>
            <div style={styles.statNumber}>2</div>
            <div style={styles.statLabel}>Platforms (web + mobile)</div>
          </div>
        </div>
      </div>

      {/* THE PROBLEM SECTION */}
      <section id="problem" style={styles.sectionSurface}>
        <div style={styles.sectionInner}>
          <div style={styles.sectionTag}>The Problem</div>
          <h2 style={styles.sectionTitle}>
            Why students run out of money
            <br />
            halfway through semester
          </h2>

          <div className="responsive-grid-2" style={styles.problemGrid}>
            <div>
              <div className="fade-in" style={styles.problemPoint}>
                <div style={styles.problemNum}>01</div>
                <div>
                  <h3 style={styles.problemPointTitle}>
                    Bank-centric apps don't fit
                  </h3>
                  <p style={styles.problemPointText}>
                    Apps like Mint and YNAB require formal bank account sync —
                    irrelevant for students transacting on M-Pesa and cash.
                  </p>
                </div>
              </div>
              <div className="fade-in" style={styles.problemPoint}>
                <div style={styles.problemNum}>02</div>
                <div>
                  <h3 style={styles.problemPointTitle}>
                    Reactive, not proactive
                  </h3>
                  <p style={styles.problemPointText}>
                    Most tools report overspending after it happens. Students
                    need a signal before the money is gone, not a post-mortem.
                  </p>
                </div>
              </div>
              <div className="fade-in" style={styles.problemPoint}>
                <div style={styles.problemNum}>03</div>
                <div>
                  <h3 style={styles.problemPointTitle}>
                    Feature bloat drives abandonment
                  </h3>
                  <p style={styles.problemPointText}>
                    Investment trackers, credit scores, social sharing — none of
                    this is relevant for a student trying to stretch KES 18,000
                    across four months.
                  </p>
                </div>
              </div>
              <div className="fade-in" style={styles.problemPoint}>
                <div style={styles.problemNum}>04</div>
                <div>
                  <h3 style={styles.problemPointTitle}>
                    No cross-device, offline-friendly option
                  </h3>
                  <p style={styles.problemPointText}>
                    Students switch between phone and laptop throughout the day.
                    Intermittent campus Wi-Fi makes heavy cloud-first apps
                    unreliable.
                  </p>
                </div>
              </div>
            </div>

            <div className="responsive-sticky" style={styles.solutionSticky}>
              <div className="fade-in" style={styles.solutionCard}>
                <h3 style={styles.solutionCardTitle}>
                  The Envelope Method, digitized.
                </h3>
                <p style={styles.solutionCardText}>
                  Dave Ramsey's cash-envelope system enforces category
                  discipline through a hard constraint: once an envelope is
                  empty, spending stops. Clear View brings this same discipline
                  into a mobile-friendly digital format — no bank account
                  required.
                </p>
                <p style={styles.solutionCardText}>
                  Mental accounting theory (Thaler &amp; Sunstein, 2008) shows
                  that naming and separating money by purpose reduces
                  overspending. This system makes that psychological effect
                  tangible with colour-coded real-time indicators.
                </p>
                <div style={{ flexWrap: "wrap", display: "flex" }}>
                  {[
                    "Manual entry",
                    "M-Pesa compatible",
                    "Mobile-first",
                    "No bank sync needed",
                    "Real-time alerts",
                  ].map((tag, i) => (
                    <span key={i} style={styles.solutionTag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURES SECTION */}
      <section id="features" style={styles.sectionBase}>
        <div style={styles.sectionInner}>
          <div style={styles.sectionTag}>System Modules</div>
          <h2 style={styles.sectionTitle}>
            Everything a student needs.
            <br />
            Nothing they don't.
          </h2>
          <p style={styles.sectionSub}>
            Five focused modules built around the real financial workflows of
            Kabarak University students.
          </p>

          <div className="responsive-grid-3" style={styles.featuresGrid}>
            {[
              {
                icon: "🔐",
                title: "User Authentication",
                desc: "Secure account creation and login using bcrypt password hashing and JWT-based session management. Each student's financial data remains entirely private.",
              },
              {
                icon: "✉️",
                title: "Envelope Management",
                desc: "Create custom spending categories, set monetary limits, and allocate income at the start of each cycle. Colour-coded progress bars (green → amber → red) surface status at a glance.",
              },
              {
                icon: "💸",
                title: "Expense Tracking",
                desc: "Log expenses manually in seconds. Each entry immediately deducts from the relevant envelope. Supports recurring expenses like weekly food deductions.",
              },
              {
                icon: "💰",
                title: "Income Management",
                desc: "Record bursaries, family remittances, or part-time income. The system shows allocated versus unallocated funds clearly before you begin spending.",
              },
              {
                icon: "📊",
                title: "Reports & Dashboard",
                desc: "Weekly and monthly bar and pie charts reveal spending patterns across cycles. Compare planned versus actual spend per category to track discipline over time.",
              },
            ].map((feat, index) => (
              <div key={index} className="fade-in" style={styles.featureCard}>
                <div style={styles.featureIcon}>{feat.icon}</div>
                <h3 style={styles.featureCardTitle}>{feat.title}</h3>
                <p style={styles.featureCardText}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNICAL STACK SECTION */}
      <section id="tech" style={styles.sectionSurface}>
        <div style={styles.sectionInner}>
          <div style={styles.sectionTag}>Technical Stack</div>
          <h2 style={styles.sectionTitle}>
            Built on solid, open-source foundations
          </h2>
          <p style={styles.sectionSub}>
            Every tool selected for compatibility with a student development
            context — free, well-documented, and production-grade.
          </p>

          <div className="responsive-grid-3" style={styles.techRow}>
            {[
              { badge: "⚛️", name: "React.js", role: "Frontend UI Framework" },
              { badge: "🟩", name: "Node.js", role: "Backend Runtime" },
              {
                badge: "🚀",
                name: "Express.js",
                role: "REST API Middleware Layer",
              },
              {
                badge: "🗄️",
                name: "MySQL / PostgreSQL",
                role: "Relational Database Layer",
              },
              {
                badge: "🔑",
                name: "JWT + bcrypt",
                role: "Authentication & Hashing",
              },
              {
                badge: "📈",
                name: "Recharts",
                role: "Data Dashboard Visualizations",
              },
            ].map((tech, i) => (
              <div key={i} className="fade-in" style={styles.techPill}>
                <div style={styles.techBadge}>{tech.badge}</div>
                <div>
                  <div style={styles.techPillName}>{tech.name}</div>
                  <div style={styles.techPillRole}>{tech.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION SECTION */}
      <section style={styles.ctaSection}>
        <div style={{ ...styles.sectionTag, textAlign: "center" }}>
          Get Started
        </div>
        <h2 className="fade-in" style={styles.sectionTitle}>
          Take control of your semester budget
        </h2>
        <p
          className="fade-in"
          style={{ ...styles.sectionSub, margin: "0 auto 2.5rem" }}
        >
          Allocate your funds, track every shilling, and never be caught
          off-guard before disbursement again.
        </p>
        <div className="fade-in" style={styles.ctaActions}>
          <a href="#features" style={styles.btnPrimary}>
            Explore the System
          </a>
          <a href="#about" style={styles.btnSecondary}>
            Read the Research
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <span style={styles.footerLogo}>Clear View</span>
          <p style={styles.footerText}>
            BBIT Final Year Project · Kabarak University · 2025 · Mwangangi
            Fredrick
          </p>
          <p style={{ fontSize: "12px", color: "#8A8A94" }}>
            Supervisor: Mr. Martin · Dept. of CS &amp; IT
          </p>
        </div>
      </footer>
    </div>
  );
}

// STRICT TYPED COMPREHENSIVE STYLING SCHEME (Raw CSS to React Native Objects Mapping)
const styles: Record<string, React.CSSProperties> = {
  appContainer: {
    background: "#F9F8F4",
    color: "#18181A",
    fontFamily: "'DM Sans', system-ui, sans-serif",
    fontSize: "16px",
    lineHeight: 1.7,
  },
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    background: "rgba(249,248,244,0.88)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    borderBottom: "0.5px solid rgba(24,24,26,0.10)",
    padding: "0 2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "60px",
  },
  navLogo: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "18px",
    fontWeight: 700,
    color: "#18181A",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  logoDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#0F6E56",
    display: "inline-block",
    marginBottom: "1px",
  },
  navLinks: {
    display: "flex",
    gap: "2rem",
    listStyle: "none",
  },
  navLinkItem: {
    fontSize: "14px",
    fontWeight: 400,
    color: "#4A4A50",
    textDecoration: "none",
    transition: "color 0.2s",
  },
  navCta: {
    fontSize: "13px",
    fontWeight: 500,
    background: "#0F6E56",
    color: "#fff",
    padding: "8px 18px",
    borderRadius: "100px",
    textDecoration: "none",
    transition: "opacity 0.2s",
  },
  hero: {
    maxWidth: "1120px",
    margin: "0 auto",
    padding: "7rem 2rem 5rem",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "5rem",
    alignItems: "center",
  },
  heroContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    background: "#E1F5EE",
    color: "#0F6E56",
    fontSize: "12px",
    fontWeight: 500,
    padding: "5px 12px",
    borderRadius: "100px",
    marginBottom: "1.5rem",
    letterSpacing: "0.02em",
  },
  pulseDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#1D9E75",
    animation: "pulse 2s ease-in-out infinite",
  },
  heroTitle: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "calc(1.8rem + 1.5vw)",
    fontWeight: 700,
    lineHeight: 1.15,
    color: "#18181A",
    marginBottom: "1.25rem",
  },
  heroDescription: {
    fontSize: "1.05rem",
    color: "#4A4A50",
    lineHeight: 1.75,
    marginBottom: "2.25rem",
    maxWidth: "440px",
  },
  heroActions: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  btnPrimary: {
    background: "#0F6E56",
    color: "#fff",
    fontSize: "15px",
    fontWeight: 500,
    padding: "13px 28px",
    borderRadius: "100px",
    textDecoration: "none",
    transition: "opacity 0.2s, transform 0.15s",
    display: "inline-block",
  },
  btnSecondary: {
    background: "transparent",
    color: "#18181A",
    fontSize: "15px",
    fontWeight: 400,
    padding: "13px 28px",
    borderRadius: "100px",
    border: "0.5px solid rgba(24,24,26,0.18)",
    textDecoration: "none",
    transition: "background 0.2s, transform 0.15s",
    display: "inline-block",
  },
  heroVisual: {
    position: "relative",
  },
  floatingBadge: {
    position: "absolute",
    top: "-14px",
    right: "-14px",
    background: "#FFFFFF",
    border: "0.5px solid rgba(24,24,26,0.18)",
    borderRadius: "12px",
    padding: "10px 14px",
    boxShadow: "0 4px 20px rgba(24,24,26,0.08)",
    fontSize: "12px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    zIndex: 10,
    animation: "floatUp 0.8s 0.3s ease both",
  },
  badgeIcon: {
    width: "28px",
    height: "28px",
    background: "#E1F5EE",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    color: "#0F6E56",
  },
  appMockup: {
    background: "#FFFFFF",
    border: "0.5px solid rgba(24,24,26,0.18)",
    borderRadius: "20px",
    padding: "1.75rem",
    boxShadow: "0 2px 40px rgba(24,24,26,0.06), 0 1px 4px rgba(24,24,26,0.04)",
    animation: "floatUp 0.8s ease both",
  },
  mockupHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1.5rem",
  },
  mockupHeaderTitle: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "15px",
    fontWeight: 600,
    color: "#18181A",
  },
  mockupHeaderPeriod: {
    fontSize: "12px",
    color: "#8A8A94",
  },
  budgetTotal: {
    background: "#0F6E56",
    borderRadius: "12px",
    padding: "1.25rem 1.5rem",
    marginBottom: "1.25rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  budgetTotalLabel: {
    fontSize: "11px",
    color: "rgba(255,255,255,0.7)",
    fontWeight: 400,
  },
  budgetTotalAmount: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "1.8rem",
    fontWeight: 700,
    color: "#fff",
    marginTop: "2px",
  },
  budgetTotalUnalloc: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.65)",
    textAlign: "right",
  },
  envelopesContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  envelopeRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  envIcon: {
    width: "34px",
    height: "34px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "15px",
    flexShrink: 0,
  },
  envName: {
    fontSize: "13px",
    fontWeight: 500,
    color: "#18181A",
  },
  envTrack: {
    height: "4px",
    borderRadius: "99px",
    background: "rgba(24,24,26,0.10)",
    marginTop: "5px",
    overflow: "hidden",
  },
  envTrackFill: {
    height: "100%",
    borderRadius: "99px",
    transition: "width 1s ease",
  },
  envAmount: {
    fontSize: "12px",
    fontWeight: 500,
    color: "#4A4A50",
    whiteSpace: "nowrap",
  },
  statsStrip: {
    borderTop: "0.5px solid rgba(24,24,26,0.10)",
    borderBottom: "0.5px solid rgba(24,24,26,0.10)",
    background: "#FFFFFF",
    padding: "1.5rem 2rem",
  },
  statsInner: {
    maxWidth: "1120px",
    margin: "0 auto",
    display: "flex",
    gap: "3rem",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  stat: {
    textAlign: "center",
  },
  statNumber: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "2rem",
    fontWeight: 700,
    color: "#18181A",
    lineHeight: 1.1,
  },
  statLabel: {
    fontSize: "13px",
    color: "#8A8A94",
    marginTop: "3px",
  },
  sectionBase: {
    padding: "5.5rem 2rem",
  },
  sectionSurface: {
    padding: "5.5rem 2rem",
    background: "#FFFFFF",
  },
  sectionDark: {
    padding: "5.5rem 2rem",
    background: "#18181A",
  },
  sectionInner: {
    maxWidth: "1120px",
    margin: "0 auto",
  },
  sectionTag: {
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#0F6E56",
    marginBottom: "0.75rem",
  },
  sectionTitle: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
    fontWeight: 700,
    color: "#18181A",
    lineHeight: 1.2,
    marginBottom: "1rem",
  },
  sectionSub: {
    fontSize: "1.05rem",
    color: "#4A4A50",
    maxWidth: "540px",
    lineHeight: 1.75,
  },
  problemGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "5rem",
    alignItems: "start",
    marginTop: "3.5rem",
  },
  problemPoint: {
    display: "flex",
    gap: "1rem",
    padding: "1.5rem 0",
    borderTop: "0.5px solid rgba(24,24,26,0.10)",
  },
  problemNum: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "1.4rem",
    fontWeight: 700,
    color: "rgba(24,24,26,0.18)",
    minWidth: "36px",
    lineHeight: 1.2,
  },
  problemPointTitle: {
    fontSize: "15px",
    fontWeight: 500,
    color: "#18181A",
    marginBottom: "4px",
  },
  problemPointText: {
    fontSize: "14px",
    color: "#4A4A50",
    lineHeight: 1.6,
  },
  solutionSticky: {
    position: "sticky",
    top: "80px",
  },
  solutionCard: {
    background: "#F9F8F4",
    border: "0.5px solid rgba(24,24,26,0.18)",
    borderRadius: "20px",
    padding: "2.5rem",
  },
  solutionCardTitle: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "1.3rem",
    fontWeight: 600,
    marginBottom: "0.75rem",
    color: "#18181A",
  },
  solutionCardText: {
    fontSize: "14px",
    color: "#4A4A50",
    lineHeight: 1.7,
    marginBottom: "1.5rem",
  },
  solutionTag: {
    display: "inline-block",
    background: "#E1F5EE",
    color: "#0F6E56",
    fontSize: "12px",
    fontWeight: 500,
    padding: "4px 10px",
    borderRadius: "100px",
    margin: "3px",
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "1.5rem",
    marginTop: "3rem",
  },
  featureCard: {
    background: "#FFFFFF",
    border: "0.5px solid rgba(24,24,26,0.10)",
    borderRadius: "20px",
    padding: "1.75rem",
    transition: "border-color 0.2s, transform 0.2s",
  },
  featureIcon: {
    width: "44px",
    height: "44px",
    background: "#E1F5EE",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    marginBottom: "1.25rem",
  },
  featureCardTitle: {
    fontSize: "15px",
    fontWeight: 500,
    marginBottom: "6px",
    color: "#18181A",
  },
  featureCardText: {
    fontSize: "13.5px",
    color: "#4A4A50",
    lineHeight: 1.65,
  },
  techRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: "1rem",
    marginTop: "2.5rem",
  },
  techPill: {
    background: "#F9F8F4",
    border: "0.5px solid rgba(24,24,26,0.18)",
    borderRadius: "12px",
    padding: "1rem 1.25rem",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  techBadge: {
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    background: "#E1F5EE",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    flexShrink: 0,
  },
  techPillName: {
    fontSize: "13px",
    fontWeight: 500,
    color: "#18181A",
  },
  techPillRole: {
    fontSize: "11px",
    color: "#8A8A94",
    marginTop: "1px",
  },
  methodologyParagraph: {
    fontSize: "14px",
    color: "#4A4A50",
    marginTop: "1.5rem",
    lineHeight: 1.75,
  },
  methodTimeline: {
    display: "flex",
    flexDirection: "column",
    gap: "0",
    borderLeft: "1.5px solid rgba(24,24,26,0.18)",
    paddingLeft: "2rem",
    maxWidth: "640px",
  },
  methodItem: {
    paddingBottom: "1.5rem",
    position: "relative",
  },
  sprintLabel: {
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#0F6E56",
    marginBottom: "4px",
  },
  methodItemTitle: {
    fontSize: "15px",
    fontWeight: 500,
    color: "#18181A",
    marginBottom: "4px",
  },
  methodItemDesc: {
    fontSize: "13.5px",
    color: "#4A4A50",
  },
  aboutGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "1.5rem",
    marginTop: "3rem",
  },
  aboutCard: {
    background: "rgba(255,255,255,0.04)",
    border: "0.5px solid rgba(255,255,255,0.1)",
    borderRadius: "20px",
    padding: "1.75rem",
  },
  aboutCardLabel: {
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.35)",
    marginBottom: "10px",
  },
  aboutCardValue: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "1.05rem",
    fontWeight: 600,
    color: "#fff",
    lineHeight: 1.4,
  },
  aboutCardSub: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.45)",
    marginTop: "6px",
  },
  ctaSection: {
    textAlign: "center",
    padding: "7rem 2rem",
  },
  ctaActions: {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  footer: {
    borderTop: "0.5px solid rgba(24,24,26,0.10)",
    padding: "2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "1rem",
  },
  footerInner: {
    maxWidth: "1120px",
    margin: "0 auto",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "1rem",
  },
  footerLogo: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "16px",
    fontWeight: 700,
    color: "#18181A",
  },
  footerText: {
    fontSize: "13px",
    color: "#8A8A94",
  },
};
