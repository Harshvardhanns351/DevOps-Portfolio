"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, FileText } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

/*
 * HOW CONTACT FORM DATA IS HANDLED
 * ─────────────────────────────────
 * Submissions are sent via Formspree (https://formspree.io) — a secure
 * third-party form backend. When a user submits this form:
 *
 *  1. The browser POSTs the fields (email, subject, message) over HTTPS
 *     directly to Formspree's servers.
 *  2. Formspree forwards the submission as an email to the portfolio
 *     owner's inbox (harshvardhanns351@gmail.com).
 *  3. Formspree stores a copy of each submission in your dashboard at
 *     https://formspree.io — you can view, export, or delete them there.
 *  4. No data is written to this website's server or any database —
 *     this site is fully static.
 *
 * SETUP (one-time):
 *  1. Go to https://formspree.io/register and sign up (free).
 *  2. Click "New Form", set the email to harshvardhanns351@gmail.com.
 *  3. Copy the form endpoint — it looks like:
 *       https://formspree.io/f/xyzabcde
 *  4. Replace the FORMSPREE_ENDPOINT constant below with your endpoint.
 */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/meeyyvry";

export default function SecureContact() {
  const [email,   setEmail]   = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status,  setStatus]  = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !message) return;
    setStatus("sending");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ email, subject, message }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail(""); setSubject(""); setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
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

          {/* ── Left: info ── */}
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
                  Fill in the form and it lands directly in my inbox.
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

              {/* How it works note */}
              <div className="p-4 rounded-xl border border-[var(--accent-gray)] bg-white/[0.01] space-y-2">
                <p className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)]">How your data is handled</p>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Messages are delivered to my email via{" "}
                  <a href="https://formspree.io" target="_blank" rel="noopener noreferrer"
                    className="text-[var(--lobster-red)] hover:underline">Formspree</a>.
                  Your name, email, and message are stored in the Formspree dashboard
                  and never shared with any third party. No tracking, no spam.
                </p>
              </div>
            </div>

            {/* Socials + Resume */}
            <div className="glass-card p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { href: "https://linkedin.com/in/harshvardhan-ns", icon: <FaLinkedin className="h-4 w-4" />, label: "LinkedIn" },
                  { href: "https://github.com/Harshvardhanns351",     icon: <FaGithub   className="h-4 w-4" />, label: "GitHub"   },
                ].map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-3 rounded-lg border border-[var(--accent-gray)] text-sm font-semibold text-[var(--text-secondary)] hover:border-[var(--lobster-red)]/30 hover:text-[var(--text-primary)] transition-all">
                    <span className="text-[var(--lobster-red)]">{s.icon}</span>
                    {s.label}
                  </a>
                ))}
              </div>

              <a href="/resume.pdf" target="_blank"
                className="flex items-center justify-center gap-2 w-full p-3 rounded-lg border border-[var(--lobster-red)]/40 bg-[var(--lobster-red)]/5 text-sm font-bold text-[var(--text-primary)] hover:bg-[var(--lobster-red)]/10 hover:border-[var(--lobster-red)]/60 transition-all">
                <FileText className="h-4 w-4 text-[var(--lobster-red)]" />
                Download Resume (PDF)
              </a>
            </div>
          </motion.div>

          {/* ── Right: form ── */}
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
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    Your message has been delivered to my inbox. I'll get back to you soon.
                  </p>
                </div>
                <button onClick={() => setStatus("idle")} className="btn-outline text-sm px-5 py-2">
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">

                {status === "error" && (
                  <div className="p-3 rounded-lg border border-red-500/30 bg-red-500/6 text-sm text-red-400">
                    Something went wrong. Please try emailing directly at harshvardhanns351@gmail.com.
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Email address</label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com" className="input-base" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Subject</label>
                  <input type="text" required value={subject} onChange={(e) => setSubject(e.target.value)}
                    placeholder="What's this about?" className="input-base" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Message</label>
                  <textarea rows={5} required value={message} onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me what you have in mind…" className="input-base resize-none" />
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

                <p className="text-[11px] text-[var(--text-muted)] text-center leading-relaxed">
                  Powered by{" "}
                  <a href="https://formspree.io" target="_blank" rel="noopener noreferrer"
                    className="hover:text-[var(--text-secondary)] transition-colors">Formspree</a>
                  {" "}— your data is sent securely over HTTPS and delivered to my inbox only.
                </p>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
