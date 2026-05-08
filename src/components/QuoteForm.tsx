"use client";

// Reusable lead form. POSTs JSON to /api/lead. Handles loading + success +
// error states inline so we never need a separate thank-you page.
import { useState } from "react";
import type { Lang } from "@/lib/site.config";
import { t } from "@/lib/copy";

interface Props {
  lang: Lang;
  source: string; // "hero" | "contact-page" | "service-page" | "location-page"
  variant?: "stacked" | "card"; // styling preset
}

type Status = "idle" | "submitting" | "success" | "error";

export function QuoteForm({ lang, source, variant = "stacked" }: Props) {
  const tt = t(lang);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const fd = new FormData(e.currentTarget);
    setStatus("submitting");
    setErrorMessage("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: fd.get("firstName"),
          lastName: fd.get("lastName"),
          phone: fd.get("phone"),
          email: fd.get("email"),
          comment: fd.get("comment"),
          source,
          lang,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data.error || `HTTP ${res.status}`);
        setStatus("error");
        return;
      }
      setStatus("success");
      e.currentTarget.reset();
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Network error");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className={
        variant === "card"
          ? "bg-[#fafafa] border border-[#e6e6e6] rounded-md p-8 text-center"
          : "border border-[#e6e6e6] rounded p-8 text-center bg-[#f5f5f5]"
      }>
        <div className="text-3xl mb-3">✓</div>
        <p className="text-lg font-semibold mb-1">
          {lang === "fr" ? "Merci, on vous rappelle." : "Thanks — we'll be in touch."}
        </p>
        <p className="text-sm text-[#5a5a5a]">
          {lang === "fr"
            ? "Votre demande a été reçue. Pour une réponse immédiate, appelez-nous."
            : "We received your request. For immediate help, give us a call."}
        </p>
      </div>
    );
  }

  const inputClass =
    "border border-[#cfcfcf] rounded px-3 py-2.5 focus:border-[#0a0a0a] outline-none text-base bg-white disabled:opacity-60";

  return (
    <form
      onSubmit={onSubmit}
      className={
        variant === "card"
          ? "flex flex-col gap-4 bg-[#fafafa] border border-[#e6e6e6] rounded-md p-6 md:p-8"
          : "flex flex-col gap-4"
      }
    >
      <div className="grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-wide text-[#5a5a5a]">{tt.firstName} *</span>
          <input name="firstName" required disabled={status === "submitting"} className={inputClass} />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-wide text-[#5a5a5a]">{tt.lastName} *</span>
          <input name="lastName" required disabled={status === "submitting"} className={inputClass} />
        </label>
      </div>
      <label className="flex flex-col gap-1">
        <span className="text-xs uppercase tracking-wide text-[#5a5a5a]">{tt.phone} *</span>
        <input name="phone" type="tel" required disabled={status === "submitting"} className={inputClass} />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-xs uppercase tracking-wide text-[#5a5a5a]">{tt.email} *</span>
        <input name="email" type="email" required disabled={status === "submitting"} className={inputClass} />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-xs uppercase tracking-wide text-[#5a5a5a]">{tt.comment} *</span>
        <textarea name="comment" rows={4} required disabled={status === "submitting"} className={inputClass} />
      </label>
      <button
        type="submit"
        disabled={status === "submitting"}
        className={
          (variant === "card" ? "self-center " : "self-start ") +
          "bg-black hover:bg-[#1a1a1a] text-white uppercase tracking-wide font-semibold px-10 py-3 rounded transition mt-2 disabled:opacity-60 disabled:cursor-wait"
        }
      >
        {status === "submitting"
          ? lang === "fr" ? "Envoi…" : "Sending…"
          : tt.submit}
      </button>
      {status === "error" && (
        <p className="text-sm text-[#cf222e]">
          {lang === "fr" ? "Erreur d'envoi." : "Submission failed."}
          {errorMessage ? ` (${errorMessage})` : ""}
        </p>
      )}
    </form>
  );
}
