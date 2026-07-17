"use client";

import React from "react";
import Navbar          from "@/components/Navbar";
import TerminalHero    from "@/components/TerminalHero";
import SystemSpecs     from "@/components/SystemSpecs";
import ProjectList     from "@/components/ProjectList";
import SkillsMatrix    from "@/components/SkillsMatrix";
import ExperienceLogs  from "@/components/ExperienceLogs";
import LatestUpdates   from "@/components/LatestUpdates";
import InteractiveConsole from "@/components/InteractiveConsole";
import SystemsQuiz     from "@/components/SystemsQuiz";
import Achievements    from "@/components/Achievements";
import SecureContact   from "@/components/SecureContact";
import { Terminal } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[var(--lobster-red)]/20 selection:text-[var(--lobster-red)]">

      <Navbar />

      <main>
        <TerminalHero />
        <SystemSpecs />
        <ProjectList />
        <SkillsMatrix />
        <ExperienceLogs />
        <LatestUpdates />
        <InteractiveConsole />
        <SystemsQuiz />
        <Achievements />
        <SecureContact />
      </main>

      <footer className="border-t border-[var(--accent-gray)] bg-[var(--bg-secondary)] py-10">
        <div className="content-wrap flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[var(--lobster-red)]/10 border border-[var(--lobster-red)]/20 flex items-center justify-center">
              <Terminal className="h-3.5 w-3.5 text-[var(--lobster-red)]" />
            </div>
            <span className="font-mono text-sm font-bold tracking-widest text-[var(--text-primary)]">HVS</span>
          </div>

          <p className="text-xs text-[var(--text-muted)] font-mono text-center">
            © {new Date().getFullYear()} Harshvardhan NS — Cloud & DevOps Engineer
          </p>

          <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              All systems operational
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
