"use client";

import React, { useState } from "react";
import { FolderGit2, Check, Clock, TrendingUp, Cpu, Server, ShieldCheck, ChevronRight } from "lucide-react";

interface ProjectItem {
  id: string;
  name: string;
  replicas: string;
  date: string;
  metrics: string[];
  description: string;
  problem: string;
  solution: string;
  lessons: string;
  diagram: string[];
  tech: string[];
}

export default function ProjectList() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const projects: ProjectItem[] = [
    {
      id: "proj1",
      name: "AUTO-GITOPS-K8S-CLUSTER",
      replicas: "Active [5/5 Nodes]",
      date: "04-2026",
      metrics: [
        "Reduced deployment latency by 60%",
        "100% automated configuration enforcement",
      ],
      description: "Declarative GitOps engine using ArgoCD to synchronize Kubernetes clusters with continuous testing pipelines.",
      problem: "Engineers faced configuration drifts between staging and prod clusters, leading to manual rollbacks and unsafe state changes.",
      solution: "Engineered single source of truth configurations using Terraform modules and ArgoCD sync-waves with image optimization gating.",
      lessons: "Implementing custom health validations inside ArgoCD before traffic redirection is vital for avoiding service timeouts.",
      diagram: [
        "   [Git Commit Check] ----> [GitHub Actions Build] ----> [Docker ECR Push]   ",
        "                                                                |         ",
        "   [K8s Production] <---- [ArgoCD Sync Hook] <------------------+         "
      ],
      tech: ["ArgoCD", "Kubernetes", "EKS", "GitHub Actions", "Docker", "Snyk"],
    },
    {
      id: "proj2",
      name: "TERRAFORM-MULTI-CLOUD-ENGINE",
      replicas: "Active [12 Modules]",
      date: "06-2026",
      metrics: [
        "Saved 24 hrs provisioning time per deployment",
        "Standardized network topologies across AWS & GCP",
      ],
      description: "Modular cloud architecture templates enabling multi-cloud network peerings and high-availability application architectures.",
      problem: "Provisioning cross-cloud VPN peerings and subnet tables depended on manual dashboard setups prone to human errors.",
      solution: "Engineered standardized cloud-agnostic Terraform modules with built-in Sentinel check rules for compliance verification.",
      lessons: "Separating state files between persistent networks and ephemeral computing instances drastically mitigates accidental deletes.",
      diagram: [
        "   [Terraform Plan Config] ----> [Sentinel Policy Engine] ----> [Approved]  ",
        "                                                                   |       ",
        "   {AWS VPC Subnets} <====================================> {GCP VPC Hub}"
      ],
      tech: ["Terraform", "AWS", "Google Cloud", "Sentinel", "Bash Modules"],
    },
    {
      id: "proj3",
      name: "PROMETHEUS-OBSERVE-STACK",
      replicas: "Running [Cluster DaemonSet]",
      date: "07-2026",
      metrics: [
        "Improved Alert response action time by 45%",
        "Consolidated 15+ logging silos into unified dashboard",
      ],
      description: "Centralized monitoring architecture implementing Prometheus metrics collection, Grafana visualization, and automated PagerDuty paging.",
      problem: "Resource leaks in nodes caused microservices to crash silently without early warning signals for engineering squads.",
      solution: "Deployed customized Node Exporters, Alertmanagers, and Grafana maps mapping container CPU throttles against JVM behaviors.",
      lessons: "Setting metric alert rules on critical rates (like network HTTP 5xx errors) rather than simple CPU triggers prevents alert fatigue.",
      diagram: [
        "   [Worker Pod Metrics] ----> [Prometheus Crawler] ----> [Alert Manager]    ",
        "                                                                |         ",
        "   [Slack Alert Broadcast] <---- [Grafana Visualization] <-----+         "
      ],
      tech: ["Prometheus", "Grafana", "Alertmanager", "NodeExporter", "Kubernetes"],
    },
    {
      id: "proj4",
      name: "COST-ALERTER-LAMBDA-CLEANUP",
      replicas: "Cron-Triggered [Serverless]",
      date: "05-2026",
      metrics: [
        "Cut monthly sandbox AWS expenses by 32%",
        "Reclaimed 14 TB dangling block storage records",
      ],
      description: "Event-driven serverless cloud tool reporting idle staging networks and optimizing unused EBS/S3 data assets automatically.",
      problem: "Sandbox environments accumulated isolated and redundant cloud items, creating runaway charges on billing summaries.",
      solution: "Configured automated lambda script scanning AWS resources, generating Slack alerts, and purging resources after 48-hour timeouts.",
      lessons: "Utilizing strict tagging policies yields better cost reports than scraping resource patterns via API sweeps.",
      diagram: [
        "   [Bridge Schedule Event] ----> [Lambda IAM Scan] ----> [Audit Database]   ",
        "                                                                |         ",
        "   [Developer Purge Option] <---- [Slack Cost Notification] <---+         "
      ],
      tech: ["AWS Lambda", "Python", "CloudWatch Events", "Slack API", "Terraform"],
    }
  ];

  return (
    <section id="projects" className="py-20 border-t border-[var(--accent-gray)] bg-[var(--bg-secondary)] relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="mb-12">
          <h2 className="text-2xl font-black font-mono uppercase tracking-wider text-[var(--text-primary)]">
            ~/production-deployments
          </h2>
          <div className="h-0.5 w-12 bg-[var(--lobster-red)] mt-3"></div>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {projects.map((proj) => {
            const isExpanded = expandedId === proj.id;
            return (
              <div 
                key={proj.id}
                className="glass-card border border-[var(--accent-gray)] rounded-xl overflow-hidden p-5 bg-black/40 flex flex-col justify-between h-full"
              >
                <div>
                  
                  {/* Deployment log block */}
                  <div className="font-mono text-[10px] bg-stone-950 border border-stone-850 p-2.5 rounded mb-4 text-stone-400">
                    <div className="flex justify-between items-center text-[var(--lobster-red)] font-bold mb-1.5 uppercase text-[11px] tracking-wide">
                      <span>DEPLOYMENT: {proj.name}</span>
                      <span className="flex items-center gap-1">
                        <span className="status-dot online"></span>
                        PROD
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-[10px] mt-1 text-stone-500">
                      <span>Replicas: {proj.replicas}</span>
                      <span className="text-right">Synced: {proj.date}</span>
                    </div>
                  </div>

                  {/* ASCII Diagram representation */}
                  <div className="font-mono text-[9px] bg-black/80 text-stone-500 p-2 border border-stone-900 rounded mb-4 overflow-x-auto select-none leading-relaxed hidden sm:block">
                    {proj.diagram.map((line, idx) => (
                      <div key={idx} className="whitespace-pre">{line}</div>
                    ))}
                  </div>

                  <h3 className="font-bold text-base text-[var(--text-primary)] mb-2 flex items-center justify-between">
                    {proj.name.replace(/-/g, " ")}
                  </h3>

                  <p className="text-xs text-[var(--text-secondary)] mb-4 leading-relaxed font-sans">
                    {proj.description}
                  </p>

                  {/* Impact metrics badges */}
                  <div className="space-y-1.5 mb-4">
                    {proj.metrics.map((metric, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-mono text-emerald-500">
                        <TrendingUp className="h-3.5 w-3.5 shrink-0" />
                        <span>{metric}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {proj.tech.map((t, idx) => (
                      <span key={idx} className="tech-pill">{t}</span>
                    ))}
                  </div>

                </div>

                {/* Interactive expand details */}
                <div className="border-t border-stone-900 pt-4 mt-auto">
                  {isExpanded && (
                    <div className="mb-4 text-xs font-mono space-y-3.5 text-stone-400">
                      <div className="border-l-2 border-[var(--lobster-red)] pl-2">
                        <span className="text-stone-300 font-bold block mb-0.5">PROBLEM_STATEMENT:</span>
                        <span className="font-sans leading-relaxed block">{proj.problem}</span>
                      </div>
                      <div className="border-l-2 border-[var(--lobster-red)] pl-2">
                        <span className="text-stone-300 font-bold block mb-0.5">TECHNICAL_SOLUTION:</span>
                        <span className="font-sans leading-relaxed block">{proj.solution}</span>
                      </div>
                      <div className="border-l-2 border-[var(--lobster-red)] pl-2">
                        <span className="text-stone-300 font-bold block mb-0.5">LESSONS_LEARNED:</span>
                        <span className="font-sans leading-relaxed block">{proj.lessons}</span>
                      </div>
                    </div>
                  )}

                  <button 
                    onClick={() => setExpandedId(isExpanded ? null : proj.id)}
                    className="w-full flex items-center justify-between text-xs font-mono text-[var(--lobster-red)] hover:text-red-400 transition-colors uppercase tracking-wider font-bold py-1"
                  >
                    <span>{isExpanded ? "Collapse Details [-]" : "Expand Technical Specs [+]"}</span>
                    <ChevronRight className={`h-4 w-4 transform transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
