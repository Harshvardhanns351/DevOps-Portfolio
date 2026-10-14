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

/* ── 3D Cloud Infrastructure Visualization ──────── */
function CloudScene() {
  // Mouse parallax
  const [mouse, setMouse] = React.useState({ x: 0, y: 0 });
  React.useEffect(() => {
    const fn = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth  - 0.5) * 18,
        y: (e.clientY / window.innerHeight - 0.5) * 12,
      });
    };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  return (
    <div className="relative w-full select-none" style={{ maxWidth: 500, aspectRatio: "1 / 1.05" }}>

      {/* ── Ambient depth glows ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] left-[20%] w-48 h-48 rounded-full bg-[var(--lobster-red)]/12 blur-[70px]" />
        <div className="absolute bottom-[15%] right-[15%] w-40 h-40 rounded-full bg-[#8B5CF6]/12 blur-[60px]" />
        <div className="absolute top-[55%] left-[10%] w-32 h-32 rounded-full bg-[#06B6D4]/10 blur-[50px]" />
      </div>

      {/* ── 3D perspective wrapper ── */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotateX: -mouse.y * 0.4, rotateY: mouse.x * 0.4 }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
        style={{ perspective: 900, transformStyle: "preserve-3d" }}
      >

        {/* ── Isometric grid floor ── */}
        <motion.div
          className="absolute bottom-[5%] left-1/2 -translate-x-1/2"
          style={{ width: 360, height: 180, transformStyle: "preserve-3d" }}
          animate={{ rotateX: [60, 62, 60] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 360 180" width="360" height="180" className="opacity-20">
            <defs>
              <pattern id="grid3d" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,46,46,0.5)" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="360" height="180" fill="url(#grid3d)" />
            <rect width="360" height="180" fill="url(#floorFade)" />
            <defs>
              <radialGradient id="floorFade" cx="50%" cy="50%" r="70%">
                <stop offset="0%" stopColor="#020204" stopOpacity="0"/>
                <stop offset="100%" stopColor="#020204" stopOpacity="0.95"/>
              </radialGradient>
            </defs>
          </svg>
        </motion.div>

        {/* ── Server rack — back left ── */}
        <motion.div
          className="absolute"
          style={{ left: "4%", top: "18%", transformStyle: "preserve-3d" }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0 }}
        >
          <ServerRack color="#FF2E2E" label="EKS-PROD" status="ONLINE" utilization={88} delay={0} />
        </motion.div>

        {/* ── Server rack — back right ── */}
        <motion.div
          className="absolute"
          style={{ right: "4%", top: "12%", transformStyle: "preserve-3d" }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          <ServerRack color="#8B5CF6" label="TF-CLOUD" status="SYNCING" utilization={62} delay={0.3} />
        </motion.div>

        {/* ── Floating metric cards ── */}
        <motion.div
          className="absolute"
          style={{ left: "50%", top: "6%", x: "-50%" }}
          animate={{ y: [0, -10, 0], rotateZ: [-1, 1, -1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <MetricCard label="CPU Load" value="14%" trend="↓" color="#10B981" icon="⚡" />
        </motion.div>

        <motion.div
          className="absolute"
          style={{ left: "5%", bottom: "28%" }}
          animate={{ y: [0, -7, 0], rotateZ: [1, -1, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        >
          <MetricCard label="Pods" value="24/24" trend="✓" color="#3B82F6" icon="☸" />
        </motion.div>

        <motion.div
          className="absolute"
          style={{ right: "5%", bottom: "30%" }}
          animate={{ y: [0, -9, 0], rotateZ: [-0.5, 0.5, -0.5] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        >
          <MetricCard label="Uptime" value="99.9%" trend="↑" color="#F59E0B" icon="☁" />
        </motion.div>

        {/* ── Central 3D core sphere ── */}
        <motion.div
          className="absolute left-1/2 top-[34%] -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.04, 1],
            rotate: [0, 360],
          }}
          transition={{
            scale:  { duration: 3, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          }}
        >
          <CoreSphere />
        </motion.div>

        {/* ── Animated data stream lines ── */}
        <DataStreams />

        {/* ── Floating tech badges ── */}
        {[
          { label: "Docker",     color: "#06B6D4", x: "14%",  y: "62%", delay: 0 },
          { label: "ArgoCD",    color: "#FF2E2E", x: "76%",  y: "60%", delay: 0.6 },
          { label: "Prometheus",color: "#E05A00", x: "42%",  y: "76%", delay: 1.1 },
          { label: "Grafana",   color: "#FF6B35", x: "24%",  y: "40%", delay: 0.4 },
          { label: "Kubernetes",color: "#3B82F6", x: "68%",  y: "38%", delay: 0.9 },
        ].map((b) => (
          <motion.div
            key={b.label}
            className="absolute"
            style={{ left: b.x, top: b.y }}
            animate={{ y: [0, -5, 0], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3 + Math.random(), repeat: Infinity, ease: "easeInOut", delay: b.delay }}
          >
            <TechBadge label={b.label} color={b.color} />
          </motion.div>
        ))}

      </motion.div>

    </div>
  );
}

/* ── Sub-components ──────────────────────────────── */

function ServerRack({ color, label, status, utilization, delay }: {
  color: string; label: string; status: string; utilization: number; delay: number;
}) {
  return (
    <div className="relative" style={{ width: 100, perspective: 400 }}>
      {/* 3D box — top face */}
      <div className="absolute -top-2 left-2 right-0 h-2 rounded-sm opacity-60"
        style={{ background: color, transform: "rotateX(-60deg) scaleY(0.4)", transformOrigin: "bottom" }} />
      {/* 3D box — right face */}
      <div className="absolute top-0 -right-2 bottom-0 w-2 rounded-sm opacity-30"
        style={{ background: color, transform: "rotateY(60deg) scaleX(0.4)", transformOrigin: "left" }} />
      {/* Front face */}
      <div className="rounded-xl border overflow-hidden"
        style={{ background: "rgba(8,8,14,0.95)", borderColor: `${color}50`, width: 100 }}>
        {/* Header */}
        <div className="px-2.5 py-1.5 flex items-center justify-between border-b"
          style={{ borderColor: `${color}30`, background: `${color}12` }}>
          <span className="font-mono text-[8px] font-bold" style={{ color }}>{label}</span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: status === "ONLINE" ? "#10B981" : "#F59E0B" }} />
            <span className="font-mono text-[7px]" style={{ color: status === "ONLINE" ? "#10B981" : "#F59E0B" }}>{status}</span>
          </span>
        </div>
        {/* Drive bays */}
        {[...Array(4)].map((_, i) => (
          <div key={i} className="mx-2 my-1 h-1.5 rounded-full overflow-hidden bg-white/[0.05]">
            <motion.div className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${color}80, ${color})` }}
              initial={{ width: 0 }}
              animate={{ width: `${30 + i * 18}%` }}
              transition={{ duration: 1.2, delay: delay + i * 0.15, ease: "easeOut" }}
            />
          </div>
        ))}
        {/* Utilization */}
        <div className="px-2.5 py-1.5 flex justify-between">
          <span className="font-mono text-[7px] text-[var(--text-muted)]">CPU</span>
          <span className="font-mono text-[7px] font-bold" style={{ color }}>{utilization}%</span>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, trend, color, icon }: {
  label: string; value: string; trend: string; color: string; icon: string;
}) {
  return (
    <div className="rounded-xl border px-3.5 py-2.5 backdrop-blur-xl"
      style={{ background: "rgba(8,8,14,0.85)", borderColor: `${color}35`, minWidth: 90 }}>
      <div className="flex items-center gap-1.5 mb-1">
        <span className="text-sm">{icon}</span>
        <span className="font-mono text-[9px] text-[var(--text-muted)] uppercase tracking-wider">{label}</span>
      </div>
      <div className="flex items-end gap-1.5">
        <span className="font-black text-base leading-none" style={{ color }}>{value}</span>
        <span className="text-xs font-bold mb-0.5" style={{ color }}>{trend}</span>
      </div>
    </div>
  );
}

function TechBadge({ label, color }: { label: string; color: string }) {
  return (
    <div className="rounded-full px-2.5 py-1 border backdrop-blur-sm flex items-center gap-1.5"
      style={{ background: `${color}12`, borderColor: `${color}40` }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
      <span className="font-mono text-[9px] font-bold" style={{ color }}>{label}</span>
    </div>
  );
}

function CoreSphere() {
  return (
    <div className="relative" style={{ width: 90, height: 90 }}>
      {/* Outer glow ring */}
      <div className="absolute inset-[-12px] rounded-full border-2 border-[var(--lobster-red)]/20 animate-ping" style={{ animationDuration: "2.5s" }} />
      <div className="absolute inset-[-6px] rounded-full border border-[var(--lobster-red)]/30" />
      {/* Sphere */}
      <div className="w-full h-full rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,46,46,0.4)]"
        style={{
          background: "radial-gradient(circle at 35% 35%, #FF5050 0%, #CC0000 40%, #4A0000 80%, #0A0A0E 100%)",
          border: "1.5px solid rgba(255,46,46,0.5)",
        }}>
        <span className="font-black text-white text-sm font-mono drop-shadow-lg">HVS</span>
      </div>
      {/* Equator ring */}
      <div className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 rounded-full"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,46,46,0.5), transparent)" }} />
    </div>
  );
}

function DataStreams() {
  const streams = [
    { x1: 20,  y1: 160, x2: 200, y2: 200, color: "#FF2E2E", dur: 2.2 },
    { x1: 380, y1: 140, x2: 220, y2: 195, color: "#8B5CF6", dur: 2.8 },
    { x1: 80,  y1: 300, x2: 200, y2: 210, color: "#10B981", dur: 2.0 },
    { x1: 340, y1: 310, x2: 220, y2: 205, color: "#F59E0B", dur: 3.1 },
    { x1: 190, y1: 60,  x2: 205, y2: 185, color: "#06B6D4", dur: 1.8 },
  ];

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 420">
      <defs>
        {streams.map((s, i) => (
          <linearGradient key={i} id={`sg${i}`} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={s.color} stopOpacity="0" />
            <stop offset="50%" stopColor={s.color} stopOpacity="0.8" />
            <stop offset="100%" stopColor={s.color} stopOpacity="0" />
          </linearGradient>
        ))}
      </defs>
      {streams.map((s, i) => (
        <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2}
          stroke={`url(#sg${i})`} strokeWidth="1.5" strokeDasharray="6 8">
          <animate attributeName="stroke-dashoffset" from="100" to="-100"
            dur={`${s.dur}s`} repeatCount="indefinite" />
        </line>
      ))}
      {/* Pulsing dot at sphere */}
      {[...Array(5)].map((_, i) => (
        <circle key={i} cx="210" cy="200" r="3" fill={streams[i].color} opacity="0.6">
          <animate attributeName="r" values="2;6;2" dur={`${streams[i].dur}s`} repeatCount="indefinite"
            begin={`${i * 0.6}s`} />
          <animate attributeName="opacity" values="0.6;0;0.6" dur={`${streams[i].dur}s`} repeatCount="indefinite"
            begin={`${i * 0.6}s`} />
        </circle>
      ))}
    </svg>
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
            <CloudScene />
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
