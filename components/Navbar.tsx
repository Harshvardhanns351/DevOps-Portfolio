"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Menu, X } from "lucide-react";

const navLinks = [
  { label: "About",      href: "#about" },
  { label: "Projects",   href: "#projects" },
  { label: "Skills",     href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact" },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [uptime,    setUptime]    = useState("00:00:00");
  const [active,    setActive]    = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* highlight active section */
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      const d = Date.now() - start;
      const h = String(Math.floor(d / 3_600_000)).padStart(2, "0");
      const m = String(Math.floor((d % 3_600_000) / 60_000)).padStart(2, "0");
      const s = String(Math.floor((d % 60_000) / 1_000)).padStart(2, "0");
      setUptime(`${h}:${m}:${s}`);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-[rgba(2,2,4,0.94)] backdrop-blur-xl border-b border-[var(--accent-gray)] shadow-[0_1px_0_rgba(255,46,46,0.06)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        {/* Full-width inner — matches all section containers */}
        <div className="w-full max-w-[1400px] mx-auto flex h-16 items-center justify-between px-6 xl:px-10">

          {/* ── Brand ── */}
          <a href="#" className="flex items-center gap-2.5 group shrink-0">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--lobster-red)]/10 border border-[var(--lobster-red)]/20 group-hover:bg-[var(--lobster-red)]/20 transition-colors">
              <Terminal className="h-4 w-4 text-[var(--lobster-red)]" />
            </div>
            <span className="font-mono text-sm font-black tracking-[0.18em] text-[var(--text-primary)] uppercase">HVS</span>
            <span className="hidden sm:flex items-center gap-1 text-[10px] font-mono font-semibold text-[var(--text-muted)] border border-[var(--accent-gray)] rounded px-1.5 py-0.5 ml-1">
              <span className="status-dot online" />
              LIVE
            </span>
          </a>

          {/* ── Center nav ── */}
          <nav className="hidden md:flex items-center gap-1 mx-8">
            {navLinks.map((l) => {
              const isActive = active === l.href.slice(1);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  className={`relative px-4 py-2 text-[13px] font-bold tracking-wide transition-all duration-200 rounded-lg
                    ${isActive
                      ? "text-[var(--text-primary)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/[0.04]"
                    }`}
                >
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-[var(--lobster-red)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* ── Right ── */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="hidden xl:flex items-center gap-1.5 font-mono text-[11px] text-[var(--text-muted)] border border-[var(--accent-gray)] rounded-md px-2.5 py-1">
              UP&nbsp;<span className="text-[var(--text-secondary)] font-semibold tabular-nums">{uptime}</span>
            </span>

            <a href="#contact" className="hidden sm:inline-flex btn-primary text-[11px] px-4 py-2 rounded-lg">
              Contact
            </a>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg border border-[var(--accent-gray)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--lobster-red)]/30 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>

        </div>
      </header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden fixed top-16 inset-x-0 z-40 bg-[rgba(2,2,4,0.98)] backdrop-blur-xl border-b border-[var(--accent-gray)] px-6 py-4 flex flex-col gap-1"
          >
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="py-3 text-sm font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] border-b border-[var(--accent-gray)] last:border-0 transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-3 btn-primary text-center text-[11px] py-2.5"
            >
              Contact
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
