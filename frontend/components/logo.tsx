export function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lighthold-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#lighthold-grad)" />
      <path d="M10.5 7.5H14V20H23V23.5H10.5V7.5Z" fill="white" />
      <circle cx="22.5" cy="9.5" r="3" fill="white" fillOpacity="0.95" />
    </svg>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <Logo size={28} />
      <span className="text-sm font-bold tracking-tight text-white">Lighthold</span>
    </span>
  );
}
