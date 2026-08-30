import { CaseSectionLabel } from "./CaseSectionLabel";

interface CaseStudyIntroGridProps {
  overviewLabel: string;
  challengeLabel: string;
  overviewTitle?: string;
  overviewBody?: string;
  challengeTitle?: string;
  challengeBody?: string;
  framingQuestion?: string;
  framingQuestionHighlight?: string;
  framingBody?: string;
}

function IntroColumn({
  number,
  label,
  title,
  body,
}: {
  number: string;
  label: string;
  title?: string;
  body?: string;
}) {
  if (!title && !body) return null;

  return (
    <div>
      <CaseSectionLabel number={number} label={label} />
      {title ? (
        <h2 className="mb-5 text-[clamp(20px,2.8vw,26px)] font-semibold leading-[1.25] tracking-[-0.013em] text-carbon">
          {title}
        </h2>
      ) : null}
      {body ? (
        <p className="whitespace-pre-line text-[length:var(--text-body)] leading-[length:var(--leading-body)] tracking-[-0.009em] text-zinc">
          {body}
        </p>
      ) : null}
    </div>
  );
}

function FramingQuestion({
  question,
  highlight,
}: {
  question: string;
  highlight?: string;
}) {
  if (!highlight || !question.includes(highlight)) {
    return (
      <p className="mb-5 text-center text-[clamp(34px,4.2vw,48px)] font-bold leading-[1.1] tracking-[-0.022em] text-carbon">
        {question}
      </p>
    );
  }

  const [before, after] = question.split(highlight);

  return (
    <p className="mb-5 text-center text-[clamp(34px,4.2vw,48px)] font-bold leading-[1.1] tracking-[-0.022em] text-carbon">
      {before}
      <span className="text-primary">{highlight}</span>
      {after}
    </p>
  );
}

function FramingBody({ body }: { body: string }) {
  const paragraphs = body
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <div className="flex w-full flex-col gap-5">
      {paragraphs.map((paragraph, index) => (
        <p
          key={index}
          className="text-center text-[length:var(--text-body)] leading-[length:var(--leading-body)] tracking-[-0.009em] text-zinc"
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}

export function CaseStudyIntroGrid({
  overviewLabel,
  challengeLabel,
  overviewTitle,
  overviewBody,
  challengeTitle,
  challengeBody,
  framingQuestion,
  framingQuestionHighlight,
  framingBody,
}: CaseStudyIntroGridProps) {
  const hasOverview = Boolean(overviewTitle || overviewBody);
  const hasChallenge = Boolean(challengeTitle || challengeBody);

  if (!hasOverview && !hasChallenge) return null;

  return (
    <section className="mb-16">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
        {hasOverview ? (
          <IntroColumn
            number="01"
            label={overviewLabel}
            title={overviewTitle}
            body={overviewBody}
          />
        ) : null}
        {hasChallenge ? (
          <IntroColumn
            number="02"
            label={challengeLabel}
            title={challengeTitle}
            body={challengeBody}
          />
        ) : null}
      </div>

      {framingQuestion || framingBody ? (
        <div className="mt-[136px] md:mt-[152px]">
          {framingQuestion ? (
            <FramingQuestion
              question={framingQuestion}
              highlight={framingQuestionHighlight}
            />
          ) : null}

          {framingBody ? <FramingBody body={framingBody} /> : null}
        </div>
      ) : null}
    </section>
  );
}
