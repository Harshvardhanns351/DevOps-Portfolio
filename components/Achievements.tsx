"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Award, Check, Terminal, ShieldCheck } from "lucide-react";

interface Badge {
  key: string;
  name: string;
  desc: string;
  icon: React.ReactNode;
}

const badges: Badge[] = [
  { key: "badge_devops_master",   name: "DevOps Master",           desc: "Scored 3/3 on the engineering quiz.",     icon: <Award     className="h-5 w-5" /> },
  { key: "badge_sysadmin",        name: "SysAdmin Competent",      desc: "Completed the competency challenge.",      icon: <Check     className="h-5 w-5" /> },
  { key: "badge_terminal_master", name: "Shell Controller",        desc: "Ran 4+ commands in the guest console.",    icon: <Terminal  className="h-5 w-5" /> },
  { key: "badge_secure_connect",  name: "Secure Channel",          desc: "Submitted a contact form message.",        icon: <ShieldCheck className="h-5 w-5" /> },
];

export default function Achievements() {
  const [unlocked, setUnlocked] = useState<string[]>([]);

  const sync = () => {
    try {
      setUnlocked(badges.filter((b) => localStorage.getItem(b.key) === "UNLOCKED").map((b) => b.key));
    } catch {}
  };

  useEffect(() => {
    sync();
    window.addEventListener("storage", sync);
    const id = setInterval(sync, 2500);
    return () => { window.removeEventListener("storage", sync); clearInterval(id); };
  }, []);

  return (
    <section className="py-24 border-t border-[var(--accent-gray)]">
      <div className="content-wrap">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">Achievements</h2>
          <p className="text-sm text-[var(--text-secondary)] mt-3">
            Unlock badges by exploring the site — take the quiz, use the console, or send a message.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((b, i) => {
            const on = unlocked.includes(b.key);
            return (
              <motion.div
                key={b.key}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
                className={`glass-card p-5 flex flex-col gap-3 transition-all duration-300 ${
                  on
                    ? "border-[var(--lobster-red)]/30 shadow-[0_0_20px_rgba(255,46,46,0.08)]"
                    : "opacity-40 hover:opacity-60"
                }`}
              >
                <div className={`w-9 h-9 rounded-lg border flex items-center justify-center ${
                  on
                    ? "bg-[var(--lobster-red)]/10 border-[var(--lobster-red)]/25 text-[var(--lobster-red)]"
                    : "bg-white/[0.03] border-[var(--accent-gray)] text-[var(--text-muted)]"
                }`}>
                  {b.icon}
                </div>

                <div>
                  <p className="font-semibold text-sm text-[var(--text-primary)] leading-snug">{b.name}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">{b.desc}</p>
                </div>

                <div className="mt-auto pt-3 border-t border-[var(--accent-gray)] font-mono text-[10px] font-bold uppercase tracking-widest">
                  {on
                    ? <span className="text-emerald-400">Unlocked</span>
                    : <span className="text-[var(--text-muted)]">Locked</span>
                  }
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
