"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight } from "lucide-react";

const PASSWORD = "darkplus_web_2026";
const EASE = [0.22, 1, 0.36, 1] as const;

// Glow filter strings — same functions in both states for smooth interpolation
const GLOW_IDLE = "brightness(0) invert(1) sepia(0) saturate(1) hue-rotate(0deg) blur(8px)";
const GLOW_PEAK = "brightness(0) invert(1) sepia(0) saturate(1) hue-rotate(0deg) blur(16px)";
const GLOW_HOVER = "brightness(0) invert(1) sepia(1) saturate(4) hue-rotate(5deg) blur(14px)";
const IMG_IDLE  = "brightness(0) invert(1) sepia(0) saturate(1) hue-rotate(0deg)";
const IMG_HOVER = "brightness(0) invert(1) sepia(1) saturate(4) hue-rotate(5deg)";

interface Props {
  onUnlock: () => void;
}

export function UnderConstruction({ onUnlock }: Props) {
  const [showMessage, setShowMessage] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showModal) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [showModal]);

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

      {/* ── Centre logo composition ─────────────────────────────── */}
      <div className="flex flex-col items-center gap-10">
        {/* Width-based layout: container width drives all proportions.
             83/17 split = artwork ratio (1392:278 px from SVG analysis).
             marginTop 2.75% of container = 48/530 SVG top-padding compensation. */}
        <button
          onClick={() => setShowMessage(true)}
          className="flex cursor-pointer flex-col items-start gap-0 focus:outline-none"
          style={{ width: "min(88vw, 36rem)" }}
          aria-label="D.ARK+ — click to see our status"
        >
          {/* Row 1: d.ark + plus — fills 100% of container width */}
          <div className="flex w-full items-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/d.ark-text.svg"
              alt="d.ark"
              style={{ width: "83%", height: "auto" }}
              className="brightness-0 invert"
              draggable={false}
            />

            {/* + — blurred-duplicate glow (cross-browser, no drop-shadow) */}
            <div
              className="relative self-start"
              style={{ width: "12%", marginTop: "2.75%", flexShrink: 0 }}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              {/* Glow layer: blurred copy behind the real image — Safari safe */}
              <motion.img
                src="/brand/d.ark-plus.svg"
                aria-hidden="true"
                draggable={false}
                className="absolute inset-0 h-full w-full"
                style={{ filter: GLOW_IDLE }}
                animate={
                  hovering
                    ? { opacity: 0.9, scale: 1.4, filter: GLOW_HOVER }
                    : {
                        opacity: [0.15, 0.75, 0.15],
                        scale: [1, 1.35, 1],
                        filter: [GLOW_IDLE, GLOW_PEAK, GLOW_IDLE],
                      }
                }
                transition={
                  hovering
                    ? { duration: 0.3, ease: EASE }
                    : { duration: 2.4, repeat: Infinity, ease: "easeInOut", repeatType: "loop" }
                }
              />
              {/* Real + image on top */}
              <motion.img
                src="/brand/d.ark-plus.svg"
                alt="+"
                draggable={false}
                className="relative w-full h-auto"
                style={{ filter: IMG_IDLE }}
                animate={
                  hovering
                    ? { scale: 1.1, opacity: 1, filter: IMG_HOVER }
                    : { scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8], filter: IMG_IDLE }
                }
                transition={
                  hovering
                    ? { duration: 0.3, ease: EASE }
                    : { duration: 2.4, repeat: Infinity, ease: "easeInOut", repeatType: "loop" }
                }
              />
            </div>
          </div>

          {/* Separator line — spans full container width */}
          <div className="my-2 h-px w-full bg-white/30" />

          {/* Subtitle — overflow:hidden wrapper crops the border lines from both ends */}
          <div style={{ width: "100%", overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/d.ark-subtitle.svg"
              alt="dolores arkitecture+"
              style={{
                display: "block",
                width: "calc(100% + 32px)",
                marginLeft: "-16px",
                height: "auto",
              }}
              className="brightness-0 invert opacity-70"
              draggable={false}
            />
          </div>
        </button>

        {/* Message popup */}
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

      {/* ── Bottom-right motif trigger ──────────────────────────── */}
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
          className="h-8 w-auto select-none"
          draggable={false}
        />
      </motion.button>

      {/* ── Password modal ──────────────────────────────────────── */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-10 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setShowModal(false)}
            />

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
