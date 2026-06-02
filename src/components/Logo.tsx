type LogoProps = {
  className?: string;
  showWordmark?: boolean;
};

/**
 * Velia brand mark — a downward triangular ring forming a heavy "V",
 * recreated as crisp vector so it stays sharp at any size and inherits color.
 */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 88"
      fill="currentColor"
      fillRule="evenodd"
      aria-hidden="true"
      className={className}
    >
      {/* Outer triangle minus inner triangle => thick V outline, heavier at the point */}
      <path d="M3 4 H97 L50 86 Z M23 13 H77 L50 61 Z" />
    </svg>
  );
}

export function Logo({ className = "", showWordmark = true }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-5 w-5" />
      {showWordmark && (
        <span className="wordmark text-[15px] leading-none pl-[0.1em]">
          VELIA
        </span>
      )}
    </span>
  );
}
