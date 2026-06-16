import type { Metadata } from "next";
import { Bebas_Neue, JetBrains_Mono, Montserrat } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { getSiteSettings } from "@/lib/strapi";
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

export const metadata: Metadata = {
  title: {
    default: "Jorge Desmond — Senior Product Designer",
    template: "%s | Jorge Desmond",
  },
  description:
    "Diseño sistemas que convierten complejidad operativa en productos que escalan. Design Systems, Product Design y arquitectura de diseño con IA.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "Jorge Desmond",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html
      lang="es"
      className={`${bebasNeue.variable} ${montserrat.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-body">
        <Nav
          siteName={settings.siteName}
          navLinks={settings.navLinks}
          email={settings.email}
          linkedin={settings.linkedin}
        />
        <main className="flex-1">{children}</main>
        <Footer footerText={settings.footerText} />
      </body>
    </html>
  );
}
