"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Terminal, Zap } from "lucide-react";

interface NodeDef { id: string; x: number; y: number; w: number; h: number; label: string; sub: string; }
interface NodeDetail { title: string; desc: string; config: string; status: "ONLINE" | "WARN" | "SYNCING"; }

const nodes: NodeDef[] = [
  { id:"client", x:10,  y:115, w:68,  h:70, label:"CLIENT",    sub:"TLS 1.3"    },
  { id:"cdn",    x:115, y:115, w:68,  h:70, label:"CDN",       sub:"EDGE"       },
  { id:"alb",    x:220, y:115, w:68,  h:70, label:"ALB",       sub:"L7 ROUTE"   },
  { id:"eks",    x:328, y:100, w:80,  h:84, label:"EKS",       sub:"3 REPLICAS" },
  { id:"db",     x:442, y:115, w:68,  h:70, label:"AURORA",    sub:"POSTGRES"   },
  { id:"tf",     x:328, y:10,  w:80,  h:55, label:"TERRAFORM", sub:"INFRA STATE"},
];

const details: Record<string, NodeDetail> = {
  client: { title:"Client Endpoint",          desc:"Secure client requests via TLS 1.3 high-availability edge routes.",                                       config:"curl -I https://hvs.engineer\nHTTP/2 200 OK\nserver: cloudflare",                                                                            status:"ONLINE" },
  cdn:    { title:"CloudFront / Edge CDN",    desc:"DDoS throttling and SSL/TLS acceleration at 200+ global edge PoPs.",                                      config:'{\n  "CachePolicy": "CachingOptimized",\n  "OriginShield": "Enabled"\n}',                                                                      status:"ONLINE" },
  alb:    { title:"Application Load Balancer",desc:"Layer-7 route-based balancing forwarding requests inside cluster subnets.",                               config:"kind: TargetGroupBinding\nspec:\n  serviceRef:\n    name: api-srv\n    port: 80",                                                               status:"ONLINE" },
  eks:    { title:"EKS Cluster Control Plane",desc:"HA Kubernetes master managing worker replicas via horizontal pod autoscaling.",                            config:"$ kubectl get pods -n prod\nNAME                  READY  STATUS\nprod-api-cf859b-nd912 1/1    Running\nprod-api-cf859b-xk812 1/1    Running", status:"ONLINE" },
  db:     { title:"Aurora Serverless PG",     desc:"Multi-AZ active standby with sub-second replication and automated snapshots.",                            config:'{\n  "Engine": "aurora-postgresql",\n  "EngineVersion": "15.3",\n  "MaxCapacity": 8.0\n}',                                                    status:"ONLINE" },
  tf:     { title:"Terraform Cloud Gating",   desc:"State validation and drift detection before every infrastructure merge.",                                 config:"terraform plan -out=tfplan\nPlan: 3 to add, 1 to change, 0 to destroy.\nState Lock: [Acquired]",                                               status:"SYNCING"},
};

const statusBadge: Record<string, string> = {
  ONLINE:  "text-emerald-400 border-emerald-500/20 bg-emerald-500/6",
  WARN:    "text-amber-400   border-amber-500/20   bg-amber-500/6",
  SYNCING: "text-sky-400     border-sky-500/20     bg-sky-500/6",
};

const edges = [
  { from:"client", to:"cdn"   },
  { from:"cdn",    to:"alb"   },
  { from:"alb",    to:"eks"   },
  { from:"eks",    to:"db"    },
  { from:"tf",     to:"eks", dashed: true },
];

/* centre of a node */
const cx = (n: NodeDef) => n.x + n.w / 2;
const cy = (n: NodeDef) => n.y + n.h / 2;
const byId = (id: string) => nodes.find((n) => n.id === id)!;

export default function DevOpsDashboard() {
  const [active, setActive]   = useState("eks");
  const [pulse,  setPulse]    = useState<string[]>([]);
  const node = details[active];

  /* animate data pulse along edges */
  useEffect(() => {
    const id = setInterval(() => {
      setPulse(["client","cdn","alb","eks","db"]);
      setTimeout(() => setPulse([]), 1800);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="architecture" className="section-full">
      <div className="content-wrap">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55 }}
          className="mb-16"
        >
          <p className="section-label">Infrastructure</p>
          <h2 className="text-4xl font-black tracking-tight text-[var(--text-primary)]">Architecture Overview</h2>
          <span className="section-accent" />
        </motion.div>

        {/* Full-width SVG diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="glass-card p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-[var(--lobster-red)] animate-pulse" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Live VPC Architecture Map</span>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-mono text-[var(--text-muted)]">
              <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-[var(--lobster-red)] rounded block" />Active</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-[var(--accent-gray)] rounded block" />Inactive</span>
              <span className="hidden sm:flex items-center gap-1.5 border border-[var(--accent-gray)] px-2 py-0.5 rounded">
                Click nodes to inspect
              </span>
            </div>
          </div>

          <div className="w-full bg-black/40 border border-[var(--accent-gray)] rounded-xl overflow-hidden">
            <svg viewBox="0 0 530 230" className="w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
                <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L6,3 Z" fill="var(--lobster-red)" opacity="0.6" />
                </marker>
              </defs>

              {/* Edges */}
              {edges.map((e, i) => {
                const a = byId(e.from), b = byId(e.to);
                const isActive = active === e.from || active === e.to;
                const isPulsing = pulse.includes(e.from) || pulse.includes(e.to);
                const x1 = e.from === "tf" ? cx(a) : cx(a) + a.w/2 - 4;
                const y1 = e.from === "tf" ? a.y + a.h : cy(a);
                const x2 = e.from === "tf" ? cx(b) : cx(b) - b.w/2 + 4;
                const y2 = e.from === "tf" ? cy(b) : cy(b);
                return (
                  <g key={i}>
                    <line x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke={isActive ? "#FF2E2E" : "#1A1A22"}
                      strokeWidth={isActive ? "1.5" : "1"}
                      strokeDasharray={e.dashed ? "4 3" : undefined}
                      markerEnd={!e.dashed ? "url(#arrow)" : undefined}
                    />
                    {isPulsing && (
                      <circle r="3" fill="#FF2E2E" opacity="0.9" filter="url(#glow)">
                        <animateMotion dur="1.5s" repeatCount="1" path={`M${x1},${y1} L${x2},${y2}`} />
                      </circle>
                    )}
                  </g>
                );
              })}

              {/* Nodes */}
              {nodes.map((n) => {
                const isActive = active === n.id;
                return (
                  <g key={n.id} className="cursor-pointer" onClick={() => setActive(n.id)}>
                    {isActive && (
                      <rect x={n.x-3} y={n.y-3} width={n.w+6} height={n.h+6} rx="11"
                        fill="none" stroke="#FF2E2E" strokeWidth="1" opacity="0.4">
                        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" />
                      </rect>
                    )}
                    <rect x={n.x} y={n.y} width={n.w} height={n.h} rx="8"
                      fill={isActive ? "#160A0A" : "#08080D"}
                      stroke={isActive ? "#FF2E2E" : "#1A1A22"}
                      strokeWidth={isActive ? "1.5" : "1"}
                    />
                    <text x={cx(n)} y={n.y + n.h * 0.45} textAnchor="middle"
                      fontWeight="bold" fontSize="7.5"
                      fill={isActive ? "#FF2E2E" : "#8A9099"}
                      fontFamily="JetBrains Mono, monospace">{n.label}</text>
                    <text x={cx(n)} y={n.y + n.h * 0.66} textAnchor="middle"
                      fontSize="7" fill={isActive ? "#6B7280" : "#2E2E38"}
                      fontFamily="JetBrains Mono, monospace">{n.sub}</text>
                    {isActive && (
                      <circle cx={n.x + n.w - 8} cy={n.y + 8} r="3" fill="#10B981">
                        <animate attributeName="r" values="3;4;3" dur="1.5s" repeatCount="indefinite" />
                      </circle>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </motion.div>

        {/* Node inspector row — full width */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="glass-card p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
          >
            {/* Node title + status */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-[var(--lobster-red)]" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Node Inspector</span>
              </div>
              <h4 className="text-xl font-bold text-[var(--text-primary)]">{node.title}</h4>
              <span className={`inline-flex items-center self-start gap-1.5 text-[10px] font-mono font-bold px-2.5 py-1 rounded-md border ${statusBadge[node.status]}`}>
                <Zap className="h-3 w-3" /> {node.status}
              </span>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{node.desc}</p>
            </div>

            {/* Config block */}
            <div className="md:col-span-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)] mb-2">Config / Terminal State</p>
              <pre className="font-mono text-xs text-[var(--text-secondary)] bg-black/60 border border-[var(--accent-gray)] rounded-xl p-5 overflow-x-auto leading-relaxed whitespace-pre-wrap">
                <code>{node.config}</code>
              </pre>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
