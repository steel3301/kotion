import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import ConvexClientProvider from "@/components/providers/convex-client-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { ModelProvider } from "@/components/providers/modal-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kotion",
  description: "Facilitating workflows with super-powered and faster collaboration",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)", 
        url: "/fevicon.png",
        href: "/fevicon.png"
      },
      {
        media: "(prefers-color-scheme: dark)", 
        url: "/fevicon-dark.png",
        href: "/fevicon-dark.png"
      }
    ]
  }
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html suppressHydrationWarning
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider>
          <ConvexClientProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              storageKey="kotion-theme-2"
            >
              <EdgeStoreProvider>
                <Toaster position="bottom-center"/>
                <ModelProvider/>
                {children}
              </EdgeStoreProvider>
            </ThemeProvider>
          </ConvexClientProvider>
        </ClerkProvider>
        </body>
    </html>
  );
}
