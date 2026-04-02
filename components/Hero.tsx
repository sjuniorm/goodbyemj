"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const PARTICLES = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 4,
  duration: Math.random() * 6 + 6,
}));

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Draw a subtle gradient glow
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const grad = ctx.createRadialGradient(
        canvas.width / 2, canvas.height * 0.6, 0,
        canvas.width / 2, canvas.height * 0.6, canvas.width * 0.6
      );
      grad.addColorStop(0, "rgba(201, 169, 110, 0.08)");
      grad.addColorStop(0.5, "rgba(180, 100, 60, 0.04)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    draw();
    window.addEventListener("resize", draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("resize", draw);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background canvas glow */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Floating particles */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-amber-300/20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.6, 0.1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Top divider line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
        className="absolute top-10 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"
      />

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-amber-400/70 tracking-[0.4em] text-xs uppercase mb-8 font-light"
          style={{ fontFamily: "var(--font-lato)" }}
        >
          Tenerife &nbsp;·&nbsp; Always in our hearts
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-7xl sm:text-8xl md:text-9xl font-light leading-none mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          <span className="block text-[#f5f0eb]">Jennifer</span>
          <span
            className="block text-amber-300/40 text-4xl sm:text-5xl my-3"
            style={{ letterSpacing: "0.2em" }}
          >
            &amp;
          </span>
          <span className="block text-[#f5f0eb]">Michel</span>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mx-auto my-8 h-px w-40 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="text-[#c5bfb0] text-lg sm:text-xl font-light leading-relaxed max-w-xl mx-auto"
          style={{ fontFamily: "var(--font-lato)" }}
        >
          A little piece of our island, <br className="hidden sm:block" />
          to carry with you wherever you go.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="mt-20 flex flex-col items-center gap-2"
        >
          <span className="text-[#6b6560] text-xs tracking-widest uppercase">
            Scroll to remember
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-amber-400/40 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
