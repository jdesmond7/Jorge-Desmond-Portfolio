"use client";

import { useI18n } from "@/components/i18n/I18nProvider";
import { Container } from "@/components/ui/Container";

export function Skills() {
  const { dict } = useI18n();

  return (
    <section id="habilidades" className="bg-carbon pt-[144px] pb-24 md:pb-32">
      <Container narrow>
        <h2 className="font-display mb-14 text-[clamp(36px,6vw,52px)] uppercase leading-none tracking-[0.02em] text-white md:mb-16">
          {dict.skills.title}
        </h2>
        <ul>
          {dict.skills.items.map((skill) => (
            <li
              key={skill.number}
              className="group border-t border-white/10 last:border-b"
            >
              <div className="flex gap-5 py-6 md:gap-10 md:py-8 lg:gap-14">
                <span
                  aria-hidden
                  className="mono shrink-0 pt-1.5 text-[12px] font-medium tracking-[0.08em] text-white/50 md:text-[13px]"
                >
                  [ {skill.number} ]
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-body text-[clamp(22px,3.8vw,34px)] font-semibold leading-[1.12] tracking-[-0.02em] text-white">
                    {skill.title}
                  </h3>
                  <div className="skill-expand grid grid-rows-[0fr] transition-[grid-template-rows] duration-[550ms] ease-[var(--ease-out-expo)] group-hover:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <p className="max-w-[680px] pt-4 text-[15px] leading-[1.7] text-white/55 transition-[opacity,transform] duration-[450ms] ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:opacity-100 translate-y-1 opacity-0 md:pt-5 md:text-[16px]">
                        {skill.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
