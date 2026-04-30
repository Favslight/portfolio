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
      className={`inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 ${
        isPrimary
          ? "bg-gradient-to-r from-brand-600 to-accent-500 text-white hover:opacity-90"
          : "border border-slate-300 bg-white text-slate-800 hover:border-brand-200 hover:text-brand-600"
      }`}
    >
      {label}
    </Link>
  );
}
