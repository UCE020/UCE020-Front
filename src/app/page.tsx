"use client";

import { useState } from "react";
import {
  Search,
  Menu,
  X,
  Home,
  FileText,
  ClipboardList,
  PlusCircle,
  CalendarDays,
  Activity,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface Event {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  time: string;
  imageUrl: string;
}

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------
const mockEvents: Event[] = [
  {
    id: "1",
    name: "NOME DO EVENTO",
    startDate: "13/01/2026",
    endDate: "17/01/2026",
    time: "Das 2h até 15h",
    imageUrl: "https://placehold.co/60x60/4ecdc4/1a2744?text=E1",
  },
  {
    id: "2",
    name: "NOME DO EVENTO",
    startDate: "13/01/2026",
    endDate: "17/01/2026",
    time: "Das 8h até 15h",
    imageUrl: "https://placehold.co/60x60/1a2744/4ecdc4?text=E2",
  },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------
function EventCard({ event }: { event: Event }) {
  return (
    <div className="event-card">
      <img src={event.imageUrl} alt={event.name} className="event-img" />
      <div className="event-info">
        <p className="event-name">{event.name}</p>
        <p className="event-detail">
          <span className="label">Data:</span> {event.startDate} a {event.endDate}
        </p>
        <p className="event-detail">
          <span className="label">Horário:</span> {event.time}
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function HomePage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [search, setSearch] = useState("");

  const userName = "João";

  const navItems = [
    { icon: <Home size={18} />, label: "Início" },
    { icon: <FileText size={18} />, label: "Certificados" },
    { icon: <ClipboardList size={18} />, label: "Inscrições" },
    { icon: <PlusCircle size={18} />, label: "Criar evento" },
    { icon: <CalendarDays size={18} />, label: "Eventos Criados" },
    { icon: <Activity size={18} />, label: "Monitoria" },
  ];

  const quickActions: { label: string; color: "primary" | "secondary" }[] = [
    { label: "criar novo evento",   color: "primary"   },
    { label: "meus certificados",   color: "secondary"   },
    { label: "eventos criados",     color: "primary"  },
    { label: "monitoria de eventos",color: "secondary" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --navy:      #1a2744;
          --teal:      #3dd6c8;
          --teal-dark: #2ab8ab;
          --bg:        #ffffff;
          --card-bg:   #f4f6f9;
          --surface:   #f0f2f5;
          --text:      #0f172a;
          --muted:     #64748b;
          --radius:    14px;
          --gutter:    16px;
          --content:   1200px;
        }

        body { font-family: 'Nunito', sans-serif; background: var(--bg); color: var(--text); }

        /* ---- Shell ---- */
        .shell {
          width: 100%;
          min-height: 100dvh;
          background: var(--bg);
        }

        /* ---- Inner content wrapper (centers on wide screens) ---- */
        .inner {
          width: 100%;
          max-width: var(--content);
          margin: 0 auto;
          padding: 0 var(--gutter);
        }

        /* ---- Header ---- */
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px var(--gutter) 10px;
          max-width: var(--content);
          margin: 0 auto;
        }
        .menu-btn {
          background: none;
          border: none;
          color: var(--text);
          cursor: pointer;
          display: flex;
          align-items: center;
        }
        .avatar {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: var(--teal);
          display: flex; align-items: center; justify-content: center;
          color: var(--navy);
        }

        /* ---- Search ---- */
        .search-wrap {
          margin: 8px auto 0;
          max-width: var(--content);
          padding: 0 var(--gutter);
          position: relative;
        }
        .search-wrap svg {
          position: absolute;
          left: calc(var(--gutter) + 14px); top: 50%;
          transform: translateY(-50%);
          color: var(--muted);
          pointer-events: none;
        }
        .search-input {
          width: 100%;
          padding: 11px 14px 11px 40px;
          border-radius: 50px;
          border: none;
          background: var(--surface);
          color: var(--text);
          font-family: inherit;
          font-size: 14px;
          outline: none;
          transition: box-shadow .2s;
        }
        .search-input::placeholder { color: var(--muted); }
        .search-input:focus { box-shadow: 0 0 0 2px var(--teal); }

        /* ---- Greeting ---- */
        .greeting {
          padding: 24px 0 8px;
          font-size: 22px;
          font-weight: 700;
          line-height: 1.4;
        }
        .greeting span { color: var(--teal); }

        /* ---- Quick Actions Grid ---- */
        /* Mobile: 2 cols | md+: 4 cols */
        .actions-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          padding: 12px 0;
        }

        /* ---- Events Section ---- */
        .section-title {
          padding: 20px 0 10px;
          font-size: 13px;
          color: var(--muted);
          font-weight: 600;
          letter-spacing: .5px;
          text-transform: uppercase;
        }

        /* Mobile: 1 col | md+: 2 cols | lg+: 3 cols */
        .events-list {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          padding-bottom: 40px;
        }

        .event-card {
          background: var(--card-bg);
          border-radius: var(--radius);
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px;
          transition: transform .15s, box-shadow .15s;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
          cursor: pointer;
        }
        .event-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.10);
        }
        .event-img {
          width: 60px; height: 60px;
          border-radius: 10px;
          object-fit: cover;
          flex-shrink: 0;
        }
        .event-info { flex: 1; min-width: 0; }
        .event-name {
          font-size: 13px;
          font-weight: 800;
          margin-bottom: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .event-detail {
          font-size: 11px;
          color: var(--muted);
          line-height: 1.6;
        }
        .label { color: var(--text); font-weight: 600; }

        /* ---- Drawer Overlay ---- */
        .overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,.55);
          z-index: 40;
          opacity: 0;
          pointer-events: none;
          transition: opacity .25s;
        }
        .overlay.open { opacity: 1; pointer-events: all; }

        /* ---- Drawer ---- */
        .drawer {
          position: fixed;
          top: 0; left: 0;
          width: 280px;
          height: 100dvh;
          background: var(--navy);
          z-index: 50;
          transform: translateX(-100%);
          transition: transform .28s cubic-bezier(.4,0,.2,1);
          display: flex;
          flex-direction: column;
          padding: 0 0 32px;
        }
        .drawer.open { transform: translateX(0); }

        .drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 20px 16px;
          border-bottom: 1px solid rgba(255,255,255,.07);
        }
        .drawer-logo {
          font-size: 17px;
          font-weight: 800;
          color: var(--teal);
          letter-spacing: -.5px;
        }
        .close-btn {
          background: none; border: none;
          color: rgba(255,255,255,0.5); cursor: pointer;
          display: flex; align-items: center;
        }

        .nav-list {
          list-style: none;
          padding: 12px 0;
          flex: 1;
        }
        .nav-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 22px;
          font-size: 14px;
          font-weight: 600;
          color: #f0f4ff;
          cursor: pointer;
          border-radius: 0 50px 50px 0;
          margin-right: 16px;
          transition: background .15s, color .15s;
        }
        .nav-item:hover { background: rgba(61,214,200,.12); color: var(--teal); }
        .nav-item.active { background: rgba(61,214,200,.18); color: var(--teal); }
        .nav-item svg { flex-shrink: 0; }

        /* ================================================================
           RESPONSIVE BREAKPOINTS
           ================================================================ */

        /* tablet: md ≥ 768px */
        @media (min-width: 768px) {
          :root { --gutter: 32px; }

          .greeting { font-size: 28px; }

          /* 4 colunas para as ações rápidas */
          .actions-grid {
            grid-template-columns: repeat(4, 1fr);
          }

          /* 2 colunas para os eventos */
          .events-list {
            grid-template-columns: repeat(2, 1fr);
          }

          .search-input { font-size: 15px; }
        }

        /* desktop: lg ≥ 1024px */
        @media (min-width: 1024px) {
          :root { --gutter: 48px; }

          .greeting { font-size: 32px; }

          /* 3 colunas para os eventos */
          .events-list {
            grid-template-columns: repeat(3, 1fr);
          }

          .event-name { font-size: 14px; }
          .event-detail { font-size: 12px; }
        }

        /* wide: xl ≥ 1280px */
        @media (min-width: 1280px) {
          :root { --gutter: 64px; }
        }
      `}</style>

      <div className="shell">
        {/* Drawer Overlay */}
        <div
          className={`overlay${drawerOpen ? " open" : ""}`}
          onClick={() => setDrawerOpen(false)}
        />

        {/* Side Drawer */}
        <nav className={`drawer${drawerOpen ? " open" : ""}`}>
          <div className="drawer-header">
            <span className="drawer-logo">Kauan</span>
            <button className="close-btn" onClick={() => setDrawerOpen(false)}>
              <X size={20} />
            </button>
          </div>
          <ul className="nav-list">
            {navItems.map((item, i) => (
              <li
                key={item.label}
                className={`nav-item${i === 0 ? " active" : ""}`}
                onClick={() => setDrawerOpen(false)}
              >
                {item.icon}
                {item.label}
              </li>
            ))}
          </ul>
        </nav>

        {/* Header */}
        <header className="header">
          <button className="menu-btn" onClick={() => setDrawerOpen(true)}>
            <Menu size={24} />
          </button>
          <div className="avatar">
            <User size={18} />
          </div>
        </header>

        <div className="inner">
          {/* Search */}
          <div className="search-wrap">
            <Search size={16} />
            <input
              className="search-input"
              type="text"
              placeholder="procurar evento"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Greeting */}
          <h1 className="greeting" style={{ padding: "24px 0 8px" }}>
            Olá, {userName}! O que{" "}
            temos para <span>hoje?</span>
          </h1>

          {/* Quick Action Buttons */}
          <div className="actions-grid">
            {quickActions.map((action) => (
              <Button
                key={action.label}
                color={action.color}
                variant="contained"
              >
                {action.label}
              </Button>
            ))}
          </div>

          {/* Enrolled Events */}
          <p className="section-title">Eventos inscritos</p>
          <div className="events-list">
            {mockEvents
              .filter((e) =>
                search === "" ||
                e.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
          </div>
        </div>
      </div>
      </>
  );
}
