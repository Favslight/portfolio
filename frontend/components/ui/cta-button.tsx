import Link from "next/link";

type CTAButtonProps = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
};

export function CTAButton({ href, label, variant = "primary" }: CTAButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
        isPrimary
          ? "bg-gradient-to-r from-brand-500 to-accent-500 text-white shadow-glow hover:opacity-90"
          : "border border-white/15 bg-white/5 text-slate-100 hover:border-brand-400/50 hover:text-brand-300"
      }`}
    >
      {label}
    </Link>
  );
}
