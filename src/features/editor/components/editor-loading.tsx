"use client";

import { motion } from "motion/react";

const SIDEBAR_PLACEHOLDERS = [
  "tool-1",
  "tool-2",
  "tool-3",
  "tool-4",
  "tool-5",
  "tool-6",
  "tool-7",
  "tool-8",
];

const Skeleton = ({ className }: { className?: string }) => (
  <motion.div
    className={`bg-muted rounded-md ${className}`}
    animate={{ opacity: [0.4, 0.8, 0.4] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
  />
);

// 1. FIXED: Added <title> and accessibility roles
const SvgSpinner = () => (
  <svg
    className="h-10 w-10 text-primary"
    viewBox="0 0 50 50"
    role="status"
    aria-labelledby="loading-spinner-title"
  >
    <title id="loading-spinner-title">Loading workspace</title>
    <motion.circle
      cx="25"
      cy="25"
      r="20"
      stroke="currentColor"
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
      initial={{ strokeDasharray: "1, 150", strokeDashoffset: 0 }}
      animate={{
        strokeDasharray: ["1, 150", "90, 150", "90, 150"],
        strokeDashoffset: [0, -35, -124],
        rotate: [0, 360],
      }}
      transition={{
        duration: 1.8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{ originX: "50%", originY: "50%" }}
    />
  </svg>
);

export function EditorLoading() {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background z-50">
      {/* Top Bar Skeleton */}
      <div className="flex h-14 w-full shrink-0 items-center justify-between border-b px-4">
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Skeleton */}
        <div className="flex h-full w-19 shrink-0 flex-col items-center gap-4 border-r bg-background py-4">
          {SIDEBAR_PLACEHOLDERS.map((id) => (
            <div key={id} className="flex flex-col items-center gap-1.5">
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-2 w-10" />
            </div>
          ))}
        </div>

        {/* Center Area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Options Bar Skeleton */}
          <div className="flex h-12 w-full shrink-0 items-center justify-between border-b bg-muted/40 px-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-24" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-6 w-6" />
            </div>
          </div>

          {/* Workspace Skeleton */}
          <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-[#f5f5f5]">
            {/* 2. FIXED: Added aria-hidden because the grid is purely decorative */}
            <svg
              className="absolute inset-0 h-full w-full opacity-40"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="grid"
                  width="24"
                  height="24"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="2" cy="2" r="1" fill="#d1d5db" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Canvas outline */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="z-10 h-[60vh] w-[60vw] max-w-4xl rounded-sm bg-white shadow-xl ring-1 ring-black/5"
            />

            {/* Central Spinner */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
            >
              <div className="flex flex-col items-center gap-3 rounded-xl border border-border/50 bg-background/80 p-6 shadow-lg backdrop-blur-md">
                <SvgSpinner />
                <span className="text-sm font-medium text-muted-foreground">
                  Preparing workspace...
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
