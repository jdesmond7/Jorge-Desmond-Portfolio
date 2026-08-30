import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n/locale";

interface ProjectLearningProps {
  text: string;
}

export async function ProjectLearning({ text }: ProjectLearningProps) {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <section className="rounded-[var(--radius-card)] border border-mist bg-white px-8 py-10 md:px-10 md:py-12">
      <div className="mono mb-5 text-[12px] font-bold uppercase tracking-[0.14em] text-carbon">
        {dict.projects.learning}
      </div>
      <p className="whitespace-pre-line text-[length:var(--text-body)] leading-[length:var(--leading-body)] tracking-[-0.009em] text-carbon">
        {text}
      </p>
    </section>
  );
}
