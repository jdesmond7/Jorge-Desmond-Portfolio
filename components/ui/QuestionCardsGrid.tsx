export function QuestionCardsGrid({ questions }: { questions: string[] }) {
  return (
    <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
      {questions.map((question) => (
        <article
          key={question}
          className="flex h-full items-start gap-3.5 rounded-[var(--radius-card)] border border-mist bg-white p-5 md:p-6"
        >
          <span
            className="mono mt-0.5 shrink-0 text-[22px] font-bold leading-none text-primary"
            aria-hidden
          >
            ?
          </span>
          <p className="text-[16px] font-bold leading-[1.45] tracking-[-0.008em] text-carbon md:text-[17px]">
            {question}
          </p>
        </article>
      ))}
    </div>
  );
}
