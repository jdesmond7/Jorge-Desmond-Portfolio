"use client";

import { useState } from "react";
import { useI18n } from "@/components/i18n/I18nProvider";
import type { Dictionary } from "@/lib/i18n";
import type { Comment } from "@/lib/types";
import { localeToDateLocale } from "@/lib/i18n/locale-utils";
import { CommentForm } from "./CommentForm";

interface CommentItemProps {
  comment: Comment;
  depth?: number;
  postSlug: string;
  postId: string;
  onRefresh: () => void;
}

function formatRelativeTime(
  dateStr: string,
  locale: string,
  dict: Dictionary,
): string {
  const date = new Date(dateStr);
  const diffMs = Date.now() - date.getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return dict.comments.time.justNow;
  if (minutes < 60) return dict.comments.time.minutes(minutes);
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return dict.comments.time.hours(hours);
  const days = Math.floor(hours / 24);
  if (days < 30) return dict.comments.time.days(days);
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getVoteStorageKey(id: string): string {
  return `comment-vote-${id}`;
}

function Avatar() {
  return (
    <div
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-fog text-ash"
      aria-hidden="true"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    </div>
  );
}

export function CommentItem({
  comment,
  depth = 0,
  postSlug,
  postId,
  onRefresh,
}: CommentItemProps) {
  const { dict, locale } = useI18n();
  const dateLocale = localeToDateLocale(locale);
  const [replyOpen, setReplyOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [voteError, setVoteError] = useState<string | null>(null);
  const [localVote, setLocalVote] = useState<"up" | "down" | null>(() => {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem(getVoteStorageKey(comment.id));
    return stored === "up" || stored === "down" ? stored : null;
  });

  const score = comment.upvotes - comment.downvotes;
  const displayName = comment.authorName?.trim() || dict.comments.anonymous;
  const hasReplies = comment.replies.length > 0;

  async function handleVote(direction: "up" | "down") {
    if (localVote) {
      setVoteError(dict.comments.errors.alreadyVoted);
      return;
    }

    setVoteError(null);
    try {
      const res = await fetch(`/api/comments/${comment.id}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ direction }),
      });
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        setVoteError(data.error ?? dict.comments.errors.voteFailed);
        return;
      }
      localStorage.setItem(getVoteStorageKey(comment.id), direction);
      setLocalVote(direction);
      onRefresh();
    } catch {
      setVoteError(dict.comments.errors.voteFailed);
    }
  }

  async function handleReport() {
    try {
      const res = await fetch(`/api/comments/${comment.id}/report`, {
        method: "POST",
      });
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        alert(data.error ?? dict.comments.errors.reportFailed);
        return;
      }
      alert(dict.comments.reported);
      onRefresh();
    } catch {
      alert(dict.comments.errors.reportFailed);
    }
  }

  return (
    <article
      className={depth > 0 ? "mt-4 border-l-2 border-mist pl-4 sm:pl-5" : ""}
    >
      <div className="flex gap-3">
        <Avatar />
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2 text-[14px]">
              <span className="font-semibold text-coral">{displayName}</span>
              <span className="text-ash">·</span>
              <time
                dateTime={comment.createdAt}
                className="mono text-[11px] tracking-[-0.006em] text-ash"
              >
                {formatRelativeTime(comment.createdAt, dateLocale, dict)}
              </time>
            </div>

            <div className="flex items-center gap-1 text-[13px] text-zinc">
              <button
                type="button"
                onClick={() => handleVote("up")}
                disabled={Boolean(localVote)}
                className="rounded px-1.5 py-0.5 transition-colors hover:bg-fog hover:text-carbon disabled:cursor-not-allowed disabled:opacity-50"
                aria-label={dict.comments.upvote}
              >
                ▲
              </button>
              <span
                className={`mono min-w-[2ch] text-center text-[12px] ${
                  score > 0
                    ? "text-coral"
                    : score < 0
                      ? "text-zinc"
                      : "text-ash"
                }`}
              >
                {score > 0 ? `+${score}` : score}
              </span>
              <button
                type="button"
                onClick={() => handleVote("down")}
                disabled={Boolean(localVote)}
                className="rounded px-1.5 py-0.5 transition-colors hover:bg-fog hover:text-carbon disabled:cursor-not-allowed disabled:opacity-50"
                aria-label={dict.comments.downvote}
              >
                ▼
              </button>
            </div>
          </div>

          {voteError ? (
            <p className="mb-2 text-[13px] text-coral">{voteError}</p>
          ) : null}

          <p className="whitespace-pre-wrap text-[15px] leading-[1.55] text-carbon">
            {comment.body}
          </p>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setReplyOpen((open) => !open)}
              className="rounded-[var(--radius-pill)] border border-mist bg-fog px-4 py-1.5 text-[13px] font-medium text-carbon transition-colors hover:bg-mist/60"
            >
              {dict.comments.reply}
            </button>
            <button
              type="button"
              onClick={handleReport}
              className="text-[13px] text-zinc transition-colors hover:text-carbon"
            >
              {dict.comments.report}
            </button>
          </div>

          {replyOpen ? (
            <div className="mt-4 rounded-[var(--radius-card)] border border-mist bg-white p-4">
              <CommentForm
                postSlug={postSlug}
                postId={postId}
                parentId={comment.id}
                heading={dict.comments.replyHeading}
                submitLabel={dict.comments.replySubmit}
                onSuccess={() => {
                  setReplyOpen(false);
                  onRefresh();
                }}
                onCancel={() => setReplyOpen(false)}
              />
            </div>
          ) : null}

          {hasReplies ? (
            <div className="mt-4">
              <button
                type="button"
                onClick={() => setCollapsed((value) => !value)}
                className="text-[13px] font-medium text-zinc transition-colors hover:text-carbon"
              >
                {collapsed ? "▶" : "▼"}{" "}
                {comment.replies.length}{" "}
                {comment.replies.length === 1
                  ? dict.comments.replySingular
                  : dict.comments.replyPlural}
              </button>
              {!collapsed ? (
                <div className="mt-2 space-y-4">
                  {comment.replies.map((reply) => (
                    <CommentItem
                      key={reply.id}
                      comment={reply}
                      depth={depth + 1}
                      postSlug={postSlug}
                      postId={postId}
                      onRefresh={onRefresh}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
