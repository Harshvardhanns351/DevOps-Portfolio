"use client";

import React from "react";
import { GitCommit, GitBranch, Cpu, Award, MessageSquare } from "lucide-react";

interface TimelineEvent {
  role: string;
  company: string;
  duration: string;
  status: "success" | "warning";
  jobName: string;
  metrics: string[];
  description: string;
  logs: string[];
}

export default function ExperienceLogs() {
  const experiences: TimelineEvent[] = [
    {
      role: "Lead Cloud & DevOps Specialist",
      company: "Scalable Systems Corp",
      duration: "2024 - PRESENT",
      status: "success",
      jobName: "deploy-production-vpc-pipeline",
      metrics: [
        "Authored modular CDK scripts reducing drift errors to 0%",
        "Managed 120+ microservice builds with Jenkins & GitOps integrations",
      ],
      description: "Spearheading enterprise infrastructure transitions. Re-architected container scheduling models and container image builds templates.",
      logs: [
        "[INFO] Initializing Terraform state checker.",
        "[INFO] Policy Check: OPA validation checks PASSED.",
        "[SUCCESS] 24 nodes successfully active on EKS Cluster.",
      ]
    },
    {
      role: "DevOps & Cloud Engineer Intern",
      company: "CloudNative Solutions",
      duration: "2023 - 2024",
      status: "success",
      jobName: "build-k8s-observability-stack",
      metrics: [
        "Reduced Alert response latency by 45%",
        "Integrated AWS CloudWatch dashboards with centralized Grafana",
      ],
      description: "Administered development compute environments. Configured daemon sets exporters to log custom metrics and track database transaction pool overflows.",
      logs: [
        "[INFO] Scanning cluster metric exporters configurations.",
        "[WARNING] Disk load exceeds 80% on dev-node-03; Auto-healing active.",
        "[SUCCESS] Exporters reporting stable metrics telemetry to Prometheus.",
      ]
    },
    {
      role: "Research & Development Labs Head",
      company: "Academic Cloud Computing Center",
      duration: "2022 - 2023",
      status: "success",
      jobName: "scaffold-hybrid-private-infrastructure",
      metrics: [
        "Configured physical virtualization hubs using KVM hosts",
        "Instructed workshops on Linux virtualization configurations",
      ],
      description: "Guided technical experiments on computing architectures. Prototyped hardware networks configurations and local registry systems.",
      logs: [
        "[INFO] Mount local image registry endpoint.",
        "[SUCCESS] Private hypervisor infrastructure operational.",
      ]
    }
  ];

  return (
    <section className="py-20 border-t border-[var(--accent-gray)] bg-[var(--bg-secondary)] relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="mb-12">
          <h2 className="text-2xl font-black font-mono uppercase tracking-wider text-[var(--text-primary)]">
            ~/deployment-timeline-logs
          </h2>
          <div className="h-0.5 w-12 bg-[var(--lobster-red)] mt-3"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Block: Experience Timeline Logs */}
          <div className="lg:col-span-8 space-y-8 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[var(--accent-gray)]">
            {experiences.map((exp, index) => (
              <div 
                key={index}
                className="relative group progress-event"
              >
                {/* Node Dot Indicator */}
                <span className={`absolute -left-6.5 top-1.5 w-3 h-3 rounded-full border border-black ${
                  exp.status === "success" 
                    ? "bg-[var(--lobster-red)] shadow-[0_0_8px_var(--lobster-red)]" 
                    : "bg-[var(--amber)] shadow-[0_0_8px_var(--amber)]"
                }`} />

                <div className="glass-card border border-[var(--accent-gray)] p-5 bg-black/40 hover:border-[var(--lobster-red)]/30 transition-all duration-200">
                  
                  {/* Job run header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-900 pb-3 mb-4">
                    <div>
                      <span className="font-mono text-[10px] text-stone-500 block">PIPELINE RUN JOB:</span>
                      <h3 className="font-mono text-xs font-bold text-[var(--lobster-red)] uppercase tracking-wider">
                        {exp.jobName}
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-[10px] bg-stone-950 border border-stone-850 px-2.5 py-0.5 rounded text-stone-400 font-medium">
                        {exp.duration}
                      </span>
                    </div>
                  </div>

                  {/* Body Text */}
                  <div className="mb-4">
                    <h4 className="font-bold text-sm text-[var(--text-primary)] mb-1">
                      {exp.role} <span className="text-[var(--lobster-red)]">@</span> {exp.company}
                    </h4>
                    <p className="text-[var(--text-secondary)] text-xs sm:text-sm leading-relaxed font-sans">
                      {exp.description}
                    </p>
                  </div>

                  {/* Impact metrics */}
                  <div className="space-y-1 mb-4 select-none">
                    {exp.metrics.map((metric, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-500">
                        <GitCommit className="h-3 w-3 shrink-0" />
                        <span>{metric}</span>
                      </div>
                    ))}
                  </div>

                  {/* Simulated terminal runner logs */}
                  <div className="bg-stone-950 border border-stone-900 rounded p-3 font-mono text-[10px] sm:text-xs text-stone-400 space-y-1 overflow-x-auto leading-relaxed">
                    <span className="text-stone-600 block mb-1">console_output:</span>
                    {exp.logs.map((log, lIdx) => (
                      <div key={lIdx} className="whitespace-pre">
                        <span className="text-stone-700 select-none mr-2">[{lIdx + 1}]</span>
                        <span className={log.includes("SUCCESS") ? "text-emerald-500" : log.includes("WARNING") ? "text-[var(--amber)]" : ""}>
                          {log}
                        </span>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Right Block: Contributions Profile */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Git Contributions Card */}
            <div className="glass-card border border-[var(--accent-gray)] p-5 bg-black/40">
              <div className="flex items-center justify-between border-b border-stone-900 pb-3 mb-4">
                <span className="font-mono text-xs font-bold text-[var(--text-primary)] tracking-wider">
                  GIT_CONTRIBUTIONS_LOG
                </span>
                <GitBranch className="h-4.5 w-4.5 text-[var(--lobster-red)]" />
              </div>

              <div className="space-y-3 font-mono text-[11px] text-stone-400">
                <div className="flex justify-between items-center py-2 border-b border-stone-900/60">
                  <span>Commits (L30D):</span>
                  <span className="text-[var(--lobster-red)] font-bold">148 Commits</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-stone-900/60">
                  <span>Pull Requests:</span>
                  <span className="text-emerald-500 font-bold">34 Merged</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-stone-900/60">
                  <span>Open Issues:</span>
                  <span className="text-stone-300">0 Reported</span>
                </div>
                <div className="flex justify-between items-center py-2 pb-0">
                  <span>Main Branch Sync:</span>
                  <span className="text-emerald-505 text-emerald-500 font-semibold uppercase">100% Synced</span>
                </div>
              </div>

              {/* Grid-style mock contributions grid */}
              <div className="mt-5 border-t border-stone-900 pt-4">
                <span className="font-mono text-[10px] text-stone-500 uppercase block mb-2.5">
                  Cluster Deployment Activity Grid:
                </span>
                <div className="grid grid-cols-7 gap-1 w-full max-w-[200px]">
                  {Array.from({ length: 28 }).map((_, idx) => {
                    const colorClasses = [
                      "bg-stone-900/60 border border-stone-900",
                      "bg-red-950/60 border border-red-950",
                      "bg-red-800/40 border border-red-900/30",
                      "bg-[var(--lobster-red)] border border-red-500/20"
                    ];
                    // Random-like deterministic values
                    const val = (idx * 3) % 4;
                    return (
                      <div 
                        key={idx} 
                        className={`h-4.5 w-4.5 rounded-sm ${colorClasses[val]}`}
                        title={`Activity weight: ${val}`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Speaking / Publications / Articles Card */}
            <div className="glass-card border border-[var(--accent-gray)] p-5 bg-black/40">
              <div className="flex items-center justify-between border-b border-stone-900 pb-3 mb-4">
                <span className="font-mono text-xs font-bold text-[var(--text-primary)] tracking-wider">
                  THOUGHT_LEADERSHIP
                </span>
                <MessageSquare className="h-4.5 w-4.5 text-[var(--lobster-red)]" />
              </div>
              
              <div className="space-y-4 font-mono text-xs">
                <div className="border-l border-stone-800 pl-3">
                  <div className="text-[var(--lobster-red)] font-bold text-[11px]">
                    &gt; SCALING GITOPS WITH CONFIDENCE
                  </div>
                  <p className="text-stone-500 text-[10px] mt-0.5">Medium Publications (Jan 2026)</p>
                </div>
                <div className="border-l border-stone-800 pl-3">
                  <div className="text-[var(--lobster-red)] font-bold text-[11px]">
                    &gt; K8S RESOURCE LIMITS SECURE TUNING
                  </div>
                  <p className="text-stone-500 text-[10px] mt-0.5">HashiCorp Community Blog (Oct 2025)</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
