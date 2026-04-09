import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function TLDRBox({ children }: Props) {
  return (
    <div className="my-6 rounded-lg border-l-4 border-[var(--accent)] bg-[var(--muted)] px-5 py-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
        TL;DR
      </p>
      <div className="text-sm text-[var(--foreground)] [&>p]:m-0 leading-relaxed">
        {children}
      </div>
    </div>
  );
}
