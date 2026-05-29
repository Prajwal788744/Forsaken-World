// import { useEffect, useRef, useState, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { DoorTransition, type DoorDestination } from "@/components/DoorTransition";

// gsap.registerPlugin(ScrollTrigger);

// const SCROLL_HEIGHT = 8;
// const VIDEO_SRC = "/assets/video.mp4";
// const WATERMARK_CROP = 0.07;
// const SCENE_T = [0, 0.25, 0.55, 0.8];
// /** More frames = smoother scroll (MP4 keyframes only jump every ~10 frames). */
// const TOTAL_FRAMES = 180;
// const MAX_EXTRACT_WIDTH = 1920;

// const seekVideo = (video: HTMLVideoElement, time: number) =>
//   new Promise<void>((resolve) => {
//     const done = () => {
//       video.removeEventListener("seeked", done);
//       resolve();
//     };
//     video.addEventListener("seeked", done);
//     try {
//       if (typeof video.fastSeek === "function") {
//         video.fastSeek(time);
//         return;
//       }
//     } catch {
//       /* fastSeek unsupported for this target */
//     }
//     video.currentTime = time;
//   });

// const FogLayer = ({ opacity = 0.15, speed = 20, reverse = false }: { opacity?: number; speed?: number; reverse?: boolean }) => (
//   <div
//     className="landing-fog absolute inset-0 pointer-events-none"
//     style={{
//       opacity,
//       backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 800 600' xmlns='http://www.w3.org/2000/svg'><filter id='f'><feTurbulence type='fractalNoise' baseFrequency='0.015' numOctaves='3' seed='2'/><feColorMatrix type='saturate' values='0'/></filter><rect width='800' height='600' filter='url(%23f)' opacity='0.4'/></svg>")`,
//       backgroundSize: "200% 200%",
//       animation: `fogDrift ${speed}s linear infinite ${reverse ? "reverse" : ""}`,
//     }}
//   />
// );

// const SceneTitle = ({ visible }: { visible: boolean }) => (
//   <AnimatePresence>
//     {visible && (
//       <motion.div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none"
//         initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}>
//         <motion.span className="inline-flex items-center gap-2 rounded-full border border-[#8B0000]/40 bg-[#8B0000]/10 px-5 py-1.5 text-[10px] font-bold uppercase tracking-[0.4em] text-[#EAEAEA] mb-8 backdrop-blur-sm"
//           initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>⛧ Enter the Forbidden ⛧</motion.span>
//         <motion.h1 className="font-display text-center select-none"
//           initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}>
//           <span className="block text-[clamp(3rem,10vw,8rem)] font-black leading-[0.9] tracking-[0.12em] text-[#EAEAEA]" style={{ textShadow: "0 0 60px rgba(0,0,0,0.8), 0 4px 20px rgba(0,0,0,0.5)" }}>FORSAKEN</span>
//           <span className="block text-[clamp(3rem,10vw,8rem)] font-black leading-[0.9] tracking-[0.12em] mt-2" style={{ background: "linear-gradient(135deg, #B22222, #8B0000, #660000)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", filter: "drop-shadow(0 0 30px rgba(139,0,0,0.5))" }}>WORLD</span>
//         </motion.h1>
//         <motion.p className="mt-8 text-center text-[#A0A0A0] text-base md:text-lg max-w-xl px-6" style={{ fontFamily: "'Inter', sans-serif" }}
//           initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
//           Some doors were never meant to be opened.<br /><span className="text-[#8B0000]/80 text-sm">Scroll to begin your descent…</span>
//         </motion.p>
//         <motion.div className="absolute bottom-[12vh] flex flex-col items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
//           <span className="text-[#A0A0A0] text-[10px] uppercase tracking-[0.3em]">Scroll</span>
//           <motion.div className="w-[1px] h-10 bg-gradient-to-b from-[#8B0000]/60 to-transparent" animate={{ scaleY: [1, 0.5, 1], opacity: [0.8, 0.3, 0.8] }} transition={{ duration: 2, repeat: Infinity }} />
//         </motion.div>
//       </motion.div>
//     )}
//   </AnimatePresence>
// );

// const SceneNarration = ({ visible }: { visible: boolean }) => (
//   <AnimatePresence>
//     {visible && (
//       <motion.div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
//         initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//         <motion.p className="text-center text-[#EAEAEA]/80 text-lg md:text-2xl font-display tracking-wider max-w-2xl px-8" style={{ textShadow: "0 0 40px rgba(0,0,0,0.9)" }}
//           initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 1.2 }}>
//           "The path grows darker…<br /><span className="text-[#8B0000]">the castle draws near."</span>
//         </motion.p>
//       </motion.div>
//     )}
//   </AnimatePresence>
// );

// const SceneApproach = ({ visible }: { visible: boolean }) => (
//   <AnimatePresence>
//     {visible && (
//       <motion.div className="absolute inset-0 flex items-end justify-center z-20 pointer-events-none pb-[15vh]"
//         initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//         <motion.div className="text-center" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
//           <p className="text-[#A0A0A0] text-xs uppercase tracking-[0.3em] mb-3">The gates of the forsaken</p>
//           <p className="text-[#EAEAEA] font-display text-xl md:text-3xl tracking-wider" style={{ textShadow: "0 0 30px rgba(139,0,0,0.4)" }}>
//             Do you dare to <span className="text-[#8B0000]">enter</span>?
//           </p>
//         </motion.div>
//       </motion.div>
//     )}
//   </AnimatePresence>
// );

// const SceneEntrance = ({
//   visible,
//   onLogin,
//   onSignup,
// }: {
//   visible: boolean;
//   onLogin: () => void;
//   onSignup: () => void;
// }) => (
//   <AnimatePresence>
//     {visible && (
//       <motion.div
//         className="absolute inset-0 flex flex-col items-center justify-end z-20 pb-[12vh]"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0, transition: { duration: 0.25 } }}
//       >
//         <motion.div className="absolute inset-x-0 top-0 h-full pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1.5 }}>
//           <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 40%, transparent 30%, rgba(0,0,0,0.7) 100%)" }} />
//           <motion.div className="absolute bottom-0 inset-x-0 h-[40%]" style={{ background: "radial-gradient(ellipse 40% 60% at 50% 100%, rgba(139,0,0,0.25), transparent 70%)" }}
//             animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }} />
//         </motion.div>
//         <motion.div className="relative z-10 text-center mb-10" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
//           <p className="font-display text-2xl md:text-4xl tracking-[0.15em] text-[#EAEAEA]" style={{ textShadow: "0 0 40px rgba(139,0,0,0.5)" }}>The Gate Awaits</p>
//           <div className="mt-2 w-20 h-[1px] mx-auto bg-gradient-to-r from-transparent via-[#8B0000] to-transparent" />
//         </motion.div>
//         <motion.div className="relative z-10 flex flex-col sm:flex-row items-center gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
//           <button
//             type="button"
//             onClick={onLogin}
//             className="group relative px-10 py-4 rounded-sm overflow-hidden cursor-pointer border border-[#8B0000]/60 bg-[#8B0000]/20 backdrop-blur-md hover:bg-[#8B0000]/40 hover:border-[#B22222]/80 transition-all duration-500"
//           >
//             <span className="relative z-10 font-display text-sm md:text-base tracking-[0.25em] uppercase text-[#EAEAEA] group-hover:text-white transition-colors">
//               Login
//             </span>
//             <div
//               className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
//               style={{ boxShadow: "inset 0 0 30px rgba(139,0,0,0.4)" }}
//             />
//           </button>
//           <button
//             type="button"
//             onClick={onSignup}
//             className="group px-10 py-4 rounded-sm cursor-pointer border border-[#EAEAEA]/15 bg-white/5 backdrop-blur-md hover:border-[#EAEAEA]/30 hover:bg-white/10 transition-all duration-500"
//           >
//             <span className="font-display text-sm md:text-base tracking-[0.25em] uppercase text-[#A0A0A0] group-hover:text-[#EAEAEA] transition-colors">
//               Sign up
//             </span>
//           </button>
//         </motion.div>
//       </motion.div>
//     )}
//   </AnimatePresence>
// );

// const Index = () => {
//   const navigate = useNavigate();
//   const containerRef = useRef<HTMLDivElement>(null);
//   const canvasWrapRef = useRef<HTMLDivElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const framesRef = useRef<ImageBitmap[]>([]);
//   const lastFrameIndexRef = useRef(-1);
//   const sceneRef = useRef(1);

//   const [currentScene, setCurrentScene] = useState(1);
//   const [loadProgress, setLoadProgress] = useState(0);
//   const [isReady, setIsReady] = useState(false);
//   const [loadError, setLoadError] = useState<string | null>(null);
//   const [doorActive, setDoorActive] = useState(false);
//   const [doorDestination, setDoorDestination] = useState<DoorDestination>("/login");
//   const [sceneSnapshot, setSceneSnapshot] = useState<string | null>(null);

//   const vignetteRef = useRef<HTMLDivElement>(null);
//   const darkRef = useRef<HTMLDivElement>(null);
//   const fogRef = useRef<HTMLDivElement>(null);

//   const sceneFromProgress = useCallback((p: number) => {
//     if (p >= SCENE_T[3]) return 4;
//     if (p >= SCENE_T[2]) return 3;
//     if (p >= SCENE_T[1]) return 2;
//     return 1;
//   }, []);

//   const frameIndexFromProgress = useCallback((progress: number, frameCount: number) => {
//     if (frameCount <= 1) return 0;
//     return Math.min(frameCount - 1, Math.max(0, Math.round(progress * (frameCount - 1))));
//   }, []);

//   const syncOverlays = useCallback(
//     (progress: number) => {
//       if (vignetteRef.current) {
//         vignetteRef.current.style.background = `radial-gradient(ellipse 70% 60% at 50% 50%, transparent 20%, rgba(0,0,0,${0.4 + progress * 0.4}) 100%)`;
//       }
//       if (darkRef.current) {
//         darkRef.current.style.backgroundColor = `rgba(11,11,11,${Math.max(0, (progress - 0.7) * 1.5) * 0.3})`;
//       }
//       if (fogRef.current) {
//         fogRef.current.style.opacity = String(0.5 + progress * 0.4);
//       }
//       const scene = sceneFromProgress(progress);
//       if (sceneRef.current !== scene) {
//         sceneRef.current = scene;
//         setCurrentScene(scene);
//       }
//     },
//     [sceneFromProgress],
//   );

//   const drawFrame = useCallback(
//     (progress: number) => {
//       const canvas = canvasRef.current;
//       const frames = framesRef.current;
//       if (!canvas || !frames.length) return;

//       const index = frameIndexFromProgress(progress, frames.length);
//       if (index === lastFrameIndexRef.current) return;
//       lastFrameIndexRef.current = index;

//       const ctx = canvas.getContext("2d", { alpha: false });
//       if (!ctx) return;

//       const frame = frames[index];
//       const cw = canvas.width;
//       const ch = canvas.height;
//       const fw = frame.width;
//       const fh = frame.height;
//       const scale = Math.max(cw / fw, ch / fh);
//       const sw = cw / scale;
//       const sh = ch / scale;
//       const sx = (fw - sw) / 2;
//       const sy = (fh - sh) / 2;

//       ctx.imageSmoothingEnabled = true;
//       ctx.clearRect(0, 0, cw, ch);
//       ctx.drawImage(frame, sx, sy, sw, sh, 0, 0, cw, ch);
//     },
//     [frameIndexFromProgress],
//   );

//   const syncScroll = useCallback(
//     (progress: number) => {
//       const wrap = canvasWrapRef.current;
//       if (wrap) {
//         wrap.style.transform = `scale(${1 + progress * 0.12})`;
//       }
//       drawFrame(progress);
//       syncOverlays(progress);
//     },
//     [drawFrame, syncOverlays],
//   );

//   useEffect(() => {
//     let cancelled = false;
//     const video = document.createElement("video");
//     video.src = VIDEO_SRC;
//     video.muted = true;
//     video.playsInline = true;
//     video.preload = "auto";

//     const extract = async () => {
//       await new Promise<void>((res, rej) => {
//         video.onloadedmetadata = () => res();
//         video.onerror = () => rej(new Error("Video failed to load"));
//       });
//       if (cancelled) return;

//       const duration = video.duration;
//       const vw = video.videoWidth;
//       const vh = video.videoHeight;
//       const cropH = Math.floor(vh * (1 - WATERMARK_CROP));
//       const extractW = Math.min(vw, MAX_EXTRACT_WIDTH);
//       const extractH = Math.round(cropH * (extractW / vw));

//       const offscreen = document.createElement("canvas");
//       offscreen.width = extractW;
//       offscreen.height = extractH;
//       const octx = offscreen.getContext("2d")!;
//       const frames: ImageBitmap[] = [];

//       for (let i = 0; i < TOTAL_FRAMES; i++) {
//         if (cancelled) return;
//         const time = (i / (TOTAL_FRAMES - 1)) * duration;
//         await seekVideo(video, time);
//         octx.drawImage(video, 0, 0, vw, cropH, 0, 0, extractW, extractH);
//         frames.push(await createImageBitmap(offscreen));
//         setLoadProgress(Math.round(((i + 1) / TOTAL_FRAMES) * 100));
//       }

//       if (!cancelled) {
//         framesRef.current = frames;
//         setIsReady(true);
//       }
//     };

//     extract().catch((err) => {
//       console.error(err);
//       if (!cancelled) {
//         setLoadError(
//           err instanceof Error ? err.message : "Could not load scroll video. Check /assets/video.mp4 on the server.",
//         );
//       }
//     });
//     return () => {
//       cancelled = true;
//       video.src = "";
//       framesRef.current.forEach((f) => f.close());
//       framesRef.current = [];
//     };
//   }, []);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const resize = () => {
//       const dpr = Math.min(window.devicePixelRatio || 1, 2);
//       canvas.width = Math.min(Math.ceil(window.innerWidth * dpr), 3840);
//       canvas.height = Math.min(Math.ceil(window.innerHeight * dpr), 2160);
//       canvas.style.width = `${window.innerWidth}px`;
//       canvas.style.height = `${window.innerHeight}px`;
//       lastFrameIndexRef.current = -1;
//     };
//     resize();
//     window.addEventListener("resize", resize);
//     return () => window.removeEventListener("resize", resize);
//   }, []);

//   useEffect(() => {
//     if (!isReady) return;
//     const container = containerRef.current;
//     if (!container) return;

//     const st = ScrollTrigger.create({
//       trigger: container,
//       start: "top top",
//       end: "bottom bottom",
//       scrub: true,
//       invalidateOnRefresh: true,
//       onUpdate: (self) => syncScroll(self.progress),
//     });

//     syncScroll(st.progress);

//     return () => st.kill();
//   }, [isReady, syncScroll]);

//   const captureSceneSnapshot = useCallback(() => {
//     const canvas = canvasRef.current;
//     if (!canvas || canvas.width === 0) return null;
//     try {
//       return canvas.toDataURL("image/jpeg", 0.92);
//     } catch {
//       return null;
//     }
//   }, []);

//   const handleDoorEnter = useCallback(
//     (dest: DoorDestination) => {
//       const snapshot = captureSceneSnapshot();
//       setSceneSnapshot(snapshot);
//       setDoorDestination(dest);
//       setDoorActive(true);
//     },
//     [captureSceneSnapshot],
//   );

//   useEffect(() => {
//     if (!doorActive) return;
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [doorActive]);

//   const handleDoorComplete = useCallback(() => {
//     navigate(doorDestination);
//   }, [navigate, doorDestination]);

//   return (
//     <>
//       <AnimatePresence>
//         {!isReady && !loadError && (
//           <motion.div className="fixed inset-0 z-[60] bg-[#0B0B0B] flex flex-col items-center justify-center" exit={{ opacity: 0 }} transition={{ duration: 1.2 }}>
//             <motion.div className="w-16 h-16 rounded-full border-2 border-[#8B0000]/30 border-t-[#8B0000]" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
//             <p className="mt-8 font-display text-sm tracking-[0.3em] text-[#A0A0A0]">Preparing frames…</p>
//             <div className="mt-6 w-48 h-[2px] bg-[#1a1a1a] rounded-full overflow-hidden">
//               <motion.div className="h-full bg-gradient-to-r from-[#8B0000] to-[#B22222] rounded-full" style={{ width: `${loadProgress}%` }} />
//             </div>
//             <p className="mt-3 text-[#8B0000]/70 text-xs tracking-[0.2em] font-display">{loadProgress}%</p>
//           </motion.div>
//         )}
//         {loadError && (
//           <div
//             className="fixed inset-0 z-[60] flex flex-col items-center justify-center px-6 text-center"
//             style={{ background: "#0B0B0B" }}
//           >
//             <p className="text-[#EAEAEA] font-display text-lg tracking-wide">Could not load the experience</p>
//             <p className="mt-4 max-w-md text-sm text-[#A0A0A0]">{loadError}</p>
//             <p className="mt-6 max-w-md text-xs text-[#8B0000]/80">
//               On Render: set Publish Directory to <strong>dist</strong>, Build Command to{" "}
//               <code className="text-[#EAEAEA]">npm ci &amp;&amp; npm run build</code>, then redeploy.
//             </p>
//           </div>
//         )}
//       </AnimatePresence>
//       <DoorTransition
//         active={doorActive}
//         destination={doorDestination}
//         sceneSnapshot={sceneSnapshot}
//         onComplete={handleDoorComplete}
//       />
//       <div ref={containerRef} className="relative" style={{ height: `${SCROLL_HEIGHT * 100}vh` }}>
//         <div
//           className="fixed inset-0 z-0 overflow-hidden bg-[#0B0B0B]"
//           style={{ background: "#0B0B0B", width: "100vw", height: "100vh" }}
//         >
//           <div
//             ref={canvasWrapRef}
//             className="absolute inset-0 origin-center will-change-transform"
//             style={{ transform: "scale(1)", position: "absolute", inset: 0 }}
//           >
//             <canvas
//               ref={canvasRef}
//               className="absolute inset-0 h-full w-full"
//               style={{
//                 opacity: isReady ? 1 : 0,
//                 transition: "opacity 0.8s ease",
//                 position: "absolute",
//                 inset: 0,
//                 width: "100%",
//                 height: "100%",
//                 display: "block",
//               }}
//             />
//           </div>
//           <div ref={vignetteRef} className="absolute inset-0 pointer-events-none z-10" />
//           <div ref={darkRef} className="absolute inset-0 pointer-events-none z-10" />
//           <div ref={fogRef} className="absolute inset-0 z-10 pointer-events-none">
//             <FogLayer opacity={0.08} speed={25} />
//             <FogLayer opacity={0.06} speed={35} reverse />
//           </div>
//           <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#0B0B0B]/60 to-transparent z-10 pointer-events-none" />
//           <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#0B0B0B]/60 to-transparent z-10 pointer-events-none" />
//           <div
//             className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-700"
//             style={{
//               background: "radial-gradient(circle at 50% 70%, rgba(139,0,0,0.15), transparent 60%)",
//               opacity: currentScene >= 3 ? 0.5 : 0,
//             }}
//           />
//           <div className="absolute inset-0 z-[15] pointer-events-none opacity-[0.04]"
//             style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`, backgroundSize: "128px 128px" }} />
//           <SceneTitle visible={currentScene === 1 && !doorActive} />
//           <SceneNarration visible={currentScene === 2 && !doorActive} />
//           <SceneApproach visible={currentScene === 3 && !doorActive} />
//           <SceneEntrance
//             visible={currentScene === 4 && !doorActive}
//             onLogin={() => handleDoorEnter("/login")}
//             onSignup={() => handleDoorEnter("/signup")}
//           />
//           {!doorActive && (
//             <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-1">
//               {[1, 2, 3, 4].map(s => (
//                 <div key={s} className="flex flex-col items-center">
//                   <motion.div
//                     className="w-[3px] rounded-full"
//                     animate={{
//                       height: currentScene === s ? 24 : 8,
//                       backgroundColor: currentScene === s ? "#8B0000" : "rgba(234,234,234,0.15)",
//                       boxShadow: currentScene === s ? "0 0 8px rgba(139,0,0,0.5)" : "0 0 0px transparent",
//                     }}
//                     transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
//                   />
//                   {s < 4 && <div className="h-3" />}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Index;




import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { DoorTransition, type DoorDestination } from "@/components/DoorTransition";

/* ─── constants ─────────────────────────────────────────────────────────── */
const SCROLL_HEIGHT = 8;   // viewport-heights of scroll room
const VIDEO_SRC     = "/assets/video.mp4";
const WATERMARK_CROP = 0.07;                 // fraction to hide at bottom
const SCENE_T = [0, 0.25, 0.55, 0.8] as const;

/* ─── helpers ───────────────────────────────────────────────────────────── */
const sceneFromProgress = (p: number): 1 | 2 | 3 | 4 => {
  if (p >= SCENE_T[3]) return 4;
  if (p >= SCENE_T[2]) return 3;
  if (p >= SCENE_T[1]) return 2;
  return 1;
};

/* ─── sub-components ────────────────────────────────────────────────────── */

/** Animated film-grain overlay — pure CSS, zero JS cost */
const FilmGrain = () => (
  <div
    className="absolute inset-0 pointer-events-none z-[15] opacity-[0.035]"
    style={{
      backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
      backgroundSize: "128px 128px",
    }}
  />
);

/** Parallax fog — CSS animation only */
const FogLayer = ({
  opacity = 0.15,
  speed = 20,
  reverse = false,
}: {
  opacity?: number;
  speed?: number;
  reverse?: boolean;
}) => (
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      opacity,
      backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 800 600' xmlns='http://www.w3.org/2000/svg'><filter id='f'><feTurbulence type='fractalNoise' baseFrequency='0.015' numOctaves='3' seed='2'/><feColorMatrix type='saturate' values='0'/></filter><rect width='800' height='600' filter='url(%23f)' opacity='0.4'/></svg>")`,
      backgroundSize: "200% 200%",
      animation: `fogDrift ${speed}s linear infinite ${reverse ? "reverse" : ""}`,
      willChange: "background-position",
    }}
  />
);

/* Scene overlays */
const SceneTitle = ({ visible }: { visible: boolean }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.span
          className="inline-flex items-center gap-2 rounded-full border border-[#8B0000]/40 bg-[#8B0000]/10 px-5 py-1.5 text-[10px] font-bold uppercase tracking-[0.4em] text-[#EAEAEA] mb-8 backdrop-blur-sm"
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        >⛧ Enter the Forbidden ⛧</motion.span>

        <motion.h1
          className="font-display text-center select-none"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="block text-[clamp(3rem,10vw,8rem)] font-black leading-[0.9] tracking-[0.12em] text-[#EAEAEA]"
            style={{ textShadow: "0 0 60px rgba(0,0,0,0.8), 0 4px 20px rgba(0,0,0,0.5)" }}
          >FORSAKEN</span>
          <span
            className="block text-[clamp(3rem,10vw,8rem)] font-black leading-[0.9] tracking-[0.12em] mt-2"
            style={{
              background: "linear-gradient(135deg, #B22222, #8B0000, #660000)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              filter: "drop-shadow(0 0 30px rgba(139,0,0,0.5))",
            }}
          >WORLD</span>
        </motion.h1>

        <motion.p
          className="mt-8 text-center text-[#A0A0A0] text-base md:text-lg max-w-xl px-6"
          style={{ fontFamily: "'Inter', sans-serif" }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
        >
          Some doors were never meant to be opened.
          <br />
          <span className="text-[#8B0000]/80 text-sm">Scroll to begin your descent…</span>
        </motion.p>

        <motion.div
          className="absolute bottom-[12vh] flex flex-col items-center gap-3"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        >
          <span className="text-[#A0A0A0] text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <motion.div
            className="w-[1px] h-10 bg-gradient-to-b from-[#8B0000]/60 to-transparent"
            animate={{ scaleY: [1, 0.5, 1], opacity: [0.8, 0.3, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const SceneNarration = ({ visible }: { visible: boolean }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      >
        <motion.p
          className="text-center text-[#EAEAEA]/80 text-lg md:text-2xl font-display tracking-wider max-w-2xl px-8"
          style={{ textShadow: "0 0 40px rgba(0,0,0,0.9)" }}
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }} transition={{ duration: 1.2 }}
        >
          "The path grows darker…
          <br />
          <span className="text-[#8B0000]">the castle draws near."</span>
        </motion.p>
      </motion.div>
    )}
  </AnimatePresence>
);

const SceneApproach = ({ visible }: { visible: boolean }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        className="absolute inset-0 flex items-end justify-center z-20 pointer-events-none pb-[15vh]"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      >
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <p className="text-[#A0A0A0] text-xs uppercase tracking-[0.3em] mb-3">The gates of the forsaken</p>
          <p
            className="text-[#EAEAEA] font-display text-xl md:text-3xl tracking-wider"
            style={{ textShadow: "0 0 30px rgba(139,0,0,0.4)" }}
          >
            Do you dare to <span className="text-[#8B0000]">enter</span>?
          </p>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const SceneEntrance = ({
  visible,
  onLogin,
  onSignup,
}: {
  visible: boolean;
  onLogin: () => void;
  onSignup: () => void;
}) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-end z-20 pb-[12vh]"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.25 } }}
      >
        {/* radial red glow at bottom */}
        <motion.div
          className="absolute inset-x-0 top-0 h-full pointer-events-none"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1.5 }}
        >
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 60% 50% at 50% 40%, transparent 30%, rgba(0,0,0,0.7) 100%)" }}
          />
          <motion.div
            className="absolute bottom-0 inset-x-0 h-[40%]"
            style={{ background: "radial-gradient(ellipse 40% 60% at 50% 100%, rgba(139,0,0,0.25), transparent 70%)" }}
            animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>

        <motion.div
          className="relative z-10 text-center mb-10"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        >
          <p
            className="font-display text-2xl md:text-4xl tracking-[0.15em] text-[#EAEAEA]"
            style={{ textShadow: "0 0 40px rgba(139,0,0,0.5)" }}
          >The Gate Awaits</p>
          <div className="mt-2 w-20 h-[1px] mx-auto bg-gradient-to-r from-transparent via-[#8B0000] to-transparent" />
        </motion.div>

        <motion.div
          className="relative z-10 flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
        >
          <button
            type="button"
            onClick={onLogin}
            className="group relative px-10 py-4 rounded-sm overflow-hidden cursor-pointer border border-[#8B0000]/60 bg-[#8B0000]/20 backdrop-blur-md hover:bg-[#8B0000]/40 hover:border-[#B22222]/80 transition-all duration-500"
          >
            <span className="relative z-10 font-display text-sm md:text-base tracking-[0.25em] uppercase text-[#EAEAEA] group-hover:text-white transition-colors">
              Login
            </span>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ boxShadow: "inset 0 0 30px rgba(139,0,0,0.4)" }}
            />
          </button>
          <button
            type="button"
            onClick={onSignup}
            className="group px-10 py-4 rounded-sm cursor-pointer border border-[#EAEAEA]/15 bg-white/5 backdrop-blur-md hover:border-[#EAEAEA]/30 hover:bg-white/10 transition-all duration-500"
          >
            <span className="font-display text-sm md:text-base tracking-[0.25em] uppercase text-[#A0A0A0] group-hover:text-[#EAEAEA] transition-colors">
              Sign up
            </span>
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

/* ─── scene nav dots ────────────────────────────────────────────────────── */
const SceneNav = ({ current, doorActive }: { current: number; doorActive: boolean }) => (
  <>
    {!doorActive && (
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-1">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex flex-col items-center">
            <motion.div
              className="w-[3px] rounded-full"
              animate={{
                height: current === s ? 24 : 8,
                backgroundColor: current === s ? "#8B0000" : "rgba(234,234,234,0.15)",
                boxShadow: current === s ? "0 0 8px rgba(139,0,0,0.5)" : "0 0 0px transparent",
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
            {s < 4 && <div className="h-3" />}
          </div>
        ))}
      </div>
    )}
  </>
);

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   Key performance changes vs original:
   • No frame extraction — the <video> element is scrubbed directly via
     video.currentTime on each scroll tick. The browser's internal video
     decoder handles frame lookup in hardware.
   • requestAnimationFrame gate — DOM writes are coalesced so no duplicate
     work fires when the scroll event fires faster than 60 fps.
   • CSS 3D parallax — the wrapper uses perspective + translateZ layers so
     depth effects are GPU-composited and never trigger layout/paint.
   • will-change on only the three elements that actually move.
   ═══════════════════════════════════════════════════════════════════════════ */
const Index = () => {
  const navigate  = useNavigate();

  /* refs */
  const containerRef   = useRef<HTMLDivElement>(null);
  const videoRef       = useRef<HTMLVideoElement>(null);
  const wrapRef        = useRef<HTMLDivElement>(null);
  const vignetteRef    = useRef<HTMLDivElement>(null);
  const darkRef        = useRef<HTMLDivElement>(null);
  const rafRef         = useRef<number | null>(null);
  const progressRef    = useRef(0);
  const sceneRef       = useRef<1 | 2 | 3 | 4>(1);

  /* state */
  const [currentScene, setCurrentScene] = useState<1 | 2 | 3 | 4>(1);
  const [videoReady,   setVideoReady]   = useState(false);
  const [videoError,   setVideoError]   = useState<string | null>(null);
  const [doorActive,   setDoorActive]   = useState(false);
  const [doorDest,     setDoorDest]     = useState<DoorDestination>("/login");
  const [snapshot,     setSnapshot]     = useState<string | null>(null);

  /* ── overlay sync (called inside rAF, no state) ──────────────────────── */
  const syncOverlays = useCallback((p: number) => {
    if (vignetteRef.current) {
      vignetteRef.current.style.background = `radial-gradient(ellipse 70% 60% at 50% 50%, transparent 20%, rgba(0,0,0,${0.4 + p * 0.4}) 100%)`;
    }
    if (darkRef.current) {
      darkRef.current.style.backgroundColor = `rgba(11,11,11,${Math.max(0, (p - 0.7) * 1.5) * 0.3})`;
    }
    if (wrapRef.current) {
      /* Subtle Ken Burns zoom — pure transform, GPU composited */
      wrapRef.current.style.transform = `scale(${1 + p * 0.12})`;
    }
    const s = sceneFromProgress(p);
    if (sceneRef.current !== s) {
      sceneRef.current = s;
      setCurrentScene(s);
    }
  }, []);

  /* ── scroll → video currentTime (rAF-gated) ─────────────────────────── */
  const onScroll = useCallback(() => {
    if (rafRef.current !== null) return;   // already scheduled
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const container = containerRef.current;
      const video     = videoRef.current;
      if (!container || !video || !video.duration) return;

      const { top, height } = container.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -top / (height - window.innerHeight)));
      progressRef.current = p;

      /* Direct seek — hardware decoded, no canvas, no memory allocation */
      video.currentTime = p * video.duration;

      syncOverlays(p);
    });
  }, [syncOverlays]);

  /* ── attach scroll listener ──────────────────────────────────────────── */
  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();   // prime on mount
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [onScroll]);

  /* ── door helpers ────────────────────────────────────────────────────── */
  const captureSnapshot = useCallback(() => {
    const video = videoRef.current;
    if (!video) return null;
    try {
      const c  = document.createElement("canvas");
      c.width  = video.videoWidth  || 1280;
      c.height = video.videoHeight || 720;
      c.getContext("2d")?.drawImage(video, 0, 0);
      return c.toDataURL("image/jpeg", 0.88);
    } catch { return null; }
  }, []);

  const handleDoorEnter = useCallback((dest: DoorDestination) => {
    setSnapshot(captureSnapshot());
    setDoorDest(dest);
    setDoorActive(true);
  }, [captureSnapshot]);

  useEffect(() => {
    if (!doorActive) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [doorActive]);

  const handleDoorComplete = useCallback(() => {
    navigate(doorDest);
  }, [navigate, doorDest]);

  /* ─────────────────────────────────────────────────────────────────────── */
  return (
    <>
      {/* ── loading/error overlay ───────────────────────────────────────── */}
      <AnimatePresence>
        {!videoReady && !videoError && (
          <motion.div
            className="fixed inset-0 z-[60] bg-[#0B0B0B] flex flex-col items-center justify-center"
            exit={{ opacity: 0 }} transition={{ duration: 1.2 }}
          >
            <motion.div
              className="w-16 h-16 rounded-full border-2 border-[#8B0000]/30 border-t-[#8B0000]"
              animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="mt-8 font-display text-sm tracking-[0.3em] text-[#A0A0A0]">
              Summoning the darkness…
            </p>
          </motion.div>
        )}
        {videoError && (
          <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center px-6 text-center bg-[#0B0B0B]">
            <p className="text-[#EAEAEA] font-display text-lg tracking-wide">
              Could not load the experience
            </p>
            <p className="mt-4 max-w-md text-sm text-[#A0A0A0]">{videoError}</p>
            <p className="mt-6 max-w-md text-xs text-[#8B0000]/80">
              On Render: set Publish Directory to <strong>dist</strong>, Build Command to{" "}
              <code className="text-[#EAEAEA]">npm ci &amp;&amp; npm run build</code>, then redeploy.
            </p>
          </div>
        )}
      </AnimatePresence>

      {/* ── door transition ─────────────────────────────────────────────── */}
      <DoorTransition
        active={doorActive}
        destination={doorDest}
        sceneSnapshot={snapshot}
        onComplete={handleDoorComplete}
      />

      {/* ── scrollable container ────────────────────────────────────────── */}
      <div ref={containerRef} className="relative" style={{ height: `${SCROLL_HEIGHT * 100}vh` }}>

        {/* ── sticky viewport ─────────────────────────────────────────── */}
        <div
          className="fixed inset-0 z-0 overflow-hidden"
          style={{ background: "#0B0B0B" }}
        >

          {/* ── 3-D perspective stage ─────────────────────────────────── */}
          <div
            style={{
              position: "absolute", inset: 0,
              perspective: "800px",
              perspectiveOrigin: "50% 50%",
            }}
          >
            {/* Layer 0 — video (deepest, slowest) */}
            <div
              ref={wrapRef}
              style={{
                position: "absolute", inset: 0,
                transformOrigin: "center center",
                transform: "scale(1)",
                willChange: "transform",
              }}
            >
              {/*
                PERFORMANCE KEY:
                The <video> is never played — we only move currentTime.
                The browser uses its internal hardware video decoder;
                no frames are ever copied to JS memory.
                `object-fit: cover` + `object-position: center top`
                hides the watermark band automatically via CSS
                (no canvas crop needed).
              */}
              <video
                ref={videoRef}
                src={VIDEO_SRC}
                muted
                playsInline
                preload="auto"
                onCanPlay={() => setVideoReady(true)}
                onError={() => setVideoError(`Could not load ${VIDEO_SRC}. Ensure it's in /public/assets/.`)}
                style={{
                  position: "absolute", inset: 0,
                  width: "100%",
                  /* Clip watermark: show top (1-WATERMARK_CROP) of the frame */
                  height: `${100 / (1 - WATERMARK_CROP)}%`,
                  objectFit: "cover",
                  objectPosition: "center top",
                  opacity: videoReady ? 1 : 0,
                  transition: "opacity 0.8s ease",
                  display: "block",
                  /* GPU layer hint */
                  willChange: "opacity",
                }}
              />
            </div>

            {/* Layer 1 — depth fog (mid) */}
            <div
              style={{
                position: "absolute", inset: 0,
                transform: "translateZ(20px)",
                pointerEvents: "none",
                zIndex: 10,
              }}
            >
              <FogLayer opacity={0.08} speed={25} />
              <FogLayer opacity={0.06} speed={35} reverse />
            </div>

            {/* Layer 2 — vignette + dark overlay (front) */}
            <div
              ref={vignetteRef}
              style={{
                position: "absolute", inset: 0,
                transform: "translateZ(30px)",
                pointerEvents: "none",
                zIndex: 11,
                willChange: "background",
              }}
            />
            <div
              ref={darkRef}
              style={{
                position: "absolute", inset: 0,
                transform: "translateZ(30px)",
                pointerEvents: "none",
                zIndex: 11,
                willChange: "background-color",
              }}
            />
          </div>

          {/* ── static overlays (not in perspective) ──────────────────── */}
          {/* edge gradients */}
          <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#0B0B0B]/60 to-transparent z-[12] pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#0B0B0B]/60 to-transparent z-[12] pointer-events-none" />

          {/* scene-dependent crimson glow */}
          <div
            className="absolute inset-0 z-[12] pointer-events-none transition-opacity duration-700"
            style={{
              background: "radial-gradient(circle at 50% 70%, rgba(139,0,0,0.15), transparent 60%)",
              opacity: currentScene >= 3 ? 0.5 : 0,
            }}
          />

          {/* film grain */}
          <FilmGrain />

          {/* ── scene text overlays ───────────────────────────────────── */}
          <SceneTitle    visible={currentScene === 1 && !doorActive} />
          <SceneNarration visible={currentScene === 2 && !doorActive} />
          <SceneApproach visible={currentScene === 3 && !doorActive} />
          <SceneEntrance
            visible={currentScene === 4 && !doorActive}
            onLogin={()  => handleDoorEnter("/login")}
            onSignup={() => handleDoorEnter("/signup")}
          />

          {/* ── scene nav dots ────────────────────────────────────────── */}
          <SceneNav current={currentScene} doorActive={doorActive} />
        </div>
      </div>

      {/* ── CSS keyframes (injected once) ─────────────────────────────────── */}
      <style>{`
        @keyframes fogDrift {
          0%   { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
      `}</style>
    </>
  );
};

export default Index;