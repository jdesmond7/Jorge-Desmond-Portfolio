import type { Metadata } from "next";
import { Bebas_Neue, JetBrains_Mono, Montserrat } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { I18nProvider } from "@/components/i18n/I18nProvider";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { PageTransition } from "@/components/layout/PageTransition";
import { getDictionary } from "@/lib/i18n";
import { getLocale, localeToOpenGraph } from "@/lib/i18n/locale";
import { getSiteUrl, SITE_EMAIL } from "@/lib/site";
import { getHomeContent, getSiteSettings } from "@/lib/data";
import {
  absoluteUrl,
  buildPageMetadata,
  DEFAULT_OG_IMAGE,
} from "@/lib/seo/metadata";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const base = buildPageMetadata({
    title: dict.meta.defaultTitle,
    description: dict.meta.defaultDescription,
    path: "/",
    image: DEFAULT_OG_IMAGE,
  });

  return {
    ...base,
    title: {
      default: dict.meta.defaultTitle,
      template: `%s | ${dict.meta.siteName}`,
    },
    metadataBase: new URL(getSiteUrl()),
    openGraph: {
      ...base.openGraph,
      locale: localeToOpenGraph(locale),
      siteName: dict.meta.siteName,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const [settings, home] = await Promise.all([
    getSiteSettings(),
    getHomeContent(),
  ]);

  return (
    <html
      lang={locale}
      className={`${bebasNeue.variable} ${montserrat.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-body">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Jorge Desmond",
            url: getSiteUrl(),
            email: SITE_EMAIL,
            jobTitle: "Senior Product Designer",
            sameAs: [settings.linkedin, settings.instagram].filter(Boolean),
            image: absoluteUrl(DEFAULT_OG_IMAGE),
          }}
        />
        <I18nProvider locale={locale}>
          <Nav
            siteName={settings.siteName}
            navLinks={settings.navLinks}
            email={settings.email}
            linkedin={settings.linkedin}
          />
          <PageTransition>
            <main className="flex-1">{children}</main>
            <Footer
              navLinks={settings.navLinks}
              email={settings.email}
              linkedin={settings.linkedin}
              instagram={settings.instagram}
              footerText={settings.footerText}
              ctaTitle={home.ctaTitle}
              ctaSubtitle={home.ctaSubtitle}
              dict={dict}
            />
          </PageTransition>
        </I18nProvider>
      </body>
    </html>
  );
}
