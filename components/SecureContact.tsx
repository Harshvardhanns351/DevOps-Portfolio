"use client";

import React, { useState } from "react";
import { Mail, Shield, AlertTriangle, Linkedin, Github, Send, Key, FileText } from "lucide-react";

export default function SecureContact() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [payload, setPayload] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !payload) return;

    setFormStatus("sending");

    // Simulate SSL/TLS authorization & connection transmission
    setTimeout(() => {
      setFormStatus("success");
      setEmail("");
      setSubject("");
      setPayload("");

      // Unlock a contact achievement badge in localstorage
      try {
        localStorage.setItem("badge_secure_connect", "UNLOCKED");
        window.dispatchEvent(new Event("storage"));
      } catch (err) {}
    }, 2000);
  };

  return (
    <section id="contact" className="py-20 border-t border-[var(--accent-gray)] bg-[var(--bg-primary)] grid-bg relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="mb-12">
          <h2 className="text-2xl font-black font-mono uppercase tracking-wider text-[var(--text-primary)]">
            ~/establish-secure-connection
          </h2>
          <div className="h-0.5 w-12 bg-[var(--lobster-red)] mt-3"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Block: Connection Info parameters */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Info details */}
            <div className="glass-card border border-[var(--accent-gray)] p-6 bg-black/40">
              <h3 className="font-mono text-xs font-bold text-[var(--lobster-red)] tracking-widest uppercase mb-4 flex items-center gap-1.5">
                <Shield className="h-4 w-4" /> AUTHORIZED_CHANNELS
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6 font-sans">
                Submit an encrypted query packet directly to my host. The transport channel uses standard HTTPS tunnels to secure endpoints metadata data packets.
              </p>

              <div className="space-y-4 font-mono text-xs">
                
                <div className="flex items-center gap-3 p-3.5 border border-stone-850 bg-black/30 rounded-lg">
                  <Mail className="h-4.5 w-4.5 text-[var(--lobster-red)] shrink-0" />
                  <div>
                    <span className="text-stone-550 block text-[10px] text-stone-500 uppercase">SYS_INBOUND_MAIL</span>
                    <a href="mailto:harshvardhanns351@gmail.com" className="text-stone-200 hover:text-[var(--lobster-red)] transition-colors font-bold select-all">
                      harshvardhanns351@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 border border-stone-850 bg-black/30 rounded-lg">
                  <Key className="h-4.5 w-4.5 text-[var(--lobster-red)] shrink-0" />
                  <div>
                    <span className="text-stone-550 block text-[10px] text-stone-500 uppercase">PUBLIC_SSH_KEY</span>
                    <span className="text-stone-300 font-bold block text-[11px] truncate select-all">
                      ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIH...
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Social Grid Connections & ATS Resume */}
            <div className="glass-card border border-[var(--accent-gray)] p-5 bg-black/40">
              <span className="font-mono text-[10px] text-stone-500 uppercase block mb-3">
                EXTERNAL_RESOURCES
              </span>
              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                
                <a 
                  href="https://linkedin.com/in/harshvardhan-ns" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center gap-2 p-3 bg-stone-950 border border-stone-850 hover:border-[var(--lobster-red)]/30 rounded transition-all duration-200"
                >
                  <Linkedin className="h-4 w-4 text-[var(--lobster-red)]" />
                  <span>LINKEDIN</span>
                </a>

                <a 
                  href="https://github.com/Harshvardhanns351" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center gap-2 p-3 bg-stone-950 border border-stone-850 hover:border-[var(--lobster-red)]/30 rounded transition-all duration-200"
                >
                  <Github className="h-4 w-4 text-[var(--lobster-red)]" />
                  <span>GITHUB</span>
                </a>

              </div>

              {/* Resume download button */}
              <div className="mt-4">
                <a 
                  href="/resume.pdf" 
                  target="_blank" 
                  className="flex items-center justify-center gap-2 p-3 w-full bg-red-950/20 border border-[var(--lobster-red)] hover:bg-[var(--lobster-red)] hover:text-black font-bold uppercase text-[11px] rounded transition-all duration-200"
                >
                  <FileText className="h-4.5 w-4.5" />
                  DOWNLOAD ATS RESUME (PDF)
                </a>
              </div>
            </div>

          </div>

          {/* Right Block: Secure Form Terminal */}
          <div className="lg:col-span-7 glass-card border border-[var(--accent-gray)] p-6 bg-black/40 overflow-hidden">
            <h3 className="font-mono text-xs font-bold text-[var(--lobster-red)] tracking-widest uppercase mb-4 flex items-center gap-1.5">
              <Send className="h-4 w-4" /> SECURE_PACKET_TRASMISSION
            </h3>

            {formStatus === "success" ? (
              <div className="text-center py-10 font-mono text-xs space-y-4">
                <div className="w-10 h-10 rounded-full bg-emerald-950/50 border border-emerald-900 text-emerald-500 font-bold flex items-center justify-center mx-auto text-sm animate-bounce">
                  ✓
                </div>
                <div>
                  <h4 className="text-emerald-500 font-bold text-sm uppercase">CONNECTION TRANSMITTED</h4>
                  <p className="text-stone-500 text-[11px] mt-1 leading-relaxed">
                    Session payload handshake completed successfully.<br />
                    Response packet queued on remote system node scheduler.
                  </p>
                </div>
                <button 
                  onClick={() => setFormStatus("idle")} 
                  className="btn-outline text-[11px]"
                >
                  TRANSMIT ANOTHER DATA PACKET
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                
                <div>
                  <label className="text-stone-500 text-[10px] uppercase block mb-1.5">
                    $ client-origin-ip --mail
                  </label>
                  <input 
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter secure contact email address..."
                    className="w-full bg-stone-950 border border-stone-850 focus:border-[var(--lobster-red)] outline-none rounded p-3 text-stone-200 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="text-stone-500 text-[10px] uppercase block mb-1.5">
                    $ sys-config-subject
                  </label>
                  <input 
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Enter messaging packet header subject..."
                    className="w-full bg-stone-950 border border-stone-850 focus:border-[var(--lobster-red)] outline-none rounded p-3 text-stone-200 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="text-stone-500 text-[10px] uppercase block mb-1.5">
                    $ connection-payload-text
                  </label>
                  <textarea 
                    rows={4}
                    required
                    value={payload}
                    onChange={(e) => setPayload(e.target.value)}
                    placeholder="Enter encrypted text specifications data packet..."
                    className="w-full bg-stone-950 border border-stone-850 focus:border-[var(--lobster-red)] outline-none rounded p-3 text-stone-200 text-xs font-mono resize-none leading-relaxed"
                  />
                </div>

                {formStatus === "sending" ? (
                  <div className="flex items-center justify-center gap-2 p-3 font-bold border border-stone-800 text-stone-500 bg-stone-950 rounded uppercase text-[11px]">
                    <span className="w-4 h-4 border-2 border-stone-700 border-t-[var(--lobster-red)] rounded-full animate-spin"></span>
                    <span>AUTHORIZING CRYPTO TRANSPORT...</span>
                  </div>
                ) : (
                  <button 
                    type="submit"
                    className="w-full btn-primary flex items-center justify-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    TRANSMIT SECURE DATA PACKET
                  </button>
                )}

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
