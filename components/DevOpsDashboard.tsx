"use client";

import React, { useState } from "react";
import { Network, Server, HardDrive, Database, Shield, Radio, Activity, Terminal } from "lucide-react";

interface NodeDetail {
  title: string;
  desc: string;
  config: string;
  status: "ONLINE" | "WARN" | "SYNCING";
}

export default function DevOpsDashboard() {
  const [activeNode, setActiveNode] = useState<string>("eks");

  const nodeDetails: Record<string, NodeDetail> = {
    client: {
      title: "Client Endpoint / Ingress User",
      desc: "Represents secure client requests initiating connection to high-availability routes.",
      config: `curl -I https://harsh.engineer\nHTTP/2 200 OK\nserver: cloudflare\ndate: ${new Date().toUTCString()}\ncontent-type: text/html`,
      status: "ONLINE",
    },
    cdn: {
      title: "CloudFront / Edge CDN Cache",
      desc: "Distributed caching nodes with automatic DDoS throttling and SSL/TLS profile acceleration.",
      config: `{\n  "CDNId": "CF_EDGE_PROD",\n  "CachePolicy": "CachingOptimized",\n  "OriginShield": "Enabled",\n  "ViewerProtocolPolicy": "redirect-to-https"\n}`,
      status: "ONLINE",
    },
    alb: {
      title: "Application Load Balancer",
      desc: "Route-based L7 load balancing to forward requests to targets inside cluster subnets.",
      config: `kind: TargetGroupBinding\nmetadata:\n  name: k8s-api-tg\nspec:\n  targetGroupARN: arn:aws:elasticloadbalancing:...\n  serviceRef:\n    name: api-cluster-srv\n    port: 80`,
      status: "ONLINE",
    },
    eks: {
      title: "EKS Cluster Control Plane",
      desc: "High availability Kubernetes master node managing worker pod replicas via horizontal pod autoscaling.",
      config: `$ kubectl get pods -n prod\nNAME                     READY   STATUS    RESTARTS\nprod-api-cf859b-nd912    1/1     Running   0\nprod-api-cf859b-xk812    1/1     Running   0\nprod-worker-28bfa-jk2b   1/1     Running   0`,
      status: "ONLINE",
    },
    db: {
      title: "Aurora Serverless PostgreSQL",
      desc: "Multi-AZ active standby database cluster with sub-second replication and automated backup snapshots.",
      config: `{\n  "Engine": "aurora-postgresql",\n  "EngineVersion": "15.3",\n  "InstanceClass": "db.serverless.v2",\n  "MaxCapacity": 8.0,\n  "BackupRetentionPeriod": 7\n}`,
      status: "ONLINE",
    },
    tf: {
      title: "Terraform Cloud Gating",
      desc: "Infrastructure Provisioner checking states and drift configurations before commit merge.",
      config: `# Terraform execution plan\nterraform plan -out=tfplan\nPlan: 3 to add, 1 to change, 0 to destroy.\nState Lock: [Acquired Successfully]`,
      status: "SYNCING",
    },
  };

  return (
    <section id="architecture" className="py-20 border-t border-[var(--accent-gray)] bg-[var(--bg-primary)] ring-stone-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="mb-12">
          <h2 className="text-2xl font-black font-mono uppercase tracking-wider text-[var(--text-primary)]">
            ~/infrastructure-observability
          </h2>
          <div className="h-0.5 w-12 bg-[var(--lobster-red)] mt-3"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Block: Interactive SVG Architecture Grid */}
          <div className="lg:col-span-7 glass-card border border-[var(--accent-gray)] p-6 bg-black/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-mono text-xs font-bold text-[var(--lobster-red)] tracking-widest uppercase flex items-center gap-1.5">
                  <Activity className="h-4 w-4 animate-pulse" /> LIVE_VPC_ARCHITECTURE_MAP
                </h3>
                <span className="text-[10px] font-mono text-stone-500">
                  CLICK NODES TO INSPECT CONFIG
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] mb-6">
                Interactive cloud routing overview. Animate paths reflect mock deployment configurations.
              </p>
            </div>

            {/* Live Interactive SVG Diagram */}
            <div className="relative w-full bg-black/50 border border-stone-900 rounded-xl p-4 flex items-center justify-center min-h-[300px] overflow-x-auto">
              
              <svg 
                className="w-full max-w-[600px] h-auto font-mono text-[9px] select-none"
                viewBox="0 0 600 300"
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Connection paths / data streams */}
                {/* Client -> CDN */}
                <line x1="80" y1="150" x2="160" y2="150" stroke={activeNode === "client" || activeNode === "cdn" ? "#FF2E2E" : "#1A1A1E"} strokeWidth="2" strokeDasharray="4 4" className="stroke-dash-flow" />
                
                {/* CDN -> ALB */}
                <path d="M 220 150 L 290 150" stroke={activeNode === "cdn" || activeNode === "alb" ? "#FF2E2E" : "#1A1A1E"} strokeWidth="2" strokeDasharray="4 4" />
                
                {/* ALB -> EKS */}
                <path d="M 350 150 L 413 150" stroke={activeNode === "alb" || activeNode === "eks" ? "#FF2E2E" : "#1A1A1E"} strokeWidth="2" />
                
                {/* EKS -> RDS DB */}
                <path d="M 490 150 L 535 150" stroke={activeNode === "eks" || activeNode === "db" ? "#FF2E2E" : "#1A1A1E"} strokeWidth="2" strokeDasharray="4 4" />
                
                {/* Terraform provisioning overlay */}
                <path d="M 450 70 L 450 110" stroke={activeNode === "tf" ? "#FF2E2E" : "#1A1A1E"} strokeWidth="1.5" strokeDasharray="3 3" />

                {/* Nodes */}
                
                {/* Client Node */}
                <g className="cursor-pointer" onClick={() => setActiveNode("client")}>
                  <rect x="20" y="115" width="60" height="70" rx="6" fill="#0A0A0B" stroke={activeNode === "client" ? "#FF2E2E" : "#1F1F22"} strokeWidth="1.5" />
                  <text x="50" y="145" fill={activeNode === "client" ? "#FF2E2E" : "#9CA3AF"} textAnchor="middle" fontWeight="bold">CLIENT</text>
                  <text x="50" y="162" fill="#4B5563" textAnchor="middle">TLS 1.3</text>
                </g>

                {/* CDN Cache Node */}
                <g className="cursor-pointer" onClick={() => setActiveNode("cdn")}>
                  <rect x="160" y="115" width="60" height="70" rx="6" fill="#0A0A0B" stroke={activeNode === "cdn" ? "#FF2E2E" : "#1F1F22"} strokeWidth="1.5" />
                  <text x="190" y="145" fill={activeNode === "cdn" ? "#FF2E2E" : "#9CA3AF"} textAnchor="middle" fontWeight="bold">CLOUDFRONT</text>
                  <text x="190" y="162" fill="#4B5563" textAnchor="middle">EDGE CAST</text>
                </g>

                {/* ALB Load Balancer Node */}
                <g className="cursor-pointer" onClick={() => setActiveNode("alb")}>
                  <rect x="290" y="115" width="60" height="70" rx="6" fill="#0A0A0B" stroke={activeNode === "alb" ? "#FF2E2E" : "#1F1F22"} strokeWidth="1.5" />
                  <text x="320" y="145" fill={activeNode === "alb" ? "#FF2E2E" : "#9CA3AF"} textAnchor="middle" fontWeight="bold">AWS ALB</text>
                  <text x="320" y="162" fill="#4B5563" textAnchor="middle">L7 ROUTE</text>
                </g>

                {/* Terraform Deploy Provisioner (Top overlay) */}
                <g className="cursor-pointer" onClick={() => setActiveNode("tf")}>
                  <rect x="413" y="15" width="75" height="50" rx="6" fill="#0A0A0B" stroke={activeNode === "tf" ? "#FF2E2E" : "#1F1F22"} strokeWidth="1.5" />
                  <text x="450" y="42" fill={activeNode === "tf" ? "#FF2E2E" : "#9CA3AF"} textAnchor="middle" fontWeight="bold">TERRAFORM</text>
                  <text x="450" y="55" fill="#4B5563" textAnchor="middle">INFRA STATE</text>
                </g>

                {/* EKS Kubernetes Pod Array Node */}
                <g className="cursor-pointer" onClick={() => setActiveNode("eks")}>
                  <rect x="413" y="110" width="77" height="80" rx="6" fill="#0A0A0B" stroke={activeNode === "eks" ? "#FF2E2E" : "#1F1F22"} strokeWidth="1.5" />
                  <text x="451" y="140" fill={activeNode === "eks" ? "#FF2E2E" : "#9CA3AF"} textAnchor="middle" fontWeight="bold">EKS CLUSTER</text>
                  <text x="451" y="158" fill="#10B981" textAnchor="middle">3 REPLICAS</text>
                  <text x="451" y="175" fill="#4B5563" textAnchor="middle">DOCKER PODS</text>
                </g>

                {/* Aurora RDS Node */}
                <g className="cursor-pointer" onClick={() => setActiveNode("db")}>
                  <rect x="535" y="115" width="55" height="70" rx="6" fill="#0A0A0B" stroke={activeNode === "db" ? "#FF2E2E" : "#1F1F22"} strokeWidth="1.5" />
                  <text x="562" y="145" fill={activeNode === "db" ? "#FF2E2E" : "#9CA3AF"} textAnchor="middle" fontWeight="bold">AURORA</text>
                  <text x="562" y="162" fill="#4B5563" textAnchor="middle">POSTGRES</text>
                </g>
              </svg>

            </div>

            <div className="mt-4 flex gap-4 text-[10px] text-stone-500 font-mono">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[var(--lobster-red)]"></span> Active Channel</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1E]"></span> Offline Route</span>
            </div>
          </div>

          {/* Right Block: Live Node Specs Inspector Console */}
          <div className="lg:col-span-5 glass-card border border-[var(--accent-gray)] p-6 bg-black/40 flex flex-col justify-between">
            
            <div className="space-y-4">
              
              <div className="flex items-center justify-between border-b border-stone-900 pb-3">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4.5 w-4.5 text-[var(--lobster-red)]" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                    INSPECTOR_CONSOLE
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-stone-500">
                  <span>PING:</span>
                  <span className="text-emerald-500">{nodeDetails[activeNode].status}</span>
                </div>
              </div>

              <div>
                <h4 className="font-mono text-xs font-bold text-[var(--lobster-red)]">
                  &gt; {nodeDetails[activeNode].title}
                </h4>
                <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed font-sans">
                  {nodeDetails[activeNode].desc}
                </p>
              </div>

              <div>
                <span className="font-mono text-[10px] text-stone-500 uppercase block mb-1">
                  JSON Config / Terminal State:
                </span>
                <pre className="font-mono text-[11px] text-stone-300 bg-stone-950/80 border border-stone-900 rounded-lg p-3.5 overflow-x-auto select-all leading-normal">
                  <code>{nodeDetails[activeNode].config}</code>
                </pre>
              </div>

            </div>

            <div className="mt-6 font-mono text-[10px] text-stone-500 border-t border-stone-900 pt-4">
              * Click cluster nodes mapping elements inside VPC diagram to inspect specific microservice logs.
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
