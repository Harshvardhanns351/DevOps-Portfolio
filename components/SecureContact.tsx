"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, FileText } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function SecureContact() {
  const [email,   setEmail]   = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status,  setStatus]  = useState<"idle"|"sending"|"success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;
    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      setEmail(""); setSubject(""); setMessage("");
      try {
        localStorage.setItem("badge_secure_connect", "UNLOCKED");
        window.dispatchEvent(new Event("storage"));
      } catch {}
    }, 1800);
  };

  return (
    <section id="contact" className="py-24 border-t border-[var(--accent-gray)] line-grid">
      <div className="content-wrap">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="font-mono text-[11px] font-semibold tracking-widest uppercase text-[var(--lobster-red)] mb-2">Contact</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">Get in Touch</h2>
          <span className="section-accent" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-5 space-y-5"
          >
            <div className="glass-card p-6 space-y-5">
              <div>
                <h3 className="font-semibold text-base text-[var(--text-primary)] mb-2">Let's connect</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Open to discussing infrastructure architecture, DevOps consulting, or just talking shop.
                  Feel free to reach out through any of the channels below.
                </p>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5 p-4 rounded-xl border border-[var(--accent-gray)] bg-white/[0.015]">
                <div className="w-8 h-8 rounded-lg bg-[var(--lobster-red)]/10 border border-[var(--lobster-red)]/20 flex items-center justify-center shrink-0">
                  <Mail className="h-4 w-4 text-[var(--lobster-red)]" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] mb-0.5">Email</p>
                  <a
                    href="mailto:harshvardhanns351@gmail.com"
                    className="text-sm font-semibold text-[var(--text-primary)] hover:text-[var(--lobster-red)] transition-colors"
                  >
                    harshvardhanns351@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Socials + Resume */}
            <div className="glass-card p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { href: "https://linkedin.com/in/harshvardhan-ns",  icon: <FaLinkedin className="h-4 w-4" />, label: "LinkedIn" },
                  { href: "https://github.com/Harshvardhanns351",      icon: <FaGithub   className="h-4 w-4" />, label: "GitHub" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-3 rounded-lg border border-[var(--accent-gray)] text-sm font-semibold text-[var(--text-secondary)] hover:border-[var(--lobster-red)]/30 hover:text-[var(--text-primary)] transition-all"
                  >
                    <span className="text-[var(--lobster-red)]">{s.icon}</span>
                    {s.label}
                  </a>
                ))}
              </div>

              <a
                href="/resume.pdf"
                target="_blank"
                className="flex items-center justify-center gap-2 w-full p-3 rounded-lg border border-[var(--lobster-red)]/40 bg-[var(--lobster-red)]/5 text-sm font-bold text-[var(--text-primary)] hover:bg-[var(--lobster-red)]/10 hover:border-[var(--lobster-red)]/60 transition-all"
              >
                <FileText className="h-4 w-4 text-[var(--lobster-red)]" />
                Download Resume (PDF)
              </a>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-7 glass-card p-6"
          >
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center text-center py-14 gap-5">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                  <span className="text-emerald-400 text-xl font-bold">✓</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[var(--text-primary)]">Message sent!</h4>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">I'll get back to you as soon as possible.</p>
                </div>
                <button onClick={() => setStatus("idle")} className="btn-outline text-sm px-5 py-2">
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Email address</label>
                  <input
                    type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="input-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Subject</label>
                  <input
                    type="text" required value={subject} onChange={(e) => setSubject(e.target.value)}
                    placeholder="What's this about?"
                    className="input-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Message</label>
                  <textarea
                    rows={5} required value={message} onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me what you have in mind…"
                    className="input-base resize-none"
                  />
                </div>

                {status === "sending" ? (
                  <div className="flex items-center justify-center gap-2 py-3 font-mono text-sm text-[var(--text-muted)] border border-[var(--accent-gray)] rounded-lg">
                    <span className="w-4 h-4 border-2 border-[var(--accent-gray)] border-t-[var(--lobster-red)] rounded-full animate-spin" />
                    Sending…
                  </div>
                ) : (
                  <button type="submit" className="w-full btn-primary gap-2 py-3">
                    <Send className="h-4 w-4" />
                    Send Message
                  </button>
                )}
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
