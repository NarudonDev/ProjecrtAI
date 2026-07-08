import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Activity,
  Bell,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  Globe2,
  Home,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users
} from "lucide-react";
import "./styles.css";
import aiLoginOne from "./assets/ai-login-1.png";
import aiLoginTwo from "./assets/ai-login-2.png";
import aiLoginThree from "./assets/ai-login-3.png";

const mockCredentials = {
  username: "admin@cursorflow.test",
  password: "Admin@1234"
};

const loginSlides = [
  {
    image: aiLoginOne,
    label: "AI Assistant",
    title: "AI ช่วยวิเคราะห์การเข้าใช้งานแบบเรียลไทม์",
    detail: "ตรวจภาพรวม traffic, session และพฤติกรรม login จากหน้าเดียว"
  },
  {
    image: aiLoginTwo,
    label: "Neural Analytics",
    title: "มองเห็นข้อมูลเชิงลึกก่อนตัดสินใจ",
    detail: "สรุปสัญญาณสำคัญจากข้อมูลจำนวนมากให้เข้าใจง่าย"
  },
  {
    image: aiLoginThree,
    label: "Secure Access",
    title: "เข้าสู่ระบบอย่างมั่นใจด้วยแนวคิด AI Security",
    detail: "ออกแบบประสบการณ์ login ให้ทันสมัย ปลอดภัย และพร้อมขยายต่อ"
  }
];

const stats = [
  { label: "ผู้เข้าชมวันนี้", value: "24,891", change: "+18.4%", icon: Users },
  { label: "เข้าสู่ระบบสำเร็จ", value: "8,436", change: "+12.2%", icon: LogIn },
  { label: "Session ใช้งาน", value: "1,284", change: "+6.8%", icon: Activity },
  { label: "อัตราความปลอดภัย", value: "99.7%", change: "+2.1%", icon: ShieldCheck }
];

const bars = [52, 78, 64, 88, 70, 96, 84, 112, 92, 124, 108, 136];

const loginRows = [
  { name: "Admin Dashboard", time: "2 นาทีที่แล้ว", status: "สำเร็จ", region: "Bangkok" },
  { name: "Marketing Team", time: "11 นาทีที่แล้ว", status: "สำเร็จ", region: "Singapore" },
  { name: "Finance Portal", time: "24 นาทีที่แล้ว", status: "ตรวจสอบ", region: "Tokyo" },
  { name: "API Console", time: "39 นาทีที่แล้ว", status: "สำเร็จ", region: "Bangkok" }
];

function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState(mockCredentials.username);
  const [password, setPassword] = useState(mockCredentials.password);
  const [error, setError] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % loginSlides.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    if (
      username.trim() === mockCredentials.username &&
      password === mockCredentials.password
    ) {
      setError("");
      onLogin();
      return;
    }

    setError("Username หรือ Password ไม่ถูกต้อง");
  }

  function showPreviousSlide() {
    setActiveSlide((current) =>
      current === 0 ? loginSlides.length - 1 : current - 1
    );
  }

  function showNextSlide() {
    setActiveSlide((current) => (current + 1) % loginSlides.length);
  }

  const slide = loginSlides[activeSlide];

  return (
    <main className="login-screen">
      <section className="login-visual">
        <img className="ai-slide-image" src={slide.image} alt={slide.title} />
        <div className="ai-slide-shade"></div>

        <div className="login-visual-top">
          <div className="brand login-brand">
            <div className="brand-mark">C</div>
            <div>
              <strong>CursorFlow</strong>
              <span>AI Analytics</span>
            </div>
          </div>

          <div className="ai-badge">
            <Sparkles aria-hidden="true" />
            AI Login
          </div>
        </div>

        <div className="ai-slide-copy">
          <p className="eyebrow">{slide.label}</p>
          <h1>{slide.title}</h1>
          <p>{slide.detail}</p>
        </div>

        <div className="ai-slide-controls" aria-label="AI image slider controls">
          <button type="button" onClick={showPreviousSlide} aria-label="Previous AI image">
            <ChevronLeft aria-hidden="true" />
          </button>

          <div className="ai-slide-dots">
            {loginSlides.map((item, index) => (
              <button
                className={index === activeSlide ? "active" : ""}
                type="button"
                key={item.label}
                onClick={() => setActiveSlide(index)}
                aria-label={`Show ${item.label}`}
              ></button>
            ))}
          </div>

          <button type="button" onClick={showNextSlide} aria-label="Next AI image">
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      </section>

      <section className="login-form-panel">
        <form className="auth-card" onSubmit={handleSubmit}>
          <div>
            <p className="eyebrow">Welcome back</p>
            <h2>Login to AI Dashboard</h2>
            <p>กรอก username และ password mockup เพื่อเข้าสู่ระบบ</p>
          </div>

          <label className="auth-field">
            <span>Username</span>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
            />
          </label>

          <label className="auth-field">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
            />
          </label>

          {error ? <p className="auth-error">{error}</p> : null}

          <button className="auth-submit" type="submit">
            <LogIn aria-hidden="true" />
            Login
          </button>

          <div className="auth-hint">
            <span>Username: {mockCredentials.username}</span>
            <span>Password: {mockCredentials.password}</span>
          </div>
        </form>
      </section>
    </main>
  );
}

function Dashboard({ onLogout }) {
  return (
    <main className="dashboard-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">C</div>
          <div>
            <strong>CursorFlow</strong>
            <span>Analytics</span>
          </div>
        </div>

        <nav className="side-nav" aria-label="Sidebar">
          <a className="active" href="#home">
            <Home aria-hidden="true" />
            <span>หน้าแรก</span>
          </a>
          <a href="#dashboard">
            <LayoutDashboard aria-hidden="true" />
            <span>Dashboard</span>
          </a>
          <a href="#traffic">
            <Globe2 aria-hidden="true" />
            <span>Traffic</span>
          </a>
          <a href="#login">
            <LogIn aria-hidden="true" />
            <span>Login</span>
          </a>
          <a href="#settings">
            <Settings aria-hidden="true" />
            <span>ตั้งค่า</span>
          </a>
        </nav>

        <button className="logout-button sidebar-logout" type="button" onClick={onLogout}>
          <LogOut aria-hidden="true" />
          <span>Logout</span>
        </button>

        <div className="sidebar-card">
          <p>สถานะระบบ</p>
          <strong>Online</strong>
          <span>API และหน้าเว็บพร้อมใช้งาน</span>
        </div>
      </aside>

      <section className="main-area">
        <header className="topbar">
          <button className="menu-button" type="button" aria-label="Open menu">
            <Menu aria-hidden="true" />
          </button>

          <div className="search-box">
            <Search aria-hidden="true" />
            <input type="search" placeholder="ค้นหาสถิติ ผู้ใช้ หรือหน้าเว็บ" />
          </div>

          <div className="topbar-actions">
            <button type="button" aria-label="Notifications">
              <Bell aria-hidden="true" />
            </button>
            <button className="profile-button" type="button">
              <span>NR</span>
              Narud
              <ChevronDown aria-hidden="true" />
            </button>
            <button className="logout-button" type="button" onClick={onLogout}>
              <LogOut aria-hidden="true" />
              Logout
            </button>
          </div>
        </header>

        <section className="hero-section">
          <div>
            <p className="eyebrow">หน้าแรกหลัก</p>
            <h1>สถิติการเข้าเว็บและการ Login</h1>
            <p>
              รวมภาพรวมผู้เข้าชม การเข้าสู่ระบบ และกิจกรรมสำคัญของเว็บไซต์ในหน้าจอเดียว
            </p>
          </div>
          <div className="date-pill">
            <CalendarDays aria-hidden="true" />
            วันนี้
          </div>
        </section>

        <section className="stats-grid" aria-label="Website statistics">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <article className="stat-card" key={item.label}>
                <div className="stat-icon">
                  <Icon aria-hidden="true" />
                </div>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <small>
                  <TrendingUp aria-hidden="true" />
                  {item.change} จากเมื่อวาน
                </small>
              </article>
            );
          })}
        </section>

        <section className="content-grid">
          <article className="chart-panel">
            <div className="panel-heading">
              <div>
                <h2>ผู้เข้าชมรายชั่วโมง</h2>
                <p>Traffic รวมจากหน้า Home และ Login</p>
              </div>
              <span>Live</span>
            </div>

            <div className="bar-chart" aria-label="Hourly traffic chart">
              {bars.map((height, index) => (
                <div className="bar-item" key={index}>
                  <span style={{ height }}></span>
                  <small>{index + 8}:00</small>
                </div>
              ))}
            </div>
          </article>

          <article className="login-summary">
            <div className="panel-heading">
              <div>
                <h2>Login ล่าสุด</h2>
                <p>รายการเข้าใช้งานล่าสุด</p>
              </div>
            </div>

            <div className="login-list">
              {loginRows.map((row) => (
                <div className="login-row" key={`${row.name}-${row.time}`}>
                  <div className="login-avatar">
                    {row.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <strong>{row.name}</strong>
                    <span>{row.region} - {row.time}</span>
                  </div>
                  <em className={row.status === "สำเร็จ" ? "success" : "review"}>
                    {row.status}
                  </em>
                </div>
              ))}
            </div>
          </article>

          <article className="credential-panel">
            <div className="panel-heading">
              <div>
                <h2>Mockup Login</h2>
                <p>บัญชีตัวอย่างสำหรับทดสอบหน้าเว็บ</p>
              </div>
            </div>

            <div className="credential-list">
              <div className="credential-row">
                <span>Username</span>
                <strong>{mockCredentials.username}</strong>
                <button type="button" aria-label="Copy username" title="Copy username">
                  <Copy aria-hidden="true" />
                </button>
              </div>
              <div className="credential-row">
                <span>Password</span>
                <strong>{mockCredentials.password}</strong>
                <button type="button" aria-label="Copy password" title="Copy password">
                  <Copy aria-hidden="true" />
                </button>
              </div>
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return <Dashboard onLogout={() => setIsLoggedIn(false)} />;
}

createRoot(document.getElementById("root")).render(<App />);
