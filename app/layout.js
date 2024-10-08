import { Inter } from "next/font/google";
import "./styles/globals.css";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "kynzono",
  description:
    "kynzono is a clothing brand located in germany \n doppelgänger drop 08/09/24 \n paramount drop 28/04/24",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
