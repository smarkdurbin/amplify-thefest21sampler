import type { Metadata } from "next";
import { Providers } from "./providers";
import App from "./_components/App";

export const metadata: Metadata = {
  metadataBase: new URL("https://thefest21.unofficialsampler.app/"),
  title: "The Fest 21 // Unofficial Sampler",
  description: "This site is not affiliated with The Fest",
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
