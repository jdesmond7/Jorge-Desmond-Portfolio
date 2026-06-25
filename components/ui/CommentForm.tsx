"use client";

import { type FormEvent, useState } from "react";

interface CommentFormProps {
  postSlug: string;
  postId: string;
  parentId?: string;
  heading?: string;
  submitLabel?: string;
  onSuccess: () => void;
  onCancel?: () => void;
}

export function CommentForm({
  postSlug,
  postId,
  parentId,
  heading = "Publicar un comentario nuevo",
  submitLabel = "Publicar",
  onSuccess,
  onCancel,
}: CommentFormProps) {
  const [body, setBody] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postSlug,
          postId,
          parentId,
          body,
          authorName,
          authorEmail,
          website,
        }),
      });

      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "No se pudo publicar el comentario.");
        return;
      }

      setBody("");
      setAuthorName("");
      setAuthorEmail("");
      onSuccess();
      onCancel?.();
    } catch {
      setError("No se pudo publicar el comentario.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-[17px] font-semibold text-carbon">{heading}</h3>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mono mb-1.5 block text-[11px] tracking-[-0.006em] text-ash">
            Nombre (opcional)
          </span>
          <input
            type="text"
            value={authorName}
            onChange={(event) => setAuthorName(event.target.value)}
            maxLength={80}
            className="w-full rounded-[var(--radius-card)] border border-mist bg-white px-4 py-3 text-[15px] text-carbon outline-none transition-colors focus:border-coral"
            placeholder="Tu nombre"
          />
        </label>
        <label className="block">
          <span className="mono mb-1.5 block text-[11px] tracking-[-0.006em] text-ash">
            Correo (opcional)
          </span>
          <input
            type="email"
            value={authorEmail}
            onChange={(event) => setAuthorEmail(event.target.value)}
            maxLength={120}
            className="w-full rounded-[var(--radius-card)] border border-mist bg-white px-4 py-3 text-[15px] text-carbon outline-none transition-colors focus:border-coral"
            placeholder="tu@correo.com"
          />
        </label>
      </div>

      <label className="block">
        <span className="sr-only">Comentario</span>
        <textarea
          value={body}
          onChange={(event) => setBody(event.target.value)}
          required
          rows={5}
          maxLength={2000}
          className="w-full resize-y rounded-[var(--radius-card)] border border-mist bg-white px-4 py-3 text-[15px] leading-[1.5] text-carbon outline-none transition-colors focus:border-coral"
          placeholder="Introduce el texto aquí"
        />
      </label>

      <input
        type="text"
        name="website"
        value={website}
        onChange={(event) => setWebsite(event.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {error ? (
        <p className="text-[14px] text-coral" role="alert">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={submitting || !body.trim()}
          className="inline-flex min-h-11 items-center justify-center rounded-[var(--radius-pill)] bg-coral px-8 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-coral-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? "Publicando…" : submitLabel}
        </button>
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="text-[14px] text-zinc transition-colors hover:text-carbon"
          >
            Cancelar
          </button>
        ) : null}
      </div>
    </form>
  );
}
