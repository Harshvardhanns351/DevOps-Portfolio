"use client";

import React, { useState, useEffect } from "react";
import { Award, ShieldAlert, Check, HelpCircle, Terminal } from "lucide-react";

interface Badge {
  key: string;
  name: string;
  desc: string;
  icon: React.ReactNode;
}

export default function Achievements() {
  const [unlockedKeys, setUnlockedKeys] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState<string | null>(null);

  const badges: Badge[] = [
    {
      key: "badge_devops_master",
      name: "DEVOPS MASTER",
      desc: "Scored 3/3 on system engineering quiz.",
      icon: <Award className="h-5 w-5 text-yellow-500" />
    },
    {
      key: "badge_sysadmin",
      name: "SYSADMIN COMPETENT",
      desc: "Completed the competency test challenges.",
      icon: <Check className="h-5 w-5 text-emerald-500" />
    },
    {
      key: "badge_terminal_master",
      name: "SHELL CONTROLLER",
      desc: "Ran 4+ commands in guest prompt console.",
      icon: <Terminal className="h-5 w-5 text-[var(--lobster-red)]" />
    },
    {
      key: "badge_secure_connect",
      name: "SECURE CHANNEL ESTABLISHED",
      desc: "Submitted connection metadata payload.",
      icon: <ShieldAlert className="h-5 w-5 text-indigo-505 text-indigo-400" />
    }
  ];

  const checkStorage = () => {
    try {
      const keys: string[] = [];
      badges.forEach((b) => {
        if (localStorage.getItem(b.key) === "UNLOCKED") {
          keys.push(b.key);
        }
      });
      setUnlockedKeys(keys);
    } catch (err) {}
  };

  useEffect(() => {
    checkStorage();

    // Listen to storage update events
    window.addEventListener("storage", checkStorage);
    
    // Periodically poll local storage in case storage logs occur on same tab
    const interval = setInterval(checkStorage, 2500);

    return () => {
      window.removeEventListener("storage", checkStorage);
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="py-20 border-t border-[var(--accent-gray)] bg-[var(--bg-primary)] items-stretch justify-center flex relative">
      <div className="mx-auto max-w-5xl w-full px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-black font-mono uppercase tracking-wider text-[var(--text-primary)]">
            ~/system-achievements-registry
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-2 font-mono">
            Tracks user actions. SSH into clusters, run console directives or complete evaluations to unpack awards.
          </p>
        </div>

        {/* Grid Box */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
          {badges.map((b) => {
            const isUnlocked = unlockedKeys.includes(b.key);
            return (
              <div 
                key={b.key}
                className={`glass-card border p-4.5 rounded-xl text-left bg-black/40 flex flex-col justify-between items-start transition-all duration-300 ${
                  isUnlocked 
                    ? "border-[var(--lobster-red)]/40 shadow-[0_0_15px_rgba(255,46,46,0.1)]" 
                    : "border-stone-850 opacity-40 hover:opacity-60"
                }`}
              >
                <div>
                  <div className={`p-2.5 rounded-lg border inline-block mb-3.5 ${
                    isUnlocked 
                      ? "bg-red-950/20 border-[var(--lobster-red)]/20 text-[var(--lobster-red)]" 
                      : "bg-stone-900 border-stone-800 text-stone-605 text-stone-500"
                  }`}>
                    {b.icon}
                  </div>

                  <h3 className="font-mono text-xs font-bold text-[var(--text-primary)] tracking-wide">
                    {b.name}
                  </h3>

                  <p className="text-[10px] sm:text-xs text-stone-500 leading-relaxed font-mono mt-1.5 min-h-[40px]">
                    {b.desc}
                  </p>
                </div>

                <div className="border-t border-stone-900 pt-3 mt-4 w-full font-mono text-[9px] font-bold">
                  {isUnlocked ? (
                    <span className="text-emerald-500 uppercase tracking-widest">[UNLOCKED_GRANTED]</span>
                  ) : (
                    <span className="text-stone-600 uppercase tracking-widest">[LOCKED_ENCRYPTED]</span>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
