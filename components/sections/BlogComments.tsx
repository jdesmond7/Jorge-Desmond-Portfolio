"use client";

import { useCallback, useEffect, useState } from "react";
import { useI18n } from "@/components/i18n/I18nProvider";
import { countComments } from "@/lib/comments-utils";
import type { Comment } from "@/lib/types";
import { CommentForm } from "@/components/ui/CommentForm";
import { CommentItem } from "@/components/ui/CommentItem";

interface BlogCommentsProps {
  postSlug: string;
  postId: string;
}

type CommentsState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; comments: Comment[] };

export function BlogComments({ postSlug, postId }: BlogCommentsProps) {
  const { dict } = useI18n();
  const [state, setState] = useState<CommentsState>({ status: "loading" });
  const loadError = dict.blog.loadError;

  const refresh = useCallback(() => {
    setState({ status: "loading" });
    void fetch(`/api/comments?slug=${encodeURIComponent(postSlug)}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("load-failed");
        return res.json() as Promise<{ comments: Comment[] }>;
      })
      .then((data) => {
        setState({ status: "ready", comments: data.comments });
      })
      .catch(() => {
        setState({ status: "error", message: loadError });
      });
  }, [postSlug, loadError]);

  useEffect(() => {
    const controller = new AbortController();

    void fetch(`/api/comments?slug=${encodeURIComponent(postSlug)}`, {
      signal: controller.signal,
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("load-failed");
        return res.json() as Promise<{ comments: Comment[] }>;
      })
      .then((data) => {
        setState({ status: "ready", comments: data.comments });
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setState({ status: "error", message: loadError });
      });

    return () => controller.abort();
  }, [postSlug, loadError]);

  const comments = state.status === "ready" ? state.comments : [];
  const total = countComments(comments);

  return (
    <section
      className="mt-12 border-t border-mist pt-10"
      aria-labelledby="comments-heading"
    >
      <h2
        id="comments-heading"
        className="mb-6 text-[length:var(--text-xl)] font-semibold text-carbon"
      >
        {dict.blog.comments} ({total})
      </h2>

      {state.status === "loading" ? (
        <p className="mb-8 text-[length:var(--text-base)] text-zinc">
          {dict.blog.loadingComments}
        </p>
      ) : state.status === "error" ? (
        <p className="mb-8 text-[length:var(--text-base)] text-coral-text" role="alert">
          {state.message}
        </p>
      ) : comments.length > 0 ? (
        <div className="mb-10 space-y-8">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              postSlug={postSlug}
              postId={postId}
              onRefresh={refresh}
            />
          ))}
        </div>
      ) : (
        <p className="mb-10 text-[length:var(--text-base)] text-zinc">
          {dict.blog.emptyComments}
        </p>
      )}

      <div className="rounded-[var(--radius-card)] border border-mist bg-white p-5 sm:p-6">
        <CommentForm
          postSlug={postSlug}
          postId={postId}
          onSuccess={refresh}
        />
      </div>
    </section>
  );
}
