"use client";

import { useCallback, useEffect, useState } from "react";
import { countComments } from "@/lib/comments";
import type { Comment } from "@/lib/types";
import { CommentForm } from "@/components/ui/CommentForm";
import { CommentItem } from "@/components/ui/CommentItem";

interface BlogCommentsProps {
  postSlug: string;
  postId: string;
}

export function BlogComments({ postSlug, postId }: BlogCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadComments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/comments?slug=${encodeURIComponent(postSlug)}`,
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
  }, [postSlug]);

  useEffect(() => {
    void loadComments();
  }, [loadComments]);

  const total = countComments(comments);

  return (
    <section
      className="mt-12 border-t border-mist pt-10"
      aria-labelledby="comments-heading"
    >
      <h2
        id="comments-heading"
        className="mb-6 text-[19px] font-semibold text-carbon"
      >
        Comentarios ({total})
      </h2>

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
