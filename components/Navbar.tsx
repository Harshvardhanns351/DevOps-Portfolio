"use client";

import React, { useState, useEffect } from "react";
import { Terminal, Shield, Cpu, RefreshCw } from "lucide-react";

export default function Navbar() {
  const [latency, setLatency] = useState("14ms");
  const [uptime, setUptime] = useState("00:00:00");
  const [systemLoad, setSystemLoad] = useState("12%");

  useEffect(() => {
    // Simulate real-time metrics changing slightly
    const interval = setInterval(() => {
      setLatency(`${Math.floor(Math.random() * 8) + 8}ms`);
      setSystemLoad(`${Math.floor(Math.random() * 6) + 10}%`);
    }, 3000);

    // Track uptime session
    const startTime = Date.now();
    const uptimeInterval = setInterval(() => {
      const diff = Date.now() - startTime;
      const hours = String(Math.floor(diff / 3600000)).padStart(2, "0");
      const minutes = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
      const seconds = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
      setUptime(`${hours}:${minutes}:${seconds}`);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(uptimeInterval);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--accent-gray)] bg-[rgba(2,2,2,0.95)] backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left Side: Brand Logo */}
        <div className="flex items-center gap-2">
          <Terminal className="h-5 w-5 text-[var(--lobster-red)]" />
          <span className="font-mono text-xs font-bold tracking-wider uppercase">
            HNS <span className="text-[var(--lobster-red)]">::</span> DEVOPS
          </span>
          <span className="flex items-center gap-1.5 rounded bg-red-950/40 border border-red-900/30 px-1.5 py-0.5 text-[10px] font-mono text-[var(--lobster-red)] font-semibold uppercase tracking-wide">
            <span className="status-dot online"></span>
            SYS_ONLINE
          </span>
        </div>

        {/* Center: Live Terminal Feed Headers */}
        <div className="hidden md:flex items-center gap-6 font-mono text-[11px] text-[var(--text-secondary)]">
          <div className="flex items-center gap-1">
            <Cpu className="h-3 w-3 text-red-900" />
            <span>SYS_LOAD:</span>
            <span className="text-[var(--text-primary)] font-bold">{systemLoad}</span>
          </div>
          <div className="flex items-center gap-1">
            <Shield className="h-3 w-3 text-red-900" />
            <span>SECURE_CH:</span>
            <span className="text-emerald-500 font-bold">TLS_1.3</span>
          </div>
          <div className="flex items-center gap-1">
            <RefreshCw className="h-3 w-3 text-red-900 animate-spin" />
            <span>RTT:</span>
            <span className="text-[var(--text-primary)] font-bold">{latency}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>UPTIME:</span>
            <span className="text-[var(--lobster-red)] font-bold">{uptime}</span>
          </div>
        </div>

        {/* Right Side: Quick Navigation */}
        <nav className="flex items-center gap-4 text-xs font-mono">
          <a
            href="#about"
            className="text-[var(--text-secondary)] hover:text-[var(--lobster-red)] transition-colors py-1 cursor-pointer"
          >
            ~/about
          </a>
          <a
            href="#architecture"
            className="text-[var(--text-secondary)] hover:text-[var(--lobster-red)] transition-colors py-1 cursor-pointer"
          >
            ~/infra
          </a>
          <a
            href="#projects"
            className="text-[var(--text-secondary)] hover:text-[var(--lobster-red)] transition-colors py-1 cursor-pointer"
          >
            ~/deployments
          </a>
          <a
            href="#contact"
            className="relative px-3 py-1 font-bold text-[var(--lobster-red)] border border-red-950 bg-red-950/20 hover:bg-[var(--lobster-red)] hover:text-[var(--bg-primary)] transition-all duration-200 uppercase text-[10px] tracking-wider rounded"
          >
            ~/connect
          </a>
        </nav>

      </div>
    </header>
  );
}
