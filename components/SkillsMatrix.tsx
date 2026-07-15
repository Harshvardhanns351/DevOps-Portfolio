"use client";

import React, { useState } from "react";
import { Hammer, CheckCircle, HelpCircle, HardDrive, Cpu, Terminal } from "lucide-react";

interface SkillItem {
  name: string;
  level: string; // e.g. "expert", "advanced", "intermediate"
  pct: number;  // level percent
  description: string;
}

interface SkillGroup {
  category: string;
  icon: React.ReactNode;
  packages: SkillItem[];
}

export default function SkillsMatrix() {
  const [selectedPackage, setSelectedPackage] = useState<SkillItem | null>(null);

  const skillsData: SkillGroup[] = [
    {
      category: "INFRASTRUCTURE AS CODE",
      icon: <Hammer className="h-4.5 w-4.5 text-[var(--lobster-red)]" />,
      packages: [
        { name: "Terraform", level: "Expert", pct: 90, description: "Immutable infrastructure configs, custom providers, state locking, module authoring, Sentinel policy gating." },
        { name: "Ansible", level: "Advanced", pct: 75, description: "Automated configuration packages, playbook setups, secure vault integration, baseline hardening." },
        { name: "CloudFormation", level: "Intermediate", pct: 60, description: "Native service deployment scripts on AWS, nested stack setups, change sets enforcement." }
      ]
    },
    {
      category: "CONTAINER ORCHESTRATION",
      icon: <Cpu className="h-4.5 w-4.5 text-[var(--lobster-red)]" />,
      packages: [
        { name: "Kubernetes", level: "Expert", pct: 90, description: "Multi-cluster topology, custom resource definitions (CRD), CoreDNS, Kube-Proxy routing, secure secrets administration." },
        { name: "Docker / Compose", level: "Expert", pct: 95, description: "Multi-stage image optimization, internal bridge overlays, container lifecycle, secure rootless runtime setups." },
        { name: "Docker Swarm", level: "Intermediate", pct: 65, description: "Decentralized task deployments, overlay net routing, simple health management for light instances." }
      ]
    },
    {
      category: "CI/CD & GITOPS PLATFORMS",
      icon: <Terminal className="h-4.5 w-4.5 text-[var(--lobster-red)]" />,
      packages: [
        { name: "GitHub Actions", level: "Expert", pct: 88, description: "Custom workflow scripts, runner tuning, dependency analytics caching, security vulnerability checkers." },
        { name: "ArgoCD", level: "Advanced", pct: 80, description: "Argo sync waivers, health checks, declarative GitOps controller syncing across multi-tenant clusters." },
        { name: "Jenkins Pipelines", level: "Intermediate", pct: 68, description: "Scripted groovy engines, distributed master-agent setups, pipeline status integration APIs." }
      ]
    },
    {
      category: "CLOUD INFRASTRUCTURE",
      icon: <HardDrive className="h-4.5 w-4.5 text-[var(--lobster-red)]" />,
      packages: [
        { name: "AWS", level: "Expert", pct: 90, description: "VPC Networking, Transit Gateway routing, IAM least-privilege configurations, EKS cluster integration, Lambda engines." },
        { name: "GCP", level: "Advanced", pct: 75, description: "GKE deployment topologies, VPC host networks, Cloud IAM, secure cloud storage setups, Cloud Run." },
        { name: "Azure", level: "Intermediate", pct: 60, description: "Active Directory groups integration, scaling sets, virtual network interfaces, compute image repositories." }
      ]
    },
    {
      category: "OBSERVABILITY & LOGGING",
      icon: <CheckCircle className="h-4.5 w-4.5 text-[var(--lobster-red)] text-emerald-505" />,
      packages: [
        { name: "Prometheus", level: "Expert", pct: 85, description: "PromQL queries, custom scrape configurations, metrics exporter hooks, system reliability counters." },
        { name: "Grafana", level: "Expert", pct: 90, description: "Custom telemetry dashboards, alerting integrations, logs matching, EKS cluster performance maps." },
        { name: "ELK Stack", level: "Advanced", pct: 78, description: "Logstash pipelines, Elasticsearch indexing maps, Kibana searches for cloud native logs aggregation." }
      ]
    },
    {
      category: "PROGRAMMING & SCRIPTING",
      icon: <HelpCircle className="h-4.5 w-4.5 text-stone-500" />,
      packages: [
        { name: "Bash Scripting", level: "Expert", pct: 95, description: "Shell scripting, automation automation utilities, network diagnosis tests, container run modules." },
        { name: "Python", level: "Advanced", pct: 82, description: "AWS Boto3 scripting, backend cron processors, REST API endpoints using FastAPI, parsed JSON feeds." },
        { name: "Golang", level: "Intermediate", pct: 55, description: "Static compiled custom binaries, CLI app configurations, light daemon services, basic API routes." }
      ]
    }
  ];

  return (
    <section className="py-20 border-t border-[var(--accent-gray)] bg-[var(--bg-primary)] relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="mb-12">
          <h2 className="text-2xl font-black font-mono uppercase tracking-wider text-[var(--text-primary)]">
            ~/installed-dependencies
          </h2>
          <div className="h-0.5 w-12 bg-[var(--lobster-red)] mt-3"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Block: Packages Tree */}
          <div className="lg:col-span-7 glass-card border border-[var(--accent-gray)] p-6 bg-black/40">
            <div className="mb-4 flex items-center justify-between border-b border-stone-900 pb-3">
              <span className="font-mono text-xs font-bold text-[var(--lobster-red)] tracking-widest uppercase">
                $ package-manager list --depth=1
              </span>
              <span className="text-[10px] font-mono text-stone-550 text-stone-500 font-bold uppercase">
                Status: Verified Configs
              </span>
            </div>

            <div className="space-y-6 font-mono text-xs text-stone-400">
              {skillsData.map((group, idx) => (
                <div key={idx} className="space-y-2">
                  
                  {/* Category Title */}
                  <div className="flex items-center gap-2 text-stone-200 font-bold border-b border-stone-900/60 pb-1 text-[11px] sm:text-xs">
                    {group.icon}
                    <span>┌─ {group.category}</span>
                  </div>

                  {/* Skills packages inside */}
                  <div className="pl-6 space-y-3.5">
                    {group.packages.map((pkg, pIdx) => {
                      const isLast = pIdx === group.packages.length - 1;
                      return (
                        <div 
                          key={pIdx}
                          onClick={() => setSelectedPackage(pkg)}
                          className="group/item flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer py-1 hover:text-[var(--text-primary)] transition-colors"
                        >
                          <div className="flex items-center gap-1">
                            <span className="text-stone-700">{isLast ? "└─" : "├─"}</span>
                            <span className="text-[var(--text-primary)] font-semibold group-hover/item:text-[var(--lobster-red)] transition-colors">
                              {pkg.name}
                            </span>
                            <span className="text-stone-600 text-[10px]">({pkg.level})</span>
                          </div>

                          {/* stark progress bar */}
                          <div className="flex items-center gap-2 mt-1 sm:mt-0">
                            <span className="text-[10px] text-stone-650 text-stone-500 font-mono hidden md:inline">
                              {"█".repeat(Math.round(pkg.pct / 10))}
                              {"░".repeat(10 - Math.round(pkg.pct / 10))}
                            </span>
                            <span className="text-[10px] font-bold text-stone-500 group-hover/item:text-[var(--lobster-red)]">
                              {pkg.pct}%
                            </span>
                          </div>

                        </div>
                      );
                    })}
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Right Block: Selected Package Metadata Inspector */}
          <div className="lg:col-span-5 glass-card border border-[var(--accent-gray)] p-6 bg-black/40 h-full flex flex-col justify-between">
            <div>
              <div className="mb-4 border-b border-stone-900 pb-3 flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[var(--text-primary)] tracking-wider">
                  PACKAGE_METADATA_INSPECTOR
                </span>
                <span className="text-[10px] font-mono bg-red-950/40 border border-red-900/30 px-2 py-0.5 rounded text-[var(--lobster-red)] font-semibold uppercase">
                  info
                </span>
              </div>

              {selectedPackage ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-mono text-base font-bold text-[var(--lobster-red)]">
                      {selectedPackage.name}
                    </h4>
                    <div className="flex gap-4 font-mono text-[10px] text-stone-500 mt-1">
                      <span>LEVEL: {selectedPackage.level}</span>
                      <span>COMPAT: K8S_SUITE</span>
                    </div>
                  </div>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-sans mt-3">
                    {selectedPackage.description}
                  </p>

                  <div className="pt-4 border-t border-stone-900 font-mono text-[10px] text-stone-400 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-stone-500">PKG_STATUS:</span>
                      <span className="text-emerald-500 font-semibold uppercase">DEPLOYED_STABLE</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">INTEGRITY_CHECK:</span>
                      <span className="text-emerald-500 font-semibold">100% SECURE</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">AUTO_SCALE:</span>
                      <span className="text-stone-300">ENABLED</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Terminal className="h-10 w-10 text-stone-700 mx-auto mb-3" />
                  <p className="font-mono text-xs text-stone-500 uppercase tracking-widest leading-relaxed">
                    SELECT A DEPENDENCY ON<br/>THE LEFT TO METRIC INFO
                  </p>
                </div>
              )}
            </div>

            <div className="mt-8 pt-4 border-t border-stone-850 font-mono text-[10px] text-stone-500">
              * Click individual packages like Terraform or Kubernetes inside directory tree map to unpack technical specifications details.
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
