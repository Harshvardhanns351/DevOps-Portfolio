"use client";

import { motion } from "framer-motion";
import { Briefcase, TrendingUp, Calendar, Building2 } from "lucide-react";

interface Exp {
  role: string; company: string; duration: string; type: string;
  description: string; metrics: string[]; color: string; tags: string[];
}

const experiences: Exp[] = [
  {
    role: "Lead Cloud & DevOps Specialist",
    company: "Scalable Systems Corp",
    duration: "2024 — Present",
    type: "Full-time",
    color: "#FF2E2E",
    description: "Leading enterprise infrastructure transitions. Re-architected container scheduling and image build templates across the full CI/CD lifecycle.",
    metrics: [
      "CDK scripts reducing config drift to 0%",
      "120+ microservice builds managed with Jenkins & GitOps",
    ],
    tags: ["Kubernetes", "Terraform", "ArgoCD", "AWS", "Jenkins"],
  },
  {
    role: "DevOps & Cloud Engineer",
    company: "CloudNative Solutions",
    duration: "2023 — 2024",
    type: "Internship",
    color: "#8B5CF6",
    description: "Administered development compute environments. Configured DaemonSet exporters to track custom metrics and database transaction pool overflows.",
    metrics: [
      "Alert response latency ↓ 45%",
      "CloudWatch + Grafana dashboards integrated",
    ],
    tags: ["Prometheus", "Grafana", "Docker", "AWS", "Python"],
  },
];

export default function ExperienceLogs() {
  return (
    <section id="experience" className="section-full">
      <div className="content-wrap">

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="section-label">Experience</p>
          <h2 className="text-4xl font-black tracking-tight text-[var(--text-primary)]">Work History</h2>
          <span className="section-accent" />
        </motion.div>

        <div className="space-y-5">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: "easeOut" }}
              className="group relative glass-card overflow-hidden"
            >
              {/* Left colour rail */}
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl" style={{ background: exp.color }} />

              {/* Top gradient wash */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 0% 50%, ${exp.color}0D 0%, transparent 60%)` }} />

              <div className="pl-8 pr-7 py-7">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-5">

                  {/* Left: role info */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border border-[var(--accent-gray)] mt-0.5"
                      style={{ background: `${exp.color}15` }}>
                      <Briefcase className="h-5 w-5" style={{ color: exp.color }} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-xl text-[var(--text-primary)] leading-tight mb-1">{exp.role}</h3>

                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <div className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: exp.color }}>
                          <Building2 className="h-3.5 w-3.5" />
                          {exp.company}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-mono">
                          <Calendar className="h-3 w-3" />
                          {exp.duration}
                        </div>
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border"
                          style={{ color: exp.color, borderColor: `${exp.color}40`, background: `${exp.color}10` }}>
                          {exp.type}
                        </span>
                      </div>

                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5 max-w-2xl">
                        {exp.description}
                      </p>

                      {/* Metrics */}
                      <div className="flex flex-wrap gap-3 mb-5">
                        {exp.metrics.map((m, j) => (
                          <div key={j} className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/8 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
                            <TrendingUp className="h-3.5 w-3.5 shrink-0" />
                            <span className="font-semibold">{m}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {exp.tags.map((t) => (
                          <span key={t} className="tech-pill">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
