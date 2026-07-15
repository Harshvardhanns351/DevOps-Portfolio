"use client";

import React from "react";
import { ShieldAlert, Award, Layers, Zap, Clock, ShieldCheck } from "lucide-react";

export default function SystemSpecs() {
  const specs = [
    { label: "USER IDENTITY", value: "Harshvardhan NS" },
    { label: "KERNEL VERSION", value: "DevOps Suite v6.2-k8s" },
    { label: "CLOUD ENGINE", value: "AWS / GCP Multi-Cluster" },
    { label: "CONTAINER RUN", value: "Docker / containerd" },
    { label: "IAS PROVISION", value: "Terraform Cloud Enterprise" },
    { label: "MONITOR LOAD", value: "Prometheus + Grafana" },
  ];

  const certificates = [
    { name: "AWS Certified Solutions Architect", authority: "Amazon Web Services", code: "VALIDATED" },
    { name: "Certified Kubernetes Administrator (CKA)", authority: "Cloud Native Computing Foundation", code: "VALIDATED" },
    { name: "HashiCorp Certified: Terraform Associate", authority: "HashiCorp", code: "ACTIVE" },
  ];

  return (
    <section id="about" className="py-20 border-t border-[var(--accent-gray)] bg-[var(--bg-secondary)] relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="mb-12">
          <h2 className="text-2xl font-black font-mono uppercase tracking-wider text-[var(--text-primary)]">
            ~/system-specs
          </h2>
          <div className="h-0.5 w-12 bg-[var(--lobster-red)] mt-3"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Grid Panel: System Specs Terminal Block */}
          <div className="lg:col-span-5 w-full glass-card border border-[var(--accent-gray)] rounded-xl overflow-hidden p-6 bg-black/40">
            <h3 className="font-mono text-xs font-bold text-[var(--lobster-red)] tracking-widest uppercase mb-4 flex items-center gap-2">
              <Layers className="h-4 w-4" /> SPECS_SPECIFICATION_MATRIX
            </h3>
            
            <div className="border border-stone-900 rounded p-1 font-mono text-[10px] sm:text-xs">
              <div className="p-2 border-b border-stone-900 bg-stone-950 font-bold flex items-center justify-between text-[var(--text-secondary)]">
                <span>PARAMETER</span>
                <span>STATE</span>
              </div>
              {specs.map((spec, idx) => (
                <div 
                  key={idx} 
                  className={`flex justify-between p-2.5 font-mono ${
                    idx % 2 === 0 ? "bg-black/30" : "bg-transparent"
                  } border-b border-stone-900 last:border-0`}
                >
                  <span className="text-[var(--text-secondary)] font-medium">│ {spec.label}</span>
                  <span className="text-[var(--text-primary)] font-bold">{spec.value}</span>
                </div>
              ))}
            </div>

            {/* Simulated Specs Graph bar */}
            <div className="mt-6">
              <span className="font-mono text-[10px] text-[var(--text-secondary)] uppercase tracking-wider block mb-2">
                Memory Buffer Allocations (Packages Cache)
              </span>
              <div className="w-full bg-stone-950 h-5 border border-stone-850 rounded overflow-hidden flex font-mono text-[10px] font-bold text-center leading-5 text-black">
                <div className="bg-[var(--lobster-red)] h-full" style={{ width: "45%" }}>45% K8s</div>
                <div className="bg-[var(--deep-red)] h-full text-white" style={{ width: "35%" }}>35% AWS</div>
                <div className="bg-stone-800 h-full text-stone-400" style={{ width: "20%" }}>20% SEC</div>
              </div>
            </div>
          </div>

          {/* Right Grid Panel: Professional Narrative & Certificates */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* About text styling */}
            <div className="glass-card border border-[var(--accent-gray)] p-6 space-y-4">
              <h3 className="font-bold text-lg text-[var(--text-primary)] tracking-wide">
                Architecting Resilient Orchestrated Infrastructure
              </h3>
              <p className="text-[var(--text-secondary)] text-sm sm:text-[15px] leading-relaxed">
                As a Cloud & DevOps engineer, I focus on the critical alignment between code and execution engines. I eliminate manual configuration drift using declarative GitOps models and cloud-agnostic Infrastructure as Code patterns.
              </p>
              <p className="text-[var(--text-secondary)] text-sm sm:text-[15px] leading-relaxed">
                My pipeline designs emphasize reliability and rapid verification cycles—leveraging container security scanning, automated configuration gating, and metrics logging to ensure that code can deploy to production securely and immediately.
              </p>
            </div>

            {/* Certifications Card */}
            <div className="glass-card border border-[var(--accent-gray)] p-6">
              <div className="flex items-center gap-2 mb-4">
                <Award className="h-5 w-5 text-[var(--lobster-red)]" />
                <h4 className="font-mono text-xs font-bold text-[var(--text-primary)] tracking-wider uppercase">
                  VERIFIED_CERTIFICATIONS (LIVE STATUS)
                </h4>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {certificates.map((cert, index) => (
                  <div 
                    key={index}
                    className="flex justify-between items-center p-3 border border-stone-850 bg-black/40 rounded hover:border-[var(--lobster-red)]/30 transition-all duration-200"
                  >
                    <div>
                      <div className="font-bold text-stone-200 text-[11px] sm:text-xs">
                        {cert.name}
                      </div>
                      <div className="text-[10px] text-stone-500 mt-0.5">
                        Issuer: {cert.authority}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] bg-red-950/40 border border-red-900/30 px-2 py-0.5 rounded text-[var(--lobster-red)] font-semibold">
                      <ShieldCheck className="h-3 w-3" />
                      {cert.code}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
