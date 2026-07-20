"use client";

import React from "react";
import Navbar         from "@/components/Navbar";
import TerminalHero   from "@/components/TerminalHero";
import SystemSpecs    from "@/components/SystemSpecs";
import ProjectList    from "@/components/ProjectList";
import SkillsMatrix   from "@/components/SkillsMatrix";
import ExperienceLogs from "@/components/ExperienceLogs";
import SecureContact  from "@/components/SecureContact";
import { Terminal }   from "lucide-react";

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
        <SecureContact />
      </main>

      <footer className="border-t border-[var(--accent-gray)] py-10">
        <div className="content-wrap flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[var(--lobster-red)]/10 border border-[var(--lobster-red)]/20 flex items-center justify-center">
              <Terminal className="h-3.5 w-3.5 text-[var(--lobster-red)]" />
            </div>
            <span className="font-mono text-sm font-black tracking-widest text-[var(--text-primary)]">HVS</span>
          </div>

          <p className="text-sm text-[var(--text-muted)] text-center">
            © {new Date().getFullYear()} Harshvardhan NS · Cloud & DevOps Engineer
          </p>

          <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            All systems operational
          </div>
        </div>
      </footer>

    </div>
  );
}
