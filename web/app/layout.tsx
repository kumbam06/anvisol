import type { Metadata } from "next";
import { Figtree, Fraunces } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

const sans = Figtree({ subsets: ["latin"], variable: "--font-sans" });
const display = Fraunces({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: {
    default: "AnviLabs — GradMate for iOS",
    template: "%s · AnviLabs"
  },
  description:
    "AnviLabs is an independent iOS product studio. GradMate builds ATS resumes and cover letters, Pomodoro focus, and peer study chat.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: "/apple-touch-icon.png"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#f4f1ea" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("anvilabs-theme");if(t!=="dark"&&t!=="light")t="light";document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t;}catch(e){}})();`
          }}
        />
      </head>
      <body className="min-h-screen font-sans">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
