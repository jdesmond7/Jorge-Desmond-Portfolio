import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n/locale";
import { RESUME_EN, RESUME_ES } from "@/lib/i18n/resume-content";
import { getSiteSettings } from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return {
    title: dict.resume.title,
    description: dict.resume.description,
  };
}

const CV_PDF = "/cv/jorge-desmond-cv-2026.pdf";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display mb-8 text-[clamp(22px,3.5vw,30px)] uppercase leading-none tracking-[0.02em] text-carbon">
      {children}
    </h2>
  );
}

function ConnectRow({
  label,
  href,
  children,
  external,
}: {
  label: string;
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <div className="flex items-start gap-4 border-b border-mist py-3.5 last:border-0">
      <span className="mono w-[68px] shrink-0 pt-0.5 text-[10px] uppercase tracking-[0.08em] text-ash">
        {label}
      </span>
      <a
        href={href}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className="min-w-0 flex-1 break-words text-[14px] tracking-[-0.005em] text-carbon no-underline transition-colors hover:text-coral"
      >
        {children}
      </a>
    </div>
  );
}

export default async function ResumePage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const content = locale === "en" ? RESUME_EN : RESUME_ES;
  const settings = await getSiteSettings();
  const linkedinDisplay = settings.linkedin
    .replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "")
    .replace(/\/$/, "");

  return (
    <div className="pt-24 md:pt-28">
      <Container narrow className="pb-[var(--section-py)] pt-4 md:pt-6">
        <div className="grid items-start gap-10 md:grid-cols-[1fr_320px] md:gap-14">
          <div className="min-w-0">
            <Reveal>
              <header>
                <div className="mono mb-4 text-[11px] tracking-[-0.006em] text-zinc">
                  résumé
                </div>
                <h1 className="font-display text-[clamp(36px,7vw,60px)] uppercase leading-[0.95] tracking-[0.02em] text-carbon">
                  {content.profile.name}
                </h1>
                <p className="mt-3 text-[clamp(16px,2.2vw,19px)] font-semibold tracking-[-0.009em] text-carbon">
                  {content.profile.role}
                </p>
                <p className="mt-1 text-[15px] tracking-[-0.005em] text-zinc">
                  {content.profile.tagline}
                </p>
              </header>
            </Reveal>

            <Reveal delay={0.08}>
              <section className="mt-8 flex flex-col gap-4 text-[16px] leading-[1.6] tracking-[-0.009em] text-zinc">
                {content.profile.summary.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </section>
            </Reveal>

            <Reveal delay={0.12}>
              <section className="mt-12 border-t border-mist pt-12">
                <SectionTitle>{dict.resume.experience}</SectionTitle>
                <div className="flex flex-col gap-10">
                  {content.experience.map((entry) => (
                    <div key={`${entry.company}-${entry.period}`}>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h3 className="text-[18px] font-bold leading-[1.25] tracking-[-0.01em] text-carbon md:text-[20px]">
                          {entry.role}
                        </h3>
                        <span className="mono shrink-0 text-[12px] tracking-[-0.006em] text-ash">
                          {entry.period}
                        </span>
                      </div>
                      <div className="mt-1 text-[14px] font-semibold tracking-[-0.005em] text-coral">
                        {entry.company}
                        {entry.detail ? (
                          <span className="text-zinc"> · {entry.detail}</span>
                        ) : null}
                      </div>
                      <ul className="mt-4 list-disc space-y-2.5 pl-5 marker:text-ash">
                        {entry.bullets.map((bullet) => (
                          <li
                            key={bullet.slice(0, 32)}
                            className="text-[15px] leading-[1.55] tracking-[-0.005em] text-zinc"
                          >
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            </Reveal>

            <Reveal delay={0.16}>
              <section className="mt-12 border-t border-mist pt-12">
                <SectionTitle>{dict.resume.skills}</SectionTitle>
                <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
                  {content.skills.map((skill) => (
                    <div key={skill.category}>
                      <h3 className="mb-1.5 text-[14px] font-bold tracking-[-0.005em] text-carbon">
                        {skill.category}
                      </h3>
                      <p className="text-[15px] leading-[1.55] tracking-[-0.005em] text-zinc">
                        {skill.items}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </Reveal>
          </div>

          <aside className="min-w-0 md:sticky md:top-28 md:self-start">
            <Reveal delay={0.1}>
              <div className="rounded-[var(--radius-card)] border border-mist p-6">
                <div className="mono mb-2 text-[11px] uppercase tracking-[0.1em] text-ash">
                  Connect
                </div>
                <ConnectRow label="Email" href={`mailto:${settings.email}`}>
                  {settings.email}
                </ConnectRow>
                <ConnectRow label="LinkedIn" href={settings.linkedin} external>
                  {linkedinDisplay} ↗
                </ConnectRow>
                <ConnectRow
                  label={dict.resume.contact}
                  href={`mailto:${settings.email}`}
                >
                  {dict.resume.sendMessage}
                </ConnectRow>
                <p className="mt-5 text-[13px] leading-[1.5] tracking-[-0.005em] text-zinc">
                  {dict.resume.location}
                </p>
              </div>

              <a
                href={CV_PDF}
                download
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-[var(--radius-card)] bg-coral px-8 py-4 text-[15px] font-semibold tracking-[-0.009em] text-white no-underline transition-colors hover:bg-coral-hover"
              >
                {dict.resume.downloadCv}
              </a>
            </Reveal>
          </aside>
        </div>
      </Container>
    </div>
  );
}
