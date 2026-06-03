"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight } from "lucide-react";

const PASSWORD = "darkplus_web_2026";
const EASE = [0.22, 1, 0.36, 1] as const;

interface Props {
  onUnlock: () => void;
}

export function UnderConstruction({ onUnlock }: Props) {
  const [showMessage, setShowMessage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (showModal) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [showModal]);

  function handleLogoClick() {
    setShowMessage(true);
  }

  function handleMotifClick() {
    setShowModal(true);
    setPassword("");
    setError("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password === PASSWORD) {
      onUnlock();
    } else {
      setError("Incorrect password.");
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      setPassword("");
      inputRef.current?.focus();
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black">

      {/* ── Centre content ─────────────────────────────────────── */}
      <div className="flex flex-col items-center gap-10">

        {/* Logo + plus */}
        <motion.button
          onClick={handleLogoClick}
          className="group flex cursor-pointer items-center gap-5 focus:outline-none"
          aria-label="D.ARK+ — Click to see our status"
          whileHover="hover"
          initial="idle"
        >
          {/* Logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/d.ark_cover_logo.svg"
            alt="D.ARK+"
            className="h-10 w-auto sm:h-14"
            draggable={false}
          />

          {/* Plus icon with pulse + glow + hover */}
          <motion.span
            className="select-none text-4xl font-semibold leading-none text-white sm:text-5xl"
            variants={{
              idle: {},
              hover: {
                scale: 1.35,
                color: "#c8a96e",
                textShadow:
                  "0 0 18px rgba(200,169,110,0.9), 0 0 40px rgba(200,169,110,0.5)",
              },
            }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <motion.span
              className="block"
              animate={{
                scale: [1, 1.18, 1],
                opacity: [0.7, 1, 0.7],
                textShadow: [
                  "0 0 0px rgba(255,255,255,0)",
                  "0 0 20px rgba(255,255,255,0.8), 0 0 50px rgba(255,255,255,0.3)",
                  "0 0 0px rgba(255,255,255,0)",
                ],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "loop",
              }}
            >
              +
            </motion.span>
          </motion.span>
        </motion.button>

        {/* Popup message */}
        <AnimatePresence>
          {showMessage && (
            <motion.p
              key="msg"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="font-mono text-[11px] uppercase tracking-[0.45em] text-white/50"
            >
              We are building our website
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* ── Bottom-left motif trigger ───────────────────────────── */}
      <motion.button
        onClick={handleMotifClick}
        className="absolute bottom-8 right-8 focus:outline-none"
        aria-label="Studio access"
        whileHover={{ opacity: 0.35 }}
        initial={{ opacity: 0.1 }}
        transition={{ duration: 0.3 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/brand-motif-curves.svg"
          alt=""
          aria-hidden="true"
          className="h-24 w-auto select-none"
          draggable={false}
        />
      </motion.button>

      {/* ── Password modal ──────────────────────────────────────── */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-10 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setShowModal(false)}
            />

            {/* Panel */}
            <motion.div
              key="panel"
              className="fixed left-1/2 top-1/2 z-20 w-[min(380px,90vw)] -translate-x-1/2 -translate-y-1/2 border border-white/[0.08] bg-[#0d0d0d] p-8"
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={
                shaking
                  ? { x: [-8, 8, -6, 6, 0], opacity: 1, y: 0, scale: 1 }
                  : { opacity: 1, y: 0, scale: 1, x: 0 }
              }
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              {/* Close */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute right-4 top-4 text-white/30 transition-colors hover:text-white/70"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

              <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.45em] text-[#c8a96e]/60">
                Studio Access
              </p>
              <h2 className="text-xl font-extralight text-white">
                Enter password
              </h2>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="flex flex-col gap-2">
                  <input
                    ref={inputRef}
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="Password"
                    autoComplete="current-password"
                    className="w-full border-b border-white/[0.08] bg-transparent py-3 text-sm text-white placeholder-white/20 outline-none transition-colors focus:border-[#c8a96e]/50"
                  />
                  <AnimatePresence>
                    {error && (
                      <motion.p
                        key="err"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="font-mono text-[10px] text-[#c8a96e]"
                      >
                        {error}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 border border-[#c8a96e] bg-[#c8a96e] px-6 py-3 text-sm font-light tracking-wide text-[#0d0d0d] transition-all duration-300 hover:bg-transparent hover:text-[#c8a96e]"
                >
                  Enter
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
