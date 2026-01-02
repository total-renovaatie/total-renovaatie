import "~/styles/globals.css";
import { geistSans, jetBrainsMono } from "../fonts";
import Header from "~/components/header";
import ReactLenis from "lenis/react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // 1. Validate locale
  // 1. Define a type for your supported locales based on your routing config
  type Locale = (typeof routing.locales)[number];

  // 2. Use a Type Guard to check the locale safely
  const isValidLocale = routing.locales.includes(locale as Locale);

  if (!isValidLocale) {
    notFound();
  }

  // 2. Fetch messages on the server
  const messages = await getMessages();
  // DEBUG: Check your terminal (not browser console)
  console.log("CURRENT LOCALE:", locale);
  console.log("NAVBAR DATA:", messages.Navbar);
  return (
    <html
      lang={locale}
      className={`${geistSans.className} ${jetBrainsMono.variable}`}
    >
      <body>
        {/* NextIntlClientProvider MUST wrap Header to fix your error */}
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ReactLenis root>
            <Header />
            <main>{children}</main>
          </ReactLenis>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
