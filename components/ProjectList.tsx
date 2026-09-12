"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, ChevronDown } from "lucide-react";

interface Project {
  id: string; name: string; date: string; status: string;
  description: string; problem: string; solution: string; lessons: string;
  metrics: string[]; tech: string[]; accent: string; number: string;
}

const projects: Project[] = [
  {
    id: "p1", number: "01",
    name: "Auto GitOps K8s Cluster",
    date: "Apr 2026", status: "Active",
    accent: "#FF2E2E",
    description: "Declarative GitOps engine using ArgoCD to synchronize Kubernetes clusters with continuous testing pipelines.",
    problem: "Configuration drift between staging and production clusters caused manual rollbacks and unsafe state changes.",
    solution: "Single source-of-truth configs via Terraform modules and ArgoCD sync-waves with image optimization gating.",
    lessons: "Custom health validations inside ArgoCD before traffic redirection prevent service timeouts during rollouts.",
    metrics: ["Deployment latency ↓ 60%", "100% automated config enforcement"],
    tech: ["ArgoCD", "Kubernetes", "EKS", "GitHub Actions", "Docker", "Snyk"],
  },
  {
    id: "p2", number: "02",
    name: "Terraform Multi-Cloud Engine",
    date: "Jun 2026", status: "Active",
    accent: "#8B5CF6",
    description: "Modular cloud architecture templates enabling multi-cloud network peering and high-availability deployments.",
    problem: "Cross-cloud VPN peering depended on manual setups prone to human error.",
    solution: "Cloud-agnostic Terraform modules with Sentinel check rules for compliance verification.",
    lessons: "Separating state files between persistent networks and ephemeral compute prevents accidental deletes.",
    metrics: ["24 hrs provisioning time saved", "Standardised topologies across AWS & GCP"],
    tech: ["Terraform", "AWS", "Google Cloud", "Sentinel", "Bash"],
  },
  {
    id: "p3", number: "03",
    name: "Prometheus Observability Stack",
    date: "Jul 2026", status: "Running",
    accent: "#F59E0B",
    description: "Centralized monitoring with Prometheus metrics, Grafana visualization, and automated PagerDuty alerting.",
    problem: "Resource leaks caused microservices to crash silently without early warning signals.",
    solution: "Custom Node Exporters, Alertmanagers, and Grafana dashboards mapping CPU throttles against JVM behavior.",
    lessons: "Alert rules on error rates (HTTP 5xx) over CPU thresholds alone prevent alert fatigue.",
    metrics: ["Alert response time ↓ 45%", "15+ logging silos unified"],
    tech: ["Prometheus", "Grafana", "Alertmanager", "Node Exporter", "Kubernetes"],
  },
  {
    id: "p4", number: "04",
    name: "Cost Alerter Lambda Cleanup",
    date: "May 2026", status: "Serverless",
    accent: "#10B981",
    description: "Event-driven serverless tool reporting idle cloud resources and auto-purging unused EBS/S3 assets.",
    problem: "Sandbox environments accumulated redundant cloud resources creating runaway charges.",
    solution: "Lambda scanning AWS resources, generating Slack alerts, and purging after a 48-hour timeout.",
    lessons: "Strict tagging policies yield more accurate cost reports than API resource sweeps.",
    metrics: ["AWS sandbox costs ↓ 32%", "14 TB dangling storage reclaimed"],
    tech: ["AWS Lambda", "Python", "CloudWatch Events", "Slack API", "Terraform"],
  },
];

export default function ProjectList() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="projects" className="section-full">
      <div className="content-wrap">

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="section-label">Work</p>
          <h2 className="text-4xl font-black tracking-tight text-[var(--text-primary)]">Production Deployments</h2>
          <span className="section-accent" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((p, i) => {
            const isOpen = open === p.id;
            return (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
                className="group relative glass-card overflow-hidden flex flex-col"
              >
                {/* Top accent line */}
                <div className="h-[2px] w-full" style={{ background: `linear-gradient(90deg, ${p.accent} 0%, ${p.accent}40 50%, transparent 100%)` }} />

                {/* Hover glow wash */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 20% 0%, ${p.accent}0A 0%, transparent 60%)` }} />

                <div className="p-7 flex flex-col flex-1 relative">

                  {/* Large number watermark */}
                  <span className="absolute top-4 right-5 font-black text-[4.5rem] leading-none select-none pointer-events-none"
                    style={{ color: `${p.accent}10` }}>
                    {p.number}
                  </span>

                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: p.accent }} />
                        <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest">{p.date} · {p.status}</span>
                      </div>
                      <h3 className="font-bold text-xl text-[var(--text-primary)] leading-snug">{p.name}</h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">{p.description}</p>

                  {/* Metrics */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
                    {p.metrics.map((m, j) => (
                      <div key={j} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-emerald-500/15 bg-emerald-500/6">
                        <TrendingUp className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                        <span className="text-xs text-emerald-400 font-semibold leading-snug">{m}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech pills */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.tech.map((t) => <span key={t} className="tech-pill">{t}</span>)}
                  </div>

                  {/* Expand/collapse */}
                  <div className="border-t border-[var(--accent-gray)] pt-4 mt-auto">
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.32, ease: "easeOut" }}
                          className="overflow-hidden mb-4"
                        >
                          <div className="space-y-4 pt-1">
                            {[
                              { label: "Problem",    text: p.problem },
                              { label: "Solution",   text: p.solution },
                              { label: "Key lesson", text: p.lessons },
                            ].map((item) => (
                              <div key={item.label} className="flex gap-3">
                                <div className="w-px shrink-0 rounded-full mt-1 self-stretch"
                                  style={{ background: `linear-gradient(to bottom, ${p.accent}, transparent)` }} />
                                <div>
                                  <p className="text-[10px] font-bold font-mono uppercase tracking-widest mb-1" style={{ color: p.accent }}>{item.label}</p>
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
                      className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors uppercase tracking-widest"
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
