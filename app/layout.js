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
        {isInstagramBrowser ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <p>This page is best viewed in your browser.</p>
            <a
              href="https://www.kynzono.com"
              target="_blank"
              style={{
                display: "inline-block",
                padding: "10px 20px",
                backgroundColor: "#0070f3",
                color: "#ffffff",
                borderRadius: "5px",
                textDecoration: "none",
                marginTop: "20px",
              }}
            >
              Open in Browser
            </a>
          </div>
        ) : (
          <>
            {children}
            <Analytics />
          </>
        )}
      </body>
    </html>
  );
}
