"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import TerminalHero from "@/components/TerminalHero";
import SystemSpecs from "@/components/SystemSpecs";
import DevOpsDashboard from "@/components/DevOpsDashboard";
import ProjectList from "@/components/ProjectList";
import SkillsMatrix from "@/components/SkillsMatrix";
import ExperienceLogs from "@/components/ExperienceLogs";
import LatestUpdates from "@/components/LatestUpdates";
import SystemsQuiz from "@/components/SystemsQuiz";
import Achievements from "@/components/Achievements";
import SecureContact from "@/components/SecureContact";
import { Terminal, Shield, RefreshCw } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] relative selection:bg-red-950 selection:text-[var(--lobster-red)]">
      
      {/* Decorative cyber grid overlay */}
      <div className="absolute inset-0 bg-repeat bg-[size:50px_50px] opacity-10 pointer-events-none -z-20 grid-bg" />

      {/* Global Status Navigation Header bar */}
      <Navbar />

      {/* Main Layout sections */}
      <main className="relative">
        
        {/* Terminal Boot Screen & Pitch */}
        <TerminalHero />

        {/* Technical specs - About me */}
        <SystemSpecs />

        {/* Interactive Architecture SVG Console */}
        <DevOpsDashboard />

        {/* Project Lists deployment logs */}
        <ProjectList />

        {/* Packages installed catalog */}
        <SkillsMatrix />

        {/* CI/CD Job execution logs - Experience */}
        <ExperienceLogs />

        {/* Latest Blog Insights & operational triggers status */}
        <LatestUpdates />

        {/* Skills assessment interactive challenge quiz */}
        <SystemsQuiz />

        {/* Badges achievements tracker visual console dashboard */}
        <Achievements />

        {/* Form contact key handshake */}
        <SecureContact />

      </main>

      {/* Terminal Footer block */}
      <footer className="border-t border-[var(--accent-gray)] bg-[#040405] py-8 text-center text-xs font-mono text-stone-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 justify-center">
            <Terminal className="h-4 w-4 text-[var(--lobster-red)]" />
            <span>sys_shutdown --graceful :: © {new Date().getFullYear()} HARSHVARDHAN NS</span>
          </div>
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> NODES_HEALED</span>
            <span className="text-[var(--text-muted)]">|</span>
            <span>SECURE_CH: TLS_1.3_TLS</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
