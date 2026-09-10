"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, TrendingUp, MessageSquare } from "lucide-react";

interface Exp {
  role: string;
  company: string;
  duration: string;
  type: string;
  description: string;
  metrics: string[];
  color: string;
}

const experiences: Exp[] = [
  {
    role: "Lead Cloud & DevOps Specialist",
    company: "Scalable Systems Corp",
    duration: "2024 — Present",
    type: "Full-time",
    color: "#FF2E2E",
    description:
      "Leading enterprise infrastructure transitions. Re-architected container scheduling and image build templates across the full CI/CD lifecycle.",
    metrics: [
      "CDK scripts reducing config drift to 0%",
      "Managed 120+ microservice builds with Jenkins & GitOps",
    ],
  },
  {
    role: "DevOps & Cloud Engineer",
    company: "CloudNative Solutions",
    duration: "2023 — 2024",
    type: "Internship",
    color: "#8B5CF6",
    description:
      "Administered development compute environments. Configured DaemonSet exporters to track custom metrics and database transaction pool overflows.",
    metrics: [
      "Alert response latency ↓ 45%",
      "CloudWatch + Grafana central dashboards integrated",
    ],
  },
];

const publications = [
  { title: "Scaling GitOps with Confidence",    venue: "Medium",             date: "Jan 2026" },
  { title: "K8s Resource Limits Secure Tuning", venue: "HashiCorp Community", date: "Oct 2025" },
];

export default function ExperienceLogs() {
  return (
    <section id="experience" className="section-full">
      <div className="content-wrap">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="font-mono text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--lobster-red)] mb-2">Experience</p>
          <h2 className="text-4xl font-black tracking-tight text-[var(--text-primary)]">Work History</h2>
          <span className="section-accent" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* ── Timeline cards ── */}
          <div className="lg:col-span-2 space-y-5">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className="glass-card overflow-hidden"
              >
                {/* colour accent bar */}
                <div className="h-0.5" style={{ background: `linear-gradient(90deg, ${exp.color}, transparent)` }} />

                <div className="p-7">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                    <div className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-[var(--accent-gray)]"
                        style={{ background: `${exp.color}18` }}
                      >
                        <Briefcase className="h-4.5 w-4.5" style={{ color: exp.color }} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-[var(--text-primary)] leading-tight">{exp.role}</h3>
                        <p className="text-sm font-semibold mt-0.5" style={{ color: exp.color }}>{exp.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono text-[10px] text-[var(--text-muted)] border border-[var(--accent-gray)] rounded-md px-2.5 py-1">
                        {exp.type}
                      </span>
                      <span className="font-mono text-[10px] text-[var(--text-muted)] border border-[var(--accent-gray)] rounded-md px-2.5 py-1">
                        {exp.duration}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">{exp.description}</p>

                  {/* Key achievements */}
                  <div className="space-y-2">
                    {exp.metrics.map((m, j) => (
                      <div key={j} className="flex items-center gap-2.5">
                        <TrendingUp className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                        <span className="text-sm text-emerald-400">{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Sidebar: Publications ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[var(--accent-gray)]">
              <MessageSquare className="h-4 w-4 text-[var(--lobster-red)]" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                Publications
              </span>
            </div>

            <div className="space-y-5">
              {publications.map((a) => (
                <div key={a.title} className="flex gap-3">
                  <div className="w-0.5 bg-gradient-to-b from-[var(--lobster-red)] to-transparent rounded-full shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)] leading-snug">{a.title}</p>
                    <p className="text-xs text-[var(--text-muted)] font-mono mt-1">{a.venue} · {a.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
