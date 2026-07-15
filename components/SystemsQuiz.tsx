"use client";

import React, { useState } from "react";
import { HelpCircle, Award, CheckCircle, ShieldAlert, Sparkles } from "lucide-react";

interface Question {
  q: string;
  choices: string[];
  correct: number;
}

export default function SystemsQuiz() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [unlockedBadge, setUnlockedBadge] = useState<string | null>(null);

  const questions: Question[] = [
    {
      q: "What does Kubernetes use to coordinate container communication across nodes?",
      choices: [
        "Kubectl Engine Control",
        "Kube-Proxy and CNI Network Plugins",
        "Direct docker daemon links",
        "Ansible Playbook hosts configuration"
      ],
      correct: 1
    },
    {
      q: "Which command maps infrastructure configuration drifts without mutating active configurations?",
      choices: [
        "terraform apply",
        "terraform refresh",
        "terraform plan",
        "terraform destroy"
      ],
      correct: 2
    },
    {
      q: "Which metric represents the total time required to transition a commit to cluster production?",
      choices: [
        "Mean Time To Acknowledge",
        "Throughput Capacity Volume",
        "Lead Time for Changes (DORAMetric)",
        "Kubernetes Pod Ready Probe Time"
      ],
      correct: 2
    }
  ];

  const handleNext = () => {
    if (selectedOpt === null) return;

    if (selectedOpt === questions[currentIdx].correct) {
      setScore((prev) => prev + 1);
    }

    const nextIdx = currentIdx + 1;
    if (nextIdx < questions.length) {
      setCurrentIdx(nextIdx);
      setSelectedOpt(null);
    } else {
      setFinished(true);
      // Award achievement badge in localStorage
      const finalScore = score + (selectedOpt === questions[currentIdx].correct ? 1 : 0);
      if (finalScore === questions.length) {
        setUnlockedBadge("DevOps Master Badge Unlocked! (3/3 Correct Answers)");
        try {
          localStorage.setItem("badge_devops_master", "UNLOCKED");
          window.dispatchEvent(new Event("storage"));
        } catch (err) {}
      } else {
        setUnlockedBadge("SysAdmin Certification Unlocked! (Complete score to gain master badge)");
        try {
          localStorage.setItem("badge_sysadmin", "UNLOCKED");
          window.dispatchEvent(new Event("storage"));
        } catch (err) {}
      }
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setScore(0);
    setFinished(false);
    setUnlockedBadge(null);
  };

  return (
    <section className="py-20 border-t border-[var(--accent-gray)] bg-[var(--bg-secondary)] relative flex justify-center items-center">
      <div className="mx-auto max-w-4xl w-full px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-1.5 rounded bg-red-950/40 border border-red-900/30 px-3 py-1 text-xs font-mono text-[var(--lobster-red)] font-bold uppercase tracking-widest mb-3">
            <Sparkles className="h-3.5 w-3.5" /> GUEST ASSESSMENTS MODULE
          </div>
          <h2 className="text-2xl font-black font-mono uppercase tracking-wider text-[var(--text-primary)]">
            ~/infrastructure-competency-test
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-2 font-mono">
            Verify key Kubernetes policies and Infrastructure as Code configurations to unlock profile achievements.
          </p>
        </div>

        {/* Dashboard Frame */}
        <div className="w-full glass-card border border-[var(--accent-gray)] rounded-xl overflow-hidden shadow-2xl bg-black/40">
          
          {/* Top Panel bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#080809] border-b border-[var(--accent-gray)]">
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-[var(--lobster-red)] font-semibold">
              <HelpCircle className="h-4 w-4" />
              <span>sys_quiz_core_v1</span>
            </div>
            <span className="text-[10px] font-mono text-stone-500 uppercase font-bold">
              {finished ? "COMPLETE" : `QUESTION: ${currentIdx + 1} OF ${questions.length}`}
            </span>
          </div>

          <div className="p-6 sm:p-8 text-left">
            {!finished ? (
              <div className="space-y-6">
                <div>
                  <h3 className="font-mono text-xs font-bold text-stone-500 uppercase tracking-wider block mb-2">
                    &gt; EXECUTING POLICY COMPLIANCE SCAN:
                  </h3>
                  <p className="font-bold text-sm sm:text-base text-[var(--text-primary)] font-mono leading-relaxed">
                    {questions[currentIdx].q}
                  </p>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  {questions[currentIdx].choices.map((choice, oIdx) => (
                    <div 
                      key={oIdx}
                      onClick={() => setSelectedOpt(oIdx)}
                      className={`cursor-pointer p-3.5 border rounded-lg transition-all flex items-center justify-between ${
                        selectedOpt === oIdx 
                          ? "border-[var(--lobster-red)] bg-red-950/20 text-[var(--text-primary)]" 
                          : "border-stone-850 bg-black/40 text-stone-400 hover:border-stone-700 hover:text-stone-300"
                      }`}
                    >
                      <span>{choice}</span>
                      <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                        selectedOpt === oIdx 
                          ? "border-[var(--lobster-red)] bg-[var(--lobster-red)] text-black" 
                          : "border-stone-800"
                      }`}>
                        {selectedOpt === oIdx && <span className="w-1.5 h-1.5 bg-black rounded-full" />}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-4">
                  <button 
                    onClick={handleNext}
                    disabled={selectedOpt === null}
                    className="btn-primary flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:pointer-events-none"
                  >
                    NEXT EXECUTABLE &gt;
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 space-y-6">
                <Award className="h-14 w-14 text-[var(--lobster-red)] mx-auto animate-pulse" />
                
                <div>
                  <h3 className="font-mono text-xl font-bold uppercase text-[var(--text-primary)] leading-relaxed">
                    COMPLIANCE CHECK COMPLETE
                  </h3>
                  <p className="font-mono text-xs text-stone-500 uppercase tracking-widest mt-1">
                    System Evaluation Metrics: {score} / {questions.length} successful queries
                  </p>
                </div>

                {unlockedBadge && (
                  <div className="bg-red-950/30 border border-red-900/40 p-4 rounded-lg inline-block w-full max-w-md mx-auto">
                    <span className="text-[var(--lobster-red)] font-mono text-xs font-bold block mb-1">
                      [ACHIEVEMENT REWARD GRANTED]
                    </span>
                    <span className="font-mono text-xs text-[var(--text-primary)]">
                      {unlockedBadge}
                    </span>
                  </div>
                )}

                <div className="pt-4 flex justify-center gap-4">
                  <button 
                    onClick={handleRestart}
                    className="btn-outline flex items-center justify-center gap-1.5"
                  >
                    RE-EXECUTE SYSTEM TEST
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
