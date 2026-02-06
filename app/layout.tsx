import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Time / Date Tools",
  description: "Time & date calculator tools",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <div className="container">{children}</div>
      </body>
    </html>
  );
}
