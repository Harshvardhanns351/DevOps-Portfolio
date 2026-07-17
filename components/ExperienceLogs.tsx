"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GitCommit, GitBranch, MessageSquare, Briefcase } from "lucide-react";

interface Exp {
  role: string; company: string; duration: string;
  description: string; metrics: string[]; logs: string[];
  color: string;
}

const experiences: Exp[] = [
  {
    role:"Lead Cloud & DevOps Specialist", company:"Scalable Systems Corp", duration:"2024 — Present",
    color:"#FF2E2E",
    description:"Leading enterprise infrastructure transitions. Re-architected container scheduling and image build templates across the full CI/CD lifecycle.",
    metrics:["CDK scripts reducing config drift to 0%","Managed 120+ microservice builds with Jenkins & GitOps"],
    logs:["[INFO]    Initializing Terraform state checker","[INFO]    Policy check: OPA validation PASSED","[SUCCESS] 24 nodes active on EKS production cluster"],
  },
  {
    role:"DevOps & Cloud Engineer Intern", company:"CloudNative Solutions", duration:"2023 — 2024",
    color:"#8B5CF6",
    description:"Administered development compute environments. Configured DaemonSet exporters to log custom metrics and track database transaction pool overflows.",
    metrics:["Alert response latency ↓ 45%","CloudWatch + Grafana central dashboards integrated"],
    logs:["[INFO]    Scanning cluster metric exporter configs","[WARNING] Disk load >80% on dev-node-03; auto-healing","[SUCCESS] Stable telemetry reporting to Prometheus"],
  },
  {
    role:"R&D Labs Head", company:"Academic Cloud Computing Center", duration:"2022 — 2023",
    color:"#10B981",
    description:"Guided experiments on computing architectures. Prototyped hardware network configurations and local container registry systems.",
    metrics:["Configured virtualization hubs using KVM","Linux virtualization workshops for engineering cohort"],
    logs:["[INFO]    Mounting local image registry endpoint","[SUCCESS] Private hypervisor infrastructure operational"],
  },
];

const logColor = (l: string) =>
  l.includes("SUCCESS") ? "text-emerald-400" : l.includes("WARNING") ? "text-amber-400" : "text-[var(--text-secondary)]";

/* Parallax card */
function ExpCard({ exp, index }: { exp: Exp; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? 20 : -20, 0]);

  return (
    <motion.div ref={ref} style={{ y }}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="glass-card overflow-hidden group"
    >
      {/* Accent top bar */}
      <div className="h-0.5" style={{ background: `linear-gradient(90deg, ${exp.color}, transparent)` }} />

      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-[var(--accent-gray)]"
              style={{ background: `${exp.color}15` }}>
              <Briefcase className="h-4.5 w-4.5" style={{ color: exp.color }} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-[var(--text-primary)] leading-tight">{exp.role}</h3>
              <p className="text-sm font-semibold mt-0.5" style={{ color: exp.color }}>{exp.company}</p>
            </div>
          </div>
          <span className="font-mono text-xs text-[var(--text-muted)] border border-[var(--accent-gray)] rounded-lg px-3 py-1.5 shrink-0">
            {exp.duration}
          </span>
        </div>

        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">{exp.description}</p>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
          {exp.metrics.map((m, j) => (
            <div key={j} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/[0.02] border border-[var(--accent-gray)]">
              <GitCommit className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
              <span className="text-xs text-emerald-400">{m}</span>
            </div>
          ))}
        </div>

        {/* Console logs */}
        <div className="bg-black/50 border border-[var(--accent-gray)] rounded-xl p-4 font-mono text-xs space-y-1">
          <p className="text-[var(--text-muted)] text-[10px] uppercase tracking-widest mb-2">Terminal output</p>
          {exp.logs.map((line, li) => (
            <div key={li} className={`flex gap-2 ${logColor(line)}`}>
              <span className="text-[var(--text-muted)] select-none shrink-0">{String(li+1).padStart(2,"0")}</span>
              <span>{line}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ExperienceLogs() {
  return (
    <section id="experience" className="section-full">
      <div className="content-wrap">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55 }}
          className="mb-16"
        >
          <p className="font-mono text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--lobster-red)] mb-2">Experience</p>
          <h2 className="text-4xl font-black tracking-tight text-[var(--text-primary)]">Deployment Timeline</h2>
          <span className="section-accent" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Timeline cards — 2/3 */}
          <div className="lg:col-span-2 space-y-5">
            {experiences.map((exp, i) => <ExpCard key={i} exp={exp} index={i} />)}
          </div>

          {/* Sidebar — 1/3 */}
          <div className="space-y-5">

            {/* Git stats */}
            <motion.div
              initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.15 }}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-[var(--accent-gray)]">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Git Activity</span>
                <GitBranch className="h-4 w-4 text-[var(--lobster-red)]" />
              </div>

              <div className="space-y-3 font-mono text-xs">
                {[
                  { l:"Commits (L30D)", v:"148",  c:"text-[var(--lobster-red)] font-bold" },
                  { l:"PRs merged",     v:"34",   c:"text-emerald-400 font-bold" },
                  { l:"Open issues",    v:"0",    c:"text-[var(--text-secondary)]" },
                  { l:"Branch sync",    v:"100%", c:"text-emerald-400 font-bold" },
                ].map((r) => (
                  <div key={r.l} className="flex justify-between py-2.5 border-b border-[var(--accent-gray)] last:border-0">
                    <span className="text-[var(--text-muted)]">{r.l}</span>
                    <span className={r.c}>{r.v}</span>
                  </div>
                ))}
              </div>

              {/* Activity heatmap */}
              <div className="mt-5 pt-4 border-t border-[var(--accent-gray)]">
                <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-3">Activity heatmap</p>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 35 }).map((_, idx) => {
                    const w = (idx * 7 + 3) % 5;
                    const opacity = [0.08, 0.2, 0.4, 0.65, 0.9][w];
                    return (
                      <motion.div key={idx}
                        className="h-4 rounded-sm"
                        style={{ backgroundColor: `rgba(255,46,46,${opacity})` }}
                        initial={{ scale: 0 }} whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: idx * 0.012 }}
                      />
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Publications */}
            <motion.div
              initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.25 }}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-[var(--accent-gray)]">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Publications</span>
                <MessageSquare className="h-4 w-4 text-[var(--lobster-red)]" />
              </div>

              <div className="space-y-4">
                {[
                  { t:"Scaling GitOps with Confidence",    p:"Medium",            d:"Jan 2026" },
                  { t:"K8s Resource Limits Secure Tuning", p:"HashiCorp Community",d:"Oct 2025" },
                ].map((a) => (
                  <motion.div key={a.t} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}
                    className="flex gap-3 cursor-default">
                    <div className="w-0.5 bg-gradient-to-b from-[var(--lobster-red)] to-transparent rounded-full shrink-0 mt-1 self-stretch" />
                    <div>
                      <p className="text-sm font-semibold text-[var(--text-primary)] leading-snug">{a.t}</p>
                      <p className="text-xs text-[var(--text-muted)] font-mono mt-0.5">{a.p} · {a.d}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
