"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal, ChevronRight, CornerDownLeft, Sparkles } from "lucide-react";

interface ConsoleHistory {
  command: string;
  output: string | string[];
}

export default function InteractiveConsole() {
  const [commandInput, setCommandInput] = useState("");
  const [history, setHistory] = useState<ConsoleHistory[]>([
    {
      command: "systems --help",
      output: [
        "Welcome to the Interactive DevOps Console.",
        "Available Executables:",
        "  help           Display this instructions index",
        "  about          Summary details about Harshvardhan",
        "  projects       Show listed production deployments",
        "  skills         Display core package matrix status",
        "  contact        Output secure communication access ports",
        "  clear          Empty the dashboard screen log",
      ],
    },
  ]);

  const outputEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = commandInput.trim().toLowerCase();
    if (!cmd) return;

    let output: string | string[] = [];

    switch (cmd) {
      case "help":
        output = [
          "Interactive DevOps Shell Commands:",
          "  help      - This catalog",
          "  about     - Author specifications profile",
          "  projects  - Deployed systems metrics logs",
          "  skills    - Dependencies tree mapping parameters",
          "  contact   - Secure contact protocols details",
          "  clear     - Overwrite history logs",
        ];
        break;
      case "about":
        output = [
          "Host: harsh@engineering.org",
          "Role: Cloud & DevOps Engineer | Infrastructure Architect",
          "Focus Areas: Containerization & Orchestration, GitOps Pipelines, IaC compliance.",
          "Specialty: AWS Cloud infrastructure networks, microservices optimization, telemetry setups.",
        ];
        break;
      case "projects":
        output = [
          "DEPLOYED INSTANCES:",
          "  [1] AUTO-GITOPS-K8S-CLUSTER (ArgoCD + EKS) -> Latency cut: 60%",
          "  [2] TERRAFORM-MULTI-CLOUD-ENGINE (AWS + GCP) -> Speedup: 10x",
          "  [3] PROMETHEUS-OBSERVE-STACK (Grafana + Alertmanager) -> Alert rate: Stable",
          "  [4] COST-ALERTER-LAMBDA-CLEANUP (Serverless Lambda) -> Savings: 32%",
        ];
        break;
      case "skills":
        output = [
          "INSTALLED DEPENDENCIES TREE:",
          "  ├─ IaC: Terraform (90%), Ansible (75%)",
          "  ├─ Orchestration: Kubernetes CKA (90%), Docker Engine (95%)",
          "  ├─ CI/CD: GitHub Actions (88%), ArgoCD (80%)",
          "  ├─ Cloud: AWS Solutions Architect (90%), GCP (75%)",
          "  └─ Observability: Prometheus (85%), Grafana (90%)",
        ];
        break;
      case "contact":
        output = [
          "SECURE PROTOCOLS TERMINALS:",
          "  Port: HTTPS/TLS_1.3_TLS",
          "  Email: harshvardhanns351@gmail.com",
          "  LinkedIn: linkedin.com/in/harshvardhan-ns",
          "  GitHub: github.com/Harshvardhanns351",
        ];
        break;
      case "clear":
        setHistory([]);
        setCommandInput("");
        return;
      default:
        output = `Command not recognized: '${cmd}'. Execute 'help' to check standard catalog definitions.`;
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
    setCommandInput("");

    // Award achievement badge in localStorage if user tries all commands
    try {
      const enteredCmds = JSON.parse(localStorage.getItem("hns_commands") || "[]");
      if (!enteredCmds.includes(cmd)) {
        const nextCmds = [...enteredCmds, cmd];
        localStorage.setItem("hns_commands", JSON.stringify(nextCmds));
        if (nextCmds.length >= 4) {
          localStorage.setItem("badge_terminal_master", "UNLOCKED");
          window.dispatchEvent(new Event("storage"));
        }
      }
    } catch (err) {}
  };

  return (
    <section className="py-20 border-t border-[var(--accent-gray)] bg-[var(--bg-primary)] grid-bg relative">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-1.5 rounded bg-red-950/40 border border-red-900/30 px-3 py-1 text-xs font-mono text-[var(--lobster-red)] font-bold uppercase tracking-widest mb-3">
            <Sparkles className="h-3.5 w-3.5" /> GAMIFIED SHELL INTERACTION
          </div>
          <h2 className="text-2xl font-black font-mono uppercase tracking-wider text-[var(--text-primary)]">
            ~/guest-interactive-console
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-2 font-mono">
            Directly parse commands on the container console configuration interface.
          </p>
        </div>

        {/* Dashboard Frame */}
        <div className="w-full glass-card border border-[var(--accent-gray)] rounded-xl overflow-hidden shadow-2xl">
          
          {/* Top Panel bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#080809] border-b border-[var(--accent-gray)]">
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-[var(--lobster-red)] font-semibold">
              <Terminal className="h-4 w-4" />
              <span>guest_terminal_session :: /bin/sh</span>
            </div>
            <span className="text-[10px] font-mono text-stone-550 text-stone-500 font-bold uppercase">
              STATUS: READY
            </span>
          </div>

          {/* Output log area */}
          <div className="p-4 sm:p-5 h-[300px] overflow-y-auto font-mono text-xs sm:text-[13px] bg-black/60 scrollbar-none leading-relaxed text-left">
            {history.map((hist, idx) => (
              <div key={idx} className="mb-4">
                <div className="flex items-center text-[var(--lobster-red)] font-semibold mb-1">
                  <ChevronRight className="h-3.5 w-3.5 mr-0.5" />
                  <span>{hist.command}</span>
                </div>
                <div className="text-[var(--text-secondary)] pl-4">
                  {Array.isArray(hist.output) ? (
                    hist.output.map((line, lIdx) => (
                      <div key={lIdx} className="whitespace-pre-wrap">{line}</div>
                    ))
                  ) : (
                    <div>{hist.output}</div>
                  )}
                </div>
              </div>
            ))}
            <div ref={outputEndRef} />
          </div>

          {/* CLI input form */}
          <form 
            onSubmit={handleCommandSubmit}
            className="flex items-center border-t border-[var(--accent-gray)] bg-[#080809] px-4 py-3"
          >
            <ChevronRight className="h-4.5 w-4.5 text-[var(--lobster-red)] shrink-0 mr-1 animate-pulse" />
            <input 
              type="text"
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
              placeholder="Type command (e.g. 'help', 'about', 'projects', 'contact') and hit Enter..."
              className="flex-1 bg-transparent border-0 outline-none text-xs sm:text-[13px] text-[var(--text-primary)] font-mono placeholder:text-stone-700"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
            <button 
              type="submit"
              className="text-stone-500 hover:text-[var(--lobster-red)] transition-colors p-1"
            >
              <CornerDownLeft className="h-4 w-4" />
            </button>
          </form>

        </div>

      </div>
    </section>
  );
}
