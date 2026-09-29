"use client";

import { useEffect, useRef, useState } from "react";

type PieChartProps = {
  backendPercent: number;
  frontendPercent: number;
  size?: number;
};

const STROKE_WIDTH = 9;
const TOTAL_DURATION_MS = 1400;

export function PieChart({ backendPercent, frontendPercent, size = 76 }: PieChartProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.4, rootMargin: "-40px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const radius = (size - STROKE_WIDTH) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  const backendDuration = TOTAL_DURATION_MS * (backendPercent / 100);
  const frontendDuration = TOTAL_DURATION_MS * (frontendPercent / 100);

  const backendOffset = inView ? circumference * (1 - backendPercent / 100) : circumference;
  const frontendOffset = inView ? circumference * (1 - frontendPercent / 100) : circumference;

  return (
    <div className="flex items-center gap-4">
      <div ref={wrapperRef} className="relative shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={STROKE_WIDTH}
            className="text-white/10"
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#3b82f6"
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={backendOffset}
            style={{ transition: `stroke-dashoffset ${backendDuration}ms ease-out` }}
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#a78bfa"
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={frontendOffset}
            transform={`rotate(${(backendPercent / 100) * 360} ${center} ${center})`}
            style={{ transition: `stroke-dashoffset ${frontendDuration}ms ease-out`, transitionDelay: `${backendDuration}ms` }}
          />
        </svg>
      </div>
      <div className="space-y-1 text-xs">
        <p className="flex items-center gap-1.5 text-slate-300">
          <span className="h-2 w-2 rounded-full bg-brand-500" /> Backend {backendPercent}%
        </p>
        <p className="flex items-center gap-1.5 text-slate-300">
          <span className="h-2 w-2 rounded-full bg-accent-400" /> Frontend {frontendPercent}%
        </p>
      </div>
    </div>
  );
}
