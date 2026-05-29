// import { useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// export type DoorDestination = "/login" | "/signup";

// /**
//  * GATE_BOUNDS: where the castle's double gate sits in the final scroll frame.
//  * These values represent the gate's position as fractions of the viewport.
//  *
//  * The full-scene snapshot is used as the background (castle + walls + sky).
//  * Each door panel also shows the snapshot — but clipped and offset so the
//  * left panel shows only the left half of the gate area, and the right panel
//  * shows only the right half. When they rotate open, the gate in the photo
//  * literally swings inward revealing the hellfire within.
//  *
//  * Tune left/top/width/height to match how far the castle gate is zoomed-in
//  * in your final video frame (scene 4). A good starting point is:
//  *   left   ≈ 0.30  (gate left edge at 30% of screen width)
//  *   top    ≈ 0.05  (gate top  at  5% of screen height)
//  *   width  ≈ 0.40  (gate spans 40% of screen width)
//  *   height ≈ 0.90  (gate nearly full height)
//  */
// export const GATE_BOUNDS = {
//   left:   0.30,
//   top:    0.05,
//   width:  0.40,
//   height: 0.90,
// } as const;

// // ── Timing ────────────────────────────────────────────────────────────────
// const CREAK_DELAY   = 0.3;   // weight of the ancient gate
// const OPEN_DURATION = 2.8;   // slow, heavy iron swing
// const WALK_DURATION = 2.0;   // camera pushes through the arch
// const TOTAL_MS      = 5800;

// /** 85° — near-flat against the walls so you see the inner face */
// const OPEN_ANGLE = 85;

// const easeHeavy = [0.06, 0, 0.10, 1] as const;  // very slow start → heavy iron feel
// const easeWalk  = [0.42, 0, 0.12, 1] as const;

// // ── Door Panel ────────────────────────────────────────────────────────────
// /**
//  * Each panel renders the scene snapshot at full viewport size, then clips to
//  * show only its half of the gate. This ensures the exact castle gate texture
//  * from the landing frame visually swings open — no separate door image needed.
//  */
// type PanelProps = { snapshot: string; side: "left" | "right" };

// const DoorPanel = ({ snapshot, side }: PanelProps) => {
//   const isLeft = side === "left";
//   const { left, top, width, height } = GATE_BOUNDS;

//   // Each panel occupies exactly half the gate area
//   const panelW = width / 2;    // as fraction of viewport width
//   const panelH = height;        // as fraction of viewport height

//   // Position of this panel on screen (in vw/vh units)
//   const panelLeft = isLeft ? left : left + panelW;
//   const panelTop  = top;

//   // The snapshot img inside the panel must be offset so the correct region
//   // of the full-scene image aligns with this panel's position
//   // img is rendered at 100vw × 100vh; we translate it to compensate for clip
//   const imgLeft = -panelLeft;   // negative so the gate region aligns
//   const imgTop  = -panelTop;

//   return (
//     <motion.div
//       style={{
//         position: "absolute",
//         left:   `${panelLeft * 100}%`,
//         top:    `${panelTop  * 100}%`,
//         width:  `${panelW    * 100}%`,
//         height: `${panelH    * 100}%`,
//         overflow: "hidden",
//         transformStyle: "preserve-3d",
//         transformOrigin: isLeft ? "left center" : "right center",
//         backfaceVisibility: "hidden",
//         WebkitBackfaceVisibility: "hidden",
//         // Subtle inset shadow on the seam edge for depth
//         boxShadow: isLeft
//           ? "inset -3px 0 12px rgba(0,0,0,0.6)"
//           : "inset  3px 0 12px rgba(0,0,0,0.6)",
//       }}
//       initial={{ rotateY: 0 }}
//       animate={{ rotateY: isLeft ? OPEN_ANGLE : -OPEN_ANGLE }}
//       transition={{
//         duration: OPEN_DURATION,
//         ease: easeHeavy,
//         delay: CREAK_DELAY,
//       }}
//     >
//       {/* ── Front face: the castle gate from the scene snapshot ──────── */}
//       <img
//         src={snapshot}
//         alt=""
//         draggable={false}
//         style={{
//           position: "absolute",
//           width:  "100vw",
//           height: "100vh",
//           maxWidth: "none",
//           objectFit: "cover",
//           left:  `${imgLeft * 100}vw`,
//           top:   `${imgTop  * 100}vh`,
//           userSelect: "none",
//           pointerEvents: "none",
//         }}
//       />

//       {/* ── Inner face (visible as it swings) — aged dark wood ───────── */}
//       <div
//         style={{
//           position: "absolute",
//           inset: 0,
//           background: isLeft
//             ? "linear-gradient(to right,  #09030a 0%, #160610 55%, rgba(80,15,8,0.25) 100%)"
//             : "linear-gradient(to left,   #09030a 0%, #160610 55%, rgba(80,15,8,0.25) 100%)",
//         }}
//       />

//       {/* Wood grain lines on the inner face */}
//       <div
//         style={{
//           position: "absolute",
//           inset: 0,
//           backgroundImage:
//             "repeating-linear-gradient(180deg, transparent, transparent 16px, rgba(0,0,0,0.14) 16px, rgba(0,0,0,0.14) 17px)",
//           mixBlendMode: "multiply",
//           opacity: 0.5,
//         }}
//       />

//       {/* Edge lip — perceived thickness along the seam */}
//       <div
//         style={{
//           position: "absolute",
//           top: 0, bottom: 0,
//           [isLeft ? "right" : "left"]: 0,
//           width: "5px",
//           background: "linear-gradient(180deg, rgba(200,80,20,0.7), rgba(100,35,12,0.45) 50%, rgba(200,80,20,0.7))",
//         }}
//       />

//       {/* Iron hinge dots */}
//       {[0.18, 0.5, 0.82].map((yPos) => (
//         <div
//           key={yPos}
//           style={{
//             position: "absolute",
//             top:    `${yPos * 100}%`,
//             [isLeft ? "right" : "left"]: "2px",
//             transform: "translateY(-50%)",
//             width: "10px",
//             height: "20px",
//             borderRadius: "3px",
//             background: "linear-gradient(90deg, #3a1a08, #7a3a15, #3a1a08)",
//             boxShadow: "0 1px 4px rgba(0,0,0,0.7)",
//           }}
//         />
//       ))}
//     </motion.div>
//   );
// };

// // ── Main export ───────────────────────────────────────────────────────────
// export type DoorTransitionProps = {
//   active:        boolean;
//   destination:   DoorDestination;
//   sceneSnapshot: string | null;
//   onComplete:    () => void;
// };

// export const DoorTransition = ({
//   active,
//   destination,
//   sceneSnapshot,
//   onComplete,
// }: DoorTransitionProps) => {
//   useEffect(() => {
//     if (!active) return;
//     const t = setTimeout(onComplete, TOTAL_MS);
//     return () => clearTimeout(t);
//   }, [active, onComplete]);

//   const label =
//     destination === "/login" ? "Entering the Forsaken World…" : "Crossing the threshold…";

//   const { left, top, width, height } = GATE_BOUNDS;

//   if (!sceneSnapshot) return null;

//   return (
//     <AnimatePresence>
//       {active && (
//         <motion.div
//           style={{ position: "fixed", inset: 0, zIndex: 100, overflow: "hidden", background: "#000" }}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{   opacity: 0 }}
//           transition={{ duration: 0.08 }}
//         >
//           {/* ── Camera push — whole scene zooms forward slowly ─────────── */}
//           <motion.div
//             style={{ position: "absolute", inset: 0 }}
//             initial={{ scale: 1 }}
//             animate={{ scale: 2.8 }}
//             transition={{ duration: OPEN_DURATION + WALK_DURATION, ease: easeWalk, delay: 0.2 }}
//           >
//             {/* ── Frozen castle scene ───────────────────────────────────── */}
//             <img
//               src={sceneSnapshot}
//               alt=""
//               draggable={false}
//               style={{
//                 position: "absolute", inset: 0,
//                 width: "100%", height: "100%",
//                 objectFit: "cover",
//                 userSelect: "none", pointerEvents: "none",
//               }}
//             />

//             {/* ── Hellfire interior — grows from behind the opening gate ── */}
//             <motion.div
//               style={{ position: "absolute", zIndex: 18, overflow: "hidden" }}
//               initial={{
//                 left:         `${left   * 100}%`,
//                 top:          `${top    * 100}%`,
//                 width:        `${width  * 100}%`,
//                 height:       `${height * 100}%`,
//                 borderRadius: "4px",
//               }}
//               animate={{ left: "0%", top: "0%", width: "100%", height: "100%", borderRadius: "0px" }}
//               transition={{ delay: 0.35, duration: WALK_DURATION + 0.8, ease: easeWalk }}
//             >
//               {/* Deep hellfire glow */}
//               <motion.div
//                 style={{
//                   position: "absolute", inset: 0,
//                   background: `
//                     radial-gradient(
//                       ellipse 55% 50% at 50% 52%,
//                       rgba(255,120,50,0.92)  0%,
//                       rgba(200,50,15,0.65)  20%,
//                       rgba(80,15,6,0.75)    50%,
//                       #060101              100%
//                     ),
//                     linear-gradient(180deg, #1a0707 0%, #050101 100%)
//                   `,
//                 }}
//                 initial={{ opacity: 0.25 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.3, duration: 1.8 }}
//               />

//               {/* Perspective corridor depth lines */}
//               <motion.div
//                 style={{
//                   position: "absolute", inset: 0, opacity: 0.25,
//                   background:
//                     "repeating-linear-gradient(90deg, transparent, transparent 44px, rgba(0,0,0,0.2) 44px, rgba(0,0,0,0.2) 46px)",
//                 }}
//                 initial={{ scale: 0.45 }}
//                 animate={{ scale: 1.5 }}
//                 transition={{ delay: 0.5, duration: WALK_DURATION, ease: easeWalk }}
//               />

//               {/* Ember sparks rising */}
//               {[...Array(10)].map((_, i) => (
//                 <motion.div
//                   key={i}
//                   style={{
//                     position: "absolute",
//                     width:  1 + (i % 3),
//                     height: 1 + (i % 3),
//                     borderRadius: "50%",
//                     background: `rgba(${255 - i * 6}, ${65 + i * 8}, 12, 0.95)`,
//                     left:   `${12 + i * 8}%`,
//                     bottom: `${18 + (i % 4) * 9}%`,
//                     filter: "blur(0.4px)",
//                   }}
//                   animate={{
//                     y:       [0, -(45 + i * 16)],
//                     opacity: [0, 0.9, 0],
//                     x:       [0, i % 2 === 0 ? 7 : -7],
//                   }}
//                   transition={{
//                     duration: 1.4 + i * 0.22,
//                     repeat:   Infinity,
//                     delay:    0.85 + i * 0.18,
//                     ease:     "easeOut",
//                   }}
//                 />
//               ))}
//             </motion.div>

//             {/* ── The two gate door panels ───────────────────────────────── */}
//             <div
//               style={{
//                 position: "absolute", zIndex: 25,
//                 inset: 0,
//                 transformStyle: "preserve-3d",
//                 perspective: "1400px",
//                 perspectiveOrigin: "50% 46%",
//               }}
//             >
//               <DoorPanel snapshot={sceneSnapshot} side="left"  />
//               <DoorPanel snapshot={sceneSnapshot} side="right" />
//             </div>
//           </motion.div>

//           {/* ── Tunnel vignette — focuses gaze as you walk through ─────── */}
//           <motion.div
//             style={{
//               position: "absolute", inset: 0, zIndex: 35, pointerEvents: "none",
//               background:
//                 "radial-gradient(ellipse 28% 26% at 50% 47%, transparent 0%, rgba(0,0,0,0.75) 60%, rgba(0,0,0,0.97) 100%)",
//             }}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: OPEN_DURATION + 0.15, duration: 1.8 }}
//           />

//           {/* ── Final fade to app ──────────────────────────────────────── */}
//           <motion.div
//             style={{ position: "absolute", inset: 0, zIndex: 40, background: "#0B0B0B", pointerEvents: "none" }}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: OPEN_DURATION + WALK_DURATION * 0.55, duration: 1.3 }}
//           />

//           {/* ── Label ─────────────────────────────────────────────────── */}
//           <motion.p
//             style={{
//               position: "absolute", bottom: "8vh", left: 0, right: 0, zIndex: 50,
//               textAlign: "center",
//               fontFamily: "var(--font-display, serif)",
//               fontSize: "clamp(0.65rem, 1.6vw, 0.95rem)",
//               letterSpacing: "0.38em",
//               textTransform: "uppercase",
//               color: "rgba(234,234,234,0.8)",
//               pointerEvents: "none",
//             }}
//             initial={{ opacity: 0, y: 8 }}
//             animate={{ opacity: [0, 1, 1, 0], y: 0 }}
//             transition={{ duration: TOTAL_MS / 1000, times: [0, 0.05, 0.72, 1] }}
//           >
//             {label}
//           </motion.p>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };



import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type DoorDestination = "/login" | "/signup";

/**
 * GATE_BOUNDS: where the castle's double gate sits in the final scroll frame.
 * Tuned to match the castle gate position in the video's last frame.
 * Adjust these if the gate appears at a different position.
 */
export const GATE_BOUNDS = {
  left:   0.28,
  top:    0.08,
  width:  0.44,
  height: 0.88,
} as const;

// ── Timing ────────────────────────────────────────────────────────────────
const CREAK_DELAY   = 0.3;
const OPEN_DURATION = 2.8;
const WALK_DURATION = 2.0;
const TOTAL_MS      = 5800;

/** 85° — near-flat against the walls */
const OPEN_ANGLE = 85;

const easeHeavy = [0.06, 0, 0.10, 1] as const;
const easeWalk  = [0.42, 0, 0.12, 1] as const;

// ── Door Panel ────────────────────────────────────────────────────────────
/**
 * Each panel renders either:
 * (a) the scene snapshot clipped to its half of the gate area — so the
 *     actual castle gate from the video frame swings open, or
 * (b) the door.png asset if no snapshot is available
 */
type PanelProps = { snapshot: string | null; side: "left" | "right" };

const DoorPanel = ({ snapshot, side }: PanelProps) => {
  const isLeft = side === "left";
  const { left, top, width, height } = GATE_BOUNDS;

  const panelW = width / 2;
  const panelH = height;
  const panelLeft = isLeft ? left : left + panelW;
  const panelTop  = top;

  // Offset the snapshot inside the panel so the gate region aligns
  const imgLeft = -panelLeft;
  const imgTop  = -panelTop;

  return (
    <motion.div
      style={{
        position: "absolute",
        left:   `${panelLeft * 100}%`,
        top:    `${panelTop  * 100}%`,
        width:  `${panelW    * 100}%`,
        height: `${panelH    * 100}%`,
        overflow: "hidden",
        transformStyle: "preserve-3d",
        transformOrigin: isLeft ? "left center" : "right center",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        boxShadow: isLeft
          ? "inset -4px 0 16px rgba(0,0,0,0.7), -2px 0 8px rgba(0,0,0,0.5)"
          : "inset  4px 0 16px rgba(0,0,0,0.7),  2px 0 8px rgba(0,0,0,0.5)",
      }}
      initial={{ rotateY: 0 }}
      animate={{ rotateY: isLeft ? OPEN_ANGLE : -OPEN_ANGLE }}
      transition={{
        duration: OPEN_DURATION,
        ease: easeHeavy,
        delay: CREAK_DELAY,
      }}
    >
      {/* ── Front face: scene snapshot showing the actual castle gate ─── */}
      {snapshot ? (
        <img
          src={snapshot}
          alt=""
          draggable={false}
          style={{
            position: "absolute",
            width:  "100vw",
            height: "100vh",
            maxWidth: "none",
            objectFit: "cover",
            left:  `${imgLeft * 100}vw`,
            top:   `${imgTop  * 100}vh`,
            userSelect: "none",
            pointerEvents: "none",
          }}
        />
      ) : (
        /* Fallback: use door.png if no snapshot captured */
        <img
          src="/assets/door.png"
          alt=""
          draggable={false}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: isLeft ? "right center" : "left center",
            userSelect: "none",
            pointerEvents: "none",
          }}
        />
      )}

      {/* ── Inner face visible as door swings open ─── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: isLeft
            ? "linear-gradient(to right,  #09030a 0%, #160610 55%, rgba(80,15,8,0.25) 100%)"
            : "linear-gradient(to left,   #09030a 0%, #160610 55%, rgba(80,15,8,0.25) 100%)",
        }}
      />

      {/* Wood grain texture on the inner face */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(180deg, transparent, transparent 16px, rgba(0,0,0,0.14) 16px, rgba(0,0,0,0.14) 17px)",
          mixBlendMode: "multiply",
          opacity: 0.5,
        }}
      />

      {/* Edge lip — depth along the seam */}
      <div
        style={{
          position: "absolute",
          top: 0, bottom: 0,
          [isLeft ? "right" : "left"]: 0,
          width: "5px",
          background: "linear-gradient(180deg, rgba(200,80,20,0.7), rgba(100,35,12,0.45) 50%, rgba(200,80,20,0.7))",
        }}
      />

      {/* Iron hinges */}
      {[0.18, 0.5, 0.82].map((yPos) => (
        <div
          key={yPos}
          style={{
            position: "absolute",
            top:    `${yPos * 100}%`,
            [isLeft ? "right" : "left"]: "2px",
            transform: "translateY(-50%)",
            width: "10px",
            height: "20px",
            borderRadius: "3px",
            background: "linear-gradient(90deg, #3a1a08, #7a3a15, #3a1a08)",
            boxShadow: "0 1px 4px rgba(0,0,0,0.7)",
          }}
        />
      ))}
    </motion.div>
  );
};

// ── Main export ───────────────────────────────────────────────────────────
export type DoorTransitionProps = {
  active:        boolean;
  destination:   DoorDestination;
  sceneSnapshot: string | null;
  onComplete:    () => void;
};

export const DoorTransition = ({
  active,
  destination,
  sceneSnapshot,
  onComplete,
}: DoorTransitionProps) => {
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(onComplete, TOTAL_MS);
    return () => clearTimeout(t);
  }, [active, onComplete]);

  const label =
    destination === "/login" ? "Entering the Forsaken World…" : "Crossing the threshold…";

  const { left, top, width, height } = GATE_BOUNDS;

  // Don't render if not active (even if no snapshot — we have fallback)
  if (!active) return null;

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          style={{ position: "fixed", inset: 0, zIndex: 100, overflow: "hidden", background: "#000" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{   opacity: 0 }}
          transition={{ duration: 0.08 }}
        >
          {/* ── Camera push — whole scene zooms forward ─────────────────── */}
          <motion.div
            style={{ position: "absolute", inset: 0 }}
            initial={{ scale: 1 }}
            animate={{ scale: 2.8 }}
            transition={{ duration: OPEN_DURATION + WALK_DURATION, ease: easeWalk, delay: 0.2 }}
          >
            {/* ── Frozen castle scene background ───────────────────────── */}
            {sceneSnapshot && (
              <img
                src={sceneSnapshot}
                alt=""
                draggable={false}
                style={{
                  position: "absolute", inset: 0,
                  width: "100%", height: "100%",
                  objectFit: "cover",
                  userSelect: "none", pointerEvents: "none",
                }}
              />
            )}

            {/* ── Hellfire interior — grows from behind the gate ────────── */}
            <motion.div
              style={{ position: "absolute", zIndex: 18, overflow: "hidden" }}
              initial={{
                left:         `${left   * 100}%`,
                top:          `${top    * 100}%`,
                width:        `${width  * 100}%`,
                height:       `${height * 100}%`,
                borderRadius: "4px",
              }}
              animate={{ left: "0%", top: "0%", width: "100%", height: "100%", borderRadius: "0px" }}
              transition={{ delay: 0.35, duration: WALK_DURATION + 0.8, ease: easeWalk }}
            >
              <motion.div
                style={{
                  position: "absolute", inset: 0,
                  background: `
                    radial-gradient(
                      ellipse 55% 50% at 50% 52%,
                      rgba(255,120,50,0.92)  0%,
                      rgba(200,50,15,0.65)  20%,
                      rgba(80,15,6,0.75)    50%,
                      #060101              100%
                    ),
                    linear-gradient(180deg, #1a0707 0%, #050101 100%)
                  `,
                }}
                initial={{ opacity: 0.25 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 1.8 }}
              />

              <motion.div
                style={{
                  position: "absolute", inset: 0, opacity: 0.25,
                  background:
                    "repeating-linear-gradient(90deg, transparent, transparent 44px, rgba(0,0,0,0.2) 44px, rgba(0,0,0,0.2) 46px)",
                }}
                initial={{ scale: 0.45 }}
                animate={{ scale: 1.5 }}
                transition={{ delay: 0.5, duration: WALK_DURATION, ease: easeWalk }}
              />

              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  style={{
                    position: "absolute",
                    width:  1 + (i % 3),
                    height: 1 + (i % 3),
                    borderRadius: "50%",
                    background: `rgba(${255 - i * 6}, ${65 + i * 8}, 12, 0.95)`,
                    left:   `${12 + i * 8}%`,
                    bottom: `${18 + (i % 4) * 9}%`,
                    filter: "blur(0.4px)",
                  }}
                  animate={{
                    y:       [0, -(45 + i * 16)],
                    opacity: [0, 0.9, 0],
                    x:       [0, i % 2 === 0 ? 7 : -7],
                  }}
                  transition={{
                    duration: 1.4 + i * 0.22,
                    repeat:   Infinity,
                    delay:    0.85 + i * 0.18,
                    ease:     "easeOut",
                  }}
                />
              ))}
            </motion.div>

            {/* ── The two gate panels ───────────────────────────────────── */}
            <div
              style={{
                position: "absolute", zIndex: 25,
                inset: 0,
                transformStyle: "preserve-3d",
                perspective: "1400px",
                perspectiveOrigin: "50% 46%",
              }}
            >
              <DoorPanel snapshot={sceneSnapshot} side="left"  />
              <DoorPanel snapshot={sceneSnapshot} side="right" />
            </div>
          </motion.div>

          {/* ── Tunnel vignette ───────────────────────────────────────── */}
          <motion.div
            style={{
              position: "absolute", inset: 0, zIndex: 35, pointerEvents: "none",
              background:
                "radial-gradient(ellipse 28% 26% at 50% 47%, transparent 0%, rgba(0,0,0,0.75) 60%, rgba(0,0,0,0.97) 100%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: OPEN_DURATION + 0.15, duration: 1.8 }}
          />

          {/* ── Final fade to app ──────────────────────────────────────── */}
          <motion.div
            style={{ position: "absolute", inset: 0, zIndex: 40, background: "#0B0B0B", pointerEvents: "none" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: OPEN_DURATION + WALK_DURATION * 0.55, duration: 1.3 }}
          />

          {/* ── Label ─────────────────────────────────────────────────── */}
          <motion.p
            style={{
              position: "absolute", bottom: "8vh", left: 0, right: 0, zIndex: 50,
              textAlign: "center",
              fontFamily: "var(--font-display, serif)",
              fontSize: "clamp(0.65rem, 1.6vw, 0.95rem)",
              letterSpacing: "0.38em",
              textTransform: "uppercase",
              color: "rgba(234,234,234,0.8)",
              pointerEvents: "none",
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: [0, 1, 1, 0], y: 0 }}
            transition={{ duration: TOTAL_MS / 1000, times: [0, 0.05, 0.72, 1] }}
          >
            {label}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};