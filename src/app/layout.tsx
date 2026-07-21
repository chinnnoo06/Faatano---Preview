import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/ui/Header";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { FramesProvider } from "@/context/FramesContext";
import { Preloader } from "@/components/ui/Preloader";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { Footer } from "@/components/ui/Footer";
import { ParallaxBand } from "@/components/ui/ParallaxBand";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Faatano - Furniture that remembers its origin.",
  description: "Faatano - Furniture that remembers its origin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} min-h-full flex flex-col overflow-x-hidden`}>
        <FramesProvider>
          <Preloader>
            <SmoothScroll>
              <ScrollToTop />
              <Header />
              <main>{children}</main>
              <ParallaxBand />
              <Footer />
            </SmoothScroll>
          </Preloader>
        </FramesProvider>
      </body>
    </html>
  );
}
