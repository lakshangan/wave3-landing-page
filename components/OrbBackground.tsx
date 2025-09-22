"use client"

import { motion } from "framer-motion"

export default function OrbBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Main Orb */}
      <motion.div
        className="absolute top-1/4 right-1/3 w-96 h-96 rounded-full bg-gradient-to-r from-blue-100/20 to-indigo-100/20 dark:from-blue-900/10 dark:to-indigo-900/10 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-indigo-100/15 to-purple-100/15 dark:from-indigo-900/10 dark:to-purple-900/10 blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 25, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  )
}