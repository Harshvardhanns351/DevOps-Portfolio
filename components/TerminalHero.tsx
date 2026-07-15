"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Terminal, ChevronRight, ExternalLink, Cpu, ShieldAlert, Check } from "lucide-react";

import { motion } from "framer-motion";

interface CommandStep {
  command: string;
  output: string | (() => React.ReactNode);
  delay: number;
}

export default function TerminalHero() {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [typingIndex, setTypingIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const containerStats = () => (
    <div className="font-mono text-[10px] sm:text-xs text-stone-400 mt-1 leading-relaxed border border-stone-850 px-2.5 py-1.5 bg-black/40 rounded">
      <div className="text-[var(--lobster-red)] font-semibold mb-1 flex items-center gap-1.5">
        <span className="status-dot online"></span> CONTAINERS LISTING:
      </div>
      <div className="grid grid-cols-4 gap-2 border-b border-stone-800 text-stone-500 pb-1 font-bold">
        <span>CONTAINER ID</span>
        <span>IMAGE</span>
        <span>STATUS</span>
        <span>NAMES</span>
      </div>
      <div className="grid grid-cols-4 gap-2 pt-1">
        <span className="text-[var(--lobster-red)]">cf822bd840aa</span>
        <span>aws-eks-micro:v2.1</span>
        <span className="text-emerald-500 font-semibold">Up 47 hours</span>
        <span>eks-prod-api</span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <span className="text-[var(--lobster-red)]">fa1009cf29bb</span>
        <span>argocd-gitops:v1.9</span>
        <span className="text-emerald-500 font-semibold">Running</span>
        <span>argocd-sync-job</span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <span className="text-[var(--lobster-red)]">229bbf949d01</span>
        <span>prom-grafana:v3</span>
        <span className="text-emerald-500 font-semibold">Up 14 Days</span>
        <span>sys-observe</span>
      </div>
    </div>
  );

  const kubeNodeStats = () => (
    <div className="font-mono text-[10px] sm:text-xs text-stone-400 mt-1 leading-relaxed border border-stone-850 px-2.5 py-1.5 bg-black/40 rounded">
      <div className="text-[var(--lobster-red)] font-semibold mb-1">
        $ kubectl get nodes -o wide
      </div>
      <div className="grid grid-cols-5 gap-1 border-b border-stone-800 text-stone-500 pb-1 font-bold">
        <span>NAME</span>
        <span>STATUS</span>
        <span>ROLES</span>
        <span>VERSION</span>
        <span>INTERNAL-IP</span>
      </div>
      <div className="grid grid-cols-5 gap-1 pt-1">
        <span>harsh-master-01</span>
        <span className="text-emerald-500 font-semibold">Ready</span>
        <span>control-plane</span>
        <span>v1.28.2</span>
        <span>10.128.0.10</span>
      </div>
      <div className="grid grid-cols-5 gap-1">
        <span>harsh-worker-01</span>
        <span className="text-emerald-500 font-semibold">Ready</span>
        <span>worker</span>
        <span>v1.28.2</span>
        <span>10.128.0.11</span>
      </div>
      <div className="grid grid-cols-5 gap-1 text-stone-500 italic mt-2">
        <span>&gt; Node Condition: MemoryPressure=False, DiskPressure=False, PIDPressure=False</span>
      </div>
    </div>
  );

  const commandFlow: CommandStep[] = [
    {
      command: 'echo "Initializing Secure DevOps Console..."',
      output: "Boot Sequence Initiated... Connection Authorized [TLS_1.3]",
      delay: 800,
    },
    {
      command: "whoami",
      output: "Harshvardhan NS | Lead Cloud & DevOps Engineer | Infrastructure Architect",
      delay: 1000,
    },
    {
      command: "docker ps --format 'table {{.ID}}\t{{.Image}}\t{{.Status}}\t{{.Names}}'",
      output: containerStats,
      delay: 1200,
    },
    {
      command: "kubectl describe node harshconfig",
      output: kubeNodeStats,
      delay: 1400,
    },
    {
      command: "terraform apply -auto-approve",
      output: () => (
        <div className="font-mono text-[10px] sm:text-xs text-stone-400 mt-1 leading-relaxed">
          <span className="text-stone-500">aws_vpc.main: Creating...</span><br />
          <span className="text-emerald-500 font-semibold">aws_vpc.main: Creation complete [ID: vpc-0fa2e89d8f]</span><br />
          <span className="text-stone-500">aws_eks_cluster.prod: Creating...</span><br />
          <span className="text-emerald-500 font-semibold">aws_eks_cluster.prod: Creation complete [ID: harsh-k8s-prod]</span><br />
          <span className="text-[var(--lobster-red)] font-bold">Apply complete! Resources: 18 added, 0 changed, 0 destroyed.</span>
        </div>
      ),
      delay: 1600,
    },
  ];

  useEffect(() => {
    if (typingIndex < commandFlow.length) {
      const step = commandFlow[typingIndex];
      let currentText = "";
      let charIndex = 0;

      const typeInterval = setInterval(() => {
        if (charIndex < step.command.length) {
          currentText += step.command[charIndex];
          setTypedText(currentText);
          charIndex++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => {
            setVisibleLines((prev) => [...prev, typingIndex]);
            setTypedText("");
            setTypingIndex((prev) => prev + 1);
          }, step.delay);
        }
      }, 35);

      return () => clearInterval(typeInterval);
    }
  }, [typingIndex]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleLines, typedText]);

  return (
    <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden py-16 px-4 grid-bg">
      {/* Dynamic Background Red Glow Nodes */}
      <div className="absolute top-[20%] left-[10%] h-[300px] w-[300px] rounded-full bg-[var(--lobster-red)]/10 blur-[130px] -z-10 float-anim" />
      <div className="absolute bottom-[20%] right-[10%] h-[350px] w-[350px] rounded-full bg-[var(--deep-red)]/10 blur-[140px] -z-10 bg-gradient-to-tr" />

      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-12 lg:flex-row relative z-10">
        
        {/* Left Side: Professional pitch */}
        <div className="flex flex-1 flex-col text-left sm:items-start max-w-xl">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--lobster-red)] animate-pulse shadow-[0_0_8px_var(--lobster-red)]"></span>
            <span className="font-mono text-xs font-bold tracking-widest text-[var(--lobster-red)] uppercase">
              DEPLOYMENT ENVIRONMENT: ACTIVE
            </span>
          </div>

          <h2 className="text-4xl font-black xs:text-5xl md:text-6xl tracking-tight leading-none mb-6">
            AUTOMATE<br/>
            PROVISION<br/>
            <span className="text-[var(--lobster-red)]">SCALE.</span>
          </h2>

          <p className="text-[var(--text-secondary)] text-sm sm:text-base font-normal max-w-lg mb-8 leading-relaxed">
            Infrastructure architect designing resilience. Heavy container systems, GitOps pipelines, and high-performance multi-cloud strategies utilizing a stark, automated approach.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a href="#projects" className="btn-primary flex items-center justify-center gap-2">
              <Play className="h-4.5 w-4.5 fill-current" />
              EXPLORE INFRASTRUCTURE
            </a>
            <a 
              href="https://github.com/Harshvardhanns351" 
              target="_blank"
              rel="noopener noreferrer" 
              className="btn-outline flex items-center justify-center gap-2"
            >
              <Github className="h-4.5 w-4.5" />
              VIEW CODEBASE
            </a>
          </div>
        </div>

        {/* Right Side: Command Dashboard Terminal Mockup */}
        <div className="w-full flex-1 max-w-2xl">
          <div className="w-full glass-card border border-[var(--accent-gray)] rounded-xl shadow-2xl overflow-hidden">
            
            {/* Terminal Top Window Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#080809] border-b border-[var(--accent-gray)]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-950/40 border border-red-500/30 flex items-center justify-center text-[7px] text-[var(--lobster-red)]">✕</span>
                <span className="w-3 h-3 rounded-full bg-stone-900 border border-stone-800"></span>
                <span className="w-3 h-3 rounded-full bg-stone-900 border border-stone-800"></span>
              </div>
              <span className="font-mono text-[11px] text-[var(--text-muted)] tracking-wider">
                root@harsh:~
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-500">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                SECURE
              </span>
            </div>

            {/* Terminal Body Content */}
            <div className="p-4 sm:p-5 h-[340px] md:h-[380px] overflow-y-auto font-mono text-xs sm:text-[13px] leading-relaxed text-[var(--text-primary)] text-left bg-black/60 scrollbar-none">
              
              {/* Static Welcome Header */}
              <div className="text-[var(--text-muted)] mb-2">
                Last login: {new Date().toLocaleDateString()} on ttys001
              </div>

              {/* Completed commands list */}
              {visibleLines.map((idx) => {
                const step = commandFlow[idx];
                return (
                  <div key={idx} className="mb-3">
                    <div className="flex items-center text-[var(--lobster-red)] font-semibold">
                      <ChevronRight className="h-3.5 w-3.5 mr-0.5" />
                      <span>{step.command}</span>
                    </div>
                    <div className="text-[var(--text-secondary)] mt-1 whitespace-pre-wrap">
                      {typeof step.output === "function" ? step.output() : step.output}
                    </div>
                  </div>
                );
              })}

              {/* Currently typing command */}
              {typingIndex < commandFlow.length && (
                <div className="flex items-center text-[var(--lobster-red)] font-semibold">
                  <ChevronRight className="h-3.5 w-3.5 mr-0.5 animate-pulse" />
                  <span>
                    {typedText}
                    <span className="inline-block w-1.5 h-4 bg-[var(--lobster-red)] cursor-blink ml-0.5 align-middle"></span>
                  </span>
                </div>
              )}

              {/* System idle ready mark */}
              {typingIndex >= commandFlow.length && (
                <div className="mt-4 border-t border-[var(--accent-gray)] pt-3 text-[11px]">
                  <span className="text-[var(--lobster-red)] font-bold uppercase mr-2">[SYSTEM TERMINAL IDLE]</span>
                  <span className="text-[var(--text-muted)]">Type dynamic commands in the interactive console below.</span>
                </div>
              )}
              
              <div ref={terminalEndRef} />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
