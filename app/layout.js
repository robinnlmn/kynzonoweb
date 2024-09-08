"use client"; // This marks the file as a Client Component

import { Inter } from "next/font/google";
import "./styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { useEffect, useState } from "react";
import { metadata } from "./metadata"; // Import metadata

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [isInstagramBrowser, setIsInstagramBrowser] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    // Detect Instagram in-app browser by checking user agent
    if (userAgent.includes("Instagram")) {
      setIsInstagramBrowser(true);
    }
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
