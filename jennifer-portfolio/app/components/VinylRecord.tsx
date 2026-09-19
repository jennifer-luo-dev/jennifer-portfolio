"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";

/* -------------------------------------------------------------------------
 * Geometry
 *
 * The record and the tonearm live in ONE coordinate space (viewBox 0 0 400
 * 400) and the arm's poses are solved from that geometry rather than eyeballed
 * — which is what makes the stylus sit in an actual groove instead of hovering
 * near one. The record is left of centre so the arm has room on the right.
 * ---------------------------------------------------------------------- */

const C = { x: 170, y: 200 }; // record centre
const R = 150; // record radius
const PIVOT = { x: 352, y: 108 }; // tonearm bearing — off the disc, rear right
const ARM = 215; // pivot -> stylus

const LEAD_IN_R = 145; // first groove
const RUN_OUT_R = 63; // last groove, just outside the label
const LABEL_R = 48;

const DEG = 180 / Math.PI;
const RAD = Math.PI / 180;

// Pivot -> centre: the reference direction the arm swings around.
const D = Math.hypot(C.x - PIVOT.x, C.y - PIVOT.y);
const TO_CENTRE = Math.atan2(C.y - PIVOT.y, C.x - PIVOT.x);

/** Arm angle (radians) that lands the stylus on the groove at radius `r`. */
function armAngleFor(r: number) {
  // Triangle pivot–centre–stylus:  r² = ARM² + D² − 2·ARM·D·cos φ
  const cosPhi = (ARM * ARM + D * D - r * r) / (2 * ARM * D);
  const phi = Math.acos(Math.min(1, Math.max(-1, cosPhi)));
  return TO_CENTRE - phi; // the branch that sweeps across the near side
}

const THETA_LEAD_IN = armAngleFor(LEAD_IN_R);
/** How far the arm tracks inward across a whole side (~24°, like a real one). */
const DRIFT_DEG = (armAngleFor(RUN_OUT_R) - THETA_LEAD_IN) * DEG;
const PARKED_DEG = -13.5; // lifted, sitting off the edge over the arm rest

// Arm basis in the lead-in pose. Every part of the arm is drawn in this pose;
// parking and tracking are then pure rotations about PIVOT.
const u = { x: Math.cos(THETA_LEAD_IN), y: Math.sin(THETA_LEAD_IN) }; // along
const n = { x: -u.y, y: u.x }; // across

/** A point `along` the arm from the pivot, offset `across` it. */
function at(along: number, across = 0) {
  return {
    x: PIVOT.x + u.x * along + n.x * across,
    y: PIVOT.y + u.y * along + n.y * across,
  };
}
const xy = (pt: { x: number; y: number }) =>
  `${pt.x.toFixed(2)} ${pt.y.toFixed(2)}`;

const STYLUS = at(ARM);
const HEAD_BACK = at(184, 6); // where the tube meets the headshell
const HEAD_FRONT = at(207, -4); // far end of the headshell
// Gentle S-bend — the silhouette that reads instantly as a tonearm.
const ARM_TUBE = `M ${xy(PIVOT)} C ${xy(at(70, -10))} ${xy(at(130, 10))} ${xy(HEAD_BACK)}`;

/** Arc along a groove, for the glints of light that sell the rotation. */
function arcPath(r: number, a0: number, a1: number) {
  const pt = (a: number) => ({
    x: C.x + r * Math.cos(a * RAD),
    y: C.y + r * Math.sin(a * RAD),
  });
  return `M ${xy(pt(a0))} A ${r} ${r} 0 ${Math.abs(a1 - a0) > 180 ? 1 : 0} 1 ${xy(pt(a1))}`;
}

// Grooves, clustered into tracks with brighter separators between them.
const TRACK_EDGES = [146, 127.5, 110, 95, 81.5, 70, RUN_OUT_R];
const GROOVES: { r: number; o: number }[] = [];
for (let i = 0; i < TRACK_EDGES.length - 1; i++) {
  const outer = TRACK_EDGES[i];
  const inner = TRACK_EDGES[i + 1];
  for (let r = outer - 2.8; r > inner + 1.8; r -= 2.4) {
    const t = (r - inner) / (outer - inner);
    GROOVES.push({ r, o: 0.045 + 0.04 * Math.sin(t * Math.PI) });
  }
}

// Fraction of the record's on-screen life the arm takes to reach the run-out.
// Short of 1 so the side finishes while the record can still be seen doing it.
const SWEEP_END = 0.7;

const BASE_SPIN = 16; // deg/sec — slow enough to feel unhurried
const SCROLL_GAIN = 0.16; // deg/sec per px/sec of scroll
const MAX_SPIN = 340;

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));

export function VinylRecord() {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  // The full-height column the record is pinned inside; the record itself
  // stops moving once it sticks, so the column is what tracks the scroll.
  const columnRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { amount: 0.15 });

  // The platter always turns; scrolling nudges it faster (or, scrolling back
  // up, drags it the other way) instead of the record only moving on scroll.
  const rotation = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 45,
    stiffness: 320,
    mass: 0.6,
  });

  useAnimationFrame((_, delta) => {
    if (prefersReducedMotion || !inView) return;
    const dt = Math.min(delta, 64) / 1000; // ignore jumps after a tab-away
    const rate = clamp(
      BASE_SPIN + smoothVelocity.get() * SCROLL_GAIN,
      -MAX_SPIN,
      MAX_SPIN,
    );
    rotation.set((rotation.get() + rate * dt) % 360);
  });

  // The arm creeps toward the run-out as you read. Measuring the sweep against
  // the page's own scroll (rather than the column's entry into view) is what
  // lets it start moving on the very first pixel instead of idling until the
  // record has already been scrolled past.
  const [sweep, setSweep] = useState(700);
  useEffect(() => {
    const column = columnRef.current;
    if (!column) return;
    const remeasure = () => {
      const bottom = column.getBoundingClientRect().bottom + window.scrollY;
      const furthest = document.documentElement.scrollHeight - window.innerHeight;
      // The record is on screen until its column's bottom clears the top of
      // the viewport — whether it got there pinned or by scrolling.
      setSweep(Math.max(240, Math.min(bottom, furthest) * SWEEP_END));
    };
    // ResizeObserver fires once on observe, which seeds the first measurement.
    const observer = new ResizeObserver(remeasure);
    observer.observe(column);
    window.addEventListener("resize", remeasure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", remeasure);
    };
  }, []);

  const drift = useSpring(
    useTransform(scrollY, [0, sweep], [0, DRIFT_DEG]),
    { damping: 32, stiffness: 160, mass: 0.7 },
  );

  // Cue the needle once the record has actually been seen.
  const [cued, setCued] = useState(false);
  useEffect(() => {
    if (prefersReducedMotion || !inView || cued) return;
    const id = setTimeout(() => setCued(true), 650);
    return () => clearTimeout(id);
  }, [inView, prefersReducedMotion, cued]);

  const armDown = prefersReducedMotion || cued;
  const cue = useSpring(PARKED_DEG, { stiffness: 90, damping: 17, mass: 0.9 });
  useEffect(() => {
    cue.set(armDown ? 0 : PARKED_DEG);
  }, [cue, armDown]);

  const armAngle = useTransform(
    [cue, drift],
    ([c, d]: number[]) => (prefersReducedMotion ? 0 : c + d),
  );

  // The origin has to go through motion's own originX/originY: motion writes
  // transform-origin itself and would otherwise replace ours with `50% 50%`,
  // which against transform-box: view-box means the middle of the viewBox —
  // 30 units off the spindle, so the record would orbit instead of spin.
  const spinOn = (x: number, y: number) => ({
    transformBox: "view-box" as const,
    originX: `${x}px`,
    originY: `${y}px`,
  });
  const discTransform = { ...spinOn(C.x, C.y), rotate: rotation };
  const armTransform = { ...spinOn(PIVOT.x, PIVOT.y), rotate: armAngle };

  return (
    <div ref={columnRef} className="h-full">
      <div className="sm:sticky sm:top-24">
        <div
          ref={containerRef}
          className="relative mx-auto aspect-square w-full max-w-[360px]"
        >
          <svg
            viewBox="0 0 400 400"
            className="h-full w-full overflow-visible"
            role="img"
            aria-label="A vinyl record turning, with the tonearm resting in the groove"
          >
            <defs>
              <radialGradient id="vr-disc" cx="0.5" cy="0.5" r="0.5" fx="0.34" fy="0.3">
                <stop offset="0" stopColor="#1a1610" />
                <stop offset="0.55" stopColor="#110e0a" />
                <stop offset="1" stopColor="#080706" />
              </radialGradient>

              <radialGradient id="vr-label" cx="0.5" cy="0.5" r="0.5" fx="0.38" fy="0.33">
                <stop offset="0" stopColor="#c9543c" />
                <stop offset="0.68" stopColor="var(--accent-label)" />
                <stop offset="1" stopColor="#8d2f20" />
              </radialGradient>

              {/* Fixed light source: these bands do NOT rotate with the record. */}
              <linearGradient id="vr-sheen-cool" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#f2ece1" stopOpacity="0" />
                <stop offset="0.5" stopColor="#f2ece1" stopOpacity="0.1" />
                <stop offset="1" stopColor="#f2ece1" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="vr-sheen-warm" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="var(--accent-copper)" stopOpacity="0" />
                <stop offset="0.5" stopColor="var(--accent-copper)" stopOpacity="0.1" />
                <stop offset="1" stopColor="var(--accent-copper)" stopOpacity="0" />
              </linearGradient>

              <radialGradient id="vr-vignette" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0.55" stopColor="#000" stopOpacity="0" />
                <stop offset="1" stopColor="#000" stopOpacity="0.4" />
              </radialGradient>

              <radialGradient id="vr-glow" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0.82" stopColor="var(--accent-copper)" stopOpacity="0.14" />
                <stop offset="1" stopColor="var(--accent-copper)" stopOpacity="0" />
              </radialGradient>

              {/* Runs ACROSS the tube, not along it, so the arm reads as a
                  cylinder catching light rather than a flat copper ribbon. */}
              <linearGradient
                id="vr-metal"
                gradientUnits="userSpaceOnUse"
                x1={at(130, -3.4).x}
                y1={at(130, -3.4).y}
                x2={at(130, 3.4).x}
                y2={at(130, 3.4).y}
              >
                <stop offset="0" stopColor="#6d3d1a" />
                <stop offset="0.32" stopColor="#e3ad74" />
                <stop offset="0.58" stopColor="#bd7a3b" />
                <stop offset="1" stopColor="#67391a" />
              </linearGradient>

              <clipPath id="vr-disc-clip">
                <circle cx={C.x} cy={C.y} r={R} />
              </clipPath>

              <filter id="vr-soft" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="4" />
              </filter>

              <path
                id="vr-label-arc"
                fill="none"
                d={`M ${C.x - 34} ${C.y} A 34 34 0 0 1 ${C.x + 34} ${C.y}`}
              />
            </defs>

            {/* Ambient warmth behind the disc */}
            <circle cx={C.x} cy={C.y} r={R + 22} fill="url(#vr-glow)" />

            {/* ---- Record surface (rotates) ---- */}
            <motion.g style={discTransform}>
              <circle cx={C.x} cy={C.y} r={R} fill="url(#vr-disc)" />

              {GROOVES.map(({ r, o }) => (
                <circle
                  key={r}
                  cx={C.x}
                  cy={C.y}
                  r={r}
                  fill="none"
                  stroke="#f2ece1"
                  strokeOpacity={o}
                  strokeWidth="0.6"
                />
              ))}

              {/* Track separators */}
              {TRACK_EDGES.map((r) => (
                <circle
                  key={`edge-${r}`}
                  cx={C.x}
                  cy={C.y}
                  r={r}
                  fill="none"
                  stroke="#f2ece1"
                  strokeOpacity="0.17"
                  strokeWidth="0.8"
                />
              ))}

              {/* Glints — the asymmetry that makes the spin readable */}
              <g fill="none" strokeLinecap="round">
                <path d={arcPath(138, -66, 6)} stroke="#f2ece1" strokeOpacity="0.1" strokeWidth="1.6" />
                <path d={arcPath(121, 100, 158)} stroke="var(--accent-copper)" strokeOpacity="0.18" strokeWidth="1.4" />
                <path d={arcPath(104, 28, 64)} stroke="#f2ece1" strokeOpacity="0.07" strokeWidth="1" />
                <path d={arcPath(90, -142, -88)} stroke="#f2ece1" strokeOpacity="0.09" strokeWidth="1.2" />
              </g>

              {/* Rim bevel */}
              <circle cx={C.x} cy={C.y} r={R} fill="none" stroke="#000" strokeOpacity="0.55" strokeWidth="2" />
              <circle cx={C.x} cy={C.y} r={R - 2.4} fill="none" stroke="#f2ece1" strokeOpacity="0.09" strokeWidth="0.8" />
            </motion.g>

            {/* ---- Fixed light. Clipped to the disc, deliberately not rotating. ---- */}
            <g clipPath="url(#vr-disc-clip)" aria-hidden="true">
              <g transform={`rotate(-32 ${C.x} ${C.y})`}>
                <rect x={C.x - 170} y={C.y - 152} width="340" height="104" fill="url(#vr-sheen-cool)" />
                <rect x={C.x - 170} y={C.y + 48} width="340" height="104" fill="url(#vr-sheen-warm)" />
              </g>
              <circle cx={C.x} cy={C.y} r={R} fill="url(#vr-vignette)" />
            </g>

            {/* ---- Label (rotates in lockstep with the surface) ---- */}
            <motion.g style={discTransform}>
              <circle cx={C.x} cy={C.y} r={LABEL_R} fill="url(#vr-label)" />
              <circle cx={C.x} cy={C.y} r={LABEL_R} fill="none" stroke="#000" strokeOpacity="0.32" strokeWidth="1" />
              <circle cx={C.x} cy={C.y} r={40} fill="none" stroke="#17140f" strokeOpacity="0.22" strokeWidth="0.8" />

              <text
                className="font-mono"
                fill="#f2ece1"
                fillOpacity="0.88"
                fontSize="9"
                letterSpacing="1.4"
              >
                <textPath href="#vr-label-arc" startOffset="50%" textAnchor="middle">
                  JENNIFER LUO
                </textPath>
              </text>
              <text
                className="font-mono"
                x={C.x}
                y={C.y + 30}
                textAnchor="middle"
                fill="#f2ece1"
                fillOpacity="0.55"
                fontSize="7"
                letterSpacing="1.2"
              >
                33⅓ RPM
              </text>

              {/* Spindle */}
              <circle cx={C.x} cy={C.y} r="5" fill="var(--bg)" />
              <circle cx={C.x} cy={C.y} r="5" fill="none" stroke="#000" strokeOpacity="0.45" strokeWidth="1.2" />
            </motion.g>

            {/* ---- Tonearm. Outer g cues/lifts, inner g tracks inward. ---- */}
            <motion.g style={armTransform} aria-hidden="true">
              {/* Shadow, clipped so only the part over the record casts one */}
              <g
                clipPath="url(#vr-disc-clip)"
                filter="url(#vr-soft)"
                opacity="0.5"
                transform="translate(5 9)"
                fill="none"
                stroke="#000"
                strokeLinecap="round"
              >
                <path d={ARM_TUBE} strokeWidth="7" />
                <line
                  x1={HEAD_BACK.x}
                  y1={HEAD_BACK.y}
                  x2={HEAD_FRONT.x}
                  y2={HEAD_FRONT.y}
                  strokeWidth="12"
                />
              </g>

              {/* Counterweight */}
              <line
                x1={at(-30).x}
                y1={at(-30).y}
                x2={at(-48).x}
                y2={at(-48).y}
                stroke="#453a30"
                strokeWidth="17"
                strokeLinecap="round"
              />
              <line
                x1={at(-43).x}
                y1={at(-43).y}
                x2={at(-43.8).x}
                y2={at(-43.8).y}
                stroke="#241e18"
                strokeWidth="16"
              />
              <line
                x1={at(-33, -4).x}
                y1={at(-33, -4).y}
                x2={at(-45, -4).x}
                y2={at(-45, -4).y}
                stroke="#f2ece1"
                strokeOpacity="0.13"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <line
                x1={at(0).x}
                y1={at(0).y}
                x2={at(-32).x}
                y2={at(-32).y}
                stroke="#6b5a49"
                strokeWidth="4.5"
                strokeLinecap="round"
              />

              {/* Arm tube */}
              <path
                d={ARM_TUBE}
                fill="none"
                stroke="url(#vr-metal)"
                strokeWidth="5.5"
                strokeLinecap="round"
              />
              {/* Headshell, offset from the tube like the real thing */}
              <line
                x1={HEAD_BACK.x}
                y1={HEAD_BACK.y}
                x2={HEAD_FRONT.x}
                y2={HEAD_FRONT.y}
                stroke="#2b241d"
                strokeWidth="10.5"
                strokeLinecap="round"
              />
              <line
                x1={HEAD_BACK.x}
                y1={HEAD_BACK.y}
                x2={HEAD_FRONT.x}
                y2={HEAD_FRONT.y}
                stroke="var(--accent-copper)"
                strokeOpacity="0.5"
                strokeWidth="1.2"
                strokeLinecap="round"
              />

              {/* Stylus in the groove */}
              <line
                x1={HEAD_FRONT.x}
                y1={HEAD_FRONT.y}
                x2={STYLUS.x}
                y2={STYLUS.y}
                stroke="#8a7461"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <circle cx={STYLUS.x} cy={STYLUS.y} r="6" fill="var(--accent-copper)" opacity="0.22" />
              <circle cx={STYLUS.x} cy={STYLUS.y} r="2.4" fill="var(--accent-copper)" />

              {/* Bearing housing */}
              <circle cx={PIVOT.x} cy={PIVOT.y} r="13" fill="#241e18" stroke="#4a4038" strokeWidth="1.2" />
              <circle cx={PIVOT.x} cy={PIVOT.y} r="6.5" fill="url(#vr-metal)" />
              <circle cx={PIVOT.x} cy={PIVOT.y} r="2" fill="#17140f" />
            </motion.g>
          </svg>
        </div>
      </div>
    </div>
  );
}
