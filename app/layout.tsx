import type { Metadata } from "next";
import { Bebas_Neue, JetBrains_Mono, Montserrat } from "next/font/google";
import { I18nProvider } from "@/components/i18n/I18nProvider";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { getDictionary } from "@/lib/i18n";
import { getLocale, localeToOpenGraph } from "@/lib/i18n/locale";
import { getSiteUrl } from "@/lib/site";
import { getHomeContent, getSiteSettings } from "@/lib/strapi";
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

  return {
    title: {
      default: dict.meta.defaultTitle,
      template: `%s | ${dict.meta.siteName}`,
    },
    description: dict.meta.defaultDescription,
    metadataBase: new URL(getSiteUrl()),
    openGraph: {
      type: "website",
      locale: localeToOpenGraph(locale),
      siteName: dict.meta.siteName,
    },
    icons: {
      icon: [
        { url: "/icon.png", type: "image/png", sizes: "32x32" },
        { url: "/favicon.ico", sizes: "48x48" },
      ],
      shortcut: "/favicon.ico",
      apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
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
        <I18nProvider locale={locale}>
          <Nav
            siteName={settings.siteName}
            navLinks={settings.navLinks}
            email={settings.email}
            linkedin={settings.linkedin}
          />
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
        </I18nProvider>
      </body>
    </html>
  );
}
