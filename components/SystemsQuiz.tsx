"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Sparkles } from "lucide-react";

interface Question { q: string; choices: string[]; correct: number }

const questions: Question[] = [
  {
    q: "What does Kubernetes use to coordinate container communication across nodes?",
    choices: [
      "Kubectl Engine Control",
      "Kube-Proxy and CNI Network Plugins",
      "Direct Docker daemon links",
      "Ansible Playbook hosts",
    ],
    correct: 1,
  },
  {
    q: "Which Terraform command detects configuration drift without mutating state?",
    choices: ["terraform apply", "terraform refresh", "terraform plan", "terraform destroy"],
    correct: 2,
  },
  {
    q: "Which DORA metric measures the time from commit to production deployment?",
    choices: [
      "Mean Time to Acknowledge",
      "Throughput Capacity Volume",
      "Lead Time for Changes",
      "Pod Ready Probe Time",
    ],
    correct: 2,
  },
];

export default function SystemsQuiz() {
  const [idx,       setIdx]       = useState(0);
  const [selected,  setSelected]  = useState<number | null>(null);
  const [score,     setScore]     = useState(0);
  const [done,      setDone]      = useState(false);
  const [badge,     setBadge]     = useState<string | null>(null);

  const handleNext = () => {
    if (selected === null) return;
    const correct = selected === questions[idx].correct;
    const next    = score + (correct ? 1 : 0);

    if (idx + 1 < questions.length) {
      setScore(next);
      setIdx((p) => p + 1);
      setSelected(null);
    } else {
      setDone(true);
      const msg = next === questions.length
        ? "DevOps Master — scored 3/3!"
        : "SysAdmin Competent — complete all for the master badge.";
      setBadge(msg);
      try {
        localStorage.setItem(next === questions.length ? "badge_devops_master" : "badge_sysadmin", "UNLOCKED");
        window.dispatchEvent(new Event("storage"));
      } catch {}
    }
  };

  const restart = () => { setIdx(0); setSelected(null); setScore(0); setDone(false); setBadge(null); };

  return (
    <section className="py-24 border-t border-[var(--accent-gray)]">
      <div className="content-wrap">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent-gray)] bg-white/[0.02] px-3.5 py-1.5 mb-4">
            <Sparkles className="h-3.5 w-3.5 text-[var(--lobster-red)]" />
            <span className="font-mono text-[11px] font-semibold tracking-widest text-[var(--text-secondary)] uppercase">
              Quiz
            </span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">Infrastructure Challenge</h2>
          <p className="text-sm text-[var(--text-secondary)] mt-3">
            Test your DevOps knowledge and unlock profile achievements.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card overflow-hidden"
        >
          {/* Panel header */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-black/40 border-b border-[var(--accent-gray)]">
            <span className="font-mono text-xs font-bold text-[var(--lobster-red)] uppercase tracking-wider">
              Competency Assessment
            </span>
            <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest">
              {done ? "Complete" : `${idx + 1} of ${questions.length}`}
            </span>
          </div>

          <div className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {!done ? (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <p className="font-mono text-[11px] text-[var(--text-muted)] uppercase tracking-widest mb-3">Question {idx + 1}</p>
                    <p className="text-base font-semibold text-[var(--text-primary)] leading-relaxed">
                      {questions[idx].q}
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {questions[idx].choices.map((c, oi) => (
                      <button
                        key={oi}
                        onClick={() => setSelected(oi)}
                        className={`w-full text-left flex items-center justify-between gap-4 p-4 rounded-xl border text-sm transition-all ${
                          selected === oi
                            ? "border-[var(--lobster-red)]/60 bg-[var(--lobster-red)]/6 text-[var(--text-primary)]"
                            : "border-[var(--accent-gray)] text-[var(--text-secondary)] hover:border-white/10 hover:text-[var(--text-primary)]"
                        }`}
                      >
                        <span>{c}</span>
                        <span className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
                          selected === oi ? "border-[var(--lobster-red)] bg-[var(--lobster-red)]" : "border-[var(--accent-gray)]"
                        }`}>
                          {selected === oi && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={handleNext}
                      disabled={selected === null}
                      className="btn-primary px-6 disabled:opacity-40 disabled:pointer-events-none"
                    >
                      {idx + 1 === questions.length ? "Finish" : "Next →"}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
                  className="text-center py-6 space-y-6"
                >
                  <Award className="h-14 w-14 text-[var(--lobster-red)] mx-auto" />
                  <div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)]">Assessment Complete</h3>
                    <p className="text-sm text-[var(--text-secondary)] mt-1.5">
                      Score: <span className="text-[var(--text-primary)] font-bold">{score} / {questions.length}</span>
                    </p>
                  </div>
                  {badge && (
                    <div className="inline-block text-left bg-[var(--lobster-red)]/6 border border-[var(--lobster-red)]/20 px-5 py-4 rounded-xl">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--lobster-red)] mb-1">Achievement unlocked</p>
                      <p className="text-sm text-[var(--text-primary)] font-semibold">{badge}</p>
                    </div>
                  )}
                  <button onClick={restart} className="btn-outline px-6">Retake quiz</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
