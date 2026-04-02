"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryProps {
  photos: string[];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function PhotoCard({ src, index }: { src: string; index: number }) {
  const [loaded, setLoaded] = useState(false);
  const [lightbox, setLightbox] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: (index % 8) * 0.07, ease: "easeOut" }}
        className="masonry-item group relative cursor-pointer overflow-hidden rounded-xl"
        onClick={() => setLightbox(true)}
      >
        <div className="relative overflow-hidden rounded-xl bg-[#161616]">
          {/* Shimmer skeleton */}
          {!loaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-[#161616] via-[#232323] to-[#161616] animate-pulse rounded-xl h-48" />
          )}
          <Image
            src={src}
            alt={`Memory ${index + 1}`}
            width={800}
            height={600}
            className={`w-full h-auto object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setLoaded(true)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="h-px bg-gradient-to-r from-amber-400/60 via-amber-300/40 to-transparent mb-1" />
          </div>
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setLightbox(false)}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={src}
                alt={`Memory ${index + 1}`}
                width={1600}
                height={1200}
                className="w-full h-auto max-h-[85vh] object-contain rounded-xl"
              />
              <button
                onClick={() => setLightbox(false)}
                className="absolute -top-10 right-0 text-white/60 hover:text-white text-sm tracking-widest uppercase transition-colors"
              >
                Close ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Gallery({ photos }: GalleryProps) {
  const [shuffled, setShuffled] = useState<string[]>([]);

  useEffect(() => {
    setShuffled(shuffle(photos));
  }, [photos]);

  if (photos.length === 0) {
    return (
      <section className="py-32 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md mx-auto"
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-amber-400/20 flex items-center justify-center">
            <span className="text-2xl">📷</span>
          </div>
          <p
            className="text-[#6b6560] text-lg font-light"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Photos are on their way...
          </p>
          <p className="text-[#4a4540] text-sm mt-2" style={{ fontFamily: "var(--font-lato)" }}>
            The memories will appear here soon.
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 sm:px-8 max-w-screen-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-14"
      >
        <p
          className="text-amber-400/60 tracking-[0.4em] text-xs uppercase mb-4"
          style={{ fontFamily: "var(--font-lato)" }}
        >
          Our memories together
        </p>
        <h2
          className="text-3xl sm:text-4xl font-light text-[#f5f0eb]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Moments from the island
        </h2>
        <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
      </motion.div>

      <div className="masonry-grid">
        {shuffled.map((src, i) => (
          <PhotoCard key={src} src={src} index={i} />
        ))}
      </div>
    </section>
  );
}
