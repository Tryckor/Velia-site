"use client";

export function OpenQuoteBotButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() =>
        window.dispatchEvent(new CustomEvent("velia:open-quotebot"))
      }
      className={className}
    >
      {children}
    </button>
  );
}
