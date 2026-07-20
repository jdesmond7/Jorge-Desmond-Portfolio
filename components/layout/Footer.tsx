import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ArrowUpRight } from "@/components/ui/ArrowUpRight";
import { InstagramIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import type { Dictionary } from "@/lib/i18n";
import { isExternalHref, sanitizeHref } from "@/lib/safe-url";
import type { NavLink } from "@/lib/types";

interface FooterProps {
  navLinks: NavLink[];
  email: string;
  linkedin: string;
  instagram?: string;
  footerText: string;
  ctaTitle: string;
  ctaSubtitle: string;
  dict: Dictionary;
}

function FooterLink({
  href,
  label,
  external,
}: NavLink & { external?: boolean }) {
  const className =
    "text-[length:var(--text-md)] leading-snug text-white/70 no-underline transition-colors hover:text-white";
  const safeHref = sanitizeHref(href);
  if (!safeHref) return <span className={className}>{label}</span>;

  if (external || isExternalHref(safeHref) || safeHref.startsWith("mailto:")) {
    return (
      <a
        href={safeHref}
        className={className}
        target={isExternalHref(safeHref) ? "_blank" : undefined}
        rel={isExternalHref(safeHref) ? "noopener noreferrer" : undefined}
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={safeHref} className={className}>
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
  dict,
}: FooterProps) {
  const extraFooterLinks: NavLink[] = [
    { label: dict.footer.home, href: "/" },
    { label: dict.nav.resume, href: "/resume" },
  ];

  const siteMap = [
    ...extraFooterLinks,
    ...navLinks.filter(
      (link) => !extraFooterLinks.some((extra) => extra.href === link.href),
    ),
  ];

  const safeEmail = sanitizeHref(`mailto:${email}`) ?? `mailto:${email}`;
  const safeLinkedin = sanitizeHref(linkedin);
  const safeInstagram = instagram ? sanitizeHref(instagram) : undefined;

  return (
    <footer className="text-white">
      <div className="bg-espresso">
        <Container className="py-16 md:py-20">
          <div className="text-center">
            <h2 className="font-display mb-5 text-[clamp(32px,5.5vw,52px)] leading-[1.05] tracking-[0.01em] text-white">
              {ctaTitle}
            </h2>
            <p className="mx-auto mb-9 max-w-[480px] text-[length:var(--text-lg)] font-normal leading-[1.45] text-white/70">
              {ctaSubtitle}
            </p>
            <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-center sm:gap-4">
              <Button
                href={safeEmail}
                variant="primary"
                className="w-full sm:w-auto"
                withUpArrow
              >
                {dict.footer.emailCta}
              </Button>
              {safeLinkedin && (
                <Button
                  href={safeLinkedin}
                  variant="outline-light"
                  className="w-full sm:w-auto"
                  external
                  withUpArrow
                >
                  {dict.footer.linkedinCta}
                </Button>
              )}
            </div>
          </div>
        </Container>
      </div>

      <div className="bg-ink">
        <Container className="py-14 md:py-16">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
            <div>
              <p className="mono mb-4 text-[length:var(--text-micro)] font-bold uppercase tracking-[0.14em] text-coral">
                {dict.footer.siteMap}
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
              <p className="mono mb-4 text-[length:var(--text-micro)] font-bold uppercase tracking-[0.14em] text-coral">
                {dict.footer.contact}
              </p>
              <a
                href={safeEmail}
                className="group inline-flex items-center gap-1.5 text-[length:var(--text-md)] text-white/70 no-underline transition-colors hover:text-white"
              >
                <span>{dict.footer.writeMe}</span>
                <ArrowUpRight className="opacity-70 transition-opacity group-hover:opacity-100" />
              </a>
              <p className="mt-2 text-[length:var(--text-md)] text-white/50">{email}</p>
            </div>

            <div>
              <p className="mono mb-4 text-[length:var(--text-micro)] font-bold uppercase tracking-[0.14em] text-coral">
                {dict.footer.social}
              </p>
              <div className="flex items-center gap-3">
                {safeInstagram && (
                  <a
                    href={safeInstagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-white/40 hover:text-white"
                  >
                    <InstagramIcon />
                  </a>
                )}
                {safeLinkedin && (
                  <a
                    href={safeLinkedin}
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

          <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-8 text-[length:var(--text-xs)] text-white/45 md:mt-14 md:flex-row md:items-center md:justify-between">
            <span>© {new Date().getFullYear()} Jorge Desmond</span>
            <span className="mono tracking-[-0.006em]">{footerText}</span>
          </div>
        </Container>
      </div>
    </footer>
  );
}
