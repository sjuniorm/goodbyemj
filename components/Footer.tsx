"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative py-24 px-6 text-center overflow-hidden">
      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-xl mx-auto"
      >
        <div className="mx-auto mb-10 h-px w-24 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

        <p
          className="text-[#c5bfb0] text-2xl sm:text-3xl font-light leading-relaxed mb-6"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          &ldquo;No matter how far you go,
          <br />
          Tenerife will always be home.&rdquo;
        </p>

        <p
          className="text-[#6b6560] text-sm tracking-widest uppercase"
          style={{ fontFamily: "var(--font-lato)" }}
        >
          With all our love ♡
        </p>

        <div className="mx-auto mt-10 h-px w-16 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />

        <p className="mt-8 text-[#3a3530] text-xs tracking-widest uppercase" style={{ fontFamily: "var(--font-lato)" }}>
          Jennifer & Michel · Tenerife
        </p>
      </motion.div>
    </footer>
  );
}
