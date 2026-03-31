import type { Metadata } from "next";
import { EnterProvider } from '@/context/EnterContext'
import "./globals.css";
import AppShell from '@/components/layout/AppShell'

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
    <html lang="en">
      <body>
        <EnterProvider>
          <AppShell />
          {children}
        </EnterProvider>
      </body>
    </html>
  );
}
