import type { Metadata } from "next";
import { EnterProvider } from '@/context/EnterContext'
import { ThemeProvider } from '@/context/ThemeContext'
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

export const metadata: Metadata = {
  title: "Rohan's Portfolio",
  description: "Portfolio of Rohan Kallur",
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
          <EnterProvider>
            <ShellLayout>
              {children}
            </ShellLayout>
          </EnterProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
