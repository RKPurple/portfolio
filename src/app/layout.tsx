import type { Metadata } from "next";
import { EnterProvider } from '@/context/EnterContext'
import { ThemeProvider } from '@/context/ThemeContext'
import { NavProvider } from '@/context/NavContext'
import "./globals.css";
import ShellLayout from '@/components/layout/ShellLayout'

const themeInitScript = `
(function() {
  try {
    var d = document.documentElement;
    var t = localStorage.getItem('portfolio-theme');
    if (t === 'light' || t === 'dark') { d.classList.add(t); return; }
    if (window.matchMedia('(prefers-color-scheme: light)').matches) d.classList.add('light');
    else d.classList.add('dark');
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
`
const siteUrl = 'https://rohankallur.xyz';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Rohan Kallur | Portfolio",
    template: "%s · Rohan Kallur",
  },

  description: "Software Engineer - Portfolio, Projects, and Contact.",

  applicationName: "Rohan's Portfolio",

  authors: [{ name: "Rohan Kallur", url: siteUrl }],
  creator: "Rohan Kallur",

  keywords: [
    "Rohan kallur",
    "portfolio",
    "full-stack",
    "software engineer",
    "defi",
    "web3",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: "Rohan's Portfolio",
    title: "Rohan Kallur | Portfolio",
    description: "Software Engineer - Portfolio, Projects, and Contact.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Rohan Kallur — Portfolio",
    description:
      "Full-stack engineer — portfolio, projects, and contact.",
    creator: "@rkpurple2",
    // images: ["/og.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ThemeProvider>
          <NavProvider>
            <EnterProvider>
              <ShellLayout>
                {children}
              </ShellLayout>
            </EnterProvider>
          </NavProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
