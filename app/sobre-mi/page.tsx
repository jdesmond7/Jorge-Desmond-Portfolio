import type { Metadata } from "next";
import { CmsImage } from "@/components/ui/CmsImage";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n/locale";
import { getAboutContent, getSiteSettings } from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return {
    title: dict.about.title,
    description: dict.about.description,
  };
}

function AboutParagraph({
  text,
  contactEmail,
  linkedin,
  instagram,
  dict,
}: {
  text: string;
  contactEmail: string;
  linkedin: string;
  instagram?: string;
  dict: ReturnType<typeof getDictionary>;
}) {
  const lower = text.toLowerCase();
  const isContact =
    lower.startsWith("escríbeme") || lower.startsWith("email me");
  const isSignOff =
    lower.startsWith("con gusto") || lower.startsWith("cheers");

  if (isContact) {
    return (
      <p className="text-[17px] leading-[1.7] tracking-[-0.009em] text-zinc">
        {dict.about.writePrefix}{" "}
        <a
          href={`mailto:${contactEmail}`}
          className="font-semibold text-carbon underline decoration-coral/50 underline-offset-[3px] transition-colors hover:text-coral"
        >
          {contactEmail}
        </a>{" "}
        {dict.about.writeMiddle}{" "}
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-carbon underline decoration-coral/50 underline-offset-[3px] transition-colors hover:text-coral"
        >
          LinkedIn
        </a>
        {instagram ? (
          <>
            {" / "}
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-carbon underline decoration-coral/50 underline-offset-[3px] transition-colors hover:text-coral"
            >
              Instagram
            </a>
          </>
        ) : null}
        .
      </p>
    );
  }

  if (isSignOff) {
    return (
      <p className="pt-2 text-[17px] leading-[1.7] tracking-[-0.009em] text-zinc/80">
        {dict.about.signOff}, jorge
      </p>
    );
  }

  return (
    <p className="text-[17px] leading-[1.7] tracking-[-0.009em] text-zinc">
      {text}
    </p>
  );
}

export default async function SobreMiPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const [about, site] = await Promise.all([
    getAboutContent(),
    getSiteSettings(),
  ]);
  const paragraphs = about.body.split("\n\n").filter(Boolean);
  const mid = Math.ceil(paragraphs.length / 2);
  const firstHalf = paragraphs.slice(0, mid);
  const secondHalf = paragraphs.slice(mid);

  return (
    <div>
      <div className="relative h-[min(90vw,720px)] min-h-[400px] w-full overflow-hidden md:min-h-[520px]">
        <CmsImage
          src={about.heroImage}
          alt={dict.about.heroAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <Container narrow className="pb-[var(--section-py)] pt-10 md:pt-12">
        <Reveal>
          <h1 className="font-display mb-10 text-[clamp(48px,9vw,80px)] uppercase leading-none tracking-[0.02em] text-carbon md:mb-12">
            {about.title}
          </h1>
        </Reveal>

        <div className="flex flex-col gap-6">
          {firstHalf.map((paragraph, i) => (
            <Reveal key={paragraph} delay={0.05 + i * 0.04}>
              <AboutParagraph
                text={paragraph}
                contactEmail={site.email}
                linkedin={site.linkedin}
                instagram={site.instagram}
                dict={dict}
              />
            </Reveal>
          ))}
        </div>

        {about.images.length > 0 && (
          <Reveal delay={0.15}>
            <div
              className={`my-12 grid gap-5 ${
                about.images.length > 1 ? "sm:grid-cols-2" : ""
              }`}
            >
              {about.images.map((src) => (
                <div
                  key={src}
                  className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-mist"
                >
                  <CmsImage
                    src={src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 480px"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        )}

        <div className="mt-6 flex flex-col gap-6">
          {secondHalf.map((paragraph, i) => (
            <Reveal key={paragraph} delay={0.1 + i * 0.04}>
              <AboutParagraph
                text={paragraph}
                contactEmail={site.email}
                linkedin={site.linkedin}
                instagram={site.instagram}
                dict={dict}
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </div>
  );
}
