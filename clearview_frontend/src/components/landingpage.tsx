import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  UtensilsCrossed,
  BookOpen,
  Bus,
  Home,
  Smile,
  GraduationCap,
  Target,
  DollarSign,
  CheckCircle,
  ShieldCheck,
  Mail,
  Wallet,
  BarChart3,
  Sparkles,
  PieChart,
  RotateCcw,
  Lightbulb,
  Code2,
  Server,
  Globe,
  Database,
  Key,
  TrendingUp,
} from "lucide-react";

export default function ClearViewLanding() {
  const [activeTab, setActiveTab] = useState<string>("all");

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

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        @media (max-width: 768px) {
          .responsive-hero { grid-template-columns: 1fr !important; gap: 3rem !important; padding: 4rem 1.5rem 3rem !important; }
          .responsive-hero-visual { order: -1 !important; }
          .responsive-grid-2 { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .responsive-grid-3 { grid-template-columns: 1fr !important; }
          .responsive-nav-links { display: none !important; }
          .responsive-sticky { position: static !important; }
          .responsive-testimonials { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav style={styles.nav}>
        <Link to="/" style={styles.navLogo}>
          <span style={styles.logoDot}></span>ClearView
        </Link>
        <ul className="responsive-nav-links" style={styles.navLinks}>
          <li>
            <a href="#how-it-works" style={styles.navLinkItem}>
              How it Works
            </a>
          </li>
          <li>
            <a href="#features" style={styles.navLinkItem}>
              Features
            </a>
          </li>
          <li>
            <a href="#outcomes" style={styles.navLinkItem}>
              Outcomes
            </a>
          </li>
        </ul>
        <Link to="/register" style={styles.navCta}>
          Start Budgeting
        </Link>
      </nav>

      {/* HERO SECTION */}
      <section style={{ padding: 0 }}>
        <div className="responsive-hero" style={styles.hero}>
          <div style={styles.heroContent}>
            <div style={styles.heroBadge}>
              <span style={styles.pulseDot}></span>Built for university students
            </div>
            <h1 style={styles.heroTitle}>
              Make your <em>semester money</em> last.
            </h1>
            <p style={styles.heroDescription}>
              The envelope budgeting system designed for students — track your
              allowance, bursary, or part-time income across categories, and
              never run out of cash before disbursement again.
            </p>
            <div style={styles.heroActions}>
              <Link to="/register" style={styles.btnPrimary}>
                Create Free Account
              </Link>
              <Link to="/login" style={styles.btnSecondary}>
                I already have one
              </Link>
            </div>
            <div
              style={{
                marginTop: "16px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
                color: "#8A8A94",
              }}
            >
              <span style={{ color: "#1D9E75", fontWeight: 600 }}>✓</span> No
              bank sync needed
              <span style={{ margin: "0 4px", color: "#ddd" }}>·</span>
              <span style={{ color: "#1D9E75", fontWeight: 600 }}>✓</span> Works
              with M-Pesa
              <span style={{ margin: "0 4px", color: "#ddd" }}>·</span>
              <span style={{ color: "#1D9E75", fontWeight: 600 }}>✓</span> Free
              for students
            </div>
          </div>

          <div className="responsive-hero-visual" style={styles.heroVisual}>
            <div style={styles.floatingBadge}>
              <div style={styles.badgeIcon}>
                <GraduationCap size={16} style={{ color: "#0F6E56" }} />
              </div>
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
                  Final Year Project
                </strong>
                <span style={{ color: "#8A8A94", fontSize: "11px" }}>
                  BBIT · Kabarak University
                </span>
              </div>
            </div>

            <div style={styles.appMockup}>
              <div style={styles.mockupHeader}>
                <span style={styles.mockupHeaderTitle}>My Semester Budget</span>
                <span style={styles.mockupHeaderPeriod}>Semester 2</span>
              </div>

              <div style={styles.budgetTotal}>
                <div>
                  <div style={styles.budgetTotalLabel}>
                    Total Semester Funds
                  </div>
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
                <div style={styles.envelopeRow}>
                  <div style={{ ...styles.envIcon, background: "#E1F5EE" }}>
                    <UtensilsCrossed size={16} style={{ color: "#1D9E75" }} />
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

                <div style={styles.envelopeRow}>
                  <div style={{ ...styles.envIcon, background: "#FAEEDA" }}>
                    <BookOpen size={16} style={{ color: "#EF9F27" }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={styles.envName}>Academic Supplies</div>
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

                <div style={styles.envelopeRow}>
                  <div style={{ ...styles.envIcon, background: "#FCEBEB" }}>
                    <Bus size={16} style={{ color: "#E24B4A" }} />
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

                <div style={styles.envelopeRow}>
                  <div style={{ ...styles.envIcon, background: "#EEEDFE" }}>
                    <Home size={16} style={{ color: "#7F77DD" }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={styles.envName}>Housing &amp; Utilities</div>
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

      {/* EXPECTATIONS */}
      <div style={styles.statsStrip}>
        <div style={styles.statsInner}>
          <div className="fade-in" style={styles.stat}>
            <div style={styles.statNumber}>100%</div>
            <div style={styles.statLabel}>of funds allocated upfront</div>
          </div>
          <div className="fade-in" style={styles.stat}>
            <div style={styles.statNumber}>70%</div>
            <div style={styles.statLabel}>of income auto-enveloped</div>
          </div>
          <div className="fade-in" style={styles.stat}>
            <div style={styles.statNumber}>0</div>
            <div style={styles.statLabel}>Bank account needed</div>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={styles.sectionBase}>
        <div style={styles.sectionInner}>
          <div style={styles.sectionTag}>How It Works</div>
          <h2 style={styles.sectionTitle}>
            Three steps to semester
            <br />
            financial peace of mind
          </h2>
          <p style={styles.sectionSub}>
            No complicated setup. Just tell us about your money and we'll handle
            the rest.
          </p>

          <div
            className="responsive-grid-3"
            style={{ ...styles.featuresGrid, gap: "2rem" }}
          >
            {[
              {
                step: "01",
                title: "Set your goal",
                desc: "Pick what matters most — tracking spending, saving for fees, budgeting allowance, or managing loans.",
              },
              {
                step: "02",
                title: "Add your income",
                desc: "Record your allowance, scholarship, part-time job, or any semester income. We auto-allocate 70% into smart envelopes.",
              },
              {
                step: "03",
                title: "Track & stay on top",
                desc: "Log expenses, watch your envelope balances shrink in real time, and get alerts before you overspend.",
              },
            ].map((item, i) => (
              <div key={i} className="fade-in" style={styles.featureCard}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "1rem",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      background: "#E1F5EE",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#0F6E56",
                      fontFamily: "'Playfair Display', Georgia, serif",
                    }}
                  >
                    {item.step}
                  </div>
                </div>
                <h3 style={styles.featureCardTitle}>{item.title}</h3>
                <p style={styles.featureCardText}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE FEATURES */}
      <section id="features" style={styles.sectionSurface}>
        <div style={styles.sectionInner}>
          <div style={styles.sectionTag}>Everything a student needs</div>
          <h2 style={styles.sectionTitle}>
            Built around how students
            <br />
            actually manage money
          </h2>
          <p style={styles.sectionSub}>
            Five focused modules designed for Kabarak University students — no
            bank sync, no credit scores, no clutter.
          </p>

          <div className="responsive-grid-3" style={styles.featuresGrid}>
            {[
              {
                icon: ShieldCheck,
                title: "Private & Secure",
                desc: "Your financial data stays yours. JWT-authenticated sessions and bcrypt-hashed passwords keep everything safe.",
              },
              {
                icon: Mail,
                title: "Smart Envelopes",
                desc: "We auto-create food, transport, housing, academic, and entertainment envelopes. Colour-coded bars (green → amber → red) show your status instantly.",
              },
              {
                icon: Wallet,
                title: "Instant Expense Logging",
                desc: "Record what you spend in seconds. Every entry deducts from the right envelope. Works offline-friendly on campus Wi-Fi.",
              },
              {
                icon: DollarSign,
                title: "Income That Fits You",
                desc: "Record bursaries, parental allowance, part-time gigs, or M-Pesa remittances. See exactly what's allocated vs unallocated.",
              },
              {
                icon: BarChart3,
                title: "Semester Reports",
                desc: "Weekly and monthly charts reveal your real spending patterns. Compare planned vs actual and adjust next semester.",
              },
            ].map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div key={i} className="fade-in" style={styles.featureCard}>
                  <div style={styles.featureIcon}>
                    <Icon size={20} style={{ color: "#0F6E56" }} />
                  </div>
                  <h3 style={styles.featureCardTitle}>{feat.title}</h3>
                  <p style={styles.featureCardText}>{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* EXPECTED OUTCOMES */}
      <section id="outcomes" style={styles.sectionBase}>
        <div style={styles.sectionInner}>
          <div style={styles.sectionTag}>What We Aim To Achieve</div>
          <h2 style={styles.sectionTitle}>
            Expected outcomes for
            <br />
            student users
          </h2>

          <div
            className="responsive-testimonials"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.5rem",
              marginTop: "3rem",
            }}
          >
            {[
              {
                icon: Target,
                title: "End mid-semester money anxiety",
                desc: "Students will know exactly how much they have left in each category at all times, eliminating the uncertainty that leads to running out of cash before the next disbursement.",
              },
              {
                icon: PieChart,
                title: "Build spending awareness",
                desc: "By logging expenses and seeing real-time balances, students will develop a clearer picture of their actual spending habits and identify areas where they can cut back.",
              },
              {
                icon: RotateCcw,
                title: "Semester-over-semester improvement",
                desc: "With data persisting across periods, students will be able to compare their spending patterns across semesters and set measurable improvement goals.",
              },
              {
                icon: Lightbulb,
                title: "Financial habit formation",
                desc: "The envelope method teaches proactive budgeting rather than reactive tracking. Over time, students will internalise the discipline of allocating before spending.",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="fade-in"
                  style={{
                    background: "#FFFFFF",
                    border: "0.5px solid rgba(24,24,26,0.10)",
                    borderRadius: "20px",
                    padding: "1.75rem",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      background: "#E1F5EE",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <Icon size={22} style={{ color: "#0F6E56" }} />
                  </div>
                  <h3
                    style={{
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "#18181A",
                      marginBottom: "6px",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "13.5px",
                      color: "#4A4A50",
                      lineHeight: 1.65,
                      marginBottom: 0,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TECHNICAL STACK */}
      <section id="tech" style={styles.sectionSurface}>
        <div style={styles.sectionInner}>
          <div style={styles.sectionTag}>Built With</div>
          <h2 style={styles.sectionTitle}>Solid, open-source foundations</h2>
          <p style={styles.sectionSub}>
            Every tool was chosen to be free, well-documented, and
            production-grade — perfect for a student development context.
          </p>

          <div className="responsive-grid-3" style={styles.techRow}>
            {[
              { icon: Code2, name: "React.js", role: "Frontend UI" },
              { icon: Server, name: "Node.js", role: "Backend Runtime" },
              { icon: Globe, name: "Express.js", role: "REST API Layer" },
              { icon: Database, name: "MySQL", role: "Database" },
              { icon: Key, name: "JWT + bcrypt", role: "Auth & Security" },
              { icon: TrendingUp, name: "Recharts", role: "Charts & Reports" },
            ].map((tech, i) => {
              const Icon = tech.icon;
              return (
                <div key={i} className="fade-in" style={styles.techPill}>
                  <div style={styles.techBadge}>
                    <Icon size={16} style={{ color: "#0F6E56" }} />
                  </div>
                  <div>
                    <div style={styles.techPillName}>{tech.name}</div>
                    <div style={styles.techPillRole}>{tech.role}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={styles.ctaSection}>
        <div
          style={{ ...styles.sectionTag, textAlign: "center", color: "#fff" }}
        >
          Get Started
        </div>
        <h2
          className="fade-in"
          style={{ ...styles.sectionTitle, color: "#fff" }}
        >
          Ready to take control of your semester budget?
        </h2>
        <p
          className="fade-in"
          style={{
            ...styles.sectionSub,
            margin: "0 auto 2.5rem",
            color: "rgba(255,255,255,0.85)",
          }}
        >
          Join students who never run out of money before disbursement.
        </p>
        <div className="fade-in" style={styles.ctaActions}>
          <Link to="/register" style={styles.btnPrimary}>
            Create Free Account
          </Link>
          <Link
            to="/login"
            style={{
              ...styles.btnSecondary,
              border: "0.5px solid rgba(255,255,255,0.3)",
              color: "#fff",
            }}
          >
            Log In
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <span style={styles.footerLogo}>ClearView</span>
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
    margin: 0,
    padding: 0,
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
    maxWidth: "480px",
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
  heroVisual: { position: "relative" },
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
  envelopesContainer: { display: "flex", flexDirection: "column", gap: "10px" },
  envelopeRow: { display: "flex", alignItems: "center", gap: "12px" },
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
  envName: { fontSize: "13px", fontWeight: 500, color: "#18181A" },
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
  stat: { textAlign: "center" },
  statNumber: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "2rem",
    fontWeight: 700,
    color: "#18181A",
    lineHeight: 1.1,
  },
  statLabel: { fontSize: "13px", color: "#8A8A94", marginTop: "3px" },
  sectionBase: { padding: "5.5rem 2rem" },
  sectionSurface: { padding: "5.5rem 2rem", background: "#FFFFFF" },
  sectionInner: { maxWidth: "1120px", margin: "0 auto" },
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
  featureCardText: { fontSize: "13.5px", color: "#4A4A50", lineHeight: 1.65 },
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
  techPillName: { fontSize: "13px", fontWeight: 500, color: "#18181A" },
  techPillRole: { fontSize: "11px", color: "#8A8A94", marginTop: "1px" },
  ctaSection: {
    textAlign: "center",
    padding: "7rem 2rem",
    background: "#0F6E56",
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
