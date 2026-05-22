import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type DoorDestination = "/login" | "/signup";

/**
 * Gate region on the final scroll frame (matches the ornate double gate in the video).
 * Center seam is at 50% — left/right panels hinge on the outer stone edges.
 */
export const GATE_BOUNDS = {
  left: 0.235,
  top: 0.04,
  width: 0.53,
  height: 0.9,
} as const;

const OPEN_DURATION = 2.6;
const WALK_DURATION = 1.8;
const TOTAL_MS = 4500;
const OPEN_ANGLE = 94;
const easeOpen = [0.22, 1, 0.36, 1] as const;
const easeWalk = [0.45, 0, 0.15, 1] as const;

type DoorTransitionProps = {
  active: boolean;
  destination: DoorDestination;
  sceneSnapshot: string | null;
  onComplete: () => void;
};

const snapshotSliceStyle = (side: "left" | "right") => {
  const { left, top, width } = GATE_BOUNDS;
  const offsetLeft = side === "left" ? left : left + width / 2;
  return {
    position: "absolute" as const,
    width: "100vw",
    height: "100vh",
    maxWidth: "none",
    objectFit: "cover" as const,
    left: `calc(-${offsetLeft * 100}vw)`,
    top: `calc(-${top * 100}vh)`,
  };
};

const GateLeaf = ({ snapshot, side }: { snapshot: string; side: "left" | "right" }) => (
  <motion.div
    className={`absolute top-0 z-30 h-full w-1/2 overflow-hidden ${side === "left" ? "left-0" : "right-0"}`}
    style={{
      transformStyle: "preserve-3d",
      transformOrigin: side === "left" ? "left center" : "right center",
      backfaceVisibility: "hidden",
      WebkitBackfaceVisibility: "hidden",
    }}
    initial={{ rotateY: 0 }}
    animate={{ rotateY: side === "left" ? OPEN_ANGLE : -OPEN_ANGLE }}
    transition={{ duration: OPEN_DURATION, ease: easeOpen, delay: 0.2 }}
  >
    <img
      src={snapshot}
      alt=""
      className="pointer-events-none select-none"
      draggable={false}
      style={snapshotSliceStyle(side)}
    />
  </motion.div>
);

export const DoorTransition = ({ active, destination, sceneSnapshot, onComplete }: DoorTransitionProps) => {
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(onComplete, TOTAL_MS);
    return () => clearTimeout(t);
  }, [active, onComplete]);

  const label = destination === "/login" ? "Entering the Forsaken World…" : "Crossing the threshold…";
  const { left, top, width, height } = GATE_BOUNDS;

  if (!sceneSnapshot) return null;

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
        >
          {/* Walk-through: push into the opening */}
          <motion.div
            className="absolute inset-0 origin-center"
            style={{ perspective: "2000px", perspectiveOrigin: "50% 48%" }}
            initial={{ scale: 1 }}
            animate={{ scale: 2.35 }}
            transition={{ duration: OPEN_DURATION + WALK_DURATION, ease: easeWalk, delay: 0.35 }}
          >
            {/* Frozen gate scene (stone walls stay visible at the sides) */}
            <img
              src={sceneSnapshot}
              alt=""
              className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none"
              draggable={false}
            />

            {/* Interior — grows from the gate into full screen as you enter */}
            <motion.div
              className="absolute z-[18] overflow-hidden"
              initial={{
                left: `${left * 100}%`,
                top: `${top * 100}%`,
                width: `${width * 100}%`,
                height: `${height * 100}%`,
                borderRadius: "2px",
              }}
              animate={{
                left: "0%",
                top: "0%",
                width: "100%",
                height: "100%",
                borderRadius: "0px",
              }}
              transition={{ delay: 0.55, duration: WALK_DURATION + 0.4, ease: easeWalk }}
            >
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 1.2 }}
                style={{
                  background: `
                    radial-gradient(ellipse 55% 50% at 50% 48%, rgba(255, 120, 70, 0.85) 0%, rgba(200, 50, 25, 0.5) 25%, rgba(80, 15, 8, 0.6) 55%, #0a0303 100%),
                    linear-gradient(180deg, #1a0808 0%, #050202 100%)
                  `,
                }}
              />
              {/* Depth lines — hallway feel */}
              <motion.div
                className="absolute inset-0 opacity-40"
                initial={{ scale: 0.6 }}
                animate={{ scale: 1.2 }}
                transition={{ delay: 0.7, duration: WALK_DURATION, ease: easeWalk }}
                style={{
                  background:
                    "repeating-linear-gradient(90deg, transparent, transparent 48px, rgba(0,0,0,0.15) 48px, rgba(0,0,0,0.15) 50px)",
                }}
              />
            </motion.div>

            {/* Gate doors — the actual panels from your screenshot */}
            <div
              className="absolute z-[25]"
              style={{
                left: `${left * 100}%`,
                top: `${top * 100}%`,
                width: `${width * 100}%`,
                height: `${height * 100}%`,
                transformStyle: "preserve-3d",
              }}
            >
              <GateLeaf snapshot={sceneSnapshot} side="left" />
              <GateLeaf snapshot={sceneSnapshot} side="right" />
            </div>
          </motion.div>

          {/* Entering vignette */}
          <motion.div
            className="absolute inset-0 z-[35] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: OPEN_DURATION + 0.3, duration: 1.4 }}
            style={{
              background:
                "radial-gradient(ellipse 35% 30% at 50% 48%, transparent 0%, rgba(0,0,0,0.75) 70%, rgba(0,0,0,0.95) 100%)",
            }}
          />

          {/* Fade to app */}
          <motion.div
            className="absolute inset-0 z-[40] bg-[#0B0B0B] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: OPEN_DURATION + WALK_DURATION * 0.5, duration: 1 }}
          />

          <motion.p
            className="absolute bottom-[8vh] inset-x-0 z-50 text-center font-display text-sm md:text-lg tracking-[0.35em] text-[#EAEAEA]/90 pointer-events-none"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: [0, 1, 1, 0], y: 0 }}
            transition={{ duration: TOTAL_MS / 1000, times: [0, 0.08, 0.7, 1] }}
          >
            {label}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
