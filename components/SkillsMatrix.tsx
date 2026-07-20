"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Sparkles } from "lucide-react";

interface Skill { name: string; level: string; pct: number; desc: string; color: string; }
interface Group { category: string; emoji: string; skills: Skill[]; }

const data: Group[] = [
  { category:"Infrastructure as Code", emoji:"🏗️", skills:[
    { name:"Terraform",       level:"Expert",       pct:90, color:"#8B5CF6", desc:"Immutable infra, custom providers, state locking, module authoring, Sentinel policy gating." },
    { name:"Ansible",         level:"Basics",     pct:75, color:"#EF4444", desc:"Automated configuration, playbooks, vault integration, baseline hardening." },
    { name:"CloudFormation",  level:"Intermediate", pct:60, color:"#F59E0B", desc:"Native AWS deployment scripts, nested stacks, change set enforcement." },
  ]},
  { category:"Container Orchestration", emoji:"🐳", skills:[
    { name:"Kubernetes",      level:"Expert",       pct:90, color:"#3B82F6", desc:"Multi-cluster topology, CRDs, CoreDNS, Kube-Proxy, secure secrets management." },
    { name:"Docker",          level:"Expert",       pct:95, color:"#06B6D4", desc:"Multi-stage builds, bridge overlays, container lifecycle, rootless runtime." },
    { name:"Docker Swarm",    level:"Basics", pct:65, color:"#0EA5E9", desc:"Decentralised deployments, overlay networking, lightweight health management." },
  ]},
  { category:"CI/CD & GitOps", emoji:"⚙️", skills:[
    { name:"GitHub Actions",  level:"Expert",       pct:88, color:"#FF2E2E", desc:"Custom workflows, runner tuning, dependency caching, security scanning." },
    { name:"ArgoCD",          level:"Intermediate",     pct:80, color:"#F97316", desc:"Sync waves, health checks, declarative GitOps across multi-tenant clusters." },
    { name:"Jenkins",         level:"Intermediate", pct:68, color:"#EAB308", desc:"Groovy pipelines, distributed master-agent setups, integration APIs." },
  ]},
  { category:"Cloud Infrastructure", emoji:"☁️", skills:[
    { name:"AWS",             level:"Expert",       pct:90, color:"#F59E0B", desc:"VPC, Transit Gateway, IAM least-privilege, EKS, Lambda, RDS." },
    { name:"Azure",           level:"Basics", pct:60, color:"#0078D4", desc:"Active Directory, scale sets, virtual network interfaces." },
  ]},
  { category:"Observability", emoji:"📊", skills:[
    { name:"Prometheus",      level:"Expert",       pct:85, color:"#E05A00", desc:"PromQL, custom scrape configs, exporter hooks, SLI/SLO counters." },
    { name:"Grafana",         level:"Expert",       pct:90, color:"#FF6B35", desc:"Custom dashboards, alert integrations, log correlation, EKS maps." },
    { name:"ELK Stack",       level:"Basics",     pct:78, color:"#FFD600", desc:"Logstash pipelines, Elasticsearch indexing, Kibana log aggregation." },
  ]},
  { category:"Programming", emoji:"💻", skills:[
    { name:"Bash",            level:"Expert",       pct:95, color:"#22C55E", desc:"Shell automation, network diagnostics, container run modules." },
    { name:"Python",          level:"Advanced",     pct:82, color:"#3B82F6", desc:"Boto3, FastAPI REST, cron processors, JSON parsing." },
  ]},
];

const levelColor: Record<string, string> = {
  Expert:"text-emerald-400", Advanced:"text-sky-400", Intermediate:"text-amber-400",
};

/* Animated radial progress ring */
function RingProgress({ pct, color, size = 64 }: { pct: number; color: string; size?: number }) {
  const ref    = useRef<SVGCircleElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-20px" });
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#1A1A22" strokeWidth="4" />
      <motion.circle
        ref={ref}
        cx={size/2} cy={size/2} r={r}
        fill="none" stroke={color} strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: inView ? circ * (1 - pct / 100) : circ }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
        style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
      />
      <text x={size/2} y={size/2 + 4} textAnchor="middle" fill={color}
        fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono, monospace">
        {pct}%
      </text>
    </svg>
  );
}

export default function SkillsMatrix() {
  const [selected, setSelected] = useState<Skill | null>(null);
  const [openGroup, setOpenGroup] = useState<string | null>("Infrastructure as Code");

  return (
    <section id="skills" className="section-full">
      <div className="content-wrap">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55 }}
          className="mb-16"
        >
          <p className="font-mono text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--lobster-red)] mb-2">Skills</p>
          <h2 className="text-4xl font-black tracking-tight text-[var(--text-primary)]">Technical Stack</h2>
          <span className="section-accent" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">

          {/* Left: accordion skill groups — takes 3/5 */}
          <motion.div
            initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55 }}
            className="lg:col-span-3 space-y-2"
          >
            {data.map((group) => {
              const isOpen = openGroup === group.category;
              return (
                <div key={group.category} className="glass-card overflow-hidden">
                  <button
                    onClick={() => setOpenGroup(isOpen ? null : group.category)}
                    className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{group.emoji}</span>
                      <span className="font-semibold text-sm text-[var(--text-primary)]">{group.category}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[var(--text-muted)] font-mono">{group.skills.length} tools</span>
                      <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                        <svg className="h-4 w-4 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.span>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: "easeOut" }}
                        className="overflow-hidden border-t border-[var(--accent-gray)]"
                      >
                        <div className="px-5 py-3 space-y-1">
                          {group.skills.map((sk) => {
                            const isSel = selected?.name === sk.name;
                            return (
                              <motion.button
                                key={sk.name}
                                onClick={() => setSelected(isSel ? null : sk)}
                                whileHover={{ x: 4 }}
                                className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all text-left ${
                                  isSel
                                    ? "bg-white/[0.04] border border-[var(--lobster-red)]/25"
                                    : "border border-transparent hover:border-[var(--accent-gray)] hover:bg-white/[0.02]"
                                }`}
                              >
                                <RingProgress pct={sk.pct} color={sk.color} size={52} />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold text-sm text-[var(--text-primary)]">{sk.name}</span>
                                    <span className={`text-[10px] font-mono font-semibold ${levelColor[sk.level]}`}>{sk.level}</span>
                                  </div>
                                  <p className="text-xs text-[var(--text-muted)] mt-0.5 line-clamp-1">{sk.desc}</p>
                                </div>
                              </motion.button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>

          {/* Right: detail panel — 2/5 */}
          <motion.div
            initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:col-span-2 lg:sticky lg:top-24"
          >
            <AnimatePresence mode="wait">
              {selected ? (
                <motion.div
                  key={selected.name}
                  initial={{ opacity: 0, scale: 0.96, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card p-6 space-y-6"
                >
                  {/* Header */}
                  <div className="flex items-center gap-4">
                    <RingProgress pct={selected.pct} color={selected.color} size={72} />
                    <div>
                      <h4 className="text-2xl font-black text-[var(--text-primary)]">{selected.name}</h4>
                      <p className={`text-sm font-mono font-semibold mt-0.5 ${levelColor[selected.level]}`}>{selected.level}</p>
                    </div>
                  </div>

                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{selected.desc}</p>

                  {/* Proficiency bar */}
                  <div className="pt-4 border-t border-[var(--accent-gray)]">
                    <div className="flex justify-between font-mono text-xs mb-2">
                      <span className="text-[var(--text-muted)]">Proficiency</span>
                      <span style={{ color: selected.color }}>{selected.pct}%</span>
                    </div>
                    <div className="h-1.5 bg-[var(--accent-gray)] rounded-full overflow-hidden">
                      <div className="h-full rounded-full shimmer-bar" style={{ width: `${selected.pct}%`, backgroundColor: selected.color }} />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="glass-card p-8 flex flex-col items-center justify-center text-center gap-4 min-h-[280px]"
                >
                  <div className="w-12 h-12 rounded-2xl border border-[var(--accent-gray)] flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-[var(--text-muted)]" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-[var(--text-primary)]">Select a skill</p>
                    <p className="text-xs text-[var(--text-muted)] mt-1">Click any tool to inspect proficiency details</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* All skills as tags below panel */}
            <div className="mt-4 glass-card p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)] mb-3">All technologies</p>
              <div className="flex flex-wrap gap-1.5">
                {data.flatMap((g) => g.skills).map((sk) => (
                  <button
                    key={sk.name}
                    onClick={() => setSelected(selected?.name === sk.name ? null : sk)}
                    className={`tech-pill cursor-pointer ${selected?.name === sk.name ? "border-[var(--lobster-red)]/50 text-[var(--lobster-red)] bg-[var(--lobster-red)]/6" : ""}`}
                  >
                    {sk.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
