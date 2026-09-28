import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpsDesk — Активные обращения",
  description: "OpsDesk — Активные обращения",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
