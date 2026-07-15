"use client";

import React, { useState, useEffect } from "react";
import { Terminal, RefreshCw, Send, GitCommit } from "lucide-react";

interface StatusLog {
  timestamp: string;
  message: string;
  category: "SUCCESS" | "INFO" | "ALERT";
}

export default function LatestUpdates() {
  const [logs, setLogs] = useState<StatusLog[]>([]);

  useEffect(() => {
    const initialLogs: StatusLog[] = [
      {
        timestamp: "2026-07-15 14:23:45",
        message: "Successfully deployed Production Cluster nodes to v1.28.2 EKS",
        category: "SUCCESS",
      },
      {
        timestamp: "2026-07-14 09:12:30",
        message: "Published new article: 'GitOps Pipeline Governance Optimization'",
        category: "INFO",
      },
      {
        timestamp: "2026-07-12 16:45:20",
        message: "Merged optimization update to multi-cloud Terraform templates mapping",
        category: "SUCCESS",
      },
      {
        timestamp: "2026-07-10 11:04:12",
        message: "Alert triggered: VPC sandbox network scanned for idle compute resources",
        category: "ALERT",
      },
    ];

    setLogs(initialLogs);

    // Add a live log trigger occasionally to represent live operations console
    const interval = setInterval(() => {
      const messages = [
        "Synced ArgoCD sync-wave changes across production-cluster namespace",
        "Completed vulnerability scan: 0 critical vulnerabilities found",
        "Prometheus alert rules re-compiled; metrics payload latency remains stable",
        "S3 security buckets scanned for compliance policy enforcement",
      ];
      const categories: ("SUCCESS" | "INFO")[] = ["SUCCESS", "INFO"];
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      const randomCat = categories[Math.floor(Math.random() * categories.length)];

      const now = new Date();
      const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

      setLogs((prev) => [
        { timestamp, message: randomMsg, category: randomCat },
        ...prev.slice(0, 4),
      ]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 border-t border-[var(--accent-gray)] bg-[var(--bg-primary)] items-stretch justify-center flex relative">
      <div className="mx-auto max-w-5xl w-full px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="mb-12">
          <h2 className="text-2xl font-black font-mono uppercase tracking-wider text-[var(--text-primary)]">
            ~/live-operation-logs
          </h2>
          <div className="h-0.5 w-12 bg-[var(--lobster-red)] mt-3"></div>
        </div>

        {/* Dashboard Box Frame */}
        <div className="w-full glass-card border border-[var(--accent-gray)] rounded-xl overflow-hidden shadow-xl bg-black/40">
          
          {/* Header Status Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#080809] border-b border-[var(--accent-gray)]">
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-[var(--text-primary)]">
              <RefreshCw className="h-4.5 w-4.5 text-[var(--lobster-red)] animate-spin" />
              <span className="font-bold uppercase tracking-wider">LIVE TELEMETRY STREAM</span>
            </div>
            <span className="text-[10px] font-mono text-stone-500 uppercase font-bold">
              Buffer Load: STABLE
            </span>
          </div>

          {/* Logs Body */}
          <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] bg-black/50 text-left space-y-3.5 scrollbar-none max-h-[300px] overflow-y-auto">
            {logs.map((log, idx) => (
              <div 
                key={idx}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-stone-900/60 pb-3 last:border-0 last:pb-0"
              >
                <div className="flex items-start gap-2.5">
                  <span className="text-stone-500 text-[11px] shrink-0">
                    [{log.timestamp}]
                  </span>
                  <span className={`text-[10px] shrink-0 font-bold px-1.5 py-0.5 rounded leading-none ${
                    log.category === "SUCCESS"
                      ? "bg-emerald-950/40 border border-emerald-900/30 text-emerald-500"
                      : log.category === "ALERT"
                      ? "bg-red-950/40 border border-red-900/30 text-[var(--lobster-red)]"
                      : "bg-stone-900 border border-stone-850 text-stone-400"
                  }`}>
                    {log.category}
                  </span>
                  <span className="text-stone-300 text-xs leading-relaxed">
                    {log.message}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[10px] text-stone-500 shrink-0 font-bold self-end sm:self-center">
                  <GitCommit className="h-3 w-3" />
                  <span>SYNCEX</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
