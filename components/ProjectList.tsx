"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, ChevronDown, ArrowUpRight } from "lucide-react";

interface Project {
  id: string; name: string; date: string; status: string;
  description: string; problem: string; solution: string; lessons: string;
  metrics: string[]; tech: string[]; accent: string;
}

const projects: Project[] = [
  {
    id:"p1", name:"Auto GitOps K8s Cluster", date:"Apr 2026", status:"Active · 5/5 nodes",
    accent:"#FF2E2E",
    description:"Declarative GitOps engine using ArgoCD to synchronize Kubernetes clusters with continuous testing pipelines.",
    problem:"Configuration drift between staging and production clusters caused manual rollbacks and unsafe state changes.",
    solution:"Single source-of-truth configs via Terraform modules and ArgoCD sync-waves with image optimization gating.",
    lessons:"Custom health validations inside ArgoCD before traffic redirection prevent service timeouts during rollouts.",
    metrics:["Deployment latency ↓ 60%","100% automated configuration enforcement"],
    tech:["ArgoCD","Kubernetes","EKS","GitHub Actions","Docker","Snyk"],
  },
  {
    id:"p2", name:"Terraform Multi-Cloud Engine", date:"Jun 2026", status:"Active · 12 modules",
    accent:"#8B5CF6",
    description:"Modular cloud architecture templates enabling multi-cloud network peering and high-availability deployments.",
    problem:"Cross-cloud VPN peering depended on manual setups prone to human error.",
    solution:"Cloud-agnostic Terraform modules with Sentinel check rules for compliance verification.",
    lessons:"Separating state files between persistent networks and ephemeral compute prevents accidental deletes.",
    metrics:["24 hrs provisioning time saved","Standardised topologies across AWS & GCP"],
    tech:["Terraform","AWS","Google Cloud","Sentinel","Bash"],
  },
  {
    id:"p3", name:"Prometheus Observability Stack", date:"Jul 2026", status:"Running · cluster DaemonSet",
    accent:"#F59E0B",
    description:"Centralized monitoring with Prometheus metrics, Grafana visualization, and automated PagerDuty paging.",
    problem:"Resource leaks caused microservices to crash silently without early warning signals.",
    solution:"Custom Node Exporters, Alertmanagers, and Grafana dashboards mapping CPU throttles against JVM behavior.",
    lessons:"Alert rules on error rates (HTTP 5xx) over CPU thresholds alone prevent alert fatigue.",
    metrics:["Alert response time ↓ 45%","15+ logging silos unified"],
    tech:["Prometheus","Grafana","Alertmanager","Node Exporter","Kubernetes"],
  },
  {
    id:"p4", name:"Cost Alerter Lambda Cleanup", date:"May 2026", status:"Cron-triggered · serverless",
    accent:"#10B981",
    description:"Event-driven serverless tool reporting idle cloud resources and auto-purging unused EBS/S3 assets.",
    problem:"Sandbox environments accumulated redundant cloud resources creating runaway charges.",
    solution:"Lambda scanning AWS resources, generating Slack alerts, and purging after a 48-hour timeout.",
    lessons:"Strict tagging policies yield more accurate cost reports than API resource sweeps.",
    metrics:["AWS sandbox costs ↓ 32%","14 TB dangling storage reclaimed"],
    tech:["AWS Lambda","Python","CloudWatch Events","Slack API","Terraform"],
  },
];

export default function ProjectList() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="projects" className="section-full">
      <div className="content-wrap">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55 }}
          className="mb-16"
        >
          <p className="font-mono text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--lobster-red)] mb-2">Work</p>
          <h2 className="text-4xl font-black tracking-tight text-[var(--text-primary)]">Production Deployments</h2>
          <span className="section-accent" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((p, i) => {
            const isOpen = open === p.id;
            return (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className="glass-card flex flex-col overflow-hidden group"
              >
                {/* Accent bar */}
                <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${p.accent}, transparent)` }} />

                <div className="p-7 flex flex-col flex-1">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: p.accent }} />
                        <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest">{p.date} · {p.status}</span>
                      </div>
                      <h3 className="font-bold text-xl text-[var(--text-primary)] leading-tight">{p.name}</h3>
                    </div>
                    <motion.div
                      whileHover={{ x: 2, y: -2 }}
                      className="w-8 h-8 rounded-lg border border-[var(--accent-gray)] flex items-center justify-center shrink-0 opacity-40 group-hover:opacity-100 group-hover:border-[var(--lobster-red)]/40 transition-all"
                    >
                      <ArrowUpRight className="h-4 w-4" style={{ color: p.accent }} />
                    </motion.div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">{p.description}</p>

                  {/* Metrics */}
                  <div className="grid grid-cols-1 gap-2 mb-5">
                    {p.metrics.map((m, j) => (
                      <div key={j} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/[0.02] border border-[var(--accent-gray)]">
                        <TrendingUp className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                        <span className="text-xs text-emerald-400 font-semibold">{m}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech pills */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.tech.map((t) => <span key={t} className="tech-pill">{t}</span>)}
                  </div>

                  {/* Expand */}
                  <div className="border-t border-[var(--accent-gray)] pt-4 mt-auto">
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35, ease: "easeOut" }}
                          className="overflow-hidden mb-4"
                        >
                          <div className="space-y-4">
                            {[
                              { label: "Problem", text: p.problem },
                              { label: "Solution", text: p.solution },
                              { label: "Key lesson", text: p.lessons },
                            ].map((item) => (
                              <div key={item.label} className="flex gap-3">
                                <div className="w-0.5 bg-gradient-to-b from-[var(--lobster-red)] to-transparent shrink-0 rounded-full mt-1" style={{ minHeight: "100%" }} />
                                <div>
                                  <p className="text-xs font-bold text-[var(--text-primary)] mb-1 font-mono uppercase tracking-widest">{item.label}</p>
                                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.text}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button
                      onClick={() => setOpen(isOpen ? null : p.id)}
                      className="flex items-center gap-2 text-xs font-mono font-semibold text-[var(--text-muted)] hover:text-[var(--lobster-red)] transition-colors uppercase tracking-[0.12em]"
                    >
                      <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                        <ChevronDown className="h-3.5 w-3.5" />
                      </motion.span>
                      {isOpen ? "Collapse" : "View details"}
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
