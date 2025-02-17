// app/layout.tsx
import type { Metadata } from "next";
import { Libre_Franklin, Fjalla_One } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/cosmic/blocks/ecommerce/CartProvider";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Suspense } from "react";
import { AuthProvider } from "@/cosmic/blocks/user-management/AuthContext";

const sans = Libre_Franklin({ subsets: ["latin"], variable: "--font-sans" });
const display = Fjalla_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title:
    "ADMIG Vicente Pires - Assembleia de Deus Ministério Internacional do Guará",
  description:
    "Assembleia de Deus Ministério Internacional do Guará em Vicente Pires DF.",
  openGraph: {
    title:
      "ADMIG Vicente Pires - Assembleia de Deus Ministério Internacional do Guará",
    description:
      "Assembleia de Deus Ministério Internacional do Guará em Vicente Pires DF.",
    images:
      "https://imgix.cosmicjs.com/69313380-b156-11ee-9844-f9a09795e2a3-desktop.png?auto=format,compression",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${display.variable} ${sans.variable} font-sans md:p-0 bg-white dark:bg-black h-dvh w-full`}
      >
        <Suspense>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <CartProvider>
                <div>
                  <Header />
                  {children}
                </div>
                <Footer />
              </CartProvider>
              <TailwindIndicator />
            </ThemeProvider>
          </AuthProvider>
        </Suspense>
      </body>
    </html>
  );
}
