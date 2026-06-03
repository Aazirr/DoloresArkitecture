"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue } from "motion/react";
import { X, ArrowRight } from "lucide-react";

const PASSWORD = "darkplus_web_2026";
const EASE = [0.22, 1, 0.36, 1] as const;

const GHOST_IMAGES = ["/ghosts/1.png", "/ghosts/2.png", "/ghosts/3.png", "/ghosts/4.png"];
const GHOST_THRESHOLD = 2500; // deg/s before ghosts appear
const GHOST_INTERVAL  = 800;  // ms between spawns
const GHOST_MAX       = 8;    // max ghosts on screen

const VEL_PER_CLICK = 720;
const VEL_MAX       = 5400;
const VEL_DECAY     = 0.985;
const AMBER_THRESHOLD = 1800;

function glowFilter(blur: number, amber: boolean) {
  const s   = amber ? 1 : 0;
  const sat = amber ? 5 : 1;
  const hue = amber ? "5deg" : "0deg";
  return `brightness(0) invert(1) sepia(${s}) saturate(${sat}) hue-rotate(${hue}) blur(${blur}px)`;
}
function imgFilter(amber: boolean) {
  const s   = amber ? 1 : 0;
  const sat = amber ? 4 : 1;
  const hue = amber ? "5deg" : "0deg";
  return `brightness(0) invert(1) sepia(${s}) saturate(${sat}) hue-rotate(${hue})`;
}

const GLOW_IDLE  = glowFilter(8,  false);
const GLOW_PEAK  = glowFilter(16, false);
const GLOW_HOVER = glowFilter(14, true);
const IMG_IDLE   = imgFilter(false);
const IMG_HOVER  = imgFilter(true);

interface GhostItem {
  id: number;
  src: string;
  x: number;   // vw %
  y: number;   // vh %
  size: number; // px
  rotate: number; // deg
  opacity: number;
  duration: number; // animation s
}

interface Props {
  onUnlock: () => void;
}

export function UnderConstruction({ onUnlock }: Props) {
  const [showMessage, setShowMessage] = useState(false);
  const [hovering, setHovering]       = useState(false);
  const [showModal, setShowModal]     = useState(false);
  const [password, setPassword]       = useState("");
  const [error, setError]             = useState("");
  const [shaking, setShaking]         = useState(false);

  // Spin state
  const [isSpinning, setIsSpinning]   = useState(false);
  const [clickBounce, setClickBounce] = useState(false);
  const [spinBlur, setSpinBlur]       = useState(8);
  const [spinAmber, setSpinAmber]     = useState(false);

  // Ghost state
  const [ghosts, setGhosts]           = useState<GhostItem[]>([]);

  const rotateVal      = useMotionValue(0);
  const velRef         = useRef(0);
  const rafRef         = useRef<number | null>(null);
  const bounceTimer    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ghostCounter   = useRef(0);
  const lastSpawnRef   = useRef(0);
  const inputRef       = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showModal) setTimeout(() => inputRef.current?.focus(), 100);
  }, [showModal]);

  useEffect(() => {
    return () => {
      if (rafRef.current)      cancelAnimationFrame(rafRef.current);
      if (bounceTimer.current) clearTimeout(bounceTimer.current);
    };
  }, []);

  // ── Ghost spawner ───────────────────────────────────────────────

  function spawnGhost() {
    setGhosts(prev => {
      if (prev.length >= GHOST_MAX) return prev;

      const id       = ++ghostCounter.current;
      const src      = GHOST_IMAGES[Math.floor(Math.random() * GHOST_IMAGES.length)];
      const size     = 60 + Math.random() * 130;    // 60–190px
      const x        = 5  + Math.random() * 85;     // 5–90vw
      const y        = 5  + Math.random() * 80;     // 5–85vh
      const rotate   = (Math.random() - 0.5) * 30;  // ±15°
      const opacity  = 0.15 + Math.random() * 0.25; // 0.15–0.40
      const duration = 2.5 + Math.random() * 1.5;   // 2.5–4s

      return [...prev, { id, src, x, y, size, rotate, opacity, duration }];
    });
  }

  function removeGhost(id: number) {
    setGhosts(prev => prev.filter(g => g.id !== id));
  }

  // ── Spin physics ────────────────────────────────────────────────

  function startSpinLoop() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const tick = () => {
      velRef.current *= VEL_DECAY;
      rotateVal.set(rotateVal.get() + velRef.current / 60);

      setSpinBlur(8 + Math.min(velRef.current / 200, 24));
      setSpinAmber(velRef.current > AMBER_THRESHOLD);

      // Spawn ghosts when spinning fast enough
      if (velRef.current > GHOST_THRESHOLD) {
        const now = Date.now();
        if (now - lastSpawnRef.current > GHOST_INTERVAL) {
          lastSpawnRef.current = now;
          spawnGhost();
        }
      }

      if (velRef.current > 3) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        velRef.current = 0;
        setIsSpinning(false);
        setSpinBlur(8);
        setSpinAmber(false);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }

  function handlePlusClick() {
    if (!showMessage) {
      setShowMessage(true);
      return;
    }

    setClickBounce(true);
    if (bounceTimer.current) clearTimeout(bounceTimer.current);
    bounceTimer.current = setTimeout(() => setClickBounce(false), 180);

    velRef.current = Math.min(velRef.current + VEL_PER_CLICK, VEL_MAX);
    if (!isSpinning) setIsSpinning(true);
    startSpinLoop();
  }

  const activeGlowFilter = isSpinning ? glowFilter(spinBlur, spinAmber) : undefined;
  const activeImgFilter  = isSpinning ? imgFilter(spinAmber)             : undefined;

  // ── Modal helpers ───────────────────────────────────────────────

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

  // ── Render ──────────────────────────────────────────────────────

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black">

      {/* ── Ghost silhouettes ────────────────────────────────────── */}
      <AnimatePresence>
        {ghosts.map(ghost => (
          <motion.img
            key={ghost.id}
            src={ghost.src}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="pointer-events-none fixed select-none"
            style={{
              left:   `${ghost.x}vw`,
              top:    `${ghost.y}vh`,
              width:  ghost.size,
              height: "auto",
              rotate: ghost.rotate,
              zIndex: 101,
            }}
            initial={{ opacity: 0 }}
            animate={{
              // Glitch materialisation (first 40%) → ghost float (40-75%) → fade out (75-100%)
              opacity: [
                0, ghost.opacity * 0.9, 0, ghost.opacity, 0,
                ghost.opacity * 0.6, ghost.opacity, ghost.opacity,
                ghost.opacity * 0.4, 0,
              ],
              x: [6, -8, 5, -4, 7, -1, 0, 0, 0, 0],
              y: [0, 1, -2, 2, -1, 0, 0, -22, -50, -80],
              scale: [0.82, 1.08, 0.92, 1.04, 0.96, 1, 1, 1, 0.94, 0.82],
              filter: [
                // Chromatic colour flashes during glitch
                "brightness(0) invert(1) hue-rotate(140deg) saturate(5)",
                "brightness(0) invert(1)",
                "brightness(0) invert(1) hue-rotate(220deg) saturate(4)",
                "brightness(0) invert(1)",
                "brightness(0) invert(1) hue-rotate(60deg) saturate(6)",
                "brightness(0) invert(1)",
                // Settled ghost — pure white inverted silhouette
                "brightness(0) invert(1)",
                "brightness(0) invert(1)",
                "brightness(0) invert(1)",
                "brightness(0) invert(1)",
              ],
            }}
            transition={{
              duration: ghost.duration,
              times: [0, 0.06, 0.12, 0.18, 0.26, 0.34, 0.42, 0.65, 0.84, 1],
              ease: "linear",
            }}
            onAnimationComplete={() => removeGhost(ghost.id)}
          />
        ))}
      </AnimatePresence>

      {/* ── Centre logo composition ──────────────────────────────── */}
      <div className="flex flex-col items-center gap-10">
        <div
          className="flex flex-col items-start gap-0"
          style={{ width: "min(62vw, 25rem)" }}
        >
          {/* Row 1: d.ark + animated + */}
          <div className="flex w-full items-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/d.ark-text.svg"
              alt="d.ark"
              style={{ width: "83%", height: "auto" }}
              className="brightness-0 invert"
              draggable={false}
            />

            {/* Spinning + wrapper */}
            <motion.div
              className="relative self-start cursor-pointer"
              style={{
                width: "12%",
                marginTop: "2.75%",
                flexShrink: 0,
                rotate: rotateVal,
              }}
              animate={clickBounce ? { scale: 1.3 } : { scale: 1 }}
              transition={{ duration: 0.15, ease: EASE }}
              onClick={handlePlusClick}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              {/* Glow layer */}
              <motion.img
                src="/brand/d.ark-plus.svg"
                aria-hidden="true"
                draggable={false}
                className="absolute inset-0 h-full w-full"
                style={{ filter: activeGlowFilter ?? (hovering ? GLOW_HOVER : GLOW_IDLE) }}
                animate={
                  isSpinning
                    ? { opacity: [0.35, 1, 0.35], scale: [1.1, 1.8, 1.1] }
                    : hovering
                      ? { opacity: 0.9, scale: 1.4 }
                      : { opacity: [0.15, 0.75, 0.15], scale: [1, 1.35, 1] }
                }
                transition={
                  isSpinning
                    ? { duration: 0.2, repeat: Infinity, ease: "easeInOut" }
                    : hovering
                      ? { duration: 0.3, ease: EASE }
                      : { duration: 2.4, repeat: Infinity, ease: "easeInOut", repeatType: "loop" }
                }
              />
              {/* Real + */}
              <motion.img
                src="/brand/d.ark-plus.svg"
                alt="+"
                draggable={false}
                className="relative w-full h-auto"
                style={{ filter: activeImgFilter ?? (hovering ? IMG_HOVER : IMG_IDLE) }}
                animate={
                  isSpinning
                    ? { opacity: [0.85, 1, 0.85] }
                    : hovering
                      ? { scale: 1.1, opacity: 1 }
                      : { scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }
                }
                transition={
                  isSpinning
                    ? { duration: 0.2, repeat: Infinity, ease: "easeInOut" }
                    : hovering
                      ? { duration: 0.3, ease: EASE }
                      : { duration: 2.4, repeat: Infinity, ease: "easeInOut", repeatType: "loop" }
                }
              />
            </motion.div>
          </div>

          {/* Separator */}
          <div className="my-2 h-px w-full bg-white/30" />

          {/* Subtitle */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/d.ark-subtitle.svg"
            alt="dolores arkitecture+"
            style={{ width: "100%", height: "auto" }}
            className="brightness-0 invert opacity-70"
            draggable={false}
          />
        </div>

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
              {isSpinning && spinAmber ? "slow down!!" : "We are building our website"}
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
              <h2 className="text-xl font-extralight text-white">Enter password</h2>
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="flex flex-col gap-2">
                  <input
                    ref={inputRef}
                    type="password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
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
