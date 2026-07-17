"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, ChevronRight, CornerDownLeft, Sparkles } from "lucide-react";

interface Entry { command: string; output: string[] }

const COMMANDS: Record<string, string[]> = {
  help: [
    "Available commands:",
    "  about     —  Profile summary",
    "  projects  —  Production deployments",
    "  skills    —  Technical stack overview",
    "  contact   —  Contact information",
    "  clear     —  Clear the console",
  ],
  about: [
    "Harshvardhan NS  ·  Cloud & DevOps Engineer",
    "Focus: Containerization, GitOps, IaC, multi-cloud infrastructure.",
    "Specialty: AWS networking, microservices optimization, telemetry.",
  ],
  projects: [
    "Production deployments:",
    "  [1] Auto GitOps K8s Cluster       —  Latency ↓ 60%",
    "  [2] Terraform Multi-Cloud Engine  —  24 hrs provisioning saved",
    "  [3] Prometheus Observability Stack —  Alert time ↓ 45%",
    "  [4] Cost Alerter Lambda Cleanup    —  AWS costs ↓ 32%",
  ],
  skills: [
    "Core competencies:",
    "  IaC          : Terraform 90%  · Ansible 75%",
    "  Orchestration: Kubernetes 90% · Docker 95%",
    "  CI/CD        : GitHub Actions 88% · ArgoCD 80%",
    "  Cloud        : AWS 90% · GCP 75%",
    "  Observability: Grafana 90% · Prometheus 85%",
  ],
  contact: [
    "Contact details:",
    "  Email   : harshvardhanns351@gmail.com",
    "  LinkedIn: linkedin.com/in/harshvardhan-ns",
    "  GitHub  : github.com/Harshvardhanns351",
  ],
};

export default function InteractiveConsole() {
  const [history, setHistory] = useState<Entry[]>([
    { command: "help", output: COMMANDS.help },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    const output = COMMANDS[cmd]
      ?? [`Command not recognized: '${cmd}'  —  type 'help' for available commands.`];

    setHistory((p) => [...p, { command: cmd, output }]);
    setInput("");

    // Badge unlock
    try {
      const prev: string[] = JSON.parse(localStorage.getItem("hvs_cmds") || "[]");
      if (!prev.includes(cmd)) {
        const next = [...prev, cmd];
        localStorage.setItem("hvs_cmds", JSON.stringify(next));
        if (next.length >= 4) {
          localStorage.setItem("badge_terminal_master", "UNLOCKED");
          window.dispatchEvent(new Event("storage"));
        }
      }
    } catch {}
  };

  return (
    <section className="py-24 border-t border-[var(--accent-gray)] line-grid">
      <div className="content-wrap">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent-gray)] bg-white/[0.02] px-3.5 py-1.5 mb-4">
            <Sparkles className="h-3.5 w-3.5 text-[var(--lobster-red)]" />
            <span className="font-mono text-[11px] font-semibold tracking-widest text-[var(--text-secondary)] uppercase">
              Interactive shell
            </span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">Guest Console</h2>
          <p className="text-sm text-[var(--text-secondary)] mt-3 max-w-sm mx-auto">
            Type commands to explore this portfolio — try <code className="font-mono text-[var(--lobster-red)]">help</code> to get started.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card overflow-hidden shadow-2xl shadow-black/50"
        >
          {/* Window chrome */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#060608] border-b border-[var(--accent-gray)]">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#FF5F57] opacity-80" />
              <span className="w-3 h-3 rounded-full bg-[#FEBC2E] opacity-40" />
              <span className="w-3 h-3 rounded-full bg-[#28C840] opacity-40" />
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--text-muted)]">
              <Terminal className="h-3.5 w-3.5 text-[var(--lobster-red)]" />
              guest@hvs — /bin/sh
            </div>
            <span className="font-mono text-[10px] text-emerald-400 font-semibold">READY</span>
          </div>

          {/* Output area */}
          <div className="p-5 h-72 overflow-y-auto bg-black/70 space-y-4 text-sm font-mono scrollbar-none">
            {history.map((h, i) => (
              <div key={i}>
                <div className="flex items-center gap-1 text-[var(--lobster-red)] font-semibold">
                  <ChevronRight className="h-3.5 w-3.5" />
                  {h.command}
                </div>
                <div className="pl-5 mt-1 space-y-0.5 text-[var(--text-secondary)]">
                  {h.output.map((line, j) => <div key={j}>{line}</div>)}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Input bar */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center border-t border-[var(--accent-gray)] bg-[#060608] px-4 py-3 gap-2"
          >
            <ChevronRight className="h-4 w-4 text-[var(--lobster-red)] animate-pulse shrink-0" />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a command and press Enter…"
              className="flex-1 bg-transparent outline-none text-sm font-mono text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />
            <button type="submit" className="text-[var(--text-muted)] hover:text-[var(--lobster-red)] transition-colors p-1">
              <CornerDownLeft className="h-4 w-4" />
            </button>
          </form>
        </motion.div>

      </div>
    </section>
  );
}
