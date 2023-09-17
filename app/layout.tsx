import type { Metadata } from "next";
import { Providers } from "./providers";
import App from "./_components/App";

export const metadata: Metadata = {
  title: "The Fest 21 (Unofficial) Sampler",
  description: "This site is not affiliated with the The Fest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <App>{children}</App>
        </Providers>
      </body>
    </html>
  );
}
