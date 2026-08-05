"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, ShieldCheck, Layers, Zap, Globe, Box } from "lucide-react";

const fadeItem = (delay = 0) => ({
  initial:     { opacity: 0, y: 24 } as const,
  whileInView: { opacity: 1, y: 0  } as const,
  viewport:    { once: true        } as const,
  transition:  { duration: 0.55, delay, ease: "easeOut" } as const,
});

/* Animated skill bar */
function SkillBar({ label, pct, color = "var(--lobster-red)" }: { label: string; pct: number; color?: string }) {
  const ref  = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between font-mono text-xs">
        <span className="text-[var(--text-secondary)]">{label}</span>
        <span className="text-[var(--text-muted)]">{pct}%</span>
      </div>
      <div className="h-1.5 bg-[var(--accent-gray)] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: inView ? `${pct}%` : 0 }}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.1 }}
        />
      </div>
    </div>
  );
}

export default function SystemSpecs() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const specs = [
    { icon: <Zap  className="h-4 w-4" />, label: "Identity",    value: "Harshavardhan S" },
    { icon: <Globe className="h-4 w-4" />, label: "Cloud",      value: "AWS · GCP · Multi-cloud" },
    { icon: <Box  className="h-4 w-4" />, label: "Containers",  value: "Docker · containerd" },
    { icon: <Layers className="h-4 w-4" />, label: "IaC",       value: "Terraform Cloud Enterprise" },
  ];

  const certs = [
    { name: "AWS Certified Solutions Architect",       org: "Amazon Web Services",  status: "VALIDATED", color: "text-amber-400 border-amber-500/20 bg-amber-500/6" },
    { name: "Certified Kubernetes Administrator (CKA)", org: "CNCF",               status: "VALIDATED", color: "text-sky-400 border-sky-500/20 bg-sky-500/6" },
    { name: "HashiCorp Certified: Terraform Associate", org: "HashiCorp",           status: "ACTIVE",    color: "text-violet-400 border-violet-500/20 bg-violet-500/6" },
  ];

  const skills = [
    { label: "Kubernetes",    pct: 90, color: "var(--lobster-red)" },
    { label: "AWS",           pct: 90, color: "#F59E0B" },
    { label: "Terraform",     pct: 90, color: "#8B5CF6" },
    { label: "Docker",        pct: 95, color: "#06B6D4" },
    { label: "Prometheus",    pct: 85, color: "#10B981" },
    { label: "GitHub Actions",pct: 88, color: "var(--lobster-red)" },
  ];

  return (
    <section ref={sectionRef} id="about" className="section-full">
      <div className="content-wrap">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55 }}
          className="mb-16"
        >
          <p className="font-mono text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--lobster-red)] mb-2">About</p>
          <h2 className="text-4xl font-black tracking-tight text-[var(--text-primary)]">Profile & Credentials</h2>
          <span className="section-accent" />
        </motion.div>

        {/* ── Main 3-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Col 1: Identity card */}
          <motion.div {...fadeItem(0)} className="glass-card p-7 flex flex-col gap-6">
            {/* Avatar / brand mark */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--lobster-red)]/20 to-[var(--deep-red)]/20 border border-[var(--lobster-red)]/20 flex items-center justify-center">
                  <span className="font-black text-2xl gradient-text font-mono">HVS</span>
                </div>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[var(--bg-primary)]" />
              </div>
              <div>
                <p className="font-bold text-base text-[var(--text-primary)]">Harshavardhan S</p>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">Cloud & DevOps Engineer</p>
              </div>
            </div>

            <div className="border-t border-[var(--accent-gray)] pt-5 space-y-3">
              {specs.map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-[var(--lobster-red)] opacity-60">{s.icon}</span>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)]">{s.label}</p>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{s.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mini stats */}
            <div className="grid grid-cols-2 gap-3 border-t border-[var(--accent-gray)] pt-5">
              {[
                { n: "4+", l: "Projects" }, { n: "Fresher", l: "Experience" },
                { n: "60%", l: "Latency ↓" }, { n: "100%", l: "Config parity" },
              ].map((s) => (
                <div key={s.l} className="bg-white/[0.02] border border-[var(--accent-gray)] rounded-lg p-3 text-center">
                  <div className="text-lg font-black gradient-text">{s.n}</div>
                  <div className="text-[10px] text-[var(--text-muted)] mt-0.5 font-mono">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Col 2: About + Skill bars */}
          <motion.div {...fadeItem(0.1)} className="glass-card p-7 flex flex-col gap-6">
            <div>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">Architecting Resilient Infrastructure</h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-3">
                I close the gap between code and production with declarative GitOps models and cloud-agnostic 
                IaC — making deployments repeatable, auditable, and safe by default.
              </p>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                Pipeline designs that prioritize reliability: container security scanning, automated policy gating, 
                and centralized metrics so every commit can safely reach production.
              </p>
            </div>

            <div className="border-t border-[var(--accent-gray)] pt-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)] mb-4">Core proficiency</p>
              <div className="space-y-3.5">
                {skills.map((s) => <SkillBar key={s.label} {...s} />)}
              </div>
            </div>
          </motion.div>

          {/* Col 3: Certifications */}
          <motion.div {...fadeItem(0.2)} className="glass-card p-7 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-[var(--lobster-red)]" />
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Certifications</h3>
            </div>

            <div className="space-y-3 flex-1">
              {certs.map((c, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 rounded-xl border border-[var(--accent-gray)] bg-white/[0.015] hover:border-[var(--lobster-red)]/20 transition-colors cursor-default"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[var(--text-primary)] leading-snug">{c.name}</p>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5 font-mono">{c.org}</p>
                    </div>
                    <span className={`shrink-0 flex items-center gap-1 text-[10px] font-mono font-bold px-2.5 py-1 rounded-md border ${c.color}`}>
                      <ShieldCheck className="h-3 w-3" /> {c.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Allocation bar */}
            <div className="border-t border-[var(--accent-gray)] pt-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)] mb-3">Expertise split</p>
              <div className="flex h-3 rounded-full overflow-hidden gap-px">
                {[
                  { w: "45%", color: "bg-[var(--lobster-red)]",  tip: "K8s 45%" },
                  { w: "35%", color: "bg-amber-500",             tip: "AWS 35%" },
                  { w: "20%", color: "bg-violet-500",            tip: "IaC 20%" },
                ].map((b, i) => (
                  <motion.div key={i} className={`${b.color} h-full`} style={{ width: b.w }}
                    initial={{ scaleX: 0, originX: "0%" }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: i * 0.15, ease: "easeOut" }}
                    title={b.tip}
                  />
                ))}
              </div>
              <div className="flex gap-4 mt-2 font-mono text-[10px] text-[var(--text-muted)]">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[var(--lobster-red)]" />Kubernetes</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" />AWS</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-violet-500" />IaC</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
