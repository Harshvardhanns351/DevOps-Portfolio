"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";

interface Log {
  timestamp: string;
  message: string;
  category: "SUCCESS" | "INFO" | "ALERT";
}

const initialLogs: Log[] = [
  { timestamp: "2026-07-15 14:23", message: "Deployed production cluster nodes to EKS v1.28.2", category: "SUCCESS" },
  { timestamp: "2026-07-14 09:12", message: "Published: 'GitOps Pipeline Governance Optimization'", category: "INFO" },
  { timestamp: "2026-07-12 16:45", message: "Merged optimization update to multi-cloud Terraform modules", category: "SUCCESS" },
  { timestamp: "2026-07-10 11:04", message: "Alert triggered: VPC sandbox scanned for idle compute resources", category: "ALERT" },
];

const rollingMessages = [
  "Synced ArgoCD sync-wave changes across production namespace",
  "Vulnerability scan complete: 0 critical findings",
  "Prometheus alert rules recompiled; payload latency stable",
  "S3 buckets scanned for compliance policy enforcement",
];

const categoryStyle: Record<string, string> = {
  SUCCESS: "bg-emerald-500/8 border-emerald-500/20 text-emerald-400",
  ALERT:   "bg-[var(--lobster-red)]/8 border-[var(--lobster-red)]/20 text-[var(--lobster-red)]",
  INFO:    "bg-white/5 border-white/10 text-[var(--text-muted)]",
};

export default function LatestUpdates() {
  const [logs, setLogs] = useState<Log[]>(initialLogs);

  useEffect(() => {
    const id = setInterval(() => {
      const now   = new Date();
      const stamp = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-${String(now.getDate()).padStart(2,"0")} ${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;
      const msg   = rollingMessages[Math.floor(Math.random() * rollingMessages.length)];
      setLogs((p) => [{ timestamp: stamp, message: msg, category: "SUCCESS" }, ...p.slice(0, 4)]);
    }, 10_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="py-24 border-t border-[var(--accent-gray)]">
      <div className="content-wrap">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="font-mono text-[11px] font-semibold tracking-widest uppercase text-[var(--lobster-red)] mb-2">Activity</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">Live Operation Logs</h2>
          <span className="section-accent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card overflow-hidden"
        >
          {/* Panel header */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-black/40 border-b border-[var(--accent-gray)]">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">
              <RefreshCw className="h-3.5 w-3.5 text-[var(--lobster-red)] animate-spin" />
              Live telemetry stream
            </div>
            <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest">Buffer: Stable</span>
          </div>

          {/* Log rows */}
          <div className="divide-y divide-[var(--accent-gray)]">
            {logs.map((log, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4">
                <span className="font-mono text-[11px] text-[var(--text-muted)] shrink-0">{log.timestamp}</span>
                <span className={`inline-flex items-center font-mono text-[10px] font-bold px-2 py-0.5 rounded border shrink-0 ${categoryStyle[log.category]}`}>
                  {log.category}
                </span>
                <span className="text-sm text-[var(--text-secondary)]">{log.message}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
