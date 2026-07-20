"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, ArrowDown } from "lucide-react";
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

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

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
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,46,46,0.45)";
        ctx.fill();
      });
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
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
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
  { command: "whoami", output: "Harshvardhan NS  ·  Cloud & DevOps Engineer  ·  Infrastructure Architect", delay: 800 },
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

/* ── Hero ────────────────────────────────────────── */
export default function TerminalHero() {
  const [visible, setVisible] = useState<number[]>([]);
  const [tidx,    setTidx]    = useState(0);
  const [typed,   setTyped]   = useState("");
  const termRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start","end start"] });
  const yText   = useTransform(scrollYProgress, [0,1], ["0%","18%"]);
  const opacity = useTransform(scrollYProgress, [0,0.6], [1, 0]);

  /* Typing */
  useEffect(() => {
    if (tidx >= commandFlow.length) return;
    const step = commandFlow[tidx];
    let c = 0, t = "";
    const id = setInterval(() => {
      if (c < step.command.length) { t += step.command[c++]; setTyped(t); }
      else {
        clearInterval(id);
        setTimeout(() => {
          setVisible((p) => [...p, tidx]);
          setTyped("");
          setTidx((p) => p + 1);
        }, step.delay);
      }
    }, 28);
    return () => clearInterval(id);
  }, [tidx]);

  useEffect(() => { termRef.current?.scrollIntoView({ behavior: "smooth" }); }, [visible, typed]);

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
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* ── Left ──────────────────────────────── */}
          <div className="flex-1 flex flex-col items-start">

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 flex items-center gap-2.5 px-4 py-2 rounded-full border border-[var(--accent-gray)] bg-white/[0.025]"
            >
              <span className="status-dot online" />
              <span className="font-mono text-[11px] font-semibold tracking-[0.15em] text-[var(--text-secondary)] uppercase">
                HVS · Deployment environment active
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[clamp(3rem,8vw,6rem)] font-black leading-[0.9] tracking-tighter mb-8"
            >
              AUTO<span className="gradient-text">MATE</span><br />
              PROVI<span className="gradient-text">SION</span><br />
              <span className="gradient-text">SCALE.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-[var(--text-secondary)] text-lg leading-relaxed max-w-lg mb-10"
            >
              Infrastructure architect building resilient systems — container
              orchestration, declarative GitOps pipelines, and multi-cloud
              automation at scale.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-3 mb-14"
            >
              <a href="#projects" className="btn-primary gap-2">
                <Play className="h-4 w-4 fill-current" /> View Projects
              </a>
              <a href="https://github.com/Harshvardhanns351" target="_blank" rel="noopener noreferrer"
                className="btn-outline gap-2">
                <FaGithub className="h-4 w-4" /> GitHub
              </a>
            </motion.div>

            {/* Stat counters */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="grid grid-cols-3 gap-8 w-full max-w-sm"
            >
              {[
                { to: 4, suffix: "+", label: "Projects" },
                { to: 3, suffix: "",  label: "Certifications" },
                { to: 60,suffix: "%", label: "Latency cut" },
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

          {/* ── Right: Terminal ────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.96 }} animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.3 }}
            className="flex-1 w-full max-w-2xl"
          >
            {/* Glow ring */}
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-[var(--lobster-red)]/10 via-transparent to-[var(--deep-red)]/10 blur-2xl pointer-events-none" />

            <div className="relative glass-card overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.7)] scan-overlay">

              {/* Title bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#040408] border-b border-[var(--accent-gray)]">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <span className="w-3 h-3 rounded-full bg-[#FEBC2E] opacity-60" />
                  <span className="w-3 h-3 rounded-full bg-[#28C840] opacity-60" />
                </div>
                <span className="font-mono text-[11px] text-[var(--text-muted)]">root@hvs — bash — 80×24</span>
                <span className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-400 font-bold">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" /> SECURE
                </span>
              </div>

              {/* Body */}
              <div className="p-5 h-[380px] md:h-[420px] overflow-y-auto font-mono text-xs leading-relaxed bg-[#010104]/80 space-y-2.5 scrollbar-none">
                <div className="text-[var(--text-muted)]">Last login: {new Date().toLocaleDateString()} · session ID: hvs-{Math.floor(Math.random()*9999)}</div>

                {visible.map((i) => {
                  const s = commandFlow[i];
                  return (
                    <div key={i} className="space-y-0.5">
                      <div className="flex items-center gap-1 text-[var(--lobster-red)] font-semibold">
                        <span className="text-[var(--text-muted)]">root@hvs</span>
                        <span className="text-[var(--text-muted)]">~$</span>
                        <span className="ml-1">{s.command}</span>
                      </div>
                      <div className="pl-0 text-[var(--text-secondary)]">
                        {typeof s.output === "function" ? s.output() : s.output}
                      </div>
                    </div>
                  );
                })}

                {tidx < commandFlow.length && (
                  <div className="flex items-center gap-1 font-semibold">
                    <span className="text-[var(--text-muted)]">root@hvs</span>
                    <span className="text-[var(--text-muted)]">~$</span>
                    <span className="ml-1 text-[var(--lobster-red)]">
                      {typed}<span className="inline-block w-[7px] h-[13px] bg-[var(--lobster-red)] cursor-blink ml-0.5 align-middle" />
                    </span>
                  </div>
                )}

                {tidx >= commandFlow.length && (
                  <div className="mt-3 pt-3 border-t border-[var(--accent-gray)] flex items-center gap-1">
                    <span className="text-[var(--text-muted)]">root@hvs ~$</span>
                    <span className="ml-1 inline-block w-[7px] h-[13px] bg-[var(--text-muted)] cursor-blink" />
                  </div>
                )}
                <div ref={termRef} />
              </div>

              {/* Status bar */}
              <div className="flex items-center justify-between px-4 py-2 bg-[var(--lobster-red)] text-black font-mono text-[10px] font-bold">
                <span>NORMAL</span>
                <span>bash · UTF-8 · LF</span>
                <span>Ln {visible.length + 1}, Col 1</span>
              </div>
            </div>
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
