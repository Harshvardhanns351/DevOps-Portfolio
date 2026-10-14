"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, ArrowDown, Mail } from "lucide-react";
import { FaGithub } from "react-icons/fa";

/* ── Neural-net canvas background ───────────────── */
function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const particles: { x: number; y: number; vx: number; vy: number }[] = [];
    const N = 55;
    const mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    for (let i = 0; i < N; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,46,46,0.45)";
        ctx.fill();
      });

      // Draw particle-to-particle connections
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255,46,46,${(1 - dist / 130) * 0.12})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw particle-to-mouse connections
      if (mouse.x > -1000 && mouse.y > -1000) {
        particles.forEach((p) => {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(255,46,46,${(1 - dist / 150) * 0.28})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      }

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}


/* ── Animated counter ────────────────────────────── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let start = 0;
      const step = () => {
        start += Math.ceil((to - start) / 8);
        setVal(Math.min(start, to));
        if (start < to) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ── Terminal data ───────────────────────────────── */
interface Step { command: string; output: string | (() => React.ReactNode); delay: number; }

const MiniTable = ({ cols, rows }: { cols: string[]; rows: string[][] }) => (
  <div className="font-mono text-[10px] mt-1.5 border border-[var(--accent-gray)] rounded-lg overflow-hidden">
    <div className="grid bg-white/[0.03] border-b border-[var(--accent-gray)] px-3 py-1.5 text-[var(--text-muted)] font-bold"
      style={{ gridTemplateColumns: `repeat(${cols.length}, 1fr)` }}>
      {cols.map((c) => <span key={c}>{c}</span>)}
    </div>
    {rows.map((row, i) => (
      <div key={i} className="grid px-3 py-1.5 border-b border-[var(--accent-gray)] last:border-0"
        style={{ gridTemplateColumns: `repeat(${cols.length}, 1fr)` }}>
        {row.map((cell, j) => (
          <span key={j} className={
            j === 0 ? "text-[var(--lobster-red)]" :
            ["Running","Ready"].includes(cell) || cell.startsWith("Up") ? "text-emerald-400" :
            "text-[var(--text-secondary)]"
          }>{cell}</span>
        ))}
      </div>
    ))}
  </div>
);

const commandFlow: Step[] = [
  { command: 'echo "Initializing HVS DevOps Console..."', output: "Boot sequence complete — TLS 1.3 session authorized.", delay: 600 },
  { command: "whoami", output: "Harshavardhan S  ·  Cloud & DevOps Engineer  ·  Infrastructure Architect", delay: 800 },
  {
    command: "docker ps --format table",
    output: () => <MiniTable cols={["CONTAINER","IMAGE","STATUS","NAME"]} rows={[
      ["cf822bd840aa","eks-micro:v2.1","Up 47h","eks-prod-api"],
      ["fa1009cf29bb","argocd:v1.9","Running","argocd-sync"],
      ["229bbf949d01","grafana:v3","Up 14d","sys-observe"],
    ]} />,
    delay: 1000,
  },
  {
    command: "kubectl get nodes -o wide",
    output: () => <MiniTable cols={["NAME","STATUS","ROLE","VERSION"]} rows={[
      ["harsh-master-01","Ready","control-plane","v1.28.2"],
      ["harsh-worker-01","Ready","worker","v1.28.2"],
    ]} />,
    delay: 1200,
  },
  {
    command: "terraform apply -auto-approve",
    output: () => (
      <div className="text-[10px] font-mono mt-1 space-y-0.5">
        <div className="text-[var(--text-muted)]">aws_vpc.main: Creating…</div>
        <div className="text-emerald-400">aws_vpc.main: Creation complete [ID: vpc-0fa2e89d8f]</div>
        <div className="text-[var(--text-muted)]">aws_eks_cluster.prod: Creating…</div>
        <div className="text-emerald-400">aws_eks_cluster.prod: Creation complete [ID: hvs-k8s-prod]</div>
        <div className="text-[var(--lobster-red)] font-bold mt-1">Apply complete! 18 added, 0 changed, 0 destroyed.</div>
      </div>
    ),
    delay: 1400,
  },
];

/* ── Tech orbit visualization ────────────────────── */
const techStack = [
  { label: "Kubernetes", color: "#3B82F6", icon: "K8s",  r: 155, angle: 0 },
  { label: "Terraform",  color: "#8B5CF6", icon: "TF",   r: 155, angle: 72 },
  { label: "Docker",     color: "#06B6D4", icon: "🐳",   r: 155, angle: 144 },
  { label: "AWS",        color: "#F59E0B", icon: "AWS",  r: 155, angle: 216 },
  { label: "ArgoCD",     color: "#FF2E2E", icon: "Argo", r: 155, angle: 288 },
  { label: "Prometheus", color: "#E05A00", icon: "Prom", r: 95,  angle: 36 },
  { label: "Grafana",    color: "#FF6B35", icon: "Graf", r: 95,  angle: 108 },
  { label: "GitHub",     color: "#F1F2F6", icon: "GH",   r: 95,  angle: 180 },
  { label: "Python",     color: "#22C55E", icon: "Py",   r: 95,  angle: 252 },
  { label: "Bash",       color: "#10B981", icon: "Bash", r: 95,  angle: 324 },
];

function TechOrbit() {
  const cx = 220, cy = 220;

  return (
    <div className="relative w-full" style={{ maxWidth: 440, aspectRatio: "1" }}>

      {/* Outer glow */}
      <div className="absolute inset-0 rounded-full bg-[var(--lobster-red)]/4 blur-[60px] pointer-events-none" />

      <svg viewBox="0 0 440 440" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* Orbit ring 1 */}
        <circle cx={cx} cy={cy} r="155" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="4 6" />
        {/* Orbit ring 2 */}
        <circle cx={cx} cy={cy} r="95" fill="none" stroke="rgba(255,46,46,0.08)" strokeWidth="1" strokeDasharray="3 5" />
        {/* Orbit ring 3 — innermost */}
        <circle cx={cx} cy={cy} r="48" fill="none" stroke="rgba(255,46,46,0.12)" strokeWidth="1" />

        {/* Central HVS core */}
        <circle cx={cx} cy={cy} r="44" fill="#0A0A0E" stroke="rgba(255,46,46,0.35)" strokeWidth="1.5" />
        <circle cx={cx} cy={cy} r="38" fill="url(#coreGrad)" opacity="0.9" />
        <text x={cx} y={cy+6} textAnchor="middle" fill="#F1F2F6"
          fontSize="15" fontWeight="900" fontFamily="JetBrains Mono, monospace">HVS</text>

        {/* Outer orbit nodes */}
        {techStack.map((t, i) => {
          const rad = (t.angle * Math.PI) / 180;
          const x = cx + t.r * Math.cos(rad);
          const y = cy + t.r * Math.sin(rad);
          const isOuter = t.r > 100;
          const nodeR = isOuter ? 24 : 20;
          return (
            <g key={t.label}>
              {/* Connection line to centre */}
              <line x1={cx} y1={cy} x2={x} y2={y}
                stroke={t.color} strokeWidth="0.5" opacity="0.15" />
              {/* Node circle */}
              <circle cx={x} cy={y} r={nodeR}
                fill="#0A0A0E" stroke={t.color} strokeWidth="1.5" opacity="0.9" />
              {/* Label */}
              <text x={x} y={y + 4} textAnchor="middle"
                fill={t.color} fontSize={isOuter ? "7.5" : "7"}
                fontWeight="700" fontFamily="JetBrains Mono, monospace">
                {t.icon}
              </text>
            </g>
          );
        })}

        <defs>
          <radialGradient id="coreGrad" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#FF2E2E" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#0A0A0E" stopOpacity="0.8" />
          </radialGradient>
        </defs>
      </svg>

      {/* Animated outer ring — CSS rotation */}
      <div className="absolute inset-0 pointer-events-none" style={{ animation: "spin-cw 28s linear infinite" }}>
        <svg viewBox="0 0 440 440" className="w-full h-full">
          <circle cx="220" cy="220" r="155" fill="none"
            stroke="url(#ringGrad)" strokeWidth="1.5"
            strokeDasharray="30 320" strokeLinecap="round" />
          <defs>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF2E2E" stopOpacity="0" />
              <stop offset="50%" stopColor="#FF2E2E" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FF2E2E" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Animated inner ring — reverse rotation */}
      <div className="absolute inset-0 pointer-events-none" style={{ animation: "spin-ccw 18s linear infinite" }}>
        <svg viewBox="0 0 440 440" className="w-full h-full">
          <circle cx="220" cy="220" r="95" fill="none"
            stroke="url(#ringGrad2)" strokeWidth="1.5"
            strokeDasharray="20 180" strokeLinecap="round" />
          <defs>
            <linearGradient id="ringGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0" />
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Floating badge labels around outer nodes */}
      {techStack.filter(t => t.r > 100).map((t) => {
        const rad = (t.angle * Math.PI) / 180;
        const x = 220 + t.r * Math.cos(rad);
        const y = 220 + t.r * Math.sin(rad);
        // offset label outward
        const lx = 220 + (t.r + 40) * Math.cos(rad);
        const ly = 220 + (t.r + 40) * Math.sin(rad);
        const pct = `${((lx / 440) * 100).toFixed(1)}%`;
        const pct2 = `${((ly / 440) * 100).toFixed(1)}%`;
        return (
          <div
            key={t.label + "-label"}
            className="absolute text-[9px] font-mono font-bold pointer-events-none"
            style={{ left: pct, top: pct2, transform: "translate(-50%,-50%)", color: t.color, opacity: 0.65 }}
          >
            {t.label}
          </div>
        );
      })}
    </div>
  );
}

/* ── Hero ────────────────────────────────────────── */
export default function TerminalHero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start","end start"] });
  const yText   = useTransform(scrollYProgress, [0,1], ["0%","18%"]);
  const opacity = useTransform(scrollYProgress, [0,0.6], [1, 0]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-bg py-24 px-5">

      {/* Neural network canvas */}
      <NeuralCanvas />

      {/* Ambient blobs */}
      <div className="pointer-events-none absolute top-[10%] left-[5%]  h-96 w-96 morph-blob bg-[var(--lobster-red)]/6 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-[10%] right-[5%] h-[28rem] w-[28rem] morph-blob bg-[var(--deep-red)]/6 blur-[150px]" style={{ animationDelay: "-4s" }} />

      {/* Scan line */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--lobster-red)]/20 to-transparent" style={{ animation: "scan-line 8s linear infinite" }} />
      </div>

      <motion.div style={{ y: yText, opacity }} className="relative z-10 w-full max-w-[1400px] mx-auto px-6 xl:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-14">

          {/* ── Left: Personal intro ───────────────── */}
          <div className="flex-1 flex flex-col items-start">

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="mb-7 flex items-center gap-2.5 px-4 py-2 rounded-full border border-[var(--accent-gray)] bg-white/[0.025]"
            >
              <span className="status-dot online" />
              <span className="font-mono text-[11px] font-semibold tracking-[0.15em] text-[var(--text-secondary)] uppercase">
                Open to opportunities
              </span>
            </motion.div>

            {/* Photo + Name row */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.18 }}
              className="flex items-center gap-5 mb-6"
            >
              {/* Profile photo — replace src with your actual photo path e.g. /photo.jpg */}
              <div className="relative shrink-0">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-[var(--accent-gray)] bg-gradient-to-br from-[var(--lobster-red)]/20 to-[var(--deep-red)]/20">
                  {/* If you have a photo: <img src="/photo.jpg" alt="Harshavardhan S" className="w-full h-full object-cover" /> */}
                  {/* Placeholder monogram */}
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-black text-2xl gradient-text font-mono select-none">HS</span>
                  </div>
                </div>
                {/* Online indicator */}
                <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-[var(--bg-primary)] flex items-center justify-center">
                  <span className="w-2 h-2 bg-emerald-300 rounded-full animate-ping absolute" />
                  <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                </span>
              </div>

              <div>
                <h2 className="text-2xl font-black tracking-tight text-[var(--text-primary)] leading-tight">
                  Harshavardhan S
                </h2>
                <p className="text-sm text-[var(--text-secondary)] mt-1 font-medium">
                  Cloud DevOps Engineer&nbsp;
                  <span className="text-[var(--text-muted)]">·</span>&nbsp;
                  3rd Year CS Student
                </p>
              </div>
            </motion.div>

            {/* Big headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.26 }}
              className="text-[clamp(2.6rem,7vw,5.2rem)] font-black leading-[0.92] tracking-tighter mb-6"
            >
              AUTOMATE<br />
              PROVISION<br />
              <span className="gradient-text">SCALE.</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.36 }}
              className="text-[var(--text-secondary)] text-base leading-relaxed max-w-md mb-9"
            >
              Building resilient cloud infrastructure through container orchestration,
              declarative GitOps pipelines, and multi-cloud automation —
              turning complex deployments into repeatable, auditable processes.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.45 }}
              className="flex flex-wrap gap-3 mb-12"
            >
              <a href="#projects" className="btn-primary gap-2">
                <Play className="h-4 w-4 fill-current" /> View My Work
              </a>
              <a href="#contact" className="btn-outline gap-2">
                <Mail className="h-4 w-4" /> Contact Me
              </a>
              <a href="https://github.com/Harshvardhanns351" target="_blank" rel="noopener noreferrer"
                className="btn-outline gap-2">
                <FaGithub className="h-4 w-4" /> GitHub
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.54 }}
              className="flex gap-8"
            >
              {[
                { to: 4,  suffix: "+", label: "Projects shipped" },
                { to: 3,  suffix: "",  label: "Certifications" },
                { to: 60, suffix: "%", label: "Latency reduced" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="text-3xl font-black text-[var(--text-primary)] leading-none">
                    <Counter to={s.to} suffix={s.suffix} />
                  </span>
                  <span className="text-xs text-[var(--text-muted)] mt-1.5 font-mono">{s.label}</span>
                </div>
              ))}
            </motion.div>

          </div>

          {/* ── Right: Animated tech visualization ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="flex-1 w-full max-w-xl flex items-center justify-center relative"
            style={{ minHeight: 460 }}
          >
            <TechOrbit />
          </motion.div>

        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--text-muted)] uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown className="h-4 w-4 text-[var(--text-muted)]" />
        </motion.div>
      </motion.div>

    </section>
  );
}
