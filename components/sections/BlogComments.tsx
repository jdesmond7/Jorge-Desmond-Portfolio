"use client";

import { useCallback, useEffect, useState } from "react";
import { countComments } from "@/lib/comments";
import type { Comment, CommentSort } from "@/lib/types";
import { CommentForm } from "@/components/ui/CommentForm";
import { CommentItem } from "@/components/ui/CommentItem";

interface BlogCommentsProps {
  postSlug: string;
  postId: string;
}

const SORT_OPTIONS: { value: CommentSort; label: string }[] = [
  { value: "date", label: "Fecha" },
  { value: "rating", label: "Valoración" },
  { value: "activity", label: "Última actividad" },
];

export function BlogComments({ postSlug, postId }: BlogCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [sort, setSort] = useState<CommentSort>("date");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadComments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/comments?slug=${encodeURIComponent(postSlug)}&sort=${sort}`,
      );
      if (!res.ok) {
        setError("No se pudieron cargar los comentarios.");
        return;
      }
      const data = (await res.json()) as { comments: Comment[] };
      setComments(data.comments);
    } catch {
      setError("No se pudieron cargar los comentarios.");
    } finally {
      setLoading(false);
    }
  }, [postSlug, sort]);

  useEffect(() => {
    void loadComments();
  }, [loadComments]);

  const total = countComments(comments);

  return (
    <section
      className="mt-12 border-t border-mist pt-10"
      aria-labelledby="comments-heading"
    >
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <h2
          id="comments-heading"
          className="text-[19px] font-semibold text-carbon"
        >
          Comentarios ({total})
        </h2>

        <div className="flex flex-wrap items-center gap-2 text-[14px] text-zinc">
          <span>Ordenar por:</span>
          {SORT_OPTIONS.map((option, index) => (
            <span key={option.value} className="inline-flex items-center gap-2">
              {index > 0 ? <span className="text-mist">|</span> : null}
              <button
                type="button"
                onClick={() => setSort(option.value)}
                className={`transition-colors ${
                  sort === option.value
                    ? "font-semibold text-coral"
                    : "hover:text-carbon"
                }`}
              >
                {option.label}
              </button>
            </span>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="mb-8 text-[15px] text-zinc">Cargando comentarios…</p>
      ) : error ? (
        <p className="mb-8 text-[15px] text-coral" role="alert">
          {error}
        </p>
      ) : comments.length > 0 ? (
        <div className="mb-10 space-y-8">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              postSlug={postSlug}
              postId={postId}
              onRefresh={loadComments}
            />
          ))}
        </div>
      ) : (
        <p className="mb-10 text-[15px] text-zinc">
          Sé el primero en comentar este artículo.
        </p>
      )}

      <div className="rounded-[var(--radius-card)] border border-mist bg-white p-5 sm:p-6">
        <CommentForm
          postSlug={postSlug}
          postId={postId}
          onSuccess={loadComments}
        />
      </div>
    </section>
  );
}
