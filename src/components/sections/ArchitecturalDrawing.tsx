"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

const spring = { stiffness: 90, damping: 22, mass: 0.5 };

export default function ArchitecturalDrawing() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, spring);
  const smoothY = useSpring(y, spring);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    x.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 18);
    y.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 18);
  }

  return (
    <div
      ref={ref}
      className="relative h-full min-h-[28rem] w-full overflow-hidden"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => { x.set(0); y.set(0); }}
    >
      <div className="drafting-grid absolute inset-0 opacity-60" />
      <motion.svg
        viewBox="0 0 760 760"
        className="absolute inset-[-3%] h-[106%] w-[106%]"
        style={{ x: reduce ? 0 : smoothX, y: reduce ? 0 : smoothY }}
        role="img"
        aria-labelledby="blueprint-title blueprint-desc"
      >
        <title id="blueprint-title">Concept elevation for a tropical residence</title>
        <desc id="blueprint-desc">A precise animated architectural line drawing with plans, dimensions, and section marks.</desc>
        <defs>
          <linearGradient id="lineFade" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#c8a96e" stopOpacity="0.18" />
            <stop offset="0.48" stopColor="#f0ede8" stopOpacity="0.72" />
            <stop offset="1" stopColor="#c8a96e" stopOpacity="0.28" />
          </linearGradient>
          <pattern id="minorGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f0ede8" strokeOpacity="0.035" strokeWidth="1" />
          </pattern>
        </defs>

        <rect width="760" height="760" fill="url(#minorGrid)" />

        <motion.g
          fill="none"
          stroke="url(#lineFade)"
          strokeWidth="1.25"
          initial={false}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: reduce ? 0 : 2.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <path d="M84 548H682" />
          <path d="M118 548V322L272 210L578 321V548" />
          <path d="M118 322L272 354L578 321" />
          <path d="M272 210V548" />
          <path d="M173 334V548M369 337V548M494 329V548" />
          <path d="M144 382H247V516H144ZM298 370H347V516H298ZM394 362H468V516H394ZM519 354H555V516H519Z" />
          <path d="M105 548L88 595H682L665 548" />
          <path d="M95 596H675M110 608H660" />
          <path d="M128 382L262 354M282 354L568 322" strokeOpacity="0.34" />
          <path d="M145 465H247M394 454H468M519 447H555" strokeOpacity="0.42" />
          <path d="M76 322H118M76 548H118M89 322V548" strokeOpacity="0.48" />
          <path d="M84 322l5-8 5 8M84 548l5 8 5-8" strokeOpacity="0.48" />
          <path d="M118 186V152M578 298V152M118 166H578" strokeOpacity="0.42" />
          <path d="M118 161l-8 5 8 5M578 161l8 5-8 5" strokeOpacity="0.42" />
        </motion.g>

        <motion.g
          fill="none"
          stroke="#c8a96e"
          strokeWidth="1"
          strokeOpacity="0.68"
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: reduce ? 0 : 1.6 }}
        >
          <circle cx="272" cy="210" r="8" />
          <circle cx="272" cy="210" r="17" strokeOpacity="0.24" />
          <path d="M272 178V242M240 210H304" />
          <circle cx="578" cy="321" r="5" />
          <path d="M598 321H685M685 321v48" />
          <path d="M628 548v60M620 600l8 8 8-8" />
          <path d="M58 454H106M82 430V478" strokeOpacity="0.36" />
        </motion.g>

        <g fill="#9e9b97" fontFamily="var(--font-mono)" fontSize="8" letterSpacing="1.4">
          <text x="118" y="140">18 400 / OVERALL SPAN</text>
          <text x="54" y="438" transform="rotate(-90 54 438)">+ 6 200 / RIDGE LEVEL</text>
          <text x="603" y="309">ROOF DATUM 02</text>
          <text x="596" y="380">SECTION A-A</text>
          <text x="641" y="624">GROUND 00</text>
          <text x="126" y="638">CONCEPT ELEVATION / NOT FOR CONSTRUCTION</text>
        </g>

        <g fill="#c8a96e" fontFamily="var(--font-display)" fontSize="18" fontWeight="600">
          <text x="264" y="186">A</text>
          <text x="686" y="389">02</text>
        </g>
      </motion.svg>

      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between border-t border-white/10 pt-3 font-mono text-[8px] uppercase tracking-[0.28em] text-[#9e9b97]">
        <span>Concept / Elevation</span>
        <span className="text-[#c8a96e]">Move to inspect</span>
      </div>
    </div>
  );
}
