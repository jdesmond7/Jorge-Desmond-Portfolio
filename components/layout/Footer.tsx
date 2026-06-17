import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ArrowUpRight } from "@/components/ui/ArrowUpRight";
import { InstagramIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import type { NavLink } from "@/lib/types";

const EXTRA_FOOTER_LINKS: NavLink[] = [
  { label: "Inicio", href: "/" },
  { label: "Resume", href: "/resume" },
];

interface FooterProps {
  navLinks: NavLink[];
  email: string;
  linkedin: string;
  instagram?: string;
  footerText: string;
  ctaTitle: string;
  ctaSubtitle: string;
}

function FooterLink({
  href,
  label,
  external,
}: NavLink & { external?: boolean }) {
  const className =
    "text-[14px] leading-snug text-white/70 no-underline transition-colors hover:text-white";

  if (external || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

export function Footer({
  navLinks,
  email,
  linkedin,
  instagram,
  footerText,
  ctaTitle,
  ctaSubtitle,
}: FooterProps) {
  const siteMap = [
    ...EXTRA_FOOTER_LINKS,
    ...navLinks.filter(
      (link) => !EXTRA_FOOTER_LINKS.some((extra) => extra.href === link.href),
    ),
  ];

  return (
    <footer className="bg-espresso text-white">
      <Container className="py-16 md:py-20">
        <div className="text-center">
          <h2 className="font-display mb-5 text-[clamp(40px,6vw,56px)] uppercase leading-none tracking-[0.02em] text-white">
            {ctaTitle}
          </h2>
          <p className="mx-auto mb-9 max-w-[440px] text-[17px] font-normal leading-[1.4] text-white/70">
            {ctaSubtitle}
          </p>
          <Button href={`mailto:${email}`}>{email} →</Button>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 border-t border-white/10 pt-14 md:mt-16 md:grid-cols-3 md:gap-12 md:pt-16">
          <div>
            <p className="mono mb-4 text-[10px] font-bold uppercase tracking-[0.14em] text-coral">
              Mapa del sitio
            </p>
            <ul className="flex flex-col gap-2.5">
              {siteMap.map((link) => (
                <li key={link.href}>
                  <FooterLink {...link} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mono mb-4 text-[10px] font-bold uppercase tracking-[0.14em] text-coral">
              Contacto
            </p>
            <a
              href={`mailto:${email}`}
              className="group inline-flex items-center gap-1.5 text-[14px] text-white/70 no-underline transition-colors hover:text-white"
            >
              <span>Escríbeme</span>
              <ArrowUpRight className="opacity-70 transition-opacity group-hover:opacity-100" />
            </a>
            <p className="mt-2 text-[14px] text-white/50">{email}</p>
          </div>

          <div>
            <p className="mono mb-4 text-[10px] font-bold uppercase tracking-[0.14em] text-coral">
              Redes
            </p>
            <div className="flex items-center gap-3">
              {instagram && (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-white/40 hover:text-white"
                >
                  <InstagramIcon />
                </a>
              )}
              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-white/40 hover:text-white"
                >
                  <LinkedInIcon />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-8 text-[12px] text-white/45 md:mt-14 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Jorge Desmond</span>
          <span className="mono tracking-[-0.006em]">{footerText}</span>
        </div>
      </Container>
    </footer>
  );
}
