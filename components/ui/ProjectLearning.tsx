import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n/locale";

interface ProjectLearningProps {
  text: string;
}

export async function ProjectLearning({ text }: ProjectLearningProps) {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <section className="rounded-[var(--radius-card)] bg-espresso px-8 py-10 md:px-10 md:py-12">
      <div className="mono mb-5 text-[10px] font-bold uppercase tracking-[0.14em] text-coral">
        {dict.projects.learning}
      </div>
      <p className="whitespace-pre-line text-[17px] leading-[1.6] tracking-[-0.009em] text-white">
        {text}
      </p>
    </section>
  );
}
