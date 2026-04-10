"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function NewsletterInline() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="not-prose my-10 rounded-xl border border-[var(--border)] bg-[var(--muted)] px-6 py-5">
        <p className="text-sm font-semibold text-[var(--foreground)]">
          Kaydınız alındı!
        </p>
        <p className="mt-1 text-xs text-[var(--muted-foreground)]">
          Haftalık e-ticaret bültenimize başarıyla abone oldunuz.
        </p>
      </div>
    );
  }

  return (
    <div className="not-prose my-10 rounded-xl border border-[var(--accent)]/20 bg-[var(--muted)] px-6 py-5">
      <p className="text-sm font-semibold text-[var(--foreground)]">
        Haftalık E-Ticaret Bülteni
      </p>
      <p className="mt-1 mb-4 text-xs text-[var(--muted-foreground)]">
        E-ticaret trendlerini, platform haberlerini ve büyüme ipuçlarını
        haftalık olarak e-postanıza iletelim.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ornek@eposta.com"
          required
          className="min-w-0 flex-1 rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 rounded-lg bg-[var(--foreground)] px-4 py-2 text-sm font-medium text-[var(--background)] transition-opacity hover:opacity-75 disabled:opacity-40"
        >
          {status === "loading" ? "..." : "Abone Ol"}
        </button>
      </form>
      {status === "error" && (
        <p className="mt-2 text-xs text-red-500">
          Bir hata oluştu, lütfen tekrar deneyin.
        </p>
      )}
    </div>
  );
}
